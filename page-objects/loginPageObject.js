import actions from '@g4/prova-ui/src/support/actions'
import faker from 'faker'

let userEmailId;
let userPassword;
const firstName = "[name='firstName']";
const lastName = "[name='lastName']";
const email = "[name='email']";
const confirmEmail = "[name='retypeEmail']";
const dobMonth = "[data-hook='booking-signup_dob-month_dobMonth']";
const homeDobMonth = "[data-hook='home-signup_dob-month_dobMonth']";
const dobDay = "[data-hook='booking-signup_dob-day_dobDay']";
const homeDobDay = "[data-hook='home-signup_dob-day_dobDay']";
const dobYear = "[data-hook='booking-signup_dob-year_dobYear']";
const homeDobYear = "[data-hook='home-signup_dob-year_dobYear']";
const password = "[name='password']";
const confirmPassword = "[name='retypePassword']";
const emailfield = "[data-hook='home-login_email-field_login-email']"
const pwdfield = "[data-hook='home-login_password-field_login-password']"
const submitbutton = "//span[contains(text(),'LOG IN')]"
const login_remember = "[data-hook='home-login_remember-me_rememberMe_label']"
const dom = "//div[@data-hook='home-signup_dob-month_dobMonth_X']";
const dod = "//div[@data-hook='home-signup_dob-day_dobDay_X']";
const doy = "//input[@id='dobYear']";
const createAccountButton = "//button[contains(@data-hook,'signup_submit')] | //*[contains(text(),'CREATE AN ACCOUNT')]";
const menuButton = "//*[@data-hook='header-burger-menu-button']|//div[@aria-controls='menu-top']";
const loginButton = "[data-hook='header-user-menu-item_log-in']";
const loginTitle = "//span[contains(text(),'Existing User')] | //div[@class='login-register-modal-wrapper']";
const loginUsername = "//input[@id='login-email'] | //input[@id='edit-name']";
const loginPassword = "//input[@id='login-password'] | //input[@id='edit-pass']";
const signInButton = "//span[contains(text(),'LOG IN TO MYALLEGIANT')] | //input[@id='edit-login-submit'] | //span[contains(text(),'LOG IN TO ALLWAYS REWARDS')]";
const welcomeGreetings = "//span[contains(text(),'Points Available')]/parent::div/parent::div/div[1]"
const pointsAvailable = "//span[contains(text(),'Points Available')]"
const profileTab = "//span[contains(text(),'Profile' )]"
const accountText = "//span[contains(text(),'Account Information' )]"
const editAddressInProfile = "//span[contains(text(),'Edit Address' )]"
let selectCountry
const countryField = "[data-hook='profile_billing-address-country']"
const enterCountryField = "//div[contains(text(),'Country / Location')]"
const address1 = "[data-hook='profile_billing-address-line-1']"
const address2 = "[data-hook='profile_billing-address-line-2']"
const cityField = "[data-hook='profile_billing-address-city-field']"
const selectStateField = "[data-hook='profile_billing-address-state-field']"
const postalcodeField = "[data-hook='profile_billing-address-zip-code']"
const saveButton = "[data-hook='submit-billing-address-form-button']"
const nameText = "//span[contains(text(),'Name')]"
let selectState

class Login {
     async generateRandom7DigitNumber() {
         const min = 1000000; // Minimum 7-digit number
         const max = 9999999; // Maximum 7-digit number
         return Math.floor(Math.random() * (max - min + 1)) + min;
     }

    async createMyAllegiantAccount() {
        const randomFname = await faker.name.firstName();
        const randomLname = await faker.name.lastName();
        //const date = new Date();
       // userEmailId = `tsqaautomation${date.getTime()}@tridentsqa.com`;
        const random7DigitNumber = await this.generateRandom7DigitNumber();     
        userEmailId = `tsqaautomationwdio${random7DigitNumber}@gmail.com`;
        userPassword = 'P@ssw0rd1234';
        await actions.setInputField('setValue', randomFname, firstName, "Firstname field")
        await actions.setInputField('setValue', randomLname, lastName, "Lastname Field")
        await actions.clickElement('click', homeDobMonth, "homeDobMonth")
        await actions.clickElement('click', dom.replace("X", "1"), "dom")
        await actions.clickElement('click', homeDobDay, "homeDobDay")
        await actions.clickElement('click', dod.replace("X", "1"), "dod")
        await actions.setInputField('setValue', '1990', doy, "Firstname field")
        await actions.setInputField('setValue', userEmailId, email, "username field")
        await actions.setInputField('setValue', userEmailId, confirmEmail, "confirm username field")
        await actions.setInputField('setValue', userPassword, password, "Password field")
        await actions.setInputField('setValue', userPassword, confirmPassword, "confirm Password field")
        await actions.isClickable(createAccountButton, 'createAccountButton')
        await actions.clickElement('click', createAccountButton, "createAccountButton")
        await actions.pause(3000)
        return { userEmailId, userPassword }
    }
    async login() {
        await actions.setInputField('setValue', "tsqa.automation+94720230112@allegiantsqa.com", emailfield, "username field")
        await actions.setInputField('setValue', "tsqa.automation+94720230112@allegiantsqa.com", pwdfield, "Password field")
        await actions.scroll(login_remember,'login_remember')
        await actions.clickElement('click', submitbutton, "submit button")
    }
    async clickLoginButton() {
        let menuButtonIsDisplayed = await actions.isDisplayed(menuButton, 'menu button')
        if (menuButtonIsDisplayed) {
            await actions.waitForClickable(menuButton, 'menu button')
            await actions.clickElement('click', menuButton, 'menu button')
            await actions.waitForClickable(loginButton, 'login button')
            await actions.clickElement('click', loginButton, 'login button')
        } else {
            await actions.waitForClickable(loginButton, 'login button')
            await actions.clickElement('click', loginButton, 'login button')
        }
    }
    async loginUsingCredentials(username, password) {
        await actions.waitForDisplayed(loginTitle, 'login title')
        await actions.setInputField('setValue', username, loginUsername, 'login username')
        await actions.setInputField('setValue', password, loginPassword, 'login paswword')
        await actions.waitForDisplayed(signInButton, 'signin button')
        await actions.waitForClickable(signInButton, 'signin button')
        await actions.clickElement('click', signInButton, 'signin button')
        await actions.waitForDisplayed(welcomeGreetings, 'welcome greetings')
        await actions.waitForDisplayed(pointsAvailable, 'points available')
    }
    async selectBillingAddressOptionInProfile() {
        await actions.click(pointsAvailable, 'points available')
        await actions.click(profileTab, "profileTab")
        await actions.waitForDisplayed(accountText, "accountText")
        await actions.scroll(editAddressInProfile, "editAddressInProfile")
        await actions.isDisplayed(editAddressInProfile, "editAddressInProfile")
        await actions.click(editAddressInProfile, "editAddressInProfile")
    }
    async addBillingAddressInProfile(country, addressLine1, addressLine2, city, state, postalcode) {
        await actions.waitForDisplayed(nameText, "nameText")
        selectCountry = `//div[contains(text(),'${country}' )]`
        selectState = `//div[contains(text(),'${state}')]`
        await actions.scroll(countryField, "countryField")
        await actions.click(enterCountryField, "enterCountryField")
        await actions.waitForDisplayed(selectCountry, "selectCountry")
        await actions.click(selectCountry, "selectCountry")
        await actions.waitForDisplayed(address1, "addressLine1")
        await actions.setInputField('setValue', addressLine1, address1, "addressLine1")
        await actions.setInputField('setValue', addressLine2, address2, "addressLine2")
        await actions.setInputField('setValue', city, cityField, "city")
        await actions.click(selectStateField, "selectStateField")
        await actions.waitForDisplayed(selectState, "selectState")
        await actions.click(selectState, "selectState")
        await actions.setInputField('setValue', postalcode, postalcodeField, "postalcode")
        await actions.click(saveButton, "saveButton")
    }
    // async editBillingAddressInProfile(country, addressLine1, addressLine2, city, state, postalcode) {
    //     await actions.waitForDisplayed(nameText, "nameText")
    //     selectCountry = `//div[contains(text(),'${country}' )]`
    //     selectState = `//div[contains(text(),'${state}')]`
    //     await actions.scroll(countryField, "countryField")
    //     await actions.waitForDisplayed(selectCountry, "selectCountry")
    //     await actions.click(selectCountry, "selectCountry")
    //     await actions.waitForDisplayed(address1, "addressLine1")
    //     await actions.clearInputField(address1, "addressLine1")
    //     await actions.pause(2000)
    //     await actions.setInputField('setValue', addressLine1, address1, "addressLine1")
    //     await actions.clearInputField(address2, "addressLine2")
    //     await actions.pause(2000)
    //     await actions.setInputField('setValue', addressLine2, address2, "addressLine2")
    //     await actions.clearInputField(cityField, "city")
    //     await actions.pause(2000)
    //     await actions.setInputField('setValue', city, cityField, "city")
    //     await actions.click(selectStateField, "selectStateField")
    //     await actions.waitForDisplayed(selectState, "selectState")
    //     await actions.click(selectState, "selectState")
    //     await actions.clearInputField(postalcodeField, "postalcode")
    //     await actions.pause(2000)
    //     await actions.setInputField('setValue', postalcode, postalcodeField, "postalcode")
    //     await actions.click(saveButton, "saveButton")
    // }
}

export default new Login()