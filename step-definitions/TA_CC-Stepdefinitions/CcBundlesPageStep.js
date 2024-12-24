import {Given, When, Then} from '@cucumber/cucumber'
import CCBundlesPage from '../../page-objects/ta-silo-booking_Page/CCBundlesPage'

Then(/^I click on Continue button in Bundles page for CC$/,async () => {
    await CCBundlesPage.BundlesContinue()
})