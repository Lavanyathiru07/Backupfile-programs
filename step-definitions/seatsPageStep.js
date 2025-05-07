import { When } from '@cucumber/cucumber';
import SeatPage from "../page-objects/seatsPageObject";

When(/^I am on Seat page I select seats for "([^"]*)"$/, {timeout: 180 * 1000 }, async function (params) {
	await SeatPage.selectSeatsByParams(params);
});

When(/^I am on Seat page I select seats of type "(.+)" on "(.+)" segment for "(.+)" travelers$/, async function (seatType, tripType, travelerNum) {
	await SeatPage.selectSeat(seatType, tripType, travelerNum);
});

When(/^I am on Seat page I click continue button$/, async function () {
	await SeatPage.clickContinueButton();
	await browser.pause(4000)
});

When(/^I am on Seat page I click No thanks, skip seat selection$/, async function () {
	await browser.pause(8000);
	await SeatPage.skipSeatsPage();
});

When(/^I am on Seat page I select star seat$/, async function () {
	await SeatPage.selectStarSeat();
});

When(/^I get seat detils from GQL$/, async function () {
	await SeatPage.getSeatDetails();
});
When(/^I select seat from GQL (.+)$/, { timeout: 180 * 10000 }, async function (params) {
	await SeatPage.selectSeatsByParamsByGQl(params);
});