import actions from '@g4/prova-ui/src/support/actions'
import GetCardNumbers from './cardNumbers'
import { assert } from 'chai';

const icePopup = "[data-hook='payment-page_ice-popup_close']"
const sscrolldetails = "//span[text()='Payment Information']"
const headerTripTotal = "[data-hook='header-cart-button_price']";
const bagsBreadcrumb = "[data-hook='flights-breadcrumb_item-bags']";
const breadcrumbToggle = "[data-hook='flights-breadcrumb_toggle']"
const cardName = "[data-hook='payment-page_card-holder-name']"
const cardnumfield = "[data-hook='payment-page_card-number']"
const expirymonth = "[data-hook='payment-page_card-expiration-month']"
const monthscroll = "#react-select-card-expiration-month-option-8"
const monthselection = "[data-hook='payment-page_card-expiration-month_12']"
// const currentExpirationMonth = "//div[@id='react-select-card-expiration-month-option-X']"
const yearlocscroll = "[data-hook='payment-page_card-number']"
const expiryyear = "[data-hook='payment-page_card-expiration-year']"
const yearscroll = "#react-select-card-expiration-year-option-4"
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
const purchaseMyTrip = "[data-hook='payment-page_continue']"
const billingFirstName = "[data-hook='payment-page_first-name']"
const billingLastName = "[data-hook='payment-page_last-name']"
const emailAddressInput = "[data-hook='payment-page_email-address']";
const somethingReallyOddJustHappened = "//div[@data-hook='recoverable-error']"
const errorMessageCarNum = "//*[@data-hook='field-error-message_card-number']"
const recoverableErrorMsg = "(//div[@data-hook='recoverable-error_content']//span)[1]"
const thankyouMessage = "[data-hook='confirmation-page-thank-you-message_first-paragraph']"
const tripSummaryExpando = "[data-hook='payment-page_trip_summary_header']";
const tripSummaryFlightHeader = "[data-hook='payment-page_trip_summary_content'] [data-hook='cart-item_flight-package_heading']";
const loyaltypntapply = "(//button[@type='submit'])[1]"

////////////////////////////////////////////////////////////////////////////
const currentExpirationMonth = "//div[@id='react-select-card-expiration-month-option-X']"
const currentExpirationYear = "//div[@id='react-select-card-expiration-year-option-X']"
const cardExpireMonthFieldError = "[data-hook='field-error-message_card-expiration-month']"
const expirationYear = "//div[@data-hook='payment-page_card-expiration-year_X']";
const ExpirationMonth = "//div[@data-hook='payment-page_card-expiration-month_X']";

const tripSummaryAmt = "[data-hook='payment-page_trip_summary_amount']"
const loyaltypointsAmt = "[data-hook='payment-page_points-section_loyalty_points_section_total_points_value']"

const spinnerBar = "//span[contains(@data-hook,'spinner')]";
var paymentPageCollector = new Map();

var TotalFareAmount = 0;

class PaymentPage {

  async popupClosing() {
    await actions.pause(10000)
    try {
      await actions.waitForDisplayed(icePopup, 'icePopup', 20000)
      let icePopupVisibility = await actions.isDisplayed(icePopup, 'Payment page popup button')
      if (icePopupVisibility) {
        await actions.waitForClickable(icePopup, 'paypopup button')
        await actions.clickElement('click', icePopup, "button to close the popup")
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
    await actions.pause(6000)
    await actions.waitForDisplayed(icePopup, 'icePopup', 30000)
    let displayed = await actions.isDisplayed(icePopup, 'icePopup')
    if (displayed) {
      // await browser.keys(['Escape']);
      await actions.waitForClickable(icePopup, 'icePopup')
      await actions.clickElement('click', icePopup, "button to close the popup")
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
    let actualTripPrice = (await $(headerTripTotal)
      .getText()).split('$')[1].split('.')[0]
    console.log('declinedAmount: ' + declinedAmount);
    console.log('actualTripPrice: ' + actualTripPrice);
    for (let i = 0; i < declinedAmount.length; i++) {
      if (await eval(actualTripPrice.split('.')[0].includes(declinedAmount[i]))) {
        console.log('It is a declined amount, adding extras to proceed!');
        if (await $(breadcrumbToggle).isDisplayed()) {
          await $(breadcrumbToggle).click();
        }
        await browser.execute("window.scrollBy(0,-1000)");
        await $(bagsBreadcrumb).waitForClickable()
        await $(bagsBreadcrumb).click();
        IsDeclined = true;
      }
    }
    return IsDeclined;
  }

  async getTripSummaryAmount() {
    TotalFareAmount = await actions.getText(tripSummaryAmount, 'tripSummaryAmount');
  }

  async selectPurchaseMyTrip() {
    await actions.waitForEnabled(purchaseMyTrip, 'purchaseMyTrip');
    // await actions.waitForClickable(purchaseMyTrip, 'Purchase my trip button');
    try {
      paymentPageCollector.set('customerFirstName', await $(billingFirstName).getAttribute('value'))
      paymentPageCollector.set('customerLastName', await $(billingLastName).getAttribute('value'))
      paymentPageCollector.set('emailAddress', await $(emailAddressInput).getAttribute('value'))
      await this.getTripSummaryAmount();
    }
    catch (ex) {
      console.log("Exception while collecting paymentPage details")
    }
    await actions.scroll(termsbox,'termsbox')
    await actions.waitForDisplayed(termsbox, 'terms and conditions checkbox')
    await actions.waitForClickable(termsbox, 'terms and conditions checkbox');
    await actions.clickElement('click', termsbox, "condition checkbox")
    await actions.waitForClickable(purchaseMyTrip, 'purchaseMyTrip button');
    await actions.clickElement('click', purchaseMyTrip, "Purchase my trip Button");
    let purchaseMyTripIsClickable = await actions.isClickable(purchaseMyTrip, 'purchaseMyTrip')
    if (purchaseMyTripIsClickable) {
      await actions.waitForClickable(purchaseMyTrip, 'purchaseMyTrip button');
      await actions.clickElement('click', purchaseMyTrip, 'purchase my trip button');
    }
    let somethingReallyOddJustHappenedIsDisplayed = await actions.isDisplayed(somethingReallyOddJustHappened, 'somethingReallyOddJustHappened')
    if (somethingReallyOddJustHappenedIsDisplayed) {
      await assert.fail("something Really Odd Just Happened error! " + (await $(recoverableErrorMsg).getText()) + " Fare Amount: " + TotalFareAmount)
    } else if (await actions.isDisplayed(errorMessageCarNum, 'errorMessageCarNum')) {
      await assert.fail("Valid card " + (await actions.getText(errorMessageCarNum, 'errorMessageCarNum')))
    }
    else {
      await actions.waitFor(thankyouMessage, 5000)
      await actions.waitForDisplayed(thankyouMessage, 'thankyouMessage');
    }
  }

  async clickTripSummaryExpando() {
    await actions.pause(2000);
    await actions.scroll(tripSummaryExpando,'tripSummaryExpando')
    await actions.waitForDisplayed(tripSummaryExpando, 'tripSummaryExpando')
    await actions.clickElement('click', tripSummaryExpando, 'trip SummaryExpando')
    await actions.waitForDisplayed(tripSummaryFlightHeader, 'tripSummaryFlightHeader')
    await actions.pause(2000);
  }

  async cardDetails() {
    // let {
    //   creditCardNum,
    //   creditCardCvv,
    // } = await GetCardNumbers.getCreditCardNumbers('Master')
    // console.log("creditCardNum: ", creditCardNum)
    // console.log("creditCardCvv: ", creditCardCvv)
    //const cardNumArray = ["4444444444444448","4000020000000000","4400000000000008","4147895259293966","4181557652420268","4735242519645511"];
    await actions.pause(5000)
    if (process.env.ENV.includes("prod")) {
      await actions.setInputField('setValue', process.env.cardname, cardName, "card name input field")
      //$(cardHolderName).setValue(process.env.cardname);
      const cnum = process.env.cardno;
      const no = cnum;
      const noLen = no.split('');
      for (let i = 0; i < no.length; i++) {
        await actions.setInputField('setValue', noLen[i], cardnumfield, "card-number input field")
      }
      await actions.waitForClickable(expirymonth, 'expiry month dropdown');
      await actions.clickElement('click', expirymonth, "expiry month dropdown")
      await actions.pause(5000)
      await actions.clickElement('click', ExpirationMonth.replace("X", process.env.expiredMonth), "Expiration Month")
      await actions.pause(1000)
      await browser.keys(['Tab']);
      let cardExpireMonthFieldErrorIsDisplay = await actions.isDisplayed(cardExpireMonthFieldError, 'cardExpireMonthFieldError')
      if (cardExpireMonthFieldErrorIsDisplay) {
        await actions.waitForClickable(expirymonth, 'expiry month dropdown');
        await actions.clickElement('click', expirymonth, "expiry month dropdown")
        await actions.pause(100)
        await actions.clickElement('click', ExpirationMonth.replace("X", process.env.expiredMonth), "Expiration Month")
      }
      await actions.clickElement('click', expiryyear, "expiry year dropdown")
      await actions.pause(2000)
      await actions.clickElement('click', expirationYear.replace("X", process.env.expiredYear), "Expiration Month")
      await actions.setInputField('setValue', process.env.cvv, cvv, "cvv field")
    } else {
      const cardNumArray = ["5454545454545454", "4444444444444448", "4000020000000000", "4400000000000008", "5555555555555557"];
      // const cardNumArray = ["5454545454545454","4444444444444448","5555555555555557"]
      const random = Math.floor(Math.random() * cardNumArray.length);
      let value
      if (process.env.ENV.includes("prd01")) {
        value = cardNumArray[0];
      } else {
        value = cardNumArray[random];
      }
      const strLen = value.split('');
      await actions.pressButton('Enter')
      await actions.waitForDisplayed(cardName, 'cardName text field', 10000);
      await actions.scroll(cardName,'cardName')
      await actions.pause(3000)
      await actions.waitForClickable(cardName, 'cardName text field')
      await actions.clearInputField(cardName, 'cardName')
      await actions.setInputField('setValue', "Auto Tester", cardName, "card name input field")
      await actions.pause(5000)
      for (let i = 0; i < value.length; i++) {
        await actions.addValue(strLen[i], cardnumfield, "card-number input field")
      }
      // let cnum = '371449635398431'
      // for(let i = 0; i < cnum.length; i++) {
      //   await actions.setInputField('addValue', cnum[i], cardnumfield, "card-number input field")
      // }
      // await actions.setInputField('setValue', cardNumArray[random], cardnumfield, "card-number input field")
      console.log("CardNumber: ", cardNumArray[random])
      await actions.waitForDisplayed(expirymonth, 'expirymonth', 10000)
      await actions.pause(100)
      await actions.scroll(expirymonth,'expirymonth')
      await actions.waitForClickable(expirymonth, 'expirymonth', 5000)
      await actions.clickElement('click', expirymonth, "expiry month dropdown")
      await actions.pause(1000)
      await actions.scroll(monthscroll,'monthscroll')
      await actions.waitForClickable(monthselection, 'monthselection', 5000)
      await actions.clickElement('click', currentExpirationMonth.replace("X", "11"), "selecting the expiry month of card")
      // await actions.clickElement('click', monthselection, "selecting the expiry month of card")

      await actions.waitForDisplayed(yearlocscroll, 'yearlocscroll', 10000)
      await actions.scroll(yearlocscroll,'yearlocscroll')
      await actions.waitForClickable(yearlocscroll, 'yearlocscroll', 5000)
      await actions.clickElement('click', expiryyear, "expiry year dropdown")
      await actions.scroll(yearscroll,'yearscroll')
      await actions.pause(200)
      await actions.clickElement('click', currentExpirationYear.replace("X", "8"), "selecting the expiry year of card")
      await actions.pause(2000)
      // await actions.clickElement('click', yearseelection, "selecting the expiry year of card")
      await actions.scroll(yearlocscroll,'yearlocscroll')
      // await actions.setInputField('setValue', "9997", cvv, "cvv field")
      await actions.pause(3000)
      if (value === '4444444444444448' || value === '4000020000000000' || value === '4400000000000008' || value === '6243030000000001') {
        let cvvValue = "999"
        let cvvLen = cvvValue.split('');
        for (let i = 0; i < cvvValue.length; i++) {
          await actions.addValue(cvvLen[i], cvv, "cvv field")
        }
      } else if (value === '5454545454545454') {
        let cvvValue = "998"
        let cvvLen = cvvValue.split('');
        for (let i = 0; i < cvvValue.length; i++) {
          await actions.addValue(cvvLen[i], cvv, "cvv field")
        }
      } else {
        let cvvValue = "737"
        let cvvLen = cvvValue.split('');
        for (let i = 0; i < cvvValue.length; i++) {
          await actions.addValue(cvvLen[i], cvv, "cvv field")
        }
      }
    }
  }

  async billingaddress() {
    await actions.pause(5000)
    let address1 = ['Hillside Dr', 'Fireweed Ln', 'Chugach St', 'Pond Reef', 'Glacier View']
    let address2 = ['Cold Storage', 'Stellar', 'Evergreen', 'Goldendale', 'Park Ave']
    // let city = ['Kodiak', 'Ketchikan', 'Palmer', 'Eagle River', 'Craig']
    let city = ['Massachusetts', 'Alabama']
    let mobileNum = "7025551111"
    let phoneNum = mobileNum.split('');
    let randAdd1 = Math.floor(Math.random() * address1.length)
    let randAdd2 = Math.floor(Math.random() * address2.length)
    let randcity = Math.floor(Math.random() * city.length)
    let add1Value = address1[randAdd1]
    let add2Value = address2[randAdd2]
    let cityValue = city[randcity]

    await actions.waitForDisplayed(billingscroll, 'billingscroll', 10000)
    await actions.scroll(billingscroll,'billingscroll')
    await actions.clearInputField(fnamefield, "First Name Input-Field")
    await actions.setInputField('setValue', 'QA', fnamefield, "First Name Input-Field")
    await actions.clearInputField(lnamefield, "last name field")
    await actions.setInputField('setValue', 'AUTOMATION', lnamefield, "last name input field")

    await actions.clickElement('click', country, "country dropdown")
    await actions.waitForDisplayed(countsel, 'country selection', 10000)
    await actions.scroll(countsel,'countsel')
    await actions.clickElement('click', countsel, "country selection")

    await actions.waitForDisplayed(add1, 'add1', 5000)
    await actions.scroll(add1)
    await this.checkPaymentAddress(add1Value)
    await this.checkPaymentAddress(add2Value)
    await actions.setInputField('setValue', add1Value, add1, "address field one")
    await actions.setInputField('setValue', add2Value, add2, "address field two")
    await actions.setInputField('setValue', cityValue, add3, "city address field three")
    await actions.clickElement('click', state, "state dropdown")
    await actions.pressButton(['ArrowDown', 'ArrowDown', 'Enter'])
    await actions.waitForDisplayed(zipcode, 'zipcode', 5000)
    // if (cityValue === 'Massachusetts') {
    //   await actions.setInputField('setValue', '02170', zipcode, "zipcode input field")
    // } else if (cityValue === 'Alabama') {
    //   await actions.setInputField('setValue', '35004', zipcode, "zipcode input field")
    // }
    await actions.setInputField('setValue', '02170', zipcode, "zipcode input field")
    await actions.waitForDisplayed(mobilenum, 'mobilenum', 5000)

    // await actions.setInputField('setValue', '702-555-1111', mobilenum, "mobile-num field")
    for (let i = 0; i < mobileNum.length; i++) {
      await actions.addValue(phoneNum[i], mobilenum, "mobile num field")
    }
    await actions.clearInputField(mailfeild, "mailID field")
    if (process.env.ENV.includes("prod")) {
      await actions.setInputField('setValue', "bat@allegiantair.com", mailfeild, "mailID input field")
    } else {
      await actions.waitForDisplayed(mailfeild, 'mailfeild', 10000)
      await actions.setInputField('setValue', "accept@fraudtest.com", mailfeild, "mailID input field")
    }

  }
  async addBillingAddress(address1, address2) {
    await actions.pause(5000)
    // let city = ['Kodiak', 'Ketchikan', 'Palmer', 'Eagle River', 'Craig']
    let city = ['Massachusetts', 'Alabama']
    let mobileNum = "7025551111"
    let phoneNum = mobileNum.split('');
    let randcity = Math.floor(Math.random() * city.length)
    let cityValue = city[randcity]

    await actions.waitForDisplayed(billingscroll, 'billingscroll', 10000)
    await actions.scroll(billingscroll)
    await actions.clearInputField(fnamefield, "First Name Input-Field")
    await actions.setInputField('setValue', 'QA', fnamefield, "First Name Input-Field")
    await actions.clearInputField(lnamefield, "last name field")
    await actions.setInputField('setValue', 'AUTOMATION', lnamefield, "last name input field")

    await actions.clickElement('click', country, "country dropdown")
    await actions.waitForDisplayed(countsel, 'country selection', 10000)
    await actions.scroll(countsel)
    await actions.clickElement('click', countsel, "country selection")

    await actions.waitForDisplayed(add1, 'add1', 5000)
    await actions.scroll(add1)
    await this.checkPaymentAddress(address1)
    await this.checkPaymentAddress(address2)
    await actions.setInputField('setValue', address1, add1, "address field one")
    await actions.setInputField('setValue', address2, add2, "address field two")
    await actions.setInputField('setValue', cityValue, add3, "city address field three")
    await actions.clickElement('click', state, "state dropdown")
    await actions.pressButton(['ArrowDown', 'ArrowDown', 'Enter'])
    await actions.waitForDisplayed(zipcode, 'zipcode', 5000)
    // if (cityValue === 'Massachusetts') {
    //   await actions.setInputField('setValue', '02170', zipcode, "zipcode input field")
    // } else if (cityValue === 'Alabama') {
    //   await actions.setInputField('setValue', '35004', zipcode, "zipcode input field")
    // }
    await actions.setInputField('setValue', '02170', zipcode, "zipcode input field")
    await actions.waitForDisplayed(mobilenum, 'mobilenum', 5000)

    // await actions.setInputField('setValue', '702-555-1111', mobilenum, "mobile-num field")
    for (let i = 0; i < mobileNum.length; i++) {
      await actions.addValue(phoneNum[i], mobilenum, "mobile num field")
    }
    await actions.clearInputField(mailfeild, "mailID field")
    if (process.env.ENV.includes("prod")) {
      await actions.setInputField('setValue', "bat@allegiantair.com", mailfeild, "mailID input field")
    } else {
      await actions.waitForDisplayed(mailfeild, 'mailfeild', 10000)
      await actions.setInputField('setValue', "accept@fraudtest.com", mailfeild, "mailID input field")
    }
  }
  async checkSavedBillingAddress() {
    await actions.waitForDisplayed(mobilenum, 'mobilenum', 5000)
    let mobileNum = "7025551111"
    let phoneNum = mobileNum.split('');
    await actions.setInputField('setValue', '02170', zipcode, "zipcode input field")
    await actions.waitForDisplayed(mobilenum, 'mobilenum', 5000)
    for (let i = 0; i < mobileNum.length; i++) {
      await actions.addValue(phoneNum[i], mobilenum, "mobile num field")
    }
  }
  async purchasemytrip() {
    try {
      paymentPageCollector.set('customerFirstName', await actions.getAttribute(billingFirstName, 'value', 'billingFirstName'))
      paymentPageCollector.set('customerLastName', await actions.getAttribute(billingLastName, 'value', 'billingLastName'))
      paymentPageCollector.set('emailAddress', await actions.getAttribute(emailAddressInput, 'value', 'emailAddressInput'))
      await this.getTripSummaryAmount();
    }
    catch (ex) {
      console.log("Exception while collecting paymentPage details")
    }
    
    await actions.scroll(termsscroll,'termsscroll')
    await actions.waitForDisplayed(termsbox, 'terms and conditions checkbox')
    await actions.waitForClickable(termsbox, 'terms and conditions checkbox');
    await actions.clickElement('click', termsbox, "condition checkbox")
    await actions.pause(3000)
    await actions.scroll(purchaseMyTrip,'purchaseMyTrip')
    await actions.waitForClickable(purchaseMyTrip, 'purchaseMyTrip button');
    await actions.pause(2000)
    await actions.clickElement('click', purchaseMyTrip, "Purchase my trip Button");
    try {
      await actions.clickElement('click', purchaseMyTrip, "Purchase my trip Button Attempt2");
    } catch (error) {

    }
    await actions.pause(20000)
    console.log("URL: ", await browser.getUrl())
    let oddJustHappenedVisibility = await actions.isDisplayed(somethingReallyOddJustHappened, 'somethingReallyOddJustHappened')
    let errorMsgVisibility = await actions.isDisplayed(errorMessageCarNum, 'errorMessageCarNum')
    if (oddJustHappenedVisibility) {
      console.log("URL Odd Happen: ", await browser.getUrl())
      assert.fail("something Really Odd Just Happened error! " + (await actions.getText(recoverableErrorMsg, 'recoverableErrorMsg')) + " Fare Amount: " + TotalFareAmount)
    } else if (errorMsgVisibility) {
      console.log("URL error msg: ", await browser.getUrl())
      assert.fail("Valid card " + (await actions.getText(errorMessageCarNum, 'errorMessageCarNum')))
    }
    else {
      do {
        await actions.pause(500)
      } while (await $(spinnerBar).isDisplayed())
      await actions.pause(5000)
      await actions.waitForDisplayed(thankyouMessage, 'thankyouMessage', 60000);
      await actions.pause(5000)
    }
    await actions.pause(5000)
  }

  async clickTripSummaryExpando() {
    await actions.waitForClickable(tripSummaryExpando, 'tripSummaryExpando')
    await actions.clickElement('click', tripSummaryExpando, 'tripSummaryExpando')
    await actions.waitFor(tripSummaryFlightHeader)
    await actions.waitForDisplayed(tripSummaryFlightHeader, 'tripSummaryFlightHeader')
  }

  async loyaltySectionapply() {
    await actions.pause(3000)
    await actions.scroll(loyaltypntapply,'loyaltypntapply')
    let loyaltypntapplyIsDisplayed = await actions.isDisplayed(loyaltypntapply, 'loyaltypntapply')
    if (loyaltypntapplyIsDisplayed) {
      console.log('Loyalty Member is Logged In');
      await actions.isClickable(loyaltypntapply, 'loyaltypntapply')
      await actions.waitForClickable(loyaltypntapply, 'loyaltypntapply')
      await actions.clickElement('click', loyaltypntapply, 'loyaltypntapply')
      let loyaltypntapplyIsClickable = await actions.isClickable(loyaltypntapply, 'loyaltypntapply')
      if (loyaltypntapplyIsClickable) {
        await actions.waitForClickable(loyaltypntapply, 'loyaltypntapply')
        await actions.clickElement('click', loyaltypntapply, 'loyaltypntapply')
        await actions.pause(5000)
      } else {
        console.log("points applied.")
      }
    } else {
      await actions.waitForDisplayed(loyaltypntapply, 'loyaltypntapply', 5000)
      await actions.waitForClickable(loyaltypntapply, 'loyaltypntapply')
      await actions.isClickable(loyaltypntapply, 'loyaltypntapply')
      await actions.clickElement('click', loyaltypntapply, 'loyaltypntapply')
      await actions.pause(5000)
      console.log('Loyalty not logged in');
    }

    let tripAmount = await actions.getText(tripSummaryAmt)
    let loyaltyAmount = await actions.getText(loyaltypointsAmt)
    console.log("tripAmount and loyaltyAmount ", tripAmount, loyaltyAmount)

    tripAmount = tripAmount.split("$")[1]
    loyaltyAmount = loyaltyAmount.split("$")[1]
    console.log("tripAmount and loyaltyAmount 2: ", tripAmount, loyaltyAmount)

    tripAmount = parseInt(tripAmount)
    loyaltyAmount = parseInt(loyaltyAmount)
    console.log("tripAmount and loyaltyAmount 3: ", tripAmount, loyaltyAmount)

    if (loyaltyAmount < tripAmount) {
      await actions.waitForDisplayed(cardName, 'cardName', 10000)
      let cardNameIsDisplayed = await actions.isDisplayed(cardName, 'cardName')
      if (cardNameIsDisplayed) {
        console.log("card name is displayed")
        await actions.scroll(cardName,'cardName')
        await this.cardDetails()
      }
    } else {
      console.log("loyaltys points are greater than trip amount, Hence loyalty points applied")
    }

  }
  async checkPaymentAddress(addressLine) {
    //valid characters
    //(addressLine.includes(",")||addressLine.includes("-")||addressLine.includes(".")||addressLine.includes("#")||addressLine.includes("/")||addressLine.includes("'")||addressLine.includes(":")||addressLine.includes(";"))
    if (addressLine.includes("!") || addressLine.includes("@") || addressLine.includes("$") || addressLine.includes("%") || addressLine.includes("^") || addressLine.includes("&") || addressLine.includes("*") || addressLine.includes("(") || addressLine.includes(")") || addressLine.includes("_") || addressLine.includes("+") || addressLine.includes("=") || addressLine.includes('"') || addressLine.includes("{") || addressLine.includes("}") || addressLine.includes("[") || addressLine.includes("]") || addressLine.includes("|")||addressLine.includes("\\")) {
      throw new Error("invalid format for address")
    } else {
      console.log("valid address")
    }
  }
}
export default new PaymentPage()
export { TotalFareAmount, paymentPageCollector };
