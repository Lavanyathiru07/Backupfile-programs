import { Given, When, Then, Before } from '@cucumber/cucumber';
import HomePageObject from '../page-objects/homePageObject.js'
import BagsPageObject from '../page-objects/bagsPageObject.js'
import BundlesPageObject from '../page-objects/bundlesPageObject.js'
import CarPageObject from '../page-objects/carsPageObject.js'
import FlightsPageObject from '../page-objects/flightsPageObject.js'
import HotelPageObject from '../page-objects/hotelPageObject.js'
import LoginPageObject from '../page-objects/loginPageObject.js'
import ManagetravelObject from '../page-objects/manageTravelObject.js'
import PaymentPageObject from '../page-objects/paymentPageObj.js';
import CheckinPageObject from '../page-objects/checkinObject.js';
import TravellersPageObject from '../page-objects/travellersPageObject.js'
import SeatPageObject from '../page-objects/seatsPageObject.js';
import ConfirmationPageObject from '../page-objects/confPageObject.js'
import G4portalObject from '../page-objects/g4PortalObject.js'

let departureDate;

// Before(async function () {
//     this.LoginPage = new LoginPageObject(this.page, this.context)
//     this.HomePage = new HomePageObject(this.page, this.context)
//     this.FlightsPage = new FlightsPageObject(this.page, this.context)
//     this.BagsPage = new BagsPageObject(this.page, this.context)
//     this.BundlesPage = new BundlesPageObject(this.page, this.context)
//     this.TravellersPage = new TravellersPageObject(this.page,this.context)
//     this.SeatPage = new SeatPageObject(this.page,this.context)
//     this.HotelPage = new HotelPageObject(this.page, this.context)
//     this.CarsPage = new CarPageObject(this.page, this.context)
//     this.PaymentPage = new PaymentPageObject(this.page, this.context)
//     this.ConfirmationPage = new ConfirmationPageObject(this.page,this.context)
//     this.CheckinPage = new CheckinPageObject(this.page, this.context)
//     this.Managetravel = new ManagetravelObject(this.page, this.context)
//     this.G4portal = new G4portalObject(this.page,this.context)
// });

Then(/^I select the trip type as one way$/, async function () {
    await this.HomePage.oneway()
})

When(/^I click on the login-button$/, async function () {
    await this.HomePage.loginlink()
})

When(/^I set "([^"]*)" to the inputfield of e-mail$/, async function (value) {
    await this.HomePage.loginlink(value)
})

When(/^I set "([^"]*)" to the inputfield of pwd$/, async function (value) {
    await this.HomePage.pwd(value)
})

Given(/^I navigate to www application$/, async function () {
    this.LoginPage = new LoginPageObject(this.page, this.context)
    this.HomePage = new HomePageObject(this.page, this.context)
    this.FlightsPage = new FlightsPageObject(this.page, this.context)
    this.BagsPage = new BagsPageObject(this.page, this.context)
    this.BundlesPage = new BundlesPageObject(this.page, this.context)
    this.TravellersPage = new TravellersPageObject(this.page, this.context)
    this.SeatPage = new SeatPageObject(this.page, this.context)
    this.HotelPage = new HotelPageObject(this.page, this.context)
    this.CarsPage = new CarPageObject(this.page, this.context)
    this.PaymentPage = new PaymentPageObject(this.page, this.context)
    this.ConfirmationPage = new ConfirmationPageObject(this.page, this.context)
    this.CheckinPage = new CheckinPageObject(this.page, this.context)
    this.Managetravel = new ManagetravelObject(this.page, this.context)
    this.G4portal = new G4portalObject(this.page, this.context)
    // let env = process.env.appEnv
    // let url
    // if (env.includes('-')) {
    //     url = `https://www${env}.allegiantair.com`
    // }
    // else if (env.includes('.')) {
    //     url = `https://www${env}.allegiantair.com`
    // }
    await this.HomePage.openURL(process.env.appEnv)
})

Given(/^I open the UI application url "([^"]*)"$/, async function (url) {
    this.LoginPage = new LoginPageObject(this.page, this.context)
    this.HomePage = new HomePageObject(this.page, this.context)
    this.FlightsPage = new FlightsPageObject(this.page, this.context)
    this.BagsPage = new BagsPageObject(this.page, this.context)
    this.BundlesPage = new BundlesPageObject(this.page, this.context)
    this.TravellersPage = new TravellersPageObject(this.page, this.context)
    this.SeatPage = new SeatPageObject(this.page, this.context)
    this.HotelPage = new HotelPageObject(this.page, this.context)
    this.CarsPage = new CarPageObject(this.page, this.context)
    this.PaymentPage = new PaymentPageObject(this.page, this.context)
    this.ConfirmationPage = new ConfirmationPageObject(this.page, this.context)
    this.CheckinPage = new CheckinPageObject(this.page, this.context)
    this.Managetravel = new ManagetravelObject(this.page, this.context)
    this.G4portal = new G4portalObject(this.page, this.context)
    await this.HomePage.openURL(url)
})

Given(/^I am on landing page I select "([^"]*)"$/, async function (triptype) {
    this.LoginPage = new LoginPageObject(this.page, this.context)
    this.HomePage = new HomePageObject(this.page, this.context)
    this.FlightsPage = new FlightsPageObject(this.page, this.context)
    this.BagsPage = new BagsPageObject(this.page, this.context)
    this.BundlesPage = new BundlesPageObject(this.page, this.context)
    this.TravellersPage = new TravellersPageObject(this.page, this.context)
    this.SeatPage = new SeatPageObject(this.page, this.context)
    this.HotelPage = new HotelPageObject(this.page, this.context)
    this.CarsPage = new CarPageObject(this.page, this.context)
    this.PaymentPage = new PaymentPageObject(this.page, this.context)
    this.ConfirmationPage = new ConfirmationPageObject(this.page, this.context)
    this.CheckinPage = new CheckinPageObject(this.page, this.context)
    this.Managetravel = new ManagetravelObject(this.page, this.context)
    this.G4portal = new G4portalObject(this.page, this.context)
    await this.HomePage.selectTripType(triptype)
    process.env.tripType = triptype
})

Given(/^(I am (.*\s+)?Page, )?I have a screen that is ([\d]+) by ([\d]+) pixels$/, async function (page, screenWidth, screenHeight) {
    await this.HomePage.setWindow(screenWidth, screenHeight)
});

When(/^I am on landing page I select "([^"]*)" for the departure airport$/, async function (value) {
    await this.HomePage.selectingorigin(value)
})

When(/^I am on landing page I select "([^"]*)" for the destination airport$/, async function (value) {
    await this.HomePage.selectingdestination(value)
})

When(/^I am on landing page I choose the departure date "([^"]*)" days from current day$/, async function (number) {
    departureDate = await this.HomePage.chooseDepartingDate(number);
});

When(/^I am on landing page I choose the returning date "(.+)" days from departure$/, async function (number) {
    await this.HomePage.chooseReturningDate(number, departureDate);
});

Given(/^I am on landing page I select "([^"]*)" adult travelers$/, async function (count) {
    await this.HomePage.selectAdults(count)
})

Given(/^I am on landing page I select Child as "([^"]*)"$/, async function (count) {
    await this.HomePage.selectChildren(count)
})

Given(/^I am on landing page I select InfantInSeat as "([^"]*)"$/, async function (count) {
    await this.HomePage.selectInfantInSeat(count)
})

Given(/^I am on landing page I select InfantInLap as "([^"]*)"$/, async function (count) {
    await this.HomePage.selectInfantInLap(count)
})

Then(/^I am on landing page I click on search button$/, async function () {
    await this.HomePage.submithomepage()
})

Then(/^I open a new window "([^"]*)"$/, async function (url) {
    await this.HomePage.newWindowURL(url)
});

Then(/^I close all but first tab$/, async function () {
    await this.HomePage.closeFirstTab()
});

Given(/^I get market from gql for OLCI$/, { timeout: 180 * 4000 }, async function () {
    await this.HomePage.getmarket();
});

Given(/^I am on landing page I select market$/, async function () {
    await this.HomePage.selectDeparture(process.env.origin);
    await this.HomePage.selectDestination(process.env.arrival);
});