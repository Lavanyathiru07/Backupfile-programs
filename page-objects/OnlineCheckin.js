import actions from "@g4/prova-ui/src/support/actions"
import { assert } from 'chai';
const continueButton = "//button[@class='continue'] | //button[text()='Check-In']"
const manageTravelPageCheckedBagCount = "(//td[@data-th='Checked Bags'][not(contains(@class,'allegiant_chooser_link'))]//span)[X]"
const checkinstatus = "//*[text()='Checked-in']"
const currentAutoAssignSeat = "(//div[@class='original_seat_id'])[X]"
const travelerList = "//div//a[contains(@class,'multiple_seats traveller allegiant_models_traveller')][4]"
const iAgreeCovidPolicyCheckBox = "//*[@class='touch-friendly-checkbox small']"

const title = "//title"
class OnlineCheckin {
	async clickContinueButton() {
		do {
			await browser.switchWindow('/online-checkin');
			console.log("Title: " + (await actions.getText(title, 'title')))
		} while ((await actions.getText(title, 'title')) === 'Manage Travel My Trip | Allegiant Air')
		await browser.execute("window.scrollBy(0,1000)");
		await actions.waitForClickable(continueButton, 'continueButton')
		await actions.clickElement('click', continueButton, 'continueButton')
	}

	// async selectCovidRestrictedArticalPolicy() {
	// 	try {
	// 		await actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox');
	// 		await actions.waitForClickable(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
	// 		await actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'AgreeCovidPolicyCheckBox')
	// 	} catch (ex) {
	// 		console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
	// 	}
	// }
	async selectCovidRestrictedArticalPolicy() {
		try {
			let covidPolicyPopUP = await actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
			if(covidPolicyPopUP) {
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

	async clickCheckinButton() {
		await browser.execute("window.scrollBy(0,1000)");
		await actions.waitForClickable(continueButton, 'continueButton')
		await actions.clickElement('click', continueButton, 'continue Button')
	}
	async validateProductDetails(product, paxNum) {
		await actions.pause(3000)
		if (product.includes("checked")) {
			await assert.equal(
				(await $(manageTravelPageCheckedBagCount.replace("X", paxNum)).getText()).replace(/ /g, ''),
				product.split(' ')[0],
				'Validation failed: Mismatch in OLCI CheckedBag Count'
			);
		}
	}

	async validateSeatsAutoAssigned() {
		var totalTravelers = await browser.$$(travelerList)
		for (var i = 1; i <= totalTravelers.length; i++) {
			await assert.equal(
				$(currentAutoAssignSeat.replace("X", i + 1)).isDisplayed(),
				true,
				'Validation failed: OLCI Auto Seat not assigned');
		}
	}

	async validateCheckInStatus() {
		await actions.pause(2000);
		if (await actions.isDisplayed(checkinstatus, 'checkinstatus')) {
			await actions.focusLastOpenedWindow()
			console.log("Checkin Passed")
		} else {
			console.log("Check in Failed");
		}
	}
}

export default new OnlineCheckin();