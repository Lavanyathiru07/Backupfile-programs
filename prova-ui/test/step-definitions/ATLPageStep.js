import { Given, When, Then, Before } from '@cucumber/cucumber';
import ATLPage from '../page-objects/ATLPageObject.js'

Before(async function () {
    this.ATLPageobj = new ATLPage()
})

Then(/^I verify that the sum of all ATL transaction values are equal to 0$/, async function () {
    await this.page.waitForTimeout(2500)
    this.responseJson = {}
    this.responseJson = await this.ATLPageobj.getDBResults(process.env.confNumber)
    if (this.responseJson.results.length === 0) {
        throw new Error("Failed to get ATL DB results")
    }
    process.env.bookingDate = this.responseJson.results[0].book_date
    await this.ATLPageobj.ATLSumAmount(this.responseJson)
});
Then(/^I verify I see one positive and one negative transaction for (.+) flt with Acct Date matching date of the flt (.+) "?([^"]+)"?$/, async function (seg, field, event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, seg, field, event)
});
Then(/^I verify I see in the Acct Nbr column the value "(.+)" for the "(.+)" (.+) transaction "(.+)"$/, async function (value, seg, posneg, field) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyAcctNbrColumnTransaction(this.responseJson, value, seg, posneg, field)
});
Then(/^I verify I see one positive and one negative transaction with Acct Date matching booking date for (.+)$/, async function (event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, event)
});
When(/^I verify I see in the Acct Nbr column the value "([^"]*)" for the positive transaction "([^"]*)"$/, async function (value, field) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyAcctNbrColumnTransaction(this.responseJson, value, field)
});
When(/^I verify I see in the Acct Nbr column the value "([^"]*)" for the negative transaction "([^"]*)"$/, async function (value, field) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyAcctNbrColumnTransaction(this.responseJson, value, field)
});
Then(/^I verify the Amount is matching total amount paid during (.+)$/, async function (event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.validateTotalAmountPaid(this.responseJson, event)
});
Then(/^I verify the amount for PC is 0.027 percentage of the amount in MC_CC_PAYMENT$/, async function () {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyMCCCPaymentFeesPCPercentage(this.responseJson)
});
Then(/^I verify I see in the Acct Nbr column the value "([^"]*)" for the "([^"]*)" (positive|negative) transaction MC_CC_PAYMENT_FEES$/, async function (value, fees, posneg) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyAcctNbrColumnTransaction(this.responseJson, value, fees, posneg)
});
Then(/^I verify I see two positive and two negative transaction for (.+) flt with Acct Date matching date of the flt (.+) "?([^"]+)"?$/, async function (fees, field, event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, fees, field, event)
});
Then(/^I verify I see two positive and two negative transaction with Acct Date matching booking date for (.+)$/, async function (event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, event)
});
Then(/^I verify I see in the Acct Nbr column the value "(.+)" for the "(.+)" (positive|negative) transaction of cancel "(.+)"$/, async function (value, seg, posneg, field) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyAcctNbrColumnTransaction(this.responseJson, value, seg, posneg, field)
});
Then(/^I verify I see three positive and three negative transaction for (.+) flt with Acct Date matching date of the flt (.+) "?([^"]+)"?$/, async function (fees, field, event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, fees, field, event)
});
Then(/^I verify I see three positive and three negative transaction with Acct Date matching booking date for (.+)$/, async function (event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, event)
});
Then(/^I verify I see four positive and four negative transaction with Acct Date matching booking date for (.+)$/, async function (event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, event)
});
Then(/^I verify I see four positive and four negative transaction for (.+) flt with Acct Date matching date of the flt (.+) "?([^"]+)"?$/, async function (fees, field, event) {
    await this.page.waitForTimeout(2500)
    await this.ATLPageobj.verifyPositiveAndNegativeEntries(this.responseJson, fees, field, event)
});