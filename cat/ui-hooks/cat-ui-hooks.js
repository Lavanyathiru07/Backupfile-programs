'use strict';

const LOG_HEADER = 'wdio.conf.js';
const fs = require('fs')
let CatHooksobj = require('../helpers/cat-portal-hooks')
const qTestApi = require('../helpers/qTestHelpers')
console.log(LOG_HEADER, process.pid, process.ppid);

var outputPost, outputGet
let testStepInfo = []
let screenshotPath
var beforeScenarioDateTime
const CatPortalWdioConf = {
    async onPrepare() {
        await CatHooksobj.onPrepare();

        if (process.env.AddNetworkLogs === "true") {
            fs.rmSync('./networkLogs', {
                recursive: true,
                force: true,
            });

            fs.mkdirSync('./networkLogs');
        }

    },

    async beforeFeature(uri, feature) {
        await CatHooksobj.beforeFeature(uri, feature);
    },

    async beforeScenario(scenario) {
        testStepInfo = []
        beforeScenarioDateTime = new Date()
        await CatHooksobj.beforeScenario(scenario.gherkinDocument.uri, scenario.gherkinDocument.feature, scenario.pickle, scenario.gherkinDocument.feature.location);
        if (process.env.AddNetworkLogs === "true") {
            outputGet = await browser.mock('**', {
                method: 'get',
                header: {
                    "Accept": 'text/html',
                },
            })
            outputPost = await browser.mock('**', {
                method: 'post',
            })
        }

        if(process.env.parentId !== undefined) {
        await qTestApi.getTestRunMapping(process.env.parentId);
        scenario.pickle.steps.forEach((step, index)=>{
            let stepInfoObj = {};
            stepInfoObj.stepName = step.text
            stepInfoObj.status = "Unexecuted"
            stepInfoObj.indexNumber = index
            testStepInfo.push(stepInfoObj)
        })
    }
    },

    beforeStep(step, scenario) {
        CatHooksobj.beforeStep(scenario.uri, scenario, step);
    },

    async afterStep(step, scenario, result) {
        screenshotPath = CatHooksobj.afterStep(scenario.uri, scenario, step, result.error, result.passed);
        await updateStatus(testStepInfo, step.text, result.passed ? 'Passed' : 'Failed' )
    },

    async afterScenario(scenario) {
        let afterScenarioDateTime = new Date()
        await CatHooksobj.afterScenario(scenario.gherkinDocument.uri, scenario.gherkinDocument.feature, scenario.pickle, scenario.result, scenario.gherkinDocument.feature.location);

        if (process.env.AddNetworkLogs === "true") {

            if (scenario.result.status === 'FAILED') {
                let scenarioName = scenario.pickle.name
                scenarioName = scenarioName.split(",").join("")
                let newScenarioName = scenarioName.replace(/ /g, "_")

                fs.mkdirSync('./networkLogs/' + newScenarioName);

                try {
                    Object.keys(outputGet.calls).forEach(function (key) {
                        let url = outputGet.calls[key].url
                        console.log("GET call URLs: ", url)
                        fs.writeFile('./networkLogs/' + newScenarioName + '/' + key + '_getHtmlCall.json',
                            JSON.stringify(outputGet.calls[key]),
                            function (err) {
                                if (err) throw err
                            })
                    })
                } catch (err) {
                    console.log("get call error", err)
                }

                try {
                    Object.keys(outputPost.calls).forEach(function (key) {
                        let url = outputPost.calls[key].url
                        console.log("POST call URLs: ", url)

                        if (url.includes("graphql")) {
                            console.log("name ", outputPost.calls[key].headers['X-APOLLO-OPERATION-NAME'])
                            let callName = (outputPost.calls[key].headers['X-APOLLO-OPERATION-NAME'])
                            fs.writeFile('./networkLogs/' + newScenarioName + '/' + key + '_' + callName + '_graphql.json',
                                JSON.stringify(outputPost.calls[key]),
                                function (err) {
                                    if (err) throw err
                                })
                        } else {
                            fs.writeFile('./networkLogs/' + newScenarioName + '/' + key + '_Non-graphql.json',
                                JSON.stringify(outputPost.calls[key]),
                                function (err) {
                                    if (err) throw err
                                })
                        }


                    })
                } catch (err) {
                    console.log("post call error", err)
                }

            }
        }

        if(process.env.parentId !== undefined) {
        const TestCaseName = scenario.pickle.name; 
        let testResult = scenario.result.status
        let catEnv = process.env.appEnv;
        let environment;
        if (catEnv.includes("-")) {
            let pattern = /(?:https?:\/\/)?(?:www\.)?([^.-]+(?:\.[^.-]+))/;
            let match = catEnv.match(pattern);

            if (match) {
                let subdomain = match[1];
                environment = `-${subdomain}`;
            }
        } else {
            let pattern = /www\.([^\.]+)/;
            let match = catEnv.match(pattern);
            environment = match ? match[1] : null;
            
            if (environment === 'allegiantair') {
                environment = "prod";
            }
        }

        let startDateTime = beforeScenarioDateTime.toISOString();
        let endDateTime = afterScenarioDateTime.toISOString();
        const qTesttestRunId = await qTestApi.updateTestSteps(TestCaseName, testStepInfo , testResult, environment, startDateTime, endDateTime)
        const failedTestStepLogId = await qTestApi.getFailedTestStepLogId(qTesttestRunId)
        if (failedTestStepLogId) {
            await qTestApi.attachScreenshottoFailedTestStep(screenshotPath.split('./reports/images/')[1], screenshotPath, failedTestStepLogId);
        } else {
            console.log("No failed test steps, skipping screenshot attachment.");
        }
    }
    },

    async afterFeature(uri, feature) {
        await CatHooksobj.afterFeature(uri, feature);
    },

    async onComplete(results) {
        await CatHooksobj.onComplete(results);
    },
};

/**
     * update the status of the test.
     * @param {string} testStepInfo - testStepInfo.
     * @param {string} testName - testName
     * @param {string} newStatus - newStatus
     */
async function updateStatus(testStepInfo, testName, newStatus) {
    for (let i = 0; i < testStepInfo.length; i++) {
        if ((testStepInfo[i].stepName === testName) && (testStepInfo[i].indexNumber === i) && (testStepInfo[i].status === "Unexecuted")) {
            testStepInfo[i].status = newStatus;
            break;
        }
    }
}

module.exports = CatPortalWdioConf;
