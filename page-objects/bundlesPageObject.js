import actions from '@g4/prova-ui/src/support/actions'

import { flightPageCollector } from './flightsPageObject'
const totalBundleCheckedBagCount = "[data-hook='item-amount_allegiant_total_bundle_checked_bag']";
const pfc = "//span[@data-hook='price-breakdown_pfc_value']"
const mobileActivated = "[data-hook='bundle-activated-mobile']"
const totalBundleMobileTab = "//button[@id='Tab-2']"
const basicBundlescroll = "[data-hook='text-below-strikethrough-price_allegiant_basic_bundle']"
const selectBonusBundle = "//button[@data-hook='select-tier-2']//span";
const selectTotalBundle = "//button[@data-hook='select-tier-3']//span";
const bonusBundle = "[data-hook='select-tier-2']"
const bundleSubmit = "[data-hook='bundles-page_continue']"
const headerCartButton = "[data-hook='header-cart-button_price']"
const tripTotalValue = "[data-hook='cart-total_value']"
const securityFees = "//span[@data-hook='price-breakdown_911-security_value']"
const flightFareWithoutTax = "[data-hook='cart-item_flight-package_value']"
const governmentTaxesAndFees = "//span[@data-hook='price-breakdown_government-taxes-fees_value']"
const cartClose = "[data-hook='cart-close']"
const SeatedPaxCount = "//span[@data-hook='header-flight-info_seated']"
const totalBundlePrice = "[data-hook='bundle-price_allegiant_total_bundle']";
const bundleHeader = "[data-hook='bundles-page_page-heading']"
const bonusBundlePrice = "//span[@data-hook='bundle-price_allegiant_bonus_bundle']//span"
const totalBundleFare = "//span[@data-hook='bundle-price_allegiant_total_bundle']//span"
const basicBundleItems = "//*[contains(@data-hook,'checkmark_allegiant_basic_bundle_')]"
const bonusBundleItems = "//*[contains(@data-hook,'checkmark_allegiant_bonus_bundle_')]"
const totalBundleItems = "//*[contains(@data-hook,'checkmark_allegiant_total_bundle_')]|//span[@data-hook='item-amount_allegiant_total_bundle_checked_bag']"
const TravelersPageHeading = "[data-hook='travelers-page_page-heading']"
var bundlePageCollector = new Map();
var bundleItems = []
var bundlePrice

class BundlesPage {

    async validateFlightDetailsFromTripSummary() {
        await actions.waitForDisplayed(bundleHeader, 'bundleHeader', 30000)
        await actions.waitForDisplayed(headerCartButton, 'header cart button', 10000)
        await actions.waitForClickable(headerCartButton, 'header cart button')
        await actions.clickElement('click', headerCartButton, 'Header Cart Button')
        var departFlightFare = parseFloat(flightPageCollector.get('departFlightFare'))
        var returnFlightFare = parseFloat(flightPageCollector.get('returnFlightFare'))
        if (isNaN(returnFlightFare)) {
            returnFlightFare = 0
        }
        if (isNaN(returnFlightFare)) {
            returnFlightFare = 0
        }
        await actions.pause(3000)
        await actions.scroll(tripTotalValue,'tripTotalValue')
        await actions.waitForDisplayed(tripTotalValue, 'tripTotalValue button')
        console.log("tripTotalValue " + (await $(tripTotalValue).getText()).split('$')[1])
        console.log("departFlightFare " + departFlightFare)
        console.log("returnFlightFare " + returnFlightFare)
        console.log("calculations " + (parseFloat(departFlightFare) + parseFloat(returnFlightFare)) * parseInt((await $(SeatedPaxCount).getText()).split(' ')[0]))

        try {
            await actions.waitUntil(flightFareWithoutTax, 'flightFareWithoutTax button')
            bundlePageCollector.set('flightFareWithoutTax', (await $(flightFareWithoutTax).getText()).split('$')[1])
            await actions.waitForDisplayed(governmentTaxesAndFees, 'governmentTaxesAndFees')
            console.log("govt Fee is " + (await $(governmentTaxesAndFees).getText()).split('$')[1]);
            await actions.clickElement('click', governmentTaxesAndFees, 'governmentTaxesAndFees')
            if (await actions.isDisplayed(pfc, 'pfc value')) {
                await actions.scroll(pfc,'pfc')
                await actions.waitForDisplayed(pfc, 'pfc')
                bundlePageCollector.set('governmentTaxesAndFees', (await $(governmentTaxesAndFees).getText()).split('$')[1])
                bundlePageCollector.set('pfc', (await $(pfc).getText()).split('$')[1])
            }
            else {
                bundlePageCollector.set('governmentTaxesAndFees', (await $(governmentTaxesAndFees).getText()).split('$')[1])
            }
            await actions.waitForDisplayed(securityFees, 'securityFees')
            console.log("securityFees: ", (await $(securityFees).getText()).split('$')[1])
            bundlePageCollector.set('securityFees', (await $(securityFees).getText()).split('$')[1])
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
		await actions.pause(2000);
		const timelineURL = await browser.getUrl()
		console.log("timelineURL: ", timelineURL)
		const timelineId = timelineURL.split('/')
		process.env.timeline = timelineId[4]
	}
    
    async collectBundleItems(bundleType) {
        var itemsCount
        do {
            bundleItems.pop()
        } while (bundleItems.length > 0)

        if (bundleType === "Allegiant Bonus Bundle") {
            itemsCount = await browser.$$(bonusBundleItems)
            bundlePrice = await actions.getText(bonusBundlePrice, 'Bonus Bundle Price')
        }
        if (bundleType === "Allegiant Total Bundle") {
            itemsCount = await browser.$$(totalBundleItems)
            bundlePrice = await actions.getText(totalBundleFare, 'Total Bundle Price')
        }
        if (bundleType.includes("Basic")) {
            itemsCount = await browser.$$(basicBundleItems)
            bundlePrice = 0;
        }
        for (var i = 0; i < itemsCount.length; i++) {
            bundleItems.push((await itemsCount[i].getAttribute('data-hook')).slice(33).replace("_", ""))
        }
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
            await this.bundleScroll();
            // await browser.pause(2000)
            // await browser.pause(2000)
            await actions.waitForDisplayed(bonusBundle, 'bonusBundle', 20000)
            await actions.waitForClickable(bonusBundle, 'selectBonusBundle')
            await actions.clickElement('click', bonusBundle, "Bonus-Bundle-Button")
        }
    }

    async collectBundleItems(bundleType) {
        var itemsCount
        do {
            bundleItems.pop()
        } while (bundleItems.length > 0)

        if (bundleType === "Allegiant Bonus Bundle") {
            itemsCount = await browser.$$(bonusBundleItems)
            await actions.getText(bonusBundlePrice, 'bonusBundlePrice')
        }
        if (bundleType === "Allegiant Total Bundle") {
            itemsCount = await browser.$$(totalBundleItems)
            await actions.getText(totalBundleFare, 'totalBundleFare')
        }
        if (bundleType.includes("Basic")) {
            itemsCount = await browser.$$(basicBundleItems)
            bundlePrice = 0;
        }
        for (var i = 0; i < itemsCount.length; i++) {
            bundleItems.push((await itemsCount[i].getAttribute('data-hook')).slice(33).replace("_", ""))
        }
    }

    async bonusBundleSelection() {
        await actions.scroll(basicBundlescroll)
        await actions.clickElement('click', bonusBundle, "Bonus-Bundle-Button")
    }
    
    async continueBundle() {
        await this.bundleScroll();
        await actions.waitForDisplayed(bundleSubmit, 'bundleSubmit', 15000)
        await actions.waitForClickable(bundleSubmit, 'bundleSubmit', 5000)
        await actions.clickElement('click', bundleSubmit, "submit button in bundles page")
        await actions.waitForDisplayed(TravelersPageHeading, 'Travelers Page Heading', 60000)
    }
    
    async bundleScroll()
    {
        let bonusBundleScroll = "[data-hook='text-below-strikethrough-price_allegiant_bonus_bundle'],[data-hook='select-tier-2']"
        let totalBundleScroll = "[data-hook='text-below-strikethrough-price_allegiant_total_bundle'], [data-hook='select-tier-3']"
        await actions.waitForDisplayed(bonusBundle, 'bonusBundle', 20000)
        browser.pause(5000);
        if (await actions.isDisplayed(basicBundlescroll)) {
            await actions.scroll(basicBundlescroll)
        }
        else if (await actions.isDisplayed(bonusBundleScroll)) {
            await actions.scroll(bonusBundleScroll)
        }
        else {
            await actions.scroll(totalBundleScroll);
        }

    }
}

export { bundleItems, bundlePrice, bundlePageCollector }
export default new BundlesPage()
