import actions from '@g4/prova-ui/src/support/actions'
import check from '@g4/prova-ui/src/support/validations'
import { assert } from 'chai';

const personalItemIncluded = "[data-hook='ancillaries-page-personal-item_included']"
const carryOnIncluded = "[data-hook='ancillaries-page-carry-on_included']";
const travelerIncludedLabelSubTotal = "//span[contains(@data-hook,'ancillaries-page-traveler_')][contains(text(),'Included')]"
const ancillariesPageTotalPrice = "[data-hook='ancillaries-page-total-price']"
const checkedBagIncluded = "[data-hook='ancillaries-page-checked-bag_included']";
const bonusBundleBannerAncillaries = "[data-hook='ancillaries-page-bundle-banner_allegiant-bonus-bundle_image']"
const bonusBundleBannerTripflex = "//div[@data-hook='trip-flex-card']//div[@data-hook='bundle-header-image_allegiant-bonus-bundle-image']"
const bonusBundleBannerPriorityBoarding = "//div[@data-hook='priority-boarding-card']//div[@data-hook='bundle-header-image_allegiant-bonus-bundle-image']"
const totalBundleBannerAncillaries = "[data-hook='ancillaries-page-bundle-banner_allegiant-total-bundle_image']"
const totalBundleBannerTripflex = "//div[@data-hook='trip-flex-card']//div[@data-hook='bundle-header-image_allegiant-total-bundle-image']"
const totalBundleBannerPriorityBoarding = "//div[@data-hook='priority-boarding-card']//div[@data-hook='bundle-header-image_allegiant-total-bundle-image']"
const extrascroll = "[data-hook='extras-title']"
const bagsPagePrimaryTitle = "[data-hook='ancillaries-page_page-heading']";
const tripFlexIncluded = "//div[@data-hook='trip-flex-card']//span[@data-hook='extra-included-in-bundle']"
const priorityBoardingTotalBundleIncluded = "//div[@data-hook='priority-boarding-card']//span[@data-hook='extra-included-in-bundle']"
const boarding = "[data-hook='priority-boarding-card_add-to-cart']"
const scrollcheckedin = "[data-hook='ancillaries-page-subheader_carry-on']"
const carryonbags = "[data-hook='ancillaries-page-traveler_0_carry-on_increment']"
const checkedinbags = "[data-hook='ancillaries-page-traveler_0_checked-in_increment']"
const departingleg = "//div[@data-hook='extras-popup-flight-leg_departing']/div[2]/div[1]"
const returnleg = "//div[@data-hook='extras-popup-flight-leg_returning']/div[2]/div[1]"
const priority = "[data-hook='priority-boarding-modal_add-to-cart']"
const tripFlex = "[data-hook='trip-flex-card_add-to-cart']"
const tripflextitle = "[data-hook='trip-flex-card_title']"
const batteriesscroll = "[data-hook='prohibited-items-icon-label_lithium-battery']"
const continueb = "[data-hook='ancillaries-page_continue-popup']"
const continuebu = "[data-hook='ancillaries-page_continue']"
const popupContinueButton = "[data-hook='ancillaries-continue-popup_button_continue']"
const clickContinueButton = "//button[@data-hook='ancillaries-page_continue'] | //button[@data-hook='ancillaries-page_continue-popup']";
const travelerCount = "//span[@data-hook='header-flight-info_seated']"
const carryOnIncrementButtonSeg1 = "(//button[@data-hook='ancillaries-page-traveler_X_carry-on_increment'])[1]|(//button[@data-hook='ancillaries-page-carry-on_X_input_increment'])[1]";
const carryOnIncrementButtonSeg2 = "(//button[@data-hook='ancillaries-page-traveler_X_carry-on_increment'])[2]|(//button[@data-hook='ancillaries-page-carry-on_X_input_increment'])[2]";
const carryonBagCurrentValueSeg1 = "(//input[@data-hook='ancillaries-page-traveler_X_carry-on']|//input[@data-hook='ancillaries-page-carry-on_X_input'])[1]"
const carryonBagCurrentValueSeg2 = "(//input[@data-hook='ancillaries-page-traveler_X_carry-on']|//input[@data-hook='ancillaries-page-carry-on_X_input'])[2]"
const sameOptionsForAllFlight = "//label[contains(@data-hook,'ancillaries-page-clone-options-checkbox_label')]";
const checkedIncrementButtonSeg1 = "(//button[@data-hook='ancillaries-page-traveler_X_checked-in_increment'])[1]|(//button[@data-hook='ancillaries-page-checked-bag_X_input_increment'])[1]"
const checkedIncrementButtonSeg2 = "(//button[@data-hook='ancillaries-page-traveler_X_checked-in_increment'])[2]|(//button[@data-hook='ancillaries-page-checked-bag_X_input_increment'])[2]"
const carryOnPrice = "(//span[@data-hook='ancillaries-page-carry-on_price']|//span[@data-hook='cart-travelers_0_bags_carry-on_price'])[X]"
const checkedbagPrice = "(//span[@data-hook='cart-travelers_0_bags_checked-bag_price']|//span[@data-hook='ancillaries-page-checked-bag_price'])[X]"
const slider = "[data-hook='extras-carousel-marker_slide-X']"
const indicatorContainer = "//div[contains(@class,'AncillariesExtras__IndicatorContainer')]"
const extraTitle = "//span[@data-hook='extras-title']"
const tripFlexAddToCart = "[data-hook='trip-flex-card_add-to-cart']";
const tripFlexAdded = "[data-hook='trip-flex-card_cart-added']";
const priorityBoardingAddToCart = "[data-hook='priority-boarding-card_add-to-cart']";
const slider1 = "[data-hook='extras-carousel-marker_slide-1']"
const priorityBoardingModal = "[data-hook='priority-boarding-modal']";
const flightLegCheckboxLabel = "(//label[@data-hook='extras-popup-flight-leg_checkbox_label'])";
const priorityBoardingModalAddToCart = "//button[@data-hook='priority-boarding-modal_add-to-cart']"
const priorityBoardingAdded = "[data-hook='priority-boarding-card_cart-added']";
const petInCabinAddToCart = "[data-hook='pet-in-cabin-card_add-to-cart']";
const petInCabinModalAddToCart = "//button[@data-hook='pet-in-cabin-modal_add-to-cart']"
const petInCabinModal = "[data-hook='pet-in-cabin-modal']";
const petInCabinAdded = "[data-hook='pet-in-cabin-card_cart-added']";
const petInCabinReturningLeg = "[data-hook='extras-popup-flight-leg_returning']"
const spinnerBar = "//span[contains(@class,'Spinner')]"
const bundlebannerforCarryOnSelection = "[data-hook='ancillaries-page-bundle-banner_text']"
const petinCab = "//button[@data-hook='pet-in-cabin-card_add-to-cart']"
const petinCabselect = "//span[@data-hook='extras-popup-flight-leg_checkbox-label']"
const prohibiteditems = "//span[@data-hook='prohibited-items-title']";
var BagsPageCollector = new Map();
var bundleItems = []

class BagsPage {

	async selectCarryOn(paxNum, segment) {
		let carryonIncdepart = await $(carryOnIncrementButtonSeg1.replace(/X/g, paxNum - 1))
		let carryonCurrentVlaue = await $(carryonBagCurrentValueSeg1.replace(/X/g, paxNum - 1))
		let carryonIncreturn = await $(carryOnIncrementButtonSeg2.replace(/X/g, paxNum - 1))
		let carryonCurrentVlaueret = await $(carryonBagCurrentValueSeg2.replace(/X/g, paxNum - 1))
		if (segment === "both") {
			do {
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
		BagsPageCollector.set('carryOnPrice', (await $(carryOnPrice.replace(/X/g, 1)).getText()).split("$")[1])
	}

	async selectCheckedBag(checked, paxNum, segment) {
		let checkedincdepart = await $(checkedIncrementButtonSeg1.replace(/X/g, paxNum - 1))
		let checkedincreturn = await $(checkedIncrementButtonSeg2.replace(/X/g, paxNum - 1))
		await browser.execute("window.scrollBy(0,-100)");
		await actions.pause(1000)
		if (segment === "both") {
			for (var i = 0; i < checked; i++) {
				await actions.waitForClickable(checkedincdepart, "the button to increment the checkedin bags")
				await actions.scroll(checkedincdepart)
				await actions.waitForDisplayed(checkedincdepart, "increment button till it displayed")
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
		BagsPageCollector.set('checkedBagPrice', (await $(checkedbagPrice.replace(/X/g, 1)).getText()).split("$")[1])
	}

	async selectPriorityAccess(priorityAccess, paxNum, segment) {
		if (priorityAccess) {
			let slider1visbility = await actions.isDisplayed(slider1, 'extras button')
			if (slider1visbility) {
				await actions.waitForDisplayed(slider1, 'Extras button')
				await actions.waitForClickable(slider1, 'Extras button')
				await actions.clickElement('click', slider1, "Extras Button")
			}
			if(await actions.isEnabled(priorityBoardingAddToCart, 'AddToCart Button')){
			await actions.waitForClickable(priorityBoardingAddToCart, 'AddToCart Button')
			await actions.clickElement('click', priorityBoardingAddToCart, "Extras Button")
			await actions.waitForDisplayed(priorityBoardingModal, 'Priority access Modal')
			var pb = await browser.$$(flightLegCheckboxLabel);
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
	}

	async addExtras() {
		await actions.pause(4000)
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

	async selectingextraaccess() {
		await actions.scroll(extrascroll)
		await actions.clickElement('click', boarding, "boarding button")
		await actions.clickElement('click', departingleg, "departingleg checkbox")
		await actions.clickElement('click', returnleg, "returnleg checkbox")
		await actions.clickElement('click', priority, "priority access")
		await actions.clickElement('click', tripFlex, "tripflex selection")
	}

	async validateBagsPagePrimaryTitle(BagsPagePrimaryTitle) {
		assert.equal(
			await actions.getText(bagsPagePrimaryTitle, 'Bags Page Primary Title'),
			BagsPagePrimaryTitle,
			'Bags page primary title not displayed in booking path'
		);
	}

	async validateBundleIncludedMessage(message, bundleType) {
		if (bundleItems.includes("onepersonal_item")) {
			assert.equal(
				await actions.getText(personalItemIncluded, 'personalItemIncluded'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' personal item included'
			)
		}
		if (bundleItems.includes("carryon")) {
			assert.equal(
				await actions.getText(carryOnIncluded, 'carryOnIncluded'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' carry on included'
			)
			var travelerIncludedLabel = await browser.$$(travelerIncludedLabelSubTotal)
			for (var i = 0; i < travelerIncludedLabel.length; i++) {
				assert.equal(
					await travelerIncludedLabel[i].getText(),
					message,
					'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' for each traveler included label under subTotal'
				)
			}
			assert.equal(
				await actions.getText(ancillariesPageTotalPrice, 'ancillariesPageTotalPrice'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' included Label against bags pay now'
			)
		}
		if (bundleItems.includes("checked_bag")) {
			assert.equal(
				await actions.getText(checkedBagIncluded, 'checkedBagIncluded'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' checked bag included'
			)
			var travelerIncludedLabel = await browser.$$(travelerIncludedLabelSubTotal)
			for (var i = 0; i < travelerIncludedLabel.length; i++) {
				assert.equal(
					await travelerIncludedLabel[i].getText(),
					message,
					'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' for each traveler included label under subTotal'
				)
			}
			assert.equal(
				await actions.getText(ancillariesPageTotalPrice, 'checkedBagIncluded'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' included Label against bags pay now'
			)
		}
		if (bundleItems.includes("tripflex")) {
			assert.equal(
				await actions.getText(tripFlexIncluded, 'tripFlexIncluded'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' for priorityaccess'
			)
		}
		if (bundleItems.includes("priorityaccess")) {
			assert.equal(
				await actions.getText(priorityBoardingTotalBundleIncluded, 'priorityBoardingTotalBundleIncluded'),
				message,
				'Validation failed: INCLUDED message is not displayed for ' + bundleType + ' for priorityaccess'
			)
		}
	}

	async validateBundleBanner(bundleType) {
		if (bundleType === "Allegiant Bonus Bundle") {
			if (bundleItems.includes("onepersonal_item") || bundleItems.includes("carryon")
				|| bundleItems.includes("checked_bag")) {
				assert.equal(
					await actions.isDisplayed(bonusBundleBannerAncillaries, 'bonusBundleBannerAncillaries'),
					true,
					'Validation failed: bonus Bundle Banner above bags grid not displayed'
				)
			}
			if (bundleItems.includes("tripflex")) {
				assert.equal(
					await actions.isDisplayed(bonusBundleBannerTripflex, 'bonusBundleBannerTripflex'),
					true,
					'Validation failed: bonus Bundle Banner tripflex not displayed'
				)
			}
			if (bundleItems.includes("priorityaccess")) {
				assert.equal(
					await actions.isDisplayed(bonusBundleBannerPriorityBoarding, 'bonusBundleBannerPriorityBoarding'),
					true,
					'Validation failed: bonus Bundle Banner priorityaccess not displayed'
				)
			}
		}
		else {
			if (bundleItems.includes("onepersonal_item") || bundleItems.includes("carryon")
				|| bundleItems.includes("checked_bag")) {
				assert.equal(
					await actions.isDisplayed(totalBundleBannerAncillaries, 'totalBundleBannerAncillaries'),
					true,
					'Validation failed: total Bundle Banner above bags grid not displayed'
				)
			}
			if (bundleItems.includes("tripflex")) {
				assert.equal(
					await actions.isDisplayed(totalBundleBannerTripflex, 'totalBundleBannerTripflex'),
					true,
					'Validation failed: total Bundle Banner tripflex not displayed'
				)
			}
			if (bundleItems.includes("priorityaccess")) {
				assert.equal(
					await actions.isDisplayed(totalBundleBannerPriorityBoarding, 'totalBundleBannerPriorityBoarding'),
					true,
					'Validation failed: total Bundle Banner priorityaccess not displayed'
				)
			}
		}
	}

	async selectCarryOnBagByParams(params) {
		await actions.pause(3000)
		if (!params.includes("false")) {
			try {
				await actions.pause(2000)
				let bundleBannerVisibilty = await actions.isDisplayed(bundlebannerforCarryOnSelection, 'bundlebannerforCarryOnSelection')
				if (bundleBannerVisibilty) {
					console.log("Can't select the carryon Bags since it got selected automatically because we have opted Bonus and Total Bundle")
				}
			} catch (error) {
				console.log("Bundle is not selected. So carryon is not included")
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
		}
	}
	async selectCheckedBagByParams(params) {
		if (!params.includes("false")) {
			var paxNum = params.split(' ')[0].split('-')[1]
			var segment = params.split(' ')[1].split('-')[1]
			var checked = params.split(' ')[2].split('-')[1]
			if (paxNum.includes("all")) {
				await actions.waitForDisplayed(travelerCount, 'seat info on header')
				var all = (await $(travelerCount).getText()).split(' ')[0]
				for (var i = 1; i <= all; i++) {
					await this.selectCheckedBag(checked, Number(i), segment)
				}
			} else {
				await this.selectCheckedBag(checked, paxNum, segment)
			}
		}
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

	async carryOnBagsInc() {
		await actions.scroll(scrollcheckedin)
		await actions.clickElement('click', carryonbags, "Button to increment the carry-on bags")
	}

	async checkedInBagsInc() {
		await actions.clickElement('click', checkedinbags, "Button to increment the checked-in bags")
	}

	async continueButt() {
		await actions.scroll(batteriesscroll)
		await actions.clickElement('click', continueb, "continue-button")
		if (await actions.isDisplayed(popupContinueButton, "continue button to close the popup")) {
			await actions.clickElement('click', popupContinueButton, "pop-up button for continue")
		}
	}

	async clickContinueButton() {
		await actions.waitForDisplayed(batteriesscroll, 'batteriesscroll', 20000)
		await actions.scroll(batteriesscroll)
		await actions.waitForDisplayed(clickContinueButton, 'Continue button in BAGS PAGE', 10000)
		await actions.waitForClickable(clickContinueButton, 'Continue button in BAGS PAGE')
		await actions.scroll(clickContinueButton)
		await actions.clickElement('click', clickContinueButton, 'Continue button in BAGS PAGE')
		await actions.pause(10000)
		let popupContinueBtnVisibility = await actions.isDisplayed(popupContinueButton, "continue button to close the popup")
		console.log("popupContinueBtnVisibility: ", popupContinueBtnVisibility)
		if (popupContinueBtnVisibility) {
			await actions.waitForClickable(popupContinueButton, 'popupContinueButton')
			await actions.clickElement('click', popupContinueButton, "pop-up button for continue")
		}
		await actions.pause(10000)
	}

	async continueButton() {
		await actions.pause(4000)
		await actions.scroll(batteriesscroll)
		await actions.clickElement('click', continuebu, "continue-button")
	}
	async selectPetInCabinByParams(params) {
		if (!params.includes("false")) {
			var paxNum = params.split(' ')[0].split('-')[1]
			var segment = params.split(' ')[1].split('-')[1]
			await this.selectPetInCabin(true, paxNum, segment)
		}
	}

	async selectpetinCab(petc,paxNum){
		if(petc == 'yes'){
		browser.pause(1000);
		// $(petinCab).click();
		await actions.clickElement('click', petinCab, 'PET in Cab')
		browser.pause(3000);
		// $(petinCabselect).isDisplayed();
		await actions.isDisplayed(petinCabselect, 'petinCabselect')
		// $(petinCabselect).isClickable();
		await actions.waitForClickable(petinCabselect, 'petinCabselect')
		// $(petinCabselect).click();
		await actions.clickElement('click', petinCabselect, 'PET in Cab Select')
		browser.pause(1000);
		// $(petInCabinModalAddToCart).click();
		await actions.clickElement('click', petInCabinAddToCart, 'petInCabinAddToCart')
		}
		browser.pause(3000);
		await actions.scroll(prohibiteditems)
		// $(prohibiteditems).scrollIntoView();
	}

	async selectPetInCabin(petInCabin, paxNum, segment) {
		if (petInCabin) {
			await actions.waitForClickable(petInCabinAddToCart, 'petInCabinAddToCart')
			await actions.clickElement('click', petInCabinAddToCart, 'petInCabinAddToCart')
			var PETC = await browser.$$(flightLegCheckboxLabel);
			console.log("PETC: " + PETC.length)
			let petInCabinModalIsDisplayed = await actions.isDisplayed(petInCabinModal, 'petInCabinModal')
			if (petInCabinModalIsDisplayed) {
				if (segment === "both") {
					if (paxNum === "all") {
						for (var i = 0; i < (PETC.length / 2); i++) {
							await actions.waitFor(PETC[i])
							await actions.waitForClickable(PETC[i], 'PETC')
							await actions.clickElement('click', PETC[i], 'PETC')
						}
					}
					else {
						for (var i = 0; i < PETC.length; i++) {
							if (parseInt(paxNum) - 1 === i) {
								await actions.waitFor(PETC[i])
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
								await actions.waitFor(PETC[i])
								await actions.waitForClickable(PETC[i], 'PETC')
								await actions.clickElement('click', PETC[i], 'PETC')
							}
							for (var i = PETC.length - 1; i >= PETC.length / 2; i--) {
								await actions.waitFor(PETC[i])
								await actions.waitForClickable(PETC[i], 'PETC')
								await actions.clickElement('click', PETC[i], 'PETC')
							}
						}
						else {
							for (var i = 0; i < PETC.length; i++) {
								if (parseInt(paxNum) - 1 === i) {
									await actions.waitFor(PETC[i])
									await actions.waitForClickable(PETC[i], 'PETC')
									await actions.clickElement('click', PETC[i], 'PETC')
								}
							}
							for (var i = 0; i < PETC.length; i++) {
								if (((PETC.length / 2) + parseInt(paxNum)) - 1 === i) {
									await actions.waitFor(PETC[i])
									await actions.waitForClickable(PETC[i], 'PETC')
									await actions.clickElement('click', PETC[i], 'PETC')
								}
							}
						}
					}
					else {
						if (paxNum === "all") {
							for (var i = 0; i < PETC.length; i++) {
								await actions.waitFor(PETC[i])
								await actions.waitForClickable(PETC[i], 'PETC')
								await actions.clickElement('click', PETC[i], 'PETC')
							}
						}
						else {
							for (var i = 0; i < PETC.length; i++) {
								if (parseInt(paxNum) - 1 === i) {
									console.log("loop")
									await actions.waitFor(PETC[i])
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
