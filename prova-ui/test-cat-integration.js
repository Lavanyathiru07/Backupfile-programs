#!/usr/bin/env node

/**
 * CAT Integration Health Check Script
 * This script validates CAT integration setup without running full test suite
 * Use this to:
 * - Verify CAT server connectivity
 * - Test environment variable configuration
 * - Validate job/collection creation workflow
 * - Debug CAT issues quickly
 */

const CatHelper = require('./cat-hooks/helpers/cat-helper');

async function testCatIntegration() {
    console.log('🧪 Testing CAT Integration...\n');

    // Check environment variables
    console.log('📋 Environment Variables:');
    console.log(`CAT_JOB_NAME: ${process.env.CAT_JOB_NAME || 'NOT SET'}`);
    console.log(`CAT_BUILD_NO: ${process.env.CAT_BUILD_NO || 'NOT SET'}`);
    console.log(`CAT_ENV: ${process.env.CAT_ENV || 'NOT SET'}`);
    console.log(`CAT_URL: ${process.env.CAT_URL || 'NOT SET'}`);
    console.log(`CAT_API_PATH: ${process.env.CAT_API_PATH || 'NOT SET'}\n`);

    // Check required environment variables
    const requiredVars = ['CAT_JOB_NAME', 'CAT_BUILD_NO', 'CAT_ENV', 'CAT_URL', 'CAT_API_PATH'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.log('❌ Missing required environment variables:');
        missingVars.forEach(varName => console.log(`   - ${varName}`));
        console.log('\n💡 Set these variables and try again.\n');
        return false;
    }

    try {
        // Test CAT Server connection
        console.log('🔗 Testing CAT Server Connection...');
        const CatProxy = CatHelper.CatServer;
        const catProxy = new CatProxy(process.env.CAT_URL, process.env.CAT_API_PATH);

        // Test job creation
        console.log('📝 Creating test job...');
        const jobStartDateTime = new Date().toISOString();
        const jobResult = await catProxy.createJob(
            `${process.env.CAT_JOB_NAME}-test`,
            process.env.CAT_BUILD_NO,
            process.env.CAT_ENV,
            jobStartDateTime,
            null, null, null, null
        );

        if (jobResult && jobResult._id) {
            console.log(`✅ Job created successfully: ${jobResult._id}`);

            // Test collection creation
            console.log('📁 Creating test collection...');
            const collectionProxy = new CatProxy(
                process.env.CAT_URL,
                process.env.CAT_API_PATH,
                null,
                jobResult._id
            );

            const collectionResult = await collectionProxy.createCollection(
                'Test Feature',
                new Date().toISOString()
            );

            if (collectionResult && (collectionResult._id || (collectionResult.ok === 1 && collectionResult.n === 1))) {
                const collectionId = collectionResult._id || 'Operation successful';
                console.log(`Collection created successfully: ${collectionId}`);

                // Clean up - close collection and job
                console.log('🧹 Cleaning up...');
                try {
                    await collectionProxy.closeCollection('Test Feature', new Date().toISOString());
                    await collectionProxy.closeJob(new Date().toISOString(), 'COMPLETED');
                } catch (cleanupError) {
                    console.log('Cleanup failed)');
                }

                console.log('✅ CAT Integration test completed successfully!\n');
                return true;
            } else {
                console.log('❌ Failed to create collection');
                return false;
            }
        } else {
            console.log('❌ Failed to create job');
            return false;
        }

    } catch (error) {
        console.log(`❌ CAT Integration test failed: ${error.message}`);
        console.log('📋 Error details:', error);
        return false;
    }
}

// Run the test if this script is executed directly
if (require.main === module) {
    testCatIntegration()
        .then(success => {
            if (success) {
                console.log('🎉 All tests passed! CAT integration is working correctly.');
                process.exit(0);
            } else {
                console.log('❌ Tests failed. Please check your configuration.');
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('💥 Unexpected error:', error);
            process.exit(1);
        });
}

module.exports = { testCatIntegration };