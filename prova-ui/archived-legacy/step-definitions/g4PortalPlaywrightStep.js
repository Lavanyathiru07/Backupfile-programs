import { Given, When, Then } from '@cucumber/cucumber';
import g4portal from '../page-objects/g4PortalPlaywrightObject'

When(/^I navigate to G4 portal for FMM$/, async function () {
    await g4portal.navigateToG4Fmm();
});

Given(/^I select the "(.+)" application$/, async function (app) {
    await g4portal.selectAppFromG4Portal(app);
});

Then(/^I validate the Fmm Flights availability$/, async function () {
    await g4portal.flightValidation();
});

When(/^I navigate to G4 portal$/, async () => {
    await g4portal.navigateToG4portal()
});

When(/^I select "(.+)"$/, async (app) => {
    await g4portal.selectAppFromG4Portal(app);
});

When(/^I validate Transancation$/, async function () {
    if (process.env.ENV.includes("okd")) {
        if (process.env.ENV.includes("qatnexusg4.okd")) {
            process.env.atl = "PCWVXX"
        } else if (process.env.ENV.includes("intnexusg4.okd")) {
            process.env.atl = "HDY49R"
        }
        await g4portal.ATLTranscation();
    }
});

Then(/^I open cl page in a new tab$/, async function () {
    await g4portal.Openclpageinnewtab();
});

Then(/^I am on CL application I click guest Login button$/, async function () {
    await g4portal.guestLogin();
});

Then(/^I validate Cartoveride Page is Displayed or not$/, async () => {
    await g4portal.cartoverrideContinueBtn();
    await g4portal.validateCartOverridePage();
});

When(/^I am on impersonation Bags page I click continue button$/, async () => {
	await g4portal.clickContinueButton();
});