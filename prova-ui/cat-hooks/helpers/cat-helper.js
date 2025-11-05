import _ from 'lodash';
import http from 'http';
import https from 'https';

const DEFAULT_PROD_CAT_URL = 'https://cat.stg.allegiantair.com';
const DEFAULT_UI_API_PATH = '/api/ui/results';
const DEFAULT_CAT_WS_PATH = '/api/webservices/results';
const LOG_HEADER = 'CatHelper.js';

/**
 * CAT Proxy to send job, test collection and cases JSONS.
 * LIMITED to use public CA based HTTPS, needs to upgrade to talk to https servers with
 * self-signed certificates.
 * Operational/usage for this proxy are as follows
 * 1. var catProxy = new CatServer(...)
 *      [examples: `new instance('https://server', '/api/buildresults/jobs/push', {ca: ...}))`,
 *      `new instance(DEFAULT_PROD_CAT_URL, DEFAULT_CAT_WS_PATH)]`
 * 2. catProxy.createJob(...) - to create a job (only once)
 * 3. catProxy.createCollection(...) - to create one collection / test-suite (with unique
 *      testCollectionName per job )
 * 4. catProxy.createTestCase(...) - to create one testCase, any number of times, (with unique
 *      testId per testCollection)
 * 5. catProxy.closeTestCase(...) - to close the respective testCase (once per unique testId
 *       per testCollection)
 * 6. catProxy.closeCollection(...) - to close the respect test collection (once per unique
 *       testCollectionName per job)
 * 7. catProxy.closeJob(...) - to close the job
 *
 * Each instance of this proxy shall be used to talk to
 * @class
 */
class CatServer {
    /**
     * Create instance
     * @param {string} catUrl urlofthe CAT application
     * @param {string} apiPath path of api
     * @param {any} connectionOptions connectionsoptions
     * @param {string} jobId id of the job if already available
     */
    constructor(catUrl, apiPath, connectionOptions, jobId) {
        this.apiUrl = catUrl + apiPath;
        this.connectionOptions = connectionOptions;
        this.catSender = catUrl.startsWith('https') ? https : http;
        this.catJobId = jobId;
    }

    /**
     * Prepare and send a `jobCreationJson` to CAT portal based on the values got from parameters
     * @param {string} jobName The name of the job which has to be sent
     * @param {string} buildNo The Build number which has to be sent
     * @param {string} env Enviroment
     * @param {string} startDateTime ISO-string formatted date time
     * @param {string} parentJobName optional
     * @param {string} parentBuildNo optional
     * @param {string} parentStartDateTime optional
     * @param {object} additionalKeyValues any future expansions
     * @returns {promises} promises
     */
    createJob(
        jobName,
        buildNo,
        env,
        startDateTime,
        parentJobName,
        parentBuildNo,
        parentStartDateTime,
        additionalKeyValues,
    ) {
        const LOG_METHOD = 'createJob';
        const _this = this;
        const { catSender } = this;
        const { apiUrl } = this;

        // create JSON
        const jsonToSend = {
            jobCreationJson: {
                jobName,
                buildReference: buildNo,
                environment: env,
                startDateTime,
                parentJobDetails: {
                    jobName: parentJobName,
                    buildReference: parentBuildNo,
                    startDateTime: parentStartDateTime,
                },
            },
        };

        if (additionalKeyValues && _.isEmpty(additionalKeyValues)) {
            Object.assign(jsonToSend, additionalKeyValues);
        }

        return new Promise((resolve, reject) => {
            // send JSON
            const req = catSender.request(
                apiUrl,
                { method: 'POST', headers: { 'content-type': 'application/json' } },
                (res) => {
                    // console.log(LOG_HEADER, LOG_METHOD, 'got', res.statusCode, res.statusMessage);
                    let data = null;

                    if (res.statusCode !== 201) {
                        return reject(new Error(`got back ${res.statusCode}/${res.statusMessage}`));
                    }

                    // monitor for error; and report back
                    res.on('error', (err) => {
                        console.log(LOG_HEADER, LOG_METHOD, 'sending error', err);
                        reject(err);
                    });

                    // collect all the incoming data; to process and send back
                    res.on('data', (chunk) => {
                        if (data) {
                            data += chunk;
                        } else {
                            data = chunk;
                        }
                    });

                    // monitor for completion of response to send back data
                    res.on('end', () => {
                        if (data) {
                            // Ensure the send back JSON data for further use
                            try {
                                const jsonData = JSON.parse(data);

                                // capture _id, for future jobClosingJson, testCreationJson, etc.,
                                _this.catJobId = jsonData._id;

                                // console.log(LOG_HEADER, LOG_METHOD, 'got back', _this.catJobId);
                                resolve(jsonData);
                            } catch (error) {
                                console.log(
                                    LOG_HEADER,
                                    LOG_METHOD,
                                    'error processing response',
                                    error,
                                    'for',
                                    _this.catJobId,
                                    'with',
                                    data,
                                );
                                reject(error);
                            }
                        } else {
                            console.log(
                                LOG_HEADER,
                                LOG_METHOD,
                                'no data received',
                                'for',
                                _this.catJobId,
                            );
                            reject(new Error('no data received'));
                        }
                    });
                    return true;
                },
            );

            // send json
            req.write(JSON.stringify(jsonToSend));
            req.end();
        });
    }

    /**
     * Prepare and send a `createCollection` to CAT portal based on the values got from parameters
     * @param {string} endDateTime Calculates the Endate and time
     * @param {string} jobStatus Status of the job
     * @param {string} additionalKeyValues Env to be defined
     * @returns {promises} promises
     */
    closeJob(endDateTime, jobStatus, additionalKeyValues) {
        const LOG_METHOD = 'closeJob';
        const { catSender } = this;
        const { apiUrl } = this;
        const _this = this;

        const jsonToSend = {
            jobClosingJson: {
                JobID: this.catJobId,
                endDateTime,
                jobStatus,
            },
        };

        if (additionalKeyValues && _.isEmpty(additionalKeyValues)) {
            Object.assign(jsonToSend, additionalKeyValues);
        }

        return new Promise((resolve, reject) => {
            // send JSON
            const req = catSender.request(
                apiUrl,
                { method: 'POST', headers: { 'content-type': 'application/json' } },
                (res) => {
                    // console.log(LOG_HEADER, LOG_METHOD, 'got', res.statusCode, res.statusMessage,
                    //  'for', _this.catJobId);
                    let data = null;

                    if (res.statusCode !== 200) {
                        return reject(new Error(`got back ${res.statusCode}/${res.statusMessage}`));
                    }

                    // monitor for error; and report back
                    res.on('error', (err) => {
                        console.log(LOG_HEADER, LOG_METHOD, 'error', err, 'for', _this.catJobId);
                        reject(err);
                    });

                    // collect all the incoming data; to process and send back
                    res.on('data', (chunk) => {
                        if (data) {
                            data += chunk;
                        } else {
                            data = chunk;
                        }
                    });

                    // monitor for completion of response to send back data
                    res.on('end', () => {
                        if (data) {
                            // Ensure the send back JSON data for further use
                            try {
                                const jsonData = JSON.parse(data);
                                resolve(jsonData);
                            } catch (error) {
                                console.log(
                                    LOG_HEADER,
                                    LOG_METHOD,
                                    'error processing response',
                                    error,
                                    'for',
                                    _this.catJobId,
                                    'with',
                                    data,
                                );
                                reject(error);
                            }
                        } else {
                            console.log(
                                LOG_HEADER,
                                LOG_METHOD,
                                'no data received',
                                'for',
                                _this.catJobId,
                            );
                            reject(new Error('no data received'));
                        }
                    });
                    return true;
                },
            );
            // send json
            req.write(JSON.stringify(jsonToSend));
            req.end();
        });
    }

    /**
     * Prepare and send a `createCollection` to CAT portal based on the values got from parameters
     * @param {string} testCollectionName Collection details , Feature Name
     * @param {string} startDateTime ISO-string formatted date time
     * @param {string} additionalKeyValues Env to be defined
     * @returns {promises} promises
     */
    createCollection(testCollectionName, startDateTime, additionalKeyValues) {
        const LOG_METHOD = 'createCollection';
        const { catSender } = this;
        const { apiUrl } = this;
        const _this = this;
        const jsonToSend = {
            testcollectionCreation: {
                JobID: this.catJobId,
                startDateTime,
                testCollectionName,
            },
        };

        if (additionalKeyValues && _.isEmpty(additionalKeyValues)) {
            Object.assign(jsonToSend, additionalKeyValues);
        }

        return new Promise((resolve, reject) => {
            // send JSON
            const req = catSender.request(
                apiUrl,
                { method: 'POST', headers: { 'content-type': 'application/json' } },
                (res) => {
                    // console.log(LOG_HEADER, LOG_METHOD, 'got', res.statusCode, res.statusMessage,
                    //  'for', _this.catJobId);
                    let data = null;
                    if (res.statusCode !== 200) {
                        return reject(new Error(`got back ${res.statusCode}/${res.statusMessage}`));
                    }

                    // monitor for error; and report back
                    res.on('error', (err) => {
                        console.log(
                            LOG_HEADER,
                            LOG_METHOD,
                            'sending error',
                            err,
                            'for',
                            _this.catJobId,
                        );
                        reject(err);
                    });

                    // collect all the incoming data; to process and send back
                    res.on('data', (chunk) => {
                        if (data) {
                            data += chunk;
                        } else {
                            data = chunk;
                        }
                    });

                    // monitor for completion of response to send back data
                    res.on('end', () => {
                        if (data) {
                            // Ensure the send back JSON data for further use
                            try {
                                const jsonData = JSON.parse(data);
                                resolve(jsonData);
                            } catch (error) {
                                console.log(
                                    LOG_HEADER,
                                    LOG_METHOD,
                                    'error processing response',
                                    error,
                                    'for',
                                    _this.catJobId,
                                    'with',
                                    data,
                                );
                                reject(error);
                            }
                        } else {
                            console.log(
                                LOG_HEADER,
                                LOG_METHOD,
                                'no data received',
                                'for',
                                _this.catJobId,
                            );
                            reject(new Error('no data received'));
                        }
                    });
                    return true;
                },
            );
            // send json
            req.write(JSON.stringify(jsonToSend));
            req.end();
        });
    }

    /**
     * Prepare and send a `closeCollection` to CAT portal based on the values got from parameters
     * @param {string} testCollectionName testcollectionName, feature Name
     * @param {string} endDateTime ISO-string formatted date time
     * @param {string} additionalKeyValues Env to be defined
     * @returns {promises} promises
     */
    closeCollection(testCollectionName, endDateTime, additionalKeyValues) {
        const LOG_METHOD = 'closeCollection';
        const { catSender } = this;
        const { apiUrl } = this;
        const _this = this;
        const jsonToSend = {
            testcollectionClosing: {
                JobID: this.catJobId,
                endDateTime,
                testCollectionName,
            },
        };

        if (additionalKeyValues && _.isEmpty(additionalKeyValues)) {
            Object.assign(jsonToSend, additionalKeyValues);
        }

        return new Promise((resolve, reject) => {
            // send JSON
            const req = catSender.request(
                apiUrl,
                { method: 'POST', headers: { 'content-type': 'application/json' } },
                (res) => {
                    // console.log(LOG_HEADER, LOG_METHOD, 'got', res.statusCode, res.statusMessage,
                    //  'for', _this.catJobId);
                    if (res.statusCode !== 200) {
                        return reject(new Error(`got back ${res.statusCode}/${res.statusMessage}`));
                    }

                    let data = null;

                    // monitor for error; and report back
                    res.on('error', (err) => {
                        console.log(
                            LOG_HEADER,
                            LOG_METHOD,
                            'sending error',
                            err,
                            'for',
                            _this.catJobId,
                        );
                        reject(err);
                    });

                    // collect all the incoming data; to process and send back
                    res.on('data', (chunk) => {
                        if (data) {
                            data += chunk;
                        } else {
                            data = chunk;
                        }
                    });

                    // monitor for completion of response to send back data
                    res.on('end', () => {
                        if (data) {
                            // Ensure the send back JSON data for further use
                            try {
                                const jsonData = JSON.parse(data);
                                resolve(jsonData);
                            } catch (error) {
                                console.log(
                                    LOG_HEADER,
                                    LOG_METHOD,
                                    'error processign response',
                                    error,
                                    'for',
                                    _this.catJobId,
                                    'with',
                                    data,
                                );
                                reject(error);
                            }
                        } else {
                            console.log(
                                LOG_HEADER,
                                LOG_METHOD,
                                'no data received',
                                'for',
                                _this.catJobId,
                            );
                            reject(new Error('no data received'));
                        }
                    });
                    return true;
                },
            );

            // send json
            req.write(JSON.stringify(jsonToSend));
            req.end();
        });
    }

    /**
     * Create and send Testcase, Gherkin test case is send to CAT portal
     * @param {string} testCollectionName testcollectionName
     * @param {string} startDateTime ISO-string formatted date time
     * @param {string} testId test id which is recieved above
     * @param {string} shortDescription description in short
     * @param {string} longDescription description in long
     * @param {string} testParameters parameters oftest
     * @param {string} comments comments to be send
     * @param {string} confirmationNumber confirmation Number
     * @param {string} metatags tags in array
     * @param {string} additionalKeyValues additional information
     * @returns {promises} promises
     */
    createTestcase(
        testCollectionName,
        startDateTime,
        testId,
        shortDescription,
        longDescription,
        testParameters,
        comments,
        confirmationNumber,
        metatags,
        additionalKeyValues,
    ) {
        const LOG_METHOD = 'createTestcase';
        const { catSender } = this;
        const { apiUrl } = this;
        const _this = this;

        const jsonToSend = {
            testcaseCreation: {
                JobID: this.catJobId,
                startDateTime,
                testCollectionName,
                testId,
                testDescription: {
                    scenarioLabel: shortDescription,
                    scenarioDescription: longDescription,
                },
                comments,
                testParameters,
                confirmationNumber,
                metatags,
            },
        };

        if (additionalKeyValues && _.isEmpty(additionalKeyValues)) {
            Object.assign(jsonToSend, additionalKeyValues);
        }

        return new Promise((resolve, reject) => {
            // send JSON
            const req = catSender.request(
                apiUrl,
                { method: 'POST', headers: { 'content-type': 'application/json' } },
                (res) => {
                    // console.log(LOG_HEADER, LOG_METHOD, 'got', res.statusCode, res.statusMessage,
                    //  'for', _this.catJobId);
                    if (res.statusCode !== 200) {
                        return reject(new Error(`got back ${res.statusCode}/${res.statusMessage}`));
                    }

                    let data = null;

                    // monitor for error; and report back
                    res.on('error', (err) => {
                        console.log(
                            LOG_HEADER,
                            LOG_METHOD,
                            'error sending',
                            err,
                            'for',
                            _this.catJobId,
                        );
                        reject(err);
                    });

                    // collect all the incoming data; to process and send back
                    res.on('data', (chunk) => {
                        if (data) {
                            data += chunk;
                        } else {
                            data = chunk;
                        }
                    });

                    // monitor for completion of response to send back data
                    res.on('end', () => {
                        if (data) {
                            // Ensure the send back JSON data for further use
                            try {
                                const jsonData = JSON.parse(data);
                                resolve(jsonData);
                            } catch (error) {
                                console.log(
                                    LOG_HEADER,
                                    LOG_METHOD,
                                    'error processing',
                                    error,
                                    'for',
                                    _this.catJobId,
                                    'with',
                                    data,
                                );
                                reject(error);
                            }
                        } else {
                            console.log(
                                LOG_HEADER,
                                LOG_METHOD,
                                'got back empty',
                                'for',
                                _this.catJobId,
                            );
                            reject(new Error('no data received'));
                        }
                    });
                    return true;
                },
            );

            // send json
            req.write(JSON.stringify(jsonToSend));
            req.end();
        });
    }

    /**
     * close Test case, Gherkin test case is send to CAT portal
     * @param {string} testCollectionName testcollectionName
     * @param {string} endDateTime Start date time
     * @param {string} testId test id which is recieved above
     * @param {string} testcaseResult Pass or Fail or skip result
     * @param {string} comments comments to be send
     * @param {string} resultLogs results log
     * @param {string} confirmationNumber confirmation number
     * @param {additionalKeyValues} additionalKeyValues additional values
     * @returns {promises} promises
     */
    closeTestcase(
        testCollectionName,
        endDateTime,
        testId,
        testcaseResult,
        comments,
        resultLogs,
        confirmationNumber,
        additionalKeyValues,
    ) {
        const LOG_METHOD = 'closeTestcase';
        const { catSender } = this;
        const { apiUrl } = this;
        const _this = this;

        const jsonToSend = {
            closeTestCaseJson: {
                JobID: this.catJobId,
                endDateTime,
                testCollectionName,
                testId,
                testcaseResult,
                comments,
                confirmationNumber,
                resultLogs,
            },
        };

        if (additionalKeyValues && _.isEmpty(additionalKeyValues)) {
            Object.assign(jsonToSend, additionalKeyValues);
        }

        return new Promise((resolve, reject) => {
            const req = catSender.request(
                apiUrl,
                { method: 'POST', headers: { 'content-type': 'application/json' } },
                (res) => {
                    // console.log(LOG_HEADER, LOG_METHOD, 'got', res.statusCode, res.statusMessage,
                    //  'for', _this.catJobId);
                    if (res.statusCode !== 200) {
                        return reject(new Error(`got back ${res.statusCode}/${res.statusMessage}`));
                    }
                    let data = null;

                    // monitor for error; and report back
                    res.on('error', (err) => {
                        console.log(
                            LOG_HEADER,
                            LOG_METHOD,
                            'got error ',
                            err,
                            'for',
                            _this.catJobId,
                        );
                        reject(err);
                    });

                    // collect all the incoming data; to process and send back
                    res.on('data', (chunk) => {
                        if (data) {
                            data += chunk;
                        } else {
                            data = chunk;
                        }
                    });

                    // monitor for completion of response to send back data
                    res.on('end', () => {
                        if (data) {
                            // Ensure the send back JSON data for further use
                            try {
                                const jsonData = JSON.parse(data);
                                resolve(jsonData);
                            } catch (error) {
                                console.log(
                                    LOG_HEADER,
                                    LOG_METHOD,
                                    'error raised processing response',
                                    error,
                                    'for',
                                    _this.catJobId,
                                    'with',
                                    data,
                                );
                                reject(error);
                            }
                        } else {
                            console.log(
                                LOG_HEADER,
                                LOG_METHOD,
                                'got back empty',
                                'for',
                                _this.catJobId,
                            );
                            reject(new Error('no data received'));
                        }
                    });
                    return true;
                },
            );

            // send json
            req.write(JSON.stringify(jsonToSend));
            req.end();
        });
    }
}

export { CatServer, DEFAULT_PROD_CAT_URL, DEFAULT_UI_API_PATH, DEFAULT_CAT_WS_PATH };
