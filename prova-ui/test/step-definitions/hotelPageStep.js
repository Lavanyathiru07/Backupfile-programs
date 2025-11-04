const {When, Then, Given} = require('@cucumber/cucumber')


Then(/^I am on hotels page I select a hotel$/, async function ()  {
    await this.HotelPage.collectHotelPageDetailsForConfirmationPage()
    await this.HotelPage.hotelselection();
})

Then(/^I am on hotels page I select a room$/, async function ()  {
    await this.HotelPage.roomselection();
})

Then(/^I click on the Hotels details Page Continue Button$/, async function ()  {
    await this.HotelPage.hotelContinueBtn();
})

Then(/^I am on Hotels page I click No thanks button$/, async function ()  {
    await this.HotelPage.hotelSkip();
})
