const { Given, When, Then } = require('@cucumber/cucumber');

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

When(/^I navigate to G4 portal for FMM$/, async function () {
    await this.G4portal.navigateToG4Fmm();
});

Given(/^I select the "(.+)" application$/, async function (app) {
    this.page = await this.G4portal.selectAppFromG4Portal(app);
});

Then(/^I validate the Fmm Flights availability$/, async function () {
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
    await this.G4portal.flightValidation();
});

When(/^I navigate to G4 portal$/, async function ()  {
    await this.G4portal.navigateToG4portal()
});

When(/^I select "(.+)"$/, async function (app)  {
    await this.G4portal.selectAppFromG4Portal(app);
});

When(/^I validate Transancation$/, async function () {
    if (process.env.ENV.includes("okd")) {
        if (process.env.ENV.includes("qatnexusg4.okd")) {
            process.env.atl = "PCWVXX"
        } else if (process.env.ENV.includes("intnexusg4.okd")) {
            process.env.atl = "HDY49R"
        }
        await this.G4portal.ATLTranscation();
    }
});

Then(/^I open cl page in a new tab$/, async function () {
    await this.G4portal.Openclpageinnewtab();
});

Then(/^I am on CL application I click guest Login button$/, async function () {
    // await this.G4portal.guestLogin();
    this.page = await this.G4portal.guestLogin();
});

Then(/^I validate Cartoveride Page is Displayed or not$/, async function ()  {
    await this.G4portal.cartoverrideContinueBtn();
    await this.G4portal.validateCartOverridePage();
});

When(/^I am on impersonation Bags page I click continue button$/, async function ()  {
	await this.G4portal.clickContinueButton();
});