import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'

const scrollcheckin = "//*[text()='Please Select Passengers for Check-in']"
// const checkinbutton = "//button[@class='Button__StyledButton-sc-1ececxa-1 jGMNve PageFooter__ContinueButton-sc-1me5dil-0 bmowAx']"
const checkinbutton = "[data-hook='order-item-flight-info_onward-check-in-button']"
const scrollmessage = "[class='agree highlight-message']"
const bagscontinuebutton = "[class='continue']"
const scrollother = "//div[text()='Restricted Articles Policy']"
const msgcheckbox = "[class='toggle-message-checkbox']"
const continuebutton = "[class='continue']"
const scrollseats = "[class='seat-legend emergency-exit']"
const seatscontinuebutton = "[class='continue']"
const checkinstatus = "//*[text()='CHECKED-IN']"
const travellersscroll = "//*[text()='Traveler Information']"
const boardingPasses = "//*[text()='Print All Boarding Passes']"
const contactInfo = "[data-hook='select-page-phone-number-input-field_phone']"
const checkinPageHeading = "//h1[contains(.,'Welcome back,')]"
const checkInOnlineselect = "[data-hook='select-page_continue']";
const agreeCheckbox = "//span[text()='I agree to the terms & conditions of flight alerts']"
class CheckInPage {

    async checkin() {
        await actions.pause(5000)
        // await actions.scroll(contactInfo)
        // await actions.waitForEnabled(contactInfo, 'contactInfo')
        // await actions.setInputField('setValue', '7025551111', contactInfo, 'contactInfo')
        // await browser.pause(4000)
        // await actions.scroll(checkinbutton)
        try {
            await actions.waitForDisplayed(checkinbutton, 'checkinbutton')
            await actions.clickElement('click', checkinbutton, "check-in button")
        } catch (error) {

        }
        // await actions.waitForDisplayed(checkinbutton, 'checkinbutton')
        // await actions.clickElement('click', checkinbutton, "check-in button")
        await actions.pause(8000)
        try {
            await actions.waitForDisplayed(checkinPageHeading, 'checkinPageHeading')
        } catch (ex) {
            console.log("Online-Checkin welcome back window is not displayed");
        }

        try {

            await actions.scroll(agreeCheckbox,'agreeCheckbox')
            await actions.waitForClickable(agreeCheckbox, 'agreeCheckbox')
            await actions.clickElement('click', agreeCheckbox, "Agree Checkbox")
        } catch (err) {
            console.log(err)
        }
        await actions.waitForDisplayed(checkInOnlineselect, 'checkInOnlineselect', 20000);
        await actions.waitForClickable(checkInOnlineselect, 'checkInOnlineselect')
        await actions.clickElement('click', checkInOnlineselect, "checkInOnlineselect")
        await actions.pause(8000)
    }

    async bagsContinue() {
        await actions.scroll(scrollmessage,'scrollmessage')
        await actions.clickElement('click', bagscontinuebutton, "continue button of bags&boarding")
        await actions.scroll(scrollother)
        await actions.clickElement('click', msgcheckbox, "checkbox")
        await actions.clickElement('click', continuebutton, "continue button of bags page")
    }

    async seatsContinue() {
        await actions.scroll(scrollseats,'scrollseats')
        await actions.clickElement('click', seatscontinuebutton, "continue button of seats page")
    }

    async PrintBoardingPasses() {
        await actions.pause(20000);
        let checkinstatusIsDisplayed = await actions.isDisplayed(checkinstatus, 'checkinstatus')
        if (checkinstatusIsDisplayed) {
            console.log("Checkin Passed")
        } else {
            console.log("Check in Failed");
        }
        // await actions.waitForDisplayed(travellersscroll, 'travellersscroll', 150000)
        // await actions.scroll(travellersscroll)
        // await check.isDisplayed(travellersscroll, 'travellersscroll', true)
        // await actions.waitForDisplayed(boardingPasses, 'Boarding Passes Link', 10000)
        // let boardingPassesisDisplayed = await actions.isDisplayed(boardingPasses, 'Boarding Passes Link')
        // if (boardingPassesisDisplayed) {
        //     await actions.waitForClickable(boardingPasses, "link to see the boarding passes", 10000)
        //     await actions.clickElement('click', boardingPasses, "link to see the boarding passes")
        //     await actions.focusLastOpenedWindow()
        //     await browser.pause(3000)
        // }
        // else {
        //     console.log("Kindly check the DHS")
        // }
    }
}

export default new CheckInPage()