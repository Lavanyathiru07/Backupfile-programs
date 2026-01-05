import actions from "../../src/support/actions"

const iframe1 = "[title='Rokt placement']"
const iframe2 = "[title='Rokt offer']"
const buttonselector = "//*[contains(@class,'sc-GqePz')]"
const scrollmanage = "[data-hook='confirmation-page-section_customer-info_title']"
const managetravell = "//*[text()='Manage trip']"
const scrolloneway = "//*[text()='One Way']"

class ConfirmationPage {

    async managetrip()
    {
        if(await $(buttonselector).isDisplayed())
		{
			await actions.switchToFrame(iframe1,"first iframe")
			await actions.switchToFrame(iframe2,"second iframe")
            await actions.clickElement('click',buttonselector,"button to close the pop-up")
            await actions.switchToParentFrame()
            await actions.switchToParentFrame()
		}
		else{
			console.log("COOL!, No such frame popup got displayed")
		}

        await actions.scroll(scrollmanage)
        await actions.clickElement('click',managetravell,"manage travel button")
    }
}
export default new ConfirmationPage()