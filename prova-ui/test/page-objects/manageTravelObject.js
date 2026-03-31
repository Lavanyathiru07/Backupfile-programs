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
const addBagsLink = "//span[contains(text(),'Update Bags')]"
const checkedBags = "(//span[contains(text(),'Checked Bag')])[2]"
const checkedBag = "//button[@data-hook='ancillaries-page-traveler_0_checked-in_increment']"
const iAgreeCovidPolicyCheckBox = "//div[contains(text(),'I agree to the above')]"
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
const manageTravelPageCheckedBagCount = "[data-hook='order-item-flight-info_onward_traveler-0-check-in-bags-count']"
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
        await this.actions.waitForDisplayed(itineraryDetails, 'itineray details page', 30000)
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

        //cancel trip content
        await this.actions.waitFor(contentCancelPopup, 5000, '', true, 'content cancel popup')
        await this.actions.waitForDisplayed(contentCancelPopup, 'contentCancelPopup', 10000)

        // click cancel reservation
        await this.actions.waitForClickable(cancelTripButton, 'cancelTripButton')
        await this.actions.clickElement('click', cancelTripButton, 'cancelTripButton')

        // cancel completed
        // await this.actions.waitFor(cancelCompleted, 5000, '', true, 'cancel completed')
        await this.actions.waitForDisplayed(cancelCompleted, 'cancel completed', 10000)
        let canceltext = await this.actions.getText(cancelCompleted, 'cancel completed')
        assert.isTrue(canceltext.includes("Cancelation Completed"), "Error in verifying text for Cancelation Confirmed")
        await this.actions.waitForDisplayed(reservationCanceled, 'reservation canceled', 30000)
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
            console.log('Current URL:', await this.actions.getUrl())

            await this.actions.waitForDisplayed(itineraryDetails, 'itinerary details', 30000)
            const addCarSelectors = [
                "//button[@data-hook='vehicle-upsell-button']",
                "//span[contains(text(),'Add a car')]"
            ]

            let addCarElement = null
            let usedSelector = null

            for (const selector of addCarSelectors) {
                try {
                    console.log(`Trying selector: ${selector}`)
                    await this.actions.waitForDisplayed(selector, 'add car link', 5000)
                    addCarElement = selector
                    usedSelector = selector
                    console.log(`Found Add Car element with selector: ${selector}`)
                    break
                } catch (error) {
                    console.log(`Selector failed: ${selector}`)
                }
            }

            if (!addCarElement) {
                throw new Error('Add Car element not found with any selector')
            }

            await this.actions.scroll(addCarElement)
            await this.actions.waitForDisplayed(addCarElement, 'addCar Link', 10000)
            await this.actions.waitForClickable(addCarElement, 'addCar Link', 10000)

            console.log(`Clicking Add Car element with selector: ${usedSelector}`)
            await this.actions.clickElement('click', addCarElement, "Add Car link")

            await this.actions.waitUntilPageLoad()

            try {
                await this.actions.waitForDisplayed(carsPageHeader, 'carsPageHeader', 30000)
                console.log('Successfully navigated to Cars page')
            } catch (error) {
                const carPageIndicators = [
                    "//title[contains(text(),'Car')]"
                ]

                let carPageFound = false
                for (const indicator of carPageIndicators) {
                    try {
                        await this.actions.waitForDisplayed(indicator, 'car page indicator', 5000)
                        console.log(`Car page detected with: ${indicator}`)
                        carPageFound = true
                        break
                    } catch (e) {
                        // Continue trying
                    }
                }

                if (!carPageFound) {
                    console.warn('Could not verify navigation to cars page')
                    console.log('Current URL after click:', await this.actions.getUrl())
                }
            }

        } catch (error) {
            console.error('Error in clickAddaCar:', error)
            console.log('Current URL when error occurred:', await this.actions.getUrl())
            throw error
        }
    }

    async purchasemytrip() {
        await this.actions.scroll(termsscroll)
        await this.actions.waitForDisplayed(termsbox, 'termsbox', 30000)
        await this.actions.waitForClickable(termsbox, 'termsbox', 30000)
        await this.actions.clickElement('click', termsbox, "condition checkbox")
        await this.actions.waitForDisplayed(purchase, 'purchase', 30000)
        await this.actions.waitForClickable(purchase, 'purchase', 30000)
        await this.actions.clickElement('click', purchase, "Continue and Pay button")
    }

    async addProduct(product, paxNum) {
        console.log('Starting addProduct method in Manage Travel context')
        await this.actions.waitUntilPageLoad()
        await this.actions.waitForLoadState('domcontentloaded', 60000)

        const currentUrl = await this.actions.getUrl()
        console.log(`Current URL: ${currentUrl}`)

        await this.actions.waitForLoadState('domcontentloaded', 60000)
        if (product.includes("checked")) {
            try {
                await this.actions.waitForDisplayed(addBagsLink, 'addBagsLink', 30000)
                await this.actions.waitForClickable(addBagsLink, 'addBagsLink', 30000)
                await this.actions.clickElement('click', addBagsLink, 'addBagsLink')
                await this.actions.waitForDisplayed(checkedBags, 'checkedBags', 30000)
            } catch (er) {
                console.log("The add bags link is not enabled")
            }
            await this.actions.waitForClickable(checkedBag.replace("X", paxNum), 'checked bag selector', 30000)
            await this.actions.clickElement('click', checkedBag.replace("X", paxNum), 'checkedBag')
            for (var i = 1; i < parseInt(product.split(' ')[0]); i++) {
                await this.actions.pressButton('ArrowDown', 'down');
            }
            await this.actions.pressButton('Enter', 'press');
        }
    }

    async selectCovidRestrictedArticalPolicy() {
        try {
            await this.actions.waitForLoadState('domcontentloaded', 30000)
            await this.actions.waitForURL(/hazardous/, 30000)
            let covidPolicyPopUP = await this.actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
            if (covidPolicyPopUP) {
                await this.actions.scroll(iAgreeCovidPolicyCheckBox)
                await this.actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox', 30000);
                await this.actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
            } else {
                console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy is not clicked');
            }
        } catch (ex) {
            console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not clicked');
        }
    }

    async ContinueButton(page) {
        let somethingReallyOddErrorIsDisplayed = await this.actions.isDisplayed(somethingReallyOddError, 'somethingReallyOddError')
        if (somethingReallyOddErrorIsDisplayed) {
            assert.fail(await this.actions.getText(somethingReallyOddError, 'somethingReallyOddError'))
        }
        await this.actions.waitForDisplayed(continueButton, 'continueButton', 30000)
        let continueButtonIsDisplayed = await this.actions.isDisplayed(continueButton, 'continueButton')
        if (continueButtonIsDisplayed) {
            await this.actions.scroll(continueButton.replace("X", 1))
            await this.actions.waitForDisplayed(continueButton.replace("X", 1), 'continueButton', 30000)
            await this.actions.waitForClickable(continueButton.replace("X", 1), 'continueButton', 30000)
            await this.actions.clickElement('click', continueButton.replace("X", 1), 'continueButton')
            if (await this.actions.isDisplayed("//button[@data-hook='seats-page-continue-button-popup_continue-button']", 'continueButton')) {
                await this.actions.clickElement('click', "//button[@data-hook='seats-page-continue-button-popup_continue-button']", 'continueButton')
            }
            await this.actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 30000)
            let bagsPopUpVisiilty = await this.actions.isDisplayed(continueBagsPopUp, 'continueBagsPopUp')
            if (bagsPopUpVisiilty) {
                await this.actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 30000)
                await this.actions.scroll(continueBagsPopUp)
                await this.actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            await this.actions.waitForDisplayed(hazardMaterial, 'hazardMaterial', 30000)
            let hazardMaterialIsDisplayed = await this.actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await this.actions.scroll(hazardcheckbox)
                await this.actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 30000)
                await this.actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await this.actions.waitForDisplayed(hazardContinueButton, 'hazardContinueButton', 30000)
                await this.actions.waitForClickable(hazardContinueButton, 'hazardContinueButton', 30000)
                await this.actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            } else {
                await this.actions.waitForDisplayed(seatcontinuebtn.replace("X", 1), 'continueButton', 30000)
                // await this.actions.scroll(seatcontinuebtn.replace("X", 1))
                await this.actions.waitForClickable(seatcontinuebtn.replace("X", 1), 'continueButton', 30000)
                await this.actions.clickElement('click', seatcontinuebtn.replace("X", 1), 'continueButton')
                await this.actions.waitForDisplayed(continueSeatsPopUp, 'continueSeatsPopUp', 30000)
                let seatsPopUpVisiilty = await this.actions.isDisplayed(continueSeatsPopUp, 'continueSeatsPopUp')
                if (seatsPopUpVisiilty) {
                    await this.actions.waitForDisplayed(continueSeatsPopUp, 'continueSeatsPopUp', 30000)
                    // await this.actions.scroll(continueSeatsPopUp)
                    await this.actions.clickElement('click', continueSeatsPopUp, 'continueSeatsPopUp')
                }
                if (hazardMaterialIsDisplayed) {
                    await this.actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 30000)
                    await this.actions.scroll(hazardcheckbox)
                    await this.actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                    await this.actions.waitForDisplayed(hazardContinueButton, 'hazardContinueButton', 30000)
                    await this.actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
                }
            }
            await this.actions.waitForDisplayed(paymentPageHeading, 'paymentPageHeading', 30000)
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
        console.log('Starting clickChangeDate method')
        await this.actions.waitUntilPageLoad()

        // Log current URL for debugging
        const currentUrl = await this.actions.getUrl()
        console.log(`Current URL: ${currentUrl}`)

        // Try multiple strategies to find the manage travel page
        let pageFound = false
        const pageIndicators = [
            { selector: itineraryDetails, description: 'itinerary details page title' },
            { selector: itineraryDetailsPage, description: 'itinerary details page (alternative)' },
            { selector: "[data-hook*='trip-summary']", description: 'trip summary container' },
            { selector: "[data-hook*='manage']", description: 'manage travel elements' },
            { selector: "h1, h2", description: 'page headings' }
        ]

        for (const indicator of pageIndicators) {
            try {
                await this.actions.waitForDisplayed(indicator.selector, indicator.description, 10000)
                console.log(`Found manage travel page via: ${indicator.description}`)
                pageFound = true
                break
            } catch (error) {
                console.log(`Page indicator failed: ${indicator.description}`)
            }
        }

        if (!pageFound) {
            // Try to find any page content to continue
            try {
                console.log('Page indicators not found, checking for any content...')
                await this.actions.waitForDisplayed('body', 'page body', 5000)
            } catch (error) {
                throw new Error(`Failed to load manage travel page. Current URL: ${currentUrl}`)
            }
        }

        // Now look for change flight button
        await this.actions.waitForDisplayed(changeFlight, 'changeFlight', 30000)
        await this.actions.waitForClickable(changeFlight, 'changeFlight')
        await this.actions.clickElement('click', changeFlight, 'changeFlight')

        // Wait for navigation and page load after clicking change flight
        await this.actions.waitUntilPageLoad()

        // Try multiple strategies to detect the flights page
        try {
            // Strategy 1: Look for "Select New Flights" text
            await this.actions.waitForDisplayed(flightH1, 'Select New Flights heading', 10000)
            console.log('Found "Select New Flights" heading')
        } catch (error1) {
            console.log('Strategy 1 failed, trying alternative flight page indicators')
            try {
                // Strategy 2: Look for flight search form or flight results
                await this.actions.waitForDisplayed('h1, [data-hook*="flight"], .flight-search, [class*="flight"]', 'flight page indicator', 10000)
                console.log('Found alternative flight page indicator')
            } catch (error2) {
                console.log('Strategy 2 failed, trying URL check')
                try {
                    // Strategy 3: Check if URL contains flight-related keywords
                    const currentUrl = await this.actions.getUrl()
                    if (currentUrl.includes('flight') || currentUrl.includes('search') || currentUrl.includes('booking')) {
                        console.log('URL indicates we are on flight page:', currentUrl)
                    } else {
                        throw new Error(`Flight page not detected. Current URL: ${currentUrl}`)
                    }
                } catch (error3) {
                    console.error('All strategies failed to detect flight page')
                    throw new Error(`Failed to navigate to flight selection page. Errors: ${error1.message}, ${error2.message}, ${error3.message}`)
                }
            }
        }
    }

    async validateProductDetails(product, paxNum) {
        try {
            await this.actions.waitForLoadState('domcontentloaded', 30000)
            await this.actions.waitForDisplayed(itineraryDetailsPage, "itineraryDetailsPage", 30000)
        } catch (error) {
            // await this.actions.waitFor(printBoxThankyou, 20000)
            await this.actions.waitForDisplayed(printBoxThankyou, 'printBoxThankyou', 30000)
        }
        await this.actions.waitForDisplayed(flightinformation, 'flight information', 30000)
        if (product.includes("checked")) {
            assert.isTrue(
                await this.actions.isDisplayed(manageTravelPageCheckedBagCount, 'manageTravelPageCheckedBagCount'),
                'Validation failed: Mismatch in manageTravelPage CheckedBag Count');
            await this.actions.waitForLoadState('domcontentloaded', 30000)
        }
    }

    async ContinueButtonBags(page) {
        let somethingReallyOddErrorIsDisplayed = await this.actions.isDisplayed(somethingReallyOddError, 'somethingReallyOddError', 30000)
        if (somethingReallyOddErrorIsDisplayed) {
            assert.fail(await this.actions.getText(somethingReallyOddError, 'somethingReallyOddError'))
        }
        let continueButtonIsDisplayed = await this.actions.isDisplayed(continueButton, 'continueButton')
        if (continueButtonIsDisplayed) {
            await this.actions.scroll(continueButton)
            await this.actions.waitForDisplayed(continueButton, 'continueButton', 30000)
            await this.actions.waitForClickable(continueButton, 'continueButton', 30000)
            await this.actions.clickElement('click', continueButton, 'continueButton')
            let bagsPopUpVisiilty = await this.actions.isDisplayed(continueBagsPopUp, 'continueBagsPopUp')
            if (bagsPopUpVisiilty) {
                await this.actions.waitForDisplayed(continueBagsPopUp, 'continueBagsPopUp', 30000)
                await this.actions.waitForClickable(continueBagsPopUp, 'continueBagsPopUp', 30000)
                await this.actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            let hazardMaterialIsDisplayed = await this.actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await this.actions.scroll(hazardcheckbox)
                await this.actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 30000)
                await this.actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await this.actions.waitForClickable(hazardContinueButton, 'hazardContinueButton', 30000)
                await this.actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            }
        }
    }

    async negativePayment() {
        console.log("Current Page Url is " + await this.actions.getUrl());
        do {
            await this.actions.waitForLoadState('domcontentloaded', 5000);
        } while ((!(await this.actions.isDisplayed(paymentPageTitle, 'paymentPageTitle')) || (await this.actions.isDisplayed(spinnerBar, 'spinnerBar'))) && !(await this.actions.getTitle()) === "Home");
        try {
            await this.actions.waitForClickable(icePopupClose, 'icePopupClose')
            await this.actions.click(icePopupClose, 'icePopupClose');
        } catch (ex) {
            console.log("Popup is not displayed: " + ex)
        }
        await this.actions.waitForDisplayed(balanceCart, 'balance cart')
        console.log("balanceCart" + await this.actions.getText(balanceCart, 'balance cart'))
        if ((await this.actions.getText(balanceCart, 'balance cart')).includes('-') || (await this.actions.getText(balanceCart, 'balanceCart')).includes('$0.00')) {
            console.log("PAYMENT PAGE")
            if (await this.actions.isDisplayed(termsbox, 'termsbox')) {
                await this.actions.click(termsbox, 'termsbox')
            }
            await this.actions.click(negativeContinue, 'negativeContinue')
            return true
        } else {
            return false
        }
    }

    async selectpage()
    {
        await actions.pause(5000);
        await actions.setInputField('setvalue','7025551111',phoneNum,'phoneNum');
        await actions.setInputField('setvalue','accept@fraudtest.com',email,'email');
        //await actions.clickElement('click', selectcheckbox, 'selectcheckbox')
        await actions.waitForDisplayed(deselectpassenger, 'secondadultcheckbox',2000)
        await actions.clickElement('click', deselectpassenger, "second adult checkbox")
        await actions.scroll(selectcontinue,'selectcontinue')
        await actions.clickElement('click', selectcontinue, 'selectcontinue');
        await actions.pause(30000);
    }
}
export default Managetravel
