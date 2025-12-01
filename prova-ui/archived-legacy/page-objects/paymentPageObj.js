
import actions from "../../src/support/actions"
import checks from "../../src/support/validations"

const paypopup = "[data-hook='payment-page_ice-popup_close']"
const sscrolldetails = "//span[text()='Payment Information']"
const cardName = "[data-hook='payment-page_card-holder-name']"
const cardnumfield = "[data-hook='payment-page_card-number']"
const expirymonth = "[data-hook='payment-page_card-expiration-month']"
const monthscroll = "#react-select-card-expiration-month-option-8"
const monthselection = "[data-hook='payment-page_card-expiration-month_12']"
const yearlocscroll = "[data-hook='payment-page_card-number']"
const expiryyear = "[data-hook='payment-page_card-expiration-year']"
const yearscroll = "#react-select-card-expiration-year-option-5"
const yearseelection = "[data-hook='payment-page_card-expiration-year_2031']"
const cvv = "[data-hook='payment-page_card-cvv']"
const billingscroll = "[data-hook='payment-page_billing_section_title']"
const fnamefield = "[data-hook='payment-page_first-name']"
const lnamefield = "[data-hook='payment-page_last-name']"
const country = "[data-hook='payment-page_country-field']"
const countsel = "[data-hook='payment-page_country-field_US']"
const add1 = "[data-hook='payment-page_address-line-1']"
const add2 = "[data-hook='payment-page_address-line-2']"
const add3 = "[data-hook='payment-page_city']"
const state = "[data-hook='payment-page_state']"
const caselc = "[data-hook='payment-page_state_CA']"
const zipcode = "[data-hook='payment-page_zip-code']"
const mobilenum = "[data-hook='payment-page_phone-number']"
const mailfeild = "[data-hook='payment-page_email-address']"
const termsscroll = "//span[text()='TOTAL (USD)']"
const termsbox = "//label[@data-hook='payment_terms-and-conditions-checkbox_label']"
const purchase = "[data-hook='payment-page_continue']"

class PaymentPage {

    async popupClosing() {
        await actions.pause(3000)

        await actions.waitUntil(paypopup, "Pay Pop up");

        if (await checks.isDisplayed(paypopup, "pop-up button in payments page")) {
            await actions.clickElement('click', paypopup, "button to close the popup")
            await actions.pause(3000)
        }
        else {
            console.log("COOL!, No pop-up displayed in Payments Page")
        }
    }

    async cardDetails() {
        await actions.scroll(sscrolldetails)
        await actions.clearInputField(cardName, "cardName text field")
        await actions.setInputField('setValue', "Karthi", cardName, "card name input field")
        await actions.setInputField('setValue', '4400000000000008', cardnumfield, "card-number input field")
        await actions.clickElement('click', expirymonth, "expiry month dropdown")
        await actions.scroll(monthscroll)
        await actions.clickElement('click', monthselection, "selecting the expiry month of card")
        await actions.scroll(yearlocscroll)
        await actions.clickElement('click', expiryyear, "expiry year dropdown")
        await actions.scroll(yearscroll)
        await actions.clickElement('click', yearseelection, "selecting the expiry year of card")
        await actions.scroll(yearlocscroll)
        await actions.setInputField('setValue', '737', cvv, "cvv field")
    }

    async billingaddress() {
        await actions.scroll(billingscroll)
        await actions.clearInputField(fnamefield, "first name field")
        await actions.setInputField('setValue', 'Kartik', fnamefield, "first name input field")
        await actions.clearInputField(lnamefield, "last name field")
        await actions.setInputField('setValue', 'Patnuri', lnamefield, "last name input field")
        await actions.clickElement('click', country, "country dropdown")
        await actions.clickElement('click', countsel, "country selection")
        await actions.setInputField('setValue', 'Random', add1, "address field one")
        await actions.setInputField('setValue', 'Street', add2, "address field two")
        await actions.setInputField('setValue', 'Calf', add3, "address field three")
        await actions.clickElement('click', state, "state dropdown")
        await actions.clickElement('click', caselc, "state selection")
        await actions.setInputField('setValue', '10005', zipcode, "zipcode input field")
        await actions.setInputField('setValue', '555-555-1234', mobilenum, "mobile-num field")
        await actions.clearInputField(mailfeild, "mailID field")
        await actions.setInputField('setValue', "karth@gmail.com", mailfeild, "mailID input field")
    }

    async purchasemytrip() {
        await actions.scroll(termsscroll)
        await actions.clickElement('click', termsbox, "condition checkbox")
        await actions.clickElement('click', purchase, "purcahse my trip button button")
    }
}
export default new PaymentPage()
