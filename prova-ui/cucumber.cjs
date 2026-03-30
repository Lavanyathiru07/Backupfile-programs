// // Set environment variables before exporting configuration
// process.env.appEnv = 'https://www-cxj2512070.apps.swe-qat.aws.allegiantair.com';

module.exports = {
    default: {
        paths: ['test/features/navitaire/*.feature'],
        import: ['cat-hooks/cat-playwright-hooks.js', 'test/step-definitions/*.js'],
        format: ['html:./cucumber-report.html', 'json:report.json'],
        parallel: 2
    }
};