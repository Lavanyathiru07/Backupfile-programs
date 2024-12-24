import { assert } from 'chai';
import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'
import GetCardNumbers from './cardNumbers'

const scrolllist = "//div[text()='List View']"
const roomsButton = "(//*[text()='Rooms and Rates'])[1]"
const scrollEdit = "//span[text()='Edit']"
const bookingButton = "[data-hook='pod_pricing_button']"
const buttontoclosepopup = "//button[@class='Popup__CloseIcon-sc-1kasz48-2 eKPgGA']/img"
const cookieepopup = "//button[contains(@class,'close-button')]"
const originfield = "[class='css-1hwfws3']"
const origininputfield = "[class='css-1g6gooi'] div input"
const clickhoteltab = "(//a[@class='NavItem__StyledSpan-bmo20k-0 iuQooZ'])[2]";
const destinationField = "//div[@data-hook='select_locationCode']";
const selcetcheckindatepicker = "//input[@data-hook='open_CheckInPicker']";
const selectcheckin = "//li[@data-hook='select_Date']";
const searchhotel = "//button[@type='submit']";
const guestInfoscroll = "[data-hook='display_guest_information']"
const firstName = "[name='firstName1']"
const lastName = "[name='lastName1']"
const mobileNumber = "[name='guestPhoneNumber']"
const paymentscroll = "[alt='Union Pay']"
const cardholderName = "[data-hook='select_cardNameInput']"
const cardnumberfield = "[data-hook='select_cardNumberInput']"
const expirymonthfield = "[data-hook='select_expireMonth']"
const monthscrolling = "[data-hook='select_October']"
const monthselecting = "[data-hook='select_December']"
const yearscrolling = "[data-hook='select_cardNumberInput']"
const cardexpiryyear = "[data-hook='select_expireYear']"
const yearseelection = "[data-hook='select_2030']"
const cvvscroll = "[data-hook='select_cardNumberInput']"
const cardcvv = "[data-hook='select_cvvInput']"
const billingscroll = "[data-hook='display_billing_address']"
const add1 = "[name='addressLine1']"
const add2 = "[name='addressLine2']"
const add3 = "[name='city']"
const state = "[data-hook='select_state']"
const caselc = "[data-hook='select_California']"
const zipcode = "[name='zipCode']"
const mobilenum = "[name='billingPhoneNumber']"
const mailfeild = "[name='confirmationEmail']"
const termsbox = "[data-hook='display_terms_and_conditions_checkbox']"
const purcahsemytripbutton = "[data-hook='select_continuePaymentPage']"
const Itnnumber = "//span[@data-hook='display_confirmation_number']";
const transactiontab = "//a[contains(text(),'Transactions')]";
const balanceamount = "//tr/td[@class='text-right text-nowrap text-muted'][X]";
const checkoutText = "//span[contains(text(),'Checkout')]";

var itnHLO;
class Hotellandingpage {

    async clickHoteltab() {
        if (await actions.isDisplayed(buttontoclosepopup, "Overlay Merchandise Pop-up button")) {
            await actions.waitForClickable(buttontoclosepopup, 'Overlay Merchandise Pop-up button')
            await actions.clickElement('click', buttontoclosepopup, "button to close the Overlay Merchandise pop-up")
        } else {
            console.log("Overlay Merchandise Popup not Displayed")
        }
        if (await actions.isDisplayed(cookieepopup, "Accept All Cookies Popup button")) {
            await actions.waitForClickable(cookieepopup, 'Accept All Cookies Popup button')
            await actions.clickElement('click', cookieepopup, "Button to close Accept All Cookies Popup")
        } else {
            console.log("Accept All Cookies Popup not Displayed")
        }
        await actions.isDisplayed(clickhoteltab, "Hotel Link")
        await actions.waitForDisplayed(clickhoteltab, 'clickhoteltab link')
        await actions.waitForClickable(clickhoteltab, 'hoteltab link')
        await actions.clickElement('click', clickhoteltab, "Link to redirect to Hotel booking")
    }

    async originSelection(value) {
        await actions.clickElement('click', originfield, "origin field")
        await actions.setInputField('setValue', value, origininputfield, "Origin-Input-Field")
        await actions.pressButton("Enter")
    }

    async selectDestination() {
        await actions.clickElement('click', destinationField, "origin field")
        await browser.keys('las');
        await actions.pressButton("Enter")
    }

    async selectcheckindate(day) {
        let dayInt = parseInt(day)
        await actions.clickElement('click', selcetcheckindatepicker, "Button to date picker")
        let currentdate = await $$(selectcheckin);
        console.log(await actions.getText(currentdate[dayInt], 'current day'))
        await actions.waitForDisplayed(currentdate[dayInt], 'date selection button')
        await actions.waitForClickable(currentdate[dayInt], 'date selection button')
        await actions.clickElement('click', currentdate[dayInt], "date")
    }

    async selectcheckoutdate(day) {
        let dayInt = parseInt(day)
        let currentdate = await $$(selectcheckin);
        currentdate.length;
        console.log(await actions.getText(currentdate[dayInt], 'current day'))
        await actions.clickElement('click', currentdate[dayInt], "date")
    }

    async clicksearchbutton() {
        // await browser.pause(3000)
        await actions.scroll(checkoutText)
        await actions.isDisplayed(searchhotel, 'searchhotel')
        await actions.clickElement('click', searchhotel, "manage travel button")
    }

    async clickHotel() {
        await actions.scroll(scrolllist)
        await actions.waitForDisplayed(roomsButton, 'rooms button')
        await actions.waitForClickable(roomsButton, 'rooms button')
        await actions.clickElement('click', roomsButton, "manage travel button")
    }
    async clickroom() {
        await browser.waitUntil(async () => {
            return (await actions.isDisplayed(scrollEdit, "edit") === true)
        }, {
            timeout: 5000,
            timeoutMsg: 'hotel edit is not displayed after 5s'
        })
        await actions.scroll(scrollEdit)
        await actions.waitForDisplayed(bookingButton, 'manage travel button', 10000)
        await actions.waitForClickable(bookingButton, 'manage travel button')
        await actions.clickElement('click', bookingButton, "manage travel button")
    }

    async guestInformation() {
        await actions.scroll(guestInfoscroll)
        await actions.clearInputField(firstName, "First Name text field")
        await actions.setInputField('setValue', "QA", firstName, "First Name input field")
        await actions.clearInputField(lastName, "Last Name text field")
        await actions.setInputField('setValue', "TEST", lastName, "Last Name input field")
        await actions.clearInputField(mobileNumber, "Mobile Number text field")
        await actions.setInputField('setValue', "702-555-1111", mobileNumber, "Mobile Number input field")
    }

    async cardDetails() {
        // let {
        //     creditCardNum,
        //     creditCardCvv,
        // } = await GetCardNumbers.getCreditCardNumbers('AMEX')
        // console.log("creditCardNum for HLO: ", creditCardNum)
        // console.log("creditCardCvv for HLO: ", creditCardCvv)
        // const cardNumArray = ["4444444444444448", "4000020000000000", "4400000000000008", "4147895259293966", "4181557652420268", "4735242519645511"];
        const cardNumArray = ["4444444444444448","5454545454545454", "4000020000000000", "4400000000000008", "6243030000000001", "6011055039379233"];
        const random = Math.floor(Math.random() * cardNumArray.length);
        const value = cardNumArray[random];
        await actions.scroll(paymentscroll)
        await actions.clearInputField(cardholderName, "card holder Name text field")
        await actions.setInputField('setValue', cardNumArray[random], cardnumberfield, "card-number input field")
        await actions.clickElement('click', expirymonthfield, "expiry month dropdown")
        await actions.scroll(monthscrolling)
        await actions.clickElement('click', monthselecting, "selecting the expiry month of card")
        await actions.scroll(yearscrolling)
        await actions.clickElement('click', cardexpiryyear, "expiry year dropdown")
        await actions.clickElement('click', yearseelection, "selecting the expiry year of card")
        await actions.scroll(cvvscroll)
        if (value === '4444444444444448' || value === '4000020000000000' || value === '4400000000000008') {
            await actions.setInputField('setValue', "999", cardcvv, "cvv field")
        } else if (value === '5454545454545454') {
            await actions.setInputField('setValue', "737", cardcvv, "cvv field")
        } else if (value === '6011055039379233'|| value === '6243030000000001' ) {
            await actions.setInputField('setValue', "996", cardcvv, "cvv field")
        } else {
            await actions.setInputField('setValue', "9997", cardcvv, "cvv field")
        }
    }

    async billingaddress() {
        await actions.scroll(billingscroll)
        await actions.setInputField('setValue', 'Random', add1, "address field one")
        await actions.setInputField('setValue', 'Street', add2, "address field two")
        await actions.setInputField('setValue', 'Calf', add3, "address field three")
        await actions.clickElement('click', state, "state dropdown")
        await actions.clickElement('click', caselc, "state selection")
        await actions.setInputField('setValue', '10005', zipcode, "zipcode input field")
        await actions.setInputField('setValue', '702-555-1111', mobilenum, "mobile-num field")
    }

    async ticketmastermail() {
        await actions.clearInputField(mailfeild, "mailID field")
        await actions.setInputField('setValue', "accept@fraudtest.com", mailfeild, "mailID input field")
    }

    async purchasemytrip() {
        await actions.clickElement('click', termsbox, "condition checkbox")
        await actions.clickElement('click', purcahsemytripbutton, "purcahse my trip button button")
    }

    async getItnNumber() {
        await actions.waitForDisplayed(Itnnumber, 'Confirmation Number')
        var confirmationNumber = await actions.getText(Itnnumber, 'confirmationNumber')
        console.log("Generated HLO ITN : " + confirmationNumber);
        this.itnHLO = confirmationNumber;
        process.env.confirmationNumber = confirmationNumber;
        return confirmationNumber;
    }
    async validateConfirmationNum() {
        if ((await this.getItnNumber()).length !== 0) {
            console.log("validationpass")

        } else {
            assert.fail("validation fail")
        }
    }

    async confirmationNumberReturn() {
        const itnNumber = await this.getItnNumber();
        itnHLO = itnNumber;
        console.log("ITN: ", itnNumber);
        process.env.confirmationNumber = itnNumber;
        return itnNumber;
    }

    async transaction() {
        await actions.scroll(transactiontab)
        await actions.waitForDisplayed(transactiontab, 'transactiontab')
        await actions.waitForClickable(transactiontab, 'Transactiontab')
        await actions.clickElement('click', transactiontab, "Transaction Tab")
    }
    async validateBalanceAmount() {
        var balance = balanceamount.replace("X", 1)
        await actions.waitForDisplayed(balance, 'balance info')
        console.log(await actions.getText(balance, 'balance amount'))
    }

    async navigateToHLO() {
        await browser.maximizeWindow()
        await browser.deleteAllCookies()
        await actions.openWebsite((await this.urlBuilderHLO())[0]);
        await actions.openWebsite((await this.urlBuilderHLO())[1]);
        await actions.openWebsite((await this.urlBuilderHLO())[2]);
    }
    async urlBuilderHLO() {
        var env = process.env.ENV
        let g4url
        let g4PortalToken
        let hloURl

        if (env.includes('okd')) {
            var envURL = env.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            g4url = 'https://g4plus-portal' + env + '.usw2.aws.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res' + env + '.usw2.aws.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
            hloURl = 'https://g4plus-res' + env + '.allegiantair.com/app/bookings/order/' + this.itnHLO;
        }
        else {
            // var envURL = env.split('.')[1]
            // var env = envURL
            g4url = 'https://g4plus-portal' + env + '.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
            hloURl = 'https://g4plus-res' + env + '.allegiantair.com/app/bookings/order/' + this.itnHLO;

        }
        return [g4PortalToken, g4url, hloURl]
    }
}

export default new Hotellandingpage();