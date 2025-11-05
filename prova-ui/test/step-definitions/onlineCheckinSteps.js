const { Then, When } = require('@cucumber/cucumber')

const HomePageObject = require('../page-objects/homePageObject')
const BagsPageObject = require('../page-objects/bagsPageObject')
const BundlesPageObject = require('../page-objects/bundlesPageObject')
const { CarPage } = require('../page-objects/carsPageObject')
const FlightsPageObject = require('../page-objects/flightsPageObject')
const HotelPageObject = require('../page-objects/hotelPageObject')
const LoginPageObject = require('../page-objects/loginPageObject')
const ManagetravelObject = require('../page-objects/manageTravelObject')
const PaymentPageObject = require('../page-objects/paymentPageObj');
const CheckinPageObject = require('../page-objects/checkinObject');
const TravellersPageObject = require('../page-objects/travellersPageObject')
const SeatPageObject = require("../page-objects/seatsPageObject");
const ConfirmationPageObject = require('../page-objects/confPageObject')
const G4portalObject = require('../page-objects/g4PortalObject')


When(/^I am on Online checkin Passengers selection page I click checkin button$/, { timeout: 180 * 10000 }, async function () {
	this.LoginPage = new LoginPageObject(this.page, this.context)
	this.HomePage = new HomePageObject(this.page, this.context)
	this.FlightsPage = new FlightsPageObject(this.page, this.context)
	this.BagsPage = new BagsPageObject(this.page, this.context)
	this.BundlesPage = new BundlesPageObject(this.page, this.context)
	this.TravellersPage = new TravellersPageObject(this.page, this.context)
	this.SeatPage = new SeatPageObject(this.page, this.context)
	this.HotelPage = new HotelPageObject(this.page, this.context)
	this.CarsPage = new CarPage(this.page, this.context)
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