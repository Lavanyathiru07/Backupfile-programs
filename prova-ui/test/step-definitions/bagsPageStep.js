import { Then } from '@cucumber/cucumber'


Then(/^I am on Bags page I select CarryOn "([^"]*)"$/, async function (params) {
    await this.BagsPage.selectCarryOnBagByParams(params)
})

Then(/^I am on Bags page I select Checked Bag "([^"]*)"$/, async function (params)  {
    await this.BagsPage.selectCheckedBagByParams(params)
})

Then(/^I am on Bags page I select tripflex "([^"]*)"$/, async function (params)  {
    await this.BagsPage.selectTripflex(params)
})

Then(/^I am on Bags page I select priority "([^"]*)"$/, async function (params)  {
    await this.BagsPage.selectPriorityByParams(params)
})

Then(/^I am on Bags page I click continue button$/, async function ()  {
    await this.BagsPage.clickContinueButton()
})

Then(/^I am on Bags page I click continue button without selecting bags$/, async function ()  {
    await this.BagsPage.clickContinueButton();
});

Then(/^I am on Bags page I select pet in passenger cabin (.+)$/, async function (params)  {
	await this.BagsPage.selectPetInCabinByParams(params);
});
