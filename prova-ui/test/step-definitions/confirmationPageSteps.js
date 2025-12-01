import { Then, Before } from '@cucumber/cucumber'
import ConfirmationPageObject from '../page-objects/confPageObject.js'

Before(async function () {
    this.ConfirmationPage = new ConfirmationPageObject(this.page, this.context)
})

Then(/^I am on the confirmation page I expect confirmation number to be displayed$/, async function () {
    await this.ConfirmationPage.confirmationNumber()
})

Then(/^I am on confirmation page I click manage trip button$/, async function () {
    this.page = await this.ConfirmationPage.managetrip()
})