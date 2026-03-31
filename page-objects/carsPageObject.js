import actions from '@g4/prova-ui/src/support/actions'
import Check from '@g4/prova-ui/src/support/validations'
import { assert } from 'chai';

const topOfPage = "//button[@class='CarsPage__ScrollToTop-ro84g9-3 fbFOeE']"
const carskip = "[data-hook='cars-page_skip']"
const scrollcartype = "//*[text()='Car Type']"
const carselection = "//*[contains(@class,'PriceSelectionButton-ayz81e-3 kZTAAf')]"
const carsPageContinueButton = "[data-hook='cars-page_continue']"
const noCarsResultMessage = "[data-hook='cars-page-no-result-message']"
const priceButton = '(//button[@class="Button__StyledButton-sc-1ececxa-1 chKEKf CarVendorPrices__PriceSelectionButton-ayz81e-1 kjnkUG"])'
const dropOffDateField = '(//span[contains(@class,"Text-sc-1o5ubbx-0 hSCplp")])[2]'
const pickUpDateField = '(//span[contains(@class,"Text-sc-1o5ubbx-0 hSCplp")])[1]'
const vehicletype = '(//span[contains(@class,"Text-sc-1o5ubbx-0 bltVao")])[1] | (//span[contains(@class,"Text-sc-1o5ubbx-0 kiUQmq")])[1]'
const addedToCard = '//span[text()="Added to cart"] | //span[text()="Added"]'
const carPageHeader = "//*[text()='Car Selection']"
const addToCartText = "//*[text()='Added to cart']"
const icePopup = "[data-hook='payment-page_ice-popup_close']"

var CarsPageCollectorCP = new Map();

class CarPage {
  async addToCart() {
    await actions.waitForDisplayed(priceButton, 'price button', 10000)
    await actions.scroll(priceButton,'priceButton')
    await actions.waitForClickable(priceButton, 'price button')
    await actions.clickElement('click', priceButton, 'Price Button')
    await actions.pause(3000)
    if(await actions.isDisplayed("//div[@data-hook = 'cars-page-car_selection_popup']","Car Selection Popup"))
    {
      let selectCarButton = "//div[@data-hook ='cars-page-car_selection_popup']/div[2]/div/div[10]/button"
      await actions.scroll(selectCarButton,"Select Car Button")
      await actions.pause(2000)
      await actions.click(selectCarButton,"Select Car Button")
    }
    else
    {
      await actions.waitForDisplayed(addToCartText, 'addToCartText', 10000)
    }
  }

  async addedToCart() {
   await browser.pause(10000)
    if ((await browser.getUrl()).includes('cars')) {
      await actions.waitForDisplayed(addedToCard, "added to cart")
      assert.equal(
        await actions.isDisplayed(addedToCard, 'Added to the cart'),
        true,
        'Car should be added to cart'
      );
   }
   else
   {
     console.log("Not on Cars page")
   }
}

  async collectCarsPageDetailsCP() {
  await actions.pause(10000)
  assert.isTrue((await browser.getUrl()).includes('/cars'), 'Cars page is not displayed in Manage Travel')
  await actions.waitForDisplayed(priceButton, 'priceButton', 60000)
  let noCarsResultMessageVisbility = await actions.isDisplayed(noCarsResultMessage, 'No cars Message')
  console.log("noCarsResultMessageVisbility: ", noCarsResultMessageVisbility)
  if (!noCarsResultMessage) {
    CarsPageCollectorCP.set(
      'pickUpDateFieldCP',
      (await actions.getText(pickUpDateField, 'Date information for pickup')).slice(5, 11));
    await actions.pause(2000);
    CarsPageCollectorCP.set(
      'dropOffDateFieldCP',
      (await actions.getText(dropOffDateField, 'Date information for dropping off')).slice(5, 11));
    await actions.pause(2000);
    CarsPageCollectorCP.set(
      'vehicletypeCP',
      await actions.getText(vehicletype, 'Type of the vehicle'));
    await actions.pause(2000);
  }
   else{
     console.log("There are no cars available for this route..")
    }
 }

  async carsselection() {
    await actions.scroll(scrollcartype,'scrollcartype')
    await actions.clickElement('click', carselection, "button to select the car")
  }

  async carspageskip() {
    await actions.pause(10000)
    await actions.waitForDisplayed(carPageHeader, 'carPageHeader', 30000)
    let carPageHeaderVisbilty = await actions.isDisplayed(carPageHeader, 'carPageHeader')
    console.log("carPageHeaderVisbilty: ", carPageHeaderVisbilty)
    if (carPageHeaderVisbilty) {
      console.log("Car's Text is Available")
      await actions.waitForDisplayed(carsPageContinueButton, 'carsPageContinueButton', 30000)
      await actions.pause(3000)
      await actions.scroll(carsPageContinueButton,'carsPageContinueButton')
      await actions.waitForDisplayed(carskip, 'carskip link', 50000)
      await actions.waitForClickable(carskip, 'skip link in Cars Page')
      await actions.clickElement('click', carskip, "skip link in cars page")
    }
    else {
      console.log('cars are not available for this city pair');
    }
    await actions.pause(10000)
    await actions.waitForDisplayed(icePopup, 'icePopup', 40000)
  }

  async carspageContinueBtn() {
    await actions.waitForDisplayed(carPageHeader, 'carPageHeader', 30000)
    let carsHeaderVisibilty = await actions.isDisplayed(carPageHeader, 'carPageHeader')
    if (carsHeaderVisibilty) {
      await actions.pause(3000)
      await actions.waitForDisplayed(carsPageContinueButton, 'continue button in carspage', 20000)
      await actions.scroll(carsPageContinueButton,'carsPageContinueButton');
      await actions.waitForClickable(carsPageContinueButton, 'continue button in carspage')
      await actions.pause(5000)
      await actions.clickElement('click', carsPageContinueButton, "Cars page Continue Button");
    }
  }
}
export { CarsPageCollectorCP }
export default new CarPage()