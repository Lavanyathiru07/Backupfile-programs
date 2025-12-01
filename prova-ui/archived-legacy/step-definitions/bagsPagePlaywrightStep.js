import { Then } from '@cucumber/cucumber'
import BagsPage from '../page-objects/bagsPagePlaywrightObject'

Then(/^I am on Bags page I select CarryOn "([^"]*)"$/, async (params) => {
    await BagsPage.selectCarryOnBagByParams(params)
})

Then(/^I am on Bags page I select Checked Bag "([^"]*)"$/, async (params) => {
    await BagsPage.selectCheckedBagByParams(params)
})

Then(/^I am on Bags page I select tripflex "([^"]*)"$/, async (params) => {
    await BagsPage.selectTripflex(params)
})

Then(/^I am on Bags page I select priority "([^"]*)"$/, async (params) => {
    await BagsPage.selectPriorityByParams(params)
})

Then(/^I am on Bags page I click continue button$/, async () => {
    await BagsPage.clickContinueButton()
})

Then(/^I am on Bags page I click continue button without selecting bags$/, async () => {
    await BagsPage.clickContinueButton();
});

Then(/^I am on Bags page I select pet in passenger cabin (.+)$/, async (params) => {
	await BagsPage.selectPetInCabinByParams(params);
});
