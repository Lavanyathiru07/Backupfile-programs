import { Given, When, Then } from '@cucumber/cucumber';
import { GqlBooking, CancelBooking, ModifyBooking } from '@g4/gql-booking-util/src/gql-booking.js'
import GqlBookingPage from '../page-objects/GqlBookingPage.js';
import ATLPage from '../page-objects/ATLPageObject.js'
import { assert } from 'chai';

Given(/^I complete the Booking using GQL for RT-1Adult->1CK CO$/, { timeout: 120000 }, async () => {
    try {
        await ATLBooking()
        let ATLPageobj = new ATLPage()
        await ATLPageobj.VerifyDuplicateITN(process.env.confNumber)
        await GqlBookingPage.getBookingValues()
    } catch (error) {
        console.log(">>>>>ITN might be duplicate or already used. Re-Initating the booking<<<<<")
        console.log("Error details:", error.message || error)
        await ATLBooking()
        await GqlBookingPage.getBookingValues()
    }
});

Given(/^I upsell 1 checked bag using GQL utility via manage travel$/, async function () {
    let Env = await GqlBookingPage.getEnvironment()
    await ModifyBooking(Env, process.env.firstName, process.env.lastName, process.env.confNumber, "2Both:1Both", "Master")
        .then((response) => {
            console.log("ITN Upsell Response ", response)
            process.env.modAmout = response.balanceDueAmount
        })
});

Given(/^I cancel the ITN using GQL utility via manage travel$/, async function () {
    let Env = await GqlBookingPage.getEnvironment()
    await CancelBooking(Env, process.env.firstName, process.env.lastName, process.env.confNumber)
        .then((response) => {
            console.log("ITN Upsell Response ", response)
        })
})

async function ATLBooking() {
    let tripType = "roundtrip"
    if (tripType === "oneway") {
        tripType = "ONEWAY"
    } else {
        tripType = "ROUNDTRIP"
    }
    let departDay = Number(20)
    let adultsCount = Number(1)
    let Env = await GqlBookingPage.getEnvironment()
    //Fetching environmentName from utility library
    // let Env = await new Promise((resolve) => {
    //     resolve(UtilityLibrary.getEnvironmentWithPrefix())
    //   })
    await GqlBooking(Env, "CVG", "PGD", tripType, adultsCount, 0, 0, "12", "5", "", "no", "no", "no", "no", "card", "Master-CC", "yes", "no", "no", "no", "", "", "")
        .then((response) => {
            console.log("Booking response ", response)
            console.log("Booking confNum ", response.confNumber)
            console.log("Booking firstName ", response.firstName)
            console.log("Booking lastName ", response.lastName)
            process.env.confirmationNumber = response.confNumber
            process.env.confNumber = response.confNumber
            process.env.firstName = response.firstName
            process.env.lastName = response.lastName
            process.env.ccNumber = response.encryptCC
            process.env.ccV = response.encryptCvv
            process.env.depDate = response.departDate
            process.env.retDate = response.returnDate
            process.env.depFlight = response.departureFlightId
            process.env.retFlight = response.returningFlightId
            process.env.mflightID = response.departureFlightId
            process.env.bookingAmout = response.tripSummaryDetails.Total
            if (response.confNumber === undefined) {
                assert.fail('No confirmation number found')
            }
        })
}
