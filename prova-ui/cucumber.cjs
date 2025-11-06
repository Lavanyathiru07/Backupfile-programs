module.exports = {
    default: {
        paths: ['test/features/navitaire/*.feature'],
        import: ['cat-hooks/cat-playwright-hooks.js'],
        require: ['test/step-definitions/*.js'],
        format: ['html:./cucumber-report.html', 'json:report.json']
    }
};