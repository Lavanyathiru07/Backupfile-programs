import { Given, When, Then } from '@cucumber/cucumber';
import FlightsPage from '../page-objects/flightsPageObject'

Given(/^I am on flights page I click continue button$/, async () => {
    try {
        await FlightsPage.flightsubmit()
        //await FlightsPage.validateFlightPage()
    } catch (error) {
        if((await browser.getUrl()).includes('flights'))
        {
            await FlightsPage.flightsubmit()
            //await FlightsPage.validateFlightPage()
        }
    }
})
 When(/^I select "([^"]*)" for departing flight$/, async (bundleType) => {
    await FlightsPage.selectDepartingBundle(bundleType)
 })
 When(/^I select "([^"]*)" for returning flight$/, async (bundleType) => {
    await FlightsPage.selectReturningBundle(bundleType)
 })
 When(/^I am on flights page I skip departing bundle selection$/, async () => {
   await FlightsPage.departingBundleSkip();
})
When(/^I am on flights page I skip returning bundle selection$/, async () => {
   await FlightsPage.returningBundleSkip();
})

When(/^I am on flights page I collect flight page details$/, async () => {
    await browser.pause(5000)
    await FlightsPage.collectFlightPageDetails();
});