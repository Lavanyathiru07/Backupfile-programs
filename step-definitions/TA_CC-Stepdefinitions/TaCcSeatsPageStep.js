import {Given, When, Then} from '@cucumber/cucumber'
import TASeatsPage from '../../page-objects/ta-silo-booking_Page/TASeatsPage'

Then(/^I Select a Seat "([^"]*)" from Seats Page$/, async (Seat)=>{
    if(Seat === "Yes"){
    await TASeatsPage.SelectSeats(Seat)
    }else{
        await TASeatsPage.seatsPageContinueButton()
    }
})

Then(/^I Select a Seat "([^"]*)"$/, async (Seat)=>{
    if (Seat === "Yes") {
        await TASeatsPage.SelectSeats(Seat)
    } else {
        await TASeatsPage.seatsPageContinueButton()
    }
})

Then(/^I Click Continue button from Seats page for TA$/, async ()=>{
    await TASeatsPage.seatsPageContinueButton()
})

Then(/^I Click Continue button from Seats page for CC$/, async ()=>{
    await TASeatsPage.seatsPageContinueButton()
})