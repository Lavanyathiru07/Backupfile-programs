const { Given , When , Then} = require('@cucumber/cucumber');

When(/^I am on flights page I collect flight page details$/, async function ()  {
    await this.FlightsPage.collectFlightPageDetails();
});

Given(/^I am on flights page I click continue button$/, async function ()  {
    await this.FlightsPage.flightsubmit()
    await this.FlightsPage.validateFlightPage()
})