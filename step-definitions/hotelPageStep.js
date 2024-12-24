import { Then } from '@cucumber/cucumber'
import HotelPage from '../page-objects/hotelPageObject'

Then(/^I am on hotels page I select a hotel$/, async () => {
    await HotelPage.collectHotelPageDetailsForConfirmationPage()
    await HotelPage.hotelselection();
})

Then(/^I am on hotels page I select a room$/, async () => {
    await HotelPage.collectHotelDetailsPageDetailsForConfirmationPage()
    await HotelPage.roomselection();
})

Then(/^I am on Hotels Page I expect title "(.+)"$/, async function (title) {
    await HotelPage.validateHotelsPageTitle(title);
});

Then(/^I am on Hotels page I click No thanks button$/, async () => {
    await HotelPage.hotelSkip();
})

Then(/^I click on the Continue button in Hotels Page$/, async () => {
    await HotelPage.hotelContinueBtn();
})

Then(/^I click on the Hotels details Page Continue Button$/, async () => {
    await HotelPage.hotelContinueBtn();
})