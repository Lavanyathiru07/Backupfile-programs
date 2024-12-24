import actions from '@g4/prova-ui/src/support/actions'

const hotelsArea = '#hotelchooser-wrapper #hotelchooser #hotels-list'
const noThanksLink = '#hotelchooser a.no-item-selected'
const hotelsPageContinue = "(//button[@class='continue'])[2]"
const hotelsPageContinueTA = "//button[@class='continue']"
const roomsandrates = "(//*[contains(text(), 'Rooms and Rates')])[1]"
const roomsratesTab = "//*[text()='Rooms & Rates']"
const roombooking = "(//*[text()='Book'])[1]"
const roomValidation = "(//*[text()='Selected'])[1]"

class TAHotelsPage {

    async waitForHotelsPage() {
        await actions.waitForDisplayed(hotelsArea, "hotelChooserWrapperArea")
    }

    async selectFirstHotel() {
        await this.waitForHotelsPage()
        await actions.waitForDisplayed(roomsandrates, 'roomsnrates button')
        await actions.waitForClickable(roomsandrates, 'roomsnrates button')
        // await actions.scroll(roomsandrates)
        await actions.clickElement('click', roomsandrates, "Button of rooms and rates")
        await actions.waitForDisplayed(roomsratesTab, "rooms & Rates Tab")
    }

    async selectRoom() {
        let bookDisplayed = await actions.isDisplayed(roombooking, 'roombooking button')
        if(!bookDisplayed){
            await actions.clickElement('click', roomsratesTab, "rooms & Rates Tab")
        }
        await actions.waitForDisplayed(roombooking, 'roombooking button')
        await actions.waitForClickable(roombooking, 'roombooking button')
        // await actions.scroll(roombooking)
        await actions.clickElement('click', roombooking, "Button to book the rooms")
        await browser.pause(3000)
        let displayed = await actions.isDisplayed(roomValidation, "validating room selected")
        if (displayed) {
            console.log("first room is selected")
        } else {
            console.log("Room is NOT selected")
        }
    }

    async skipLinkHotelsPage() {
        await actions.waitForClickable(noThanksLink, "noThanksLink")
        await actions.clickElement("click", noThanksLink, "clickNoThanksLink")
    }

    async hotelsPageContinueButton() {
        await browser.pause(10000)
        await actions.waitForDisplayed(hotelsPageContinue, "Hotels Page Continue Button")
        let displayed = await actions.isDisplayed(hotelsPageContinue, "Hotels Page Continue Button")
        if (displayed) {
            await actions.waitForEnabled(hotelsPageContinue, "Hotels Page Continue Button")
            await actions.waitForClickable(hotelsPageContinue, "Hotels Page Continue Button")
            let clickable = await actions.isClickable(hotelsPageContinue, "Hotels Page Continue Button")
            if (clickable) {
                await actions.clickElement('click', hotelsPageContinue, "Hotels Page Continue Button")
            } else {
                throw new Error("Hotels Page Continue Button is not clickable")
            }
        }
    }
    
    async hotelsPageContinueButtonTA() {
        await browser.pause(6000)
        await this.waitForHotelsPage()
        await actions.waitForDisplayed(hotelsPageContinueTA, "Hotels Page Continue Button")
        let displayed = await actions.isDisplayed(hotelsPageContinueTA, "Hotels Page Continue Button")
        if (displayed) {
            await actions.waitForEnabled(hotelsPageContinueTA, "Hotels Page Continue Button")
            await actions.waitForClickable(hotelsPageContinueTA, "Hotels Page Continue Button")
            let clickable = await actions.isClickable(hotelsPageContinueTA, "Hotels Page Continue Button")
            if (clickable) {
                await actions.clickElement('click', hotelsPageContinueTA, "Hotels Page Continue Button")
            } else {
                throw new Error("Hotels Page Continue Button is not clickable")
            }
        }
    }
}
export default new TAHotelsPage()