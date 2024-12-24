import actions from '@g4/prova-ui/src/support/actions'
import common from '../Utils/common';
import fakeData from 'faker'

const cardsSection = '#payment .allegiant_card_details'
const notripflexUi = '//*[contains(text(),"do not add Trip Flex")]/parent::label/span[1]'
const tripFlexPopup = '.ui-dialog-content .allegiant_tripflex'
const acceptTripFlex = "//strong[text()='Yes,']"
const declineTripFlex = "//strong[text()='No,']"
const declineTFPopup = "//h3/ancestor::div[contains(@class,'message-wrapper ui-dialog-content')]/following-sibling::div//strong[text()='No,']"

// Card details
const cardSelectorArea = ".payment-card-selector"
const cardSelectorHeader = "//*[text()='Payment card']"
const paymentCardNo = "[name='payment_details[card_no]']"
const paymentExpireMonth = "[name='payment_details[expires_month]']"
const paymentExpireYear = "[name='payment_details[expires_year]']"
const paymentCVV = "[name='payment_details[ccv]']"
const paymentNameOnCard = "[name='payment_details[name_on_card]']"

// Billing details
const billingAreaHeader = "//*[text()='Billing Address']"

const billingFirstName = "[name='payment_details[first_name]']"
const billingLastName = '[name="payment_details[last_name]"]'
const billingCountry = '[name="payment_details[country]"]'
const billingAddr1 = '[name="payment_details[addr1]"]'
const billingAddr2 = '[name="payment_details[addr2]"]'
const billingCity = '[name="payment_details[city]"]'
const billingState = '[name="payment_details[state]"]'
const billingPostalCode = '[name="payment_details[postcode]"]'
const billingPhone = '[name="payment_details[phone]"]'
const billingEmail = '[name="payment_details[email]"]'

// Card detail labels
const cardNoLabel = "label[for*='card_no']"
const expireLabel = "#expire"
const cvvLabel = "label[for*='ccv']"
const nameOnCardLabel = "label[for*='name_on_card']"

const callername = "//*[@name='payment_details[requestor_name]']"

const termsCheckBox = "//label[contains(@class,'payment-terms')]/span"
const marketingCheckBox = "//strong[text()='Yes!']/parent::label/span[1]"
const purchaseButton = ".purchase.continue"

class TAPaymentsPage {

    get marketingCheckBox() {
        return $('[name="payment_details[opt_in_marketing]"]')
    };


    async waitForPaymentsPage() {
            await actions.waitFor(tripFlexPopup,5000)
            // await actions.waitForEnabled(tripFlexPopup, "tripFlexPopup")
            let displayed = await actions.isDisplayed(tripFlexPopup, "tripFlexPopup")
            if (displayed) {
                await actions.scroll(declineTFPopup)
                await actions.clickElement('click', declineTFPopup, "declineTripFlex")
            } else {
                await actions.waitForClickable(notripflexUi, "no tripFlex")
                await actions.clickElement('click', notripflexUi, "no tripFlex")
            }
}

    async selectTripFlex(TF) {
        await this.waitForPaymentsPage()
        TF = TF.toLowerCase()
        if (TF === "yes") {
            await actions.scroll(acceptTripFlex)
            await actions.clickElement('click', acceptTripFlex, "acceptTripFlex")
        } else {
            await actions.scroll(declineTripFlex)
            await actions.clickElement('click', declineTripFlex, "declineTripFlex")
        }
    }

    async enterCardDetails() {
        const {
            cardNo,
            expireMonth,
            expireYear,
            cvv,
            nameOnCard
        } = await common.getCardDetails();
        if (process.env.ENV.includes("prod")) {
            await actions.waitForDisplayed(cardSelectorHeader, "Payment card text")
            await actions.scroll(cardNoLabel)
            await actions.waitForClickable(cardNoLabel, "inputFieldCardNum")
            await actions.clickElement('click', cardNoLabel, "inputFieldCardNum")
            await browser.pause(3000)
            await actions.setInputField('setValue', process.env.cardno, paymentCardNo, "inputFieldCardNum")

            await actions.waitForClickable(expireLabel, "expireLabel")
            await actions.clickElement('click', expireLabel, "expireLabel")
            await actions.selectOption(paymentExpireMonth, 'value', process.env.expiredMonth)
            await actions.selectOption(paymentExpireYear, 'value', process.env.expiredYear)

            await actions.clickElement('click', cvvLabel, "cvvLabel")
            await actions.setInputField('setValue', process.env.cvv, paymentCVV, "inputFieldCVV")
            await actions.clickElement('click', nameOnCardLabel, "inputeNameOnCardLabel")
            await browser.pause(3000)
            await actions.setInputField('setValue', "Automation", paymentNameOnCard, "inputFieldNameOnCard")
        } else {
            await actions.waitForDisplayed(cardSelectorHeader, "Payment card text")
            await actions.scroll(cardNoLabel)
            await actions.waitForClickable(cardNoLabel, "inputFieldCardNum")
            await actions.clickElement('click', cardNoLabel, "inputFieldCardNum")
            await browser.pause(1000)
            await actions.setInputField('setValue', cardNo, paymentCardNo, "inputFieldCardNum")

            await actions.waitForClickable(expireLabel, "expireLabel")
            await actions.clickElement('click', expireLabel, "expireLabel")
            await actions.selectOption(paymentExpireMonth, 'value', expireMonth)
            await actions.selectOption(paymentExpireYear, 'value', expireYear)

            await actions.clickElement('click', cvvLabel, "cvvLabel")
            await actions.setInputField('setValue', cvv, paymentCVV, "inputFieldCVV")
            await actions.clickElement('click', nameOnCardLabel, "inputeNameOnCardLabel")
            await actions.setInputField('setValue', nameOnCard, paymentNameOnCard, "inputFieldNameOnCard")
        }

    }

    async enterPersonalDetails() {
        const {
            firstname,
            lastname,
            country,
            addr,
            city,
            state,
            postalCode
        } = await common.getBillingDetails();

        await actions.waitForDisplayed(billingAreaHeader, "Billing Address text")
        await actions.scroll(billingFirstName)
        if (process.env.ENV.includes("prod")) {
            await actions.clickElement('click', billingFirstName, "BillingFirstName Input Field")
            await actions.clearInputField(billingFirstName, "BillingFirstName Input Field")
            await actions.setInputField('setValue', "QAPROD", billingFirstName, "BillingFirstName Input Field")
    
            await actions.clickElement('click', billingLastName, "BillingLastName Input Field")
            await actions.clearInputField(billingLastName, "BillingLastName Input Field")
            await actions.setInputField('setValue', "PLZIGNORE", billingLastName, "BillingLastName Input Field")
        }else{
            await actions.clickElement('click', billingFirstName, "BillingFirstName Input Field")
            await actions.clearInputField(billingFirstName, "BillingFirstName Input Field")
            await actions.setInputField('setValue', firstname, billingFirstName, "BillingFirstName Input Field")
    
            await actions.clickElement('click', billingLastName, "BillingLastName Input Field")
            await actions.clearInputField(billingLastName, "BillingLastName Input Field")
            await actions.setInputField('setValue', lastname, billingLastName, "BillingLastName Input Field")
        }       

        await actions.selectOption(billingCountry, "value", country)

        await actions.scroll(billingAddr1)
        await actions.clickElement('click', billingAddr1, "clickBillingAddress1")
        await actions.setInputField('setValue', addr, billingAddr1, "inputFieldAddress1")

        await actions.clickElement('click', billingCity, "clickBillingCity")
        await actions.setInputField('setValue', city, billingCity, "inputFieldCity")

        await actions.selectOption(billingState, "value", state)

        await actions.clickElement('click', billingPostalCode, "clickBillinggPostalCode")
        await actions.setInputField('setValue', postalCode, billingPostalCode, "inputFieldPostalCode")

        return {
            firstname,
            lastname
        };
    }

    async enterPhoneNumber() {
        const phone = "7338308525"
        await actions.scroll(billingPhone)
        await actions.clickElement('click', billingPhone, "clickBillingPhone")
        await actions.setInputField('setValue', phone, billingPhone, "inputFieldPhone")
    }

    async enterEmailAddress() {
        let email
        if (process.env.ENV.includes("prod")) {
            email = "bat@allegiantair.com"
        } else {
            email = fakeData.internet.email("test", "qa", 'allegiant.com');
        }

        await actions.scroll(billingEmail)
        await actions.clickElement('click', billingEmail, "clickBillingEmail")
        await actions.setInputField('setValue', email, billingEmail, "inputFieldEmail")

        let url = await browser.getUrl()
        if (url.includes("//cc")) {
            await this.enterCallerName()
        }
        return {
            email
        }
    }

    async enterCallerName() {
        await actions.scroll(callername)
        await actions.clickElement('click', callername, "caller input filed")
        await actions.setInputField('setValue', "QAA Tester", callername, "caller input filed")
    }

    async uncheckMarketingCheckbox() {
        await browser.pause(2000)
        await actions.waitForDisplayed(marketingCheckBox, "marketing Check Box")
        await actions.waitForEnabled(marketingCheckBox, "marketing Check Box")
        await actions.clickElement('click', marketingCheckBox, "marketing Check Box")
    }

    async acceptTerms() {
        await actions.waitForEnabled(termsCheckBox, "terms check box")
        await actions.scroll(termsCheckBox)
        await actions.clickElement('click', termsCheckBox, "terms check box")
    }

    async clickPurchaseButton() {
        await actions.waitForEnabled(purchaseButton, "purchase trip button")
        await actions.waitForClickable(purchaseButton, "purchase trip button")
        let clickable = await actions.isClickable(purchaseButton, "purchase trip button")
        if (clickable) {
            await actions.scroll(purchaseButton)
            await actions.clickElement('click', purchaseButton, "purchase trip button")
            await browser.pause(3000)
        } else {
            throw new Error("purchase trip button is not clickable")
        }
    }

}
export default new TAPaymentsPage()