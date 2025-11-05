#!/usr/bin/env node

/**
 * Browser Setup Verification Script
 * Verifies that Playwright browsers are properly installed and can launch
 */

const { chromium, firefox, webkit } = require('playwright');

async function verifyBrowser(browserType, browserName) {
    console.log(`\n🔍 Testing ${browserName} browser...`);
    
    try {
        const isCI = process.env.CI === 'true';
        const headlessMode = process.env.HEADLESS !== 'false';
        
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
        
        // Add single-process mode for CI environments (same as Cucumber hooks)
        if (isCI) {
            launchOptions.args.push(
                '--single-process',
                '--disable-extensions',
                '--disable-plugins',
                '--disable-translate',
                '--disable-default-apps'
            );
            launchOptions.slowMo = 200;
            launchOptions.timeout = 120000;
        }
        
        const browser = await browserType.launch(launchOptions);
        
        // Verify browser is connected
        if (!browser.isConnected()) {
            throw new Error(`${browserName} launched but is not connected`);
        }
        
        // Add delay for CI stability
        await new Promise(resolve => setTimeout(resolve, isCI ? 1000 : 500));
        
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true,
            actionTimeout: 30000,
            navigationTimeout: 60000
        });
        
        // Add delay before creating page
        await new Promise(resolve => setTimeout(resolve, isCI ? 500 : 200));
        
        const page = await context.newPage();
        
        await page.goto('data:text/html,<html><body><h1>Browser Test</h1></body></html>');
        const title = await page.textContent('h1');
        
        await page.close();
        await context.close();
        await browser.close();
        
        if (title === 'Browser Test') {
            console.log(`✅ ${browserName} browser is working correctly`);
            return true;
        } else {
            console.log(`❌ ${browserName} browser test failed - unexpected content`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ${browserName} browser failed: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🚀 Starting browser verification...');
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CI: ${process.env.CI || 'false'}`);
    console.log(`HEADLESS: ${process.env.HEADLESS || 'not set'}`);
    console.log(`PLAYWRIGHT_BROWSERS_PATH: ${process.env.PLAYWRIGHT_BROWSERS_PATH || 'default'}`);
    
    const results = {};
    
    // Test only chromium in CI environment
    if (process.env.CI === 'true') {
        console.log('\n📋 CI environment detected - testing chromium only');
        results.chromium = await verifyBrowser(chromium, 'Chromium');
    } else {
        // Test all browsers in local environment
        results.chromium = await verifyBrowser(chromium, 'Chromium');
        results.firefox = await verifyBrowser(firefox, 'Firefox');
        results.webkit = await verifyBrowser(webkit, 'WebKit');
    }
    
    console.log('\n📊 Summary:');
    const successful = Object.values(results).filter(Boolean).length;
    const total = Object.values(results).length;
    
    Object.entries(results).forEach(([browser, success]) => {
        console.log(`  ${browser}: ${success ? '✅' : '❌'}`);
    });
    
    if (successful === total) {
        console.log(`\n🎉 All ${total} browser(s) verified successfully!`);
        process.exit(0);
    } else {
        console.log(`\n⚠️  ${successful}/${total} browser(s) working. Some browsers may have issues.`);
        process.exit(1);
    }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

main().catch(console.error);