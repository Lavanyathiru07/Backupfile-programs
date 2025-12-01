import { When } from '@cucumber/cucumber';
import SeatPage from "../page-objects/seatsPagePlaywrightObject";

When(/^I am on WWW Seat page I select seats for "([^"]*)"$/, async function (params) {
	await SeatPage.selectSeatsByParams(params);
});

When(/^I am on WWW Seat page I click continue button$/, async function () {
	await SeatPage.clickContinueButton();
});

When(/^I get seat detils from GQL$/, async function () {
	await SeatPage.getSeatDetails();
});

When(/^I select seat from GQL (.+)$/, { timeout: 180 * 10000 }, async function (params) {
	await SeatPage.selectSeatsByParamsByGQl(params);
});

When(/^I am on Seat page I click No thanks, skip seat selection$/, async function () {
	await SeatPage.skipSeatsPage();
});

When(/^I am on Seat page I select seats of type "(.+)" on "(.+)" segment for "(.+)" travelers$/, async function (seatType, tripType, travelerNum) {
	await SeatPage.selectSeat(seatType, tripType, travelerNum);
});