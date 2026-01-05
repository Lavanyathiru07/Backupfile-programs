import { When } from '@cucumber/cucumber';
import SeatPage from "../page-objects/seatsPageObject";

When(/^I am on Seat page I select seats for "([^"]*)"$/, async function (params) {
	await SeatPage.selectSeatsByParams(params);
});

When(/^I am on Seat page I click continue button$/, async function () {
	await SeatPage.clickContinueButton();
	await browser.pause(4000)
});