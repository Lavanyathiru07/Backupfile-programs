import actions from "../../src/support/actions"
import { assert } from 'chai';

const carpagescroll = "[data-hook='cars-page_continue']"
const carskip = "[data-hook='cars-page_skip']"
const carsPageContinueButton = "[data-hook='cars-page_continue']"
const noCarsResultMessage = "[data-hook='cars-page-no-result-message']"
const priceButton = "(//*[contains(@class,'CarVendorPrices__PriceSelectionButton')])[1]"
const dropOffDateField = '(//span[contains(@class,"Text-sc-1o5ubbx-0 hSCplp")])[2]'
const pickUpDateField = '(//span[contains(@class,"Text-sc-1o5ubbx-0 hSCplp")])[1]'
const vehicletype = '(//span[contains(@class,"Text-sc-1o5ubbx-0 bltVao")])[1] | (//span[contains(@class,"Text-sc-1o5ubbx-0 kiUQmq")])[1]'
const addedToCard = '//span[text()="Added to cart"] | //span[text()="Added"]'
const carPageHeader = "//*[text()='Car Selection']"
const addToCartText = "//*[text()='Added to cart']"

var CarsPageCollectorCP = new Map();

class CarPage {

    async carspageskip() {
        await actions.waitUntilPageLoad()
        await actions.pause(10000)
        await actions.waitForDisplayed(carPageHeader, 'carPageHeader', 30000)
        let carPageHeaderVisbilty = await actions.isDisplayed(carPageHeader, 'carPageHeader')
        console.log("carPageHeaderVisbilty: ", carPageHeaderVisbilty)
        if (carPageHeaderVisbilty) {
            console.log("Car's Text is Available")
            await actions.scroll(carsPageContinueButton)
            await actions.pause(3000)
            await actions.clickElement('click', carskip, "skip link in cars page")
        }
        else {
          console.log('cars are not available for this city pair');
        }
      }

    async addToCart() {
        // await actions.pause(10000)
        await actions.waitForDisplayed(priceButton, 'priceButton', 60000)
        let noCarsResultMessageVisbility = await actions.isDisplayed(noCarsResultMessage, 'No cars Message')
        console.log("noCarsResultMessageVisbility: ", noCarsResultMessageVisbility)
        if (noCarsResultMessageVisbility) {
            assert.fail("Cars are not available, Cars required for the scenario");
        } else {
            await actions.waitForDisplayed(priceButton, 'price button', 10000)
            await actions.scroll(priceButton)
            await actions.waitForClickable(priceButton, 'price button')
            await actions.clickElement('click', priceButton, 'Price Button')
            // await actions.pause(5000)
            await actions.waitForDisplayed(addToCartText, 'addToCartText', 10000)
        }
    }

    async collectCarsPageDetailsCP() {
        CarsPageCollectorCP.set(
            'pickUpDateFieldCP',
            (await actions.getText(pickUpDateField, 'Date information for pickup')).slice(5, 11));
        // await actions.pause(2000);
        CarsPageCollectorCP.set(
            'dropOffDateFieldCP',
            (await actions.getText(dropOffDateField, 'Date information for dropping off')).slice(5, 11));
        // await actions.pause(2000);
        CarsPageCollectorCP.set(
            'vehicletypeCP',
            await actions.getText(vehicletype, 'Type of the vehicle'));
        // await actions.pause(2000);
    }

    async addedToCart() {
        await actions.pause(3000)
        await actions.waitForDisplayed(addedToCard, "added to cart")
        assert.equal(
            await actions.isDisplayed(addedToCard, 'Added to the cart'),
            true,
            'Car should be added to cart'
        );
    }

    async carspageContinueBtn() {
        // await actions.pause(5000)
        await actions.waitForDisplayed(carPageHeader, 'carPageHeader', 30000)
        let carsHeaderVisibilty = await actions.isDisplayed(carPageHeader, 'carPageHeader')
        if (carsHeaderVisibilty) {
            // await actions.pause(3000)
            await actions.waitForDisplayed(carsPageContinueButton, 'continue button in carspage', 20000)
            await actions.scroll(carsPageContinueButton);
            await actions.waitForClickable(carsPageContinueButton, 'continue button in carspage')
            // await actions.pause(5000)
            await actions.clickElement('click', carsPageContinueButton, "Cars page Continue Button");
        }
    }
}
export { CarsPageCollectorCP }
export default new CarPage()