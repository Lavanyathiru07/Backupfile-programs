import { page as browser } from "../../src/hooks-playwright/playwright-hooks"
import actions from "../../src/support/actions"
import check from "../../src/support/validations"
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

class Managetravel {

    async cancelMyTrip() {
        await actions.waitUntilPageLoad()
        await actions.pause(30000)
        await actions.waitForDisplayed(itineraryDetails, 'itineray details page')
        await actions.waitForDisplayed(cancelButton, 'cancel button', 10000)
        await actions.waitForClickable(cancelButton, 'cancel button')
        await actions.clickElement('click', cancelButton, 'cancel button')

        // cancel trip popup
        await actions.waitForDisplayed(cancelTripPopup, 'cancelTripPopup', 10000)
        await check.isDisplayed(cancelTripPopup, 'cancelTripPopup')
        let selectSegmentTextIsDisplayed = await actions.isDisplayed(selectSegmentText, 'selectSegmentText')
        if (selectSegmentTextIsDisplayed) {
            await check.isDisplayed(cancelEntireTripText, 'cancelEntireTripText')
            await actions.waitForClickable(cancelEntireTripRadioButton, 'cancelEntireTrip RadioButton')
            await actions.clickElement('click', cancelEntireTripRadioButton, 'cancelEntireTrip RadioButton')
            await actions.waitForClickable(nextButton, 'next button')
            await actions.clickElement('click', nextButton, 'next button')
        }

        // cancel trip content
        await actions.waitFor(contentCancelPopup, 5000, '', true, 'content cancel popup')
        await actions.waitForDisplayed(contentCancelPopup, 'contentCancelPopup', 10000)

        // click cancel reservation
        await actions.waitForClickable(cancelTripButton, 'cancelTripButton')
        await actions.clickElement('click', cancelTripButton, 'cancelTripButton')

        // cancel completed
        await actions.waitFor(cancelCompleted, 5000, '', true, 'cancel completed')
        await actions.waitForDisplayed(cancelCompleted, 'cancel completed', 10000)
        let canceltext = await actions.getText(cancelCompleted, 'cancel completed')
        assert.isTrue(canceltext.includes("Cancelation Completed"), "Error in verifying text for Cancelation Confirmed")
        await actions.waitForDisplayed(reservationCanceled, 'reservation canceled', 10000)
        assert.isTrue((await actions.getText(reservationCanceled, 'reservationCanceled')).includes("Your reservation has been canceled."), "FAILED!! Invalid Message for reservation cancelation")

        // close cancel popup
        await actions.waitFor(cancelPopUpCloseIcon, 5000, '', true, 'cancel completed')
        await actions.waitForDisplayed(cancelPopUpCloseIcon, 'cancelPopUpCloseIcon', 10000)
        await actions.clickElement('click', cancelPopUpCloseIcon, 'cancelPopUpCloseIcon')
        let canceledRedBannerIsDisplayed = await actions.isDisplayed(canceledRedBanner, 'canceledRedBanner')
        if (canceledRedBannerIsDisplayed) {
            await actions.waitForDisplayed(canceledRedBanner, 'canceled redbanner')
            assert.isTrue((await actions.getText(canceledRedBanner, 'canceledRedBanner')).includes("Canceled Trip"), "Assertion FAILED for Canceled Red Banner")
        }
    }

    async clickAddaCar() {
        try {
            await actions.waitUntilPageLoad()
            await actions.pause(30000)
            console.log(await browser.url())
            await actions.waitForDisplayed(itineraryDetails, 'itinerary details')
            // await actions.waitForDisplayed(addCar, 'addCar link', 30000)
            await actions.scroll(addCar)
            // await actions.waitForClickable(addCar, 'addCar Link')
            await actions.clickElement('click', addCar, "Add Car link")
            await actions.waitUntilPageLoad()
            await actions.waitForDisplayed(carsPageHeader, 'carsPageHeader', 30000)
        } catch (error) {
            console.log(error)
        }
    }

    async purchasemytrip() {
        await actions.scroll(termsscroll)
        await actions.clickElement('click', termsbox, "condition checkbox")
        await actions.clickElement('click', purchase, "Continue and Pay button")
    }

    async addProduct(product, paxNum) {
        await actions.pause(10000)
        if (product.includes("checked")) {
            try {
                await actions.waitForClickable(addBagsLink, 'addBagsLink', 10000)
                await actions.clickElement('click', addBagsLink, 'addBagsLink')
                await actions.waitForDisplayed(checkedBags, 'checkedBags', 5000)
            } catch (er) {
                console.log("The add bags link is not enabled")
            }
            await browser.pause(5000)
            await actions.clickElement('click', checkedBag.replace("X", paxNum), 'checkedBag')
            for (var i = 0; i < parseInt(product.split(' ')[0]); i++) {
                await actions.pause(3000);
                await actions.pressButton('ArrowDown', 'down');
            }
            await actions.pressButton('Enter', 'press');
        }
    }

    async selectCovidRestrictedArticalPolicy() {
        try {
            let covidPolicyPopUP = await actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
            if (covidPolicyPopUP) {
                await actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox');
                await actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
                await actions.pause(3000)
            } else {
                console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
            }
        } catch (ex) {
            console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
        }
    }

    async ContinueButton(page) {
        let somethingReallyOddErrorIsDisplayed = await actions.isDisplayed(somethingReallyOddError, 'somethingReallyOddError')
        if (somethingReallyOddErrorIsDisplayed) {
            assert.fail(await actions.getText(somethingReallyOddError, 'somethingReallyOddError'))
        }
        await actions.waitForDisplayed(continueButton, 'continueButton', 20000)
        let continueButtonIsDisplayed = await actions.isDisplayed(continueButton, 'continueButton')
        if (continueButtonIsDisplayed) {
            await actions.scroll(continueButton.replace("X", 1))
            await actions.waitForClickable(continueButton.replace("X", 1), 'continueButton')
            await actions.clickElement('click', continueButton.replace("X", 1), 'continueButton')
            await actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 20000)
            let bagsPopUpVisiilty = await actions.isDisplayed(continueBagsPopUp, 'continueBagsPopUp')
            if (bagsPopUpVisiilty) {
                await actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 20000)
                await actions.scroll(continueBagsPopUp)
                await actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            await actions.waitForDisplayed(hazardMaterial, 'hazardMaterial', 10000)
            let hazardMaterialIsDisplayed = await actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await actions.scroll(hazardcheckbox)
                await actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                await actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                await actions.waitForClickable(hazardContinueButton, 'hazardContinueButton')
                await actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            } else {
                await actions.waitForDisplayed(seatcontinuebtn.replace("X", 1), 'continueButton', 20000)
                await actions.scroll(seatcontinuebtn.replace("X", 1))
                await actions.waitForClickable(seatcontinuebtn.replace("X", 1), 'continueButton')
                await actions.clickElement('click', seatcontinuebtn.replace("X", 1), 'continueButton')
                await actions.waitForDisplayed(continueSeatsPopUp, 'continueSeatsPopUp', 20000)
                let seatsPopUpVisiilty = await actions.isDisplayed(continueSeatsPopUp, 'continueSeatsPopUp')
                if (seatsPopUpVisiilty) {
                    await actions.waitForDisplayed(continueSeatsPopUp, 'continueSeatsPopUp', 10000)
                    await actions.scroll(continueSeatsPopUp)
                    await actions.clickElement('click', continueSeatsPopUp, 'continueSeatsPopUp')
                }
                if (hazardMaterialIsDisplayed) {
                    await actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                    await actions.scroll(hazardcheckbox)
                    await actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                    await actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                    await actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
                }
            }
            await actions.waitForDisplayed(paymentPageHeading, 'paymentPageHeading', 10000)
            let paymentPageHeadingIsDisplayed = await actions.isDisplayed(paymentPageHeading, 'paymentPageHeading')
            if (page === "Bags" && (paymentPageHeadingIsDisplayed) === false) {
                try {
                    await actions.isDisplayed(seatPageTitle, 'seatPageTitle')
                } catch (ex) {

                }
            }
            let bagsPageTitleIsDisplayed = await actions.isDisplayed(bagsPageTitle, 'bagsPageTitle')
            if (page === "Seats" && (bagsPageTitleIsDisplayed) === false) {
                try {
                    await actions.scroll(seatcontinuebtn)
                    await actions.waitForDisplayed(seatcontinuebtn, 'seatcontinuebtn', 10000)
                    await actions.waitForClickable(seatcontinuebtn, 'seatcontinuebtn')
                    await actions.clickElement('click', seatcontinuebtn, 'seatcontinuebtn')
                    await actions.waitForDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage', 10000)
                    let popUpVisibiltyseats = await actions.isDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                    if (popUpVisibiltyseats) {
                        let continuePopUpSeatsPageVisibility = await actions.isDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        if (!continuePopUpSeatsPageVisibility) {
                            await actions.scroll(continuePopUpSeatsPage)
                        }
                        await actions.waitForEnabled(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        await actions.waitForClickable(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        await actions.clickElement('click', continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                    }
                    if (await actions.isDisplayed(SeatPageReturnSegTab, 'SeatPageReturnSegTab')) {
                        await actions.waitForDisplayed(seatcontinuebtn.replace("X", 2), 'seatcontinuebtn')
                        await actions.clickElement('click', seatcontinuebtn.replace("X", 2), 'seatcontinuebtn')
                        await actions.waitForDisplayed(seatcontinuebtn, 'seatcontinuebtn', 10000)
                        await actions.clickElement('click', seatcontinuebtn, 'seatcontinuebtn')
                        await this.ContinuePopupOnSeatsPage()
                    }
                } catch (ex) {
                }
                try {
                    await actions.isDisplayed(hotelPageTitle, 'hotelPageTitle')
                }
                catch (ex) { }
            }
            if (page === "Hotels" && (paymentPageHeadingIsDisplayed) === false) {
                try {
                    await actions.isDisplayed(carPageTitle, 'carPageTitle')
                }
                catch (ex) {
                }
            }
        }
    }

    async clickChangeDate() {
        await actions.pause(15000)
        await actions.waitForDisplayed(changeFlight, 'changeFlight', 30000)
        await actions.waitForClickable(changeFlight, 'changeFlight')
        await actions.clickElement('click', changeFlight, 'changeFlight')
        await actions.waitForDisplayed(flightH1, 'flightH1', 30000)
    }

    async validateProductDetails(product, paxNum) {
        await actions.pause(5000)
        try {
            await actions.isDisplayed(itineraryDetailsPage, "itineraryDetailsPage")
        } catch (error) {
            await actions.waitFor(printBoxThankyou, 20000)
            await actions.waitForDisplayed(printBoxThankyou, 'printBoxThankyou')
        }
        await actions.scroll(flightinformation)
        if (product.includes("checked")) {
            assert.isTrue(
                await actions.isDisplayed(manageTravelPageCheckedBagCount, 'manageTravelPageCheckedBagCount'),
                'Validation failed: Mismatch in manageTravelPage CheckedBag Count');
            await actions.pause(10000)
        }
    }

    async ContinueButtonBags(page) {
        await actions.pause(5000)
        let somethingReallyOddErrorIsDisplayed = await actions.isDisplayed(somethingReallyOddError, 'somethingReallyOddError')
        if (somethingReallyOddErrorIsDisplayed) {
            assert.fail(await actions.getText(somethingReallyOddError, 'somethingReallyOddError'))
        }
        await actions.pause(3000)
        let continueButtonIsDisplayed = await actions.isDisplayed(continueButton, 'continueButton')
        if (continueButtonIsDisplayed) {
            await actions.scroll(continueButton)
            await actions.waitForClickable(continueButton, 'continueButton')
            await actions.pause(5000)
            await actions.clickElement('click', continueButton, 'continueButton')
            await actions.pause(3000)
            let bagsPopUpVisiilty = await actions.isDisplayed(continueBagsPopUp, 'continueBagsPopUp')
            if (bagsPopUpVisiilty) {
                await actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp')
                await actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            await actions.pause(4000)
            let hazardMaterialIsDisplayed = await actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await actions.pause(5000)
                await actions.scroll(hazardcheckbox)
                await actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                await actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                await actions.waitForClickable(hazardContinueButton, 'hazardContinueButton')
                await actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            }
        }
    }
}
export default new Managetravel()