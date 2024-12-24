import {Given, When, Then} from '@cucumber/cucumber'
import TAPaymentsPage from '../../page-objects/ta-silo-booking_Page/TAPaymentsPage'

Then(/^I Click Tripflex as "([^"]*)" for TAPortal$/,async (TF)=>{
    await TAPaymentsPage.selectTripFlex(TF)
})

Then(/^I click on "([^"]*)" do not add Trip Flex to my trip on the popup$/,async (TF)=>{
    await TAPaymentsPage.selectTripFlex(TF)
})

Then(/^I Provide Credit card details for TAPortal$/,async ()=>{
    await TAPaymentsPage.enterCardDetails()
})

Then(/^I enter Card Number details in payment page$/,async ()=>{
    await TAPaymentsPage.enterCardDetails()
})

Then(/^I Provide Personal details of the Card for TAPortal$/,async ()=>{
    const { firstname, lastname } = await TAPaymentsPage.enterPersonalDetails()
    console.log("Firstname is: " +firstname);
    console.log("Lastname is: " +lastname);
})

Then(/^I enter street address details in payment page$/,async ()=>{
    const { firstname, lastname } = await TAPaymentsPage.enterPersonalDetails()
    console.log("Firstname is: " +firstname);
    console.log("Lastname is: " +lastname);
})

Then(/^I Provide Mobile or Primary Phone number for TAPortal$/,async ()=>{
    await TAPaymentsPage.enterPhoneNumber()
})

Then(/^I Provide Email Address text box for TAPortal$/,async ()=>{
    const { email } = await TAPaymentsPage.enterEmailAddress()
    console.log("EmailID is: " +email);
})

Then(/^I enter email address in payment page$/,async ()=>{
    await TAPaymentsPage.enterPhoneNumber()
    const { email } = await TAPaymentsPage.enterEmailAddress()
    console.log("EmailID is: " +email);
})

Then(/^Click Accept Conditions checkbox for TAPortal$/,async ()=>{
    await TAPaymentsPage.uncheckMarketingCheckbox();
    await TAPaymentsPage.acceptTerms();
})

Then(/^I select The customer agrees to the Terms and Conditions above checkbox in payment page$/,async ()=>{
    await TAPaymentsPage.uncheckMarketingCheckbox();
    await TAPaymentsPage.acceptTerms();
})

Then(/^I Click Purchase my Trip for TAPortal$/,async ()=>{
    await TAPaymentsPage.clickPurchaseButton();
})

Then(/^I click on Purchase trip in payment page$/,async ()=>{
    await TAPaymentsPage.clickPurchaseButton();
})

Then(/^I am on paymentspage I complete the payment$/, async ()=>{
    await TAPaymentsPage.enterCardDetails()
    const { firstname, lastname } = await TAPaymentsPage.enterPersonalDetails()
    await TAPaymentsPage.enterPhoneNumber()
    const { email } = await TAPaymentsPage.enterEmailAddress()
    TAPaymentsPage.uncheckMarketingCheckbox();
    TAPaymentsPage.acceptTerms();
    TAPaymentsPage.clickPurchaseButton();

    console.log("Firstname is: " +firstname);
    console.log("Lastname is: " +lastname);
    console.log("EmailID is: " +email);
})