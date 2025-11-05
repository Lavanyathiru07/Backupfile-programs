import { Given , When , Then} from '@cucumber/cucumber';
import FlightsPage from '../page-objects/flightsPageObject'

Given(/^I click on the submit button in flights page$/, async () => {
    await FlightsPage.flightsubmit()
})