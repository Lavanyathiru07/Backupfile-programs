import { Then, When } from '@cucumber/cucumber'
import Managetravel from '../page-objects/manageTravel'
import CheckInPage from '../page-objects/checkInObject'

When(/^I am on Online checkin Passengers selection page I click checkin button$/, {timeout: 180 * 10000}, async () => {
	await Managetravel.onlineCheckin()
	await CheckInPage.checkin()
});

When(/^I am on Online checkin Print passes page$/, async () => {
	await CheckInPage.PrintBoardingPasses()
});