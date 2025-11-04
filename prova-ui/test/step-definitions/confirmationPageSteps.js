const { Then } = require('@cucumber/cucumber')

Then(/^I am on the confirmation page I expect confirmation number to be displayed$/, async function ()  {
    await this.ConfirmationPage.confirmationNumber()
})

Then(/^I am on confirmation page I click manage trip button$/, async function ()  {
    this.page = await this.ConfirmationPage.managetrip()
})