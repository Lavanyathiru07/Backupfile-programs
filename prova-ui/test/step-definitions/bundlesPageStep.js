import {When, Then, Given} from '@cucumber/cucumber'

Then(/^I am on Bundles Page I expect flight details added to the trip summary$/, async function ()  {
    await this.BundlesPage.validateFlightDetailsFromTripSummary()
})

Then(/^I am on Bundles Page I click continue button$/, async function ()  {
    await this.BundlesPage.getTimeline()
    await this.BundlesPage.continueBundle()
})

Then(/^I am on Bundles page I select "([^"]*)"$/, async function (type)  {
    await this.BundlesPage.selectBundles(type)
})