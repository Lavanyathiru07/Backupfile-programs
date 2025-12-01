import { Given, When, Then } from '@cucumber/cucumber';

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
    this.CarsPage = new CarPageObject(this.page, this.context)
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