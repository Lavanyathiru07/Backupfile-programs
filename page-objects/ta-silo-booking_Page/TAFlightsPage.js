import actions from '@g4/prova-ui/src/support/actions'

const flightsDepartingArea = '#flights-wrapper #departing'
const flightsPageContinue = '.continue.enabled'
const departingFlights = '#flightchooser-departing li label'
const returningFlights = '#flightchooser-returning li label'
const noFlights = "//*[text()='We were unable to find any flights which met your search criteria.']"
class TAFlightPage{

    async waitForFlightPage() {
        await browser.waitUntil(async () => {
            return (await actions.isDisplayed(flightsDepartingArea, "flightsDepartingArea") === true)
        }, {
            timeout: 15000,
            timeoutMsg: 'flightsDepartingArea is not displayed after 15s'
        })
        let displayed = await actions.isDisplayed(noFlights, "no flight text")
        if(displayed){
            throw new Error("We were unable to find any flights which met your search criteria")
        }
    }

    async selectFirstDepartingFlight(){
        await this.waitForFlightPage()
        await actions.waitForClickable(departingFlights, "firstDepartingFlights")
        await actions.clickElement("click", departingFlights, "radioButtion")
    }
    
    async selectFirstReturningFlight(){
        await actions.waitForClickable(returningFlights, "firstReturningFlights")
        await actions.clickElement("click", returningFlights, "radioButtion")
    }

    async FlightsPageContinueButton(){
        await actions.waitForEnabled(flightsPageContinue, "FlightsPageContinueButton")
        await actions.waitForClickable(flightsPageContinue, "FlightsPageContinueButton")
            let clickable = await actions.isClickable(flightsPageContinue, "FlightsPageContinueButton")
            if (clickable) {
                await actions.scroll(flightsPageContinue)
                await actions.clickElement("click", flightsPageContinue, "FlightsPageContinueButton")
            } else {
                throw new Error("Flights page continue button is not clickable")
            }
    }
}
export default new TAFlightPage()