
import Actions from '../../src/support/actions.js'
import Checks from '../../src/support/validations.js'
import { assert } from 'chai'

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
const yearseelection = "[data-hook='payment-page_card-expiration-year_2030']"
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
const icePopup = "[data-hook='payment-page_ice-popup_close']"
const headerTripTotal = "[data-hook='header-cart-button_price']"
const breadcrumbToggle = "[data-hook='flights-breadcrumb_toggle']"
const bagsBreadcrumb = "[data-hook='flights-breadcrumb_item-bags']"
const billingFirstName = "[data-hook='payment-page_first-name']"
const billingLastName = "[data-hook='payment-page_last-name']"
const emailAddressInput = "[data-hook='payment-page_email-address']"
const tripSummaryAmount = "[data-hook='payment-page_trip_summary_amount']"
const purchaseMyTrip = "[data-hook = 'payment-page_continue']"
const somethingReallyOddJustHappened = "//div[@data-hook='recoverable-error']"
const errorMessageCarNum = "//*[@data-hook='field-error-message_card-number']"
const recoverableErrorMsg = "(//div[@data-hook='recoverable-error_content']//span)[1]"
const spinnerBar = "//span[contains(@data-hook,'spinner')]"
const thankyouMessage = "[data-hook='confirmation-page-thank-you-message_first-paragraph']"
const paymentPageTitle = "[data-hook='payment-page_page-heading']"
const currentExpirationMonth = "//div[@id='react-select-card-expiration-month-option-X']"
const currentExpirationYear = "//div[@id='react-select-card-expiration-year-option-X']"
const loyaltypntapply = "(//button[@type='submit'])[1]"
const tripSummaryAmt = "[data-hook='payment-page_trip_summary_amount']"
const loyaltypointsAmt = "[data-hook='payment-page_points-section_loyalty_points_section_total_points_value']"
var TotalFareAmount = 0

var paymentPageCollector = new Map();

class PaymentPage {

    actions;
    check;

    constructor(page, context) {
        this.actions = new Actions(page, context)
        this.check = new Checks(page, context)
    }

    async popupClosing() {
        await this.actions.waitForLoadState('domcontentloaded', 20000);

        if (await this.actions.isDisplayed(paypopup, "pop-up button in payments page")) {
            await this.actions.waitForDisplayed(paypopup, "Pay Pop up", 20000) // Wait for payment popup
            await this.actions.clickElement('click', paypopup, "button to close the popup")
            // await this.actions.pause(3000)
        }
        else {
            console.log("COOL!, No pop-up displayed in Payments Page")
        }
    }

    async cardDetails() {
  const cardNumArray = ["5454545454545454", "4444444444444448", "4000020000000000", "4400000000000008", "5555555555555557"];
  const random = Math.floor(Math.random() * cardNumArray.length);
  let value = process.env.ENV.includes("prd01") ? cardNumArray[0] : cardNumArray[random];
  const strLen = value.split('');

  await this.actions.waitForDisplayed(cardName, 'cardName text field', 10000);
  await this.actions.scroll(cardName, 'cardName');
  await this.actions.clearInputField(cardName, 'cardName');
  await this.actions.setInputField('fill', "Auto Tester", cardName, "card name input field");

  // Enter card number digit by digit
  for (let i = 0; i < strLen.length; i++) {
    await this.actions.setInputField('fill', strLen[i], cardnumfield, "card-number input field");
  }
  console.log("CardNumber: ", value);

  // Expiry month
  await this.actions.waitForClickable(expirymonth, 'expiry month dropdown');
  await this.actions.clickElement('click', expirymonth, "expiry month dropdown");
  await this.actions.pause(500);
  await this.actions.clickElement('click', currentExpirationMonth.replace("X", "11"), "selecting expiry month");

  // Expiry year
  await this.actions.waitForClickable(expiryyear, 'expiry year dropdown');
  await this.actions.clickElement('click', expiryyear, "expiry year dropdown");
  await this.actions.pause(500);
  await this.actions.clickElement('click', currentExpirationYear.replace("X", "8"), "selecting expiry year");

  // CVV logic
  let cvvValue = "737";
  if (["4444444444444448", "4000020000000000", "4400000000000008"].includes(value)) {
    cvvValue = "999";
  } else if (value === "5454545454545454") {
    cvvValue = "998";
  }
  await this.actions.setInputField('fill', cvvValue, cvv, "cvv field");
}


    async billingaddress() {
        await this.actions.waitForDisplayed(billingscroll, 'billingscroll', 10000) // Wait for billing section to load
        let address1 = ['Hillside Dr', 'Fireweed Ln', 'Chugach St', 'Pond Reef', 'Glacier View']
        let address2 = ['Cold Storage', 'Stellar', 'Evergreen', 'Goldendale', 'Park Ave']
        let city = ['Massachusetts', 'Alabama']
        let mobileNum = "7025551111"
        let phoneNum = mobileNum.split('');
        let randAdd1 = Math.floor(Math.random() * address1.length)
        let randAdd2 = Math.floor(Math.random() * address2.length)
        let randcity = Math.floor(Math.random() * city.length)
        let add1Value = address1[randAdd1]
        let add2Value = address2[randAdd2]
        let cityValue = city[randcity]

        await this.actions.waitForDisplayed(billingscroll, 'billingscroll', 10000)
        // await this.actions.scroll(billingscroll)
        await this.actions.clearInputField(fnamefield, "First Name Input-Field")
        await this.actions.setInputField('setValue', 'QA', fnamefield, "First Name Input-Field")
        await this.actions.clearInputField(lnamefield, "last name field")
        await this.actions.setInputField('setValue', 'AUTOMATION', lnamefield, "last name input field")

        await this.actions.clickElement('click', country, "country dropdown")
        await this.actions.waitForDisplayed(countsel, 'country selection', 10000)
        await this.actions.scroll(countsel)
        await this.actions.clickElement('click', countsel, "country selection")

        await this.actions.waitForDisplayed(add1, 'add1', 5000)
        await this.actions.scroll(add1)
        await this.actions.setInputField('setValue', add1Value, add1, "address field one")
        await this.actions.setInputField('setValue', add2Value, add2, "address field two")
        await this.actions.setInputField('setValue', cityValue, add3, "city address field three")
        await this.actions.clickElement('click', state, "state dropdown")
        await this.actions.pressButton('ArrowDown', 'down')
        await this.actions.pressButton('ArrowDown', 'down')
        await this.actions.pressButton('Enter', 'press')
        await this.actions.waitForDisplayed(zipcode, 'zipcode', 5000)
        await this.actions.setInputField('setValue', '02170', zipcode, "zipcode input field")
        await this.actions.waitForDisplayed(mobilenum, 'mobilenum', 5000)
        await this.actions.setInputField('fill', mobileNum, mobilenum, "mobile num field")
        await this.actions.clearInputField(mailfeild, "mailID field")
        await this.actions.waitForDisplayed(mailfeild, 'mailfeild', 10000)
        await this.actions.setInputField('setValue', "accept@fraudtest.com", mailfeild, "mailID input field")
    }

    async purchasemytrip() {
    try {
      paymentPageCollector.set('customerFirstName', await this.actions.getAttribute(billingFirstName, 'value', 'billingFirstName'));
      paymentPageCollector.set('customerLastName', await this.actions.getAttribute(billingLastName, 'value', 'billingLastName'));
      paymentPageCollector.set('emailAddress', await this.actions.getAttribute(emailAddressInput, 'value', 'emailAddressInput'));
      await this.getTripSummaryAmount();
    } catch (ex) {
      console.log("Exception while collecting paymentPage details");
    }

    await this.actions.scroll(termsscroll, 'termsscroll');
    let claimPointCheckBox = `//label[contains(@data-hook,'claim-my-points')]/div[2]`;
    if (await this.actions.isDisplayed(claimPointCheckBox, 'Points Claim Check box')) {
      console.log("Unchecking the Points Claim Checkbox");
      await this.actions.click(claimPointCheckBox, 'Points Claim Check box');
      await this.actions.pause(3000);
    }

    await this.actions.waitForDisplayed(termsbox, 'terms and conditions checkbox');
    await this.actions.waitForClickable(termsbox, 'terms and conditions checkbox');
    await this.actions.clickElement('click', termsbox, "condition checkbox");
    await this.actions.scroll(purchaseMyTrip, 'purchaseMyTrip');
    await this.actions.waitForClickable(purchaseMyTrip, 'purchaseMyTrip button');
    await this.actions.clickElement('click', purchaseMyTrip, "Purchase my trip Button");

    // Validate payment completion
    await this.validatePaymentCompletion();
  }


    async getTripSummaryAmount() {
        TotalFareAmount = await this.actions.getText(tripSummaryAmount, 'tripSummaryAmount');
    }

    async popupisClosing() {
        try {
            await this.actions.waitForLoadState('domcontentloaded', 25000);
            await this.actions.waitForDisplayed(icePopup, 'icePopup', 20000)
            let icePopupVisibility = await this.actions.isDisplayed(icePopup, 'Payment page popup button')
            if (icePopupVisibility) {
                await this.actions.waitForClickable(icePopup, 'paypopup button', 20000)
                await this.actions.clickElement('click', icePopup, "button to close the popup")
            }
            else {
                console.log("COOL!, No pop-up displayed in Payments Page")
            }
        }
        catch (er) {
            console.log(er)
        }
    }

    async validateDeclinedAmount() {
        await this.actions.waitUntilPageLoad()
        await this.actions.waitForDisplayed(icePopup, 'icePopup')
        let displayed = await this.actions.isDisplayed(icePopup, 'icePopup')
        if (displayed) {
            await this.actions.waitForClickable(icePopup, 'icePopup')
            await this.actions.clickElement('click', icePopup, "button to close the popup")
        }

        var IsDeclined = false;
        var declinedAmount = [
            '201',
            '204',
            '249',
            '253',
            '258',
            '280',
            '281',
            '282',
            '283',
            '284',
            '301',
            '302',
            '303',
            '304',
            '305',
            '306',
            '307',
            '401',
            '402',
            '501',
            '502',
            '508',
            '509',
            '510',
            '521',
            '522',
            '530',
            '531',
            '551',
            '570',
            '571',
            '572',
            '591',
            '592',
            '594',
            '595',
            '596',
            '602',
            '603',
            '605',
            '606',
            '607',
            '754',
            '802',
            '806',
            '813',
            '825',
            '833',
            '902',
            '903',
            '904',
            '999',
        ];
        let actualTripPrice = parseInt((await this.actions.getText(headerTripTotal, 'header triptotal'))
            .slice(1,)).toString();
        console.log('declinedAmount: ' + declinedAmount);
        console.log('actualTripPrice: ' + actualTripPrice);
        if (declinedAmount.includes(actualTripPrice)) {
            console.log('It is a declined amount, adding extras to proceed!');
            if (await this.actions.isDisplayed(breadcrumbToggle, 'breadcrumb toggle')) {
                await this.actions.click(breadcrumbToggle, 'breadcrumb toggle');
            }
            await this.actions.click(bagsBreadcrumb, 'bags breadcrumb');
            IsDeclined = true;
        }
        return IsDeclined;
    }

    async loyaltySectionapply() {
        await this.actions.waitForLoadState('networkidle', 20000)
        await this.actions.scroll(loyaltypntapply)
        let loyaltypntapplyIsDisplayed = await this.actions.isDisplayed(loyaltypntapply, 'loyaltypntapply')
        if (loyaltypntapplyIsDisplayed) {
            console.log('Loyalty Member is Logged In');
            await this.actions.isClickable(loyaltypntapply, 'loyaltypntapply')
            await this.actions.waitForClickable(loyaltypntapply, 'loyaltypntapply')
            await this.actions.clickElement('click', loyaltypntapply, 'loyaltypntapply')
            let loyaltypntapplyIsClickable = await this.actions.isClickable(loyaltypntapply, 'loyaltypntapply')
            if (loyaltypntapplyIsClickable) {
                await this.actions.waitForClickable(loyaltypntapply, 'loyaltypntapply')
                await this.actions.clickElement('click', loyaltypntapply, 'loyaltypntapply')
            } else {
                console.log("points applied.")
            }
        } else {
            await this.actions.waitForDisplayed(loyaltypntapply, 'loyaltypntapply', 5000)
            await this.actions.waitForClickable(loyaltypntapply, 'loyaltypntapply')
            await this.actions.isClickable(loyaltypntapply, 'loyaltypntapply')
            await this.actions.clickElement('click', loyaltypntapply, 'loyaltypntapply')
            console.log('Loyalty not logged in');
        }

        let tripAmount = await this.actions.getText(tripSummaryAmt, 'tripSummaryAmt')
        let loyaltyAmount = await this.actions.getText(loyaltypointsAmt, 'loyaltypointsAmt')
        console.log("tripAmount and loyaltyAmount ", tripAmount, loyaltyAmount)

        tripAmount = tripAmount.split("$")[1]
        loyaltyAmount = loyaltyAmount.split("$")[1]
        console.log("tripAmount and loyaltyAmount 2: ", tripAmount, loyaltyAmount)

        tripAmount = parseInt(tripAmount)
        loyaltyAmount = parseInt(loyaltyAmount)
        console.log("tripAmount and loyaltyAmount 3: ", tripAmount, loyaltyAmount)

        if (loyaltyAmount < tripAmount) {
            await this.actions.waitForDisplayed(cardName, 'cardName', 10000)
            let cardNameIsDisplayed = await this.actions.isDisplayed(cardName, 'cardName')
            if (cardNameIsDisplayed) {
                console.log("card name is displayed")
                await this.actions.scroll(cardName)
                await this.cardDetails()
            }
        } else {
            console.log("loyaltys points are greater than trip amount, Hence loyalty points applied")
        }

    }
    async validatePaymentCompletion() {
    try {
      // Wait for spinner to disappear (indicating payment processing completion)
      // Use a while loop similar to the existing approach in purchasemytrip method
      let spinnerVisible = true;
      let maxWaitTime = 60000; // 60 seconds maximum wait
      let startTime = Date.now();
      
      while (spinnerVisible && (Date.now() - startTime) < maxWaitTime) {
        try {
          spinnerVisible = await this.actions.isDisplayed(spinnerBar, 'spinner');
          if (spinnerVisible) {
            await this.actions.pause(500);
          }
        } catch (error) {
          // If spinner element is not found, consider it as not visible
          spinnerVisible = false;
        }
      }
      
      if (spinnerVisible) {
        throw new Error("Payment processing timeout - spinner still visible after 60 seconds");
      }
      
      // Additional wait to ensure page has stabilized
      await this.actions.pause(2000);
      
      // Check if we're redirected to confirmation page or if there's an error
      const currentUrl = await this.actions.getUrl();
      
      if (currentUrl.includes('/confirmation')) {
        console.log("Payment completed successfully - redirected to confirmation page");
        return true;
      }
      
      // Check for error messages that indicate payment failure
      const errorMessageDisplayed = await this.actions.isDisplayed(somethingReallyOddJustHappened, 'error message');
      if (errorMessageDisplayed) {
        const errorText = await this.actions.getText(recoverableErrorMsg, 'error message text');
        throw new Error(`Payment failed with error: ${errorText}`);
      }
      
      // Check for card number error
      const cardErrorDisplayed = await this.actions.isDisplayed(errorMessageCarNum, 'card error message');
      if (cardErrorDisplayed) {
        const cardErrorText = await this.actions.getText(errorMessageCarNum, 'card error text');
        throw new Error(`Payment failed with card error: ${cardErrorText}`);
      }
      
      // If we're still on payment page after long wait, payment might have failed
      if (currentUrl.includes('/payment')) {
        throw new Error("Payment processing failed - still on payment page after completion attempt");
      }
      
      console.log("Payment validation completed successfully");
      return true;
      
    } catch (error) {
      console.error("Payment completion validation failed:", error.message);
      throw error;
    }
  }
}
export default PaymentPage
export { paymentPageCollector }
