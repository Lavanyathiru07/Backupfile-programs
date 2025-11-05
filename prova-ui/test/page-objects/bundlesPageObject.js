const Actions = require("../../src/support/actions")

const { flightPageCollector } = require('./flightsPageObject')
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
    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
    }

    async selectingBundle() {
        await this.actions.scroll(basicBundlescroll)
        await this.actions.clickElement('click', bundleSubmit, "submit button in bundles page")
    }

    async validateFlightDetailsFromTripSummary() {
        await this.actions.waitUntilPageLoad()
        // await this.actions.waitFor(bundleHeader, 20000, '', true, 'bundle header')
        await this.actions.waitForDisplayed(bundleHeader, 'bundleHeader')
        await this.actions.waitForDisplayed(headerCartButton, 'headerCartButton')
        await this.actions.waitForClickable(headerCartButton, 'headerCartButton')
        await this.actions.clickElement('click', headerCartButton, 'Header Cart Button')
        var departFlightFare = parseFloat(flightPageCollector.get('departFlightFare'))
        var returnFlightFare = parseFloat(flightPageCollector.get('returnFlightFare'))
        if (isNaN(returnFlightFare)) {
            returnFlightFare = 0
        }
        if (isNaN(returnFlightFare)) {
            returnFlightFare = 0
        }
        // await this.actions.pause(3000)
        await this.actions.scroll(tripTotalValue)
        await this.actions.waitForDisplayed(tripTotalValue, 'tripTotalValue')
        console.log("tripTotalValue " + (await this.actions.getText(tripTotalValue, 'trip total value')).split('$')[1])
        console.log("departFlightFare " + departFlightFare)
        console.log("returnFlightFare " + returnFlightFare)
        console.log("calculations " + (parseFloat(departFlightFare) + parseFloat(returnFlightFare)) * parseInt((await this.actions.getText(SeatedPaxCount, 'seated pax count')).split(' ')[0]))

        try {
            await this.actions.waitUntil(flightFareWithoutTax, 'flightFareWithoutTax button')
            bundlePageCollector.set('flightFareWithoutTax', (await this.actions.getText(flightFareWithoutTax, 'flight fare without tax')).split('$')[1])
            await this.actions.waitForDisplayed(governmentTaxesAndFees, 'governmentTaxesAndFees')
            console.log("govt Fee is " + (await this.actions.getText(governmentTaxesAndFees, 'govt taxes and fees')).split('$')[1]);
            await this.actions.clickElement('click', governmentTaxesAndFees, 'governmentTaxesAndFees')
            if (await this.actions.isDisplayed(pfc, 'pfc value')) {
                await this.actions.scroll(pfc)
                await this.actions.waitForDisplayed(pfc, 'pfc')
                bundlePageCollector.set('governmentTaxesAndFees', (await this.actions.getText(governmentTaxesAndFees, 'govt taxes and fees')).split('$')[1])
                bundlePageCollector.set('pfc', (await this.actions.getText(pfc, 'pfc')).split('$')[1])
            }
            else {
                bundlePageCollector.set('governmentTaxesAndFees', (await this.actions.getText(governmentTaxesAndFees, 'govt taxes and fees')).split('$')[1])
            }
            await this.actions.waitForDisplayed(securityFees, 'securityFees')
            console.log("securityFees: ", (await this.actions.getText(securityFees, 'security fees')).split('$')[1])
            bundlePageCollector.set('securityFees', (await this.actions.getText(securityFees, 'security fees')).split('$')[1])
        }
        catch (ex) {
            console.log("exception while collecting tax details " + ex)
        }
        try {
            await this.actions.clickElement('click', headerCartButton, 'Header Cart Button')
        }
        catch (ex) {
            await this.actions.clickElement('click', cartClose, 'Cart Close Button')
        }
    }

    async getTimeline() {
        // await this.actions.pause(5000);
        const timelineURL = await this.actions.getUrl()
        console.log("timelineURL: ", timelineURL)
        const timelineId = timelineURL.split('/')
        process.env.timeline = timelineId[4]
    }

    async continueBundle() {
        // await this.actions.waitFor(basicBundlescroll, 5000)
        await this.actions.waitForDisplayed(basicBundlescroll, 'basic bundle scroll')
        await this.actions.clickElement('click', bundleSubmit, "submit button in bundles page")
        // await this.actions.pause(3000)
        await this.actions.waitForDisplayed(TravelersPageHeading, 10000)
    }

    async selectBundles(bundleType) {
        if (bundleType === "Allegiant Total Bundle") {
            let mobileActiveVisibility = await this.actions.isDisplayed(mobileActivated, 'mobileActivated')
            if (mobileActiveVisibility) {
                await this.actions.clickElement('click', totalBundleMobileTab, "totalBundleMobileTab")
            }
            await this.actions.waitForDisplayed(selectTotalBundle, 'selectTotalBundle')
            await this.actions.clickElement('click', selectTotalBundle, "selectTotalBundle")
        }
        if (bundleType === "Allegiant Bonus Bundle") {
            // await browser.pause(2000)
            await this.actions.waitForDisplayed(bonusBundle, 'bonusBundle', 20000)
            await this.actions.scroll(basicBundlescroll)
            await this.actions.waitForClickable(bonusBundle, 'selectBonusBundle')
            await this.actions.clickElement('click', bonusBundle, "Bonus-Bundle-Button")
        }
    }
}

module.exports = BundlesPage
module.exports.bundleItems = bundleItems
module.exports.bundlePrice = bundlePrice
module.exports.bundlePageCollector = bundlePageCollector