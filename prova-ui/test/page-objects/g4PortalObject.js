import Actions from '../../src/support/actions.js'
import homePage from '../page-objects/homePageObject.js'
import { assert } from 'chai';

const fmmFlight = "//div[@id='Test-TopRow']"
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
const clickContinueButton1 = "(//button[@data-hook='ancillaries-page_continue'])[1]"
const cartoverrideContinueBtn = "//button[@data-hook='page-footer_continue']"
const guestLogin = "//a[contains(text(),'Guest Login')]"
const firstname = "//label[contains(text(),'First Name')]"
const dateTimeFMM = "//div[@id='lastReloaded']"
const hotelTitle = "[data-hook='hotels-page_page-heading']"
const carPageHeader = "//*[text()='Car Selection']"


class g4PortalPage {

    actions;
    page;
    context;

    constructor(page, context) {
        this.page = page;
        this.context = context;
        this.actions = new Actions(page, context)
    }

    async navigateToG4portal() {
        process.env.ENV = await this.actions.getUrl()
        let env = process.env.ENV
        if (env.includes("prod")) {
            console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
            await browser.maximizeWindow()
            await browser.deleteAllCookies()
            await this.actions.openWebsite("https://g4plus-portal.allegiantair.com")
            // await browser.pause(1000)
            // await $(g4UserName).setValue(process.env.username);
            // await $(g4Password).setValue(process.env.password);
            // await $(g4Submit).click();
            await this.actions.setInputField('setValue', process.env.username, g4UserName, 'username inputfield')
            await this.actions.setInputField('setValue', process.env.password, g4Password, 'password inputfield')
            await this.actions.clickElement('click', g4Submit, 'submit button')
        } else {
            await this.actions.openWebsite((await this.urlBuilder())[0])
            await this.actions.openWebsite((await this.urlBuilder())[1])
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
            await this.actions.clickElement('click', MOD, 'MOD Button')
            await this.actions.waitForDisplayed('.mod-app, .modal, .app-container', 'MOD app interface', 5000)
        }
        if (app === 'STNS') {
            await this.actions.clickElement('click', STNS, 'STNS Button')
        }
        if (app === 'SVT') {
            await this.actions.clickElement('click', SVT, 'SVT Button')
        }
        if (app === 'FMM') {
            if (process.env.appEnv.includes('qat')) {
                await this.actions.waitForLoadState('domcontentloaded', 5000);
                let envString = 'https://www-qatnexusg4v4.apps.swe-qat.aws.allegiantair.com'
                let env = envString.split("https://www")[1];
                // https://g4plus-ops-qatnexusg4v4.apps.swe-qat.aws.allegiantair.com/app/fmm/
                let fmmUrl = `https://g4plus-ops${env}/app/fmm/`;
                console.log("Opening FMM URL: " + fmmUrl);
                await this.actions.newWindow(fmmUrl);

                // Wait for the new window to load and switch to it
                await this.actions.waitForLoadState('domcontentloaded', 5000);
                let fmmPage = await this.actions.switchWindow('app/fmm/');

                if (!fmmPage) {
                    // Fallback: find the page by URL pattern
                    const pages = await this.context.pages();
                    fmmPage = pages.find(page => page.url().includes('app/fmm/'));
                }

                if (fmmPage) {
                    this.page = fmmPage;
                    this.actions = new Actions(this.page, this.context);
                    console.log("Successfully switched to FMM page: " + await this.actions.getUrl());
                }
            } else {
                await this.openApp(FMM, "FMM app link");
            }
            return this.page
        }
        if (app === 'ATL') {
            await this.actions.clickElement('click', ATL, 'ATL Button')
        }
        if (app === 'RQ') {
            await this.actions.clickElement('click', RQ, 'RQ Button')
        }
        if (app === 'SAT') {
            await this.actions.clickElement('click', SAT, 'SAT Button')
        }
        if (app === 'STS') {
            await this.actions.waitForClickable(STS, 'STS Button', 5000)
            await this.actions.clickElement('click', STS, 'STS Button')
        }
        if (app === 'HSM') {
            await this.actions.clickElement('click', HSM, 'HSM Button')
        }
        if (app === 'HOT') {
            await this.actions.clickElement('click', HOT, 'HOT Button')
        }
        if (app === 'FM') {
            await this.actions.clickElement('click', FM, 'FM Button')
        }
        if (app === 'ESP') {
            await this.actions.clickElement('click', ESP, 'ESP Button')
        }
        if (app === 'CL') {
            await this.actions.clickElement('click', CL, 'CL Button')
        }
        if (app === 'CAR') {
            await this.actions.clickElement('click', CAR, 'CAR Button')
        }
        if (app === 'AIS') {
            await this.actions.clickElement('click', AIS, 'AIS Button')
        }

        if (app === 'BOOK') {
            await this.actions.clickElement('click', BOOK, 'BOOK Button')
        }

        if (app === 'FM') {
            await this.actions.clickElement('click', FM, 'FM Button')
        }

        if (app === 'STNS') {
            await this.actions.clickElement('click', STNS, 'STNS Button')
        }
    }

    async openApp(locator, locatorDescription) {
        try {
            await this.actions.scroll(locator);
            await this.actions.waitForDisplayed(locator, locatorDescription, 30000);

            // Get initial page count
            const initialPages = await this.context.pages();
            const initialPageCount = initialPages.length;
            console.log(`Initial page count before clicking ${locatorDescription}: ${initialPageCount}`);

            // Listen for new page creation
            const newPagePromise = this.context.waitForEvent('page');

            // Click the element
            await this.actions.click(locator, locatorDescription);
            console.log(`Clicked on ${locatorDescription}, waiting for new page...`);

            // Wait for new page to be created
            const newPage = await newPagePromise;
            await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });

            console.log(`New page opened with URL: ${newPage.url()}`);

            // Update the page reference
            this.page = newPage;
            this.actions = new Actions(this.page, this.context);

            // Verify the page count increased
            const finalPages = await this.context.pages();
            console.log(`Final page count after opening ${locatorDescription}: ${finalPages.length}`);

            if (finalPages.length !== initialPageCount + 1) {
                console.warn(`Expected ${initialPageCount + 1} pages, but got ${finalPages.length}`);
            }

            return this.page;

        } catch (error) {
            console.error(`Error opening ${locatorDescription}:`, error.message);
            throw new Error(`Failed to open ${locatorDescription}: ${error.message}`);
        }
    }

    async flightValidation() {
        await this.actions.waitForLoadState('domcontentloaded', 30000);
        await this.actions.waitForDisplayed(dateTimeFMM, 'dateTimeFMM', 30000);
        console.log("dateTimeFMM: " + await this.actions.isDisplayed(dateTimeFMM, "dateTimeFMM"));

        console.log("Waiting for flight elements to be available...");
        try {
            await this.actions.waitForFirstElementVisible(fmmFlight, 'fmmFlight', 30000);
            console.log("First flight element is now visible");
        } catch (error) {
            console.error("Failed to find flight elements: " + error.message);
            throw new Error("Flight validation failed");
        }

        // Get all flight elements
        let flightElements = await this.actions.getElements(fmmFlight);
        console.log("Available flights: " + flightElements.length);

        // Wait for page to stabilize
        await this.actions.waitForLoadState('domcontentloaded', 15000);

        // Validate that flights are available
        if (flightElements.length > 0) {
            console.log("Flight validation successful - found " + flightElements.length + " flights");
        } else {
            assert.fail('Validation Failed: flights are not available');
        }
        try {
            await this.actions.waitForFirstElementVisible(fmmFlight, 'first flight element', 5000);
            console.log("First flight element visibility confirmed");
        } catch (error) {
            console.error("Failed to validate first flight visibility: " + error.message);
            assert.fail('Validation Failed: first flight element is not visible');
        }

        console.log("Flight validation completed successfully");
    }

    async navigateToG4Fmm() {
        process.env.ENV = await this.actions.getUrl()
        if (process.env.ENV.includes("prod")) {
            console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
            await this.actions.openWebsite("https://g4plus-portal.allegiantair.com");
            await this.actions.waitForLoadState('domcontentloaded', 3000)
            await this.actions.setInputField('setValue', process.env.username, g4UserName, 'g4UserName')
            await this.actions.setInputField('setValue', process.env.password, g4Password, 'g4Password')
            await this.actions.clickElement('click', g4Submit, 'g4Submit')
        } else {
            await this.actions.openWebsite((await this.urlBuilderFmm())[0]);
            await this.actions.setWindowSize(1440, 700)
            await this.actions.waitForLoadState('domcontentloaded', 3000)
            await this.actions.openWebsite((await this.urlBuilderFmm())[1])
            await this.actions.setWindowSize(1440, 700)
        }
    }

    async urlBuilderFmm() {
        var getEnv = process.env.ENV
        console.log("getEnv: " + getEnv)
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
        await this.actions.waitForLoadState('domcontentloaded', 15000)
        await this.actions.switchWindow('Accounting');
        await this.actions.waitForLoadState('domcontentloaded', 15000)
        const atlText = "//a[text()='ATL']";
        const transactionslabel = "//a[contains(@href,'transactions')]";
        const orderField = "//input[@ng-model='form.orderNbr']"
        const resultTable = "//span[text()='Reference #']//following::td[@class='text-nowrap ng-binding']"
        await this.actions.waitForDisplayed(atlText, 'atlText', 30000)
        await this.actions.waitForClickable(atlText, 'atlText', 30000)
        await this.actions.click(atlText, 'atlText')
        await this.actions.waitForClickable(transactionslabel, 'transactionslabel', 30000)
        await this.actions.click(transactionslabel, 'transactionslabel')
        await this.actions.waitForClickable(orderField, 'orderField', 30000)
        await this.actions.setValue(process.env.atl, orderField, 'orderField')
        await this.actions.pressButton('Enter', 'press');
        await this.actions.waitForDisplayed(resultTable, 'resultTable', 30000)
        var tableSize = await (this.actions.getElements(resultTable)).length
        console.log("ATL transaction size:", tableSize)
        if (tableSize > 0) {
            console.log("ATL transaction available")
        } else {
            assert.fail("ATL Transaction not available")
        }
    }

    async Openclpageinnewtab() {
        const homePageInstance = new homePage(this.page, this.context);
        await homePageInstance.getEnvironmentValue()
        var getEnv = process.env.ENV
        if (getEnv.includes('okd')) {
            var envURL = getEnv.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            let pageurl = 'https://app-customers' + getEnv + '.allegiantair.com/list'
            console.log("Opening new window with URL: " + pageurl)
            await this.actions.newWindow(pageurl)
            // Wait for page to load before switching
            await this.actions.waitForLoadState('domcontentloaded', 5000)
            let newPageObject = await this.actions.switchWindow(pageurl)
            if (!newPageObject) {
                console.error("Failed to switch window in Openclpageinnewtab (okd) - newPageObject is null");
                // Try to find the page by a partial URL match
                const pages = await this.context.pages();
                console.log("Available pages: ", pages.map(p => p.url()));
                newPageObject = pages.find(page => page.url().includes('app-customers') && page.url().includes('.allegiantair.com/list'));
                if (!newPageObject) {
                    throw new Error("Failed to switch to new window");
                }
            }
            this.page = newPageObject
            this.actions = new Actions(this.page, this.context)
            console.log("Successfully switched to CL page (okd): " + await this.actions.getUrl())
        }
        else if (getEnv.includes('prd01')) {
            var envURL = getEnv.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            let pageurl = 'https://app-customers' + getEnv + '.allegiantair.com/list'
            console.log("Opening new window with URL: " + pageurl)
            await this.actions.newWindow(pageurl)
            // Wait for page to load before switching
            await this.actions.waitForLoadState('domcontentloaded', 5000)
            let newPageObject = await this.actions.switchWindow(pageurl)
            if (!newPageObject) {
                console.error("Failed to switch window in Openclpageinnewtab (prd01) - newPageObject is null");
                // Try to find the page by a partial URL match
                const pages = await this.context.pages();
                console.log("Available pages: ", pages.map(p => p.url()));
                newPageObject = pages.find(page => page.url().includes('app-customers') && page.url().includes('.allegiantair.com/list'));
                if (!newPageObject) {
                    throw new Error("Failed to switch to new window");
                }
            }
            this.page = newPageObject
            this.actions = new Actions(this.page, this.context)
            console.log("Successfully switched to CL page (prd01): " + await this.actions.getUrl())
        } else if (getEnv.includes('dev01')) {
            var envURL = getEnv.split('-')[1].split('.')[0]
            var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
            let pageurl = 'https://app-customers' + getEnv + '.allegiantair.com/list'
            console.log("Opening new window with URL: " + pageurl)
            await this.actions.newWindow(pageurl)
            // Wait for page to load before switching
            await this.actions.waitForLoadState('domcontentloaded', 5000)
            let newPageObject = await this.actions.switchWindow(pageurl)
            if (!newPageObject) {
                console.error("Failed to switch window in Openclpageinnewtab (dev01) - newPageObject is null");
                // Try to find the page by a partial URL match
                const pages = await this.context.pages();
                console.log("Available pages: ", pages.map(p => p.url()));
                newPageObject = pages.find(page => page.url().includes('app-customers') && page.url().includes('.allegiantair.com/list'));
                if (!newPageObject) {
                    throw new Error("Failed to switch to new window");
                }
            }
            this.page = newPageObject
            this.actions = new Actions(this.page, this.context)
            console.log("Successfully switched to CL page (dev01): " + await this.actions.getUrl())
        } else {
            console.log("getEnv: " + getEnv)
            console.log("process.env.ENV: " + process.env.ENV)
            let pageurl = `https://g4plus-res${getEnv}.allegiantair.com/app/customers/list`
            // https://app-customers-qatnexusg4v4.apps.swe-qat.aws.allegiantair.com/list
            console.log("Opening new window with URL: " + pageurl)
            await this.actions.newWindow(pageurl)
            // Wait for page to load before switching
            await this.actions.waitForLoadState('domcontentloaded', 5000)
            let newPageObject = await this.actions.switchWindow(pageurl)
            if (!newPageObject) {
                console.error("Failed to switch window in Openclpageinnewtab - newPageObject is null");
                // Try to find the page by a partial URL match
                const pages = await this.context.pages();
                console.log("Available pages: ", pages.map(p => p.url()));
                newPageObject = pages.find(page => page.url().includes('app-customers') && page.url().includes('.allegiantair.com/list'));
                if (!newPageObject) {
                    throw new Error("Failed to switch to new window");
                }
            }
            this.page = newPageObject
            this.actions = new Actions(this.page, this.context)
            console.log("Successfully switched to CL page: " + await this.actions.getUrl())
        }
    }

    async guestLogin() {
        // await this.actions.pause(8000)
        // Validate page object before using
        if (!this.page) {
            console.error("Page object is null in guestLogin method");
            throw new Error("Page object is not properly initialized");
        }

        if (!this.actions || !this.actions.page) {
            console.error("Actions object or its page is null in guestLogin method");
            // Re-initialize actions if needed
            this.actions = new Actions(this.page, this.context);
        }

        console.log("new tab : " + await this.actions.getUrl())
        await this.actions.isDisplayed(guestLogin, 'guestLogin')

        // Listen for new page creation before clicking
        const newPagePromise = this.context.waitForEvent('page');

        await this.actions.click(guestLogin, 'guestLogin')
        console.log("Before Switch : " + await this.actions.getUrl())

        let newPageObject = null;

        try {
            const newPage = await newPagePromise;
            await newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
            console.log("New page created with URL: " + newPage.url());

            console.log("Trying to switch to window with: " + process.env.appEnv);
            newPageObject = await this.actions.switchWindow(process.env.appEnv);

            if (!newPageObject) {
                console.log("Primary switch failed, trying fallback methods...");

                const pages = await this.context.pages();
                console.log("Available pages: ", pages.map(p => p.url()));

                newPageObject = pages.find(page => page !== this.page && page.url().includes(process.env.appEnv.replace('https://', '').replace('http://', '')));

                if (!newPageObject) {
                    newPageObject = newPage;
                }
            }

        } catch (pageError) {
            console.error("Error waiting for new page or switching: ", pageError.message);
            newPageObject = await this.actions.switchWindow(process.env.appEnv);
        }

        if (!newPageObject) {
            console.error("Failed to switch window - newPageObject is null after all fallback attempts");
            throw new Error("Failed to switch to new window");
        }

        this.page = newPageObject
        this.actions = new Actions(this.page, this.context)
        console.log("switched to guest login page")
        console.log("After Switch : " + await this.actions.getUrl())
        // await this.actions.pause(5000)
        return this.page
    }

    async cartoverrideContinueBtn() {
        // await this.actions.pause(5000);
        let cartoverrideContinueBtnVisbilty = await this.actions.isDisplayed(cartoverrideContinueBtn, 'cartoverrideContinueBtn')
        if (cartoverrideContinueBtnVisbilty) {
            await this.actions.clickElement('click', cartoverrideContinueBtn, 'Cartoverride ContinueBtn')
            console.log("Cart Overide Page Continue Button is Clicked")
        } else {
            console.error("Cart Overide Continue Button is not Displayed");
        }
        // await this.actions.pause(5000);
    }

    async validateCartOverridePage() {
        await this.actions.waitForURL('**/cart-override', 10000);
        await this.actions.waitForLoadState('domcontentloaded', 10000);
        if (await this.actions.getTitle() === 'CART-OVERRIDE') {
            console.log('Successfully completed on CART-OVERRIDE Page');
        } else {
            assert.fail('Something not proceed with CART-OVERRIDE page')
        }
    }

    async clickContinueButton() {
        await this.actions.waitForDisplayed(clickContinueButton1, 'clickContinueButton',10000)
        await this.actions.clickElement('click', clickContinueButton1, 'Continue Button');
     
//    while (true) {
//         // 1. Click first
// await this.actions.clickElement('click', clickContinueButton1, 'Continue Button');
        
//         // 2. Wait for the URL to potentially change
//         await this.actions.pause(2000); 

//         // 3. Get the URL and check the condition
//         const currentUrl = await this.actions.getUrl();

//         if (currentUrl.includes('/hotels') || 
//             currentUrl.includes('/cars') || 
//             currentUrl.includes('/cart-override')) {
            
//             console.log("Target reached. Stopping.");
//             break; // Stop looping once the URL matches
//         }
        
//         console.log("Not at target yet. Clicking again...");
//     }
}
}

export default g4PortalPage