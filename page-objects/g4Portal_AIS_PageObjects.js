import actions from '@g4/prova-ui/src/support/actions'
import check from '@g4/prova-ui/src/support/validations'
import { assert } from 'chai';
import homePage from '../page-objects/homePageObject'
const MOD = "//a//span[contains(text(),'MOD')]"
const SVT = "//a//span[contains(text(),'SVT')]"
const FM = "//a//span[contains(text(),'FM')]"
const CAR = "//a//span[contains(text(),'CAR')]"
const HOT = "//a//span[contains(text(),'HOT')]"
const ATL = "//a//span[contains(text(),'ATL')]"
const STS = "//a//span[contains(text(),'STS')]"
const CL = "//a//span[contains(text(),'CL')]"
const ESP = "//a//span[contains(text(),'ESP')]"
const RQ = "//a//span[contains(text(),'RQ')]"
const AIS = "//a//span[contains(text(),'AIS')]"
const g4UserName = "#username"
const g4Password = "#password"
const g4Submit = "//input[@name='submitBtn']"
const confirmationNumField = "//input[@id='advance-search-itn-num']"
const bagTab = "a[ui-sref='app.BagfeePricingRules.rules']"
const pbTab = "a[ui-sref='app.PriorityboardingPricingRules.rules']"
const tfTab = "a[ui-sref='app.TripflexPricingRules.rules']"
const resultRow = "//tr[contains(@class,'ng-scope')]"
const payloadTab = "//a[@ui-sref='payload']"
const fulfillmentTab = "//a[@ui-sref='fulfillment']"
const revenueTab = "//a[@ui-sref='revenue']"
const inventoryTab = "//a[@ui-sref='inventory']"
const airportLabel = "//label[contains(text(),'Airport')]"
const rulesTab = "//a[@ui-sref='app.rules.invoices.form']"
const hotelOverPercentField = "//input[contains(@ng-show,'canEdit')]/.."
const hotelProviderIdField = "//select[@id='hotel-provider-id']"
const reportsTab = "//a[@ui-sref='app.reports.list.form']"
const invoicesTab = "//a[@ui-sref='app.invoices.search.form']"
const invoiceDateField = "//input[@id='invoiceStartDate']"
const atlTab = "//a[@ui-sref='app.gl.postings']"
const gqlPostingRow = "//tr[contains(@class,'ng-scope')]"
const mapRow = "//td[contains(text(),'31B')]"
const seatMapTitle = "//h2[contains(text(),'Seat Maps')]"
const seatMaskingTitle = "//h2[contains(text(),'Seat Masking')]"
const seatPricingTitle = "//h2[contains(text(),'Seat Pricing')]"
const typeField = "span[aria-label='Select box activate']"
const fnameField = "//input[@id='fname']"
const emailField = "//input[@id='email']"
const searchBySelectSVT = "select[ng-model='field.alias']"
const operationSelectSVT = "select[ng-model='field.operation']"
const valueFieldSVT = "input[ng-model='field.value']"
const searchButtonSVT = "button[class='btn btn-primary btn-lg']"
const resultRowSVT = "//tr[contains(@class,'ng-scope')]"
const pickupDateField = "//input[@id='pickupDateTime']"
const returnDateField = "//input[@id='returnDateTime']"
const bookLocField = "//input[contains(@placeholder,'Select book location')]"
const pickupLocField = "//input[contains(@placeholder,'Select pick-up location')]"
const queueList = "//select[@id = 'reaccomTypeCode']"
const submitRQ = "//button[contains(text(),'Submit')]"
const checkRateButton = "//button[contains(text(),'Check Rate')]"
const resultRowsCAR = "tr[ng-init='parentIndex = $index; rates = ratesByCode[code]']"
const siteCantBeReached = $$("//div[@id='main-message']")
const somethingOdd = $$("//h2[contains(text(),'Something really odd just happened')]")
const goodDeals = $$("//h1[contains(text(),'Good deals come to those who wait')]")
const serviceUnavailable = $$("//h1[contains(text(),'503 Service Temporarily Unavailable')]")
const unexpectedErr = $$("(//*[contains(text(),'An unexpected error occurred while we were processing your request')])")
const paymentErr = $$("(//*[contains(text(),'In order to proceed with purchasing your trip, please complete required fields (marked with red)')])")
const certifyErr = $$("//*[contains(text(),'ERR_CERT_AUTHORITY_INVALID')]")
const authErr = $$("//Strong[contains(text(),'Unable to authenticate credentials')]")
const form = $$("//*[@id='logonForm']")
const rsTab = "//span[contains(text(),'RESERVATIONS')]//parent::a"
const rs = "(//a[@class='menu-main'])[25]"
const printManifestTab = "//span[contains(text(),'PRINT MANIFEST')]"
const locationSelect = "//div[contains(@id,'airport_location_chosen')]/a/span"
const locationField = "//div[contains(@id,'airport_location_chosen')]/div/div/input"
const selectCity = "//li[contains(@class,'active-result')]"
const submitPrintManifest = "//button[@id='filter-submit']"
const selectFlight = "//tr[contains(@class,'-flight')]//preceding-sibling::a[@class='data-link']"
const allPaxButton = "//img[contains(@title,'ALL PASSENGERS')]"
const paxTable = "//*[@id='flight-manifest']"
const ffTab = "//span[contains(text(),'FLIGHT INFORMATION')]"
const flightFlowTab = "//span[contains(text(),'FLIGHT FLOW')]"
const flightFollowing = "//span[contains(text(),'FLIGHT FOLLOWING')]"
const flightFlowHeader = "//span[contains(text(),'FLIGHT FLOW')]"
const mainTable = "//table[contains(@class,'main')]"
const accGroupSelect = "//select[@id='acGroup']"
const submitButtonFlow = "//img[contains(@title,'Submit')]"
const ADTab = "//span[contains(text(),'ADMIN')]"
const kayakConsoleTab = "//span[contains(text(),'KAYAK CONSOLE')]"
const kayakTable = "//table[contains(@class,'tablesorter')]"
const INTab = "//span[contains(text(),'INVENTORY')]"
const inventoryMxTab = "//span[contains(text(),'Inventory Maintenance')]"
const firstInventory = "//a[contains(@href,'forms')]"
const transactionTab = "//td[@id='TransactionsTab']"
const fllist = "//frame[@id='fllist']"
const availableFlight = "(//a[contains(@href,'flfollow.php?flifo_key=')])[1]"
const flightHeader = "//div[contains(@title,'Program/version=FLFOLLOW/')]"
const flFollowFrame = "//frame[@name='flfollow']"
const METab = "//span[contains(text(),'MAINTENANCE AND ENGINEERING')]"
const lineMXTab = "//span[contains(text(),'Line Maintenance')]"
const mxRecordsTab = "//span[contains(text(),'Maintenance Records')]"
const reportsTabSpoe = "//li[contains(text(),'Reports')]"
const flightLogTab = "//li[contains(text(),'Flight Log')]"
const tailField = "//input[contains(@name,'Log_lookup_tail')]|//input[contains(@name,'tailNumber')]"
const startingDateField = "//input[contains(@name,'asofDate')]|//input[contains(@name,'startDate')]"
const runReportButton = "//input[@value='Run Report']"
const flightLogHeader = "//div[text()='Flight Log']"
const resultRowSPOE = "//div[contains(@id,'result_row')]|//div[contains(@id,'tail-entry')]|//div[contains(@id,'result-entry-wrap')]"
const closeButtonSpoe = "//div[contains(@id,'close')]"
const APTab = "//span[contains(text(),'ACCOUNTS PAYABLE')]"
const accountsPayableMXTab = "//span[contains(text(),'Accounts Payable Maintenance')]"
const vendorLookup = "//legend[text()='Vendor Lookup']"
const vendorStatField = "//select[@id='vendor_status']"
const vendorLocationField = "//input[@id='vendor_lid']"
const payableSubmitButton = "//img[@onclick='lookupVendors()']"
const selectedVendors = ("//a[@id='vendor_000005']")
const alternateVendor = "//a[@id='vendor_000039"
const selectedVendor = "//a[@id='vendor_000005']"
const firstVendor = "(//td[@class='resultseven']//a)[1]"
const analysisTab = "//td[@id='analysisTab']"
const noTransaction = "//*[contains(text(),'No transactions.')]"
const selectedTransaction = "(//a[contains(@href,'lookup.do?dispatch')])[3]"
const ordersHeader = "//td[contains(text(),'Orders')]"
const MXTab = "//span[contains(text(),'MAINTENANCE  OPERATIONS')]"
const aircraftRecordsTab = "//span[contains(text(),'Aircraft Records')]"
const lookupButton = "//input[@name='run_report']"
const aircraftRecordsResultRow = $$("//tr[contains(@id,'load_')]")
const invoiceIdField = "//input[@id='invoiceId']"
const orderIdField = "//input[@id='orderId']"
const paymentIdField = "//input[@name='paymentRow.paymentId']"
const aircraftTitle = "//div[@id='program-title']"
const actionsTab = "//li[@id='Mx_Records_request']"
const actionRequestsTab = "//li[@id='Mx_Records_request_Request_Legacy']"
const actionRequestsLookupButton = "//input[@id='Request_Legacy_view_refresh']"
const actionRequestsResultRow = $$("//div[@class='result_row']")
var flightNumbers
var getEnv = process.env.ENV
var env
let orderNumber, orderType

class G4portal {

    async selectAIS() {
        await actions.pause(3000)
        await actions.waitForDisplayed(AIS, "AIS")
        assert.equal(
            await check.isDisplayed(AIS, "AIS"),
            true, 'Validation Failed: AIS not displayed!'
        );
        await actions.clickElement('click', AIS, "AIS")
        await actions.pause(3000)
    }

    async selectMOD() {
        await actions.pause(3000)
        await actions.waitForDisplayed(MOD, "MOD")
        assert.equal(
            await check.isDisplayed(MOD, "MOD"),
            true, 'Validation Failed: MOD not displayed!'
        );
        await actions.clickElement('click', MOD, "MOD")
        await actions.pause(3000)
    }


    async selectAppFromG4Portal(app) {
        await homePage.getEnvironmentValue()
        env = process.env.ENV
        // if (getEnv.includes('okd')) {
        //     // var envURL = getEnv.split('-')[1].split('.')[0]
        //     // env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
        //     env = getEnv
        // }
        // else {
        //     env = getEnv
        // }
        console.log("app start.........", app)
        if (app !== 'CL') {
            if (!env.includes("stg") && !env.includes("qa") && !env.includes("in") && !env.includes("okd") && !env.includes("aws") && !env.includes("prd01")) {
                assert.fail("Scenarios not applicable in " + env + " environment")
            }
            else {
                if (app === 'MOD') {
                    await actions.waitForDisplayed(MOD, "MOD")
                    assert.equal(
                        await check.isDisplayed(MOD, "MOD Tab"),
                        true,
                        'Validation Failed: MOD not displayed!'
                    );
                    await actions.clickElement('click', MOD, "MOD")
                }
                if (app === 'SVT') {
                    await actions.waitForDisplayed(SVT, "SVT")
                    assert.equal(
                        await check.isDisplayed(SVT, "SVT Tab"),
                        true,
                        'Validation Failed: SVT not displayed!'
                    );
                    await actions.clickElement('click', SVT, "SVT")
                }
                if (app === 'FM') {
                    await actions.waitForDisplayed(FM, "FM")
                    assert.equal(
                        await check.isDisplayed(FM, "FM Tab"),
                        true,
                        'Validation Failed: FM not displayed!'
                    );
                    await actions.clickElement('click', FM, "FM")
                }
                if (app === 'CAR') {
                    await actions.waitForDisplayed(CAR, "CAR")
                    assert.equal(
                        await check.isDisplayed(CAR, "CAR Tab"),
                        true,
                        'Validation Failed: CAR not displayed!'
                    );
                    await actions.clickElement('click', CAR, "CAR")
                }
                if (app === 'HOT') {
                    await actions.waitForDisplayed(HOT, "HOT")
                    assert.equal(
                        await check.isDisplayed(HOT, "HOT Tab"),
                        true,
                        'Validation Failed: HOT not displayed!'
                    );
                    await actions.clickElement('click', HOT, "HOT")
                }
                if (app === 'ATL') {
                    await actions.waitForDisplayed(ATL, "ATL")
                    assert.equal(
                        await check.isDisplayed(ATL, "ATL Tab"),
                        true,
                        'Validation Failed: ATL not displayed!'
                    );
                    await actions.clickElement('click', ATL, "ATL")
                }
                if (app === 'STS') {
                    await actions.waitForDisplayed(STS, "STS")
                    assert.equal(
                        await check.isDisplayed(STS, "STS Tab"),
                        true,
                        'Validation Failed: STS not displayed!'
                    );
                    await actions.clickElement('click', STS, "STS")
                }
                if (app === 'ESP') {
                    await actions.waitForDisplayed(ESP, "ESP")
                    assert.equal(
                        await check.isDisplayed(ESP, "ESP Tab"),
                        true,
                        'Validation Failed: ESP not displayed!'
                    );
                    await actions.clickElement('click', ESP, "ESP")
                }
                if (app === 'RQ') {
                    await actions.waitForDisplayed(RQ, "RQ")
                    assert.equal(
                        await check.isDisplayed(RQ, "RQ Tab"),
                        true,
                        'Validation Failed: RQ not displayed!'
                    );
                    await actions.clickElement('click', RQ, "RQ")
                }
                if (app === 'AIS') {
                    await actions.waitForDisplayed(AIS, "AIS")
                    assert.equal(
                        await check.isDisplayed(AIS, "AIS"),
                        true,
                        'Validation Failed: AIS not displayed!'
                    );
                    await actions.clickElement('click', AIS, "AIS")
                }
            }
        }
        else {
            if (app === 'CL') {
                if (!env.includes("stg") && !env.includes("qa") && !env.includes("okd") && !env.includes("aws")
                    && !env.includes("nddprd")) {
                    assert.fail("Scenarios not applicable in " + env + " environment")
                }
                else {
                    await actions.waitForDisplayed(CL, "CL")
                    assert.equal(
                        await check.isDisplayed(CL, "CL"),
                        true,
                        'Validation Failed: CL not displayed!'
                    );
                    await actions.clickElement('click', CL, "CL")
                }
            }
        }
    }
    async accessMOD() {
        await actions.pause(1000)
        await browser.switchWindow('Search – Bookings');
        await actions.pause(1000)
        assert.equal(
            await check.isDisplayed(confirmationNumField, "confirmationNumField"),
            true,
            'Validation Failed: confirmationNumField not displayed!'
        );
        try {
            await actions.clickElement('click', confirmationNumField, 'confirmation inputfield')
        }
        catch (Ex) {
            assert.fail("Unable to verify fields in MOD tab.")
        }
    }
    async accessBag() {
        await actions.pause(2000)
        await browser.switchWindow('Fee Management : Bag Fee : Rules');
        await actions.waitForDisplayed(bagTab, "bagTab")
        assert.equal(
            await check.isDisplayed(bagTab, "bagTab"),
            true,
            'Validation Failed: bagTab not displayed!'
        );
        await actions.clickElement('click', bagTab, "bagTab")
        await actions.waitForDisplayed(resultRow, "resultRow")
        assert.equal(
            await check.isDisplayed(resultRow, "resultRow"),
            true,
            'Validation Failed: resultRow not displayed!'
        );
        await actions.clickElement('click', resultRow, "resultRow")
    }
    async accessPB() {
        await actions.pause(1000)
        await browser.switchWindow('Fee Management : Bag Fee : Rules');
        await actions.pause(1000)
        assert.equal(
            await check.isDisplayed(pbTab, "pbTab"),
            true,
            'Validation Failed: pbTab not displayed!'
        );
        await actions.clickElement('click', pbTab, "pbTab")
        await actions.waitForDisplayed(resultRow, "resultRow")
        assert.equal(
            await check.isDisplayed(resultRow, "resultRow"),
            true,
            'Validation Failed: resultRow not displayed!'
        );
        await actions.clickElement('click', resultRow, "resultRow")

    }
    async accessTF() {
        await actions.pause(2000)
        await browser.switchWindow('Fee Management : Bag Fee : Rules');
        await actions.waitForDisplayed(tfTab, "tfTab")
        assert.equal(
            await check.isDisplayed(tfTab, "tfTab"),
            true,
            'Validation Failed: tfTab not displayed!'
        );
        await actions.clickElement('click', tfTab, "tfTab")
        await actions.waitForDisplayed(resultRow, "resultRow")
        assert.equal(
            await check.isDisplayed(resultRow, "resultRow"),
            true,
            'Validation Failed: resultRow not displayed!'
        );
        await actions.clickElement('click', resultRow, "resultRow")
    }
    async accessHOT() {
        await browser.switchWindow('Hotels : Dashboard');
        assert.equal(
            await check.isDisplayed(payloadTab, "payloadTab"),
            true,
            'Validation Failed: payloadTab not displayed!'
        );
        await actions.clickElement('click', payloadTab, "payloadTab")
        await actions.waitForDisplayed(hotelProviderIdField, "hotelProviderIdField")
        assert.equal(
            await check.isDisplayed(hotelProviderIdField, "hotelProviderIdField"),
            true,
            'Validation Failed: hotelProviderIdField not displayed!'
        );
        try {
            await actions.clickElement('click', hotelProviderIdField, "hotelProviderIdField")
            // actions.pause(2000)
            // await browser.refresh()
            await actions.clickElement('click', fulfillmentTab, "fulfillmentTab")
            await actions.clickElement('click', revenueTab, "revenueTab")
            await actions.clickElement('click', inventoryTab, "inventoryTab")
        }
        catch (Ex) {
            assert.fail("Unable to verify fields in HOT tab.")
        }
        await actions.waitForDisplayed(airportLabel, "airportLabel")
        assert.equal(
            await check.isDisplayed(airportLabel, "airportLabel"),
            true,
            'Validation Failed: airportLabel not displayed!'
        );
        await actions.clickElement('click', airportLabel, "airportLabel")

    }
    async accessATL() {
        await browser.switchWindow('accounting');
        await actions.waitForDisplayed(rulesTab, "rules Tab")
        assert.equal(
            await check.isDisplayed(rulesTab, "rulesTab"),
            true,
            'Validation Failed: rulesTab not displayed!'
        );
        await actions.clickElement('click', rulesTab, "rules Tab")
        await actions.waitForDisplayed(hotelOverPercentField, "hotel Over Percent Field")
        assert.equal(
            await check.isDisplayed(hotelOverPercentField, "hotelOverPercentField"),
            true,
            'Validation Failed: hotelOverPercentField not displayed!'
        );
        await actions.clickElement('click', hotelOverPercentField, "hotel Over Percent Field")
        await actions.waitForDisplayed(reportsTab, "reportsTab")
        assert.equal(
            await check.isDisplayed(reportsTab, "reportsTab"),
            true,
            'Validation Failed: reportsTab not displayed!'
        );
        await actions.clickElement('click', reportsTab, "reportsTab")
        await actions.waitForDisplayed(typeField, "type Field")
        assert.equal(
            await check.isDisplayed(typeField, "typeField"),
            true,
            'Validation Failed: typeField not displayed!'
        );
        await actions.clickElement('click', typeField, "type Field")
        await actions.waitForDisplayed(invoicesTab, "invoices Tab")
        assert.equal(
            await check.isDisplayed(invoicesTab, "invoicesTab"),
            true,
            'Validation Failed: invoicesTab not displayed!'
        );
        await actions.clickElement('click', invoicesTab, "invoices Tab")
        await actions.waitForDisplayed(invoiceDateField, "invoiceDate Field")
        assert.equal(
            await check.isDisplayed(invoiceDateField, "invoiceDateField"),
            true,
            'Validation Failed: invoiceDateField not displayed!'
        );
        await actions.clickElement('click', invoiceDateField, "invoice Date Field")
        await actions.waitForClickable(atlTab, "atlTab")
        assert.equal(
            await check.isDisplayed(atlTab, "atlTab"),
            true,
            'Validation Failed: atlTab not displayed!'
        );
        await actions.clickElement('click', atlTab, "atlTab")
        await actions.pause(2000)
        await actions.waitForClickable(gqlPostingRow, "gqlPosting Row")
        assert.equal(
            await check.isDisplayed(gqlPostingRow, "gqlPostingRow"),
            true,
            'Validation Failed: gqlPostingRow not displayed!'
        );
        await actions.clickElement('click', gqlPostingRow, "gqlPosting Row")
    }
    async accessSTS() {
        await actions.pause(1000)
        await browser.switchWindow("Seat Maintenance : Maintenance");
        await actions.pause(1000)
        assert.equal(
            await check.isDisplayed(seatMapTitle, "seatMapTitle"),
            true,
            'Validation Failed: seatMapTitle not displayed!'
        );
        await actions.clickElement('click', seatMapTitle, "seatMapTitle")
        await check.isDisplayed(seatMaskingTitle, "Seat Masking Title")
        assert.equal(
            await check.isDisplayed(seatMaskingTitle, "seatMaskingTitle"),
            true,
            'Validation Failed: seatMaskingTitle not displayed!'
        );
        await actions.clickElement('click', seatMaskingTitle, "Seat Masking Title")
        assert.equal(
            await check.isDisplayed(seatPricingTitle, "seatPricingTitle"),
            true,
            'Validation Failed: seatPricingTitle not displayed!'
        );
        await actions.clickElement('click', seatPricingTitle, "Seat Pricing Title")
    }
    async accessESP() {
        await actions.pause(1000)
        await browser.switchWindow('Mappings List :: Equipment Swap');
        await actions.pause(1000)
        assert.equal(
            await check.isDisplayed(mapRow, "mapRow"),
            true,
            'Validation Failed: mapRow not displayed!'
        );
        try {
            await actions.waitForClickable(mapRow, "Map Row")
            await actions.clickElement('click', mapRow, "Map Row")
        }
        catch (Ex) {
            assert.fail("Unable to verify fields in ESP tab.")
        }
    }
    async accessCL() {
        await actions.pause(1000)
        await browser.switchWindow("customers");
        await actions.pause(1000)
        assert.equal(
            await check.isDisplayed(fnameField, "fnameField"),
            true,
            'Validation Failed: fnameField not displayed!'
        )
        try {
            await actions.clickElement('click', fnameField, "fnameField")
            await actions.clickElement('click', emailField, "emailField")
        }
        catch (Ex) {
            assert.fail("Unable to verify fields in CL tab.")
        }
    }
    async accessSVT() {
        try {
            await actions.pause(1000)
            await browser.switchWindow("payments");
            var dates = new Date();
            var dateFormat = dates.toLocaleDateString("en-US")
            var dateSplit = dateFormat.split("/")
            var finalDate = ('0' + dateSplit[0]).slice(-2) + '/' + ('0' + dateSplit[1]).slice(-2) + '/' + dateSplit[2]
            await actions.waitForDisplayed(searchBySelectSVT, "search By SelectSVT")
            assert.equal(
                await check.isDisplayed(searchBySelectSVT, "searchBySelect"),
                true,
                'Validation Failed: searchBySelectSVT not displayed!'
            )
            try {
                await actions.selectOption(searchBySelectSVT, 'value', "authDateTime")
                await actions.selectOption(operationSelectSVT, 'value', "equals")
                await actions.setInputField('setValue', finalDate, valueFieldSVT, "value Field")
                await actions.waitForDisplayed(searchButtonSVT, "search Button")
            }
            catch (Ex) {
                assert.fail("Unable to verify fields in SVT tab.")
            }
            assert.equal(
                await check.isDisplayed(searchButtonSVT, "searchButton"),
                true,
                'Validation Failed: searchButtonSVT not displayed!'
            )
            await actions.clickElement('click', searchButtonSVT, "search Button")
            await actions.waitForDisplayed(resultRowSVT, "result Row")
            await check.isDisplayed(resultRowSVT, "result Row")
            assert.equal(
                await check.isDisplayed(resultRowSVT, "resultRow"),
                true,
                'Validation Failed: resultRowSVT not displayed!'
            )
            await actions.clickElement('click', resultRowSVT, "result Row")
        } catch (err) {
            console.error("Error while validating the fields of SVT portal.");
        }
    }
    async accessCAR() {
        await browser.switchWindow("vehicle");
        var date = new Date();
        var d = date.setDate(date.getDate() + 1);
        var dateFormats = new Date(d).toLocaleDateString("en-US")
        var dateSplits = dateFormats.split("/")
        var finalDates = ('0' + dateSplits[0]).slice(-2) + '/' + ('0' + dateSplits[1]).slice(-2) + '/' + dateSplits[2]
        await actions.waitForDisplayed(pickupDateField, "pickupDateField")
        assert.equal(
            await check.isDisplayed(pickupDateField, "pickupDateField"),
            true,
            'Validation Failed: pickupDateField not displayed!'
        )
        await actions.setInputField('setValue', "1", pickupDateField, "pickupDateField")
        await actions.setInputField('setValue', finalDates + "12:00PM", pickupDateField, "pickupDateField")
        d = date.setDate(date.getDate() + 2);
        dateFormats = new Date(d).toLocaleDateString("en-US")
        dateSplits = dateFormats.split("/")
        finalDates = ('0' + dateSplits[0]).slice(-2) + '/' + ('0' + dateSplits[1]).slice(-2) + '/' + dateSplits[2]
        try {
            await actions.setInputField('setValue', "1", returnDateField, "returnDateField")
            await actions.setInputField('setValue', finalDates + "12:00PM", returnDateField, "returnDateField")
            await actions.setInputField('setValue', "LAS", bookLocField, "book location")
            await actions.pressButton('Enter')
            await actions.setInputField('setValue', "LAS", pickupLocField, "pickupLocField")
            await actions.pressButton('Enter')
            await actions.clickElement('click', checkRateButton, "check Rate Button")
        }
        catch (Ex) {
            assert.fail("Unable to verify fields in CAR tab.")
        }
        await actions.waitForDisplayed(resultRowsCAR, "Result Row")
        assert.equal(
            await check.isDisplayed(resultRowsCAR, "resultRowsCAR"),
            true,
            'Validation Failed: resultRowsCAR not displayed!'
        )
        await actions.clickElement('click', resultRowsCAR, "Result Row")
    }
    async accessRQ() {
        await actions.pause(3000)
        await browser.switchWindow("Reaccomm : Itineraries");

        await actions.pause(1000)
        await actions.waitForDisplayed(queueList, "queue list")
        assert.equal(
            await check.isDisplayed(queueList, "queueList"),
            true,
            'Validation Failed: queueList not displayed!'
        )
        try {
            await actions.selectOptionByIndex(queueList, "0")
            await actions.clickElement('click', submitRQ, "submit")
        } catch (Ex) {
            assert.fail("Unable to verify fields in RQ tab.")
        }
    }
    async selectReservation() {

        await browser.switchWindow("AIS");
        await actions.waitForDisplayed(rsTab, "Reservation Tab")
        assert.equal(
            await check.isDisplayed(rsTab, "rsTab"),
            true,
            'Validation Failed: rsTab not displayed!'
        )
        await actions.clickElement('click', rsTab, "Reservation Tab")
    }
    async selectPrintManifest() {
        await actions.waitForDisplayed(printManifestTab, "Print Manifest")
        assert.equal(
            await check.isDisplayed(printManifestTab, "printManifestTab"),
            true,
            'Validation Failed: printManifestTab not displayed!'
        )
        await actions.clickElement('click', printManifestTab, "Print Manifest")
        await actions.pause(1000)
        await browser.switchWindow('FLIGHT MANIFEST');
        await this.siteIssues()
    }
    async selectFlight() {
        await actions.waitForDisplayed(locationSelect, "location")
        assert.equal(
            await check.isDisplayed(locationSelect, "locationSelect"),
            true,
            'Validation Failed: location not displayed!'
        )
        assert.equal(
            await check.isDisplayed(locationSelect, "locationSelect"),
            true,
            'Validation Failed: locationField not displayed!'
        )
        await actions.clickElement('click', locationSelect, "Location field")
        await actions.setInputField('setValue', "LAS", locationField, "LAS Location")
        actions.pause(3000)
        assert.equal(
            await check.isDisplayed(selectCity, "selectCity"),
            true,
            'Validation Failed: Select City not displayed!'
        )
        await actions.clickElement('click', selectCity, "selectCity")
        assert.equal(
            await check.isDisplayed(submitPrintManifest, "submitPrintManifest"),
            true,
            'Validation Failed: submit button not displayed!'
        )
        await actions.clickElement('click', submitPrintManifest, "Submit Button")
        assert.equal(
            await check.isDisplayed(submitPrintManifest, "submitPrintManifest"),
            true,
            'Validation Failed: Submit Button not displayed!'
        )
        assert.equal(
            await check.isDisplayed(selectFlight, "selectFlight"),
            true,
            'Validation Failed: Select Flight not displayed!'
        )
        await actions.clickElement('click', selectFlight, "Select Flight")
        await browser.switchWindow('Flt')
    }
    async verifyPrintManifest() {
        await actions.waitForDisplayed(allPaxButton, "All Pax button")
        assert.equal(
            await check.isDisplayed(allPaxButton, "allPaxButton"),
            true,
            'Validation Failed: All Pax button not displayed!'
        )
        await actions.clickElement('click', allPaxButton, "All Pax button")
        try {
            await check.isDisplayed(paxTable, "paxTable")
            console.log("Pax Table is displayed")
        }
        catch (err) {
            console.log("Pax Table is not displayed")
        }
    }
    async flightInformation() {
        await browser.switchWindow("AIS");
        await actions.waitForDisplayed(ffTab, "Fllight Information")
        assert.equal(
            await check.isDisplayed(ffTab, "ffTab"),
            true,
            'Validation Failed: Flight Information not displayed!'
        )
        await actions.clickElement('click', ffTab, "Fllight Information")
    }
    async selectFlightFlow() {
        await actions.waitForDisplayed(flightFlowTab, "Fllight Flow")
        assert.equal(
            await check.isDisplayed(flightFlowTab, "flightFlow Tab"),
            true,
            'Validation Failed: Flight Flow not displayed!'
        )
        await actions.clickElement('click', flightFlowTab, "Fllight Flow")
        await actions.pause(2000)
        await browser.switchWindow("FLIGHT FLOW")
        await this.siteIssues()

    }
    async selectGroup() {
        await actions.waitForDisplayed(flightFlowHeader, "flightFlowHeader")
        assert.equal(
            await check.isDisplayed(flightFlowHeader, "flightFlowHeader"),
            true,
            'Validation Failed: flightFlowHeader not displayed!'
        )
        await actions.selectOption(accGroupSelect, 'text', "ALL")
        assert.equal(
            await check.isDisplayed(submitButtonFlow, "submitButtonFlow"),
            true,
            'Validation Failed: submit button not displayed!'
        )
        await actions.clickElement('click', submitButtonFlow, "submit Button")
    }
    async flowTable() {
        await actions.waitForDisplayed(flightFlowHeader, "flightFlowHeader")
        assert.equal(
            await check.isDisplayed(flightFlowHeader, "flightFlowHeader"),
            true,
            'Validation Failed: flightFlowHeader not displayed!'
        )
        try {
            await check.isDisplayed(mainTable, "mainTable")
            console.log("Flight flow table is displayed");
        }
        catch (err) {
            console.log("Flight flow table is not displayed")
        }
    }
    async selectKayakConsole() {
        if (getEnv.includes("prod") || getEnv.includes("okd")
            || getEnv.includes("nddprd")) {
            console.warn("Scenarios not applicable in " + env + " environment")
        }
        else {
            await browser.switchWindow("AIS");
            assert.equal(
                await check.isDisplayed(ADTab, "ADTab"),
                true,
                'Validation Failed: Admin Tab not displayed!'
            )
            await actions.clickElement('click', ADTab, "Admin Tab")
            await actions.waitForDisplayed(kayakConsoleTab, "kayak ConsoleTab")
            assert.equal(
                await check.isDisplayed(kayakConsoleTab, "kayakConsoleTab"),
                true,
                'Validation Failed:kayak ConsoleTab not displayed!'
            )
            await actions.clickElement('click', kayakConsoleTab, "kayak ConsoleTab")
            await actions.pause(2000)
            await browser.switchWindow("KAYAK MANAGEMENT CONSOLE");
        }
    }
    async editKayakConsole() {
        if (getEnv.includes("prod") || getEnv.includes("okd")
            || getEnv.includes("nddprd")) {
            console.warn("Scenarios not applicable in " + env + " environment")
        }
        else {
            assert.equal(
                await check.isDisplayed(kayakTable, "kayakTable"),
                true,
                'Validation Failed:kayak Table not displayed!'
            )
        }
    }
    async selectInventory() {
        if (!getEnv.includes("stg") && !getEnv.includes("in") && !getEnv.includes("qa") && !getEnv.includes("trn")
            && !getEnv.includes("aws") && !getEnv.includes("prod") && !getEnv.includes("nddprd")) {
            assert.fail("Air web functionality not available")
        }
        else {
            await browser.switchWindow("AIS");
            assert.equal(
                await check.isDisplayed(INTab, "Inventory tab"),
                true,
                'Validation Failed: Inventory Tab not displayed!'
            )
            await actions.clickElement('click', INTab, "Inventory Tab")
        }
    }
    async selectInventoryMaintenance() {
        await actions.waitForDisplayed(inventoryMxTab, "Inventory Maintenance")
        assert.equal(
            await check.isDisplayed(inventoryMxTab, "Inventory Maintenance"),
            true,
            'Validation Failed: Inventory Maintanence tab not displayed!'
        )
        await actions.clickElement('click', inventoryMxTab, "InventoryMaintanence tab")
        console.log("About to switching the window")
        await actions.pause(2000)
        await browser.switchWindow("Inventory");
        console.log("Windows Switched")
    }
    async selectAnyInventory() {
        try {
            await actions.clickElement('click', firstInventory, "First Inventory")
        }
        catch (err) {
            if (env.includes("QA") || env.includes("qa")) {
                console.error("Kindly Verify >> QAA-23683");
            }
        }
    }
    async transactionTab() {
        // await browser.pause(1000)
        await browser.switchWindow("Maintenance");
        console.log(await browser.getTitle())
        assert.equal(
            await check.isDisplayed(transactionTab, "transactionTab"),
            true,
            'Validation Failed: transaction Tab not displayed!'
        )
        await actions.clickElement('click', transactionTab, "transaction Tab")
    }
    async verifyTransactions() {
        const noTransaction = $$("//h2[contains(text(),'No Transactions')]")
        const columnHeader = $$("//a[contains(text(),'Rec Id')]")
        if (noTransaction.length != 0) {
            console.error("No Transaction is found");
        }
        else {
            if (columnHeader.length != 0) {
                console.error("Transaction tab is displayed");
            }
            else {
                console.error("Transaction tab is not displayed.")
            }
        }
    }
    async selectFlightFollowing() {
        await actions.waitForDisplayed(flightFollowing, "flight Following")
        assert.equal(
            await check.isDisplayed(flightFollowing, "flightFollowing"),
            true,
            'Validation Failed: flight Following not displayed!'
        )
        await actions.clickElement('click', flightFollowing, "flight Following")
        await actions.pause(2000)
        await browser.switchWindow("FLIGHT FOLLOWING")
        await this.siteIssues()
    }
    async selectingFlight() {
        // await browser.switchToFrame(fllist)
        await browser.switchToFrame(0)
        flightNumbers = await actions.getText(availableFlight, "First flight number")
        console.log("The first available flight number in the grid is - ", flightNumbers)
        await actions.clickElement('click', availableFlight, "First flight")
    }
    async selectMaintenanceAndEngineering() {
        await browser.switchWindow("AIS");
        if (!getEnv.includes("stg") && !getEnv.includes("qa") && !getEnv.includes("prod") && !getEnv.includes("in")
            && !getEnv.includes("nddprd") && !getEnv.includes("trn") && !getEnv.includes("aws")) {
            assert.fail("Air web functionality not available")
        } else {
            try {
                await check.isDisplayed(lineMXTab, "lineMXTab")
            }
            catch (err) {
                await actions.clickElement('click', METab, "Maintenance and Engineering")
            }
        }
    }
    async selectingSubModules(types) {
        await actions.pause(1000)
        if (types.includes("LineMaintenance")) {
            await actions.waitForDisplayed(lineMXTab, "lineMXTab")
            assert.equal(
                await check.isDisplayed(lineMXTab, "lineMXTab"),
                true,
                'Validation Failed: Line Maintenance not displayed!'
            )
            await actions.clickElement('click', lineMXTab, "Line Maintenance")
            await actions.pause(1000)
            await browser.switchWindow('Line Maintenance')
        }
        else if (types.includes("MaintenanceRecord")) {
            await actions.pause(1000)
            await actions.waitForDisplayed(mxRecordsTab, "mxRecordsTab")
            assert.equal(
                await check.isDisplayed(mxRecordsTab, "mxRecordsTab"),
                true,
                'Validation Failed: Maintenance Record not displayed!'
            )
            await actions.clickElement('click', mxRecordsTab, "Maintenance Record")
            await actions.pause(1000)
            await browser.switchWindow('Maintenance Records')
        }
        await this.siteIssues()
    }
    async verifyFlightInformation() {
        await browser.switchToParentFrame();
        await browser.switchToFrame(1)
        try {
            await check.isDisplayed(flightHeader, "flightHeader")
            console.log("The selected flight number is displayed.")
        }
        catch (err) {
            console.log("The selected flight number is not reflected back in the header.")
        }
    }
    async selectReports() {
        await actions.waitForDisplayed(reportsTabSpoe, "Reports tab")
        assert.equal(
            await actions.isDisplayed(reportsTabSpoe, "reportsTabSpoe"),
            true,
            'Validation Failed: Reports tab not displayed!'
        )
        await actions.clickElement('click', reportsTabSpoe, "Reports tab")
    }
    async selectFlightLog() {
        assert.equal(
            await actions.isDisplayed(flightLogTab, "reportsTabSpoe"),
            true,
            'Validation Failed: Flight log Tab not displayed!'
        )
        await actions.clickElement('click', flightLogTab, "Flight log Tab")
    }
    async fillReportOption() {
        await actions.waitForDisplayed(tailField, "Tail field")
        assert.equal(
            await check.isDisplayed(tailField, "Tail field"),
            true,
            'Validation Failed: tailField not displayed!'
        )
        await actions.setInputField('setValue', "217NV", tailField, "217NV Tail number")
        var date = new Date();
        var d = date.setDate(date.getDate() - 200);
        var dateFormats = new Date(d).toLocaleDateString("en-US")
        var dateSplits = dateFormats.split("/")
        var finalDates = ('0' + dateSplits[0]).slice(-2) + '/' + ('0' + dateSplits[1]).slice(-2) + '/' + dateSplits[2]
        await actions.setInputField('setValue', finalDates, startingDateField, "startingDateField")
        await actions.pause(1000)
        await actions.clickElement('click', runReportButton, "Run Report")
    }
    async verifyReports(types) {
        await actions.pause(1000)
        if (types.includes("LineMaintenance")) {
            await browser.switchWindow("line")
        }
        else if (types.includes("MaintenanceRecord")) {
            await browser.switchWindow("records")
        }
        assert.equal(
            await check.isDisplayed(flightLogHeader, "Flight log header"),
            true,
            'Validation Failed: Flight log header not displayed!'
        )
        try {
            await check.isDisplayed(resultRowSPOE, "Result row")
            console.log("Flight log reports are displayed")
            await actions.clickElement('click', closeButtonSpoe, "Close button");
        }
        catch (err) {
            console.log("--FAIL due to no reports in flight log")
        }


    }
    async accountsPayable() {
        if (!getEnv.includes("stg") && !getEnv.includes("qa") && !getEnv.includes("prod") && !getEnv.includes("in")
            && !getEnv.includes("trn") && !getEnv.includes("aws")) {
            assert.fail("Air web functionality not available")
        } else {
            await browser.switchWindow("AIS");
            // await actions.waitForDisplayed(APTab, "Account Payable")
            try {
                await check.isDisplayed(accountsPayableMXTab, "Account Payable Maintenance")
            }
            catch (err) {
                await actions.clickElement('click', APTab, "Account Payable")
            }
        }
    }
    async selectAccountPayableMaintenance() {
        await actions.waitForDisplayed(accountsPayableMXTab, "Account Payable Maintenance")
        assert.equal(
            await check.isDisplayed(accountsPayableMXTab, "Account Payable Maintenance"),
            true,
            'Validation Failed: Account Payable Maintenance not displayed!'
        )
        await actions.waitForClickable(accountsPayableMXTab, "Account Payable Maintenance")
        await actions.clickElement('click', accountsPayableMXTab, "Account Payable Maintenance")
        console.log("About to switching to new window");
        await actions.pause(2000)
        await browser.switchWindow("Vendor Lookup")
        console.log("Windows Switched");
    }
    async fillVendorLookup() {

        try {
            assert.equal(
                await check.isDisplayed(vendorLookup, "Vendor Lookup Header"),
                true,
                'Validation Failed: Vendor Lookup Header not displayed!'
            )
            await actions.clickElement('click', vendorLookup, "Vendor Lookup Header")
            await actions.selectOption(vendorStatField, 'value', "A")
            await actions.setInputField('setValue', "HQ", vendorLocationField, "HQ Location")
        }
        catch (err) {
            if (env.includes("QA") || env.includes("qa")) {
                console.log("Kindly Verify >> QAA-23683")
            }
        }
    }
    async payableSubmit() {
        await actions.waitForDisplayed(payableSubmitButton, "Submit button")
        await actions.clickElement('click', payableSubmitButton, "Submit button");
    }
    async selectVendor() {
        let selVendor = await browser.$$(selectedVendors)
        console.log(selVendor.length)
        if (selVendor.length === 0) {
            if (getEnv.includes("undefine")) {
                assert.equal(
                    await check.isDisplayed(alternateVendor, "Vendor_00039"),
                    true,
                    'Validation Failed: Vendor_00039 not displayed!'
                )
                await actions.clickElement('click', alternateVendor, "Vendor_00039");

                console.log("Vendor_00039 is Selected");

            } else {
                await actions.waitForDisplayed(firstVendor, "First Vendor")
                await actions.clickElement('click', firstVendor, "First Vendor");

                console.log("Random Available Vendor Selected");
            }

        } else {
            await actions.waitForDisplayed(selectedVendor, "Vendor 00005")
            await actions.clickElement('click', selectedVendor, "Vendor 00005");
            console.log("selectedVendor");
        }
    }
    async selectAnalysisTab() {
        await actions.pause(2000)
        await browser.switchWindow("Vendor Maintenance")
        assert.equal(
            await check.isDisplayed(analysisTab, "Analysis Tab"),
            true,
            'Validation Failed: Analysis Tab not displayed!'
        )
        await actions.clickElement('click', analysisTab, "Analysis Tab");
        try {
            await check.isDisplayed(noTransaction, "No-0Transaction")
            console.error("No Transaction Found !!!!!");
        }
        catch (err) {
            await check.isDisplayed(selectedTransaction, "Order Number")
            orderNumber = await actions.getText(selectedTransaction, "Order Number");
            orderType = await actions.getProperty(selectedTransaction, 'href', "selectedTransaction")
            await actions.waitForClickable(selectedTransaction, "Order Number")
            await actions.clickElement('click', selectedTransaction, "Order Number");
        }
    }
    async verifyOrders() {
        assert.equal(
            await check.isDisplayed(ordersHeader, "Orders Header"),
            true,
            'Validation Failed: Orders Header not displayed!'
        )
        console.log("orderType", orderType)
        console.log("orderN", orderNumber)
        if (orderType.includes("lookupInvoice")) {
            let field = await actions.getProperty(invoiceIdField, 'value', "invoiceIdField")
            let voiceId = (field) === orderNumber
            if (voiceId) {
                console.log("Invoice Found");
            } else {
                console.log("Invoice not found");
            }
        } else if (orderType.includes("lookupOrder")) {
            let order = (await actions.getProperty(orderIdField, 'value', "orderIdField")) === orderNumber
            if (order) {
                console.log("Order Found");
            } else {
                console.log("order not found");
            }
        } else if (orderType.includes("lookupPayment")) {
            let payemtNum = (await actions.getProperty(paymentIdField, 'value', "paymentIdField")) === orderNumber
            if (payemtNum)
                console.log("Payment Found");
        } else {
            console.log("Payment not found");
        }
    }
    async Maintenance_operation() {

        if (!getEnv.includes("stg") && !getEnv.includes("qa") && !getEnv.includes("prod") && !getEnv.includes("in")
            && !getEnv.includes("nddprd") && !getEnv.includes("trn") && !getEnv.includes("aws")) {
            assert.fail("Air web functionality not available")
        } else {
            await browser.switchWindow("AIS");
            try {
                await check.isDisplayed(aircraftRecordsTab, "Aircraft record")
            }
            catch (err) {
                await actions.clickElement('click', MXTab, "Maintenance Operation")
            }
        }
    }
    async selectAircraftRecord() {
        await actions.clickElement('click', aircraftRecordsTab, "Aircraft record");
        await actions.pause(2000)
        await browser.switchWindow('records')
        // iSwitchToWindow(2);
        await this.siteIssues()
    }
    async clickLookupButton() {
        assert.equal(
            await check.isDisplayed(lookupButton, "Lookup Button"),
            true,
            'Validation Failed: Lookup Button not displayed!'
        )

        await actions.clickElement('click', lookupButton, "Lookup Button");
    }
    async lookupAircraftPart() {
        await browser.switchWindow('Aircraft Records')
        assert.equal(
            await browser.getTitle(),
            "Aircraft Records",
            'Validation Failed: aircraft record title not displayed!'
        )
        await actions.waitForDisplayed(aircraftTitle, "aircraft record title")
        console.log("Aircraft Records Lookup: " + await aircraftRecordsResultRow.length);
        if (await aircraftRecordsResultRow.length > 0) {
            console.log("Aircraft Records Lookup: " + await aircraftRecordsResultRow.length + " rows");
            console.log("The first row is: " + await actions.getText(aircraftRecordsResultRow[0]).replaceAll("\n", " "));
        } else {
            console.log("There is no result in the Aircraft lookup record");
        }
    }
    async selectMXandEngr() {
        await browser.switchWindow("AIS");
        try {
            await check.isDisplayed(lineMXTab, "lineMXTab")
        }
        catch (err) {
            await actions.clickElement('click', METab, "Maintenance and Engineering")
        }
    }
    async selectMXRecords() {
        try {
            await actions.waitForClickable(mxRecordsTab, "mxRecordsTab")
        } catch (err) {
            console.error("mxRecordsTab is not clickable");
        }
        await actions.clickElement('click', mxRecordsTab, "mx Records Tab");
        // iSwitchToWindow(2);
        await actions.pause(2000)
        await browser.switchWindow('Maintenance Records')
    }
    async lookupActionRequest() {
        await actions.clickElement('click', actionsTab, "actions tab");
        await actions.clickElement('click', actionRequestsTab, "actionRequests Tab");
        try {
            await check.isDisplayed(actionRequestsLookupButton, "actionRequests LookupButton"),
                await actions.clickElement('click', actionRequestsLookupButton, "actionRequests LookupButton");
        }
        catch (err) {
        }
        console.log("rowleng", await actionRequestsResultRow.length)
        if (actionRequestsResultRow.length > 0) {
            console.error("Action Requests Lookup: " + actionRequestsResultRow.length + " rows");
            console.error("The first row is: " + await actions.getText(actionRequestsResultRow[0]).replaceAll("\n", " "));
        }
    }

    async siteIssues() {
        if (siteCantBeReached.length != 0) {
            console.error("This site cant be reached, Please try after sometimes.");
        } else if (somethingOdd.length != 0) {
            console.error("We got Something Odd happened error, Please try after sometimes.");
        } else if (goodDeals.length != 0) {
            console.error("URL navigated to maintenace page, Please try after sometimes.");
        } else if (serviceUnavailable.length != 0) {
            console.error("503 Service Temporarily Unailable, Please try after sometimes.");
        } else if (unexpectedErr.length != 0) {
            console.error("An unexpected error occurred while we were processing your request");
        } else if (paymentErr.length != 0) {
            console.error("Error occurred while we were processing your payment/card, please check manually in: " + env + " " + System.getProperty("awsDomain"));
        } else if (certifyErr.length != 0) {
            console.error("Your connection is not private, please check manually in: " + env);
        }
    }
    async authIssue() {
        if (getEnv.includes('okd')) {
            env = getEnv
        }
        else {
            env = getEnv
        }
        if (env.includes("prod") || env.includes("vip")) {
            let user = process.env.username
            let pass = process.env.password
            await actions.pause(1000)
            if (authErr.length == 0 && form.length == 0) {
                console.error("User Credential Authenticated!!!");
            } else if (user.length != 0 || pass.length != 0) {
                console.error("User Not Provided the Credential for this environment : " + env);
            } else {
                console.error("Login Error: Unable to authenticate credentials, Plz try manually by Entering Valid credentials");
            }
        }

    }

    async ATLTranscation() {
        await actions.pause(15000)
        await browser.switchWindow('Accounting');
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
        await browser.keys(['Enter']);
        await actions.waitForDisplayed(resultTable, 'resultTable', 30000)
        var tableSize = await $$(resultTable).length
        console.log("ATL transaction size:", tableSize)
        if (tableSize > 0) {
            console.log("ATL transaction available")
        } else {
            assert.fail("ATL Transaction not available")
        }
    }
}
export default new G4portal()