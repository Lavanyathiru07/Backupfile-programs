import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks";

const scrollitn = "[data-hook='confirmation-page-section_customer-info_title']"
const itnNumber = "[data-hook='confirmation-number_text']"
const iframe1 = "[title='Rokt placement']"
const iframe2 = "[title='Rokt offer']"
const buttonselector = "[data-e2e='lightboxClose']"
const scrollmanage = "[data-hook='confirmation-page-section_customer-info_title']"
const managetravell = "//*[text()='Manage trip']"

let itinerary

class ConfirmationPage {
    async confirmationNumber() {
        await actions.waitUntilPageLoad()
        await this.manageframes()
        await actions.waitForDisplayed(scrollitn, 'scroll itn')
        itinerary = await actions.getText(itnNumber, 'itnNumber')
        console.log("Generated ITN no : " + itinerary);
        process.env.confirmationNumber = itinerary
        return itinerary
    }
    async manageframes() {
        let iframeVisibility = await actions.isDisplayed(iframe1, "first iframe")
        if (iframeVisibility) {
            await actions.switchToFrame(iframe1, "first iframe")
            await actions.switchToFrame(iframe2, "second iframe")
            await actions.waitForDisplayed(buttonselector, 'buttonselector', 10000)
            await actions.waitForClickable(buttonselector, 'buttonselector')
            await actions.clickElement('click', buttonselector, "button to close the Rocketer pop-up")
            await actions.switchToParentFrame()
            await actions.switchToParentFrame()
        }
        else {
            console.log("COOL!, No such Rocketer popup got displayed")
        }
    }
    async managetrip() {
		await this.manageframes()
		await actions.waitForDisplayed(scrollmanage,'scroll manage')
        await actions.waitForDisplayed(managetravell,'manage travel button')
		await actions.clickElement('click', managetravell, "manage travel button")
		await actions.switchWindow('/manage-travel')
        console.log(await browser.url())
        // await actions.waitUntilPageLoad()
	}
}
export { itinerary }
export default new ConfirmationPage()