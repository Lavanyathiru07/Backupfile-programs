import { Given, When, Then } from '@cucumber/cucumber';
import { GqlBooking } from '@g4/gql-booking-util/src/gql-booking'
import GqlBookingPage from '../../page-objects/bookingGql/GqlBookingPage';
import { assert } from 'chai';
Given(/^I complete the Booking using gql for Online-Check-in$/, async (dataTable) => {
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
  let Env = await GqlBookingPage.getEnvironment()
  let {
    src,
    dest,
  } = await GqlBookingPage.getmarket(Env)
   //GqlBooking( environment, origin, destination, tripType, adultsCounts, childrenCount, lapInfantCount, departDays, returnDays, depBundle, retBundle, depSeat, retSeat, petInCabin,hotelspage, carspage, paymentType, cardType, isInternational, login, ktn, redress, departFlightNum, returnFlightNum, bagsPage, raidersBooking, travelInsurance)
  await GqlBooking(Env, src, dest, tripType, adultsCount, 0, 0, departDay, "0", "", "","","","no","no", "no", "card", "Master", "yes", "no", "no", "no", "", "", "","")
    .then((response) => {
      console.log("online check-in response ", response)
      console.log("online check-in confNum ", response.confNumber)
      console.log("online check-in firstName ", response.firstName)
      console.log("online check-in lastName ", response.lastName)
      ITN =  response.confNumber;
      // if (response.confNumber === undefined) {
      //   assert.fail(response.error)
      // }
      process.env.confirmationNumber = response.confNumber
      process.env.OLCIconfNumber = response.confNumber
      process.env.OLCIfirstName = response.firstName
      process.env.OLCIlastName = response.lastName
    })
  if (ITN == undefined) {
    await GqlBooking(Env, src, dest, tripType, adultsCount, 0, 0, departDay, "0", "", "no", "no", "no", "no", "card", "Master", "yes", "no", "no", "no", "", "", "")
      .then((response) => {
        console.log("online check-in response ", response)
        console.log("online check-in confNum ", response.confNumber)
        console.log("online check-in firstName ", response.firstName)
        console.log("online check-in lastName ", response.lastName)
        if (response.confNumber === undefined) {
          assert.fail(response.error)
        }
        process.env.confirmationNumber = response.confNumber
        process.env.OLCIconfNumber = response.confNumber
        process.env.OLCIfirstName = response.firstName
        process.env.OLCIlastName = response.lastName
      })
  }
});

Given(/^I am on landing page I click manage trip button$/, async function () {
  await GqlBookingPage.clickManageTrip();
  // GqlBookingPage.clickCheckIn();
});
Given(/^I am on manage trip page I enter OLCI details$/, async function () {
  await GqlBookingPage.enterOLCIdetails();
});

Given(/^I am on manage trip page I enter CCOLCI details$/,async function () {
    await GqlBookingPage.enterCCOLCIdetails();
});

Given(/^I complete the Booking using gql for OW Domestic$/, async (dataTable) => {
  let data = dataTable.rowsHash()
  let origin = data.origin
  let destination = data.destination
  let tripType = data.tripType
  if (tripType === "oneway") {
    tripType = "ONEWAY"
  } else {
    tripType = "ROUNDTRIP"
  }
  let adultsCount = Number(data.adult)

  let child = Number(data.child)
  let childSeat = Number(data.childSeat)
  let childrenCount = child + childSeat

  let lapIfantCount = Number(data.childLap)
  let departDays = data.departDate

  let SSR = data.ssr
  let adultWithSSR
  if (SSR === "wheelchair") {
    adultWithSSR = adultsCount + ":WCHR-A:" + adultsCount
  }

  let seatsPage = data.Seats
  if (seatsPage !== "no") {
    seatsPage = "yes"
  }

  let hotelsPage = data.hotels
  let carsPage = data.cars

  let BagsPage
  let check = data.Check
  let checkedSeg = check.split(" ")[1].split("-")[1]
  if (checkedSeg === "both") {
    checkedSeg = "Both"
  } else if (checkedSeg === "departing") {
    checkedSeg = "Dep"
  } else if (checkedSeg === "return") {
    checkedSeg = "Return"
  }
  let checkedCount = check.split(" ")[2].split("-")[1]
  let checked = checkedCount + checkedSeg

  let CarryOn = data.CarryOn
  let CarryOnSeg = CarryOn.split(" ")[1].split("-")[1]
  if (CarryOnSeg === "both") {
    CarryOnSeg = "Both"
  } else if (CarryOnSeg === "departing") {
    CarryOnSeg = "Dep"
  } else if (CarryOnSeg === "return") {
    CarryOnSeg = "Return"
  }
  let carryOnBag = "1" + CarryOnSeg

  let priority = data.Priority
  let prioritySeg = priority.split(" ")[1].split("-")[1]
  if (prioritySeg === "both") {
    prioritySeg = "Both"
  } else if (prioritySeg === "departing") {
    prioritySeg = "Dep"
  } else if (prioritySeg === "return") {
    prioritySeg = "Return"
  }
  let priorityAccess = "1" + prioritySeg

  let tripflex = data.tripflex
  if (tripflex === "yes") {
    tripflex = "1"
  } else {
    tripflex = "0"
  }

  BagsPage = checked + ":" + carryOnBag + ":" + priorityAccess + ":" + tripflex

  let Env = await GqlBookingPage.getEnvironment()

  console.log(" inputs ", Env, origin, adultsCount, adultWithSSR, seatsPage, BagsPage)
  await GqlBooking(Env, origin, destination, tripType, adultWithSSR, childrenCount, lapIfantCount, departDays, "0", "", seatsPage, "no", hotelsPage, carsPage, "card", "Master", "yes", "no", "no", "no", "", "", BagsPage)
    .then((response) => {
      console.log("OW Domestic response ", response)
      console.log("OW Domestic confNum ", response.confNumber)
      console.log("OW Domestic firstName ", response.firstName)
      console.log("OW Domestic lastName ", response.lastName)
      process.env.confirmationNumber = response.confNumber
      process.env.OWDomConfNumber = response.confNumber
      process.env.OWDomFirstName = response.firstName
      process.env.OWDomLastName = response.lastName
    })
});

Then(/^I am on manage trip page I enter OW Domestic details$/, async function () {
  await GqlBookingPage.enterOWDomesticdetails();
});

Given(/^I complete the Booking using gql for RT Domestic$/, async (dataTable) => {
  let ITN
  let data = dataTable.rowsHash()
  let origin = data.origin
  let destination = data.destination
  let tripType = data.tripType
  if (tripType === "oneway") {
    tripType = "ONEWAY"
  } else {
    tripType = "ROUNDTRIP"
  }
  let adultsCount = Number(data.adult)

  let child = Number(data.child)
  let childSeat = Number(data.childSeat)
  let childrenCount = child + childSeat

  let lapIfantCount = Number(data.childLap)
  let departDays = data.departDate
  let returnDays = data.returnDate

  let seatsPage = data.Seats
  if (seatsPage !== "no") {
    seatsPage = "yes"
  }

  let BagsPage
  let check = data.Check
  let checkedSeg = check.split(" ")[1].split("-")[1]
  if (checkedSeg === "both") {
    checkedSeg = "Both"
  } else if (checkedSeg === "departing") {
    checkedSeg = "Dep"
  } else if (checkedSeg === "return") {
    checkedSeg = "Return"
  }
  let checkedCount = check.split(" ")[2].split("-")[1]
  let checked = checkedCount + checkedSeg

  let CarryOn = data.CarryOn
  let CarryOnSeg = CarryOn.split(" ")[1].split("-")[1]
  if (CarryOnSeg === "both") {
    CarryOnSeg = "Both"
  } else if (CarryOnSeg === "departing") {
    CarryOnSeg = "Dep"
  } else if (CarryOnSeg === "return") {
    CarryOnSeg = "Return"
  }
  let carryOnBag = "1" + CarryOnSeg

  let priorityAccess = "1Both"

  let tripflex = data.tripflex
  if (tripflex === "yes") {
    tripflex = "1"
  } else {
    tripflex = "0"
  }

  BagsPage = checked + ":" + carryOnBag + ":" + priorityAccess + ":" + tripflex

  let Env = await GqlBookingPage.getEnvironment()

  await GqlBooking(Env, origin, destination, tripType, adultsCount, childrenCount, lapIfantCount, departDays, returnDays, "", seatsPage, "no", "no", "no", "card", "Master", "yes", "no", "no", "no", "", "", BagsPage)
    .then((response) => {
      console.log("RT Domestic response ", response)
      console.log("RT Domestic confNum ", response.confNumber)
      console.log("RT Domestic firstName ", response.firstName)
      console.log("RT Domestic lastName ", response.lastName)
      ITN = response.confNumber
      // if (response.confNumber === undefined) {
      //   assert.fail(response.error)
      // }
      process.env.confirmationNumber = response.confNumber
      process.env.confNumber = response.confNumber
      process.env.RTDomConfNumber = response.confNumber
      process.env.RTDomFirstName = response.firstName
      process.env.RTDomLastName = response.lastName
      process.env.firstName = response.firstName
      process.env.lastName = response.lastName
    })
    
  if (ITN === undefined || ITN === "") {
    console.log("ITN NOT GENERATED, RETRYINIG ONE MORE TIME")
    await GqlBooking(Env, origin, destination, tripType, adultsCount, childrenCount, lapIfantCount, departDays, returnDays, "", seatsPage, "no", "no", "no", "card", "Master", "yes", "no", "no", "no", "", "", BagsPage)
      .then((response) => {
        console.log("RT Domestic response ", response)
        console.log("RT Domestic confNum ", response.confNumber)
        console.log("RT Domestic firstName ", response.firstName)
        console.log("RT Domestic lastName ", response.lastName)
        if (response.confNumber === undefined) {
          assert.fail(response.error)
        }
        process.env.confirmationNumber = response.confNumber
        process.env.confNumber = response.confNumber
        process.env.RTDomConfNumber = response.confNumber
        process.env.RTDomFirstName = response.firstName
        process.env.RTDomLastName = response.lastName
        process.env.firstName = response.firstName
        process.env.lastName = response.lastName
      })
  }
  await GqlBookingPage.getBookingValues()
});

Given(/^I am on manage trip page I enter RT Domestic details$/, async function () {
  await GqlBookingPage.enterRTDomesticdetails();
});