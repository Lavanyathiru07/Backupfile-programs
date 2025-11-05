import actions from "../../src/support/actions"
import check from "../../src/support/validations"

class Amazon {

    async entering(value)
    {
        await actions.setInputField('setValue',value,"#twotabsearchtextbox")
        await actions.clickElement('click',"#nav-search-submit-button")
        await check.checkContainsText("#twotabsearchtextbox","contains test in input-field")
        // console.log(await browser.getCookies())
        await check.checkCookieExists('skin','cookiee name')
    }

    async alertboxverification()
    {
        await check.checkNewWindow('expecting the new window','')
        await check.checkModal('alertbox',true)
        await check.checkOffset(".signinbtn",541.90625,'x','sign-in button','')
        await check.checkProperty(false,".signinbtn",'name','proceed','signin-button',true)
        await actions.clickElement('click',".signinbtn","sign-in-button")
        await check.checkModal('alertbox',true)
        await check.checkModalText('alertbox',"Please enter a valid user name")
    }
    
}
export default new Amazon()