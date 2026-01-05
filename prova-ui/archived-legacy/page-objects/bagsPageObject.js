import actions from "../../src/support/actions"

const extrascroll = "[data-hook='extras-title']"
const boarding = "[data-hook='priority-boarding-card_add-to-cart']"
const departingleg = "//div[@data-hook='extras-popup-flight-leg_departing']/div[2]/div[1]"
const returnleg = "//div[@data-hook='extras-popup-flight-leg_returning']/div[2]/div[1]"
const priority = "[data-hook='priority-boarding-modal_add-to-cart']"
const tripFlex = "[data-hook='trip-flex-card_add-to-cart']"
const batteriesscroll = "[alt='Lithium Batteries']"
const continueb = "[data-hook='ancillaries-page_continue-popup']"
const popupContinueButton = "[data-hook='ancillaries-continue-popup_button_continue']"

class BagsPage {

    async selectingextraaccess()
    {
        await actions.scroll(extrascroll)
        await actions.clickElement('click',boarding,"boarding button")
        await actions.clickElement('click',departingleg,"departingleg checkbox")
        await actions.clickElement('click',returnleg,"returnleg checkbox")
        await actions.clickElement('click',priority,"priority access")
        await actions.clickElement('click',tripFlex,"tripflex selection")
    }

    async continueButt()
    {
        await actions.scroll(batteriesscroll)
        await actions.clickElement('click',continueb,"continue-button")
        await actions.clickElement('click',popupContinueButton,"pop-up button for continue")
    }

}
export default new BagsPage()