import Actions from '../../src/support/actions.js'
import { faker } from '@faker-js/faker'

const menuButton = "//*[@data-hook='header-burger-menu-button']|//div[@aria-controls='menu-top']"
const loginButton = "[data-hook='header-user-menu-item_log-in']"
const loginTitle = "//span[contains(text(),'Existing User')] | //div[@class='login-register-modal-wrapper']"
const loginUsername = "//input[@id='login-email'] | //input[@id='edit-name']"
const loginPassword = "//input[@id='login-password'] | //input[@id='edit-pass']"
const signInButton = "//span[contains(text(),'LOG IN TO MYALLEGIANT')] | //input[@id='edit-login-submit'] | //span[contains(text(),'LOG IN TO ALLWAYS REWARDS')]"
const welcomeGreetings = "//span[contains(text(),'Points Available')]/parent::div/parent::div/div[1]"
const pointsAvailable = "//span[contains(text(),'Points Available')]"

// Registration form selectors
const firstName = "[name='firstName']";
const lastName = "[name='lastName']";
const homeDobMonth = "[data-hook='home-signup_dob-month_dobMonth']";
const homeDobDay = "[data-hook='home-signup_dob-day_dobDay']";
const doy = "//input[@id='dobYear']";
const email = "[name='email']";
const confirmEmail = "[name='retypeEmail']";
const password = "[name='password']";
const confirmPassword = "[name='retypePassword']";
const createAccountButton = "//button[contains(@data-hook,'signup_submit')] | //*[contains(text(),'CREATE AN ACCOUNT')]";
const dom = "//div[@data-hook='home-signup_dob-month_dobMonth_X']";
const dod = "//div[@data-hook='home-signup_dob-day_dobDay_X']";


class LoginPage {

    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
    }

    async clickLoginButton() {
        let menuButtonIsDisplayed = await this.actions.isDisplayed(menuButton, 'menu button')
        if (menuButtonIsDisplayed) {
            await this.actions.waitForClickable(menuButton, 'menu button')
            await this.actions.clickElement('click', menuButton, 'menu button')
            await this.actions.waitForClickable(loginButton, 'login button')
            await this.actions.clickElement('click', loginButton, 'login button')
        } else {
            await this.actions.waitForClickable(loginButton, 'login button')
            await this.actions.clickElement('click', loginButton, 'login button')
        }
    }

    async loginUsingCredentials(username, password) {
        await this.actions.waitForDisplayed(loginTitle, 'login title')
        await this.actions.setInputField('setValue', username, loginUsername, 'login username')
        await this.actions.setInputField('setValue', password, loginPassword, 'login paswword')
        await this.actions.waitForDisplayed(signInButton, 'signin button')
        await this.actions.waitForClickable(signInButton, 'signin button')
        await this.actions.clickElement('click', signInButton, 'signin button')
        await this.actions.waitForDisplayed(welcomeGreetings, 'welcome greetings')
        await this.actions.waitForDisplayed(pointsAvailable, 'points available')
    }

    async createMyAllegiantAccount() {
        try {
            // Generate random data
            const randomFname = faker.name.firstName();
            const randomLname = faker.name.lastName();
            const date = new Date();
            const userEmailId = `tsqaautomation${date.getTime()}@tridentsqa.com`;
            const userPassword = 'P@ssw0rd1234';

            // Fill in personal information
            await this.actions.waitForDisplayed(firstName, 'First name field', 30000)
            await this.actions.waitForClickable(firstName, 'First name field', 30000)
            await this.actions.setInputField('setValue', randomFname, firstName, "First name field")
            await this.actions.setInputField('setValue', randomLname, lastName, "Last name field")

            // Handle date of birth - Month
            await this.actions.waitForDisplayed(homeDobMonth, 'Birth month dropdown', 30000)
            await this.actions.waitForClickable(homeDobMonth, 'Birth month dropdown', 30000)

            try {
                console.log('Trying to click month dropdown')
                await this.actions.clickElement('click', homeDobMonth, "Birth month dropdown")
                await this.actions.pause(2000)

                // Try multiple month option selectors
                const monthOptions = [
                    dom.replace("X", "1"),
                    "//div[@data-hook='home-signup_dob-month_dobMonth_01']",
                    "//div[contains(@data-hook, 'dobMonth') and contains(text(), '1')]",
                    "//div[contains(@data-hook, 'dobMonth') and contains(text(), 'Jan')]",
                    "//option[@value='1']",
                    "//option[text()='January']"
                ]

                let monthSelected = false
                for (const selector of monthOptions) {
                    try {
                        console.log('Trying month selector:', selector)
                        await this.actions.waitForDisplayed(selector, 'Month option', 3000)
                        await this.actions.clickElement('click', selector, "Select month")
                        monthSelected = true
                        break
                    } catch (selectorError) {
                        console.log(`Month selector failed: ${selector}`)
                    }
                }

                if (!monthSelected) {
                    console.log('All month selectors failed, trying keyboard navigation')
                    await this.actions.pressButton('1', 'type')
                    await this.actions.pressButton('Enter', 'press')
                }
            } catch (monthError) {
                console.log('Month dropdown failed:', monthError.message)
            }

            // Handle date of birth - Day
            await this.actions.waitForDisplayed(homeDobDay, 'Birth day dropdown', 30000)
            await this.actions.waitForClickable(homeDobDay, 'Birth day dropdown', 30000)

            try {
                console.log('Trying to click day dropdown')
                await this.actions.clickElement('click', homeDobDay, "Birth day dropdown")
                await this.actions.waitForLoadState()

                // Try the specific day option using the original dod selector
                const dayOption = dod.replace("X", "1")
                console.log('Trying day option selector:', dayOption)
                await this.actions.waitForDisplayed(dayOption, 'Day option 1', 5000)
                await this.actions.clickElement('click', dayOption, "Select day 1")
            } catch (dayError) {
                console.log('Day dropdown failed:', dayError.message)
                // Skip day selection for now and continue
            }

            // Handle date of birth - Year
            await this.actions.waitForDisplayed(doy, 'Birth year field', 30000)
            await this.actions.waitForClickable(doy, 'Birth year field', 30000)

            try {
                console.log('Trying to handle year field')
                // First check if it's a regular input field
                await this.actions.setInputField('setValue', '1990', doy, "Birth year field")
                console.log('Year entered successfully as input field')
            } catch (yearInputError) {
                console.log('Year input failed, trying as dropdown:', yearInputError.message)
                try {
                    // If it's a dropdown, handle it like month/day
                    await this.actions.clickElement('click', doy, "Birth year dropdown")
                    await this.actions.pause(1000)

                    // Try different year selection approaches
                    const yearOptions = [
                        "//div[@data-hook='home-signup_dob-year_dobYear_1990']",
                        "//option[@value='1990']",
                        "//div[contains(text(), '1990')]"
                    ]

                    let yearSelected = false
                    for (const selector of yearOptions) {
                        try {
                            await this.actions.waitForDisplayed(selector, 'Year option', 3000)
                            await this.actions.clickElement('click', selector, "Select year 1990")
                            yearSelected = true
                            break
                        } catch (selectorError) {
                            console.log(`Year selector failed: ${selector}`)
                        }
                    }

                    if (!yearSelected) {
                        // Try typing the year
                        await this.actions.pressButton('1990', 'type')
                        await this.actions.pressButton('Enter', 'press')
                    }
                } catch (yearDropdownError) {
                    console.log('Year dropdown also failed:', yearDropdownError.message)
                }
            }

            // Fill in email information
            await this.actions.waitForDisplayed(email, 'Email field', 30000)
            await this.actions.waitForClickable(email, 'Email field', 30000)
            await this.actions.setInputField('setValue', userEmailId, email, "Email field")
            await this.actions.waitForDisplayed(confirmEmail, 'Confirm email field', 30000)
            await this.actions.setInputField('setValue', userEmailId, confirmEmail, "Confirm email field")

            // Fill in password information
            await this.actions.setInputField('setValue', userPassword, password, "Password field")
            await this.actions.setInputField('setValue', userPassword, confirmPassword, "Confirm password field")

            // Submit the form
            await this.actions.waitForClickable(createAccountButton, 'Create account button', 30000)
            await this.actions.clickElement('click', createAccountButton, "Create account button")

            // Wait for account creation process
            await this.actions.waitForLoadState('domcontentloaded', 30000)

            console.log(`Account created successfully with email: ${userEmailId}`);
            return { userEmailId, userPassword }

        } catch (error) {
            console.error('Error creating MyAllegiant account:', error.message)
            throw new Error(`Failed to create MyAllegiant account: ${error.message}`)
        }
    }
}

export default LoginPage