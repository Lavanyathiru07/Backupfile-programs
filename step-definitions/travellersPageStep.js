import { When, Then } from '@cucumber/cucumber';
import TravellersPage from '../page-objects/travellersPageObject'


When(/^I fill all the travellers information in travellers page$/, async () => {
    await TravellersPage.travellerinfo()
})

When(/^I am on Travelers page I fill in data for "(.+)" travelers$/, async function (travelerCount) {
    await TravellersPage.fillAlltravelerDetails(travelerCount)
});

When(/^I am on Travelers page I fill data for "(.+)" InfantinLap$/, async function (departDateOffset) {
    await TravellersPage.travellerinfo(departDateOffset)
    // await TravellersPage.setInfantDetails()
});

Then(/^I am on Travelers page I click continue button$/, async () => {
    await TravellersPage.continuebuttontravellers();
})

When(/^I select (.+) for Multiple Travelers$/, async (ssrtype) => {
    await TravellersPage.selectSSR(ssrtype)
});
