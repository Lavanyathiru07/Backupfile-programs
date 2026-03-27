import { Given, When, Then, Before } from '@cucumber/cucumber';
import { GqlBooking, CancelBooking, ModifyBooking } from '@g4/gql-booking-util/src/gql-booking.js'
import GqlBookingPage from '../page-objects/GqlBookingPage.js';
import ATLPage from '../page-objects/ATLPageObject.js'
import { assert } from 'chai';

Before(async function () {
    this.gqlBookingPage = new GqlBookingPage(this.page, this.context);
    this.atlPage = new ATLPage(this.page, this.context);
});

Given(/^I complete the Booking using GQL for RT-1Adult->1CK CO$/, { timeout: 120000 }, async function () {
    try {
        await ATLBooking.call(this)
        await this.atlPage.VerifyDuplicateITN(process.env.confNumber)
        await this.gqlBookingPage.getBookingValues()
    } catch (error) {
        console.log(">>>>>ITN might be duplicate or already used. Re-Initating the booking<<<<<")
        console.log("Error details:", error.message || error)
        await ATLBooking.call(this)
        await this.gqlBookingPage.getBookingValues()
    }
});

Given(/^I upsell 1 checked bag using GQL utility via manage travel$/, async function () {
    let Env = await this.gqlBookingPage.getEnvironment()
    await ModifyBooking(Env, process.env.firstName, process.env.lastName, process.env.confNumber, "2Both:1Both", "Master")
        .then((response) => {
            console.log("ITN Upsell Response ", response)
            process.env.modAmout = response.balanceDueAmount
        })
});

Given(/^I cancel the ITN using GQL utility via manage travel$/, async function () {
    let Env = await this.gqlBookingPage.getEnvironment()
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
    let Env = await this.gqlBookingPage.getEnvironment()
    //Fetching environmentName from utility library
    // let Env = await new Promise((resolve) => {
    //     resolve(UtilityLibrary.getEnvironmentWithPrefix())
    //   })
    await GqlBooking(Env, "CVG", "PGD", tripType, adultsCount, 0, 0, "20", "0", "", "no", "no", "no", "no", "card", "Master", "yes", "no", "no", "no", "", "", "")
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

Given(/^I complete the Booking using gql for Online-Check-in$/, { timeout: 180 * 10000 }, async function (dataTable) {
    let ITN
    let data = dataTable.rowsHash()
    let tripType = data.tripType
    if (tripType === "oneway") {
        tripType = "ONEWAY"
    } else {
        tripType = "ROUNDTRIP"
    }
    let departDay = data.departDate
    let adultsCount = Number(data.adult)
    let Env = await this.gqlBookingPage.getEnvironment()
    let cityPairDetails = await this.gqlBookingPage.getAvailableFlightsWithin24hoursFromApi();
    console.log(`Source: ${cityPairDetails.source} => Destination: ${cityPairDetails.destination}`);
    await GqlBooking(Env, "ABE", "SFB", tripType, adultsCount, 0, 0, "14", "14", "","","","", "no", "no", "no", "card", "Master-CC", "yes", "no", "no", "no", "", "", "","","")
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
});

Given(/^I am on landing page I click manage trip button$/, async function () {
    await this.gqlBookingPage.clickManageTrip();
});

Given(/^I am on manage trip page I enter OLCI details$/, async function () {
    await this.gqlBookingPage.enterOLCIdetails();
});
