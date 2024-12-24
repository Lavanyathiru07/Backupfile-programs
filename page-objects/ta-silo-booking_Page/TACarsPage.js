import actions from '@g4/prova-ui/src/support/actions'

const carsArea = '#transport-wrapper #transport #vendors'
const noThanksLink = '#transport a.no-item-selected'
const carsPageContinue = "//button[@class='continue bypass-transport']"
const carsPageContinueTA = "//button[@class='continue ']"
const carsPageContinueTAMT = "//button[@class='continue']"
const carselection = "(//*[contains(@class,'add-vendor-text')])[1]"
const carsValidation = "//*[contains(text(),'selected')]"
const carsList = "//*[text()='Choose car type:']"

const ssrText = "//*[text()='Special Service Request']"
const ssrOK1 = "(//*[text()='OK'])[1]"
const ssrOK2 = "(//*[text()='OK'])[2]"

class TACarsPage {

    async waitForCarsPage() {
        await actions.waitFor(carsArea,5000)
        await actions.waitForDisplayed(carsArea, "transportWrapperArea")
    }
    async validateCarsDisplayed() {
        await this.waitForCarsPage()
        await actions.waitForDisplayed(carsList, "Choose car type: text")
        let displayed = await actions.isDisplayed(carsList, "Choose car type: text")
        if (displayed) {
            console.log("cars are available")
        } else {
            console.log("cars are NOT available, Hence click on continue button")
        }
    }
    async skipLinkCarsPage() {
        await actions.waitForClickable(noThanksLink, "noThanksLink")
        await actions.clickElement('click', noThanksLink, "NoThanksLink")
    }

    async carsSelection() {
        await this.waitForCarsPage()
        await actions.waitForClickable(carselection, "button to select the car")
        await actions.scroll(carselection)
        await actions.clickElement('click', carselection, "button to select the car")
        if (await actions.isDisplayed(carsValidation, "cars selected validation")) {
            console.log("car is selected")
        } else {
            console.log("car is NOT selected")
        }
    }
    async waitForSSRPopUp() {
        await actions.waitForDisplayed(ssrText, "SSR text")
    }

    async selectSSR(ssr) {
        if (ssr) {
            var ssrArray = []
            ssrArray = ssr.split(",")
            for (let i = 0; i < ssrArray.length; i++) {
                var ssrValue = "//input[@value='" + ssrArray[i] + "']/following-sibling::span"
                await actions.scroll(ssrValue)
                await browser.pause(3000)
                await actions.waitForEnabled(ssrValue, ssrArray[i] + " checkbox")
                await actions.waitForClickable(ssrValue, ssrArray[i] + " checkbox")
                let clickable = await actions.isClickable(ssrValue, ssrArray[i] + " checkbox")
                if (clickable) {
                    await actions.clickElement('click', ssrValue, ssrArray[i] + " checkbox")
                } else {
                    await this.closeSSR()
                }
            }
            await browser.pause(2000)
            await actions.scroll(ssrOK2)
            await actions.waitForClickable(ssrOK2, "ssr popup ok")
            await actions.clickElement('click', ssrOK2, "ssr popup ok")
        } else {
            await this.closeSSR()
        }
    }

    async closeSSR() {
        await actions.waitForClickable(ssrOK1, "ssr popup ok")
        await actions.scroll(ssrOK1)
        await actions.clickElement('click', ssrOK1, "ssr popup ok")
    }

    async carsPageContinueButton() {
        await actions.waitForDisplayed(carsPageContinue, "carsPageContinueButton")
        let displayed = await actions.isDisplayed(carsPageContinue, "carsPageContinueButton")
        if (displayed) {
            await actions.waitForEnabled(carsPageContinue, "carsPageContinueButton")
            await actions.waitForClickable(carsPageContinue, "carsPageContinueButton")
            let clickable = await actions.isClickable(carsPageContinue, "carsPageContinueButton")
            if (clickable) {
                await actions.scroll(carsPageContinue)
                await actions.clickElement('click', carsPageContinue, "CarsPageContinueButton")
                await this.waitForSSRPopUp()
            } else {
                throw new Error("Cars Page Continue Button is not clickable")
            }
        }
    }
    
    async carsPageContinueButtonTA() {
        await browser.pause(6000)
        await browser.keys(['End']);
        await this.waitForCarsPage()
        await actions.waitForDisplayed(carsPageContinueTA, "carsPageContinueButton")
            let displayed = await actions.isDisplayed(carsPageContinueTA, "carsPageContinueButton")
            if (displayed) {
                await actions.waitForEnabled(carsPageContinueTA, "carsPageContinueButton")
                await actions.waitForClickable(carsPageContinueTA, "carsPageContinueButton")
                let clickable = await actions.isClickable(carsPageContinueTA, "carsPageContinueButton")
                if (clickable) {
                    await actions.scroll(carsPageContinueTA)
                    await actions.clickElement('click', carsPageContinueTA, "CarsPageContinueButton")
                } else {
                    throw new Error("Cars Page Continue Button is not clickable in TA")
                }
            }else{
                console.log("continue button is not displayed cars page")
            }
        try{
            await actions.waitForClickable(carsPageContinueTAMT, "carsPageContinueButton")
            await actions.clickElement('click', carsPageContinueTAMT, "CarsPageContinueButton")
        }catch(e){
            //console.error("continue button is not displayed cars page")            
        }
        
    }
}
export default new TACarsPage()