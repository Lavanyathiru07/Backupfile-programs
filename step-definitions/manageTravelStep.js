import { Then, When } from '@cucumber/cucumber'
import OnlineCheckin from '../page-objects/OnlineCheckin'
import Managetravel from '../page-objects/manageTravel'
import PaymentPage from '../page-objects/paymentPageObj';

Then(/^I click on the online-checkin$/, async () => {
	await Managetravel.onlineCheckin()
})

Then(/^I am on Manage Travel page I expect flight details are displayed correctly$/, async () => {
	await Managetravel.validateFlightDetails()
});

When(/^I am on Manage Travel, Seats page I click continue button$/, async () => {
	await Managetravel.ContinueButton("Seats")
});

When(/^I am on Manage Travel page I add "([^"]*)" for traveler "([^"]*)"$/, async function (product, paxNum) {
	await Managetravel.addProduct(product, paxNum)
});

When(/^I am on Manage Travel page, (.+) page I click on continue button$/, { timeout: 180 * 16000 }, async function (page) {
	await OnlineCheckin.selectCovidRestrictedArticalPolicy()
	await Managetravel.ContinueButton(page)
});

When(/^I am on Manage Travel page, (.+) page I click on continue button only$/, { timeout: 180 * 16000 }, async function (page) {
	await OnlineCheckin.selectCovidRestrictedArticalPolicy()
	await Managetravel.ContinueButtonBags(page)
});

Then(/^I click on the Add or Change-Seats$/, async () => {
	await Managetravel.seatsnbagssel()
})

Then(/^I click on the Add or Change-Bags$/, async () => {
	await Managetravel.bagsnseatssel()
})

When(/^I am on Manage Travel page, I add a car$/, async function () {
	await Managetravel.clickAddaCar()
});

Then(/^I select the extra bags$/, async () => {
	await Managetravel.addorchangebags()
})

When(/^I am on Manage Travel Seats page, I Select Seat$/, async function () {
	await Managetravel.selectSeatsRandomly();
});

When(/^I click on the continue button in managetravels seat page$/, async function () {
	await Managetravel.seatsContinue();
});

When(/^I click on the continue button in managetravel seats page for bag selection$/, async function () {
	await Managetravel.seatsContinuegreen();
});

When(/^I click on the continue button of bags and boarding in managetravels$/, async function () {
	await Managetravel.bagsContinue();
});

When(/^I click on the continue button of hotel in managetravels$/, async function () {
	await Managetravel.hotelsContinue();
});

When(/^I click on the continue button for transportation$/, async function () {
	await Managetravel.carsContinue();
});

Then(/^I am on Manage Travel page, I click InfantinLap traveler$/, async function () {
await Managetravel.clickAddInfantinLap()
})
When (/^I am on Manage Travel page, I click updateseats link$/,async function () {
await Managetravel.clickUpdateseats()
})


When(/^I am on Manage Travel page, Payment page I complete payment$/, { timeout: 180 * 10000 }, async function () {
	await PaymentPage.popupClosing()
	let negPayment = await Managetravel.negativePayment()
	if (negPayment === false) {
		await PaymentPage.cardDetails();
		await PaymentPage.billingaddress();
		await Managetravel.purchasemytrip();
	}
});
When(/^I am on Manage Travel page, validate seat selection$/, async function() {
  await Managetravel.seatassigned()
})

When(/^I am on Manage Trip and I click change flight$/, async function () {
	await Managetravel.clickChangeDate();
});

When(/^I entered the required billing address details in manage travel page$/, async function () {
	await Managetravel.billingaddress();
});

When(/^I click on the pay and continue$/, async function () {
	await Managetravel.purchasemytrip();
});

Then(/^I am on Manage Travel page, I expect "([^"]*)" is updated correctly for traveler "([^"]*)"$/, async function (product, paxNum) {
	await Managetravel.validateProductDetails(product, paxNum)
});

// When(/^I am on Manage Travel onlinechekin page, "([^"]*)" page I click on continue button$/, { timeout: 180 * 16000 } , async function (page) {
// 	await OnlineCheckin.selectCovidRestrictedArticalPolicy()
// 	await Managetravel.ContinueButton(page)
// });

Then(/^I am on Manage Travel page I cancel my Trip$/, async () => {
	await Managetravel.cancelMyTrip()
});

When(/^I am on Manage Travel onlinechekin page, (.+) page I click on continue button$/, async function (page) {	
	await Managetravel.onlinecheckinbagspage();
	await OnlineCheckin.selectCovidRestrictedArticalPolicy()
});

When(/^I am on Manage Travel onlinechekin page (.+) page I click on continue button$/, async function (page) {
	await Managetravel.onlinecheckinseatspage();
});

When(/^I am on Manage Trip and I click cancel flight$/, async function () {	
    await Managetravel.clickCancelFlight();
    await Managetravel.clickCancelReason();
    await Managetravel.clickCancelProceed();
});