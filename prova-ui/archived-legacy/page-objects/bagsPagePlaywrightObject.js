import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"

const extrascroll = "[data-hook='extras-title']"
const boarding = "[data-hook='priority-boarding-card_add-to-cart']"
const departingleg = "//div[@data-hook='extras-popup-flight-leg_departing']/div[2]/div[1]"
const returnleg = "//div[@data-hook='extras-popup-flight-leg_returning']/div[2]/div[1]"
const priority = "[data-hook='priority-boarding-modal_add-to-cart']"
const tripFlex = "[data-hook='trip-flex-card_add-to-cart']"
const batteriesscroll = "[alt='Lithium Batteries']"
const continueb = "//button[@data-hook='ancillaries-page_continue'] | //button[@data-hook='ancillaries-page_continue-popup']"
const popupContinueButton = "[data-hook='ancillaries-continue-popup_button_continue']"
const bagsPageHeading = "[data-hook='ancillaries-page_page-heading']"
const bundlebannerforCarryOnSelection = "[data-hook='ancillaries-page-bundle-banner_text']"
const travelerCount = "//span[@data-hook='header-flight-info_seated']"
const carryOnIncrementButtonSeg1 = "(//button[@data-hook='ancillaries-page-traveler_X_carry-on_increment'])[1]|(//button[@data-hook='ancillaries-page-carry-on_X_input_increment'])[1]"
const carryonBagCurrentValueSeg1 = "(//input[@data-hook='ancillaries-page-traveler_X_carry-on']|//input[@data-hook='ancillaries-page-carry-on_X_input'])[1]"
const carryOnIncrementButtonSeg2 = "(//button[@data-hook='ancillaries-page-traveler_X_carry-on_increment'])[2]|(//button[@data-hook='ancillaries-page-carry-on_X_input_increment'])[2]"
const carryonBagCurrentValueSeg2 = "(//input[@data-hook='ancillaries-page-traveler_X_carry-on']|//input[@data-hook='ancillaries-page-carry-on_X_input'])[2]"
const sameOptionsForAllFlight = "//label[contains(@data-hook,'ancillaries-page-clone-options-checkbox_label')]"
const carryOnPrice = "(//span[@data-hook='ancillaries-page-carry-on_price']|//span[@data-hook='cart-travelers_0_bags_carry-on_price'])[X]"
const checkedIncrementButtonSeg1 = "(//button[@data-hook='ancillaries-page-traveler_X_checked-in_increment'])[1]|(//button[@data-hook='ancillaries-page-checked-bag_X_input_increment'])[1]"
const checkedIncrementButtonSeg2 = "(//button[@data-hook='ancillaries-page-traveler_X_checked-in_increment'])[2]|(//button[@data-hook='ancillaries-page-checked-bag_X_input_increment'])[2]"
const checkedbagPrice = "(//span[@data-hook='cart-travelers_0_bags_checked-bag_price']|//span[@data-hook='ancillaries-page-checked-bag_price'])[X]"
const slider = "[data-hook='extras-carousel-marker_slide-X']"
const indicatorContainer = "//div[contains(@class,'AncillariesExtras__IndicatorContainer')]"
const extraTitle = "//span[@data-hook='extras-title']"
const tripFlexAddToCart = "[data-hook='trip-flex-card_add-to-cart']";
const tripFlexAdded = "[data-hook='trip-flex-card_cart-added']";
const priorityBoardingAddToCart = "[data-hook='priority-boarding-card_add-to-cart']";
const slider1 = "[data-hook='extras-carousel-marker_slide-1']"
const priorityBoardingModal = "[data-hook='priority-boarding-modal']";
const flightLegCheckboxLabel = "(//span[@data-hook='extras-popup-flight-leg_checkbox-label'])";
const priorityBoardingModalAddToCart = "//button[@data-hook='priority-boarding-modal_add-to-cart']"
const priorityBoardingAdded = "[data-hook='priority-boarding-card_cart-added']";
const tripflextitle = "[data-hook='trip-flex-card_title']"
const petInCabinAddToCart = "[data-hook='pet-in-cabin-card_add-to-cart']"
const petInCabinModal = "[data-hook='pet-in-cabin-modal']"
const petInCabinReturningLeg = "[data-hook='extras-popup-flight-leg_returning']"
const petInCabinModalAddToCart = "//button[@data-hook='pet-in-cabin-modal_add-to-cart']"
const spinnerBar = "//span[contains(@class,'Spinner')]"
const petInCabinAdded = "[data-hook='pet-in-cabin-card_cart-added']"

var BagsPageCollector = new Map();


class BagsPage {

    async selectingextraaccess() {
        await actions.scroll(extrascroll)
        await actions.clickElement('click', boarding, "boarding button")
        await actions.clickElement('click', departingleg, "departingleg checkbox")
        await actions.clickElement('click', returnleg, "returnleg checkbox")
        await actions.clickElement('click', priority, "priority access")
        await actions.clickElement('click', tripFlex, "tripflex selection")
    }

    async continueButt() {
        await actions.scroll(batteriesscroll)
        await actions.clickElement('click', continueb, "continue-button")
        await actions.clickElement('click', popupContinueButton, "pop-up button for continue")
    }

    async clickContinueButton() {
        // await actions.pause(5000)
        await actions.waitForDisplayed(batteriesscroll, 'batteriesscroll', 15000)
        await actions.scroll(batteriesscroll)
        await actions.waitForDisplayed(continueb, 'Continue button in BAGS PAGE', 10000)
        await actions.waitForClickable(continueb, 'Continue button in BAGS PAGE')
        // await actions.scroll(continueb)
        await actions.clickElement('click', continueb, 'Continue button in BAGS PAGE')
        // await actions.pause(5000)
        let popupContinueBtnVisibility = await actions.isDisplayed(popupContinueButton, "continue button to close the popup")
        console.log("popupContinueBtnVisibility: ", popupContinueBtnVisibility)
        if (popupContinueBtnVisibility) {
            await actions.waitForClickable(popupContinueButton, 'popupContinueButton')
            await actions.clickElement('click', popupContinueButton, "pop-up button for continue")
        }
        // await actions.pause(10000)
    }

    async selectCarryOnBagByParams(params) {
        await actions.waitUntilPageLoad()
        await actions.waitForDisplayed(bagsPageHeading,'bagsPageHeading')
        if (!params.includes("false")) {
            try {
                // await actions.pause(4000)
                let bundleBannerVisibilty = await actions.isDisplayed(bundlebannerforCarryOnSelection, 'bundlebannerforCarryOnSelection')
                if (bundleBannerVisibilty) {
                    console.log("Can't select the carryon Bags since it got selected automatically because we have opted Bonus and Total Bundle")
                }
                var paxNum = params.split(' ')[0].split('-')[1]
                var segment = params.split(' ')[1].split('-')[1]
                if (paxNum.includes("all")) {
                    await actions.waitForDisplayed(travelerCount, 'seat info on header')
                    var all = (await actions.getText(travelerCount, "travellers count")).split(' ')[0]
                    for (var i = 1; i <= all; i++) {
                        await this.selectCarryOn(i, segment)
                    }
                } else {
                    await this.selectCarryOn(paxNum, segment)
                }
            } catch (error) {
                console.log("Bundle is not selected. So carryon is not included")
            }
        }
    }

    async selectCarryOn(paxNum, segment) {
        let carryonIncdepart = await browser.locator(carryOnIncrementButtonSeg1.replace(/X/g, paxNum - 1))
        let carryonCurrentVlaue = await browser.locator(carryonBagCurrentValueSeg1.replace(/X/g, paxNum - 1))
        let carryonIncreturn = await browser.locator(carryOnIncrementButtonSeg2.replace(/X/g, paxNum - 1))
        let carryonCurrentVlaueret = await browser.locator(carryonBagCurrentValueSeg2.replace(/X/g, paxNum - 1))
        if (segment === "both") {
            do {
                await actions.pause(10000)
                await actions.clickElement('click', carryonIncdepart, 'button to increment the carryOn bags')
            } while (parseInt(await actions.getText(carryonCurrentVlaue, "increment button")) < 1)
        }
        if (segment === "departing") {
            if (!(await actions.isDisplayed(carryonIncdepart, "increment button for carryon bags"))) {
                if (await actions.isDisplayed(sameOptionsForAllFlight, "checkbox of all flights")) {
                    await actions.clickElement('click', sameOptionsForAllFlight, 'checkbox to select/deselect the option for all flights')
                }
            }
            do {
                await actions.clickElement('click', carryonIncdepart, 'button to increment the carryOn bags for departing')
            } while (parseInt(await actions.getText(carryonCurrentVlaue, "increment button")) < 1)
        }
        if (segment === "returning") {
            if (!(await actions.isDisplayed(carryonIncreturn, "increment button of carryon bags for return"))) {
                if (await actions.isDisplayed(sameOptionsForAllFlight, "checkbox of all flights")) {
                    await actions.clickElement('click', sameOptionsForAllFlight, 'checkbox to select/deselect the option for all flights')
                }
            }
            do {
                await actions.clickElement('click', carryonIncreturn, 'button to increment the carryOn bags for return')
            } while (parseInt(await actions.getText(carryonCurrentVlaueret, "increment button")) < 1)
        }
        BagsPageCollector.set('carryOnPrice', (await actions.getText(carryOnPrice.replace(/X/g, 1), 'carryon price')).split("$")[1])
    }

    async selectCheckedBagByParams(params) {
        if (!params.includes("false")) {
            var paxNum = params.split(' ')[0].split('-')[1]
            var segment = params.split(' ')[1].split('-')[1]
            var checked = params.split(' ')[2].split('-')[1]
            if (paxNum.includes("all")) {
                await actions.waitForDisplayed(travelerCount, 'seat info on header')
                var all = (await actions.getText(travelerCount, 'traveler count')).split(' ')[0]
                for (var i = 1; i <= all; i++) {
                    await this.selectCheckedBag(checked, Number(i), segment)
                }
            } else {
                await this.selectCheckedBag(checked, paxNum, segment)
            }
        }
    }

    async selectCheckedBag(checked, paxNum, segment) {
        let checkedincdepart = await browser.locator(checkedIncrementButtonSeg1.replace(/X/g, paxNum - 1))
        let checkedincreturn = await browser.locator(checkedIncrementButtonSeg2.replace(/X/g, paxNum - 1))
        // await browser.execute("window.scrollBy(0,-100)");
        // await actions.pause(1000)
        if (segment === "both") {
            for (var i = 0; i < checked; i++) {
                // await actions.waitForClickable(checkedincdepart, "the button to increment the checkedin bags")
                await actions.scroll(checkedincdepart)
                // await actions.waitForDisplayed(checkedincdepart, "increment button till it displayed")
                if (await actions.isClickable(checkedincdepart, "increment button")) {
                    await actions.clickElement('click', checkedincdepart, "increment button for checked-In bags")
                }
            }
        }
        if (segment === "departing") {
            if (!(await actions.isDisplayed(checkedincreturn, "increment button for return"))) {
                if (await actions.isDisplayed(sameOptionsForAllFlight, "checkbox")) {
                    await actions.clickElement('click', sameOptionsForAllFlight, "checkbox to select/deselect the option for all flights for return")
                }
                for (var i = 0; i < checked; i++) {
                    await actions.clickElement('click', checkedincdepart, "increment button for checked-In bags")
                }
            }
            else {
                for (var i = 0; i < checked; i++) {
                    await actions.clickElement('click', checkedincdepart, "increment button for checked-In bags")
                }
            }
        }
        if (segment === "returning") {
            if (!(await actions.isDisplayed(checkedincreturn, "increment button for return"))) {
                if (await actions.isDisplayed(sameOptionsForAllFlight, "checkbox")) {
                    await actions.clickElement('click', sameOptionsForAllFlight, "checkbox to select/deselect the option for all flights for return")
                }
                for (var i = 0; i < checked; i++) {
                    await actions.clickElement('click', checkedincreturn, "increment button for checked-In bags")
                }
            }
            else {
                for (var i = 0; i < checked; i++) {
                    await actions.clickElement('click', checkedincreturn, "increment button for checked-In bags")
                }
            }
        }
        BagsPageCollector.set('checkedBagPrice', (await actions.getText(checkedbagPrice.replace(/X/g, 1), 'checked bag price')).split("$")[1])
    }

    async selectTripflex(tripflex) {
        let slide = slider.replace("X", 2)
        if (tripflex === "true") {
            await actions.scroll(extraTitle)
            if (await actions.isDisplayed(indicatorContainer, "indicator container")) {
                await actions.clickElement('click', slide, "extras button")
            }
            await actions.clickElement('click', tripFlexAddToCart, "AddtoCart button")
            await actions.waitForDisplayed(tripFlexAdded, "AddToCart button")
        }
    }

    async selectPriorityByParams(params) {
        if (!params.includes("false")) {
            var paxNum = params.split(' ')[0].split('-')[1]
            var segment = params.split(' ')[1].split('-')[1]
            await this.selectPriorityAccess(true, paxNum, segment)
        }
    }

    async selectPriorityAccess(priorityAccess, paxNum, segment) {
        if (priorityAccess) {
            let slider1visbility = await actions.isDisplayed(slider1, 'extras button')
            if (slider1visbility) {
                await actions.waitForDisplayed(slider1, 'Extras button')
                await actions.waitForClickable(slider1, 'Extras button')
                await actions.clickElement('click', slider1, "Extras Button")
            }
            await actions.waitForClickable(priorityBoardingAddToCart, 'AddToCart Button')
            await actions.clickElement('click', priorityBoardingAddToCart, "Extras Button")
            await actions.waitForDisplayed(priorityBoardingModal, 'Priority access Modal')
            var pb = await browser.locator(flightLegCheckboxLabel).all();
            if (await actions.isDisplayed(priorityBoardingModal, 'Priority Access Modal')) {
                if (segment === "both") {
                    await actions.clickElement('click', pb[0], "checkbox for selecting the priority access")
                    await actions.clickElement('click', pb[(pb.length - 1)], "checkbox for selecting the Priority Access")
                }
                if (segment === "departing") {
                    await actions.clickElement('click', pb[0], "checkbox for selecting the priority access for depart")
                }
                if (segment === "returning") {
                    await actions.clickElement('click', pb[(pb.length - 1)], "checkbox for selecting the Priority Access for return")
                }
                await actions.clickElement('click', priorityBoardingModalAddToCart, "priorityBoardingModalAddToCart")
                await actions.waitForDisplayed(priorityBoardingAdded, 'button to add priority', 30000)
            }
        }
    }


    async addExtras() {
        // await actions.pause(4000)
        let tripFlexAddToCartIsDisplay = await actions.isDisplayed(tripFlexAddToCart, 'Trip flex card info')
        if (tripFlexAddToCartIsDisplay) {
            await actions.scroll(tripflextitle)
            await actions.waitForClickable(tripFlexAddToCart, 'button to add tripFlex ToCart')
            await actions.clickElement('click', tripFlexAddToCart, 'Trip Flex add to cart button')
        } else {
            try {
                await actions.waitForDisplayed(priorityBoardingAddToCart, 'priorityBoardingAddToCart', 4000)
                await actions.scroll(priorityBoardingAddToCart)
                await actions.clickElement('click', priorityBoardingAddToCart, 'Priority board add to cart button')
                await actions.clickElement('click', flightLegCheckboxLabel, 'Flight leg checkbox')
                await actions.clickElement('click', priorityBoardingModalAddToCart, 'Priority modal add to cart button')
            }
            catch (ex) {
                console.log("Unable to add extra")
            }
        }
    }

    async selectPetInCabinByParams(params) {
        if (!params.includes("false")) {
            var paxNum = params.split(' ')[0].split('-')[1]
            var segment = params.split(' ')[1].split('-')[1]
            await this.selectPetInCabin(true, paxNum, segment)
        }
    }

    async selectPetInCabin(petInCabin, paxNum, segment) {
        if (petInCabin) {
            await actions.waitForClickable(petInCabinAddToCart, 'petInCabinAddToCart')
            await actions.clickElement('click', petInCabinAddToCart, 'petInCabinAddToCart')
            var PETC = await browser.locator(flightLegCheckboxLabel).all();
            console.log("PETC: " + PETC.length)
            let petInCabinModalIsDisplayed = await actions.isDisplayed(petInCabinModal, 'petInCabinModal')
            if (petInCabinModalIsDisplayed) {
                if (segment === "both") {
                    if (paxNum === "all") {
                        for (var i = 0; i < (PETC.length / 2); i++) {
                            // await actions.waitFor(PETC[i])
                            await actions.waitForClickable(PETC[i], 'PETC')
                            await actions.clickElement('click', PETC[i], 'PETC')
                        }
                    }
                    else {
                        for (var i = 0; i < PETC.length; i++) {
                            if (parseInt(paxNum) - 1 === i) {
                                // await actions.waitFor(PETC[i])
                                await actions.waitForClickable(PETC[i], 'PETC')
                                await actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                    }
                }
                if (segment === "departing") {
                    let petInCabinReturningLegIsDisplayed = await actions.isDisplayed(petInCabinReturningLeg, 'petInCabinReturningLeg')
                    if (petInCabinReturningLegIsDisplayed) {
                        if (paxNum === "all") {
                            for (var i = 0; i < PETC.length / 2; i++) {
                                // await actions.waitFor(PETC[i])
                                await actions.waitForClickable(PETC[i], 'PETC')
                                await actions.clickElement('click', PETC[i], 'PETC')
                            }
                            for (var i = PETC.length - 1; i >= PETC.length / 2; i--) {
                                // await actions.waitFor(PETC[i])
                                await actions.waitForClickable(PETC[i], 'PETC')
                                await actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                        else {
                            for (var i = 0; i < PETC.length; i++) {
                                if (parseInt(paxNum) - 1 === i) {
                                    // await actions.waitFor(PETC[i])
                                    await actions.waitForClickable(PETC[i], 'PETC')
                                    await actions.clickElement('click', PETC[i], 'PETC')
                                }
                            }
                            for (var i = 0; i < PETC.length; i++) {
                                if (((PETC.length / 2) + parseInt(paxNum)) - 1 === i) {
                                    // await actions.waitFor(PETC[i])
                                    await actions.waitForClickable(PETC[i], 'PETC')
                                    await actions.clickElement('click', PETC[i], 'PETC')
                                }
                            }
                        }
                    }
                    else {
                        if (paxNum === "all") {
                            for (var i = 0; i < PETC.length; i++) {
                                // await actions.waitFor(PETC[i])
                                await actions.waitForClickable(PETC[i], 'PETC')
                                await actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                        else {
                            for (var i = 0; i < PETC.length; i++) {
                                if (parseInt(paxNum) - 1 === i) {
                                    console.log("loop")
                                    // await actions.waitFor(PETC[i])
                                    await actions.waitForClickable(PETC[i], 'PETC')
                                    await actions.clickElement('click', PETC[i], 'PETC')
                                }
                            }
                        }
                    }
                }
                if (segment === "returning") {
                    if (paxNum === "all") {
                        for (var i = PETC.length - 1; i >= PETC.length / 2; i--) {
                            await actions.waitForClickable(PETC[i], 'PETC')
                            await actions.clickElement('click', PETC[i], 'PETC')
                        }
                    }
                    else {
                        for (var i = 0; i < PETC.length; i++) {
                            if (((PETC.length / 2) + parseInt(paxNum)) - 1 === i) {
                                await actions.waitForClickable(PETC[i], 'PETC')
                                await actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                    }
                }
                await actions.waitForDisplayed(petInCabinModalAddToCart, 'petInCabinModalAddToCart', 30000)
                await actions.waitForClickable(petInCabinModalAddToCart, 'petInCabinModalAddToCart')
                await actions.clickElement('click', petInCabinModalAddToCart, 'petInCabinModalAddToCart')
                let spinnerBarIsDisplayed = await actions.isDisplayed(spinnerBar, 'spinner bar')
                if (spinnerBarIsDisplayed) {
                    await actions.waitForDisplayed(spinnerBar, 'spinnerBar')
                }
                await actions.waitForDisplayed(petInCabinAdded, 'petc added', 10000)
            }
        }
    }

}
export default new BagsPage()