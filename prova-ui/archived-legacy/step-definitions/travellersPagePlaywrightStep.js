import { Given , When , Then} from '@cucumber/cucumber';
import TravellersPage from '../page-objects/travellersPagePlaywrightObject'

When(/^I am on Travelers page I fill in data for "(.+)" travelers$/, async function (travelerCount) {
    await TravellersPage.fillAlltravelerDetails(travelerCount)
});

Then(/^I am on Travelers page I click continue button$/, async () => {
    await TravellersPage.continuebuttontravellers()
})

When(/^I select (.+) for Multiple Travelers$/, async (ssrtype) => {
    await TravellersPage.selectSSR(ssrtype)
});