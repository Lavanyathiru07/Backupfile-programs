import { When } from '@cucumber/cucumber';

When(/^I am on WWW Seat page I select seats for "([^"]*)"$/, async function (params) {
	await this.SeatPage.selectSeatsByParams(params);
});

When(/^I am on WWW Seat page I click continue button$/, async function () {
	await this.SeatPage.clickContinueButton();
});

When(/^I get seat detils from GQL$/, async function () {
	await this.SeatPage.getSeatDetails();
});

When(/^I select seat from GQL (.+)$/, { timeout: 180 * 10000 }, async function (params) {
	await this.SeatPage.selectSeatsByParamsByGQl(params);
});

When(/^I am on Seat page I click No thanks, skip seat selection$/, async function () {
	await this.SeatPage.skipSeatsPage();
});

When(/^I am on Seat page I select seats of type "(.+)" on "(.+)" segment for "(.+)" travelers$/, { timeout: 180 * 10000 }, async function (seatType, tripType, travelerNum) {
	await this.SeatPage.selectSeat(seatType, tripType, travelerNum);
});