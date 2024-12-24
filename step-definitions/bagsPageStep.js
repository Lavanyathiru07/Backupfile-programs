import { When, Then } from '@cucumber/cucumber'
import BagsPage from '../page-objects/bagsPageObject'
import CLPage from '../page-objects/CLPage'

Then(/^I am on Bags page I expect "(.+)" primary title displayed in booking path$/, async (BagsPagePrimaryTitle) => {
    await BagsPage.validateBagsPagePrimaryTitle(BagsPagePrimaryTitle);
});

Then(/^I am on Bags page I expect (.+) banner for collect bundle items$/, async (bundleType) => {
    await BagsPage.validateBundleBanner(bundleType);
});

Then(/^I am on Bags page I expect "(.+)" message for collected bundle items for (.+)$/, async (message, bundleType) => {
    await BagsPage.validateBundleIncludedMessage(message, bundleType);
});

Then(/^I am on Bags page I select CarryOn "(.+)"$/, async (params) => {
    await browser.pause(5000)
    await BagsPage.selectCarryOnBagByParams(params)
    await browser.pause(5000)
})

Then(/^I am on Bags page I select Checked Bag "(.+)"$/, async (params) => {
    await BagsPage.selectCheckedBagByParams(params)
})

Then(/^I am on Bags page I select tripflex "(.+)"$/, async (params) => {
    await BagsPage.selectTripflex(params)
})

Then(/^I am on Bags page I select priority "([^"]*)"$/, async (params) => {
    await BagsPage.selectPriorityByParams(params)
})

Then(/^I am on Bages Page I select the priority access and Trip flex$/, async () => {
    await BagsPage.selectingextraaccess()
})

When(/^I am on Bags page I click continue button without selecting bags$/, async () => {
    await BagsPage.clickContinueButton();
});

Then(/^I am on Bags page I click continue button$/, async () => {
    await BagsPage.clickContinueButton()
})

Then(/^I click on continue in Bags Page$/, async () => {
    await BagsPage.continueButton()
})

When(/^I am on impersonation Bags page I click continue button$/, async () => {
	await CLPage.clickContinueButton();
});

When(/^I am on Bags page I select pet in passenger cabin (.+)$/, async (params) => {
	await BagsPage.selectPetInCabinByParams(params);
});

When(/^I am on Bags page I select petInCabin (.+) for (.+)$/, async (petc,paxNum) =>{
	await BagsPage.selectpetinCab(petc,paxNum);
});
