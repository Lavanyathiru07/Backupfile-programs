import { Given , When , Then} from '@cucumber/cucumber';
import FlightsPage from '../page-objects/flightsPagePlaywrightObject'

When(/^I am on flights page I collect flight page details$/, async () => {
    await FlightsPage.collectFlightPageDetails();
});

Given(/^I am on flights page I click continue button$/, async () => {
    await FlightsPage.flightsubmit()
    await FlightsPage.validateFlightPage()
})