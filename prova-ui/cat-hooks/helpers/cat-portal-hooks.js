import { CatServer, DEFAULT_PROD_CAT_URL, DEFAULT_UI_API_PATH, DEFAULT_CAT_WS_PATH } from './cat-helper.js';
import _ from 'lodash';
const CatProxy = CatServer;
import { mkdirp } from 'mkdirp';

/**
     * CatPortalHooks class taken no arguments
     */
class CatPortalHooks {
    /**
     * CatPortalHooks contructer taken no arguments
     */
    constructor() {
        this.currentTestScenario = {
            name: null,
            executedSteps: [],
            actualExecutedSteps: [],
            id: null,
            counter: null,
        };
        this.LOG_HEADER = "cat.conf.js";
    }

    /**
     * This Function is executed at the start if the Test Execution to
     * create the Job ID for adding entries into CAT PORTAL
     * @returns {JSONData} which contains job id information
     */
    onPrepare() {
        let LOG_METHOD = 'onPrepare';
        let jobStartDateTime = new Date().toISOString();
        let catProxy = null;

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `Process: ${process.pid}, Parent: ${process.ppid}`,
        );

        // Validate required CAT environment variables
        const requiredCatVars = ['CAT_JOB_NAME', 'CAT_BUILD_NO', 'CAT_ENV'];
        const missingVars = requiredCatVars.filter(varName => !process.env[varName]);

        if (missingVars.length > 0 && process.env.CAT_JOB_ID) {
            console.warn(
                this.LOG_HEADER,
                LOG_METHOD,
                `Missing required CAT environment variables: ${missingVars.join(', ')}`
            );
        }

        if (process.env.CAT_URL && process.env.CAT_API_PATH) {
            catProxy = new CatProxy(process.env.CAT_URL, process.env.CAT_API_PATH);
        } else {
            catProxy = new CatProxy(DEFAULT_PROD_CAT_URL, DEFAULT_CAT_WS_PATH);
        }

        console.log(this.LOG_HEADER, LOG_METHOD, `CAT_JOB_ID enabled: ${process.env.CAT_JOB_ID}`);

        if (process.env.CAT_JOB_ID) {
            if (catProxy) {
                return catProxy.createJob(
                    process.env.CAT_JOB_NAME,
                    process.env.CAT_BUILD_NO,
                    process.env.CAT_ENV,
                    jobStartDateTime,
                    null,
                    null,
                    null,
                    null,
                )
                    .then((data) => {
                        console.log(this.LOG_HEADER, LOG_METHOD, `✅ Created consolidated CAT job: ${data._id}`);
                        process.env.CAT_JOB_ID = data._id;
                        return data;
                    })
                    .catch((err) => {
                        console.log(this.LOG_HEADER, LOG_METHOD, '❌ Create job failed:', err);
                        return null;
                    });
            }
        }

        console.log(this.LOG_HEADER, LOG_METHOD, `Final CAT_JOB_ID: ${process.env.CAT_JOB_ID}`);
    }

    /**
     * This Method is executed before every feature file based on the job id generated in
     * OnPrepare method.
     * @param {string} uri the uri details from scenario.
     * @param {string} feature the feature details from scenario.
     * @param {string} scenarios the scenarios details from scenario.
     * @returns {JSONData} which contains response for CreateCollection call
     */
    beforeFeature(uri, feature) {
        const LOG_METHOD = 'beforeFeature';
        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            uri,
            feature.name,
            process.pid,
        );

        const startDateTime = new Date().toISOString();

        console.log("startTime ::", startDateTime)
        console.log("URI ::", uri)

        let catProxy = null;
        console.log("process.env.CAT_JOB_ID ::", process.env.CAT_JOB_ID)


        if (process.env.CAT_JOB_ID) {
            const catUrl = process.env.CAT_URL || DEFAULT_PROD_CAT_URL;
            const catApiPath = process.env.CAT_API_PATH || DEFAULT_CAT_WS_PATH;
            catProxy = new CatProxy(
                catUrl,
                catApiPath,
                null,
                process.env.CAT_JOB_ID,
            );
            return catProxy.createCollection(
                feature.name,
                startDateTime,
            )
                .then((createdData) => {
                    console.log(
                        this.LOG_HEADER,
                        LOG_METHOD,
                        `created collection '${feature.name}'`,
                        createdData._id,
                    );
                })
                .catch((err) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'create collection failed', err);
                });
        }
    }

    /**
     * This Method is executed before every Scenario in feature file
     * @param {string} uri the uri details from scenario
     * @param {string} feature the feature details from scenario
     * @param {string} scenario the scenarios details from scenario
     * @param {string} sourceLocation the sourceLocation details from scenario
     * @param {string} page the sourceLocation details from scenario
     * @returns {JSONData} which contains response for CreateTestCase call
     */
    async beforeScenario(uri, feature, scenario, sourceLocation, page) {
        const LOG_METHOD = 'beforeScenario';
        // Skip page reload in beforeScenario as it may interfere with test setup
        // The page should be properly initialized by the test framework        
        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `'${uri}', '${feature.name}', '${scenario.name}'`,
            process.pid,
            sourceLocation.line,
        );

        const startDateTime = new Date().toISOString();

        this.currentTestScenario.name = scenario.name;
        this.currentTestScenario.executedSteps = [];
        this.currentTestScenario.actualExecutedSteps = [];
        this.currentTestScenario.counter = new Date().getMilliseconds();

        const tags = _.map(scenario.tags, (tag) => tag.name);
        // Check above step if that works are not
        console.log("process.env.CAT_JOB_ID ::", process.env.CAT_JOB_ID)
        if (process.env.CAT_JOB_ID) {
            const catUrl = process.env.CAT_URL || DEFAULT_PROD_CAT_URL;
            const catApiPath = process.env.CAT_API_PATH || DEFAULT_CAT_WS_PATH;
            const catProxy = new CatProxy(
                catUrl,
                catApiPath,
                null,
                process.env.CAT_JOB_ID,
            );
            return catProxy.createTestcase(
                feature.name,
                startDateTime,
                this.currentTestScenario.counter,
                scenario.name,
                null,
                null,
                null,
                null,
                tags,
                null
            )
                .then((catResponse) => {
                    console.log(
                        this.LOG_HEADER,
                        LOG_METHOD,
                        `'${feature.name}' got id '${catResponse.createdTestcaseId}' ${catResponse._id} --------------- ${this.currentTestScenario.counter}`,
                    );
                    this.currentTestScenario.id = catResponse.createdTestcaseId;
                })
                .catch((err) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'failed to create test case ', err);
                });
        }
    }

    /**
     * This Method is executed before every Step in Scenario
     * @param {string} uri the uri details from scenario
     * @param {string} feature the feature details from scenario
     * @param {string} step the step details from scenario
     */
    beforeStep(uri, feature, step) {
        const LOG_METHOD = 'beforeStep';

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `'${uri}', '${feature.name}', ${step.keyword}, '${step.text}'`,
            process.pid,
        );

        this.currentTestScenario.executedSteps.push({
            step: `${step.keyword} ${step.text}`,
            result: null,
            error: null,
        });
    }

    /**
     * This Method is executed after every Step in Scenario
     * @param {string} uri the uri details from scenario
     * @param {string} feature the feature details from scenario
     * @param {string} step the step details from scenario
     * @param {string} error the error details from scenario
     * @param {string} passed the passed details from scenario
     * @param {string} page the passed details from scenario
     */
    async afterStep(uri, feature, step, error, passed, page) {
        const LOG_METHOD = 'afterStep';

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `'${uri}', '${feature.name}', ${step.keyword}, '${step.text}', '${passed}'`,
            process.pid,
        );

        const pos = this.currentTestScenario.executedSteps.length - 1;
        this.currentTestScenario.executedSteps[pos].result = passed ? 'passed' : 'failed';
        this.currentTestScenario.executedSteps[pos].error = error;

        if (!passed) {
            try {
                mkdirp.sync('./reports/images/');
                const screenshotFileName = `./reports/images/${this.currentTestScenario.name}-${pos}.png`;
                if (page && typeof page.screenshot === 'function') {
                    await page.screenshot({ path: screenshotFileName, fullPage: true });
                    console.log('screenshot taken');
                    this.currentTestScenario.executedSteps[
                        pos
                    ].screenshot = `${this.currentTestScenario.name}-${pos}.png`;
                    console.log(
                        this.LOG_HEADER,
                        this.LOG_HEADER,
                        `Captured screenshot at '${screenshotFileName}'`,
                    );
                } else {
                    console.warn('Page object not available for screenshot');
                }
            } catch (screenshotError) {
                console.error('Failed to capture screenshot:', screenshotError);
            }
        }
    }

    /**
     * This Method is executed after every Scenario in Scenario
     * @param {string} uri the uri details from scenario
     * @param {string} feature the feature details from scenario
     * @param {string} scenario the Scenario details from scenario
     * @param {string} result the result details from scenario
     * @param {string} sourceLocation the sourceLocation details from scenario
     * @param {string} requestDetails the sourceLocation details from scenario
     * @param {string} page the sourceLocation details from scenario
     * @returns {JSONData} which contains response for CloseTestCase call
     */
    async afterScenario(uri, feature, scenario, result, sourceLocation, requestDetails, page) {

        const LOG_METHOD = 'afterScenario';
        const testTags = scenario.tags;
        const resultLogs = [];
        const tagsList = [];
        const steps = [];


        if (testTags && testTags.length && testTags.length > 0) {
            const tags = _.map(testTags, (tag) => tag.name);
            _.merge(tagsList, tags);

            // eslint-disable-next-line prefer-template
            steps.push('info: ' + tags);
        }

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `'${uri}', '${feature.name}', '${scenario.name}' for test case id '${this.currentTestScenario.id}' ${this.currentTestScenario.counter}`,
            tagsList,
            /* result, */
            /* scenario.steps, */
            result.status,
            process.pid,
            sourceLocation.line,
        );

        let testResult = null;
        let comment = null;
        console.log(result.status)
        if (result.status === 'FAILED') {
            testResult = 'FAIL';
            comment = `'${result.message.substring(0, 150)}'`;
        } else if (result.status === 'undefined') {
            testResult = 'SKIP';
        } else {
            testResult = 'PASS';
        }

        const endDateTime = new Date().toISOString();
        console.log("process.env.CAT_JOB_ID ::", process.env.CAT_JOB_ID)
        if (process.env.CAT_JOB_ID) {
            const featureName = feature.name;
            let stepFailed = false;
            // eslint-disable-next-line no-plusplus
            for (let stepCount = 0; stepCount < scenario.steps.length; ++stepCount) {
                if (!stepFailed) {
                    if (
                        this.currentTestScenario.executedSteps[stepCount].error
                    ) {
                        console.log("Error Occured and pushing screenshot")
                        stepFailed = true;
                        steps.push(
                            `info: '${this.currentTestScenario.executedSteps[stepCount].step.replace(':', ' ')}', FAILED`,
                        );
                        if (process.env.BUILD_URL) {
                            console.log("pushing screenshot")
                            steps.push(
                                `screenshot: ${process.env.BUILD_URL}artifact/reports/images/${this.currentTestScenario.executedSteps[stepCount].screenshot}`,
                            );
                            console.log(
                                this.LOG_HEADER,
                                LOG_METHOD,
                                `${process.env.BUILD_URL}artifact/reports/images/${this.currentTestScenario.executedSteps[stepCount].screenshot}`,
                            );
                        } else {
                            steps.push(`screenshot: ${this.currentTestScenario.executedSteps[stepCount].screenshot}`);
                            console.log(
                                this.LOG_HEADER,
                                LOG_METHOD,
                                `${this.currentTestScenario.executedSteps[stepCount].screenshot}`,
                            );
                        }
                        console.log(
                            this.LOG_HEADER,
                            LOG_METHOD,
                            `info: '${this.currentTestScenario.executedSteps[stepCount].step}', FAILED`,
                        );
                    } else if (uri.includes('features-build')) {
                        steps.push(
                            `info: '${this.currentTestScenario.executedSteps[stepCount].step
                                .replace(':', ' ')
                                .trim()}', PASSED`,
                        );
                        console.log(
                            this.LOG_HEADER,
                            LOG_METHOD,
                            `info: '${this.currentTestScenario.executedSteps[stepCount].step}', PASSED`,
                        );
                    } else {
                        steps.push(
                            `info: '${this.currentTestScenario.executedSteps[stepCount].step
                                .replace(':', ' ')
                                .trim()}', PASSED`,
                        );
                        console.log(
                            this.LOG_HEADER,
                            LOG_METHOD,
                            `info: '${this.currentTestScenario.executedSteps[stepCount].step}', PASSED`,
                        );
                    }
                } else {
                    steps.push(
                        `info: '${scenario.steps[stepCount].text}', SKIPPED`,
                    );
                    console.log(
                        this.LOG_HEADER,
                        LOG_METHOD,
                        `info: '${scenario.steps[stepCount].text}', SKIPPED`,
                    );
                }
            }

            if (steps.length > 0) {
                resultLogs.push({
                    stringValue: steps,
                    name: 'combined-log',
                    type: 'text/json',
                });

                if (requestDetails) {
                    resultLogs.push({
                        RRValues: requestDetails,
                        name: 'combined-log',
                        type: 'text/json',
                    });
                }
            }

            const catUrl = process.env.CAT_URL || DEFAULT_PROD_CAT_URL;
            const catApiPath = process.env.CAT_API_PATH || DEFAULT_CAT_WS_PATH;
            const catProxy = new CatProxy(
                catUrl,
                catApiPath,
                null,
                process.env.CAT_JOB_ID,
            );


            return catProxy.closeTestcase(
                featureName,
                endDateTime,
                this.currentTestScenario.counter,
                testResult,
                comment,
                resultLogs,
                process.env.confirmationNumber, {
                metatags: tagsList,
            },
            )
                .then((data) => {
                    console.log(
                        this.LOG_HEADER,
                        LOG_METHOD,
                        `'${uri}', '${feature.name}', '${scenario.name}'----------- ${this.currentTestScenario.counter}`,
                        data._id,
                    );
                    process.env.confirmationNumber = '';
                    return data;
                })
                .catch((err) => {
                    console.log(
                        this.LOG_HEADER,
                        LOG_METHOD,
                        `'${uri}', '${feature.name}', '${scenario.name}' failed to close test case`,
                        err,
                    );
                    return null;
                });
        }
        // Skip page reload in afterScenario as it may interfere with cleanup
        // Let the test framework handle page lifecycle
    }

    /**
     * This Method is executed after each Feature file
     * @param {string} uri the uri details from scenario
     * @param {string} feature the feature details from scenario
     * @param {string} scenarios the Scenario details from scenario
     * @returns {JSONData} which contains response for CloseCollectionCase call
     */
    afterFeature(uri, feature) {
        const LOG_METHOD = 'afterFeature';

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            'afterFeature',
            uri,
            feature.name,
            process.pid,
        );

        const endDateTime = new Date().toISOString();

        if (process.env.CAT_JOB_ID) {
            const featureName = feature.name;
            const catUrl = process.env.CAT_URL || DEFAULT_PROD_CAT_URL;
            const catApiPath = process.env.CAT_API_PATH || DEFAULT_CAT_WS_PATH;
            const catProxy = new CatProxy(
                catUrl,
                catApiPath,
                null,
                process.env.CAT_JOB_ID,
            );

            return catProxy
                .closeCollection(featureName, endDateTime)
                .then((data) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'cat response', data._id);
                    return data;
                })
                .catch((err) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'failed to close collection', err);
                    return null;
                });
        }
    }

    /**
     * This Method is executed after all Feature files execution 
     * @param {string} resultStatus the final result status
     * @returns {JSONData} which contains response for CloseJob call
     */
    onComplete(resultStatus) {
        const LOG_METHOD = 'onComplete';

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `Process: ${process.pid}, Final Status: ${resultStatus}`,
        );

        const endDateTime = new Date().toISOString();

        if (process.env.CAT_JOB_ID && process.env.CAT_DISABLE_CLOSE_JOB !== 'true') {
            const catUrl = process.env.CAT_URL || DEFAULT_PROD_CAT_URL;
            const catApiPath = process.env.CAT_API_PATH || DEFAULT_CAT_WS_PATH;
            const catProxy = new CatProxy(
                catUrl,
                catApiPath,
                null,
                process.env.CAT_JOB_ID,
            );
            return catProxy
                .closeJob(endDateTime, "COMPLETED")
                .then((data) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, `✅ CAT job finalized: ${data._id}`);
                })
                .catch((err) => {
                    // Handle 404 errors gracefully - job might already be closed or endpoint changed
                    if (err.message.includes('404') || err.message.includes('Not Found')) {
                        console.log(this.LOG_HEADER, LOG_METHOD, '⚠️  CAT job close endpoint not found (404) - job may already be closed');
                    } else {
                        console.log(this.LOG_HEADER, LOG_METHOD, '❌ Failed to close CAT job:', err);
                    }
                });
        } else if (process.env.CAT_DISABLE_CLOSE_JOB === 'true') {
            console.log(this.LOG_HEADER, LOG_METHOD, '⚠️  CAT job closing disabled by configuration');
        } else {
            console.log(this.LOG_HEADER, LOG_METHOD, '⚠️  No CAT_JOB_ID found for completion');
        }
    }
}

export default new CatPortalHooks();