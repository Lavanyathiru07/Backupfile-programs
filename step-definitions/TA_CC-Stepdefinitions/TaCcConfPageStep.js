import {Given, When, Then} from '@cucumber/cucumber'
import CCModUpsellObject from '../../page-objects/CCModUpsellObject';
import TAConfirmationPage from '../../page-objects/ta-silo-booking_Page/TAConfirmationPage'

var confirmationNumber

Then(/^Validate the ITN is created for TAPortal$/, async ()=>{
    confirmationNumber = await TAConfirmationPage.getConfirmationNumber() 
    process.env.confirmationNumber = confirmationNumber
    console.log("ITN number is...." + confirmationNumber);
})

Then(/^Validate the ITN is created$/, async ()=>{
    confirmationNumber = await TAConfirmationPage.getConfirmationNumber()
    process.env.confirmationNumber = confirmationNumber
    console.log("ITN number is...." + confirmationNumber);
})

Then(/^I should see ITN generated for Customer in Booking confirmation page$/, async ()=>{
    confirmationNumber = await TAConfirmationPage.getConfirmationNumber()
    process.env.confirmationNumber = confirmationNumber
    console.log("ITN number is...." + confirmationNumber);
})

Then(/^I create voucher$/,async ()=>{
    const voucherNumber = await CCModUpsellObject.createVoucher()
})

Then(/^I verify voucher$/,async ()=>{
    await CCModUpsellObject.VerifyVoucher()
})

Then(/^Refund and Cancel PROD ITN$/,async ()=>{
    await CCModUpsellObject.CancelProdITN()
})

Then(/^I Refund PROD Voucher$/,async ()=>{
    await CCModUpsellObject.CancelProdVoucher()
    await CCModUpsellObject.refundITN()
})