const CatHelper = require('./cat-helper');
const _ = require('lodash');
const CatProxy = CatHelper.CatServer;
const mkdirp = require('mkdirp');

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
            process.pid,
            process.ppid,
        );

        if (process.env.CAT_URL && process.env.CAT_API_PATH) {
            catProxy = new CatProxy(process.env.CAT_URL, process.env.CAT_API_PATH);
        } else {
            catProxy = new CatProxy(CatHelper.DEFAULT_PROD_CAT_URL, CatHelper.DEFAULT_CAT_WS_PATH);
        }

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
                    console.log(this.LOG_HEADER, LOG_METHOD, 'created job', data._id);
                    process.env.CAT_JOB_ID = data._id;
                    return data;
                })
                .catch((err) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'create job failed', err);
                    return null;
                });
        }
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
            catProxy = new CatProxy(
                process.env.CAT_URL,
                process.env.CAT_API_PATH,
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
     * @returns {JSONData} which contains response for CreateTestCase call
     */
    async beforeScenario(uri, feature, scenario,sourceLocation) {
        const LOG_METHOD = 'beforeScenario';
        try {
            await browser.reloadSession()
        } catch (error) {
            console.log(error)
        }        
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
        // this.currentTestScenario.counter = new Date().getMilliseconds();
        //this.currentTestScenario.counter = Math.floor(1000 + Math.random() * 9000).toString();
        const now = new Date();
        const seconds = now.getSeconds().toString().padStart(2, '0');      // e.g., "07"
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0'); // e.g., "123"
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const code = minutes + seconds + milliseconds;
        this.currentTestScenario.counter = code.slice(3, 7).toString()

        const tags = _.map(scenario.tags, (tag) => tag.name);
        console.log("process.env.CAT_JOB_ID ::", process.env.CAT_JOB_ID)
        if (process.env.CAT_JOB_ID) {
            const catProxy = new CatProxy(
                process.env.CAT_URL,
                process.env.CAT_API_PATH,
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
     */
    afterStep(uri, feature, step, error, passed) {
        const LOG_METHOD = 'afterStep';
        let screenshotFileName
        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            `'${uri}', '${feature.name}', ${step.keyword}, '${step.text}', '${passed}'`,
            process.pid,
        );

        const pos = this.currentTestScenario.executedSteps.length - 1;
        this.currentTestScenario.executedSteps[pos].result = passed ? 'passed' : 'failed';
        this.currentTestScenario.executedSteps[pos].error = error;

            // Take screenshot for all steps, not just failed ones
            mkdirp.sync('./reports/images/');
            screenshotFileName = `./reports/images/${this.currentTestScenario.name}-${pos}.png`;
            browser.saveScreenshot(screenshotFileName);
            console.log('screenshot taken');
            this.currentTestScenario.executedSteps[
                pos
            ].screenshot = `${this.currentTestScenario.name}-${pos}.png`;
            console.log(
                this.LOG_HEADER,
                this.LOG_HEADER,
                `Captured screenshot at '${screenshotFileName}'`,
            );
        return screenshotFileName
    }

    /**
     * This Method is executed after every Scenario in Scenario
     * @param {string} uri the uri details from scenario
     * @param {string} feature the feature details from scenario
     * @param {string} scenario the Scenario details from scenario
     * @param {string} result the result details from scenario
     * @param {string} sourceLocation the sourceLocation details from scenario
     * @param {string} requestDetails the sourceLocation details from scenario
     * @returns {JSONData} which contains response for CloseTestCase call
     */
    async afterScenario(uri, feature, scenario, result, sourceLocation, requestDetails) {

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
            result.status,
            process.pid,
            sourceLocation.line,
        );

        let testResult = null;
        let comment = null;
        console.log(result.status)
        if (result.status === 'FAILED') {
            testResult = 'FAIL';
            comment = `'${result.message.split('at ')[0].split(": ")[1]}'`;
        } else if (result.status === 'undefined') {
            testResult = 'SKIP';
        } else {
            testResult = 'PASS';
        }

        const endDateTime = new Date().toISOString();
        console.log("process.env.CAT_JOB_ID ::", process.env.CAT_JOB_ID)
        let screenshotFilePath, screenshotFileName
        if (process.env.CAT_JOB_ID) {
    const featureName = feature.name;
    let stepFailed = false;
    // eslint-disable-next-line no-plusplus
    for (let stepCount = 0; stepCount < scenario.steps.length; ++stepCount) {
        if (!stepFailed && stepCount < this.currentTestScenario.executedSteps.length) {
            const currentStep = this.currentTestScenario.executedSteps[stepCount];
            
            if (currentStep.error) {
                console.log("Error Occurred and pushing screenshot")
                stepFailed = true;
                steps.push(
                    `info: '${currentStep.step.replace(':', ' ')}', FAILED`,
                );
            } else {
                steps.push(
                    `info: '${currentStep.step.replace(':', ' ').trim()}', PASSED`,
                );
            }
            
            // Always add screenshot for all steps regardless of pass/fail status
            if (process.env.BUILD_URL) {
                steps.push(
                    `screenshot: ${process.env.BUILD_URL}artifact/reports/images/${currentStep.screenshot}`,
                );
                console.log(
                    this.LOG_HEADER,
                    LOG_METHOD,
                    `${process.env.BUILD_URL}artifact/reports/images/${currentStep.screenshot}`,
                );
            } else {
                steps.push(`screenshot: ${currentStep.screenshot}`);
                console.log(
                    this.LOG_HEADER,
                    LOG_METHOD,
                    `${currentStep.screenshot}`,
                );
            }
            
            console.log(
                this.LOG_HEADER,
                LOG_METHOD,
                `info: '${currentStep.step}', ${currentStep.error ? 'FAILED' : 'PASSED'}`,
            );
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

            const catProxy = new CatProxy(
                process.env.CAT_URL,
                process.env.CAT_API_PATH,
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
        try {
            await browser.reloadSession()
        } catch (error) {
            console.log(error)
        }
       
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
            const catProxy = new CatProxy(
                process.env.CAT_URL,
                process.env.CAT_API_PATH,
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
     * @param {string} resultStatus the uri details from scenario
     * @returns {JSONData} which contains response for CloseJob call
     */
    onComplete(resultStatus) {
        const LOG_METHOD = 'onComplete';

        console.log(
            this.LOG_HEADER,
            LOG_METHOD,
            process.pid,
        );

        const endDateTime = new Date().toISOString();

        if (process.env.CAT_JOB_ID) {
            const catProxy = new CatProxy(
                process.env.CAT_URL,
                process.env.CAT_API_PATH,
                null,
                process.env.CAT_JOB_ID,
            );
            return catProxy
                .closeJob(endDateTime, "COMPLETED")
                .then((data) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'cat response', data._id);
                })
                .catch((err) => {
                    console.log(this.LOG_HEADER, LOG_METHOD, 'failed to close collection', err);
                });
        }
    }
}

module.exports = new CatPortalHooks()