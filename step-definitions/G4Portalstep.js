import { When, Then, Given } from '@cucumber/cucumber';
import g4portal from '../page-objects/G4PortalObject'
import CLPage from '../page-objects/CLPage'

Then(/^I Cancel and Refund the PRD ITN$/, async () => {
    let env = process.env.ENV
    // if (env.includes("qa1" || "qa2" || "stg"))
    if (env.includes("prod")) {
        await g4portal.navigateToG4portal();
        await g4portal.selectAppFromG4Portal('MOD');
        await g4portal.retrieveBookedItinerary();
        await g4portal.clickAdditionalOptions();
        await g4portal.clickCancelItinerary();
        await g4portal.clickCancelReason();
        await g4portal.clickCancelReasonTestSupport();
        await g4portal.clickcancelReceivedFrom();
        await g4portal.clickcancelSubmitButton();
        await g4portal.clickConfirmAndRedisplay();
        await g4portal.validateConfirmationCancel();
        await g4portal.validateRefundedAmountEqualsAmountPaid();
    }
});

When(/^I navigate to G4 link$/, async function () {
    await g4portal.navigateToG4_intviva();
});

Then(/^I open cl page in a new tab$/, async function () {
    await g4portal.Openclpageinnewtab();
});

Then(/^I am on CL application I click guest Login button$/, async function () {
    await g4portal.guestLogin();
});

When(/^I navigate to G4 portal for FMM$/, async function () {
    await g4portal.navigateToG4Fmm();
});

Given(/^I select the "(.+)" application$/, async function (app) {
	await g4portal.selectAppFromG4Portal(app);
});

Then(/^I validate the Fmm Flights availability$/, async function(){
    await g4portal.flightValidation();
});

Then(/^I validate Cartoveride Page is Displayed or not$/, async () => {
    // Cartoverride.cartoverridepagevalidation();
    await CLPage.cartoverrideContinueBtn();
    await CLPage.validateCartOverridePage();
});

Then(/^I Cancel the PRD ITN$/, async () => {
    let env = process.env.ENV
    // if (env.includes("qa1" || "qa2" || "stg"))
    if (env.includes("prod")) {
        await g4portal.clickAdditionalOptions();
        await g4portal.clickCancelItinerary();
        await g4portal.clickCancelReason();
        await g4portal.clickCancelReasonTestSupport();
        await g4portal.clickcancelReceivedFrom();
        await g4portal.clickcancelSubmitButton();
        await g4portal.clickConfirmAndRedisplay();
        await g4portal.validateConfirmationCancel();
        await g4portal.validateRefundedAmountEqualsAmountPaid();
    }
});