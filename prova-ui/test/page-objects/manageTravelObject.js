import Actions from '../../src/support/actions.js'
import Checks from '../../src/support/validations.js'
import { assert } from 'chai'

const cancelButton = "[data-hook='order-highlights-banner_cancel-button']"
const cancelTripPopup = "[data-hook='undefined_title']"
const selectSegmentText = "//*[contains(text(),'Please select the segment')]"
const cancelEntireTripText = "//fieldset[contains(@aria-labelledby,'choose-option-to-cancel_label')]/div/label[3]/span/span"
const cancelEntireTripRadioButton = "//fieldset[contains(@aria-labelledby,'choose-option-to-cancel_label')]/div/label[3]/div[2]"
const nextButton = "//span[contains(text(),'Next')]"
const contentCancelPopup = "//*[text()='Are you sure you want to cancel your trip?']"
const cancelTripButton = "//div[@data-hook='undefined_content']/div[3]/div[2]/button[2]/span"
const cancelCompleted = "//*[text()='Cancelation Completed']"
const reservationCanceled = "//*[contains(text(),'Your reservation has been canceled')]"
const cancelPopUpCloseIcon = "//button[@class='Popup__CloseIcon-jq1nfm-2 gqLMpE']"
const canceledRedBanner = "//*[@data-hook='lookup-page-error-message_error-heading']"
const addCar = "//span[(text()='Add a car')]"
const carsPageHeader = "//*[text()='Car Selection']"
const termsscroll = "[data-hook='payment-page_terms-and-cond-section_legend']"
const termsbox = "//label[@data-hook='payment_terms-and-conditions-checkbox_label']"
const purchase = "[data-hook='payment-page_continue']"
const itineraryDetails = "//*[@data-hook='trip-summary-page_title']"
const addBagsLink = "//a[contains(text(),'Add/Change Bags')]|//span[contains(text(),'Traveler')]"
const checkedBags = "(//span[contains(text(),'Checked Bag')])[2]"
const checkedBag = "//button[@data-hook='ancillaries-page-traveler_0_checked-in_increment']"
const iAgreeCovidPolicyCheckBox = "//*[@class='touch-friendly-checkbox small']"
const somethingReallyOddError = "//h2[text()='Something really odd just happened...']"
const continueButton = "(//span[contains(text(),'Continue')])[2]"
const continueBagsPopUp = "[data-hook='ancillaries-continue-popup_button_continue']"
const hazardMaterial = "//*[text()='Are you carrying Hazardous Materials?']"
const hazardcheckbox = "[class='Box-s8oj9r-0 cjJOaR']"
const hazardContinueButton = "//*[text()='CONTINUE']"
const seatcontinuebtn = "//span[contains(text(),'Continue')]"
const continueSeatsPopUp = "[data-hook='seats-page-continue-button-popup_continue-button']"
const paymentPageHeading = "//span[contains(text(),'Payment Information')]"
const seatPageTitle = "//h1[contains(text(),'Please Confirm Your Seat Selection')]"
const bagsPageTitle = "//h1[text()='Select Bag and Boarding Options']"
const continuePopUpSeatsPage = "[data-hook='seats-page-continue-button-popup_continue-button']"
const SeatPageReturnSegTab = "//div[@class='flight-details']//span[text()='RETURNING']"
const hotelPageTitle = "//h1[contains(text(),'Bundle Air + Hotel and Save!')]"
const carPageTitle = "//h1[contains(text(),'Getting Around')]"
const changeFlight = "[data-hook='order-highlights-banner_flight-dates-change-button']"
const flightH1 = "//span[text()='Select New Flights']"
const itineraryDetailsPage = "[data-hook='trip-summary-page_title']"
const printBoxThankyou = "//span[contains(text(),'Thank you')]"
const flightinformation = "(//span[@class='Text-sc-1o5ubbx-0 PageSection__CapitalizedText-sc-1q7kcky-0 dKvhrs'])[1] | //span[normalize-space()='Flight information']"
const manageTravelPageCheckedBagCount = "(//div[@class='TravelerInfo__TableBody-sc-1pz7o2a-2 XfERc'])[2]"
const balanceCart = "//button[contains(@class,'PaymentCart__PaymentButton')]/span[2]"
const negativeContinue = "//span[contains(text(),'Continue')]"
const paymentPageTitle = "[data-hook='payment-page_page-heading']"
const spinnerBar = "//span[contains(@data-hook,'spinner')]"
const icePopupClose = "[data-hook='payment-page_ice-popup_close']"

class Managetravel {

    actions;
    check;

    constructor(page, context) {
        this.actions = new Actions(page, context)
        this.check = new Checks(page, context)
    }

    async cancelMyTrip() {
        await this.actions.waitUntilPageLoad()
        await this.actions.pause(30000)
        await this.actions.waitForDisplayed(itineraryDetails, 'itineray details page')
        await this.actions.waitForDisplayed(cancelButton, 'cancel button', 10000)
        await this.actions.waitForClickable(cancelButton, 'cancel button')
        await this.actions.clickElement('click', cancelButton, 'cancel button')

        // cancel trip popup
        await this.actions.waitForDisplayed(cancelTripPopup, 'cancelTripPopup', 10000)
        await this.check.isDisplayed(cancelTripPopup, 'cancelTripPopup')
        let selectSegmentTextIsDisplayed = await this.actions.isDisplayed(selectSegmentText, 'selectSegmentText')
        if (selectSegmentTextIsDisplayed) {
            await this.check.isDisplayed(cancelEntireTripText, 'cancelEntireTripText')
            await this.actions.waitForClickable(cancelEntireTripRadioButton, 'cancelEntireTrip RadioButton')
            await this.actions.clickElement('click', cancelEntireTripRadioButton, 'cancelEntireTrip RadioButton')
            await this.actions.waitForClickable(nextButton, 'next button')
            await this.actions.clickElement('click', nextButton, 'next button')
        }

        // cancel trip content
        // await this.actions.waitFor(contentCancelPopup, 5000, '', true, 'content cancel popup')
        await this.actions.waitForDisplayed(contentCancelPopup, 'contentCancelPopup', 10000)

        // click cancel reservation
        await this.actions.waitForClickable(cancelTripButton, 'cancelTripButton')
        await this.actions.clickElement('click', cancelTripButton, 'cancelTripButton')

        // cancel completed
        // await this.actions.waitFor(cancelCompleted, 5000, '', true, 'cancel completed')
        await this.actions.waitForDisplayed(cancelCompleted, 'cancel completed', 10000)
        let canceltext = await this.actions.getText(cancelCompleted, 'cancel completed')
        assert.isTrue(canceltext.includes("Cancelation Completed"), "Error in verifying text for Cancelation Confirmed")
        await this.actions.waitForDisplayed(reservationCanceled, 'reservation canceled', 10000)
        assert.isTrue((await this.actions.getText(reservationCanceled, 'reservationCanceled')).includes("Your reservation has been canceled."), "FAILED!! Invalid Message for reservation cancelation")

        // close cancel popup
        // await this.actions.waitFor(cancelPopUpCloseIcon, 5000, '', true, 'cancel completed')
        await this.actions.waitForDisplayed(cancelPopUpCloseIcon, 'cancelPopUpCloseIcon', 10000)
        await this.actions.clickElement('click', cancelPopUpCloseIcon, 'cancelPopUpCloseIcon')
        let canceledRedBannerIsDisplayed = await this.actions.isDisplayed(canceledRedBanner, 'canceledRedBanner')
        if (canceledRedBannerIsDisplayed) {
            await this.actions.waitForDisplayed(canceledRedBanner, 'canceled redbanner')
            assert.isTrue((await this.actions.getText(canceledRedBanner, 'canceledRedBanner')).includes("Canceled Trip"), "Assertion FAILED for Canceled Red Banner")
        }
    }

    async clickAddaCar() {
        try {
            await this.actions.waitUntilPageLoad()
            await this.actions.pause(30000)
            console.log(await this.actions.getUrl())
            await this.actions.waitForDisplayed(itineraryDetails, 'itinerary details')
            // await this.actions.waitForDisplayed(addCar, 'addCar link', 30000)
            await this.actions.scroll(addCar)
            // await this.actions.waitForClickable(addCar, 'addCar Link')
            await this.actions.clickElement('click', addCar, "Add Car link")
            await this.actions.waitUntilPageLoad()
            await this.actions.waitForDisplayed(carsPageHeader, 'carsPageHeader', 30000)
        } catch (error) {
            console.log(error)
        }
    }

    async purchasemytrip() {
        await this.actions.scroll(termsscroll)
        await this.actions.clickElement('click', termsbox, "condition checkbox")
        await this.actions.clickElement('click', purchase, "Continue and Pay button")
    }

    async addProduct(product, paxNum) {
        await this.actions.pause(10000)
        if (product.includes("checked")) {
            try {
                await this.actions.waitForDisplayed(addBagsLink, 'addBagsLink', 10000)
                await this.actions.clickElement('click', addBagsLink, 'addBagsLink')
                await this.actions.waitForDisplayed(checkedBags, 'checkedBags', 5000)
            } catch (er) {
                console.log("The add bags link is not enabled")
            }
            await this.actions.pause(5000)
            await this.actions.clickElement('click', checkedBag.replace("X", paxNum), 'checkedBag')
            for (var i = 0; i < parseInt(product.split(' ')[0]); i++) {
                await this.actions.pause(3000);
                await this.actions.pressButton('ArrowDown', 'down');
            }
            await this.actions.pressButton('Enter', 'press');
        }
    }

    async selectCovidRestrictedArticalPolicy() {
        try {
            let covidPolicyPopUP = await this.actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
            if (covidPolicyPopUP) {
                await this.actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox');
                await this.actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
                await this.actions.pause(3000)
            } else {
                console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
            }
        } catch (ex) {
            console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
        }
    }

    async ContinueButton(page) {
        let somethingReallyOddErrorIsDisplayed = await this.actions.isDisplayed(somethingReallyOddError, 'somethingReallyOddError')
        if (somethingReallyOddErrorIsDisplayed) {
            assert.fail(await this.actions.getText(somethingReallyOddError, 'somethingReallyOddError'))
        }
        await this.actions.waitForDisplayed(continueButton, 'continueButton', 20000)
        let continueButtonIsDisplayed = await this.actions.isDisplayed(continueButton, 'continueButton')
        if (continueButtonIsDisplayed) {
            await this.actions.scroll(continueButton.replace("X", 1))
            await this.actions.waitForClickable(continueButton.replace("X", 1), 'continueButton')
            await this.actions.clickElement('click', continueButton.replace("X", 1), 'continueButton')
            await this.actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 20000)
            let bagsPopUpVisiilty = await this.actions.isDisplayed(continueBagsPopUp, 'continueBagsPopUp')
            if (bagsPopUpVisiilty) {
                await this.actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 20000)
                await this.actions.scroll(continueBagsPopUp)
                await this.actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            await this.actions.waitForDisplayed(hazardMaterial, 'hazardMaterial', 10000)
            let hazardMaterialIsDisplayed = await this.actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await this.actions.scroll(hazardcheckbox)
                await this.actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                await this.actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await this.actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                await this.actions.waitForClickable(hazardContinueButton, 'hazardContinueButton')
                await this.actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            } else {
                await this.actions.waitForDisplayed(seatcontinuebtn.replace("X", 1), 'continueButton', 20000)
                // await this.actions.scroll(seatcontinuebtn.replace("X", 1))
                await this.actions.waitForClickable(seatcontinuebtn.replace("X", 1), 'continueButton')
                await this.actions.clickElement('click', seatcontinuebtn.replace("X", 1), 'continueButton')
                await this.actions.waitForDisplayed(continueSeatsPopUp, 'continueSeatsPopUp', 20000)
                let seatsPopUpVisiilty = await this.actions.isDisplayed(continueSeatsPopUp, 'continueSeatsPopUp')
                if (seatsPopUpVisiilty) {
                    await this.actions.waitForDisplayed(continueSeatsPopUp, 'continueSeatsPopUp', 10000)
                    // await this.actions.scroll(continueSeatsPopUp)
                    await this.actions.clickElement('click', continueSeatsPopUp, 'continueSeatsPopUp')
                }
                if (hazardMaterialIsDisplayed) {
                    await this.actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                    await this.actions.scroll(hazardcheckbox)
                    await this.actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                    await this.actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                    await this.actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
                }
            }
            await this.actions.waitForDisplayed(paymentPageHeading, 'paymentPageHeading', 10000)
            let paymentPageHeadingIsDisplayed = await this.actions.isDisplayed(paymentPageHeading, 'paymentPageHeading')
            if (page === "Bags" && (paymentPageHeadingIsDisplayed) === false) {
                try {
                    await this.actions.isDisplayed(seatPageTitle, 'seatPageTitle')
                } catch (ex) {

                }
            }
            let bagsPageTitleIsDisplayed = await this.actions.isDisplayed(bagsPageTitle, 'bagsPageTitle')
            if (page === "Seats" && (bagsPageTitleIsDisplayed) === false) {
                try {
                    // await this.actions.scroll(seatcontinuebtn)
                    await this.actions.waitForDisplayed(seatcontinuebtn, 'seatcontinuebtn', 10000)
                    await this.actions.waitForClickable(seatcontinuebtn, 'seatcontinuebtn')
                    await this.actions.clickElement('click', seatcontinuebtn, 'seatcontinuebtn')
                    await this.actions.waitForDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage', 10000)
                    let popUpVisibiltyseats = await this.actions.isDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                    if (popUpVisibiltyseats) {
                        let continuePopUpSeatsPageVisibility = await this.actions.isDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        if (!continuePopUpSeatsPageVisibility) {
                            await this.actions.scroll(continuePopUpSeatsPage)
                        }
                        await this.actions.waitForEnabled(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        await this.actions.waitForClickable(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        await this.actions.clickElement('click', continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                    }
                    if (await this.actions.isDisplayed(SeatPageReturnSegTab, 'SeatPageReturnSegTab')) {
                        await this.actions.waitForDisplayed(seatcontinuebtn.replace("X", 2), 'seatcontinuebtn')
                        await this.actions.clickElement('click', seatcontinuebtn.replace("X", 2), 'seatcontinuebtn')
                        await this.actions.waitForDisplayed(seatcontinuebtn, 'seatcontinuebtn', 10000)
                        await this.actions.clickElement('click', seatcontinuebtn, 'seatcontinuebtn')
                        await this.ContinuePopupOnSeatsPage()
                    }
                } catch (ex) {
                }
                try {
                    await this.actions.isDisplayed(hotelPageTitle, 'hotelPageTitle')
                }
                catch (ex) { }
            }
            if (page === "Hotels" && (paymentPageHeadingIsDisplayed) === false) {
                try {
                    await this.actions.isDisplayed(carPageTitle, 'carPageTitle')
                }
                catch (ex) {
                }
            }
        }
    }

    async clickChangeDate() {
        await this.actions.waitUntilPageLoad()
        await this.actions.pause(20000)
        await this.actions.waitForDisplayed(itineraryDetails, 'itineray details page')
        await this.actions.waitForDisplayed(changeFlight, 'changeFlight', 30000)
        await this.actions.waitForClickable(changeFlight, 'changeFlight')
        await this.actions.clickElement('click', changeFlight, 'changeFlight')
        await this.actions.waitForDisplayed(flightH1, 'flightH1', 30000)
        await this.actions.pause(20000)
    }

    async validateProductDetails(product, paxNum) {
        await this.actions.pause(5000)
        try {
            await this.actions.pause(20000)
            await this.actions.waitUntilPageLoad()
            await this.actions.isDisplayed(itineraryDetailsPage, "itineraryDetailsPage")
        } catch (error) {
            // await this.actions.waitFor(printBoxThankyou, 20000)
            await this.actions.waitForDisplayed(printBoxThankyou, 'printBoxThankyou')
        }
        await this.actions.pause(10000)
        await this.actions.waitForDisplayed(flightinformation, 'flight information')
        if (product.includes("checked")) {
            assert.isTrue(
                await this.actions.isDisplayed(manageTravelPageCheckedBagCount, 'manageTravelPageCheckedBagCount'),
                'Validation failed: Mismatch in manageTravelPage CheckedBag Count');
            await this.actions.pause(10000)
        }
    }

    async ContinueButtonBags(page) {
        await this.actions.pause(5000)
        let somethingReallyOddErrorIsDisplayed = await this.actions.isDisplayed(somethingReallyOddError, 'somethingReallyOddError')
        if (somethingReallyOddErrorIsDisplayed) {
            assert.fail(await this.actions.getText(somethingReallyOddError, 'somethingReallyOddError'))
        }
        await this.actions.pause(3000)
        let continueButtonIsDisplayed = await this.actions.isDisplayed(continueButton, 'continueButton')
        if (continueButtonIsDisplayed) {
            await this.actions.scroll(continueButton)
            await this.actions.waitForClickable(continueButton, 'continueButton')
            await this.actions.pause(5000)
            await this.actions.clickElement('click', continueButton, 'continueButton')
            await this.actions.pause(3000)
            let bagsPopUpVisiilty = await this.actions.isDisplayed(continueBagsPopUp, 'continueBagsPopUp')
            if (bagsPopUpVisiilty) {
                await this.actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp')
                await this.actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            await this.actions.pause(4000)
            let hazardMaterialIsDisplayed = await this.actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await this.actions.pause(5000)
                await this.actions.scroll(hazardcheckbox)
                await this.actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                await this.actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await this.actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                await this.actions.waitForClickable(hazardContinueButton, 'hazardContinueButton')
                await this.actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            }
        }
    }

    async negativePayment() {
        await this.actions.pause(10000);
        console.log("Current Page Url is " + await this.actions.getUrl());
        do {
            await this.actions.pause(5000);
        } while ((!(await this.actions.isDisplayed(paymentPageTitle, 'paymentPageTitle')) || (await this.actions.isDisplayed(spinnerBar, 'spinnerBar'))) && !(await this.actions.getTitle()) === "Home");
        try {
            await this.actions.pause(5000);
            await this.actions.waitForClickable(icePopupClose, 'icePopupClose')
            await this.actions.click(icePopupClose, 'icePopupClose');
        } catch (ex) {
            console.log("Popup is not displayed: " + ex)
        }
        await this.actions.pause(10000)
        await this.actions.waitForDisplayed(balanceCart, 'balance cart')
        console.log("balanceCart" + await this.actions.getText(balanceCart, 'balance cart'))
        if ((await this.actions.getText(balanceCart, 'balance cart')).includes('-') || (await this.actions.getText(balanceCart, 'balanceCart')).includes('$0.00')) {
            await this.actions.pause(8000)
            console.log("PAYMENT PAGE")
            if (await this.actions.isDisplayed(termsbox, 'termsbox')) {
                await this.actions.pause(5000)
                await this.actions.click(termsbox, 'termsbox')
            }
            await this.actions.pause(3000)
            await this.actions.click(negativeContinue, 'negativeContinue')
            await this.actions.pause(2000);
            return true
        } else {
            return false
        }
    }
}
export default Managetravel