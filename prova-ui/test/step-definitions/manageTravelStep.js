import { Given, When, Then } from '@cucumber/cucumber';
import Actions from '../../src/support/actions.js';

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

let departureDate

Then(/^I am on Manage Travel page I cancel my Trip$/, { timeout: 180 * 10000 }, async function () {
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
    await this.Managetravel.cancelMyTrip()
});

When(/^I am on Manage Travel page, I add a car$/, async function () {
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
    await this.Managetravel.clickAddaCar()
});

When(/^I am on Manage Travel page, Payment page I complete payment$/, { timeout: 180 * 10000 }, async function () {
    let negPayment = await this.Managetravel.negativePayment()
    console.log("negPayment : " + await negPayment)
    if (await negPayment === false) {
        await this.PaymentPage.popupClosing()
        await this.PaymentPage.cardDetails();
        await this.PaymentPage.billingaddress();
        await this.Managetravel.purchasemytrip();
    }
});

When(/^I am on Manage Trip and I click cancel flight$/, async function () {
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
    await this.Managetravel.cancelMyTrip()
});

When(/^I am on Manage Travel page I add "([^"]*)" for traveler "([^"]*)"$/, async function (product, paxNum) {
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
	await this.Managetravel.addProduct(product, paxNum)
});

When(/^I am on Manage Travel page, (.+) page I click on continue button$/, { timeout: 180 * 16000 }, async function (page) {
	await this.Managetravel.selectCovidRestrictedArticalPolicy()
	await this.Managetravel.ContinueButton(page)
});

When(/^I am on Manage Trip and I click change flight$/, async function () {
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
	await this.Managetravel.clickChangeDate();
});

When(/^I am on MT landing page I choose the departure date "(.+)" days from current day$/, async function (number) {
    await this.HomePage.openDepartureDateCalendar()
    // await this.HomePage.setWindow(2700, 2700)
    departureDate = await this.HomePage.chooseDepartingDate(number);
});

Then(/^I am on Manage Travel page, I expect "([^"]*)" is updated correctly for traveler "([^"]*)"$/, async function (product, paxNum) {
	await this.Managetravel.validateProductDetails(product, paxNum)
});

When(/^I am on Manage Travel page, (.+) page I click on continue button only$/, { timeout: 180 * 16000 }, async function (page) {
	await this.CheckinPage.selectCovidRestrictedArticalPolicy()
	await this.Managetravel.ContinueButtonBags(page)
});