import actions from "../../src/support/actions"

const menuButton = "//*[@data-hook='header-burger-menu-button']|//div[@aria-controls='menu-top']"
const loginButton = "[data-hook='header-user-menu-item_log-in']"
const loginTitle = "//span[contains(text(),'Existing User')] | //div[@class='login-register-modal-wrapper']"
const loginUsername = "//input[@id='login-email'] | //input[@id='edit-name']"
const loginPassword = "//input[@id='login-password'] | //input[@id='edit-pass']"
const signInButton = "//span[contains(text(),'LOG IN TO MYALLEGIANT')] | //input[@id='edit-login-submit'] | //span[contains(text(),'LOG IN TO ALLWAYS REWARDS')]"
const welcomeGreetings = "//span[contains(text(),'Points Available')]/parent::div/parent::div/div[1]"
const pointsAvailable = "//span[contains(text(),'Points Available')]"


class LoginPage {

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
}

export default new LoginPage()