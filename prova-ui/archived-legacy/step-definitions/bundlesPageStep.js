import {When, Then, Given} from '@cucumber/cucumber'
import BundlesPage from '../page-objects/bundlesPageObject'

Then(/^I click continue button in bundles page$/, async () => {
    await BundlesPage.selectingBundle()
})