const Actions = require("../../src/support/actions")

const scrollitn = "[data-hook='confirmation-page-section_customer-info_title']"
const itnNumber = "[data-hook='confirmation-number_text']"
const iframe1 = "[title='Rokt placement']"
const iframe2 = "[title='Rokt offer']"
const buttonselector = "[data-e2e='lightboxClose']"
const scrollmanage = "[data-hook='confirmation-page-section_customer-info_title']"
const managetravell = "//*[text()='Manage trip']"

let itinerary

class ConfirmationPage {

    actions;

    constructor(page,context){
        this.actions=new Actions(page,context)
    }

    async confirmationNumber() {
        await this.actions.waitUntilPageLoad()
        await this.manageframes()
        await this.actions.waitForDisplayed(scrollitn, 'scroll itn')
        itinerary = await this.actions.getText(itnNumber, 'itnNumber')
        console.log("Generated ITN no : " + itinerary);
        process.env.confirmationNumber = itinerary
        return itinerary
    }
    async manageframes() {
        let iframeVisibility = await this.actions.isDisplayed(iframe1, "first iframe")
        if (iframeVisibility) {
            await this.actions.switchToFrame(iframe1, "first iframe")
            await this.actions.switchToFrame(iframe2, "second iframe")
            await this.actions.waitForDisplayed(buttonselector, 'buttonselector', 10000)
            await this.actions.waitForClickable(buttonselector, 'buttonselector')
            await this.actions.clickElement('click', buttonselector, "button to close the Rocketer pop-up")
            await this.actions.switchToParentFrame()
            await this.actions.switchToParentFrame()
        }
        else {
            console.log("COOL!, No such Rocketer popup got displayed")
        }
    }
    async managetrip() {
		await this.manageframes()
		await this.actions.waitForDisplayed(scrollmanage,'scroll manage')
        await this.actions.waitForDisplayed(managetravell,'manage travel button')
		await this.actions.clickElement('click', managetravell, "manage travel button")
        await this.actions.pause(10000)
        console.log("Before Swtich : " + await this.actions.getUrl())
        let newPageObject = await this.actions.switchWindow('/manage-travel')
        this.page = await newPageObject
        this.actions = new Actions(this.page, this.context)
        console.log("After Swtich : " + await this.actions.getUrl())
        await this.actions.pause(5000)
        return this.page
    }
}
module.exports = { itinerary, ConfirmationPage }
module.exports.default = ConfirmationPage