import Actions from '../../src/support/actions.js'

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

    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
        this.page = page
    }

    async selectingextraaccess() {
        await this.actions.scroll(extrascroll)
        await this.actions.clickElement('click', boarding, "boarding button")
        await this.actions.clickElement('click', departingleg, "departingleg checkbox")
        await this.actions.clickElement('click', returnleg, "returnleg checkbox")
        await this.actions.clickElement('click', priority, "priority access")
        await this.actions.clickElement('click', tripFlex, "tripflex selection")
    }

    async continueButt() {
        await this.actions.waitForDisplayed(continueb, 'continueb')
        await this.actions.clickElement('click', continueb, "continue-button")
        await this.actions.clickElement('click', popupContinueButton, "pop-up button for continue")
    }

    async clickContinueButton() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.scroll(continueb)
        await this.actions.waitForDisplayed(continueb, 'Continue button in BAGS PAGE', 60000)

        const continueButtonElement = await this.actions.getElement(continueb)
        let retries = 0
        const maxRetries = 10
        while (retries < maxRetries) {
            try {
                const isEnabled = await this.actions.isEnabled(continueb)
                if (isEnabled) {
                    console.log('Continue button is now enabled, attempting to click...')
                    break
                }
                console.log(`Continue button still disabled, waiting... (attempt ${retries + 1}/${maxRetries})`)
                await this.actions.pause(2000) // Wait 2 seconds before retrying
                retries++
            } catch (error) {
                console.log(`Error checking button state: ${error.message}`)
                retries++
                await this.actions.pause(2000)
            }
        }

        if (retries >= maxRetries) {
            console.log('Continue button did not become enabled within timeout period')
            throw new Error('Continue button remained disabled after maximum retries')
        }
        await this.actions.waitForClickable(continueb, 'Continue button in BAGS PAGE', 60000)
        try {
            await this.actions.click(continueb, 'Continue button in BAGS PAGE')
        } catch (error) {
            console.log('Normal click failed, attempting force click...')
            await continueButtonElement.first().click({ force: true })
        }
        await this.actions.waitForLoadState('domcontentloaded', 30000)

        // Handle popup if it appears
        let popupContinueBtnVisibility = await this.actions.isDisplayed(popupContinueButton, "continue button to close the popup")
        console.log("popupContinueBtnVisibility: ", popupContinueBtnVisibility)
        if (popupContinueBtnVisibility) {
            await this.actions.waitForClickable(popupContinueButton, 'popupContinueButton', 30000)
            await this.actions.clickElement('click', popupContinueButton, "pop-up button for continue")
        }
    }

    async selectCarryOnBagByParams(params) {
        await this.actions.waitUntilPageLoad()
        await this.actions.waitForLoadState('domcontentloaded', 60000)
        await this.actions.waitForURL(/ancillaries/, 60000)
        await this.actions.waitForDisplayed(bagsPageHeading, 'bagsPageHeading', 30000)
        if (!params.includes("false")) {
            try {
                // await this.actions.pause(4000)
                let bundleBannerVisibilty = await this.actions.isDisplayed(bundlebannerforCarryOnSelection, 'bundlebannerforCarryOnSelection')
                if (bundleBannerVisibilty) {
                    console.log("Can't select the carryon Bags since it got selected automatically because we have opted Bonus and Total Bundle")
                }
                var paxNum = params.split(' ')[0].split('-')[1]
                var segment = params.split(' ')[1].split('-')[1]
                if (paxNum.includes("all")) {
                    await this.actions.waitForDisplayed(travelerCount, 'seat info on header', 30000)
                    var all = (await this.actions.getText(travelerCount, "travellers count")).split(' ')[0]
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
        let carryonIncdepart = await this.actions.getElement(carryOnIncrementButtonSeg1.replace(/X/g, paxNum - 1))
        let carryonCurrentVlaue = await this.actions.getElement(carryonBagCurrentValueSeg1.replace(/X/g, paxNum - 1))
        let carryonIncreturn = await this.actions.getElement(carryOnIncrementButtonSeg2.replace(/X/g, paxNum - 1))
        let carryonCurrentVlaueret = await this.actions.getElement(carryonBagCurrentValueSeg2.replace(/X/g, paxNum - 1))
        if (segment === "both") {
            do {
                await this.actions.waitForClickable(carryonIncdepart, 'button to increment the carryOn bags', 10000)
                await this.actions.clickElement('click', carryonIncdepart, 'button to increment the carryOn bags')
            } while (parseInt(await this.actions.getText(carryonCurrentVlaue, "increment button")) < 1)
        }
        if (segment === "departing") {
            if (!(await this.actions.isDisplayed(carryonIncdepart, "increment button for carryon bags"))) {
                if (await this.actions.isDisplayed(sameOptionsForAllFlight, "checkbox of all flights")) {
                    await this.actions.clickElement('click', sameOptionsForAllFlight, 'checkbox to select/deselect the option for all flights')
                }
            }
            do {
                await this.actions.clickElement('click', carryonIncdepart, 'button to increment the carryOn bags for departing')
            } while (parseInt(await this.actions.getText(carryonCurrentVlaue, "increment button")) < 1)
        }
        if (segment === "returning") {
            if (!(await this.actions.isDisplayed(carryonIncreturn, "increment button of carryon bags for return"))) {
                if (await this.actions.isDisplayed(sameOptionsForAllFlight, "checkbox of all flights")) {
                    await this.actions.clickElement('click', sameOptionsForAllFlight, 'checkbox to select/deselect the option for all flights')
                }
            }
            do {
                await this.actions.clickElement('click', carryonIncreturn, 'button to increment the carryOn bags for return')
            } while (parseInt(await this.actions.getText(carryonCurrentVlaueret, "increment button")) < 1)
        }

        // Check if carry-on price is included or has a price
        const carryOnPriceElement = carryOnPrice.replace(/X/g, 1)
        try {
            const priceText = await this.actions.getText(carryOnPriceElement, 'carryon price')
            if (priceText && priceText.toUpperCase().includes('INCLUDED')) {
                console.log("Carry-on is included in bundle")
                BagsPageCollector.set('carryOnPrice', 'INCLUDED')
            } else if (priceText && priceText.includes('$')) {
                BagsPageCollector.set('carryOnPrice', priceText.split("$")[1])
            } else {
                BagsPageCollector.set('carryOnPrice', 'N/A')
            }
        } catch (error) {
            console.log("Could not get carry-on price:", error.message)
            BagsPageCollector.set('carryOnPrice', 'N/A')
        }
    }

    async selectCheckedBagByParams(params) {
        if (!params.includes("false")) {
            var paxNum = params.split(' ')[0].split('-')[1]
            var segment = params.split(' ')[1].split('-')[1]
            var checked = params.split(' ')[2].split('-')[1]
            if (paxNum.includes("all")) {
                await this.actions.waitForDisplayed(travelerCount, 'seat info on header')
                var all = (await this.actions.getText(travelerCount, 'traveler count')).split(' ')[0]
                for (var i = 1; i <= all; i++) {
                    await this.selectCheckedBag(checked, Number(i), segment)
                }
            } else {
                await this.selectCheckedBag(checked, paxNum, segment)
            }
        }
    }

    async selectCheckedBag(checked, paxNum, segment) {
        let checkedincdepart = await this.actions.getElement(checkedIncrementButtonSeg1.replace(/X/g, paxNum - 1))
        let checkedincreturn = await this.actions.getElement(checkedIncrementButtonSeg2.replace(/X/g, paxNum - 1))
        // await browser.execute("window.scrollBy(0,-100)");
        // await this.actions.pause(1000)
        if (segment === "both") {
            for (var i = 0; i < checked; i++) {
                // await this.actions.waitForClickable(checkedincdepart, "the button to increment the checkedin bags")
                // await this.actions.scroll(checkedincdepart)
                await this.actions.waitForDisplayed(checkedincdepart, "increment button till it displayed", 30000)
                await this.actions.waitForClickable(checkedincdepart, "increment button for checked-In bags", 30000)
                if (await this.actions.isClickable(checkedincdepart, "increment button")) {
                    await this.actions.clickElement('click', checkedincdepart, "increment button for checked-In bags")
                }
            }
        }
        if (segment === "departing") {
            if (!(await this.actions.isDisplayed(checkedincreturn, "increment button for return"))) {
                if (await this.actions.isDisplayed(sameOptionsForAllFlight, "checkbox")) {
                    await this.actions.waitForClickable(sameOptionsForAllFlight, "checkbox to select/deselect the option for all flights for return", 30000)
                    await this.actions.clickElement('click', sameOptionsForAllFlight, "checkbox to select/deselect the option for all flights for return")
                }
                for (var i = 0; i < checked; i++) {
                    await this.actions.waitForClickable(checkedincdepart, "increment button for checked-In bags", 30000)
                    await this.actions.clickElement('click', checkedincdepart, "increment button for checked-In bags")
                }
            }
            else {
                for (var i = 0; i < checked; i++) {
                    await this.actions.waitForClickable(checkedincdepart, "increment button for checked-In bags", 30000)
                    await this.actions.clickElement('click', checkedincdepart, "increment button for checked-In bags")
                }
            }
        }
        if (segment === "returning") {
            if (!(await this.actions.isDisplayed(checkedincreturn, "increment button for return"))) {
                if (await this.actions.isDisplayed(sameOptionsForAllFlight, "checkbox")) {
                    await this.actions.waitForClickable(sameOptionsForAllFlight, "checkbox to select/deselect the option for all flights for return", 30000)
                    await this.actions.clickElement('click', sameOptionsForAllFlight, "checkbox to select/deselect the option for all flights for return")
                }
                for (var i = 0; i < checked; i++) {
                    await this.actions.waitForClickable(checkedincreturn, "increment button for checked-In bags", 30000)
                    await this.actions.clickElement('click', checkedincreturn, "increment button for checked-In bags")
                }
            }
            else {
                for (var i = 0; i < checked; i++) {
                    await this.actions.waitForClickable(checkedincreturn, "increment button for checked-In bags", 30000)
                    await this.actions.clickElement('click', checkedincreturn, "increment button for checked-In bags")
                }
            }
        }
        await this.actions.waitForLoadState()

        // Check if checked bag is included or has a price
        const priceElement = checkedbagPrice.replace(/X/g, 1)
        try {
            // First check if element exists
            const element = await this.actions.getElement(priceElement)
            if (element) {
                // Check if the element contains "INCLUDED" text
                const priceText = await this.actions.getText(priceElement, 'checked bag price')
                if (priceText && priceText.toUpperCase().includes('INCLUDED')) {
                    console.log("Checked bag is included in bundle")
                    BagsPageCollector.set('checkedBagPrice', 'INCLUDED')
                } else {
                    // Wait for the price to be visible and get the price
                    await this.actions.waitForDisplayed(priceElement, 'checked bag price', 30000)
                    BagsPageCollector.set('checkedBagPrice', priceText.split("$")[1])
                }
            }
        } catch (error) {
            console.log("Could not find or access checked bag price element:", error.message)
            // Try to get price text without waiting for visibility
            try {
                const priceText = await this.actions.getText(priceElement, 'checked bag price')
                if (priceText && priceText.toUpperCase().includes('INCLUDED')) {
                    BagsPageCollector.set('checkedBagPrice', 'INCLUDED')
                } else if (priceText && priceText.includes('$')) {
                    BagsPageCollector.set('checkedBagPrice', priceText.split("$")[1])
                } else {
                    BagsPageCollector.set('checkedBagPrice', 'N/A')
                }
            } catch (textError) {
                console.log("Could not get checked bag price text:", textError.message)
                BagsPageCollector.set('checkedBagPrice', 'N/A')
            }
        }
    }

    async selectTripflex(tripflex) {
        let slide = slider.replace("X", 2)
        if (tripflex === "true") {
            await this.actions.scroll(extraTitle)
            if (await this.actions.isDisplayed(indicatorContainer, "indicator container")) {
                await this.actions.clickElement('click', slide, "extras button")
            }
            await this.actions.clickElement('click', tripFlexAddToCart, "AddtoCart button")
            await this.actions.waitForDisplayed(tripFlexAdded, "AddToCart button")
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
            let slider1visbility = await this.actions.isDisplayed(slider1, 'extras button')
            if (slider1visbility) {
                await this.actions.waitForDisplayed(slider1, 'Extras button', 30000)
                await this.actions.waitForClickable(slider1, 'Extras button', 30000)
                await this.actions.clickElement('click', slider1, "Extras Button")
            }
            await this.actions.waitForClickable(priorityBoardingAddToCart, 'AddToCart Button', 30000)
            await this.actions.clickElement('click', priorityBoardingAddToCart, "Extras Button")
            await this.actions.waitForDisplayed(priorityBoardingModal, 'Priority access Modal', 30000)
            var pb = await this.actions.getElements(flightLegCheckboxLabel);
            if (await this.actions.isDisplayed(priorityBoardingModal, 'Priority Access Modal')) {
                if (segment === "both") {
                    await this.actions.clickElement('click', pb[0], "checkbox for selecting the priority access")
                    await this.actions.clickElement('click', pb[(pb.length - 1)], "checkbox for selecting the Priority Access")
                }
                if (segment === "departing") {
                    await this.actions.clickElement('click', pb[0], "checkbox for selecting the priority access for depart")
                }
                if (segment === "returning") {
                    await this.actions.clickElement('click', pb[(pb.length - 1)], "checkbox for selecting the Priority Access for return")
                }
                await this.actions.clickElement('click', priorityBoardingModalAddToCart, "priorityBoardingModalAddToCart")
                await this.actions.waitForDisplayed(priorityBoardingAdded, 'button to add priority', 30000)
            }
        }
    }


    async addExtras() {
        // await this.actions.pause(4000)
        let tripFlexAddToCartIsDisplay = await this.actions.isDisplayed(tripFlexAddToCart, 'Trip flex card info')
        if (tripFlexAddToCartIsDisplay) {
            await this.actions.scroll(tripflextitle)
            await this.actions.waitForClickable(tripFlexAddToCart, 'button to add tripFlex ToCart')
            await this.actions.clickElement('click', tripFlexAddToCart, 'Trip Flex add to cart button')
        } else {
            try {
                await this.actions.waitForDisplayed(priorityBoardingAddToCart, 'priorityBoardingAddToCart', 4000)
                await this.actions.scroll(priorityBoardingAddToCart)
                await this.actions.clickElement('click', priorityBoardingAddToCart, 'Priority board add to cart button')
                await this.actions.clickElement('click', flightLegCheckboxLabel, 'Flight leg checkbox')
                await this.actions.clickElement('click', priorityBoardingModalAddToCart, 'Priority modal add to cart button')
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
            await this.actions.waitForDisplayed(petInCabinAddToCart, 'petInCabinAddToCart')
            await this.actions.waitForClickable(petInCabinAddToCart, 'petInCabinAddToCart')
            await this.actions.clickElement('click', petInCabinAddToCart, 'petInCabinAddToCart')
            var PETC = await this.actions.getElements(flightLegCheckboxLabel);
            console.log("PETC: " + PETC.length)
            let petInCabinModalIsDisplayed = await this.actions.isDisplayed(petInCabinModal, 'petInCabinModal')
            if (petInCabinModalIsDisplayed) {
                if (segment === "both") {
                    if (paxNum === "all") {
                        for (var i = 0; i < (PETC.length / 2); i++) {
                            // await this.actions.waitFor(PETC[i])
                            await this.actions.waitForClickable(PETC[i], 'PETC')
                            await this.actions.clickElement('click', PETC[i], 'PETC')
                        }
                    }
                    else {
                        for (var i = 0; i < PETC.length; i++) {
                            if (parseInt(paxNum) - 1 === i) {
                                // await this.actions.waitFor(PETC[i])
                                await this.actions.waitForClickable(PETC[i], 'PETC')
                                await this.actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                    }
                }
                if (segment === "departing") {
                    let petInCabinReturningLegIsDisplayed = await this.actions.isDisplayed(petInCabinReturningLeg, 'petInCabinReturningLeg')
                    if (petInCabinReturningLegIsDisplayed) {
                        if (paxNum === "all") {
                            for (var i = 0; i < PETC.length / 2; i++) {
                                // await this.actions.waitFor(PETC[i])
                                await this.actions.waitForClickable(PETC[i], 'PETC')
                                await this.actions.clickElement('click', PETC[i], 'PETC')
                            }
                            for (var i = PETC.length - 1; i >= PETC.length / 2; i--) {
                                // await this.actions.waitFor(PETC[i])
                                await this.actions.waitForClickable(PETC[i], 'PETC')
                                await this.actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                        else {
                            for (var i = 0; i < PETC.length; i++) {
                                if (parseInt(paxNum) - 1 === i) {
                                    // await this.actions.waitFor(PETC[i])
                                    await this.actions.waitForClickable(PETC[i], 'PETC')
                                    await this.actions.clickElement('click', PETC[i], 'PETC')
                                }
                            }
                            for (var i = 0; i < PETC.length; i++) {
                                if (((PETC.length / 2) + parseInt(paxNum)) - 1 === i) {
                                    // await this.actions.waitFor(PETC[i])
                                    await this.actions.waitForClickable(PETC[i], 'PETC')
                                    await this.actions.clickElement('click', PETC[i], 'PETC')
                                }
                            }
                        }
                    }
                    else {
                        if (paxNum === "all") {
                            for (var i = 0; i < PETC.length; i++) {
                                // await this.actions.waitFor(PETC[i])
                                await this.actions.waitForClickable(PETC[i], 'PETC')
                                await this.actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                        else {
                            for (var i = 0; i < PETC.length; i++) {
                                if (parseInt(paxNum) - 1 === i) {
                                    console.log("loop")
                                    // await this.actions.waitFor(PETC[i])
                                    await this.actions.waitForClickable(PETC[i], 'PETC')
                                    await this.actions.clickElement('click', PETC[i], 'PETC')
                                }
                            }
                        }
                    }
                }
                if (segment === "returning") {
                    if (paxNum === "all") {
                        for (var i = PETC.length - 1; i >= PETC.length / 2; i--) {
                            await this.actions.waitForClickable(PETC[i], 'PETC')
                            await this.actions.clickElement('click', PETC[i], 'PETC')
                        }
                    }
                    else {
                        for (var i = 0; i < PETC.length; i++) {
                            if (((PETC.length / 2) + parseInt(paxNum)) - 1 === i) {
                                await this.actions.waitForClickable(PETC[i], 'PETC')
                                await this.actions.clickElement('click', PETC[i], 'PETC')
                            }
                        }
                    }
                }
                await this.actions.waitForDisplayed(petInCabinModalAddToCart, 'petInCabinModalAddToCart', 30000)
                await this.actions.waitForClickable(petInCabinModalAddToCart, 'petInCabinModalAddToCart')
                await this.actions.clickElement('click', petInCabinModalAddToCart, 'petInCabinModalAddToCart')
                let spinnerBarIsDisplayed = await this.actions.isDisplayed(spinnerBar, 'spinner bar')
                if (spinnerBarIsDisplayed) {
                    await this.actions.waitForDisplayed(spinnerBar, 'spinnerBar')
                }
                await this.actions.waitForDisplayed(petInCabinAdded, 'petc added', 10000)
            }
        }
    }

}
export default BagsPage