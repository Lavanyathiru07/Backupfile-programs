import { Given, When, Then } from '@cucumber/cucumber';
import { GqlBooking, CancelBooking, ModifyBooking } from '@g4/gql-booking-util/src/gql-booking'
import GqlBookingPage from '../../page-objects/bookingGql/GqlBookingPage';
import ATLPage from '../../page-objects/ATLPageObject'
import { assert } from 'chai';

// Given(/^I complete the Booking using gql for Online-Check-in$/, async (dataTable) => {
Given(/^I complete the Booking using GQL for OW-1Adult->20 days-1CK CO$/, async () => {
    // let data = dataTable.rowsHash()
    let tripType = "oneway"
    if (tripType === "oneway") {
        tripType = "ONEWAY"
    } else {
        tripType = "ROUNDTRIP"
    }
    let departDay = Number(20)
    let adultsCount = Number(1)
    let Env = await GqlBookingPage.getEnvironment()
    let {
        src,
        dest,
    } = await GqlBookingPage.getmarket(Env)
    await GqlBooking(Env, src, dest, tripType, adultsCount, 0, 0, "20", "0", "", "no", "no", "no", "no", "card", "Master", "yes", "no", "no", "no", "", "", "")
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
            process.env.mflightID = response.departureFlightId
            if (response.confNumber === undefined) {
                assert.fail('No confirmation number found')
            }
        })
});

Given(/^I complete the Booking using GQL for RT-1Adult->1CK CO$/, async () => {
    try {
        await ATLBooking()
        let ATLPageobj = new ATLPage()
        await ATLPageobj.VerifyDuplicateITN(process.env.confNumber)    
        await GqlBookingPage.getBookingValues()
    } catch (error) {
        console.log(">>>>>ITN might be duplicate or already used. Re-Initating the booking<<<<<")
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

// Given(/^I am on landing page I click manage trip button$/, function () {
//     GqlBookingPage.clickManageTrip();
// });
// Given(/^I am on manage trip page I enter OLCI details$/, function () {
//     GqlBookingPage.enterOLCIdetails();
// });

// Given(/^I complete the Booking using gql for OW Domestic$/, async (dataTable) => {
//     let data = dataTable.rowsHash()
//     let origin = data.origin
//     let destination = data.destination
//     let tripType = data.tripType
//     if (tripType === "oneway") {
//         tripType = "ONEWAY"
//     } else {
//         tripType = "ROUNDTRIP"
//     }
//     let adultsCount = Number(data.adult)

//     let child = Number(data.child)
//     let childSeat = Number(data.childSeat)
//     let childrenCount = child + childSeat

//     let lapIfantCount = Number(data.childLap)
//     let departDays = data.departDate

//     let SSR = data.ssr
//     let adultWithSSR
//     if (SSR === "wheelchair") {
//         adultWithSSR = adultsCount + ":WCHR-A:" + adultsCount
//     }

//     let seatsPage = data.Seats
//     if (seatsPage !== "no") {
//         seatsPage = "yes"
//     }

//     let hotelsPage = data.hotels
//     let carsPage = data.cars

//     let BagsPage
//     let check = data.Check
//     let checkedSeg = check.split(" ")[1].split("-")[1]
//     if (checkedSeg === "both") {
//         checkedSeg = "Both"
//     } else if (checkedSeg === "departing") {
//         checkedSeg = "Dep"
//     } else if (checkedSeg === "return") {
//         checkedSeg = "Return"
//     }
//     let checkedCount = check.split(" ")[2].split("-")[1]
//     let checked = checkedCount + checkedSeg

//     let CarryOn = data.CarryOn
//     let CarryOnSeg = CarryOn.split(" ")[1].split("-")[1]
//     if (CarryOnSeg === "both") {
//         CarryOnSeg = "Both"
//     } else if (CarryOnSeg === "departing") {
//         CarryOnSeg = "Dep"
//     } else if (CarryOnSeg === "return") {
//         CarryOnSeg = "Return"
//     }
//     let carryOnBag = "1" + CarryOnSeg

//     let priority = data.Priority
//     let prioritySeg = priority.split(" ")[1].split("-")[1]
//     if (prioritySeg === "both") {
//         prioritySeg = "Both"
//     } else if (prioritySeg === "departing") {
//         prioritySeg = "Dep"
//     } else if (prioritySeg === "return") {
//         prioritySeg = "Return"
//     }
//     let priorityAccess = "1" + prioritySeg

//     let tripflex = data.tripflex
//     if (tripflex === "yes") {
//         tripflex = "1"
//     } else {
//         tripflex = "0"
//     }

//     BagsPage = checked + ":" + carryOnBag + ":" + priorityAccess + ":" + tripflex

//     let Env = await GqlBookingPage.getEnvironment()

//     console.log(" inputs ", Env, origin, adultsCount, adultWithSSR, seatsPage, BagsPage)
//     await GqlBooking(Env, origin, destination, tripType, adultWithSSR, childrenCount, lapIfantCount, departDays, "0", "", seatsPage, "no", hotelsPage, carsPage, "card", "Master", "yes", "no", "no", "no", "", "", BagsPage)
//         .then((response) => {
//             console.log("OW Domestic response ", response)
//             console.log("OW Domestic confNum ", response.confNumber)
//             console.log("OW Domestic firstName ", response.firstName)
//             console.log("OW Domestic lastName ", response.lastName)

//             process.env.OWDomConfNumber = response.confNumber
//             process.env.OWDomFirstName = response.firstName
//             process.env.OWDomLastName = response.lastName
//         })
// });

// Then(/^I am on manage trip page I enter OW Domestic details$/, function () {
//     GqlBookingPage.enterOWDomesticdetails();
// });

// Given(/^I complete the Booking using gql for RT Domestic$/, async (dataTable) => {
//     let data = dataTable.rowsHash()
//     let origin = data.origin
//     let destination = data.destination
//     let tripType = data.tripType
//     if (tripType === "oneway") {
//         tripType = "ONEWAY"
//     } else {
//         tripType = "ROUNDTRIP"
//     }
//     let adultsCount = Number(data.adult)

//     let child = Number(data.child)
//     let childSeat = Number(data.childSeat)
//     let childrenCount = child + childSeat

//     let lapIfantCount = Number(data.childLap)
//     let departDays = data.departDate
//     let returnDays = data.returnDate

//     let seatsPage = data.Seats
//     if (seatsPage !== "no") {
//         seatsPage = "yes"
//     }

//     let BagsPage
//     let check = data.Check
//     let checkedSeg = check.split(" ")[1].split("-")[1]
//     if (checkedSeg === "both") {
//         checkedSeg = "Both"
//     } else if (checkedSeg === "departing") {
//         checkedSeg = "Dep"
//     } else if (checkedSeg === "return") {
//         checkedSeg = "Return"
//     }
//     let checkedCount = check.split(" ")[2].split("-")[1]
//     let checked = checkedCount + checkedSeg

//     let CarryOn = data.CarryOn
//     let CarryOnSeg = CarryOn.split(" ")[1].split("-")[1]
//     if (CarryOnSeg === "both") {
//         CarryOnSeg = "Both"
//     } else if (CarryOnSeg === "departing") {
//         CarryOnSeg = "Dep"
//     } else if (CarryOnSeg === "return") {
//         CarryOnSeg = "Return"
//     }
//     let carryOnBag = "1" + CarryOnSeg

//     let priorityAccess = "1Both"

//     let tripflex = data.tripflex
//     if (tripflex === "yes") {
//         tripflex = "1"
//     } else {
//         tripflex = "0"
//     }

//     BagsPage = checked + ":" + carryOnBag + ":" + priorityAccess + ":" + tripflex

//     let Env = await GqlBookingPage.getEnvironment()

//     await GqlBooking(Env, origin, destination, tripType, adultsCount, childrenCount, lapIfantCount, departDays, returnDays, "", seatsPage, "no", "no", "no", "card", "Master", "yes", "no", "no", "no", "", "", BagsPage)
//         .then((response) => {
//             console.log("RT Domestic response ", response)
//             console.log("RT Domestic confNum ", response.confNumber)
//             console.log("RT Domestic firstName ", response.firstName)
//             console.log("RT Domestic lastName ", response.lastName)

//             process.env.RTDomConfNumber = response.confNumber
//             process.env.RTDomFirstName = response.firstName
//             process.env.RTDomLastName = response.lastName
//         })
// });

// Given(/^I am on manage trip page I enter RT Domestic details$/, function () {
//     GqlBookingPage.enterRTDomesticdetails();
// });

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
    await GqlBooking(Env, "ABE", "SFB", tripType, adultsCount, 0, 0, "14", "14", "", "no", "no", "no", "no", "card", "Master-CC", "yes", "no", "no", "no", "", "", "")
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
            process.env.bookingAmout = response.TripSummaryDetails.Total
            if (response.confNumber === undefined) {
                assert.fail('No confirmation number found')
            }
        })
}
