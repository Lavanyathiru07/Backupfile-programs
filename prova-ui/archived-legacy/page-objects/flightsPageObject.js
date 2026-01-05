import actions from "../../src/support/actions"

const advert = "[class='DestinationAdvert__Wrapper-xfecml-0 gAGMid']"
const submitflightpage = "[data-hook='flights-page_continue']"

class FlightsPage {

    async flightsubmit()
    {
        await actions.waitForDisplayed(advert, 'advert')
        await actions.clickElement('click',submitflightpage,"submit button in flights page")
        await actions.pause(5000)
    }
}

export default new FlightsPage()