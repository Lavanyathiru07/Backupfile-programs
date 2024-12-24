import actions from '@g4/prova-ui/src/support/actions'
import fakeData from 'faker'

const bagsArea = "#bagchooser-wrapper #bagchooser"
const bagsPagecontinue = "#bagchooser button.continue"

const carryOnOption = "[name='flight_extras[bin_bags]']"
const checkedOption = "[name='flight_extras[checked_bags]']"
const priorityAccessOption = "[name='flight_extras[priority_boarding_selected]']"

class TABagsPage {

    async waitForBagsPage() {
        await actions.waitForDisplayed(bagsArea, "bagsChooserArea")
    }

    async selectBags(carryOn, checked, priorityAccess) {
        await this.selectCarryOnBags(carryOn)
        await this.selectCheckedInBags(checked)
        await this.selectPriorityAccess(priorityAccess)
    }

    async selectCarryOnBags(carry) {
        let carryOn = carry.toLowerCase()
        if(carryOn === "no"){
            carryOn = "0"
        }
        await this.waitForBagsPage()
        await actions.waitForEnabled(carryOnOption, "carryOn bag dropdown")
            await actions.scroll(carryOnOption)
            await actions.selectOption(carryOnOption, 'value', carryOn)
    }

    async selectCheckedInBags(check) {
        let checked = check.toLowerCase()
        if(checked === "no"){
            checked = "0"
        }
        await actions.waitForEnabled(checkedOption, "checkedIn bag dropdown")
            await actions.selectOption(checkedOption, 'value', checked)
    }

    async selectPriorityAccess(priorityAccess) {
        let PA = priorityAccess.toLowerCase()

        await actions.waitForEnabled(priorityAccessOption, "priorityAccess dropdown")
            if (PA === 'no') {
                await actions.selectOption(priorityAccessOption, 'value', 'false')
            } else {
                await actions.selectOption(priorityAccessOption, 'value', 'true')
            }
    }

    async bagsPageContinueButton() {
        await actions.waitForEnabled(bagsPagecontinue, "BagsPage Continue Button")
        await actions.waitForClickable(bagsPagecontinue, "BagsPage Continue Button")
        let clickable = await actions.isClickable(bagsPagecontinue, "BagsPage Continue Button")
        if (clickable) {
            await actions.scroll(bagsPagecontinue)
            await actions.clickElement('click', bagsPagecontinue, "BagsPage Continue Button")
        } else {
            throw new Error("BagsPage Continue Button is not clickable")
        }
    }
}
export default new TABagsPage()