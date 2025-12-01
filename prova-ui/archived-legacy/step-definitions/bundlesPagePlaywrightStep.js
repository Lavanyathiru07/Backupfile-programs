import {When, Then, Given} from '@cucumber/cucumber'
import BundlesPage from '../page-objects/bundlesPagePlaywrightObject'

Then(/^I am on Bundles Page I expect flight details added to the trip summary$/, async () => {
    await BundlesPage.validateFlightDetailsFromTripSummary()
})

Then(/^I am on Bundles Page I click continue button$/, async () => {
    await BundlesPage.getTimeline()
    await BundlesPage.continueBundle()
})

Then(/^I am on Bundles page I select "([^"]*)"$/, async (type) => {
    await BundlesPage.selectBundles(type)
})