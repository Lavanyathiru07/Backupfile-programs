import {When, Then, Given} from '@cucumber/cucumber'
import HotelPage from '../page-objects/hotelPageObject'

Then(/^I click on the skip on Hotel Page if it is available$/, async () => {
    await HotelPage.hotelSkip()
})