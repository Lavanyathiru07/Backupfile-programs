/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import { Before, After, setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, firefox } from 'playwright';

// class CustomWorld {
//     browser;
//     page;
//     context;
//     constructor() {
//         // Initialize the browser in the World object.
//         this.browser = null;
//         this.page = null;
//         this.context = null;
//     }

//     async initBrowser() {
//         this.browser = await chromium.launch({ headless: true });
//         this.context = await this.browser.newContext();
//         this.page = await this.context.newPage();
//     }

//     async closeBrowser() {
//         await this.browser.close();
//     }
// }

// setWorldConstructor(CustomWorld);
setDefaultTimeout(60000);

Before(async function () {
    // Initialize the browser in the Before hook using the World object.
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();   
});

After(async function () {
    await this.browser.close();
});