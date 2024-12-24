import actions from '@g4/prova-ui/src/support/actions'
import { assert } from 'chai';
import homePage from '../page-objects/homePageObject'
const MOD = "//a//span[contains(text(),'MOD')]"
const STNS = "//a//span[contains(text(),'STNS')]"
const SVT = "//a//span[contains(text(),'SVT')]"
const BOOK = "//a//span[contains(text(),'BOOK')]"
const confirmationInputField = "[id='advance-search-itn-num']"
const searchButton = "[class='btn btn-primary pull-right search']"
const viewButton = "//a[@class='btn btn-primary btn-show-booking']"
const g4UserName = "#username"
const g4Password = "#password"
const g4Submit = "//input[@name='submitBtn']"
const bagLink = "//*[contains(@class,'pax-section')]//table//tr[1]/td[text()='1A']/following::td[4]/a"
const manageTravel = "a[href='/my-trips']"
const confirmTab = "//a[text()='By confirmation #']"
const confirmText = "//*[@name='credentials[confCode]']"
const firstNameText = "//*[@name='credentials[firstName]']"
const lastNameText = "//*[@name='credentials[lastName]']"
const findMyTrip = "//*[@class='continue']"
const checkedInBag = "//*[@class='form-control input-sm input-checked-bags']"

const carryonBag = "//*[@class='form-control input-sm input-carry-on-bags']"

const doneButton = "//a[@class='btn btn-sm btn-primary btn-done']"
const availSeats = "//a[contains(@class,'allegiant_models_seat')]"
const seatButton = "//a[contains(@class,'btn-change-seats')]"
const manageSeatButton = "//a[contains(text(),'Add/Change Seats')]"
const seatsTab = "//*[@class='btn-sm current-flight']"
const manageSeatsTab = "//*[contains(@class,'flight-details-wrapper')]"
const selectSeat = "//div[@class='seat-map-window']//a[contains(@class,'seat-available') and not(contains(@class,'exit-seat'))]"
// const selectSeatTA = "//*[@class='seat allegiant_seat']//div[@class='jsui_tooltip']"
// const selectSeatTA = "//*[@class='seat allegiant_seat']/div/a"
// const selectSeatTA = "//*[@class='seat allegiant_seat']/div/a[contains(@class,'economy') and not(contains(@class,'legroom exit_row_seat'))]"
const selectSeatTA = "//*[@class='seat allegiant_seat']/div/a[not(contains(@class, 'exit_row_seat'))]"
const retContinueButton = "#flight-tabs #returning button.continue"
const depOnlyContinueButton = "#flight-tabs #departing button.continue"
const seatOkPopup = ".ui-dialog.ui-widget.ui-widget-content"
const okButton = ".close_popup"

const seatDoneButon = "//*[@id='collapseFlights']//div[2]/div[1]/div/a"
const acceptandContinueButton = "//button[@class='btn btn-sm btn-primary btn-block btn-accept-continue']"
const cardNumber = "//input[@placeholder='Card Number']"
const securityCode = "//input[@placeholder='Security Code']"
const addPayment = "//button[@class='btn btn-primary btn-add-payment']"
const expireMonth = "//*[@id='payment-expire-month']"
const expireYear = "//*[@id='payment-expire-year']"
const address1 = "#payment-address-1"
const address2 = "#payment-address-2"
const addresscity = "#payment-address-city"
const addressstate = "#payment-address-state"
const receivedForm = "//*[@id='receivedFrom']"
const submitButton = "//*[text()='Submit']"
const confirmandredisplaybutton = "//button[@class='btn btn-default btn-confirm-redisplay']"
const paymentTab = "//a[@data-show='transactions']"
const balanceAmount = "//tr[@class='transactions-table-row']/td[@class='text-right text-nowrap text-muted']"

//voucher creation
const reverseBtn = ".btn-reverse-transactions"
const reverseTrnsText = "//*[text()='Reverse Transactions']"
const AirBaseFarecheck = ".input-misc-fee.chk-reverse-1A-BKA"
const AirBaseFaretext = ".form-control.reversal-amt-1A-0"
const reasonDrop = ".form-control.override-reason"
const applyReverse = "//button[text()='Apply Reverse']"
const reverseConfText = "//h4[text()='Reverse Transactions Confirmation']"
const reverseConfContinue = "//button[text()='Continue']"
const issueVoucher = "//*[text()=' Issue Voucher']"
const receivedFormpopup = "//*[@id='voucher-received-from']"
const issueVoucherBtn = "//button[text()='Issue Voucher']"
const voucherValue = "//td[contains(text(),'ISSUED VCHR')]"

const refundCheckSelect1 = ".input-misc-fee.chk-select-all-1A"
const refundCheckSelect2 = ".input-misc-fee.chk-select-all-null"
const reverseVoucher = "//td[contains(text(),'Credit Voucher')]/..//button/i[@class='fa fa-reply']"
const refundAll = "(//td[contains(text(),'PAYMENT')]/..//button/i[@class='fa fa-mail-reply-all'])[X]"
const comment = "//input[@id='comment']"
const refund = "//button[text()='Refund']"
const reverseConfirm = "//button[text()='Reverse']"

//voucher verification
const customerTab = "//*[@data-show='customer']"
const userLookup = ".btn-user-lookup"
const voucherTab = "//*[text()='Vouchers']"
const voucher = "//*[contains(@class,'panel-section')]/a"
const seatContinue = "//button[contains(@class,'continue')]"
class JeeFourPortal {
    async navigateToG4portal() {
        await homePage.getEnvironmentValue()
        let env = process.env.ENV
        if (env.includes("prod")) {
            console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
            await browser.maximizeWindow()
            await browser.deleteAllCookies()
            await actions.openWebsite("https://g4plus-portal.allegiantair.com")
            await actions.setInputField('setValue', process.env.username, g4UserName, 'username inputfield')
            await actions.setInputField('setValue', process.env.password, g4Password, 'password inputfield')
            await actions.clickElement('click', g4Submit, 'submit button')
        }else if(env.includes("prd")){
			console.log("CAME HERE>>>>>>>>>>>>>>>>>>PRD01")
			await browser.maximizeWindow()
			await browser.deleteAllCookies()
			await browser.url("https://g4plus-portal-prd01.allegiantair.com");
			await actions.pause(1000)
			await $(g4UserName).setValue(process.env.username);
			await $(g4Password).setValue(process.env.password);
			await $(g4Submit).click();
			await actions.pause(5000);
		}
        else {
            await browser.maximizeWindow()
            await browser.deleteAllCookies()
            await actions.openWebsite((await this.urlBuilder())[0])
            await actions.openWebsite((await this.urlBuilder())[1])
        }
    }

    async navigateToTheG4portal() {
        await browser.maximizeWindow()
        await browser.deleteAllCookies()
        await actions.openWebsite((await this.urlBuilder())[0])
    }

    async urlBuilder() {
        let env = process.env.ENV
        let g4url
        let g4PortalToken
        if (env.includes('okd')) {
            g4url = 'https://g4plus-portal' + env + '.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?roles=flydesk_user,ota_flights_inventory,ota_flights,ops_fee_management,ais_air_only,ota_accounting_invoicing_managers,ota_accounting_rules,res_booking_manager,res_booking_override,res_booking_waiver,res_booking_agent,res_booking,res_customer,occ_management,it_noc,ops_flight_operations_manager,ops_flight_operations,ssim_admin,ota_tasklist_admin,ota_loyalty_points_admin,ota_loyalty_tech_admin,ops_travel_center_user,ota_hotel_fulfillment,g4plus_tasklist,ota_tasklist_LPqueues,ota_tasklist_callCenter,ota_tasklist_all,ops_travel_center_supervisor,ops_travel_center_admin,ota_shows,ota_accounting_invoicing_suspended_coordinators,ota_accounting_invoicing_suspended_managers,ota_accounting_atl,ota_accounting_invoicing,ota_accounting,tools_administrator,ops_airline_pb,ops_airline_bags,res_airline_reaccom,ota_surcharge_accounting,ota_surcharge_revenue,source_documents_esm,source_documents_user,ota_vehicle,ota_trip_flex,ota_surcharge,ota_hotel_inventory_manager,ota_hotel,ota_payments,ota_hotel_revenue,ota_hotel_inventory,ops_eswap,ops_airline_seats,loyalty_users,g4meta_users,call_center_agent,aircraft_mechanic,ais_maintenance_manage'
        }
        else if (env.includes('usw2.aws')) {
            var envURL = env.split('-')[1].split('.')[0]
            var env1 = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            g4url = 'https://g4plus-portal-' + env1 + '.usw2.aws.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res-' + env1 + '.usw2.aws.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
        }
        else if (env.includes('prd01')) {
            g4url = 'https://g4plus' + env + '.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
        }
        else if (env.includes('dev01')) {
            g4url = 'https://g4plus.' + env + '.aws.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res.' + env + '.aws.allegiantair.com/test/token?aisId=09742&roles=ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER'
        }
        else {
            g4url = 'https://g4plus-portal' + env + '.allegiantair.com/portal'
            // g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
            g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?roles=flydesk_user,ota_flights_inventory,ota_flights,ops_fee_management,ais_air_only,ota_accounting_invoicing_managers,ota_accounting_rules,res_booking_manager,res_booking_override,res_booking_waiver,res_booking_agent,res_booking,res_customer,occ_management,it_noc,ops_flight_operations_manager,ops_flight_operations,ssim_admin,ota_tasklist_admin,ota_loyalty_points_admin,ota_loyalty_tech_admin,ops_travel_center_user,ota_hotel_fulfillment,g4plus_tasklist,ota_tasklist_LPqueues,ota_tasklist_callCenter,ota_tasklist_all,ops_travel_center_supervisor,ops_travel_center_admin,ota_shows,ota_accounting_invoicing_suspended_coordinators,ota_accounting_invoicing_suspended_managers,ota_accounting_atl,ota_accounting_invoicing,ota_accounting,tools_administrator,ops_airline_pb,ops_airline_bags,res_airline_reaccom,ota_surcharge_accounting,ota_surcharge_revenue,source_documents_esm,source_documents_user,ota_vehicle,ota_trip_flex,ota_surcharge,ota_hotel_inventory_manager,ota_hotel,ota_payments,ota_hotel_revenue,ota_hotel_inventory,ops_eswap,ops_airline_seats,loyalty_users,g4meta_users,call_center_agent,aircraft_mechanic,ais_maintenance_manage'
        }
        return [g4PortalToken, g4url]
    }

    async selectAppFromG4Portal(app) {
        console.log("MOD")
        if (app === 'MOD') {
            await actions.clickElement('click', MOD, 'MOD Button')
            await actions.pause(5000)
        }
        if (app === 'STNS') {
            await actions.clickElement('click', STNS, 'STNS Button')
        }
        if (app === 'SVT') {
            await actions.clickElement('click', SVT, 'SVT Button')
        }
    }

    async clickManageTravel() {
        await actions.waitForClickable(manageTravel, "My trips option")
        await actions.clickElement('click', manageTravel, "My trips option")
    }

    async itineraryNumber(confirmationNumber) {
        await browser.switchWindow("Search");
        await actions.setInputField('setValue', confirmationNumber, confirmationInputField, 'confirmation inputfield')
        // try {
        //     await actions.clickElement('click', viewButton, 'view button')
        // }
        // catch (ex) {
        // }
        console.log(">>>>>ITN RETRIVED<<<<<")
    }

    async enteritenaryDetails(confirmationNumber) {
        let env = process.env.ENV
        let firstname, lastname
        if (env.includes("prod")) {
            firstname = "QAPROD";
            lastname = "PLZIGNORE";
        } else {
            firstname = "QA";
            lastname = "TEST";
        }

        await actions.waitForDisplayed(confirmTab, "confirmation tab")
        await actions.waitForClickable(confirmTab, "confirmation tab")

        await actions.waitForClickable(firstNameText, "firstName input field")
        await actions.scroll(firstNameText)
        await actions.setInputField('setValue', firstname, firstNameText, "firstName input field")
        await actions.waitForClickable(lastNameText, "lastName input field")
        await actions.setInputField('setValue', lastname, lastNameText, "lastName input field")
        await actions.waitForClickable(confirmText, "confirmation input field")
        await actions.setInputField('setValue', confirmationNumber, confirmText, "confirmation input field")

        await actions.waitForEnabled(findMyTrip, "find_my_trip button")
        await actions.waitForClickable(findMyTrip, "find_my_trip button")
        await actions.scroll(findMyTrip)
        await actions.clickElement('click', findMyTrip, "find_my_trip button")
    }

    async infoSearchforITN() {
        await actions.waitForDisplayed(searchButton, 'search Button')
        await actions.waitForClickable(searchButton, 'search Button')
        await actions.clickElement('click', searchButton, 'submit button')
    }

    async clickBagLink() {
        await actions.waitForClickable(bagLink, 'bag Link')
        await actions.clickElement('click', bagLink, 'bag Link')
    }

    async selectCarryonBag() {
        let carryonBagCount = await browser.$$(carryonBag)
        for (let i = 0; i < carryonBagCount.length; i++) {
            let COB = "(//*[@class='form-control input-sm input-carry-on-bags'])[" + (i + 1) + "]"
            await actions.waitForDisplayed(COB, 'carryonBag')
            await actions.waitForClickable(COB, 'carryonBag Link')
            await actions.scroll(COB)
            await actions.clickElement('click', COB, 'carryonBag')

            let carryonBagDropDown = "(//*[@class='form-control input-sm input-carry-on-bags'])[" + (i + 1) + "]//option[2]"
            await actions.waitForDisplayed(carryonBagDropDown, 'carryonBagDropDown')
            await actions.waitForClickable(carryonBagDropDown, 'carryonBagDropDown')
            await actions.clickElement('click', carryonBagDropDown, 'carryonBagDropDown')
        }
    }

    async selectCheckedInBag(value) {
        let checkedInBagCount = await browser.$$(checkedInBag)
        for (let i = 0; i < checkedInBagCount.length; i++) {
            let CIB = "(//*[@class='form-control input-sm input-checked-bags'])[" + (i + 1) + "]"
            let checkedBagDropDown = "(//*[@class='form-control input-sm input-checked-bags'])[" + (i + 1) + "]//option[X]"
            await actions.scroll(CIB)
            await actions.clickElement('click', CIB, 'carryonBag')
            if (value === "1") {
                await actions.waitForDisplayed(checkedBagDropDown, 'checkedBag DropDown')
                await actions.waitForClickable(checkedBagDropDown, 'checkedBag DropDown')
                await actions.clickElement('click', checkedBagDropDown.replace('X', 2), 'checkedBagDropDown')
            }
            if (value === "2") {
                await actions.waitForDisplayed(checkedBagDropDown, 'checkedBag DropDown')
                await actions.waitForClickable(checkedBagDropDown, 'checkedBag DropDown')
                await actions.clickElement('click', checkedBagDropDown.replace('X', 3), 'checkedBagDropDown')
            }
            if (value === "3") {
                await actions.waitForDisplayed(checkedBagDropDown, 'checkedBag DropDown')
                await actions.waitForClickable(checkedBagDropDown, 'checkedBag DropDown')
                await actions.clickElement('click', checkedBagDropDown.replace('X', 4), 'checkedBagDropDown')
            }
            if (value === "4") {
                await actions.waitForDisplayed(checkedBagDropDown, 'checkedBag DropDown')
                await actions.waitForClickable(checkedBagDropDown, 'checkedBag DropDown')
                await actions.clickElement('click', checkedBagDropDown.replace('X', 5), 'checkedBagDropDown')
            }
        }
    }

    async clickDoneButton() {
        await actions.pause(5000)
        await actions.scroll(doneButton)
        await actions.waitForDisplayed(doneButton, 'doneButton')
        await actions.waitForClickable(doneButton, 'doneButton')
        await actions.clickElement('click', doneButton, 'doneButton')
        await actions.pause(5000)
    }

    async seatSelection() {
        await actions.pause(5000)
        await actions.scroll(seatButton)
        await actions.waitForDisplayed(seatButton, 'seat Button')
        await actions.waitForClickable(seatButton, 'seat Button')
        await actions.clickElement('click', seatButton, 'seat Button')
        await actions.pause(5000)
    }

    async clickAddSeats() {
        await actions.pause(5000)
        await actions.scroll(manageSeatButton)
        await actions.waitForDisplayed(manageSeatButton, 'add/change seat Button')
        await actions.waitForClickable(manageSeatButton, 'add/change seat Button')
        await actions.clickElement('click', manageSeatButton, 'add/change seat Button')
        await actions.pause(5000)
    }

    async selectSeatsRandomly() {
        let TTCount = await browser.$$(seatsTab)
        for (let i = 1; i <= TTCount.length; i++) {
            let seatsTabClick = "(//*[@class='btn-sm current-flight'])[" + i + "]"
            await actions.waitForClickable(seatsTabClick, "flight seats area")
            await actions.clickElement('click', seatsTabClick, "flight seats area")
            await actions.waitUntil(selectSeat, 'selectSeat')
            await actions.waitForDisplayed(selectSeat, 'selectSeat')
            let availableSeats = await browser.$$(selectSeat)
            console.log("Available Seats: ", availableSeats.length)
            await availableSeats[0].click()
        }

    }

    async selectAvailableSeats() {
        await actions.waitForDisplayed(availSeats, "flight available Seat")
        await actions.waitForClickable(availSeats, "flight available Seat")
        await actions.clickElement('click', availSeats, "flight available Seat")
        let displayed = await actions.isDisplayed(seatOkPopup, "departseat")
        if (displayed) {
            await actions.clickElement('click', okButton, "ok button")
        }
    }

    async SelectSeatsContinue() {
        await actions.scroll(seatContinue)
        await actions.waitForClickable(seatContinue, "DepartureContinueButton")
        await actions.clickElement('click', seatContinue, "clickDepartureContinueButton")
    }

    async selectSeatsTA() {
        let TTCount = await $$(availSeats)
        for (let i = 1; i <= TTCount.length; i++) {
            let seatsTabClick = "(//*[contains(@class,'flight-details-wrapper')])[" + i + "]"
            await actions.clickElement('click', seatsTabClick, "flight seats area")

            await actions.waitUntil(selectSeatTA, 'selectSeat')
            await actions.waitForDisplayed(selectSeatTA, 'selectSeat')
            let availableSeats = await browser.$$(selectSeatTA)
            console.log("Available Seats: ", availableSeats.length)
            console.log("Available Seats: ", await availableSeats[0])
            await availableSeats[0].click()

            let displayed = await actions.isDisplayed(seatOkPopup, "departseat")
            if (displayed) {
                await actions.clickElement('click', okButton, "ok button")
            }
        }

        if (TTCount === 1) {
            await actions.waitForDisplayed(depOnlyContinueButton, "departOnlyContinueButton")
            await actions.waitForClickable(depOnlyContinueButton, "departOnlyContinueButton")
            let depClickable = await actions.isClickable(depOnlyContinueButton, "departOnlyContinueButton")
            if (depClickable) {
                await actions.scroll(depOnlyContinueButton)
                await actions.clickElement('click', depOnlyContinueButton, "departOnlyContinueButton")
            }
        }
        if (TTCount === 2) {
            await actions.waitForDisplayed(retContinueButton, "ReturnContinueButton")
            await actions.waitForClickable(retContinueButton, "ReturnContinueButton")
            let retClickable = await actions.isClickable(retContinueButton, "ReturnContinueButton")
            if (retClickable) {
                await actions.scroll(retContinueButton)
                await actions.clickElement('click', retContinueButton, "clickReturnContinueButton")
            }
        }

    }

    async clickSeatDoneButton() {
        await actions.waitForDisplayed(seatDoneButon, 'seat doneButton')
        await actions.waitForClickable(seatDoneButon, 'seat done Button')
        await actions.scroll(seatDoneButon)
        await actions.clickElement('click', seatDoneButon, 'seat done Button')
    }

    async clickacceptandContinue() {
        await actions.waitForDisplayed(acceptandContinueButton, 'accept and ContinueButton')
        await actions.waitForClickable(acceptandContinueButton, 'accept and ContinueButton')
        await actions.scroll(acceptandContinueButton)
        await actions.clickElement('click', acceptandContinueButton, 'accept and ContinueButton')
    }

    async cardDetails() {
        if (process.env.ENV.includes("prod")) {
            await actions.waitForClickable(cardNumber, 'cardNumber inputfield')
            await actions.pause(3000)
            await actions.setInputField('setValue', process.env.cardno, cardNumber, 'cardNumber inputfield')
        } else {
            await actions.waitForDisplayed(cardNumber, 'cardNumber inputfield')
            await actions.waitForClickable(cardNumber, 'cardNumber inputfield')
            await actions.clickElement('click', cardNumber, 'cardNumber inputfield')
            await actions.setInputField('setValue', "4444444444444448", cardNumber, 'cardNumber inputfield')
        }

    }

    async securityCodeDetails() {
        let month;
        if (process.env.ENV.includes("prod")) {
            if (process.env.expiredMonth.length === 1) {
                month = `0${process.env.expiredMonth}`
            } else {
                month = process.env.expiredMonth
            }
            await actions.waitForClickable(securityCode, 'securityCode inputfield')
            await actions.setInputField('setValue', process.env.cvv, securityCode, 'securityCode inputfield')
            await actions.selectOption(expireMonth, "value", month)
            //await actions.selectOption(expireYear, "value", process.env.expiredYear)
            await actions.selectOption(expireYear, "text", process.env.expiredYear)
        } else {
            await actions.waitForClickable(securityCode, 'securityCode inputfield')
            await actions.clickElement('click', securityCode, 'securityCode inputfield')
            await actions.setInputField('setValue', "737", securityCode, 'securityCode inputfield')
            await actions.selectOption(expireMonth, "value", "12")
            await actions.selectOption(expireYear, "value", "30")
            if($(cardNumber).getValue === ''){
                await actions.waitForClickable(cardNumber, 'cardNumber inputfield')
                await actions.setInputField('setValue', "4444444444444448", cardNumber, 'cardNumber inputfield')
            }
        }

    }

    async clickaddPayment() {
        await actions.waitUntil(addPayment, 'addPayment Button')
        await actions.waitForClickable(addPayment, 'addPayment Button')
        await actions.clickElement('click', addPayment, 'addPayment Button')
    }

    async fillingReceivedForm() {
        await actions.waitForDisplayed(receivedForm, 'receivedForm inputfield')
        await actions.setInputField('setValue', "QA", receivedForm, 'receivedForm inputfield')
    }

    async clicksubmitbutton() {
        await actions.waitUntil(submitButton, 'submit Button')
        await actions.waitForClickable(submitButton, 'submitButton')
        await actions.clickElement('click', submitButton, 'submitButton')
    }

    async confirmAndRedisplay() {
        try {
            try {
                console.log("Alertbox Text: ", await browser.getAlertText())
                await actions.handleModal("acceptAlert", 'alertbox')
            }
            catch (er) {
                console.log("Alert Box is not displayed")
            }
            await actions.waitForClickable(confirmandredisplaybutton, 'confirmandredisplaybutton')
            await actions.clickElement('click', confirmandredisplaybutton, 'confirmandredisplaybutton')
        }
        catch (er) {

        }
    }

    async clickPaymentTab() {
        await actions.waitUntil(paymentTab, 'paymentTab Button')
        await actions.waitForClickable(paymentTab, 'paymentTab')
        await actions.clickElement('click', paymentTab, 'paymentTab')
        await actions.pause(3000)
    }

    async validatingBalanceAmount() {
        let bAmountlength = await browser.$$(balanceAmount)
        let balanceAmountValue = (await actions.getText(bAmountlength[bAmountlength.length - 1], "balnce amount")).trim().replace("$", "")
        console.log("balanceAmountValue: ", balanceAmountValue)
        assert.equal(balanceAmountValue, 0.00,
            'Balance Amount'
        );
    }

    async createVoucher() {
        await this.clickPaymentTab()
        await actions.isClickable(reverseBtn, "reverse button")
        await actions.clickElement("click", reverseBtn, "reverse button")

        await actions.waitForDisplayed(reverseTrnsText, "reverse transctions text")

        await actions.waitForClickable(AirBaseFarecheck, "AirBaseFare checkbox")
        await actions.clickElement("click", AirBaseFarecheck, "AirBaseFare checkbox")

        await actions.waitForClickable(AirBaseFaretext, "text box")
        await actions.setInputField("setValue", "0.01", AirBaseFaretext, "text box")

        await actions.selectOption(reasonDrop, "value", "3")

        await actions.waitForClickable(applyReverse, "apply reverse button")
        await actions.clickElement("click", applyReverse, "apply reverse button")

        await actions.waitForDisplayed(reverseConfText, "text")
        await actions.isClickable(reverseConfContinue, "continue button")
        await actions.clickElement("click", reverseConfContinue, "continue button")

        await actions.waitForDisplayed(issueVoucher, "issueVoucher button")
        await actions.isClickable(issueVoucher, "issueVoucher button")
        await actions.clickElement("click", issueVoucher, "issueVoucher button")

        await actions.waitForDisplayed(receivedFormpopup, 'receivedForm inputfield')
        await actions.setInputField('setValue', "QA", receivedFormpopup, 'receivedForm inputfield')

        await actions.isClickable(issueVoucherBtn, "issueVoucher button")
        await actions.clickElement("click", issueVoucherBtn, "issueVoucher button")

        var vouchernumber = await $(voucherValue).getText()
        vouchernumber = vouchernumber.split(" ")[2]
        console.log("vouchernumber created is: ", vouchernumber)
        return vouchernumber
    }

    async VerifyVoucher() {
        await actions.waitUntil(customerTab, 'customerTab Button')
        await actions.waitForClickable(customerTab, 'customerTab')
        await actions.clickElement('click', customerTab, 'customerTab')

        await actions.waitForClickable(userLookup, 'custom Lookup')
        await actions.clickElement("click", userLookup, "custom Lookup")

        await browser.switchWindow("Customer View")

        await actions.waitForClickable(voucherTab, 'voucher Tab')
        await actions.clickElement("click", voucherTab, "voucher Tab")

        let text = await actions.getText(voucher, "voucher text")
        let itn = process.env.confirmationNumber;
        try {
            if (text !== "") {
                console.log("Voucher is displayed in customer lookup -> Voucher number is : " + text)
                process.env.confirmationNumber = itn+" | "+text
            }
        } catch (error) {
            console.error("Error while verifying the voucher.Please check manually")
        }

        await browser.switchWindow("Confirmation")
    }

    async CancelProdVoucher() {
        try {
            await this.clickPaymentTab()
        }catch{}
        await actions.isClickable(reverseVoucher, "reverse button")
        await actions.clickElement("click", reverseVoucher, "reverse button")
        await actions.waitForDisplayed(comment, 'Voucher Reverse Comment')
        await actions.setInputField('setValue', "QAPRD TEST", comment, 'Voucher Reverse Comment')
        await actions.isClickable(reverseConfirm, "Reverse Confirm Button")
        await actions.clickElement("click", reverseConfirm, "Reverse Confirm Button")
    }

    async refundITN() {
        await this.clickPaymentTab()
        for (let i = 0; i < 3; i++) {
            await actions.isClickable(refundAll.replace('X', i), "Reverse Confirm Button")
            await actions.clickElement("click", refundAll.replace('X', i + 1), "Reverse Confirm Button")
            await actions.waitForDisplayed(comment, 'Payment Reverse Comment')
            await actions.setInputField('setValue', "QAPRD TEST", comment, 'Voucher Reverse Comment')
            await actions.isClickable(refund, "Reverse Confirm Button")
            await actions.clickElement("click", refund, "Reverse Confirm Button")
            
        }
    }

    async CancelProdITN() {
        try {
            await this.clickPaymentTab()
            await actions.isClickable(reverseBtn, "reverse button")
            await actions.clickElement("click", reverseBtn, "reverse button")

            await actions.waitForDisplayed(reverseTrnsText, "reverse transctions text")

            await actions.waitForClickable(refundCheckSelect1, "all refund checkbox")
            await actions.clickElement("click", refundCheckSelect1, "all refund checkbox")

            await actions.waitForClickable(refundCheckSelect2, "other refund checkbox")
            await actions.clickElement("click", refundCheckSelect2, "other refund checkbox")

            await actions.selectOption(reasonDrop, "value", "3")

            await actions.waitForClickable(applyReverse, "apply reverse button")
            await actions.clickElement("click", applyReverse, "apply reverse button")

            await actions.waitForDisplayed(reverseConfText, "text")
            await actions.isClickable(reverseConfContinue, "continue button")
            await actions.clickElement("click", reverseConfContinue, "continue button")
        } catch (error) {
            console.error("Error while refund and cancel ITN.Please cancel manually")
        }
    }
}
export default new JeeFourPortal();