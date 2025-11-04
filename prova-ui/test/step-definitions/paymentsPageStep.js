import { Given, When, Then } from '@cucumber/cucumber';

Given(/^I am on Payment page I select Purchase my trip button$/, async function ()  {
    await this.PaymentPage.purchasemytrip()
})

Given(/^I am on payment page I verify decline amount adding extras$/, { timeout: 180 * 1000 },
    async function ()  {
        var IsDeclined = await this.PaymentPage.validateDeclinedAmount();
        if (IsDeclined) {
            console.log("Its declined amount!!!!")
            await this.BagsPage.addExtras();
            await this.BagsPage.clickContinueButton();
            await this.HotelPage.hotelContinueBtn();
            await this.CarsPage.carspageContinueBtn();
        }
    })

Given(/^I am on payment page I enter all required card details$/, { timeout: 180 * 1000 }, async function () {
    try {
        await this.PaymentPage.popupisClosing()
        await this.PaymentPage.cardDetails()
    } catch (er) { }
})

Given(/^I am on Payment page I enter all required billing address details$/, async function()  {
    await this.PaymentPage.billingaddress()
})

Given(/^I am on Payment page and I apply loyalty points$/, { timeout: 180 * 1000 }, async function () {
    await this.PaymentPage.popupisClosing()
    await this.PaymentPage.loyaltySectionapply();
})