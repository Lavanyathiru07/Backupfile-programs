import Actions from '../../src/support/actions.js'
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
const departingSkipbundle="//form[@data-hook='flights-list_departing']//span[contains(text(),'No Thanks, Skip Bundle')]"
const returningSkipbundle="//form[@data-hook='flights-list_returning']//span[contains(text(),'No Thanks, Skip Bundle')]"
const departingbasicbundle="//form[@data-hook='flights-list_departing']//div[@type='allegiant basic bundle']"
const departingtotalbundle="//form[@data-hook='flights-list_departing']//div[@type='allegiant total bundle']"
const departingbonusbundle="//form[@data-hook='flights-list_departing']//div[@type='allegiant bonus bundle']"
const returningbasicbundle="//form[@data-hook='flights-list_returning']//div[@type='allegiant basic bundle']"
const returningtotalbundle="//form[@data-hook='flights-list_returning']//div[@type='allegiant total bundle']"
const returningbonusbundle="//form[@data-hook='flights-list_returning']//div[@type='allegiant bonus bundle']"	
const changebundle="//span[@class='Text-sc-1o5ubbx-0 euRnZu']"
const Returnbundleheading="//span[contains(text(),'Bundle and Save - Return Flight')]"
const Returnprice="(//form[@data-hook='flights-list_returning']//div[@data-hook='flight-price-box'])[1]"

let departDate
let returnDate
var flightPageCollector = new Map();

class FlightsPage {
    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
    }

    async flightsubmit() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.waitForDisplayed(submitflightpage, 'continue button', 30000)
        await this.actions.scroll(submitflightpage, 'continue button')
        await this.actions.waitForClickable(submitflightpage, 'continue button', 30000)
        await this.actions.clickElement('click', submitflightpage, "submit button in flights page")

        // Wait for page navigation after clicking continue
        await this.actions.waitUntilPageLoad()
        await this.actions.waitForLoadState('domcontentloaded', 15000)
    }

     async getTimeline() {
      await this.actions.pause(2000);
      const timelineURL = await this.actions.getUrl()
      console.log("timelineURL: ", timelineURL)
      const timelineId = timelineURL.split('/')
      process.env.timeline = timelineId[4]
    }


    async validateFlightPage() {
        await this.actions.waitUntilPageLoad()
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        if ((await this.actions.getUrl()).includes('manage-travel/')) {
            await this.actions.waitForURL('**/travelers', 30000)
            if (await this.actions.getTitle() === 'Travelers') {
                console.log('Successfully completed on Flight Page');
            } else {
                assert.fail('Something not proceed with Flight page')
            }
        } else {
            await this.actions.waitForURL('**/bundles', 30000)
            if (await this.actions.getTitle() === 'Bundles') {
                console.log('Successfully completed on Flight Page');
            } else {
                assert.fail('Something not proceed with Flight page')
            }
        }
    }

    async getSelectedDepartureDate() {
        try {
            await this.actions.waitForDisplayed(selectedDepartDate, 'selectedDepartDate')
            console.log("get dep date:" + await this.actions.getAttribute(selectedDepartDate, 'data-hook', 'selectedDepartDate'))
            departDate = (await this.actions.getAttribute(selectedDepartDate, 'data-hook', 'selectedDepartDate'))
                .slice(18);
        }
        catch (ex) {
        }
    }

    async getSelectedReturnDate() {
        // await this.actions.pause(1000);
        if (await this.actions.isDisplayed(selectedReturnDate, 'selectedReturnDate')) {
            try {
                returnDate = (await this.actions.getAttribute(selectedReturnDate, 'data-hook', 'selectedReturnDate'))
                    .slice(18);
            } catch (ex) {
            }
        }
    }

    async collectFlightPageDetails() {
        await this.actions.waitForDisplayed(flightheading, 'flightheading', 25000)
        await this.actions.waitUntilPageLoad()
        // await this.actions.pause(8000)
        try {
            if (await this.actions.isDisplayed(clickContinueButton, 'clickContinueButton')) {
                await this.getSelectedDepartureDate();
                flightPageCollector.set('departDate', departDate);
                flightPageCollector.set(
                    'departFlightFare',
                    (await this.actions.getText(SelectedFlightFare.replace('X', '1'), 'selected flight fare'))
                        .split('$')[1]
                );
                flightPageCollector.set(
                    'departFlightNum',
                    await this.actions.getText(selectedFlightNumbers.replace('X', '1'), 'selectedFlightNumbers')
                );
                flightPageCollector.set(
                    'FlightDepartTimeSeg1',
                    await this.actions.getText(selectedFlightDepartTime.replace('X', '1'), 'selectedFlightDepartTime')
                );
                flightPageCollector.set(
                    'FlightArrivalTimeSeg1',
                    await this.actions.getText(selectedFlightArrivalTime.replace('X', '1'), 'selectedFlightArrivalTime')
                );
                flightPageCollector.set('departureCity', await this.actions.getText(departureCity, 'departureCity'));
                flightPageCollector.set(
                    'destinationCity',
                    await this.actions.getText(destinationCity, 'destinationCity')
                );
                flightPageCollector.set(
                    'paxCount',
                    (await this.actions.getText(paxCount, 'pax count'))
                        .replace(' Seated', '')
                );
                if (await this.actions.isDisplayed(SelectedFlightFare.replace('X', '2'), 'SelectedFlightFare')) {
                    await this.getSelectedReturnDate();
                    flightPageCollector.set('returnDate', returnDate);
                    flightPageCollector.set(
                        'FlightDepartTimeSeg2',
                        await this.actions.getText(selectedFlightDepartTime.replace('X', '2'), 'selectedFlightDepartTime')
                    );
                    flightPageCollector.set(
                        'FlightArrivalTimeSeg2',
                        await this.actions.getText(selectedFlightArrivalTime.replace('X', '2'), 'selectedFlightArrivalTime')
                    );
                    flightPageCollector.set(
                        'returnFlightNum',
                        await this.actions.getText(selectedFlightNumbers.replace('X', '2'), 'selectedFlightNumbers')
                    );
                    try {
                        flightPageCollector.set(
                            'departFlightOriginalFare',
                            (await this.actions.getText(SelectedFlightOriginalFare.replace('X', '1'), 'selected flight fare'))
                                .split('$')[1]
                        );
                    }
                    catch (ex) {
                        flightPageCollector.set('departFlightOriginalFare', (await this.actions.getText(SelectedFlightdiscountedFare.replace('X', '1'),
                            'selected flight discounted fare'))
                            .split('$')[1]
                        );

                    }

                    flightPageCollector.set(
                        'returnFlightFare',
                        (await this.actions.getText(SelectedFlightFare.replace('X', '2'), 'selected flight fare')
                            .getText())
                            .split('$')[1]
                    );

                    try {
                        flightPageCollector.set(
                            'returnFlightOriginalFare',
                            (await this.actions.getText(SelectedFlightOriginalFare.replace('X', '2'), 'selected flight original fare'))
                                .split('$')[1]
                        );
                    }
                    catch (ex) {
                        flightPageCollector.set('returnFlightOriginalFare', (await this.actions.getText(SelectedFlightdiscountedFare.replace('X', '2'),
                            'selected flight discounted fare'))
                            .split('$')[1]
                        );

                    }
                }
            } else if ((await this.actions.getText(tripType, 'tripType')) === 'Round Trip') {
                var clickContinue;
                if (await eval(await this.actions.isDisplayed(flightDepartingList, 'flightDepartingList'))) {
                    clickContinue = await this.actions.isDisplayed(returnSelectedFlight, 'returnSelectedFlight');
                }
                if (clickContinue) {
                    clickContinue = await eval(await this.actions.isClickable(selectReturningFlight));
                }
                var checkReturnFlight = await this.actions.getElements(checkReturnFlightAvilable)
                var checkReturn;
                if (!clickContinue) {
                    do {
                        for (var i = 0; i < checkReturnFlight.length; i++) {
                            checkReturn = await this.actions.isClickable(checkReturnFlight[i]);
                            if (checkReturn) {
                                await this.actions.clickElement('click', checkReturnFlight[i], 'checkReturnFlight')
                                await this.actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                                break;
                            }
                        }
                        if (!checkReturn) {
                            await this.actions.clickElement('click', listViewReturnNextArrow, 'listViewReturnNextArrow')
                            if (await this.actions.isClickable(selectReturningFlight)) {
                                await this.actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                                checkReturn = true;
                                break;
                            }
                        }
                    } while (!checkReturn);
                    await this.actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                } else {
                    await this.actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                }
                if (await this.actions.isClickable(clickContinueButton)) {
                    await this.collectFlightPageDetails();
                }
            } else if ((await this.actions.getText(tripType, 'tripType')) === 'One way') {
                await this.actions.waitForNetworkIdle(15000);
                if (!(await this.actions.isDisplayed(flightDepartingList, 'flightDepartingList'))) {
                    // await browser.execute('window.scrollBy(0,-1000)');
                    await this.actions.waitForDisplayed(listViewDepartNextArrow, 'listViewDepartNextArrow')
                    await this.actions.clickElement('click', listViewDepartNextArrow, 'listViewDepartNextArrow')
                    // await this.actions.pause(3000)
                    await this.actions.waitForDisplayed(selectDepartingFlight, 'selectDepartingFlight')
                    // await this.actions.pause(3000)
                    await this.actions.clickElement('click', selectDepartingFlight, 'selectDepartingFlight')
                }
                if (await this.actions.isClickable(clickContinueButton)) {
                    await this.collectFlightPageDetails();
                }
            }
        } catch (ex) {
            console.log('Exception while collecting data on flights page: ' + ex);
        }
    }
async departingBundleSkip() {
  await this.actions.waitForLoadState('domcontentloaded', 30000)
  await this.actions.waitForDisplayed(departingSkipbundle, 'departingSkipbundle', 30000)
  //await this.actions.scroll(departingSkipbundle, 'departingSkipbundle')
  await this.actions.clickElement('click', departingSkipbundle, 'departingSkipbundle')
}
  
async returningBundleSkip() {
  await this.actions.waitForLoadState('domcontentloaded', 30000)
  if (await this.actions.isDisplayed(Returnbundleheading, 'Returnbundleheading')) {
    await this.actions.waitForDisplayed(returningSkipbundle, 'returningSkipbundle', 30000)
    await this.actions.scroll(returningSkipbundle, 'returningSkipbundle')
    await this.actions.clickElement('click', returningSkipbundle, 'returningSkipbundle')
  }
  else{
    await this.actions.clickElement('click', Returnprice, 'Returnprice')
     await this.actions.waitForDisplayed(returningSkipbundle, 'returningSkipbundle', 30000)
    await this.actions.scroll(returningSkipbundle, 'returningSkipbundle')
    await this.actions.clickElement('click', returningSkipbundle, 'returningSkipbundle')
}

}
async selectDepartingBundle(bundleType) {
  await this.actions.waitForLoadState('domcontentloaded', 30000)
  switch (bundleType) {
    case "basicbundle":     
      await this.actions.waitForDisplayed(departingbasicbundle, 'departingbasicbundle', 30000)
      await this.actions.clickElement('click', departingbasicbundle, 'departingbasicbundle')
      break;  
    case "totalbundle":
      await this.actions.waitForDisplayed(departingtotalbundle, 'departingtotalbundle', 30000)
      await this.actions.clickElement('click', departingtotalbundle, 'departingtotalbundle')
      break;        
    case "bonusbundle":
      await this.actions.waitForDisplayed(departingbonusbundle, 'departingbonusbundle', 30000)
      await this.actions.clickElement('click', departingbonusbundle, 'departingbonusbundle')
      break;        
    default:
      console.log("No matching bundle type found for departing flight");
  }
}
async selectReturningBundle(bundleType) {
  await this.actions.waitForLoadState('domcontentloaded', 30000)
  switch (bundleType) {
    case "basicbundle":     
      await this.actions.waitForDisplayed(returningbasicbundle, 'returningbasicbundle', 30000)  
      await this.actions.clickElement('click', returningbasicbundle, 'returningbasicbundle')
      break;
      case "totalbundle":
        await this.actions.waitForDisplayed(returningtotalbundle, 'returningtotalbundle', 30000)
        await this.actions.clickElement('click', returningtotalbundle, 'returningtotalbundle')
        break;
      case "bonusbundle":
        await this.actions.waitForDisplayed(returningbonusbundle, 'returningbonusbundle', 30000)
        await this.actions.clickElement('click', returningbonusbundle, 'returningbonusbundle')
        break;
    default:
      console.log("No matching bundle type found for returning flight");
  }}
}




export { departDate, returnDate, flightPageCollector };
export default FlightsPage