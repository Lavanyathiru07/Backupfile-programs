import { Given, When, Then } from '@cucumber/cucumber';
import PaymentPage from '../page-objects/paymentPagePlaywrightObj'
import HotelsPage from '../page-objects/hotelPagePlaywrightObject';
import BagsPage from '../page-objects/bagsPagePlaywrightObject';
import CarsPage from '../page-objects/carsPagePlaywrightObject'

Given(/^I am on Payment page I select Purchase my trip button$/, async () => {
    await PaymentPage.purchasemytrip()
})

Given(/^I am on payment page I verify decline amount adding extras$/, { timeout: 180 * 1000 },
    async () => {
        var IsDeclined = await PaymentPage.validateDeclinedAmount();
        if (IsDeclined) {
            console.log("Its declined amount!!!!")
            await BagsPage.addExtras();
            await BagsPage.clickContinueButton();
            await HotelsPage.hotelContinueBtn();
            await CarsPage.carspageContinueBtn();
        }
    })

Given(/^I am on payment page I enter all required card details$/, async () => {
    try {
        await PaymentPage.popupisClosing()
        await PaymentPage.cardDetails()
    } catch (er) { }
})

Given(/^I am on Payment page I enter all required billing address details$/, async () => {
    await PaymentPage.billingaddress()
})

Given(/^I am on Payment page and I apply loyalty points$/, async () => {
    await PaymentPage.popupisClosing()
    await PaymentPage.loyaltySectionapply();
})