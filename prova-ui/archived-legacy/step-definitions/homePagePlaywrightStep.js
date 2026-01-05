import { Given , When , Then} from '@cucumber/cucumber';
import homePage from '../page-objects/homePagePlaywrightObject'

let departureDate;

Then(/^I select the trip type as one way$/, async () => {
    await homePage.oneway()
})

When(/^I click on the login-button$/, async () => {
    await homePage.loginlink()
})

When(/^I set "([^"]*)" to the inputfield of e-mail$/, async (value) => {
    await homePage.loginlink(value)
})

When(/^I set "([^"]*)" to the inputfield of pwd$/, async (value) => {
    await homePage.pwd(value)
})

Given(/^I navigate to www application$/, async () => {
    let env = process.env.ENV
    let url
    if (env.includes('-')) {
        url = `https://www${env}.allegiantair.com`
    }
    else if (env.includes('.')) {
        url = `https://www${env}.allegiantair.com`
    }
    await homePage.openURL(url)
})

Given(/^I am on landing page I select "([^"]*)"$/, async (triptype) => {
    await homePage.selectTripType(triptype)
})

When(/^I am on landing page I select "([^"]*)" for the departure airport$/, async (value) => {
    await homePage.selectingorigin(value)
})

When(/^I am on landing page I select "([^"]*)" for the destination airport$/, async (value) => {
    await homePage.selectingdestination(value)
})

When(/^I am on landing page I choose the departure date "([^"]*)" days from current day$/, async (number) => {
    departureDate = await homePage.chooseDepartingDate(number);
});

When(/^I am on landing page I choose the returning date "(.+)" days from departure$/, async (number) => {
    await homePage.chooseReturningDate(number, departureDate);
});

Given(/^I am on landing page I select "([^"]*)" adult travelers$/, async (count) => {
    await homePage.selectAdults(count)
})

Given(/^I am on landing page I select Child as "([^"]*)"$/, async (count) => {
    await homePage.selectChildren(count)
})

Given(/^I am on landing page I select InfantInSeat as "([^"]*)"$/, async (count) => {
    await homePage.selectInfantInSeat(count)
})

Given(/^I am on landing page I select InfantInLap as "([^"]*)"$/, async (count) => {
    await homePage.selectInfantInLap(count)
})

Then(/^I am on landing page I click on search button$/, async () => {
    await homePage.submithomepage()
})

Then(/^I open a new window "([^"]*)"$/, async (url) => {
	await homePage.newWindowURL(url)
});

Then(/^I close all but first tab$/, async () => {
	await homePage.closeFirstTab()
});

Given(/^I get market from gql for OLCI$/, { timeout: 180 * 4000 }, async function () {
    await homePage.getmarket();
});

Given(/^I am on landing page I select market$/, async () => {
    await homePage.selectDeparture(process.env.origin);
    await homePage.selectDestination(process.env.arrival);
});