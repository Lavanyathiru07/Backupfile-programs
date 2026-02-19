// process.env.CAT_JOB_NAME  = "cat-prova-ui-bat-0806"        
// process.env.CAT_BUILD_NO = Math.floor(Math.random()* 100)
// process.env.CAT_ENV = "TEST-Local-BAT"
// process.env.CAT_URL = "https://cat.stg.allegiantair.com"
// process.env.CAT_API_PATH = "/api/ui/results"
// process.env.DEFAULT_CAT_UI = "true"
// process.env.confirmationNumber = "Q4WSXS"
process.env.ENV = process.env.appEnv
import BrowserInfo from './browser_Info'
if (process.env.flag === undefined) {
  BrowserInfo.browserinformation()
  process.env.flag = false
}
const _ = require('lodash');
import browsers from './browsers-config'
 
import CatPortalWdioConf from '@g4/cat-integration-util/src/ui-hooks/cat-ui-hooks';
let target_browser = process.env.browser;
 
let browserConfig = null;
let browserArg = process.argv.find(function (arg) {
  return /target_browser/.test(arg);
});
if (browserArg) {
  browserConfig = browsers[browserArg.split('=')[1]];
}
if (!browserConfig) {
  browserConfig = browsers['chrome'];
}
if (target_browser) {
  browserConfig = browsers[target_browser]; //valid values: chrome,firefox,safari,chromeFirefox,chromeFirefoxSafari
} else {
  browserConfig = browsers['chrome']; //default values: chrome
}
 
 
exports.config = _.extend({
  specs: [
    '.tmp/features/**/*.feature'
  ],
  exclude: [
    // 'path/to/excluded/files'
  ],
  hostname: 'selenium.apps.devops-qaa.aws.allegiantair.com',
  port: 443,
  path: '/wd/hub',
  protocol: 'https',
  maxInstances: 6,
  capabilities: browserConfig,
  // capabilities: [{
  //   browserName: 'chrome',
  // maxInstances: 2,
  // acceptInsecureCerts: true,
  // 'goog:chromeOptions': {
  //  args: ['--ignore-certificate-errors']
  // },
  // }],
  // browserName: 'firefox',
  // maxInstances: 2,
  // acceptInsecureCerts: true,
  // 'goog:chromeOptions': {
  //  args: ['--ignore-certificate-errors']
  // },
  // }],
  // [{
 
  // maxInstances can get overwritten per capability. So if you have an in-house Selenium
  // grid with only 5 firefox instances available you can make sure that not more than
  // 5 instances get started at a time.
  // maxInstances: 5,
  // //
  // browserName: 'chrome',
  // acceptInsecureCerts: true
  // If outputDir is provided WebdriverIO can capture driver session logs
  // it is possible to configure which logTypes to include/exclude.
  // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
  // excludeDriverLogs: ['bugreport', 'server'],
  // }],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'silent',  
  bail: 0,
  baseUrl: process.env.appEnv,
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  // Default request retries count
  connectionRetryCount: 3,
  services: [],
  //services: ['chromedriver'],
  // services: ['devtools'],
  framework: 'cucumber',
  reporters: [
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }]
  ],
  cucumberOpts: {
    require: [
      // './step-definitions/*.js',
      './step-definitions/**/*.js',
      // 'node_modules/@g4/prova-ui/src/step-definitions/*.js'
    ],
 
    // <boolean> show full backtrace for errors
    backtrace: false,        
    requireModule: [
      [
        '@babel/register',
        {
          ignore: [
            filepath =>
              filepath.includes('node_modules') &&
              !filepath.includes('prova-ui'),
          ],
        },
      ],
    ],    
    dryRun: false,    
    failFast: false,  
    snippets: true,    
    source: true,    
    strict: false,    
    tagExpression: process.env.tag,  
    timeout: 600000,
    ignoreUndefinedDefinitions: false,
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
      if (result.status === 'failed') {
        browser.saveScreenshot('/reports/images/test.png')
      }
    }
  },
},
  CatPortalWdioConf
);
 
 