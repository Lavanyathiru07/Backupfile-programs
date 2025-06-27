import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'
import { flightPageCollector } from './flightsPageObject'
import { assert } from 'chai';
import GetCardNumbers from './cardNumbers'

const flightNumber = "(//td[@data-th='Flight #']//span)[X]"
const returnSeg = "//div[contains(@class,'flight-details flight-details-returning')]"
const departTime = "(//td[@data-th='Departs']//time)[X]"
const arrivesTime = "(//td[@data-th='Arrives']//time)[X]"
const departAirport = "(//td[@data-th='Departure Airport']//span[@class='bt-content'])[X]"
const arrivesAirport = "(//td[@data-th='Arrival Airport']//span[@class='bt-content'])[X]"
const scrollOneway = "//*[text()='One Way']"
const onelineCheckin = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"
const seats = "//*[@class='trip-box trip-customize']/ul/li[1]"
const bags = "//*[@class='trip-box trip-customize']/ul/li[2]"
const manageTravelSeats = "//a[contains(@aria-label,'seat')]"
const hazardMaterial = "//*[text()='Are you carrying Hazardous Materials?']"
const printBoxThankyou = "//span[contains(text(),'Thank you')]"
const yesNoSeatsContinue = "(//button[@data-hook='seats-page-continue-button-popup_continue-button'])[2]"
const greatChoicePopup = "//button[@class='close_popup']"
const scrolldisable = "//h2[text()='Traveling with a disability?']"
const continueseats = "[class='continue']"
const hazardcheckbox = "[class='Box-s8oj9r-0 cjJOaR']"
const hazardContinueButton = "//*[text()='CONTINUE']"
const hazardscroll = "[class='other']"
const seatcontinue = "//button[@class='continue']"
const scrolltravellers = "[class='name columns text-left']"
const continueBagsPopUp = "[data-hook='ancillaries-continue-popup_button_continue']"
const continueSeatsPopUp = "[data-hook='seats-page-continue-button-popup_continue-button']"
const checkedbags = "//select[contains(@id,'checked_bags')]"
const flightinformation = "(//span[@class='Text-sc-1o5ubbx-0 PageSection__CapitalizedText-sc-1q7kcky-0 dKvhrs'])[1] | //span[normalize-space()='Flight information']"
const checkedinbagone = "//select[contains(@id,'checked_bags')]/option[3]"
const scrollhighlight = "[class='agree highlight-message']"
const continuebags = "[class='continue']"
const continueseatspopup = "[class='yes_no_seats continue']"
const scrollexplaination = "[class='explaination']"
const continuehotel = "[class='continue']"
const somethingReallyOddError = "//h2[text()='Something really odd just happened...']"
const SeatPageReturnSegTab = "//div[@class='flight-details']//span[text()='RETURNING']"
const manageTravelPageCheckedBagCount = "[data-hook='order-item-flight-info_onward_traveler-0-check-in-bags-count']"
const seatPageTitle = "//h1[contains(text(),'Please Confirm Your Seat Selection')]"
const hotelPageTitle = "//h1[contains(text(),'Bundle Air + Hotel and Save!')]"
const addCar = "//span[(text()='Add a car')]"
const carsPageHeader = "//*[text()='Car Selection']"
const carPageTitle = "//h1[contains(text(),'Getting Around')]"
const bagsPageTitle = "//h1[text()='Select Bag and Boarding Options']"
const paymentPageHeading = "//span[contains(text(),'Payment Information')]"
const scrollnote = "//*[text()='* Please note:']"
const continuecars = "[class='continue']"
const sscrolldetails = "[class='column medium-3'] h4"
const cardnumfield = "[name='payment_details[card_no]']"
const expirymonth = "[name='payment_details[expires_month]']"
const monthselection = "[value='12']"
const dynamicMonthSelection = "[value='X']"
const expiryyear = "[name='payment_details[expires_year]']"
const yearseelection = "[value='2030']"
const dynamicYearSelection = "[value='X']"
const cvv = "[name='payment_details[ccv]']"
const cardholder = "[name='payment_details[name_on_card]']"
const billingscroll = "[class='ccinfo inset billing-wrapper'] h4"
const fnamefield = "[name='payment_details[first_name]']"
const lnamefield = "[name='payment_details[last_name]']"
const add1 = "[name='payment_details[addr1]']"
const add2 = "[name='payment_details[addr2]']"
const add3 = "[name='payment_details[city]']"
const state = "[name='payment_details[state]']"
const caselc = "[value='NY']"
const zipcode = "[name='payment_details[postcode]']"
const mobilenum = "[name='payment_details[phone]']"
const mailfeild = "[data-hook='payment-page_email-address']"
const termsscroll = "[data-hook='payment-page_terms-and-cond-section_legend']"
const termsbox = "//label[@data-hook='payment_terms-and-conditions-checkbox_label']"
const purchase = "[data-hook='payment-page_continue']"
const addBagsLink = "//span[contains(text(),'Update Bags')]"
const showDetailsButton = "//div//button[contains(@class,'show_itinerary_details')]"
const previousPurchase = "//div[contains(@class,'allegiant_modify_pricing')][1]"
const checkedDropDown = "(//select[contains(@id,'checked_bags')])[X]"
const checkedBagTitle = "(//span[contains(text(),'Checked Bag')])[2]"
const checkedBags = "(//span[contains(text(),'Checked Bag')])[2]"
const checkedBag = "//button[@data-hook='ancillaries-page-traveler_0_checked-in_increment']"
const continueButton = "(//span[contains(text(),'Continue')])[2]"
const seatcontinuebtn = "//span[contains(text(),'Continue')]"
const continuePopUpSeatsPage = "[data-hook='seats-page-continue-button-popup_continue-button']"
const continueButtonSeat = "//span[contains(text(),'No thanks, skip seat selection.')]"
const cancelButton = "[data-hook='order-highlights-banner_cancel-button']"
const cancelTripPopup = "[data-hook='undefined_title']"
const selectSegmentText = "//*[contains(text(),'Please select the segment')]"
const cancelEntireTripText = "//fieldset[contains(@aria-labelledby,'choose-option-to-cancel_label')]/div/label[3]/span/span"
const cancelEntireTripRadioButton = "//fieldset[contains(@aria-labelledby,'choose-option-to-cancel_label')]/div/label[3]/div[2]"
const nextButton = "//span[contains(text(),'Next')]"
const cancelTripButton = "//div[@data-hook='undefined_content']/div[3]/div[2]/button[2]/span"
const contentCancelPopup = "//*[text()='Are you sure you want to cancel your trip?']"
const cancelCompleted = "//*[text()='Cancelation Completed']"
const reservationCanceled = "//*[contains(text(),'Your reservation has been canceled')]"
const cancelPopUpCloseIcon = "//button[@class='Popup__CloseIcon-jq1nfm-2 gqLMpE']"
const canceledRedBanner = "//*[@data-hook='lookup-page-error-message_error-heading']"
const itineraryDetailsPage = "[data-hook='trip-summary-page_title']"
const carryOnTitle = "[data-hook='ancillaries-page-carry-on_title']"

const changeFlight = "[data-hook='order-highlights-banner_flight-dates-change-button']"
const flightH1 = "//span[text()='Select New Flights']"

const checkinbagspagecontinue = "(//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm'])[3]"
const checkinbagspagecontinue2 = "//button[@data-hook='ancillaries-continue-popup_button_continue']"
const checkinharadeouspagecheckbox = "//div[@class='Box-s8oj9r-0 cjJOaR']"
const checkinharadeouspagecontinue = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"
const checkinseatpagecontinue = "//button[contains(@class, 'PageFooter__ContinueButton')]"
const checkinseatpagecontinuepopup = "//button[@data-hook='seats-page-continue-button-popup_continue-button']";

const cancelTripBox = "//span[text()='Cancel Trip']"
const cancelEntire = "//span[text()='Cancel Entire Trip']"
const errMsg = "//div[contains(@class,'CancelPopup')]/span"
const proceedMsg = "//span[text()='Are you sure you want to cancel your trip?']"
const cancelbutton = "//button//span[text()='Cancel Trip']"
const cancelComplete = "//span[text()='Cancelation Completed']"
const thanks = "//span[text()='Thank you']"
const confirmText = "//span[text()='Thank you']//following::span[1]"

const balanceCart = "//button[contains(@class,'PaymentCart__PaymentButton')]/span[2]"
const termsAndConditionCheckBox = "//span[@data-hook='payment_terms-and-conditions-checkbox_label']"
const negativeContinue = "//span[contains(text(),'Continue')]"

const firstName = "//*[@data-hook='lookup-page-input-first-name_firstName']"
const lastName = "//*[@data-hook='lookup-page-input-last-name_lastName']"
const confirmationNumber = "//*[@data-hook='lookup-page-input-confirmation-number_orderNumber']"
const clickFindMyTrip = "//*[@data-hook='lookup-page-lookup-button']"
const itineraryDetails = "//*[@data-hook='trip-summary-page_title']"
const seatscroll = "//div[text()='Seat']"
const seatautoassigned ="(//div[@class='ant-col ant-col-3 PassengerList__StyledCol-sc-1rkj5fy-4 hTXNTo'][3])"

class Managetravel {


    async validateFlightDetails() {
        try {
            // await $(flightNumber.replace("X", 1)).waitForDisplayed({ timeout: 25000 });
            // await $(flightNumber.replace("X", 1)).scrollIntoView()
            await actions.waitForDisplayed(flightNumber.replace("X", 1), flightNumber)
            await actions.scroll(flightNumber.replace("X", 1))
            assert.equal(
                // await $(flightNumber.replace("X", 1)).getText(),
                await actions.getText(flightNumber.replace("X", 1), flightNumber),
                await flightPageCollector.get('departFlightNum'),
                'Validation failed: Mismatch in depart Flight number Seg1'
            );
            console.info("Depart Flight number Seg1 validation passed- " + (await $(flightNumber.replace("X", 1)).getText()))
            assert.equal(
                (await $(departTime.replace("X", 1)).getText()).replace(/ /g, ''),
                await flightPageCollector.get('FlightDepartTimeSeg1'),
                'Validation failed: Mismatch in depart Flight DepartTimeSeg1'
            );
            console.info("Depart Flight departTime Seg1 validation passed- " + (await $(departTime.replace("X", 1)).getText()).replace(/ /g, ''))
            assert.equal(
                (await $(arrivesTime.replace("X", 1)).getText()).replace(/ /g, ''),
                await flightPageCollector.get('FlightArrivalTimeSeg1'),
                'Validation failed: Mismatch in depart Flight ArrivalTimeSeg1'
            );
            console.info("Depart Flight arrivesTime Seg1 validation passed- " + (await $(arrivesTime.replace("X", 1)).getText()).replace(/ /g, ''))
            assert.include(
                (await $(departAirport.replace("X", 1)).getText()).replace(/ /g, ''),
                await flightPageCollector.get('departureCity'),
                'Validation failed: Mismatch in depart Flight Airport Seg1'
            );
            console.info("Depart Flight departAirport Seg1 validation passed- " + (await $(departAirport.replace("X", 1)).getText()).replace(/ /g, ''))
            assert.include(
                (await $(arrivesAirport.replace("X", 1)).getText()).replace(/ /g, ''),
                await flightPageCollector.get('destinationCity'),
                'Validation failed: Mismatch in arrivesAirport Seg1'
            );
            console.info("arrivesAirport Seg1 validation passed- " + (await $(arrivesAirport.replace("X", 1)).getText()).replace(/ /g, ''))
            if (await actions.isDisplayed(returnSeg, 'returnSeg')) {
                assert.equal(
                    await $(flightNumber.replace("X", 2)).getText(),
                    await flightPageCollector.get('returnFlightNum'),
                    'Validation failed: Mismatch in return Flight number Seg2'
                );
                console.info("Return Flight number validation passed- " + (await $(flightNumber.replace("X", 2)).getText()))
                assert.equal(
                    (await $(departTime.replace("X", 2)).getText()).replace(/ /g, ''),
                    await flightPageCollector.get('FlightDepartTimeSeg2'),
                    'Validation failed: Mismatch in depart Flight DepartTimeSeg2'
                );
                console.info("Return Flight departTime validation passed- " + (await $(departTime.replace("X", 2)).getText()).replace(/ /g, ''))
                assert.equal(
                    (await $(arrivesTime.replace("X", 2)).getText()).replace(/ /g, ''),
                    await flightPageCollector.get('FlightArrivalTimeSeg2'),
                    'Validation failed: Mismatch in depart Flight ArrivalTimeSeg2'
                );
                console.info("Return Flight arrivesTime validation passed- " + (await $(arrivesTime.replace("X", 2)).getText()).replace(/ /g, ''))
                assert.include(
                    (await $(arrivesAirport.replace("X", 2)).getText()).replace(/ /g, ''),
                    await flightPageCollector.get('departureCity'),
                    'Validation failed: Mismatch in arrivesAirport Seg2'
                );
                console.info("Arrive Airport Seg2 validation passed- " + (await $(arrivesAirport.replace("X", 2)).getText()).replace(/ /g, ''))
                assert.include(
                    (await $(departAirport.replace("X", 2)).getText()).replace(/ /g, ''),
                    await flightPageCollector.get('destinationCity'),
                    'Validation failed: Mismatch in Flight departAirport Seg2'
                );
                console.info("Depart Airport Seg2 validation passed- " + (await $(departAirport.replace("X", 2)).getText()).replace(/ /g, ''))
            }
        }
        catch (Ex) {
            console.log("Validation Failed")
        }
    }

    async addProduct(product, paxNum) {
        await actions.pause(15000)
        if (product.includes("checked")) {
            try {
                // await actions.waitForDisplayed(addBagsLink, 'addBagsLink', 10000)
                // let addBagsLinkisEnable = await actions.isEnabled(addBagsLink, 'addBagsLink')
                // if (addBagsLinkisEnable) {
                await actions.waitForClickable(addBagsLink, 'addBagsLink', 10000)
                await actions.clickElement('click', addBagsLink, 'addBagsLink')
                await actions.waitForDisplayed(checkedBags, 'checkedBags', 5000)
                // }
            } catch (er) {
                console.log("The add bags link is not enabled")
            }
            // await actions.waitForEnabled(addBagsLink, 'addBagsLink', 5000)
            // await actions.waitForClickable(addBagsLink, 'addBagsLink')
            // await actions.clickElement('click', addBagsLink, 'addBagsLink')
            await actions.pause(5000)
            // await actions.waitForDisplayed(carryOnTitle, 'carry-on_title', 30000)
            // await browser.pause(3000);
            // await actions.scroll(checkedBag)
            // await browser.pause(3000);
            await actions.clickElement('click', checkedBag.replace("X", paxNum), 'checkedBag')
            for (var i = 0; i < parseInt(product.split(' ')[0]); i++) {
                await actions.pause(3000);
                await browser.keys(['ArrowDown']);
            }
            await browser.keys(['Enter']);
        }
    }

    async passSeatPage() {
        try {
            await actions.pause(3000)
            await browser.keys(['End'])
            await actions.pause(3000)
            await actions.clickElement('click', seatcontinue, "seatcontinue")
            await actions.pause(5000)
        } catch {
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
            await actions.scroll(continueButton.replace("X", 1))
            await actions.waitForClickable(continueButton.replace("X", 1), 'continueButton')
            await actions.pause(5000)
            await actions.clickElement('click', continueButton.replace("X", 1), 'continueButton')
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
                await actions.scroll(hazardcheckbox,'hazardcheckbox')
                await actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                await actions.clickElement('click', hazardcheckbox, 'hazardcheckbox')
                await actions.waitForEnabled(hazardContinueButton, 'hazardContinueButton')
                await actions.waitForClickable(hazardContinueButton, 'hazardContinueButton')
                await actions.clickElement('click', hazardContinueButton, 'hazardContinueButton')
            }
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
                await actions.scroll(continueBagsPopUp,'continueBagsPopUp')
                await actions.clickElement('click', continueBagsPopUp, 'continueBagsPopUp')
            }
            await actions.waitForDisplayed(hazardMaterial, 'hazardMaterial', 10000)
            let hazardMaterialIsDisplayed = await actions.isDisplayed(hazardMaterial, 'hazardMaterial')
            if (hazardMaterialIsDisplayed) {
                await actions.scroll(hazardcheckbox,'hazardcheckbox')
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
                    await actions.scroll(continueSeatsPopUp,'continueSeatsPopUp')
                    await actions.clickElement('click', continueSeatsPopUp, 'continueSeatsPopUp')
                }
                if (hazardMaterialIsDisplayed) {
                    await actions.waitForDisplayed(hazardcheckbox, 'hazardcheckbox', 10000)
                    await actions.scroll(hazardcheckbox,'hazardcheckbox')
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
                // this.ContinuePopupOnSeatsPage()	
                try {
                    await actions.scroll(seatcontinuebtn,'seatcontinuebtn')
                    await actions.waitForDisplayed(seatcontinuebtn, 'seatcontinuebtn', 10000)
                    await actions.waitForClickable(seatcontinuebtn, 'seatcontinuebtn')
                    await actions.clickElement('click', seatcontinuebtn, 'seatcontinuebtn')
                    await actions.waitForDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage', 10000)
                    let popUpVisibiltyseats = await actions.isDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                    if (popUpVisibiltyseats) {
                        let continuePopUpSeatsPageVisibility = await actions.isDisplayed(continuePopUpSeatsPage, 'continuePopUpSeatsPage')
                        if (!continuePopUpSeatsPageVisibility) {
                            await actions.scroll(continuePopUpSeatsPage,'continuePopUpSeatsPage')
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
                    // else{
                    // this.ContinuePopupOnSeatsPage()	
                    // }
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

    async onlinecheckinbagspage() {
        await actions.pause(3000)
        await actions.click(checkinbagspagecontinue, 'checkin bags page continue button')
        await actions.pause(3000)
        try{
            await actions.click(checkinbagspagecontinue2, 'Bags page continue popup')
        }catch(e){}       
        await actions.pause(8000)
    }

    async onlinecheckinseatspage() {
        await actions.pause(5000)
        await actions.click(checkinharadeouspagecheckbox, 'checkinharadeouspagecheckbox')
        await actions.click(checkinharadeouspagecontinue, 'checkinharadeouspagecontinue')
        await actions.pause(5000)
        await actions.click(checkinseatpagecontinue, 'checkinseatpagecontinue')
        await actions.pause(3000)
        await actions.click(checkinseatpagecontinuepopup, 'checkinseatpagecontinuepopup')        
        await actions.pause(20000)
    }

    async validateProductDetails(product, paxNum) {
        await actions.pause(7000)
        try {
            await browser.waitUntil(async () => {
                return (await actions.isDisplayed(itineraryDetailsPage, "itineraryDetailsPage") === true)
            }, {
                timeout: 30000,
                timeoutMsg: 'itineraryDetailsPage is not displayed after 30s'
            })
        } catch (error) {
            await actions.waitFor(printBoxThankyou, 20000)
            await actions.waitForDisplayed(printBoxThankyou, 'printBoxThankyou')
        }
        await actions.waitForDisplayed(flightinformation,'flightinformation')
        if (product.includes("checked")) {
            // assert.equal(
            // $(manageTravelPageCheckedBagCount.replace("X",paxNum)).getText().replace(/ /g,''),
            // product.split(' ')[0],
            // 'Validation failed: Mismatch in manageTravelPage CheckedBag Count'
            assert.isTrue(
                await actions.isDisplayed(manageTravelPageCheckedBagCount, 'manageTravelPageCheckedBagCount'),
                'Validation failed: Mismatch in manageTravelPage CheckedBag Count');
            await actions.pause(10000)
        }
    }

    // async ContinuePopupOnSeatsPage() {
    //     try {
    //         await actions.scroll(yesNoSeatsContinue)
    //         await actions.pause(1000)
    //         await actions.waitForClickable(yesNoSeatsContinue, 'yesNoSeatsContinue')
    //         await action.clickElement('click', yesNoSeatsContinue, 'yesNoSeatsContinue')
    //         await actions.pause(1000)
    //     }
    //     catch (ex) {
    //     }
    // }
    async ContinuePopupOnSeatsPage() {
        try {
            await actions.waitForDisplayed(yesNoSeatsContinue, "yesNoSeatsContinue", 10000)
            await actions.scroll(yesNoSeatsContinue,'yesNoSeatsContinue')
            await actions.clickElement('click', yesNoSeatsContinue, "yesNoSeatsContinue")
        }
        catch (ex) {
        }
    }

    async onlineCheckin() {
        await actions.waitForDisplayed(onelineCheckin, 'check-in online link', 10000)
        await actions.scroll(onelineCheckin,'onelineCheckin')
        await actions.waitForClickable(onelineCheckin, 'check-in online link')
        await actions.clickElement('click', onelineCheckin, "check-in online link")
        await actions.focusLastOpenedWindow()
    }

    async seatsnbagssel() {
        await actions.scroll(scrollOneway,'scrollOneway')
        await actions.waitForClickable(seats, 'seats')
        await actions.clickElement('click', seats, "add or change seats link")
        // await browser.pause(3000)
    }

    async bagsnseatssel() {
        await actions.scroll(scrollOneway,'scrollOneway')
        await actions.waitForClickable(bags, 'bags')
        await actions.clickElement('click', bags, "add or change seats link")
    }

    async addorchangebags() {
        await actions.scroll(scrolltravellers,'scrolltravellers')
        // await browser.pause(3000)
        await actions.clickElement('click', checkedbags, "buttoon to add the checked bags")
        await actions.clickElement('click', checkedinbagone, "button to add or carry on bags")
    }

    async selectSeatsRandomly() {
        var availableSeats = await $$(manageTravelSeats)
        console.log("ManageTravel Available Seats " + availableSeats.length)
        await availableSeats[0].click()
        await actions.scroll(greatChoicePopup,'greatChoicePopup')
        await actions.waitForClickable(greatChoicePopup, 'greatChoicePopup')
        await actions.clickElement('click', greatChoicePopup, "greatChoicePopup")
    }

    async seatsContinue() {
        await actions.scroll(scrolldisable,'scrolldisable')
        await actions.clickElement('click', continueseats, "bags and seats link")
    }

    async seatsContinuegreen() {
        await actions.scroll(scrolldisable,'scrolldisable')
        await actions.clickElement('click', continueseats, "bags and seats link")
        await actions.clickElement('click', continueseatspopup, "bags and seats link")
    }

    async bagsContinue() {
        await actions.scroll(scrollhighlight,'scrollhighlight')
        await actions.clickElement('click', continuebags, "bags and seats link")
    }

    async hotelsContinue() {
        await actions.scroll(scrollexplaination,'scrollexplaination')
        await actions.clickElement('click', continuehotel, "bags and seats link")
    }

    async clickAddaCar() {
        try {
            await actions.waitForDisplayed(addCar, 'addCar link', 30000)
            await actions.scroll(addCar,'addCar')
            await actions.waitForClickable(addCar, 'addCar Link')
            await actions.clickElement('click', addCar, "Add Car link")
            await actions.waitForDisplayed(carsPageHeader, 'carsPageHeader', 30000)
        } catch (error) {
            console.log(error)
        }
    }

    async carsContinue() {
        await actions.scroll(scrollnote,'scrollnote')
        await actions.clickElement('click', continuecars, "bags and seats link")
    }

    async cardDetails() {
        let {
            creditCardNum,
            creditCardCvv,
        } = await GetCardNumbers.getCreditCardNumbers('JCB')
        if (process.env.ENV.includes("prod")) {
            await actions.scroll(sscrolldetails,'sscrolldetails')
            await actions.setInputField('setValue', process.env.cardno, cardnumfield, "card-number input field")
            await actions.clickElement('click', expirymonth, "expiry month dropdown")
            await actions.clickElement('click', dynamicMonthSelection.replace("X", process.env.expiredMonth), "selecting the expiry month of card")
            await actions.clickElement('click', expiryyear, "expiry year dropdown")
            await actions.clickElement('click', dynamicYearSelection.replace("X", process.env.expiredYear), "selecting the expiry year of card")
            await actions.setInputField('setValue', process.env.cvv, cvv, "cvv field")
            await actions.setInputField('setValue', 'Automation', cardholder, "card holder input field")
        } else {
            console.log("creditCardNum for MT: ", creditCardNum)
            console.log("creditCardCvv for MT: ", creditCardCvv)
            await actions.scroll(sscrolldetails,'sscrolldetails')
            await actions.setInputField('setValue', creditCardNum, cardnumfield, "card-number input field")
            await actions.clickElement('click', expirymonth, "expiry month dropdown")
            await actions.clickElement('click', monthselection, "selecting the expiry month of card")
            await actions.clickElement('click', expiryyear, "expiry year dropdown")
            await actions.clickElement('click', yearseelection, "selecting the expiry year of card")
            await actions.setInputField('setValue', creditCardCvv, cvv, "cvv field")
            await actions.setInputField('setValue', 'QA TEST', cardholder, "card holder input field")
        }

    }

    async billingaddress() {
        await actions.scroll(billingscroll,'billingscroll')
        await actions.clearInputField(fnamefield, "First Name Input-Field")
        await actions.setInputField('setValue', 'QA', fnamefield, "First Name Input-Field")
        await actions.clearInputField(lnamefield, "last name field")
        await actions.setInputField('setValue', 'AUTOMATION', lnamefield, "last name input field")
        await actions.setInputField('setValue', 'Random', add1, "address field one")
        await actions.setInputField('setValue', 'Street', add2, "address field two")
        await actions.setInputField('setValue', 'Calf', add3, "address field three")
        await actions.clickElement('click', state, "state dropdown")
        await actions.clickElement('click', caselc, "state selection")
        await actions.setInputField('setValue', '10005', zipcode, "zipcode input field")
        await actions.setInputField('setValue', '702-555-1111', mobilenum, "mobile-num field")
    }

    async negativePayment() {
        await actions.pause(5000);
        console.log("Current Page Url is " + await browser.getUrl());
        if ((await actions.getText(balanceCart, 'balanceCart')).includes('-') || (await actions.getText(balanceCart, 'balanceCart')).includes('$0.00')) {
            await actions.pause(8000)
            console.log("PAYMENT PAGE")
            let termsAndConditionCheckBoxVisibile = await actions.isDisplayed(termsAndConditionCheckBox, 'termsAndConditionCheckBox')
            if (termsAndConditionCheckBoxVisibile) {
                await actions.pause(5000)
                await actions.waitForClickable(termsAndConditionCheckBox, 'termsAndConditionCheckBox', 5000)
                await actions.click(termsAndConditionCheckBox, 'termsAndConditionCheckBox')
            }
            await actions.pause(3000)
            await actions.click(negativeContinue, 'negativeContinue')
            await actions.pause(2000);
            return true
        } else {
            return false
        }
    }

    async purchasemytrip() {
        await actions.pause(5000)
        await actions.scroll(termsscroll,'termsscroll')
        await actions.clickElement('click', termsbox, "condition checkbox")
        await actions.pause(5000)
        await actions.clickElement('click', purchase, "Continue and Pay button")
        await actions.pause(5000)
    }

    async clickChangeDate() {
        await actions.pause(15000)
        await actions.waitForDisplayed(changeFlight, 'changeFlight', 30000)
        await actions.waitForClickable(changeFlight, 'changeFlight')
        await actions.clickElement('click', changeFlight, 'changeFlight')
        await actions.waitForDisplayed(flightH1, 'flightH1', 30000)
    }
    async seatautoassigned(){
       
        await actions.pause(7000)
        
            await actions.scroll(seatscroll,'scroll to the seat heading',1000),
            await actions.waitForDisplayed(seatautoassigned, 'seatautoassigned')
            const seatElement = await $(seatautoassigned);   // using WebdriverIO style
            let seatText = await seatElement.getText();
            console.log("Seat number: " + seatText);
            if(seatText=='-'){
                console.log("seat is not-assigned")
            }
            else{
                console.log("seat is assigned")
            }
            
        } 
    async cancelMyTrip() {
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
        await actions.waitFor(contentCancelPopup)
        await actions.waitForDisplayed(contentCancelPopup, 'contentCancelPopup', 10000)

        // click cancel reservation
        await actions.waitForClickable(cancelTripButton, 'cancelTripButton')
        await actions.clickElement('click', cancelTripButton, 'cancelTripButton')

        // cancel completed
        await actions.waitFor(cancelCompleted)
        await actions.waitForDisplayed(cancelCompleted, 'cancel completed', 10000)
        let canceltext = await actions.getText(cancelCompleted, 'cancel completed')
        assert.isTrue(canceltext.includes("Cancelation Completed"), "Error in verifying text for Cancelation Confirmed")
        await actions.waitForDisplayed(reservationCanceled, 'reservation canceled', 20000)
        assert.isTrue((await actions.getText(reservationCanceled, 'reservationCanceled')).includes("Your reservation has been canceled."), "FAILED!! Invalid Message for reservation cancelation")

        // close cancel popup
        await actions.waitFor(cancelPopUpCloseIcon)
        await actions.waitForDisplayed(cancelPopUpCloseIcon, 'cancelPopUpCloseIcon', 10000)
        await actions.clickElement('click', cancelPopUpCloseIcon, 'cancelPopUpCloseIcon')
        let canceledRedBannerIsDisplayed = await actions.isDisplayed(canceledRedBanner, 'canceledRedBanner')
        if (canceledRedBannerIsDisplayed) {
            await actions.waitForDisplayed(canceledRedBanner, 'canceled redbanner')
            assert.isTrue((await actions.getText(canceledRedBanner, 'canceledRedBanner')).includes("Canceled Trip"), "Assertion FAILED for Canceled Red Banner")
        }
    }

    async clickCancelFlight() {
        await actions.waitForDisplayed(cancelFlight, 'cancelFlight', 30000)
        await actions.waitForClickable(cancelFlight, 'cancelFlight')
        await actions.click(cancelFlight, 'cancelFlight Button')
    }

    async clickCancelReason() {
        await actions.waitForDisplayed(cancelTripBox, 'cancelTripBox', 30000)
        await actions.waitForClickable(cancelEntire, 'cancelEntire')
        await actions.click(cancelEntire, 'cancelEntire Button')
        await actions.click(nextButton, 'nextButton')
        try {
            await actions.pause(4000)
            let text = await actions.getText(errMsg, 'errMsg')
            if (text.include('This itinerary cannot be canceled online. Please contact our customer care team at')) {
                assert.fail("CANCELATION FAILED")
            }
        } catch (e) {

        }
    }

    async clickCancelProceed() {
        await actions.waitForDisplayed(proceedMsg, 'proceedMsg', 30000)
        await actions.waitForClickable(cancelbutton, 'cancelbutton')
        await actions.click(cancelbutton, 'cancelbutton')
        await this.validateSuccess();
    }

    async validateSuccess() {
        await actions.pause(10000)
        await actions.waitForDisplayed(confirmText, 'confirmText', 30000)
        let cancelCompleteIsDisplayed = await actions.isDisplayed(cancelComplete, 'cancelComplete')
        let thanksIsDisplayed = await actions.isDisplayed(thanks, 'thanks')
        if (cancelCompleteIsDisplayed && thanksIsDisplayed) {
            console.log('CANCELATION COMPLETED')
            console.log(await actions.getText(confirmText, 'confirmText'))
        } else {
            assert.fail("SOMETHING WRONG WITH CANCELATION")
        }
    }

    async enterMTLookupDetails() {
        await actions.waitForDisplayed(firstName, "firstName")
        await actions.click(firstName, "firstName")
        await actions.pause(4000)
        await actions.setValue('QA', firstName, "firstName")
        await actions.pause(4000)

        await actions.waitForDisplayed(lastName, "lastName")
        await actions.click(lastName, "lastName")
        await actions.pause(4000)
        await actions.setValue('AUTOMATION', lastName, "lastName")
        await actions.pause(4000)

        await actions.waitForDisplayed(confirmationNumber, "confirmationNumber")
        await actions.click(confirmationNumber, "confirmationNumber")
        await actions.pause(4000)
        await actions.setValue(process.env.confirmationNumber, confirmationNumber, "confirmationNumber")
        console.log("ENTERED CONFIRMATION NUMBER AS " + process.env.confirmationNumber)
        await actions.pause(4000)

        await actions.waitForDisplayed(clickFindMyTrip, "clickFindMyTrip")
        await actions.pause(4000)
        await actions.click(clickFindMyTrip, "clickFindMyTrip")
        await actions.pause(4000)

        await actions.waitForDisplayed(itineraryDetails, "itineraryDetails")
        await actions.pause(6000)
        console.log("Itinerary Details Displayed as " + (await actions.getText(itineraryDetails, "itineraryDetails")))
    }
}
export default new Managetravel()