import { When, Then } from '@cucumber/cucumber'
import BundlesPage from '../page-objects/bundlesPageObject'


When(/^I select the bonus-bundle$/, async () => {
    await BundlesPage.bonusBundleSelection()
})

Then(/^I am on Bundles Page I expect flight details added to the trip summary$/, async () => {
    await BundlesPage.validateFlightDetailsFromTripSummary()
})

Then(/^I am on Bundles page I select "([^"]*)"$/, async (type) => {
    await BundlesPage.selectBundles(type)
})

When(/^I am on Bundle page I collect bundle items available for (.+)$/, async function (bundleType) {
    await BundlesPage.collectBundleItems(bundleType);
});

Then(/^I am on Bundles Page I click continue button$/, async () => {
    await BundlesPage.getTimeline()
    await BundlesPage.continueBundle()
})