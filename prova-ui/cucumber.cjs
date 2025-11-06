module.exports = {
    default: {
        paths: ['test/features/navitaire/*.feature'],
        require: ['cat-hooks/cat-playwright-hooks.js', 'test/step-definitions/*.js'],
        format: ['html:./cucumber-report.html', 'json:report.json']
    }
};