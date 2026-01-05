import { Given, When, Then } from '@cucumber/cucumber';
import loginPage from '../page-objects/loginPagePlaywrightObject'


Then(/^I log in using username "([^"]*)" and password "([^"]*)"$/, async (username, password) => {
    await loginPage.clickLoginButton();
    await loginPage.loginUsingCredentials(username, password);
});