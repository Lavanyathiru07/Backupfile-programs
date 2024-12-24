import {Given, When, Then} from '@cucumber/cucumber'
import TACarsPage from '../../page-objects/ta-silo-booking_Page/TACarsPage'

Then(/^I Validate cars are displayed in Getting Around page for TAPortal$/, async ()=>{
    await TACarsPage.validateCarsDisplayed()
})

Then(/^I Book a Car$/,async ()=>{
    await TACarsPage.carsSelection()
})

Then(/^I click on Continue in Special rental Page$/,async ()=>{
    await TACarsPage.carsPageContinueButton()
})

Then(/^I Click Continue button from Cars page for TA$/, async ()=>{
    await TACarsPage.carsPageContinueButtonTA()
})

Then(/^I Click Continue button from Cars page for CC$/, async ()=>{
    await TACarsPage.carsPageContinueButton()
})

Then(/^I select special service request$/,async ()=>{
    await TACarsPage.selectSSR("PPOC")
})
Then(/^I click on ok in special service request popup$/,async ()=>{
    await TACarsPage.closeSSR()
})