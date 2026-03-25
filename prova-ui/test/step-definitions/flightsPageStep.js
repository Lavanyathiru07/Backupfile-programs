import { Given , When , Then} from '@cucumber/cucumber';

When(/^I am on flights page I collect flight page details$/, async function ()  {
    await this.FlightsPage.collectFlightPageDetails();
});

Given(/^I am on flights page I click continue button$/, async function ()  {
    await this.FlightsPage.flightsubmit()
   // await this.FlightsPage.validateFlightPage()
    await this.FlightsPage.getTimeline();
})
When(/^I am on flights page I skip departing bundle selection$/, async function () {
    await this.FlightsPage.departingBundleSkip();
         });
         
When(/^I select "([^"]*)" for departing flight$/, async function (bundleType) {
    await this.FlightsPage.selectDepartingBundle(bundleType)
 })
 When(/^I select "([^"]*)" for returning flight$/, async function (bundleType) {
    await  this.FlightsPage.selectReturningBundle(bundleType)
 })
 
When(/^I am on flights page I skip returning bundle selection$/, async function () {
   await this.FlightsPage.returningBundleSkip();
})
