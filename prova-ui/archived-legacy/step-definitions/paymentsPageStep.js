import { Given , When , Then} from '@cucumber/cucumber';
import PaymentPage from '../page-objects/paymentPageObj'

Given(/^I close the popup which is displayed on the Payments Page$/, async () => {
    await PaymentPage.popupClosing()
})

Given(/^I enter all the required details wrt to the card$/, async () => {
    await PaymentPage.cardDetails()
})

Given(/^I enter all required billing address details$/, async () => {
    await PaymentPage.billingaddress()
})

Given(/^I click on the purchase my trip$/, async () => {
    await PaymentPage.purchasemytrip()
})
