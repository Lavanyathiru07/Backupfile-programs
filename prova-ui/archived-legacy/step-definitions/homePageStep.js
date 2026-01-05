import { Given , When , Then} from '@cucumber/cucumber';
import homePage from '../page-objects/homePageObject'

let departureDate;

Given(/^I open the UI application url "([^"]*)"$/, async (url) => {
    await homePage.openURL(url)
})

When(/^I click on the button for closing the popup$/, async () => {
    await homePage.popupClosing()
})

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

Then(/^I click on the sign-in button$/, async () => {
    await homePage.submit()
})

When(/^I select the "([^"]*)" for the origin$/, async (value) => {
    await homePage.selectingorigin(value)
})
When(/^I select the "([^"]*)" for the destination$/, async (value) => {
    await homePage.selectingdestination(value)
})

When(/^I choose the departure date "([^"]*)" days from current day$/, async(number) => {
    departureDate = await homePage.chooseDepartingDate(number);
  });

When(/^I choose the returning date "(.+)" days from departure$/, async (number) => {
  await homePage.chooseReturningDate(number, departureDate);
  });

Then(/^I click on the search button$/, async () => {
    await homePage.submithomepage()
})