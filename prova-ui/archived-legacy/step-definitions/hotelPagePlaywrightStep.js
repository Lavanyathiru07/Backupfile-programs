import { When, Then, Given } from '@cucumber/cucumber'
import HotelPage from '../page-objects/hotelPagePlaywrightObject'

Then(/^I am on hotels page I select a hotel$/, async () => {
    await HotelPage.collectHotelPageDetailsForConfirmationPage()
    await HotelPage.hotelselection();
})

Then(/^I am on hotels page I select a room$/, async () => {
    await HotelPage.roomselection();
})

Then(/^I click on the Hotels details Page Continue Button$/, async () => {
    await HotelPage.hotelContinueBtn();
})

Then(/^I am on Hotels page I click No thanks button$/, async () => {
    await HotelPage.hotelSkip();
})
