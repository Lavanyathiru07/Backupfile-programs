import { Given, When, Then } from '@cucumber/cucumber';
import Actions from '../../src/support/actions';
import Managetravel from '../page-objects/manageTravelPlaywrightObject'
import PaymentPage from '../page-objects/paymentPagePlaywrightObj';
import HomePage from '../page-objects/homePagePlaywrightObject'
import checkinPage from '../page-objects/checkinPlaywrightObject';

Then(/^I am on Manage Travel page I cancel my Trip$/, async () => {
    await Managetravel.cancelMyTrip()
});

When(/^I am on Manage Travel page, I add a car$/, async function () {
    await Managetravel.clickAddaCar()
});

When(/^I am on Manage Travel page, Payment page I complete payment$/, { timeout: 180 * 10000 }, async function () {
    await PaymentPage.popupClosing()
    await PaymentPage.cardDetails();
    await PaymentPage.billingaddress();
    await Managetravel.purchasemytrip();
});

When(/^I am on Manage Trip and I click cancel flight$/, async function () {
    await Managetravel.cancelMyTrip()
});

When(/^I am on Manage Travel page I add "([^"]*)" for traveler "([^"]*)"$/, async function (product, paxNum) {
	await Managetravel.addProduct(product, paxNum)
});

When(/^I am on Manage Travel page, (.+) page I click on continue button$/, { timeout: 180 * 16000 }, async function (page) {
	await Managetravel.selectCovidRestrictedArticalPolicy()
	await Managetravel.ContinueButton(page)
});

When(/^I am on Manage Trip and I click change flight$/, async function () {
	await Managetravel.clickChangeDate();
});

When(/^I am on MT landing page I choose the departure date "(.+)" days from current day$/, async (number) => {
    await HomePage.openDepartureDateCalendar()
    if (process.env.ENV.includes("prod") || process.env.tag.includes("prod")) {
        departureDate = await HomePage.chooseDepartingDate(18);
    } else {
        await Actions.setWindowSize(2700, 2700)
        departureDate = await HomePage.chooseDepartingDate(number);
    }
});

Then(/^I am on Manage Travel page, I expect "([^"]*)" is updated correctly for traveler "([^"]*)"$/, async function (product, paxNum) {
	await Managetravel.validateProductDetails(product, paxNum)
});

When(/^I am on Manage Travel page, (.+) page I click on continue button only$/, { timeout: 180 * 16000 }, async function (page) {
	await checkinPage.selectCovidRestrictedArticalPolicy()
	await Managetravel.ContinueButtonBags(page)
});