import { Then,When} from '@cucumber/cucumber';
import LoginPage from '../page-objects/loginPageObject'
import homePage from '../page-objects/homePageObject'
import paymentPageObj from '../page-objects/paymentPageObj';
Then(/^I login to the application$/, async () => {
    await LoginPage.login()
})

Then(/^I create my allegaint account$/, async () => {
    await homePage.loginlink()
    await LoginPage.createMyAllegiantAccount()
})

Then(/^I log in using username "([^"]*)" and password "([^"]*)"$/, async (username, password) => {
	await LoginPage.clickLoginButton();
    await LoginPage.loginUsingCredentials(username, password);
});
Then(/^I create account and login using,username and password$/, async () => {
    await LoginPage.clickLoginButton();
	let {userEmailId,userPassword}=await LoginPage.createMyAllegiantAccount()
    await LoginPage.loginUsingCredentials(userEmailId, userPassword);
});
When(/^I select edit billing address option in profile$/, async () => {
	await LoginPage.selectBillingAddressOptionInProfile();
});
When(/^I add country "([^"]*)" address1 "([^"]*)" address2 "([^"]*)" city "([^"]*)" state "([^"]*)" and zipcode "([^"]*)"$/,async(country,addressLine1,addressLine2,city,state,postalcode)=>{
await paymentPageObj.checkPaymentAddress(addressLine1)
await paymentPageObj.checkPaymentAddress(addressLine2)
    await LoginPage.addBillingAddressInProfile(country,addressLine1,addressLine2,city,state,postalcode)
})
// When(/^I edit country "([^"]*)" address1 "([^"]*)" address2 "([^"]*)" city "([^"]*)" state "([^"]*)" and zipcode "([^"]*)"$/,async(country,addressLine1,addressLine2,city,state,postalcode)=>{
//     await paymentPageObj.checkPaymentAddress(addressLine1)
//     await paymentPageObj.checkPaymentAddress(addressLine2)
//         await LoginPage.editBillingAddressInProfile(country,addressLine1,addressLine2,city,state,postalcode)
//     })