import Actions from '../../src/support/actions.js'
import Check from '../../src/support/validations.js'
import SeatPage from './seatsPageObject.js'

const onelineCheckin = "//button[@data-hook='order-item-flight-info_onward-check-in-button']"
const checkinbutton = "//button[@class='Button__StyledButton-sc-1ececxa-1 jGMNve PageFooter__ContinueButton-sc-1me5dil-0 bmowAx']"
const iAgreeCovidPolicyCheckBox = "//*[@class='touch-friendly-checkbox small']"
const checkinbagspagecontinue = "(//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm'])[3]"
const checkinbagspagecontinue2 = "//*[@data-hook='ancillaries-continue-popup_button_continue']"
const checkinharadeouspagecheckbox = "//*[contains(text(),'I agree to the above restricted')]/parent::label/div[2]"
const checkinharadeouspagecontinue = "//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm']"
const checkinseatpagecontinue = "//*[contains(text(),'No thanks, skip seat selection.')]"
const checkinstatus = "//*[text()='CHECKED-IN']"
const seatscroll = "//div[text()='Seat']"
const seatautoassigned = "(//div[@class='ant-col ant-col-3 PassengerList__StyledCol-sc-1rkj5fy-4 hTXNTo'][3])"
const enterPhoneNumberCheckin = "//*[@data-hook='select-page-phone-number-input-field_phone']"
const flightTermsAndConditions = "//label[@data-hook='_optInForAlerts_label']/div[2]"

class CheckInPage {
    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
        this.check = new Check(page, context)
        this.seatPage = new SeatPage(page, context)
    }

    async onlineCheckin() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.waitForURL(/manage-travel/, 30000)
        await this.actions.waitForDisplayed(onelineCheckin, 'check-in online link', 30000)
        // await this.actions.scroll(onelineCheckin)
        await this.actions.waitForClickable(onelineCheckin, 'check-in online link', 30000)
        await this.actions.clickElement('click', onelineCheckin, "check-in online link")
        await this.actions.focusLastOpenedWindow()
    }

    async checkin() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.waitForDisplayed(checkinbutton, 'checkinbutton', 30000)
        await this.actions.waitForClickable(checkinbutton, 'checkinbutton', 30000)

        console.log('Current URL before clicking checkin button:', await this.actions.getUrl())
        await this.actions.clickElement('click', checkinbutton, "check-in button")
        await this.actions.waitForLoadState('networkidle', 45000)

        console.log('Current URL after clicking checkin button:', await this.actions.getUrl())
    }

    async PrintBoardingPasses() {
        await this.actions.pause(20000)
        let currentUrl = await this.actions.getUrl()

        if (currentUrl.includes('/url')) {
            await this.actions.waitForLoadState('domcontentloaded', 30000)
        }
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.waitForDisplayed('//*[@data-hook="pass-page_title"]', 'boarding passes page', 30000)

        await this.actions.scroll(checkinstatus)
        await this.actions.waitForDisplayed(checkinstatus, 'checkin status', 30000);
        let checkinstatusIsDisplayed = await this.actions.isDisplayed(checkinstatus, 'checkinstatus')
        if (checkinstatusIsDisplayed) {
            console.log("Checkin Passed")
        } else {
            console.log("Check in Failed");
        }
    }

    async selectCovidRestrictedArticalPolicy() {
        try {
            let covidPolicyPopUP = await this.actions.isDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
            if (covidPolicyPopUP) {
                await this.actions.waitForDisplayed(iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox');
                await this.actions.clickElement('click', iAgreeCovidPolicyCheckBox, 'iAgreeCovidPolicyCheckBox')
                await this.actions.waitForClickable('.continue-button', 'continue button', 3000)
            } else {
                console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
            }
        } catch (ex) {
            console.log('Select Restricted Articles Policy and COVID-19 Confirmation policy not needed');
        }
    }

    async onlinecheckinbagspage() {
        await this.actions.waitForDisplayed(checkinbagspagecontinue, 'checkin bags page continue button', 30000)
        await this.actions.click(checkinbagspagecontinue, 'checkin bags page continue button')
        if (await this.actions.isDisplayed(checkinbagspagecontinue2, 'Bags page continue popup', 5000)) {
            await this.actions.waitForDisplayed(checkinbagspagecontinue2, 'Bags page continue popup', 30000)
            await this.actions.click(checkinbagspagecontinue2, 'Bags page continue popup')
        }
    }

    async acceptCheckinTermsAndConditions() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.waitForDisplayed(enterPhoneNumberCheckin, "enterPhoneNumberCheckin", 30000)
        await this.actions.click(enterPhoneNumberCheckin, "enterPhoneNumberCheckin")
        await this.actions.clearInputField(enterPhoneNumberCheckin, "enterPhoneNumberCheckin")
        await this.actions.setInputField('setValue', "702-555-1111", enterPhoneNumberCheckin, "enterPhoneNumberCheckin")
        await this.actions.waitForDisplayed(flightTermsAndConditions, "flightTermsAndConditions", 30000)
        await this.actions.click(flightTermsAndConditions, "flightTermsAndConditions")
    }

    async onlinecheckinseatspage() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.waitForDisplayed(checkinharadeouspagecheckbox, 'hazardous page checkbox', 30000)
        await this.actions.waitForClickable(checkinharadeouspagecheckbox, 'hazardous page checkbox', 30000)
        await this.actions.click(checkinharadeouspagecheckbox, 'checkinharadeouspagecheckbox')
        await this.actions.click(checkinharadeouspagecontinue, 'checkinharadeouspagecontinue')

        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.seatPage.skipSeatsPage()
        // await this.actions.scroll("//img[@alt='Apple App Store']")
        // await this.actions.waitForDisplayed(checkinseatpagecontinue, 'seat page continue', 30000)
        // await this.actions.waitForClickable(checkinseatpagecontinue, 'seat page continue', 30000)
        // await this.actions.click(checkinseatpagecontinue, 'checkinseatpagecontinue')
        // await this.actions.waitForLoadState('domcontentloaded', 30000)
    }

    async seatautoassigned() {
        await this.actions.waitForLoadState('domcontentloaded', 30000)
        await this.actions.scroll(seatscroll)
        await this.actions.waitForDisplayed(seatautoassigned, 'seatautoassigned', 30000)

        try {
            const seatText = await this.actions.getText(seatautoassigned)
            console.log("Seat number: " + seatText)

            if (seatText === '-' || seatText === null || seatText === undefined || seatText.trim() === '') {
                console.log("seat is not-assigned")
                return false
            } else {
                console.log("seat is assigned")
                return true
            }
        } catch (error) {
            console.log("Error getting seat assignment:", error.message)
            return false
        }
    }

}
export default CheckInPage