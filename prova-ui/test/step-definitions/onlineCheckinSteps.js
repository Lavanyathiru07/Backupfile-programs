const { Then, When } = require('@cucumber/cucumber')

import HomePageObject from '../page-objects/homePageObject'
import BagsPageObject from '../page-objects/bagsPageObject'
import BundlesPageObject from '../page-objects/bundlesPageObject'
import CarPageObject from '../page-objects/carsPageObject'
import FlightsPageObject from '../page-objects/flightsPageObject'
import HotelPageObject from '../page-objects/hotelPageObject'
import LoginPageObject from '../page-objects/loginPageObject'
import ManagetravelObject from '../page-objects/manageTravelObject'
import PaymentPageObject from '../page-objects/paymentPageObj';
import CheckinPageObject from '../page-objects/checkinObject';
import TravellersPageObject from '../page-objects/travellersPageObject'
import SeatPageObject from "../page-objects/seatsPageObject";
import ConfirmationPageObject from '../page-objects/confPageObject'
import G4portalObject from '../page-objects/g4PortalObject'


When(/^I am on Online checkin Passengers selection page I click checkin button$/, { timeout: 180 * 10000 }, async function () {
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
	await this.CheckinPage.onlineCheckin()
	await this.CheckinPage.checkin()
});

When(/^I am on Online checkin Print passes page$/, async function ()  {
	await this.CheckinPage.PrintBoardingPasses()
});

When(/^I am on Manage Travel onlinechekin page, (.+) page I click on continue button$/, async function (page) {
	await this.CheckinPage.selectCovidRestrictedArticalPolicy()
	await this.CheckinPage.onlinecheckinbagspage();
});

When(/^I am on Manage Travel onlinechekin page (.+) page I click on continue button$/, { timeout: 180 * 10000 }, async function (page) {
	await this.CheckinPage.onlinecheckinseatspage();
});