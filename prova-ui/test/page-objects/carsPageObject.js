import Actions from '../../src/support/actions.js'
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


    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
    }

    async carspageskip() {
        await this.actions.waitUntilPageLoad()
        await this.actions.pause(30000)
        await this.actions.waitForDisplayed(carPageHeader, 'carPageHeader', 30000)
        let carPageHeaderVisbilty = await this.actions.isDisplayed(carPageHeader, 'carPageHeader')
        console.log("carPageHeaderVisbilty: ", carPageHeaderVisbilty)
        if (carPageHeaderVisbilty) {
            console.log("Car's Text is Available")
            await this.actions.waitForDisplayed(carsPageContinueButton, 'carsPageContinueButton')
            await this.actions.pause(3000)
            await this.actions.clickElement('click', carskip, "skip link in cars page")
        }
        else {
            console.log('cars are not available for this city pair');
        }
    }

    async addToCart() {
        await this.actions.pause(10000)
        await this.actions.waitForDisplayed(priceButton, 'priceButton', 60000)
        let noCarsResultMessageVisbility = await this.actions.isDisplayed(noCarsResultMessage, 'No cars Message')
        console.log("noCarsResultMessageVisbility: ", noCarsResultMessageVisbility)
        if (noCarsResultMessageVisbility) {
            console.log("Cars are not available for this city pair")
        } else {
            try {
                await this.actions.waitForDisplayed(priceButton, 'price button', 45000) // Increased timeout
                await this.actions.waitForClickable(priceButton, 'price button', 45000) // Increased timeout
                await this.actions.clickElement('click', priceButton, 'Price Button')
                // await this.actions.pause(5000)
                await this.actions.waitForDisplayed(addToCartText, 'addToCartText', 10000)
            } catch (error) {
                console.log("Car price button not available, checking for no cars message...")
                let noCarsAfterTimeout = await this.actions.isDisplayed(noCarsResultMessage, 'No cars Message after timeout')
                if (noCarsAfterTimeout) {
                    console.log("Cars are confirmed not available for this city pair after timeout")
                } else {
                    throw error;
                }
            }
        }
    }

    async collectCarsPageDetailsCP() {
        CarsPageCollectorCP.set(
            'pickUpDateFieldCP',
            (await this.actions.getText(pickUpDateField, 'Date information for pickup')).slice(5, 11));
        // await this.actions.pause(2000);
        CarsPageCollectorCP.set(
            'dropOffDateFieldCP',
            (await this.actions.getText(dropOffDateField, 'Date information for dropping off')).slice(5, 11));
        // await this.actions.pause(2000);
        CarsPageCollectorCP.set(
            'vehicletypeCP',
            await this.actions.getText(vehicletype, 'Type of the vehicle'));
        // await this.actions.pause(2000);
    }

    async addedToCart() {
        await this.actions.pause(3000)
        await this.actions.waitForDisplayed(addedToCard, "added to cart")
        assert.equal(
            await this.actions.isDisplayed(addedToCard, 'Added to the cart'),
            true,
            'Car should be added to cart'
        );
    }

    async carspageContinueBtn() {
        // await this.actions.pause(5000)
        await this.actions.waitForDisplayed(carPageHeader, 'carPageHeader', 30000)
        let carsHeaderVisibilty = await this.actions.isDisplayed(carPageHeader, 'carPageHeader')
        if (carsHeaderVisibilty) {
            // await this.actions.pause(3000)
            await this.actions.waitForDisplayed(carsPageContinueButton, 'continue button in carspage', 20000)
            await this.actions.scroll(carsPageContinueButton);
            await this.actions.waitForClickable(carsPageContinueButton, 'continue button in carspage')
            // await this.actions.pause(5000)
            await this.actions.clickElement('click', carsPageContinueButton, "Cars page Continue Button");
        }
    }
}
export { CarsPageCollectorCP }
export default CarPage