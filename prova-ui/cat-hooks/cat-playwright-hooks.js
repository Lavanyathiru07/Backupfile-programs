const { BeforeAll, Before, BeforeStep, AfterStep, After, AfterAll, setDefaultTimeout } = require("@cucumber/cucumber");
const { Browser, chromium, firefox } = require('playwright');

/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */

const CatPortalHooks = require('./helpers/cat-portal-hooks');
const SessionUtils = require('./helpers/session-utils');

let scenarioStatus = 'PASSED';
let uriDetails = "";
let featureCall = false;
let page, browser, context;
let isMainProcess = false; // Track if this is the main process

setDefaultTimeout(60000);

// Initialize CAT before all tests (runs in each worker)
BeforeAll(async function () {
    const sessionUtils = new SessionUtils();

    console.log(`Worker ${process.pid}: Initializing CAT integration...`);

    try {
        // Check if we already have a shared session
        const existingSession = sessionUtils.readSession();

        if (existingSession && existingSession.runId) {
            // Use the existing shared CAT job ID
            process.env.CAT_JOB_ID = existingSession.runId;
            console.log(`Worker ${process.pid}: Using shared CAT job ID: ${existingSession.runId}`);
        } else {
            // This shouldn't happen in normal flow, but fallback to creating a new job
            console.warn(`Worker ${process.pid}: No shared session found, creating new job...`);
            await CatPortalHooks.onPrepare();
        }
    } catch (error) {
        console.error(`Worker ${process.pid}: CAT initialization failed:`, error);
    }
});

Before(async function (scenario) {
    try {
        // Initialize browser with proper configuration for Jenkins
        const headlessMode = process.env.HEADLESS !== 'false';
        const isCI = process.env.CI === 'true';
        
        console.log(`Launching browser - Headless: ${headlessMode}, CI: ${isCI}`);
        
        const launchOptions = {
            headless: headlessMode,
            timeout: 60000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-ipc-flooding-protection'
            ]
        };
        
        // Add single-process mode for CI environments
        if (isCI) {
            launchOptions.args.push(
                '--single-process',
                '--disable-extensions',
                '--disable-plugins',
                '--disable-translate',
                '--disable-default-apps'
            );
            launchOptions.slowMo = 200; // Increased delay for stability
            launchOptions.timeout = 120000; // Increased timeout for CI
        }
        
        this.browser = await chromium.launch(launchOptions);
        
        // Verify browser is connected
        if (!this.browser.isConnected()) {
            throw new Error('Browser launched but is not connected');
        }
        
        // Add small delay to ensure browser is fully ready
        await new Promise(resolve => setTimeout(resolve, isCI ? 1000 : 500));
        
        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true,
            actionTimeout: 30000,
            navigationTimeout: 60000
        });
        
        // Add another small delay before creating page
        await new Promise(resolve => setTimeout(resolve, isCI ? 500 : 200));
        
        this.page = await this.context.newPage();

        // Store page reference for CAT hooks
        page = this.page;
        browser = this.browser;
        context = this.context;

    } catch (error) {
        console.error('Browser initialization failed:', error);
        
        // Retry browser launch once with minimal configuration
        try {
            console.log('Retrying browser launch with minimal configuration...');
            
            // Wait a bit before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.browser = await chromium.launch({
                headless: true,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox', 
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--single-process'
                ],
                timeout: 90000
            });
            
            // Wait for browser to be ready
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.context = await this.browser.newContext({
                viewport: { width: 1280, height: 720 }
            });
            
            // Wait before creating page
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.page = await this.context.newPage();
            
            page = this.page;
            browser = this.browser;
            context = this.context;
            
            console.log('Browser retry successful');
        } catch (retryError) {
            console.error('Browser retry also failed:', retryError);
            throw new Error(`Browser setup failed after retry: ${retryError.message}`);
        }
    }

    // Handle feature-level CAT integration
    if (uriDetails !== scenario.gherkinDocument.uri) {
        uriDetails = scenario.gherkinDocument.uri;
        try {
            await CatPortalHooks.beforeFeature(
                scenario.gherkinDocument.uri,
                scenario.gherkinDocument.feature,
                scenario.gherkinDocument.feature.children
            );
            featureCall = true;
        } catch (error) {
            console.error('CAT beforeFeature failed:', error);
        }
    }

    // Initialize scenario in CAT
    try {
        await CatPortalHooks.beforeScenario(
            scenario.gherkinDocument.uri,
            scenario.gherkinDocument.feature,
            scenario.pickle,
            scenario.gherkinDocument.feature.location,
            this.page
        );
    } catch (error) {
        console.error('CAT beforeScenario failed:', error);
    }
});

BeforeStep(async function (scenario) {
    if (this.page) {
        try {
            CatPortalHooks.beforeStep(
                scenario.gherkinDocument.uri,
                scenario.gherkinDocument.feature,
                scenario.pickleStep,
                this.page
            );
        } catch (error) {
            console.error('CAT beforeStep failed:', error);
        }
    }
});

AfterStep(async function (scenario) {
    if (this.page) {
        try {
            const stepResult = scenario.result || { status: 'PASSED', message: null };
            await CatPortalHooks.afterStep(
                scenario.gherkinDocument.uri,
                scenario.gherkinDocument.feature,
                scenario.pickleStep,
                stepResult.message,
                stepResult.status === 'PASSED',
                this.page
            );
        } catch (error) {
            console.error('CAT afterStep failed:', error);
        }
    }
});

After(async function (scenario) {
    try {
        scenarioStatus = scenario.result?.status || 'PASSED';

        // Report scenario result to CAT
        try {
            await CatPortalHooks.afterScenario(
                scenario.gherkinDocument.uri,
                scenario.gherkinDocument.feature,
                scenario.pickle,
                scenario.result,
                scenario.gherkinDocument.feature.location,
                null, // requestDetails
                this.page
            );
        } catch (error) {
            console.error('CAT afterScenario failed:', error);
        }

        // Handle feature completion
        if (featureCall === true) {
            try {
                await CatPortalHooks.afterFeature(
                    scenario.gherkinDocument.uri,
                    scenario.gherkinDocument.feature,
                    scenario.gherkinDocument.feature.children
                );
                featureCall = false;
            } catch (error) {
                console.error('CAT afterFeature failed:', error);
            }
        }

    } catch (error) {
        console.error('CAT reporting failed:', error);
    } finally {
        // Ensure browser cleanup
        if (this.browser) {
            try {
                await this.browser.close();
            } catch (error) {
                console.error('Browser cleanup failed:', error);
            }
        }
    }
});

AfterAll(async function () {
    const sessionUtils = new SessionUtils();

    console.log(`Worker ${process.pid}: Finalizing CAT integration...`);

    // Only the main runner process should finalize the CAT job
    // Individual workers should not call onComplete()
    try {
        const session = sessionUtils.readSession();
        if (session && session.runId) {
            console.log(`Worker ${process.pid}: CAT job ${session.runId} will be finalized by main process`);
        }
    } catch (error) {
        console.error(`Worker ${process.pid}: CAT finalization preparation failed:`, error);
    }
});

module.exports = { page, browser, context };