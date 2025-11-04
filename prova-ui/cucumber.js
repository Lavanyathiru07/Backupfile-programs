let common = [
    'test/features/navitaire/*.feature', // All feature files
    '--import @babel/register',
    '-r cat-hooks', // CAT integration hooks
    '-r test/step-definitions', // Playwright step definitions
    '--format html:./cucumber-report.html',
    '--format json:report.json',
    // TODO: Add allure reporter when allure-cucumberjs is properly configured
    // '--format allure-cucumberjs/reporter --format-options \'{"resultsDir":"allure-results"}\'',
    '--publish-quiet',
].join(' ');

module.exports = {
    default: common,
};