const { Given, When, Then } = require('@cucumber/cucumber');

Then(/^I log in using username "([^"]*)" and password "([^"]*)"$/, async function(username, password)  {
    await this.LoginPage.clickLoginButton();
    await this.LoginPage.loginUsingCredentials(username, password);
});