import actions from '@g4/prova-ui/src/support/actions'
import seatsUpsell from '../CCModUpsellObject'

const seatsArea = '#seatchooser-wrapper .flight-container'
const depOnlyContinueButton = "#flight-tabs #departing button.continue"
const depContinueButton = '#flight-tabs #departing button.next-leg'
const retContinueButton = '#flight-tabs #returning button.continue'
const noSeatSelectedWidget = ".ui-dialog.popup_seats .message-wrapper"
const noSeatContinue = "//button[text()='Yes, continue']"
const seatContinue = "//button[contains(@class,'continue')]"
// const noSeatContinue = '.ui-dialog.popup_seats button.yes_no_seats.continue'

class TASeatsPage {

    async waitForSeatsPage() {
        await actions.waitForDisplayed(seatsArea, "seatChooserWrapperArea")
    }

    async SelectSeats(){
        if(process.env.ENV.includes("prod")){
            await seatsUpsell.selectAvailableSeats()
            await actions.scroll(seatContinue)
            await actions.waitForClickable(seatContinue, "DepartureContinueButton")
            await actions.clickElement('click', seatContinue, "clickDepartureContinueButton")
        }else{
            await seatsUpsell.selectSeatsTA()
        }
        
    }    

    async seatsPageContinueButton() {
        await this.waitForSeatsPage()

        // await actions.waitForClickable(depOnlyContinueButton, "DepartureOnlyContinueButton")
        let depOnlyClickable = await actions.isClickable(depOnlyContinueButton, "DepartureOnlyContinueButton")
        if (depOnlyClickable) {
            await actions.scroll(depOnlyContinueButton)
            await actions.clickElement('click', depOnlyContinueButton, "clickDepartureOnlyContinueButton")
        }

        let display = await actions.isDisplayed(depContinueButton, "DepartureContinueButton")
        if (display) {
        // await actions.waitForClickable(depContinueButton, "DepartureContinueButton")
        let depClickable = await actions.isClickable(depContinueButton, "DepartureContinueButton")
        if (depClickable) {
            await actions.scroll(depContinueButton)
            await actions.clickElement('click', depContinueButton, "clickDepartureContinueButton")
            await actions.waitForClickable(retContinueButton, "ReturnContinueButton")
            let retClickable = await actions.isClickable(retContinueButton, "ReturnContinueButton")
            if (retClickable) {
                await actions.scroll(retContinueButton)
                await actions.clickElement('click', retContinueButton, "clickReturnContinueButton")
            }
        }
    }

        await actions.waitForDisplayed(noSeatSelectedWidget, "seatsDialogPopUp")
        let displayed = await actions.isDisplayed(noSeatSelectedWidget, "seatsDialogPopUp")
        if (displayed) {
            await actions.waitForEnabled(noSeatContinue, "DialogPopUpContinueButton")
            await actions.waitForClickable(noSeatContinue, "DialogPopUpContinueButton")
            let popupClickable = await actions.isClickable(noSeatContinue, "DialogPopUpContinueButton")
            if (popupClickable) {
                await actions.scroll(noSeatContinue)
                await browser.pause(5000)
                await actions.clickElement('click', noSeatContinue, "DialogPopUpContinueButton")
            } else {
                throw new Error("DialogPopUpContinueButton is not clickable")
            }
        }
    }

}
export default new TASeatsPage()