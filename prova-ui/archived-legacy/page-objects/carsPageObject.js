import actions from "../../src/support/actions"

const carpagescroll = "[data-hook='cars-page_continue']"
const carskip = "[data-hook='cars-page_skip']"

class CarPage {

    async carspageskip()
    {
        await actions.scroll(carpagescroll)
        await actions.pause(3000)
        await actions.clickElement('click',carskip,"skip link in cars page")
    }
}
export default new CarPage()