import { Then, When, Before } from '@cucumber/cucumber'

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

Before(async function () {
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
});


When(/^I am on Online checkin Passengers selection page I click checkin button$/, { timeout: 180 * 10000 }, async function () {
	await this.CheckinPage.onlineCheckin()
	await this.CheckinPage.acceptCheckinTermsAndConditions()
	await this.CheckinPage.checkin()
});

When(/^I am on Online checkin Print passes page$/, async function () {
	await this.CheckinPage.PrintBoardingPasses()
});

When(/^I am on Manage Travel onlinechekin page, (.+) page I click on continue button$/, async function (page) {
	await this.CheckinPage.onlinecheckinbagspage();
	await this.CheckinPage.selectCovidRestrictedArticalPolicy()
});

When(/^I am on Manage Travel onlinechekin page (.+) page I click on continue button$/, { timeout: 180 * 10000 }, async function (page) {
	await this.CheckinPage.onlinecheckinseatspage();
});

When(/^I am on online checkin validate seat is auto-assiganed after completing the checkin$/, async function () {
	await this.CheckinPage.seatautoassigned()
});
When(/^I am on Manage Travel onlinechekin page (.+) page,I click on continue button$/, async function (page) {	
	await this.CheckinPage.selectpage();
	
});

