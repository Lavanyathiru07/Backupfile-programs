import { Then } from '@cucumber/cucumber'
import ConfirmationPage from '../page-objects/confPagePlaywrightObject'

Then(/^I am on the confirmation page I expect confirmation number to be displayed$/, async () => {
    await ConfirmationPage.confirmationNumber()
})

Then(/^I am on confirmation page I click manage trip button$/, async () => {
    await ConfirmationPage.managetrip()
})