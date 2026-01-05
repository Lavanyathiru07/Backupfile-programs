import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"

const onelineCheckin = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"
const checkinbutton = "//button[@class='Button__StyledButton-sc-1ececxa-1 jGMNve PageFooter__ContinueButton-sc-1me5dil-0 bmowAx']"
const iAgreeCovidPolicyCheckBox = "//*[@class='touch-friendly-checkbox small']"
const checkinbagspagecontinue = "(//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm'])[3]"
const checkinharadeouspagecontinue = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"

class CheckInPage {

    async onlineCheckin() {
        await actions.waitForDisplayed(onelineCheckin, 'check-in online link', 10000)
        await actions.scroll(onelineCheckin)
        await actions.waitForClickable(onelineCheckin, 'check-in online link')
        await actions.clickElement('click', onelineCheckin, "check-in online link")
        await actions.focusLastOpenedWindow()
    }

    async checkin() {
        await actions.pause(5000)
        await actions.scroll(checkinbutton)
        await actions.waitForDisplayed(checkinbutton, 'checkinbutton')
        await actions.clickElement('click', checkinbutton, "check-in button")
        await actions.pause(5000)
    }

    async PrintBoardingPasses() {
        await actions.pause(5000);
        let checkinstatusIsDisplayed = await actions.isDisplayed(checkinstatus, 'checkinstatus')
        if (checkinstatusIsDisplayed) {
            console.log("Checkin Passed")
        } else {
            console.log("Check in Failed");
        }
    }

    async selectCovidRestrictedArticalPolicy() {
		try {
			let covidPolicyPopUP = await actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
			if(covidPolicyPopUP) {
				await actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox');
				await actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
				await actions.pause(3000)
			} else {
				console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
			}
		} catch (ex) {
			console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
		}
	}

    async onlinecheckinbagspage() {
        await actions.pause(3000)
        await actions.click(checkinbagspagecontinue, 'checkin bags page continue button')
        await actions.pause(3000)
        await actions.click(checkinbagspagecontinue2, 'Bags page continue popup')
        await actions.pause(10000)
    }

    async onlinecheckinseatspage() {
        await actions.pause(5000)
        await actions.click(checkinharadeouspagecheckbox, 'checkinharadeouspagecheckbox')
        await actions.click(checkinharadeouspagecontinue, 'checkinharadeouspagecontinue')
        await actions.pause(5000)
        await actions.click(checkinseatpagecontinue, 'checkinseatpagecontinue')
        await actions.pause(20000)
    }

}
export default new CheckInPage()