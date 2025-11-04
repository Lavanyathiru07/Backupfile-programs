const { Given , When , Then} = require('@cucumber/cucumber');


When(/^I am on Travelers page I fill in data for "(.+)" travelers$/, async function (travelerCount) {
    await this.TravellersPage.fillAlltravelerDetails(travelerCount)
});

Then(/^I am on Travelers page I click continue button$/, async function()  {
    await this.TravellersPage.continuebuttontravellers()
})

When(/^I select (.+) for Multiple Travelers$/, async function(ssrtype)  {
    await this.TravellersPage.selectSSR(ssrtype)
});