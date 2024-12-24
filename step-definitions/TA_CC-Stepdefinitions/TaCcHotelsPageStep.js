import {Given, When, Then} from '@cucumber/cucumber'
import TAHotelsPage from '../../page-objects/ta-silo-booking_Page/TAHotelsPage'

Then(/^I Click Continue button from Hotels Page for TA$/, async ()=>{
    await TAHotelsPage.hotelsPageContinueButtonTA()
})

Then(/^I Click Continue button from Hotels Page for CC$/, async ()=>{
    await TAHotelsPage.hotelsPageContinueButton()
})

Then(/^I Book First Available Hotel$/,async ()=>{
    await TAHotelsPage.selectFirstHotel()
    await TAHotelsPage.selectRoom()
})