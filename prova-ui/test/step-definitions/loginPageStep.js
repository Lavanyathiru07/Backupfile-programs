import { Given, When, Then } from '@cucumber/cucumber';

Then(/^I log in using username "([^"]*)" and password "([^"]*)"$/, async function (username, password) {
    await this.LoginPage.clickLoginButton();
    await this.LoginPage.loginUsingCredentials(username, password);
});

Then(/^I create my allegaint account$/, async function () {
    await this.HomePage.loginlink()
    await this.LoginPage.createMyAllegiantAccount()
})