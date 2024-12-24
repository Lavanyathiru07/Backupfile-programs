import { Given, When, Then } from '@cucumber/cucumber'
import JeeFourPortal from '../../page-objects/CCModUpsellObject'
import TAConfirmationPage from '../../page-objects/ta-silo-booking_Page/TAConfirmationPage'

Given(/^I navigate to g4Portal$/, async () => {
    await JeeFourPortal.navigateToG4portal()
})

Given(/^I navigate to the g4Portal$/, async () => {
    await JeeFourPortal.navigateToTheG4portal()
})

Then(/^I click on MOD button$/, async () => {
    await JeeFourPortal.selectAppFromG4Portal('MOD')
})

Given(/^I enter Confirmation as "([^"]*)"$/, async (ITN) => {
    ITN = TAConfirmationPage.confirmationNumber
    console.log("new ITN is ", ITN)
    await JeeFourPortal.itineraryNumber(ITN)
})

Then(/^I Click Manage Travel for TAPortal$/, async ()=>{
    await JeeFourPortal.clickManageTravel()
})

Given(/^I RetrieveITN By ConfirmationNumber for TAPortal$/, async () => {
    let ITN = TAConfirmationPage.confirmationNumber
    console.log("new ITN is ", ITN)
    await JeeFourPortal.enteritenaryDetails(ITN)
})

Then(/^I should click on search button in ccmod$/, async () => {
    await JeeFourPortal.infoSearchforITN()
})

Then(/^I should click on bag link$/, async () => {
    await JeeFourPortal.clickBagLink()
})

Given(/^I select carry on bag from drop down$/, async () => {
    await JeeFourPortal.selectCarryonBag()
})

Given(/^I select "([^"]*)" in drop down for carry on bag$/, async (value) => {
    await JeeFourPortal.selectCarryonBag()
})

Given(/^I select "([^"]*)" in drop down for checked In bag$/, async (value) => {
    await JeeFourPortal.selectCheckedInBag(value)
})

Then(/^I should click on Done button$/, async () => {
    await JeeFourPortal.clickDoneButton()
})

Then(/^I click on seats in the confirmation page$/, async () => {
    await JeeFourPortal.seatSelection()
})

Then(/^I select any seat which is available$/, async () => {
    await JeeFourPortal.selectSeatsRandomly()
})

Then(/^I Click Add or Change Seats for TAPortal$/,async ()=>{
    await JeeFourPortal.clickAddSeats()
})

Then(/^I Select a Available Seat for TAPortal$/, async () => {
    if(process.env.ENV.includes("prod")){
        await JeeFourPortal.selectAvailableSeats()
        await JeeFourPortal.SelectSeatsContinue()
    }else{
        await JeeFourPortal.selectSeatsTA()
    }
})

Then(/^I should click on Done button in seat selection page$/, async () => {
    await JeeFourPortal.clickSeatDoneButton()
})

Then(/^I should click on Accept and continue button$/, async () => {
    await JeeFourPortal.clickacceptandContinue()
})

Then(/^I should type card number$/, async () => {
    await JeeFourPortal.cardDetails()
})

Then(/^I should type security code$/, async () => {
    await JeeFourPortal.securityCodeDetails()
})

Then(/^I should click on Add Payment button$/, async () => {
    await JeeFourPortal.clickaddPayment()
})

Then(/^I should type received from field$/, async () => {
    await JeeFourPortal.fillingReceivedForm()
})

Then(/^I should click on submit button$/, async () => {
    await JeeFourPortal.clicksubmitbutton()
})

Then(/^I should click on Confirm and Redisplay button$/, async () => {
    await JeeFourPortal.confirmAndRedisplay()
})

Then(/^I click on Payment tab$/, async () => {
    await JeeFourPortal.clickPaymentTab()
})

Then(/^I Verify Balance Amount$/, async () => {
    await JeeFourPortal.validatingBalanceAmount()
})