import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"
import { assert } from 'chai'

const advert = "[class='DestinationAdvert__Wrapper-xfecml-0 gAGMid']"
const submitflightpage = "[data-hook='flights-page_continue']"
const flightheading = "[data-hook='flights-page_page-heading']"
const clickContinueButton = "[data-hook='flights-page_continue']";
const checkReturnFlightAvilable =
    "//button[contains(@data-hook,'day-tab_returning')][@aria-selected='false']";
const selectedReturnDate =
    "//button[contains(@data-hook,'day-tab_returning')][@aria-selected='true']";
const selectedDepartDate =
    "//button[contains(@data-hook,'day-tab_departing')][@aria-selected='true']";
const SelectedFlightFare =
    "(//p[contains(text(), 'Selected Flight')]/../..//span[@data-hook='flight-price'])[X]";
const selectedFlightNumbers =
    "(//p[contains(text(),'Selected Flight')]/../../..//span//span[contains(@data-hook,'flight-number')])[X]";
const selectedFlightDepartTime =
    "(//p[contains(text(),'Selected Flight')]/../../..//p[contains(@data-hook,'flight-departure-time')])[X]";
const selectedFlightArrivalTime =
    "(//p[contains(text(),'Selected Flight')]/../../..//p[contains(@data-hook,'flight-arrival-time')])[X]";
const SelectedFlightOriginalFare =
    "(//p[contains(text(), 'Selected Flight')]/../..//del[contains(@aria-label,'original price')]//span)[X]";
const SelectedFlightdiscountedFare =
    "(//p[contains(text(), 'Selected Flight')]/../..//span[contains(@aria-label,'discounted price')]//span)[X]";
const returnSelectedFlight =
    "(//div[contains(@data-hook,'flight-price-box')]//p)[2]";
const selectReturningFlight =
    "(//form[@data-hook='flights-list_returning']//div[@data-hook='flight-price-box'])[1]";
const selectDepartingFlight =
    "(//form[@data-hook='flights-list_departing']//div//div//div//span[@data-hook='flight-price'])[1]";
const listViewDepartNextArrow = "[data-hook='next-arrow_departing']";
const listViewReturnNextArrow = "[data-hook='next-arrow_returning']";
const departureCity = "[data-hook='header-flight-info_origin']";
const destinationCity = "[data-hook='header-flight-info_destination']";
const paxCount = "[data-hook='header-flight-info_seated']";
const tripType = "[data-hook='header-flight-info_trip-type']";
const flightDepartingList = "[data-hook='flights-list_departing']";

let departDate
let returnDate
var flightPageCollector = new Map();

class FlightsPage {

    async flightsubmit() {
        await actions.waitForDisplayed(advert, 'advert')
        await actions.clickElement('click', submitflightpage, "submit button in flights page")
    }

    async validateFlightPage() {
        await actions.waitUntilPageLoad()
        await actions.pause(8000);
        if ((await browser.url()).includes('manage-travel/')) {
            await actions.pause(5000);
            if (await browser.title() === 'Travelers') {
                console.log('Successfully completed on Flight Page');
            } else {
                assert.fail('Something not proceed with Flight page')
            }
        } else {
            if (await browser.title() === 'Bundles') {
                console.log('Successfully completed on Flight Page');
            } else {
                assert.fail('Something not proceed with Flight page')
            }
        }
    }

    async getSelectedDepartureDate() {
        try {
            await actions.waitForDisplayed(selectedDepartDate,'selectedDepartDate')
            console.log("get dep date:" + await actions.getAttribute(selectedDepartDate, 'data-hook', 'selectedDepartDate'))
            departDate = (await actions.getAttribute(selectedDepartDate, 'data-hook', 'selectedDepartDate'))
                .slice(18);
        }
        catch (ex) {
        }
    }

    async getSelectedReturnDate() {
        // await actions.pause(1000);
        if (await actions.isDisplayed(selectedReturnDate, 'selectedReturnDate')) {
            try {
                returnDate = (await actions.getAttribute(selectedReturnDate, 'data-hook', 'selectedReturnDate'))
                    .slice(18);
            } catch (ex) {
            }
        }
    }

    async collectFlightPageDetails() {
        await actions.waitForDisplayed(flightheading, 'flightheading')
        try {
            if (await actions.isDisplayed(clickContinueButton, 'clickContinueButton')) {
                await this.getSelectedDepartureDate();
                flightPageCollector.set('departDate', departDate);
                flightPageCollector.set(
                    'departFlightFare',
                    (await actions.getText(SelectedFlightFare.replace('X', '1'), 'selected flight fare'))
                        .split('$')[1]
                );
                flightPageCollector.set(
                    'departFlightNum',
                    await actions.getText(selectedFlightNumbers.replace('X', '1'), 'selectedFlightNumbers')
                );
                flightPageCollector.set(
                    'FlightDepartTimeSeg1',
                    await actions.getText(selectedFlightDepartTime.replace('X', '1'), 'selectedFlightDepartTime')
                );
                flightPageCollector.set(
                    'FlightArrivalTimeSeg1',
                    await actions.getText(selectedFlightArrivalTime.replace('X', '1'), 'selectedFlightArrivalTime')
                );
                flightPageCollector.set('departureCity', await actions.getText(departureCity, 'departureCity'));
                flightPageCollector.set(
                    'destinationCity',
                    await actions.getText(destinationCity, 'destinationCity')
                );
                flightPageCollector.set(
                    'paxCount',
                    (await actions.getText(paxCount, 'pax count'))
                        .replace(' Seated', '')
                );
                if (await actions.isDisplayed(SelectedFlightFare.replace('X', '2'), 'SelectedFlightFare')) {
                    await this.getSelectedReturnDate();
                    flightPageCollector.set('returnDate', returnDate);
                    flightPageCollector.set(
                        'FlightDepartTimeSeg2',
                        await actions.getText(selectedFlightDepartTime.replace('X', '2'), 'selectedFlightDepartTime')
                    );
                    flightPageCollector.set(
                        'FlightArrivalTimeSeg2',
                        await actions.getText(selectedFlightArrivalTime.replace('X', '2'), 'selectedFlightArrivalTime')
                    );
                    flightPageCollector.set(
                        'returnFlightNum',
                        await actions.getText(selectedFlightNumbers.replace('X', '2'), 'selectedFlightNumbers')
                    );
                    try {
                        flightPageCollector.set(
                            'departFlightOriginalFare',
                            (await actions.getText(SelectedFlightOriginalFare.replace('X', '1'), 'selected flight fare'))
                                .split('$')[1]
                        );
                    }
                    catch (ex) {
                        flightPageCollector.set('departFlightOriginalFare', (await actions.getText(SelectedFlightdiscountedFare.replace('X', '1'),
                            'selected flight discounted fare'))
                            .split('$')[1]
                        );

                    }

                    flightPageCollector.set(
                        'returnFlightFare',
                        (await actions.getText(SelectedFlightFare.replace('X', '2'), 'selected flight fare')
                            .getText())
                            .split('$')[1]
                    );

                    try {
                        flightPageCollector.set(
                            'returnFlightOriginalFare',
                            (await actions.getText(SelectedFlightOriginalFare.replace('X', '2'), 'selected flight original fare'))
                                .split('$')[1]
                        );
                    }
                    catch (ex) {
                        flightPageCollector.set('returnFlightOriginalFare', (await actions.getText(SelectedFlightdiscountedFare.replace('X', '2'),
                            'selected flight discounted fare'))
                            .split('$')[1]
                        );

                    }
                }
            } else if ((await actions.getText(tripType, 'tripType')) === 'Round Trip') {
                var clickContinue;
                if (await eval(await actions.isDisplayed(flightDepartingList, 'flightDepartingList'))) {
                    clickContinue = await actions.isDisplayed(returnSelectedFlight, 'returnSelectedFlight');
                }
                if (clickContinue) {
                    clickContinue = await eval(await actions.isClickable(selectReturningFlight));
                }
                var checkReturnFlight = await browser.locator(checkReturnFlightAvilable).all()
                var checkReturn;
                if (!clickContinue) {
                    do {
                        for (var i = 0; i < checkReturnFlight.length; i++) {
                            checkReturn = await actions.isClickable(checkReturnFlight[i]);
                            if (checkReturn) {
                                await actions.clickElement('click', checkReturnFlight[i], 'checkReturnFlight')
                                await actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                                break;
                            }
                        }
                        if (!checkReturn) {
                            await actions.clickElement('click', listViewReturnNextArrow, 'listViewReturnNextArrow')
                            if (await actions.isClickable(selectReturningFlight)) {
                                await actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                                checkReturn = true;
                                break;
                            }
                        }
                    } while (!checkReturn);
                    await actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                } else {
                    await actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                }
                if (await actions.isClickable(clickContinueButton)) {
                    await this.collectFlightPageDetails();
                }
            } else if ((await actions.getText(tripType, 'tripType')) === 'One way') {
                if (!(await actions.isDisplayed(flightDepartingList, 'flightDepartingList'))) {
                    // await browser.execute('window.scrollBy(0,-1000)');
                    await actions.waitFor(listViewDepartNextArrow)
                    await actions.clickElement('click', listViewDepartNextArrow, 'listViewDepartNextArrow')
                    // await actions.pause(3000)
                    await actions.waitFor(selectDepartingFlight)
                    // await actions.pause(3000)
                    await actions.clickElement('click', selectDepartingFlight, 'selectDepartingFlight')
                }
                if (await actions.isClickable(clickContinueButton)) {
                    await this.collectFlightPageDetails();
                }
            }
        } catch (ex) {
            console.log('Exception while collecting data on flights page: ' + ex);
        }
    }
}

export { departDate, returnDate, flightPageCollector };
export default new FlightsPage()