import { Then } from '@cucumber/cucumber'
import BagsPage from '../page-objects/bagsPageObject'

Then(/^I am on Bages Page I select the priority access and Trip flex$/, async () => {
    await BagsPage.selectingextraaccess()
})

Then(/^I click on the continue button in Bags Page$/, async () => {
    await BagsPage.continueButt()
})