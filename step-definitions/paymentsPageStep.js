import { Given, When } from '@cucumber/cucumber';
import PaymentPage from '../page-objects/paymentPageObj';
import HotelsPage from '../page-objects/hotelPageObject';
import BagsPage from '../page-objects/bagsPageObject';
import CarsPage from '../page-objects/carsPageObject'

Given(/^I close the popup which is displayed on the Payments Page$/, async () => {
    await PaymentPage.popupClosing()
})

Given(/^I am on payment page I verify decline amount adding extras$/, { timeout: 180 * 1000 },
    async () => {
        var IsDeclined = await PaymentPage.validateDeclinedAmount();
        if (IsDeclined) {
            console.log("Its declined amount!!!!")
            await browser.pause(5000)
            await BagsPage.addExtras();
            await BagsPage.clickContinueButton();
            await HotelsPage.hotelContinueBtn();
            await CarsPage.carspageContinueBtn();
        }
    })

Given(/^I am on payment page I enter all required card details$/, async () => {
    try {
        await PaymentPage.popupClosing()
        await PaymentPage.cardDetails()
    } catch (er) { }
})

Given(/^I am on Payment page I enter all required billing address details$/, async () => {
    await PaymentPage.billingaddress()
})
When(/^I am on Payment page I check and enter all required billing address details$/, async () => {
    await PaymentPage.checkSavedBillingAddress()
})
When(/^I am on Payment page I enter all required billing address details from the profile$/,async()=>{
    await PaymentPage.addBillingAddress()
     })
 When(/^I am on Payment page I enter all required billing address details with "([^"]*)" and "([^"]*)"$/,async(addressLine1,aaddressLine1)=>{
await PaymentPage.addBillingAddress(addressLine1,addressLine1)
 })
Given(/^I am on Payment page I select Purchase my trip button$/, async () => {
    await PaymentPage.purchasemytrip()
})

Given(/^I am on Payments page and I click on the Trip Summary Expando$/, async () => {
    await PaymentPage.clickTripSummaryExpando();
})

Given(/^I am on Payment page and I apply loyalty points$/, async () => {
    await PaymentPage.popupClosing()
    await PaymentPage.loyaltySectionapply();
});
