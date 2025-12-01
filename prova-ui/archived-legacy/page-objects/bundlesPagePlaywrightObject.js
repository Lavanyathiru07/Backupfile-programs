import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"

import { flightPageCollector } from './flightsPagePlaywrightObject'
const pfc = "//span[@data-hook='price-breakdown_pfc_value']"
const basicBundlescroll = "[data-hook='text-below-strikethrough-price_allegiant_basic_bundle']"
const bundleSubmit = "[data-hook='bundles-page_continue']"
const headerCartButton = "[data-hook='header-cart-button_price']"
const tripTotalValue = "[data-hook='cart-total_value']"
const securityFees = "//span[@data-hook='price-breakdown_911-security_value']"
const flightFareWithoutTax = "[data-hook='cart-item_flight-package_value']"
const governmentTaxesAndFees = "//span[@data-hook='price-breakdown_government-taxes-fees_value']"
const cartClose = "[data-hook='cart-close']"
const SeatedPaxCount = "//span[@data-hook='header-flight-info_seated']"
const bundleHeader = "[data-hook='bundles-page_page-heading']"
const TravelersPageHeading = "[data-hook='travelers-page_page-heading']"
const mobileActivated = "[data-hook='bundle-activated-mobile']"
const totalBundleMobileTab = "//button[@id='Tab-2']"
const selectTotalBundle = "//button[@data-hook='select-tier-3']//span"
const bonusBundle = "[data-hook='select-tier-2']"
var bundlePageCollector = new Map();
var bundleItems = []
var bundlePrice

class BundlesPage {

    async selectingBundle() {
        await actions.scroll(basicBundlescroll)
        await actions.clickElement('click', bundleSubmit, "submit button in bundles page")
    }

    async validateFlightDetailsFromTripSummary() {
        await actions.waitUntilPageLoad()
        await actions.waitFor(bundleHeader, 20000, '', true, 'bundle header')
        await actions.waitForDisplayed(bundleHeader, 'bundleHeader')
        await actions.waitForDisplayed(headerCartButton, 'headerCartButton')
        await actions.waitForClickable(headerCartButton, 'headerCartButton')
        await actions.clickElement('click', headerCartButton, 'Header Cart Button')
        var departFlightFare = parseFloat(flightPageCollector.get('departFlightFare'))
        var returnFlightFare = parseFloat(flightPageCollector.get('returnFlightFare'))
        if (isNaN(returnFlightFare)) {
            returnFlightFare = 0
        }
        if (isNaN(returnFlightFare)) {
            returnFlightFare = 0
        }
        // await actions.pause(3000)
        await actions.scroll(tripTotalValue)
        await actions.waitForDisplayed(tripTotalValue, 'tripTotalValue')
        console.log("tripTotalValue " + (await actions.getText(tripTotalValue, 'trip total value')).split('$')[1])
        console.log("departFlightFare " + departFlightFare)
        console.log("returnFlightFare " + returnFlightFare)
        console.log("calculations " + (parseFloat(departFlightFare) + parseFloat(returnFlightFare)) * parseInt((await actions.getText(SeatedPaxCount, 'seated pax count')).split(' ')[0]))

        try {
            await actions.waitUntil(flightFareWithoutTax, 'flightFareWithoutTax button')
            bundlePageCollector.set('flightFareWithoutTax', (await actions.getText(flightFareWithoutTax, 'flight fare without tax')).split('$')[1])
            await actions.waitForDisplayed(governmentTaxesAndFees, 'governmentTaxesAndFees')
            console.log("govt Fee is " + (await actions.getText(governmentTaxesAndFees, 'govt taxes and fees')).split('$')[1]);
            await actions.clickElement('click', governmentTaxesAndFees, 'governmentTaxesAndFees')
            if (await actions.isDisplayed(pfc, 'pfc value')) {
                await actions.scroll(pfc)
                await actions.waitForDisplayed(pfc, 'pfc')
                bundlePageCollector.set('governmentTaxesAndFees', (await actions.getText(governmentTaxesAndFees, 'govt taxes and fees')).split('$')[1])
                bundlePageCollector.set('pfc', (await actions.getText(pfc, 'pfc')).split('$')[1])
            }
            else {
                bundlePageCollector.set('governmentTaxesAndFees', (await actions.getText(governmentTaxesAndFees, 'govt taxes and fees')).split('$')[1])
            }
            await actions.waitForDisplayed(securityFees, 'securityFees')
            console.log("securityFees: ", (await actions.getText(securityFees, 'security fees')).split('$')[1])
            bundlePageCollector.set('securityFees', (await actions.getText(securityFees, 'security fees')).split('$')[1])
        }
        catch (ex) {
            console.log("exception while collecting tax details " + ex)
        }
        try {
            await actions.clickElement('click', headerCartButton, 'Header Cart Button')
        }
        catch (ex) {
            await actions.clickElement('click', cartClose, 'Cart Close Button')
        }
    }

    async getTimeline() {
        // await actions.pause(5000);
        const timelineURL = await browser.url()
        console.log("timelineURL: ", timelineURL)
        const timelineId = timelineURL.split('/')
        process.env.timeline = timelineId[4]
    }

    async continueBundle() {
        // await actions.waitFor(basicBundlescroll, 5000)
        await actions.waitForDisplayed(basicBundlescroll, 'basic bundle scroll')
        await actions.clickElement('click', bundleSubmit, "submit button in bundles page")
        // await actions.pause(3000)
        await actions.waitForDisplayed(TravelersPageHeading, 10000)
    }

    async selectBundles(bundleType) {
        if (bundleType === "Allegiant Total Bundle") {
            let mobileActiveVisibility = await actions.isDisplayed(mobileActivated, 'mobileActivated')
            if (mobileActiveVisibility) {
                await actions.clickElement('click', totalBundleMobileTab, "totalBundleMobileTab")
            }
            await actions.waitForDisplayed(selectTotalBundle, 'selectTotalBundle')
            await actions.clickElement('click', selectTotalBundle, "selectTotalBundle")
        }
        if (bundleType === "Allegiant Bonus Bundle") {
            // await browser.pause(2000)
            await actions.waitForDisplayed(bonusBundle, 'bonusBundle', 20000)
            await actions.scroll(basicBundlescroll)
            await actions.waitForClickable(bonusBundle, 'selectBonusBundle')
            await actions.clickElement('click', bonusBundle, "Bonus-Bundle-Button")
        }
    }
}

export { bundleItems, bundlePrice, bundlePageCollector }
export default new BundlesPage()