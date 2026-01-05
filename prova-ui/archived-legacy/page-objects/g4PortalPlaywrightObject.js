import actions from "../../src/support/actions"
import { page as browser, context, pagePromise } from "../../src/hooks-playwright/playwright-hooks"
import { assert } from 'chai';

const fmmFlight = "//div[@id='Test-BottomRow']"
const MOD = "//a//span[contains(text(),'MOD')]"
const STNS = "//a//span[contains(text(),'STNS')]"
const SVT = "//a//span[contains(text(),'SVT')]"
const FMM = "//span[text()='FMM']";
const ATL = "//span[contains(text(),'ATL')]"
const RQ = "//a//span[text()='RQ']"
const SAT = "//a//span[text()='SAT']"
const STS = "//a//span[text()='STS']"
const CAR = "//span[contains(text(),'CAR')]"
const CL = "//span[contains(text(),'CL')]"
const ESP = "//span[contains(text(),'ESP')]"
const HOT = "//span[contains(text(),'HOT')]"
const HSM = "//span[contains(text(),'HSM')]"
const AIS = "//span[contains(text(),'AIS')]"
const FM = "//span[contains(text(),'FM')]"
const BOOK = "//a//span[contains(text(),'BOOK')]"
const clickContinueButton = "(//button[@data-hook='ancillaries-page_continue'])[2]"
const cartoverrideContinueBtn = "//button[@data-hook='page-footer_continue']"
const guestLogin = "//a[contains(text(),'Guest Login')]"
const firstname = "//label[contains(text(),'First Name')]"

class g4PortalPage {

    async navigateToG4portal() {
        process.env.ENV = browser.url()
        let env = process.env.ENV
        if (env.includes("prod")) {
            console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
            await browser.maximizeWindow()
            await browser.deleteAllCookies()
            await actions.openWebsite("https://g4plus-portal.allegiantair.com")
            // await browser.pause(1000)
            // await $(g4UserName).setValue(process.env.username);
            // await $(g4Password).setValue(process.env.password);
            // await $(g4Submit).click();
            await actions.setInputField('setValue', process.env.username, g4UserName, 'username inputfield')
            await actions.setInputField('setValue', process.env.password, g4Password, 'password inputfield')
            await actions.clickElement('click', g4Submit, 'submit button')
        } else {
            await actions.openWebsite((await this.urlBuilder())[0])
            await actions.openWebsite((await this.urlBuilder())[1])
        }
    }

    async urlBuilder() {
        var env = process.env.ENV
        console.log("env: ", env)
        let g4url
        let g4PortalToken
        if (env.includes('okd') && (!env.includes('nexusg4'))) {
            var envURL = env.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            g4url = 'https://g4plus-portal' + env + '.usw2.aws.allegiantair.com/portal'
            console.log("URL: ", g4url)
            g4PortalToken = 'https://g4plus-res' + env + '.usw2.aws.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
            console.log("TOKEN: ", g4PortalToken)
        }
        else {
            var envURL = env.split("https://www")[1].split(".allegiantair.com")[0]
            // var env = envURL
            g4url = 'https://g4plus-portal' + envURL + '.allegiantair.com/portal'
            console.log("URL: ", g4url)
            g4PortalToken = 'https://g4plus-res' + envURL + '.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
            console.log("TOKEN: ", g4PortalToken)
        }
        return [g4PortalToken, g4url]
    }

    async selectAppFromG4Portal(app) {
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
        if (app === 'FMM') {
            await actions.pause(5000)
            await actions.clickElement('click', FMM, 'FMM Button')
        }
        if (app === 'ATL') {
            await actions.clickElement('click', ATL, 'ATL Button')
        }
        if (app === 'RQ') {
            await actions.clickElement('click', RQ, 'RQ Button')
        }
        if (app === 'SAT') {
            await actions.clickElement('click', SAT, 'SAT Button')
        }
        if (app === 'STS') {
            await actions.pause(5000)
            await actions.clickElement('click', STS, 'STS Button')
        }
        if (app === 'HSM') {
            await actions.clickElement('click', HSM, 'HSM Button')
        }
        if (app === 'HOT') {
            await actions.clickElement('click', HOT, 'HOT Button')
        }
        if (app === 'FM') {
            await actions.clickElement('click', FM, 'FM Button')
        }
        if (app === 'ESP') {
            await actions.clickElement('click', ESP, 'ESP Button')
        }
        if (app === 'CL') {
            await actions.clickElement('click', CL, 'CL Button')
        }
        if (app === 'CAR') {
            await actions.clickElement('click', CAR, 'CAR Button')
        }
        if (app === 'AIS') {
            await actions.clickElement('click', AIS, 'AIS Button')
        }

        if (app === 'BOOK') {
            await actions.clickElement('click', BOOK, 'BOOK Button')
        }

        if (app === 'FM') {
            await actions.clickElement('click', FM, 'FM Button')
        }

        if (app === 'STNS') {
            await actions.clickElement('click', STNS, 'STNS Button')
        }
    }

    async flightValidation() {
        await actions.switchWindow('app/fmm/')
        console.log("switched to fmm page")
        await actions.pause(10000);
        await actions.waitForDisplayed(fmmFlight, 'fmmFlight', 10000)
        let Flightno = await browser.locator(fmmFlight).all()
        console.log("Availableflights: " + Flightno.length);
        assert.isTrue(
            await actions.isDisplayed(fmmFlight, "fmm Flights checking"),
            'Validation Failed : flights are not available');
        // await browser.pause(10000)
    }

    async navigateToG4Fmm() {
        process.env.ENV = browser.url()
        if (process.env.ENV.includes("prod")) {
            console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
            await actions.openWebsite("https://g4plus-portal.allegiantair.com");
            await actions.pause(1000)
            await actions.setInputField('setValue', process.env.username, g4UserName, 'g4UserName')
            await actions.setInputField('setValue', process.env.password, g4Password, 'g4Password')
            await actions.clickElement('click', g4Submit, 'g4Submit')
        } else {
            await actions.openWebsite((await this.urlBuilderFmm())[0]);
            await actions.setWindowSize(1440, 700)
            await actions.pause(1000)
            await actions.openWebsite((await this.urlBuilderFmm())[1])
            await actions.setWindowSize(1440, 700)
        }
    }

    async urlBuilderFmm() {
        var getEnv = process.env.ENV
        let g4url
        let g4PortalToken
        if (getEnv.includes('okd') && (!(getEnv.includes('nexusg4')))) {
            var envURL = getEnv.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            g4url = 'https://g4plus-portal-' + envURL + '.okd.allegiantair.com/portal'
            g4PortalToken = 'https://g4plus-res-' + envURL + '.okd.allegiantair.com/test/token?roles=OPS_FMM'
        }
        else {
            let envURL = getEnv.split("https://www")[1].split(".allegiantair.com")[0]
            let env = envURL
            g4url = 'https://g4plus-portal' + env + '.allegiantair.com/portal'
            console.log("g4url: ", g4url)
            g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?roles=OPS_FMM,FMM_OCC_MGR,OPS_FMM_OCC_SUPER_USER,FMM_STATION_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding,fmm_station_super_user,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ops_fee_management,ops_flight_operations,ops_flight_operations_manager,ota_flights,ota_flights_inventory,ota_flights_revenue,ssim_user,ssim_admin,ais_air_only,ais_bk_non_rev_standby,ais_bk_non_rev_standby_svc_provider,ais_bk_nrps,ais_bk_pilot_jump_seat'
            console.log("g4PortalToken: ", g4PortalToken)
        }
        return [g4PortalToken, g4url]
    }

    async ATLTranscation() {
        await actions.pause(15000)
        await actions.switchWindow('Accounting');
        await actions.pause(15000)
        const atlText = "//a[text()='ATL']";
        const transactionslabel = "//a[contains(@href,'transactions')]";
        const orderField = "//input[@ng-model='form.orderNbr']"
        const resultTable = "//span[text()='Reference #']//following::td[@class='text-nowrap ng-binding']"
        await actions.waitForDisplayed(atlText, 'atlText', 30000)
        await actions.waitForClickable(atlText, 'atlText', 30000)
        await actions.click(atlText, 'atlText')
        await actions.waitForClickable(transactionslabel, 'transactionslabel', 30000)
        await actions.click(transactionslabel, 'transactionslabel')
        await actions.waitForClickable(orderField, 'orderField', 30000)
        await actions.setValue(process.env.atl, orderField, 'orderField')
        await actions.pressButton('Enter', 'press');
        await actions.waitForDisplayed(resultTable, 'resultTable', 30000)
        var tableSize = await (browser.locator(resultTable).all()).length
        console.log("ATL transaction size:", tableSize)
        if (tableSize > 0) {
            console.log("ATL transaction available")
        } else {
            assert.fail("ATL Transaction not available")
        }
    }

    async Openclpageinnewtab() {
        var getEnv = process.env.ENV
        if (getEnv.includes('okd')) {
            var envURL = getEnv.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            let pageurl = 'https://g4plus-res-' + envURL + '.okd.allegiantair.com/app/customers/list'
            // await actions.newWindow(pageurl)

            let allPages = await context.pages()
            console.log(allPages)

            await actions.newWindow(pageurl)
            let allPages1 = await context.pages()
            console.log(allPages1)


            browser = await pagePromise;
            await browser.waitForLoadState();
            console.log("new tab = " + await browser.url());

        } else {
            var envURL = getEnv.split('.')[1]
            let pageurl = 'https://g4plus-res.' + envURL + '.allegiantair.com/app/customers/list'
            await actions.newWindow(pageurl)
        }
    }

    async guestLogin() {
        await actions.pause(5000)
        await browser.locator(guestLogin).isVisible()
        //guest login click

        await browser.locator(guestLogin).click()
        browser = await pagePromise;
        await browser.waitForLoadState();
        console.log("new tab = " + await browser.url());
        await actions.pause(5000)
        //close handle

        console.log("Windows count ", handles.length);
        for (let i = 1; i < handles.length - 1; i++) {
            await handles[i].close();
            console.log("---------Closed WH--------" + i);
        }
        await actions.pause(5000)
    }

    async cartoverrideContinueBtn() {
        await actions.pause(5000);
        let cartoverrideContinueBtnVisbilty = await actions.isDisplayed(cartoverrideContinueBtn, 'cartoverrideContinueBtn')
        if (cartoverrideContinueBtnVisbilty) {
            await actions.clickElement('click', cartoverrideContinueBtn, 'Cartoverride ContinueBtn')
            console.log("Cart Overide Page Continue Button is Clicked")
        } else {
            console.error("Cart Overide Continue Button is not Displayed");
        }
        await actions.pause(5000);
    }

    async validateCartOverridePage() {
        await actions.pause(5000);
        if (await browser.title() === 'Payment') {
            console.log('Successfully completed on CART-OVERRIDE Page');
        } else {
            assert.fail('Something not proceed with CART-OVERRIDE page')
        }
    }

    async clickContinueButton() {
        await actions.waitForDisplayed(clickContinueButton, 'clickContinueButton')
        await actions.clickElement('click', clickContinueButton, 'Continue Button')
        await browser.pause(5000)
    }
}

export default new g4PortalPage();