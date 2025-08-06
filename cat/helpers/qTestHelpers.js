const axios = require('axios');
const fs = require('fs')
/**
 * Class representing a client for interacting with qTest API.
 */
class QTestApiClient {
    /**
     * Creates a QTestApiClient object
     */

    testRunMapping = {};
    constructor() {
        this.qTestConfig = {
            token: process.env.QtestToken,
            projectId: null
        };

        this.headers = {
            Authorization: `Bearer ${this.qTestConfig.token}`,
            'Content-Type': 'application/json',
        };
        
        if(process.env.projectId !== undefined){
        this.initializeQTestConfig(process.env.projectId)
        }
    }

    async initializeQTestConfig(projectId) {
        try{
            if (projectId) {
                this.baseUrl = `https://allegiantair.qtestnet.com/api/v3/projects/${projectId}`;
                this.axiosInstance = axios.create({
                    baseURL: this.baseUrl,
                    headers: this.headers,
                });
            }
        }catch (error) {
            this.handleError('Error fetching project details: ', error);
            throw error;
        }
    }

    /**
     * Get the mapping of test runs based on the parent ID.
     * @param {string} parentId - Based on selected parentId for which to fetch the test run mapping.
     * @returns {Object} - The mapping of test runs.
     * @throws {Error} - If there is an error fetching the test run mapping.
     */
    async getTestRunMapping(parentId) {

        const testRunUrl = `/test-runs?parentId=${parentId}&parentType=test-suite&expand=descendants`
        try {
            const response = await this.axiosInstance.get(testRunUrl);
            const apiResponse = response.data;

            apiResponse.items.forEach(item => {
                const testName = item.name;
                const testId = item.id.toString();
                this.testRunMapping[testName] = testId;
            });


        } catch (error) {
            this.handleError('Error fetching test run mapping', error);
            throw error;
        }
    }


    /**
     * Update test steps for a given test run.
     * @param {string} TestCaseName - The ID of the test run to update.
     * @param {Array} stepResult - The results of individual test steps.
     * @param {string} testResult - The overall test result ('PASS' or 'FAIL').
     * @param {string} env - The application environment ('stg', 'qa1' etc).
     * @throws {Error} - If there is an error updating the test steps.
     */
    async updateTestSteps(TestCaseName, stepResult, testResult, env, startDateTime, endDateTime) {
        console.log("testRunMapping in teststep", this.testRunMapping);
        if (this.testRunMapping.hasOwnProperty(TestCaseName)) {
            const qTesttestRunId = this.testRunMapping[TestCaseName];
            console.log("qTesttestRunId", qTesttestRunId)
            if (!qTesttestRunId) {
                console.error(`No mapping found for  portal test run id: ${TestCaseName}`);
                return;
            }
            const testRunDetailsUrl = `/test-runs/${qTesttestRunId}`;
            try {
                const tcresponse = await this.axiosInstance.get(testRunDetailsUrl);
                const testCaseId = tcresponse.data.testCaseId;
                console.log("testCaseId", testCaseId)
                const testStepsUrl = `/test-cases/${testCaseId}/test-steps`;
                const testStepsResponse = await this.axiosInstance.get(testStepsUrl);

                const totalOrders = testStepsResponse.data.length;
                console.log("totalOrders", totalOrders)
                const totalSteps = Math.max(stepResult.length, totalOrders);
                const testLogsUrl = `/test-runs/${qTesttestRunId}/test-logs`;
                const testfield = await this.axiosInstance.get(testRunDetailsUrl);
                const envField = testfield.data.properties.find(field =>
                    field.field_name === "env" || field.field_name === "ENV" || field.field_name === "Env"
                );
                let envFieldId = null; 
                if (envField) {
                     envFieldId = envField.field_id;
                    console.log("Field ID for 'Env':", envFieldId);
                } else {
                    console.log("Field 'Env' not found in the properties.");
                }
                const testStepLogs = {
                    id: qTesttestRunId,
                    exe_start_date: startDateTime,
                    exe_end_date: endDateTime,
                    status: {
                        id: testResult === 'PASSED' ? 601 : 602,
                        name: testResult === 'PASSED' ? 'Passed' : 'Failed',
                        is_default: false,
                        color: '#0cdda8',
                        active: true,
                    },
                    test_step_logs: testStepsResponse.data.slice(0, totalSteps).map((step, index) => {
                        const currentTestStepId = step.id;
                        const isExecuted = index < stepResult.length;
                        let statusid = 605;
                        if (stepResult[index].status === 'Passed') {
                            statusid = 601;
                        }
                        if (stepResult[index].status === 'Failed') {
                            statusid = 602;
                        }
                        return {
                            test_step_id: currentTestStepId,
                            status: {
                                id: statusid,
                                name: stepResult[index].status,
                                is_default: false,
                                color: '#0cdda8',
                                active: true,
                            },
                            description: `<p> ${stepResult[index].stepName}</p>`,
                            expected_result: '',
                            order: step.order,
                            group: 0,
                            defects: [],
                        };
                    }),
                    properties: [
                        {
                            field_id: envFieldId,
                            field_name: "Env",
                            field_value: env,
                            field_value_name: ""
                        }
                    ]
                };
                const testLogsResponse = await this.axiosInstance.post(testLogsUrl, testStepLogs);
                if (testLogsResponse.status === 201) {
                    testLogsResponse.data.test_step_logs.forEach((stepLog, index) => {
                        const updatedTestStepId = testStepLogs.test_step_logs[index].test_step_id;
                        const statusName = stepLog.status.name;
                        console.log(`Test Step ${updatedTestStepId} updated with status: ${statusName}`);
                    });
                    return qTesttestRunId;
                } else {
                    this.handleError('Failed to update test steps', testLogsResponse);
                }
            } catch (error) {
                this.handleError('Failed to update test steps', error);
                throw error;
            }
        }

    }


    /**
     * Get the test step log ID of the first failed test step for a given test run.
     * @param {string} qTesttestRunId - The ID of the test run.
     * @returns {string|null} - The test step log ID or null if no failed test steps are found.
     * @throws {Error} - If there is an error fetching the failed test step log ID.
     */
    async getFailedTestStepLogId(qTesttestRunId) {
        const testLogsUrl = `/test-runs/${qTesttestRunId}/test-logs`;
        try {
            const tlresponse = await this.axiosInstance.get(testLogsUrl);
            const failedTestStep = tlresponse.data.items[0].test_step_logs.find(step => step.status.id === 602);
            if (failedTestStep) {
                const failedTestStepLogId = failedTestStep.test_step_log_id;
                console.log('First Failed Test Step Log ID:', failedTestStepLogId);
                return failedTestStepLogId;
            } else {
                console.log('No failed test steps found.');
                return null;
            }
        } catch (error) {
            this.handleError('Error fetching failed test step log ID', error);
            throw error;
        }
    }

    /**
     * Attach a screenshot to a failed test step log.
     * @param {string} fileName - The name of the screenshot file.
     * @param {string} filePath - The path to the screenshot file.
     * @param {string} failedTestStepLogId - The ID of the failed test step log.
     * @throws {Error} - If there is an error attaching the screenshot.
     */
  async attachScreenshottoFailedTestStep(fileName, filePath, failedTestStepLogId) {
    try {
        const headers = {
            'Content-Type': 'image/png',
            'File-Name': fileName,
        };
        const apiUrl = `/test-step-logs/${failedTestStepLogId}/blob-handles`;
        console.log("failed screenshot filePath is: ",filePath)
        const fileBuffer = fs.readFileSync(filePath);
        const attachmentResponse = await this.axiosInstance.post(apiUrl, fileBuffer, {
            headers: headers,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        if (attachmentResponse.status === 201) {
            console.log(`Screenshot attached successfully.`);
        } else {
            this.handleError('Failed to attach the screenshot', attachmentResponse);
        }
    } catch (attachmentError) {
        this.handleError('Failed to attach the screenshot', attachmentError);
        throw attachmentError;
    }
}

/**
 * Handles errors by logging details.
 * @param {string} message - The error message.
 * @param {Error|AxiosError} error - The error object.
 */
handleError(message, error) {
    console.error(message, error.message);
    if (error.response) {
        console.error('qTest Response status:', error.response.status);
        console.error('qTest Response data:', error.response.data);
    }
}
};

module.exports = new QTestApiClient()