import {Given, When, Then} from '@cucumber/cucumber'
import TATravelersPage from '../../page-objects/ta-silo-booking_Page/TATravelersPage'
import fakeData from 'faker';

Then(/^I Provide Travelers details$/, async ()=>{
    await TATravelersPage.adultTravelersDetails()
    // await TATravelersPage.enterChildrenTravelersDetails()
    // await TATravelersPage.enterLapInfantTravelersDetails()
})

Then(/^I enter First Name as "([^"]*)" in Travellers page$/,async (firstName)=>{
    await TATravelersPage.enterFirstName(firstName)
})

Then(/^I enter Last Name as "([^"]*)" in Travellers page$/,async (lastName)=>{
    await TATravelersPage.enterLastName(lastName)
})

Then(/^I select Gender in Travellers page$/,async ()=>{
    await TATravelersPage.selectGender(fakeData.random.number(1))
})

Then(/^I enter Date of Birth in Travellers page$/,async ()=>{
    await TATravelersPage.selectDOB()
})

Then(/^I Click Continue button from travelers details page$/, async ()=>{
    await TATravelersPage.travelersPageContinueButton()
})