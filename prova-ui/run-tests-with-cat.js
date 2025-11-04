#!/usr/bin/env node

/**
 * Test Runner with CAT Integration - Parallel Session Manager
 */

const { spawn } = require('child_process');
const SessionUtils = require('./cat-hooks/helpers/session-utils.js');
const CatPortalHooks = require('./cat-hooks/helpers/cat-portal-hooks.js');

// Set CAT environment variables
process.env.CAT_JOB_NAME = process.env.CAT_JOB_NAME || "Aswathi_Playwright_Parallel_Tests";
process.env.CAT_BUILD_NO = process.env.CAT_BUILD_NO || Math.floor(Math.random() * 1000);
process.env.CAT_ENV = process.env.CAT_ENV || "local";
process.env.CAT_URL = process.env.CAT_URL || "https://cat.stg.allegiantair.com";
process.env.CAT_API_PATH = process.env.CAT_API_PATH || "/api/ui/results";
process.env.DEFAULT_CAT_UI = "true";
process.env.CAT_JOB_ID = "true";
// Disable CAT job closing if experiencing 404 errors
process.env.CAT_DISABLE_CLOSE_JOB = process.env.CAT_DISABLE_CLOSE_JOB || "false";

console.log('Starting tests with consolidated CAT integration...');

// Configure test execution
const isParallel = process.argv.includes('--parallel');
const parallelWorkers = process.argv.find(arg => arg.match(/^\d+$/)) || '2';
const cucumberArgs = ['cucumber-js', '-p', 'default'];

// Handle parallel execution
if (isParallel) {
    cucumberArgs.push('--parallel', parallelWorkers);
}

// Handle tags (e.g., --tags '@smoke')
const tagsIndex = process.argv.indexOf('--tags');
if (tagsIndex !== -1 && process.argv[tagsIndex + 1]) {
    cucumberArgs.push('--tags', process.argv[tagsIndex + 1]);
}

// Pass through any other cucumber-js arguments (excluding processed ones)
const additionalArgs = process.argv.slice(2).filter(arg => {
    const argIndex = process.argv.indexOf(arg);
    return !arg.match(/^\d+$/) &&
        arg !== '--parallel' &&
        arg !== '--tags' &&
        process.argv[argIndex - 1] !== '--tags'; // Fixed: exclude tag values
});
cucumberArgs.push(...additionalArgs);

async function initializeCatSession() {
    const sessionUtils = new SessionUtils();

    // Clean up any existing session
    sessionUtils.cleanupSession();

    console.log('Creating consolidated CAT job session...');

    try {
        // Create a single CAT job for all parallel workers
        const catJobResult = await CatPortalHooks.onPrepare();

        if (catJobResult && catJobResult._id) {
            // Store the job ID in a shared session file
            sessionUtils.createSession(catJobResult._id, {
                jobName: process.env.CAT_JOB_NAME,
                buildNo: process.env.CAT_BUILD_NO,
                environment: process.env.CAT_ENV,
                isParallel: isParallel,
                workers: parallelWorkers
            });

            console.log(`Created consolidated CAT job: ${catJobResult._id}`);
            return catJobResult._id;
        } else {
            console.warn('CAT job creation failed, proceeding without CAT integration');
            return null;
        }
    } catch (error) {
        console.error('Failed to create CAT job:', error);
        return null;
    }
}

async function runTests() {
    const sessionUtils = new SessionUtils();

    try {
        // Initialize CAT session before running tests
        const catJobId = await initializeCatSession();

        if (catJobId) {
            // Set the job ID as environment variable for child processes
            process.env.CAT_JOB_ID = catJobId;
            console.log(`Starting ${isParallel ? 'parallel' : 'sequential'} tests with CAT job: ${catJobId}`);

            // Small delay to ensure session file is fully written for parallel workers
            if (isParallel) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Run tests
        const testProcess = spawn('npx', cucumberArgs, {
            stdio: 'inherit',
            env: process.env,
            shell: true,
            cwd: process.cwd() // Ensure correct working directory
        });

        testProcess.on('error', (error) => {
            console.error('Test process error:', error);
        }); testProcess.on('close', async (code) => {
            console.log(`\nTests completed with exit code: ${code}`);

            // Finalize CAT session if it was created
            const session = sessionUtils.readSession();
            if (session && session.runId) {
                try {
                    console.log('Finalizing CAT job...');
                    await CatPortalHooks.onComplete(code === 0 ? 'PASSED' : 'FAILED');
                    console.log('CAT job finalized successfully');
                } catch (error) {
                    console.error('Failed to finalize CAT job:', error);
                }

                // Clean up session file
                sessionUtils.cleanupSession();
            }

            process.exit(code);
        });

        // Handle process termination gracefully
        process.on('SIGINT', () => {
            console.log('\nReceived SIGINT, cleaning up...');
            sessionUtils.cleanupSession();
            testProcess.kill('SIGINT');
        });

        process.on('SIGTERM', () => {
            console.log('\nReceived SIGTERM, cleaning up...');
            sessionUtils.cleanupSession();
            testProcess.kill('SIGTERM');
        });

    } catch (error) {
        console.error('Test execution failed:', error);
        sessionUtils.cleanupSession();
        process.exit(1);
    }
}

// Start the test execution
runTests();