import Actions from "../../src/support/actions"
import Check from "../../src/support/validations"

const onelineCheckin = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"
const checkinbutton = "//button[@class='Button__StyledButton-sc-1ececxa-1 jGMNve PageFooter__ContinueButton-sc-1me5dil-0 bmowAx']"
const iAgreeCovidPolicyCheckBox = "//*[@class='touch-friendly-checkbox small']"
const checkinbagspagecontinue = "(//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm'])[3]"
const checkinbagspagecontinue2 = "//*[@data-hook='ancillaries-continue-popup_button_continue']"
const checkinharadeouspagecheckbox = "//*[contains(text(),'I agree to the above restricted')]/parent::label/div[2]"
const checkinharadeouspagecontinue = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"
const checkinseatpagecontinue = "//*[@data-hook='seats-page_skip']"
const checkinstatus = "//*[text()='CHECKED-IN']"

class CheckInPage {
    actions;

    constructor(page,context){
        this.actions=new Actions(page,context)
        this.check = new Check(page,context)
    }

    async onlineCheckin() {
        await this.actions.pause(5000)
        await this.actions.waitForDisplayed(onelineCheckin, 'check-in online link', 10000)
        // await this.actions.scroll(onelineCheckin)
        await this.actions.waitForClickable(onelineCheckin, 'check-in online link')
        await this.actions.clickElement('click', onelineCheckin, "check-in online link")
        await this.actions.focusLastOpenedWindow()
    }

    async checkin() {
        await this.actions.waitUntilPageLoad()
        await this.actions.pause(10000)
        // await this.actions.scroll(checkinbutton)
        await this.actions.waitForDisplayed(checkinbutton, 'checkinbutton')
        await this.actions.clickElement('click', checkinbutton, "check-in button")
        await this.actions.pause(10000)
        console.log(await this.actions.getUrl())
    }

    async PrintBoardingPasses() {
        await this.actions.pause(5000);
        let checkinstatusIsDisplayed = await this.actions.isDisplayed(checkinstatus, 'checkinstatus')
        if (checkinstatusIsDisplayed) {
            console.log("Checkin Passed")
        } else {
            console.log("Check in Failed");
        }
    }

    async selectCovidRestrictedArticalPolicy() {
		try {
			let covidPolicyPopUP = await this.actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
			if(covidPolicyPopUP) {
				await this.actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox');
				await this.actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
				await this.actions.pause(3000)
			} else {
				console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
			}
		} catch (ex) {
			console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
		}
	}

    async onlinecheckinbagspage() {
        await this.actions.pause(3000)
        await this.actions.click(checkinbagspagecontinue, 'checkin bags page continue button')
        await this.actions.pause(3000)
        await this.actions.click(checkinbagspagecontinue2, 'Bags page continue popup')
        await this.actions.pause(15000)
    }

    async onlinecheckinseatspage() {
        await this.actions.pause(30000)
        await this.actions.click(checkinharadeouspagecheckbox, 'checkinharadeouspagecheckbox')
        await this.actions.click(checkinharadeouspagecontinue, 'checkinharadeouspagecontinue')
        await this.actions.pause(5000)
        await this.actions.click(checkinseatpagecontinue, 'checkinseatpagecontinue')
        await this.actions.pause(20000)
    }

}
export default CheckInPage