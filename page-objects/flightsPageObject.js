import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'
import { assert } from 'chai';

const advert = "[class='DestinationAdvert__Wrapper-xfecml-0 gAGMid']"
const flightheading = "[data-hook='flights-page_page-heading']"
const clickContinueButton = "[data-hook='flights-page_continue']";
const submitflightpage = "[data-hook='flights-page_continue']"
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
const bundleHeader = "[data-hook='bundles-page_page-heading']"
const departingSkipbundle="//form[@data-hook='flights-list_departing']//span[contains(text(),'No Thanks, Skip Bundle')]"
const returningSkipbundle="//form[@data-hook='flights-list_returning']//span[contains(text(),'No Thanks, Skip Bundle')]"
const departingbasicbundle="//form[@data-hook='flights-list_departing']//div[@type='allegiant basic bundle']"
const departingtotalbundle="//form[@data-hook='flights-list_departing']//div[@type='allegiant total bundle']"
const departingbonusbundle="//form[@data-hook='flights-list_departing']//div[@type='allegiant bonus bundle']"
const returningbasicbundle="//form[@data-hook='flights-list_returning']//div[@type='allegiant basic bundle']"
const returningtotalbundle="//form[@data-hook='flights-list_returning']//div[@type='allegiant total bundle']"
const returningbonusbundle="//form[@data-hook='flights-list_returning']//div[@type='allegiant bonus bundle']"	

let departDate
let returnDate
// let timelineID
var flightPageCollector = new Map();

class FlightsPage {

  async getSelectedDepartureDate() {
    try {
      departDate = (await $(selectedDepartDate)
        .getAttribute('data-hook'))
        .slice(18);
    }
    catch (ex) {
    }
  }

  async getSelectedReturnDate() {
    await actions.pause(1000);
    if (await actions.isDisplayed(selectedReturnDate, 'selectedReturnDate')) {
      try {
        returnDate = (await $(selectedReturnDate)
          .getAttribute('data-hook'))
          .slice(18);
      } catch (ex) {
      }
    }
  }

  async collectFlightPageDetails() {
    await actions.waitForDisplayed(flightheading, 'flightheading', 60000)
    try {
      let clickContinueButtonVisibilty = await actions.isDisplayed(clickContinueButton, 'clickContinueButton')
      if (clickContinueButtonVisibilty) {
        await this.getSelectedDepartureDate();
        flightPageCollector.set('departDate', departDate);
        flightPageCollector.set(
          'departFlightFare',
          (await $(SelectedFlightFare.replace('X', '1'))
            .getText())
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
          (await $(paxCount)
            .getText())
            .replace(' Seated', '')
        );
        let SelectedFlightFareVisibilty = await actions.isDisplayed(SelectedFlightFare.replace('X', '2'), 'SelectedFlightFare')
        if (SelectedFlightFareVisibilty) {
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
              (await $(SelectedFlightOriginalFare.replace('X', '1'))
                .getText())
                .split('$')[1]
            );
          }
          catch (ex) {
            flightPageCollector.set('departFlightOriginalFare', (await $(SelectedFlightdiscountedFare.replace('X', '1'))
              .getText())
              .split('$')[1]
            );

          }

          flightPageCollector.set(
            'returnFlightFare',
            (await $(SelectedFlightFare.replace('X', '2'))
              .getText())
              .split('$')[1]
          );

          try {
            flightPageCollector.set(
              'returnFlightOriginalFare',
              (await $(SelectedFlightOriginalFare.replace('X', '2'))
                .getText())
                .split('$')[1]
            );
          }
          catch (ex) {
            flightPageCollector.set('returnFlightOriginalFare', (await $(SelectedFlightdiscountedFare.replace('X', '2'))
              .getText())
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
          clickContinue = await eval(await actions.isClickable(selectReturningFlight, 'selectReturningFlight'));
        }
        var checkReturnFlight = await browser.$$(checkReturnFlightAvilable);
        var checkReturn;
        if (!clickContinue) {
          do {
            for (var i = 0; i < checkReturnFlight.length; i++) {
              checkReturn = await actions.isClickable(checkReturnFlight[i], 'checkReturnFlight');
              if (checkReturn) {
                await actions.clickElement('click', checkReturnFlight[i], 'checkReturnFlight')
                await actions.clickElement('click', selectReturningFlight, 'selectReturningFlight')
                break;
              }
            }
            if (!checkReturn) {
              await actions.clickElement('click', listViewReturnNextArrow, 'listViewReturnNextArrow')
              if (await actions.isClickable(selectReturningFlight, 'selectReturningFlight')) {
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
        if (await actions.isClickable(clickContinueButton, 'clickContinueButton')) {
          await this.collectFlightPageDetails();
        }
      } else if ((await actions.getText(tripType, 'tripType')) === 'One way') {
        if (!(await actions.isDisplayed(flightDepartingList, 'flightDepartingList'))) {
          await browser.execute('window.scrollBy(0,-1000)');
          await actions.clickElement('click', listViewDepartNextArrow, 'listViewDepartNextArrow')
          await actions.clickElement('click', selectDepartingFlight, 'selectDepartingFlight')
        }
        if (await actions.isClickable(clickContinueButton, 'clickContinueButton')) {
          await this.collectFlightPageDetails();
        }
      }
    } catch (ex) {
      console.log('Exception while collecting data on flights page: ' + ex);
    }
  }
  async departingBundleSkip() {
  await actions.waitForDisplayed(departingSkipbundle, 'departingSkipbundle', 5000)
  await actions.clickElement('click', departingSkipbundle, 'departingSkipbundle')
}
  
async returningBundleSkip() {
await actions.waitForDisplayed(returningSkipbundle, 'returningSkipbundle', 5000)
await actions.clickElement('click', returningSkipbundle, 'returningSkipbundle')
}
async selectDepartingBundle(bundleType) {
  switch (bundleType) {
    case "basicbundle":     
      await actions.waitForDisplayed(departingbasicbundle, 'departingbasicbundle', 5000)
      await actions.clickElement('click', departingbasicbundle, 'departingbasicbundle')
      break;  
    case "totalbundle":
      await actions.waitForDisplayed(departingtotalbundle, 'departingtotalbundle', 5000)
      await actions.clickElement('click', departingtotalbundle, 'departingtotalbundle')
      break;        
    case "bonusbundle":
      await actions.waitForDisplayed(departingbonusbundle, 'departingbonusbundle', 5000)
      await actions.clickElement('click', departingbonusbundle, 'departingbonusbundle')
      break;        
    default:
      console.log("No matching bundle type found for departing flight");
  }
}
async selectReturningBundle(bundleType) {
  switch (bundleType) {
    case "basicbundle":     
      await actions.waitForDisplayed(returningbasicbundle, 'returningbasicbundle', 5000)  
      await actions.clickElement('click', returningbasicbundle, 'returningbasicbundle')
      break;
      case "totalbundle":
        await actions.waitForDisplayed(returningtotalbundle, 'returningtotalbundle', 5000)
        await actions.clickElement('click', returningtotalbundle, 'returningtotalbundle')
        break;
      case "bonusbundle":
        await actions.waitForDisplayed(returningbonusbundle, 'returningbonusbundle', 5000)
        await actions.clickElement('click', returningbonusbundle, 'returningbonusbundle')
        break;
    default:
      console.log("No matching bundle type found for returning flight");
  }}
  
  async flightsubmit() {
    await actions.waitForDisplayed(submitflightpage, "submit button in flights page", 60000)
    await actions.scroll(submitflightpage)
    await actions.waitForClickable(submitflightpage, "submit button in flights page", 20000)
    await actions.clickElement('click', submitflightpage, "submit button in flights page")
    await actions.waitForDisplayed(bundleHeader,"bundles page header",10000)
  }

  async validateFlightPage() {
    await actions.pause(3000);
    if ((await browser.getUrl()).includes('manage-travel/')) {
      await actions.pause(25000);
      if (await browser.getTitle() === 'Travelers') {
        console.log('Successfully completed on Flight Page');
      } else {
        assert.fail('Something not proceed with Flight page')
      }
    } else {
      if (await browser.getTitle() === 'Bundles') {
        console.log('Successfully completed on Flight Page');
      } else {
        assert.fail('Something not proceed with Flight page')
      }
    }
  }
}

export { departDate, returnDate, flightPageCollector };
export default new FlightsPage()