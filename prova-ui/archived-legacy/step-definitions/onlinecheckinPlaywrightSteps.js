import { Then, When } from '@cucumber/cucumber'
import checkInPage from '../page-objects/checkinPlaywrightObject';

When(/^I am on Online checkin Passengers selection page I click checkin button$/, {timeout: 180 * 10000}, async () => {
	await checkInPage.onlineCheckin()
	await checkInPage.checkin()
});

When(/^I am on Online checkin Print passes page$/, async () => {
	await checkInPage.PrintBoardingPasses()
});

When(/^I am on Manage Travel onlinechekin page, (.+) page I click on continue button$/, async function (page) {
	await checkInPage.selectCovidRestrictedArticalPolicy()
	await checkInPage.onlinecheckinbagspage();
});

When(/^I am on Manage Travel onlinechekin page (.+) page I click on continue button$/, async function (page) {
	await checkInPage.onlinecheckinseatspage();
});