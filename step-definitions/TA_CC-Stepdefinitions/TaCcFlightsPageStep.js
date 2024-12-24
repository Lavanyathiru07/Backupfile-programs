import {Given, When, Then} from '@cucumber/cucumber'
import TAFlightsPage from '../../page-objects/ta-silo-booking_Page/TAFlightsPage'

Then(/^I Select First available Departing Flight from TAPortal$/, async ()=>{
    await TAFlightsPage.selectFirstDepartingFlight()
})

Then(/^I Click Continue button in Flights page for TAPortal$/, async ()=>{
    await TAFlightsPage.FlightsPageContinueButton()
})

Then(/^I Select First available Departing Flight from CCPortal$/,async ()=>{
    await TAFlightsPage.selectFirstDepartingFlight()
})

Then(/^I Click Continue button in Flights page for CCPortal$/,async ()=>{
    await TAFlightsPage.FlightsPageContinueButton()
})