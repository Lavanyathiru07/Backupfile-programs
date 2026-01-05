
import actions from "../../src/support/actions"

const emailfield = "[data-hook='home-login_email-field_login-email']"
const pwdfield = "[data-hook='home-login_password-field_login-password']"
const submitbutton = "//span[contains(text(),'LOG IN')]"
const login_remember = "[data-hook='home-login_remember-me_rememberMe_label']"

class Login{
    async login()       
    {
        await actions.setInputField('setValue',"Karth.patn@allegiantair.com",emailfield,"username field")
        await actions.setInputField('setValue',"Karthi@123",pwdfield,"Password field")
        await actions.scroll(login_remember)
        await actions.clickElement('click',submitbutton,"submit button")
    }
}

export default new Login()