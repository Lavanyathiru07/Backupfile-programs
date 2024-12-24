import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'
import homePage from '../page-objects/homePageObject'
import { itinerary } from './confPageObject'
import { TotalFareAmount } from './paymentPageObj'
import { bundleItems, bundlePrice, bundlePageCollector } from './bundlesPageObject'
import { departDate, returnDate, flightPageCollector } from './flightsPageObject'
import { hotelsPageCollector, hotelsDetailsPageCollector } from './hotelPageObject';
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
const confirmationInputField = "[id='advance-search-itn-num']"
const searchButton = "[class='btn btn-primary pull-right search']"
const viewButton = "//a[@class='btn btn-primary btn-show-booking']"
const lapChildSSRDisplayed = "(//*//div[@class='btn-change-ssrs'])[1]"
const childSSRDisplayed = "(//*//div[@class='btn-change-ssrs'])[3]"
const infantInSeatSSRDisplayed = "(//*//div[@class='btn-change-ssrs'])[5]"
const tripSummarySeatPrice = "//table[@class='table table-condensed']//tr//td[contains(text(),'Seat')]/following-sibling::td"
const tripSummaryCheckedBagPrice = "//table[@class='table table-condensed']//tr//td[contains(text(),'Checked')]/following-sibling::td"
const priorityAccess = "(//a[@class='btn-change-bags'])[4]"
const priorityAccessInputDropDown = "(//select[@class='form-control input-sm input-priority'])[1]"
const priorityAccessInputYes = "//option[contains(text(),'Yes')]"
const spinnerBar = "(//div[@class='loading-spinner'])[1]"
const doneButton = "//a[text()='Done']"
const acceptAndContinue = "//button[text()='Accept & Continue'] | //span[text()='Accept & Continue']"
const cardNumberInput = "//input[@id='payment-card-num']"
const cvvInput = "//input[@id='payment-card-sec']"
const addressInput = "//input[@id='payment-address-1']"
const cityInput = "//input[@id='payment-address-city']"
const stateInput = "//input[@id='payment-address-state']"
const zipInput = "//input[@id='payment-address-zip']"
const addPaymentButton = "//button[contains(@class,'btn btn-primary btn-add-payment')] | //button[contains(@class,'col-12 mb-2 btn btn-success')]"
const receivedFrom = "//input[@id='receivedFrom']"
const submitButton = "//button[@class='btn btn-success btn-submit-payments']"
const confirmAndRedisplay = "//button[@class='btn btn-default btn-confirm-redisplay']"
// const confirmAndRedisplay = "//button[text()='Confirm & Redisplay']"
const confirmationHeading = "//h3[contains(text(),'Confirmation #')]"
const tripTypeOneway = "//small[contains(text(),'ONE-WAY')]"
const tripTypeRoundtrip = "//small[contains(text(),'ROUND TRIP')]"
const depDate = "//table[contains(@class,'table-flights')]//tr[1]//*[@class = 'text-nowrap']"
const depCity = "//table[contains(@class,'table-flights')]//tr[1]//td[3]"
const depFlightNumber = "//table[contains(@class,'table-flights')]//tr[1]//td[2]"
const depTime = "//table[contains(@class,'table-flights')]//tr[1]//td[6]"
const retDate = "//table[contains(@class,'table-flights')]//tr[2]//*[@class = 'text-nowrap']"
const retCity = "//table[contains(@class,'table-flights')]//tr[1]//td[4]"
const retFlightNumber = "//table[contains(@class,'table-flights')]//tr[2]//td[2]"
const retTime = "//table[contains(@class,'table-flights')]//tr[2]//td[6]"
const flightsFee = "//div[@class = 'booking-pricing']//*[contains(text(),'Flight')]/following::td[1]"
const taxesGovtFee = "//abbr[contains(text(),'Taxes & Gov')]/parent ::*/following-sibling ::td"
const carrierUsageCharge = "//td[contains(text(),'Carrier Usage Fee')]/following-sibling ::td"
const checkedBags = "//td[contains(text(),'Checked Bags')]/following-sibling ::td"
const carryonBags = "//td[contains(text(),'Carry-On Bags')]/following-sibling ::td"
const seatSelections = "//*[contains(text(),'Seat Selections')]/following::td[1]"
const priorityAccessFee = "//td[contains(text(),'Priority Access')]/following-sibling ::td"
const paxCount = "//small[contains(text(),'Passenger')]"
const carryOnBagsSelection = "(//select[contains(@class,'carry-on-bags')][@data-passenger-rph='X'])[Y]"
const checkedBagsSelection = "(//select[contains(@class,'checked-bags')][@data-passenger-rph='X'])[Y]"
const priorityAccessSelection = "(//select[contains(@class,'priority')][@data-passenger-rph='X'])[Y]"
const priorityAccessSelectedSeg1 = "(//td[@class='text-center border-left'][contains(text(),'1A')])/following-sibling::td[5]//a[1][@data-passenger-rph='X']"
const priorityAccessSelectedSeg2 = "(//td[@class='text-center border-left'][contains(text(),'2A')])/following-sibling::td[5]//a[1][@data-passenger-rph='X']"
const carryOnBagsSelectedSeg1 = "(//td[@class='text-center border-left'][contains(text(),'1A')])/following-sibling::td[3]//a[1][@data-passenger-rph='X']"
const carryOnBagsSelectedSeg2 = "(//td[@class='text-center border-left'][contains(text(),'2A')])/following-sibling::td[3]//a[1][@data-passenger-rph='X']"
const checkedBagsSelectedSeg1 = "(//td[@class='text-center border-left'][contains(text(),'1A')])/following-sibling::td[4]//a[1][@data-passenger-rph='X']"
const checkedBagsSelectedSeg2 = "(//td[@class='text-center border-left'][contains(text(),'2A')])/following-sibling::td[4]//a[1][@data-passenger-rph='X']"
const stationsSearchButton = "//div[@id='app']//button[2]"
const stationsConfirmationInputField = "//input[@placeholder='e.g. XY123']"
const stationsSubmitButton = "//button[contains(text(),'Submit')]"
const stationsCarryOnBagManage = "(//*[@id='page-content-wrapper']//table/tbody/tr/td[4]/a)[1]"
const stationsCheckedBagManage = "(//td[contains(@class,'travelerCheckedBag')]//div//a)[X]"
const stationsCarryOnBagIncrement = "(//table/tbody/tr/td[3]/div/div/button[2])[X]"
const stationsCheckedBagIncrement = "(//div[@class='form-control-numeric']//button[2])[3]"
const stationsCheckedBagCurrentValue = "(//div[@class='form-control-numeric']//input)[3]"
const stationsNameInput = "//input[@name='name']"
const stationsCardNumberInput = "//input[@id='ccNbr']"
const stationsCVVInput = "//input[@name='ccCVV']"
const stationsExpirationInput = "//input[@placeholder='MM/YY']"
const stationsPostalCodeInput = "//input[@name='zip5']"
const saveAndRedisplayButton = "//button[contains(@class,'cart-footer-main-button btn btn-primary btn-block')]"
const stationsCarryOnBagsSelected = "(//td[contains(@class,'pnr-travelerCarryOnBags')]/a)[X]"
const stationsCheckedBagsSelected = "(//td[contains(@class,'travelerCheckedBag')]//div//a//span)[X]"
const stationsEmailAddress = "//div[@class='pnr-emailAddress']"
const stationsFlightLocations = "//div[@class='h4 flight-locations col']//a[1]"
const stationsPassengerTotal = "(//button[contains(@id,'passenger-detail-update')])[X]"
const stationsFlightNumber = "//div[@class='h4 text-center flight-number col']//a[1]"
const CCModBundleItems = "//div[@class='table-responsive']//tbody//tr//td[1]"
const bundleItemsNetPrice = "(//span[@class='bundle-item-price text-success'])[X]"
const bundlesTab = "//a[@class='accordion-toggle collapsed'][normalize-space(.)='Bundle']"
const roundTrip = "//small[normalize-space(text())='ROUND TRIP']"
const getBundleType = "//div[@class='col-lg-12']//strong[contains(text(),'Bundle')]"
const expireMonthDropDown = "[id='payment-expire-month']"
const expireYearDropDown = "[id='payment-expire-year']"
const transactionTypeSelection = "//span[@class='col-xs-4']//select[@class='form-control ng-pristine ng-untouched ng-valid']"
const orderReference = "//option[contains(text(),'Order Reference #')]"
const itineraryInput = "[placeholder='Enter Itinerary #, Order # or reference #']"
const searchButtonInSVT = "[class='btn btn-primary btn-lg']"
const transactionSearchHeading = "//h2[contains(text(),'Transaction Search')]"
const totalAmount = "(//td[@class='text-right text-nowrap ng-binding'][@ng-bind='item.amount.total | g4money'])"
const hotelTitle = "//*[@id='collapseHotels']/div/div/div/div[1]/address/strong"
const hotelRoom = "//*[@id='collapseHotels']/div/div/div/div[2]/table/tbody/tr/td[1]"
const roomCount = "//*[@id='collapseHotels']/div/div/div/div[2]/table/tbody/tr/td[3]"
const totalNights = "//*[@id='collapseHotels']/div/div/div/div[2]/table/tbody/tr/td[4]"
const checkInDate = "//*[@id='collapseHotels']/div/div/div/div[2]/table/tbody/tr/td[5]"
const checkOutDate = "//*[@id='collapseHotels']/div/div/div/div[2]/table/tbody/tr/td[6]"
const totalPrice = "//*[@id='collapseHotels']/div/div/div/div[2]/table/tbody/tr/td[7]"
const carRentalMenu = "//*[@id='accordion']/div[3]/div[1]/h4/a"
const carRentalsname = "//*[@id='accordion']//div[@class='panel panel-default panel-vehicles']"
// const hotelsMenu="//*[@id='accordion']/div[4]/div[1]"
const hotelsMenu = "//a[@href='#collapseHotels']"
// const hotelsMenu="//*[@id='accordion']/div[4]/div[1]"
const balanceAmountTripSummary = ".//table[@class='table table-condensed']//td[.='Balance']/following-sibling::td";
const stadiumProductLabelOnProductsPanel = ".//div[@class='panel panel-default panel-products']//h4//small";
const oneWayRadioLandingPage = "[data-hook='flight-search-trip-type_ONEWAY']";

const g4UserName = "#username"
const g4Password = "#password"
const g4Submit = "//input[@name='submitBtn']"

const paymentTab = "//a[@data-show='transactions']";
const reversal = "//a[@class='btn btn-xs btn-default btn-reverse-transactions']";
const reasonDropdown = "//select[@id='overrideReason']";
const noShowRestore = "//option[@value='38']";
const applyReverse = "//button[@class='btn btn-primary btn-save']";
const applyReverseContinue = "//button[@class='btn btn-primary btn-confirm']";
const refundPayment = "//button[@class='btn btn-default btn-xs btn-reverse-payment']";
const additionalOptions = "//a[@class='dropdown-toggle btn btn-default btn-xs']//i[@class='fa fa-cogs']";
const cancelItinerary = "//li//a[@class='btn-cancel-itinerary']";
const continueCancel = "//button[@class='btn btn-primary dropdown-toggle']";
const policyOverrideCancel = "//a[@class='btn-confirm-secondary text-left']";
const cancelReason = "//select[@id='cancelReason']";
const cancelReasonTestSupport = "(//option[@value='8'])[2]";
const cancelOverrideReason = "//select[@class='form-control override-reason']//option[1]";
const cancelOverrideReasonTestSupport = "(//option[@value='25'])[2]";
const cancelReceivedFrom = "//input[@id='receivedFrom']";
const cancelSubmitButton = "//button[@class='btn btn-danger btn-cancel-itn']";
const refundButton = "//button[@class='btn btn-danger btn-reverse-payment']";
const refundPaymentComment = "//input[@id='comment']";
const cancelConfirmation = "//span[@class='text-danger']";
const refundedAmount = "(//td[@class='amount'])[1]";
const amountPaid = "(//td[@class='amount'])[2]";
const balanceAmount = "(//td[@class='amount'])[3]";
const checkbox = "//*[contains(@class,'input-misc-fee chk-reverse-all chk-select-all')]";
const cancelCheckbox = "//input[@class='btn-waive-cancel-fee']";
// const waiveFeeReason="(//option[@value='25'])[1]";
// const waiveFeeReason = "//option[text()='Test Support']"
const stationsUncheckinButton = "(//button[@class='p-0 btn btn-link'])[2]";
const stationsCheckinButton = "(//div[@class='d-inline-block'])[3]";
const carRentalsText = "//a[@class='accordion-toggle collapsed'][normalize-space(.)='Car Rentals']";
const carCompanyName = "//thead//tr//th[contains(text(),'Company')]";
const carVehicleType = "//thead//tr//th[contains(text(),'Vehicle Type')]";
const carpickupDate = "//thead//tr//th[contains(text(),'Pickup')]";
const cardropDate = "//thead//tr//th[contains(text(),'Return')]";
const cartotalprice = "(//thead//tr//th[contains(text(),'Total')])[2]";
const balanceDollar = "(//td[text()='Balance']/following::td)[1]"
const guestLogin = "//a[contains(text(),'Guest Login')]"
class ConfirmationPage {

	async navigateToG4portal() {
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
		}
		else {
			await browser.maximizeWindow()
			await browser.deleteAllCookies()
			// await browser.url((await this.urlBuilder())[0]);
			// await browser.url((await this.urlBuilder())[1]);
			await actions.openWebsite((await this.urlBuilder())[0])
			await actions.openWebsite((await this.urlBuilder())[1])
		}
	}

	async urlBuilder() {
		await homePage.getEnvironmentValue()
		var env = process.env.ENV
		console.log("env: ", env)
		let g4url
		let g4PortalToken
		let envCheck = env;
		if (env.includes('okd') && (!env.includes('nexusg4'))&&(!env.includes('custjny'))) {
			var envURL = env.split('-')[1].split('.')[0]
			var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
			g4url = 'https://g4plus-portal' + env + '.usw2.aws.allegiantair.com/portal'
			g4PortalToken = 'https://g4plus-res' + env + '.usw2.aws.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
			if (envCheck.includes('viva') || envCheck.includes('post')||envCheck.includes('nexus')) {
				g4url = 'https://g4plus-portal-' + envURL + '.okd.allegiantair.com/portal'
				g4PortalToken = 'https://g4plus-res-' + envURL + '.okd.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'

			}
			console.log("URL: ", g4url)
			console.log("TOKEN: ", g4PortalToken)
		}
		else if(env.includes('okd') && (env.includes('custjny'))){
			var envURL = env.split('-')[1].split('.')[0]
			console.log("-------envURL------",envURL)
			g4url = 'https://g4plus-portal' + env + '.allegiantair.com/portal'
			console.log("URL: ", g4url)
			g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
			console.log("TOKEN: ", g4PortalToken)
		}
		else {
			// var envURL = env.split('.')[1]
			// var env = envURL
			g4url = 'https://g4plus-portal' + env + '.allegiantair.com/portal'
			console.log("URL: ", g4url)
			g4PortalToken = 'https://g4plus-res' + env + '.allegiantair.com/test/token?aisId=09742&roles=ops_fee_management,ops_flight_operations,ops_flight_operations_manager,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ota_loyalty_tech%20_admin,ota_loyalty_admin,OPS_FMM,OPS_FMM_OCC_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding'
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
		await browser.switchWindow('AAY FMM')
		console.log("switched to fmm page")
		await actions.pause(10000);
		await actions.waitForDisplayed(fmmFlight, 'fmmFlight', 10000)
		var Flightno = await $$(fmmFlight)
		console.log("Availableflights: " + Flightno.length);
		assert.isTrue(
			await actions.isDisplayed(fmmFlight, "fmm Flights checking"),
            'Validation Failed : flights are not available');
		// await browser.pause(10000)
	}
	
	async selecttabFromG4Portal(app) {
		if (app === 'BOOK') {
			await actions.clickElement('click', BOOK, 'BOOK Button')
		}
	}
	async retrieveBookedItinerary() {
		console.log("Opening window")
		await browser.switchWindow('Search');
		console.log("window opened")
		// await $(confirmationInputField).setValue(process.env.confirmationNumber);
		// //await $(confirmationInputField).setValue("BLNM4Y");
		// await $(searchButton).click()
		await actions.setInputField('setValue', process.env.confirmationNumber, confirmationInputField, 'confirmation inputfield')
		await actions.clickElement('click', searchButton, 'submit button')
		try {
			await actions.clickElement('click', viewButton, 'view button')
		}
		catch (ex) {

		}
		console.log(">>>>>ITN RETRIVED<<<<<")
	}
	async retrieveCCBookedItinerary() {
		console.log("retrieveCCBookedItinerary")
		var ccITN = process.env.confirmationNumber
		console.log("ITN: ", ccITN)
		await actions.pause(15000)
		await browser.switchWindow('Search – Bookings');
		await actions.pause(4000)
		await $(confirmationInputField).setValue(ccITN);
		await $(searchButton).click()
		await actions.pause(5000)
		try {
			await $(viewButton).click()
			await $(viewButton).click()
		}
		catch (ex) {
		}
		console.log("done with retrieveCCBookedItinerary")
	}
	async retrieveBookedItineraryStations() {
		try {
			await actions.pause(10000)
			await browser.switchWindow('Check In: Stations Dashboard');
			await $(stationsSearchButton).click();
			await actions.pause(4000)
			await $(stationsConfirmationInputField).setValue(itinerary);
			//await $(stationsConfirmationInputField).setValue("BX9948");
			await actions.pause(4000)
			await $(stationsSubmitButton).scrollIntoView()
			await $(stationsSubmitButton).click()
			await actions.pause(10000)
		} catch (error) {
			assert.fail("Unable to retrive the ITN, Kindly refer screenshot or check it manually")
		}
	}

	async validateSSRCCMod(ssr, traveler) {
		await actions.pause(2000)
		if (traveler === 'Lap Infant') {
			assert.equal(
				await $(lapChildSSRDisplayed).getText(),
				ssr,
				'Validation Failed: Lap infant SSR not displayed!'
			);
		}
		if (traveler === 'Child') {
			assert.equal(
				await $(childSSRDisplayed).getText(),
				ssr,
				'Validation Failed: Child SSR not displayed!'
			);
		}
		if (traveler === 'Infant in Seat') {
			assert.equal(
				await $(infantInSeatSSRDisplayed).getText(),
				ssr,
				'Validation Failed: Infant in Seat SSR not displayed!'
			);
		}
	}

	async validateBundleItemPriceCCMod(bundleType) {
		await $(bundlesTab).waitForDisplayed()
		await $(bundlesTab).scrollIntoView()
		await actions.pause(1000)
		await $(bundlesTab).click()
		await actions.pause(500)
		var wwwbundleItems = bundleItems
		for (var i = 0; i < wwwbundleItems.length; i++) {
			wwwbundleItems[i] = wwwbundleItems[i]
				.replace("onepersonal_item", "One personal item")
				.replace("carryon", "Carry-On")
				.replace("seatselection", "Seat Selection")
				.replace("tripflex", "Trip Flex")
				.replace("priorityaccess", "Priority Access")
		}
		if (wwwbundleItems.includes('checked_bag') || wwwbundleItems.includes('checkedbag') || wwwbundleItems.includes('echecked_bag')) {
			var checked = wwwbundleItems.indexOf('echecked_bag')
			if (checked < 0) {
				checked = wwwbundleItems.indexOf('checked')
			}
			if (checked < 0) {
				checked = wwwbundleItems.indexOf('checkedbag')
			}
			wwwbundleItems.splice(checked, 1, 'Checked');
		}

		var CCModBundle = await browser.$$(CCModBundleItems)
		for (var i = 0; i < CCModBundle.length; i++) {
			console.log(await CCModBundle[i].getText())
		}
		await actions.pause(500)
		var CCBundleItems = []
		for (var i = 0; i < CCModBundle.length; i++) {
			CCBundleItems.push(await CCModBundle[i].getText())
		}
		CCBundleItems = CCBundleItems.sort()
		wwwbundleItems = wwwbundleItems.sort()
		for (var i = 0; i < bundleItems.length; i++) {
			var includes = wwwbundleItems.includes(CCBundleItems[i]);
			assert.equal(
				includes,
				true,
				'Validation Failed: Mismatch in bundle items, array: ' + wwwbundleItems + ' item not found: ' + CCBundleItems[i]
			)
		}
		var expectedPrice = 0.0
		for (var i = 1; i <= bundleItems.length; i++) {
			expectedPrice = expectedPrice + parseFloat((await $(bundleItemsNetPrice.replace("X", i)).getText()).split('await $')[1])
		}
		if (await $(roundTrip).isDisplayed()) {
			expectedPrice = expectedPrice * 2
		}
		assert.equal(
			Number(bundlePrice).toFixed(2),
			Number(expectedPrice).toFixed(2),
			'Validation Failed: Mismatch in bundles price'
		);
		assert.equal(
			await $(getBundleType).getText(),
			bundleType,
			'Validation Failed: Mismatch in bundles price'
		);
		do {
			bundleItems.pop()
		} while (bundleItems.length > 0)
		do {
			CCBundleItems.pop()
		} while (CCBundleItems.length > 0)
		do {
			wwwbundleItems.pop()
		} while (wwwbundleItems.length > 0)
	}

	async selectAcceptAndContinueButton() {
		await actions.pause(6000);
		await $(acceptAndContinue).isDisplayed();
		await $(acceptAndContinue).click();
		await actions.pause(5000);
	}

	async enterPaymentDetails() {
		await actions.pause(5000);
		await $(cardNumberInput).waitForClickable()
		await $(cardNumberInput).click()
		const cardNumArray = ["5112345112345114", "5111005111051128", "4112344112344113", "4000229999218008", "6011016011016011", "6011055039379233", "3566003566003566"];
		const random = Math.floor(Math.random() * cardNumArray.length);
		const value = cardNumArray[random];
		const strLen = value.split('');
		for (let i = 0; i < value.length; i++) {
			await $(cardNumberInput).addValue(strLen[i]);
		}
		await $(expireMonthDropDown).selectByAttribute('value', '12');
		await actions.pause(200);
		await $(expireYearDropDown).selectByAttribute('value', '30');
		await actions.pause(200);
		//await $(cardNumberInput).setValue('5454545454545454');
		await $(cvvInput).setValue('737');
		await $(addressInput).setValue('Test Address');
		await $(cityInput).setValue('Albany');
		await $(stateInput).setValue('NV');
		await $(zipInput).setValue('12345');
		await actions.pause(5000);
		await $(addPaymentButton).click();
	}

	async enterPaymentDetailsInStations() {
		await actions.pause(5000);
		await $(stationsNameInput).setValue('QA Automation');
		await $(stationsCardNumberInput).setValue('5454545454545454');
		await $(stationsCVVInput).setValue('123');
		await $(stationsExpirationInput).setValue('12/25');
		await $(stationsPostalCodeInput).setValue('12345');
		await actions.pause(5000);
		await $(addPaymentButton).waitForClickable()
		await $(addPaymentButton).click();
	}

	async selectSaveAndRedisplayButtonInStations() {
		await actions.pause(6000);
		await $(saveAndRedisplayButton).isClickable();
		await $(saveAndRedisplayButton).click();
		await actions.pause(8000);
	}

	async enterReceivedFrom() {
		await actions.pause(5000);
		await $(receivedFrom).setValue('QA');
		await browser.keys(['Tab']);

	}

	async clickSubmit() {
		await actions.pause(1000);
		await $(submitButton).isDisplayed();
		await $(submitButton).click();
	}

	async navigateToG4Fmm() {
		await homePage.getEnvironmentValue()
		if (process.env.ENV.includes("prod")) {
			console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
			await browser.maximizeWindow()
			await browser.deleteAllCookies()
			await actions.openWebsite("https://g4plus-portal.allegiantair.com");
			await actions.pause(1000)
			await actions.setInputField('setValue', process.env.username, g4UserName, 'g4UserName')
			await actions.setInputField('setValue', process.env.password, g4Password, 'g4Password')
			await actions.clickElement('click', g4Submit, 'g4Submit')
		}else if(process.env.ENV.includes("prd")){
			console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
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
			await actions.deleteAllCookies()
			await actions.openWebsite((await this.urlBuilderFmm())[0]);
			await actions.pause(1000)
			await actions.openWebsite((await this.urlBuilderFmm())[1])
		}
	}

	async urlBuilderFmm() {
		await homePage.getEnvironmentValue()
		var getEnv = process.env.ENV
		let g4url
		let g4PortalToken
		if (getEnv.includes('okd') && (!(getEnv.includes('nexusg4')))) {
			var envURL = getEnv.split('-')[1].split('.')[0]
			var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
			g4url = 'https://g4plus-portal-' + envURL + '.okd.allegiantair.com/portal'
			g4PortalToken = 'https://g4plus-res-' + envURL + '.okd.allegiantair.com/test/token?roles=OPS_FMM'
		}else {
			// let envURL = getEnv.split('.')[1]
			let env = envURL
			g4url = 'https://g4plus-portal' + getEnv + '.allegiantair.com/portal'
			console.log("g4url: ", g4url)
			g4PortalToken ='https://g4plus-res' + getEnv +'.allegiantair.com/test/token?roles=OPS_FMM,FMM_OCC_MGR,OPS_FMM_OCC_SUPER_USER,FMM_STATION_SUPER_USER,station_agent,ops_stations,ops_stations_checkin,ops_stations_cass,ops_stations_boarding,fmm_station_super_user,res_customer,res_booking,res_booking_agent,res_booking_waiver,res_booking_override,res_booking_manager,call_center_agent,ops_airline_bags,ops_airline_pb,ops_airline_seats,ops_eswap,res_airline_reaccom,ota_vehicle,ota_trip_flex,ota_payments,ota_surcharge,ota_surcharge_accounting,ota_surcharge_revenue,ota_hotel,ota_hotel_revenue,ota_hotel_inventory,ota_hotel_inventory_manager,ota_shows,ota_shows_inventory,ota_shows_revenue,ota_accounting,ota_accounting_invoicing,ota_accounting_atl,ota_accounting_invoicing_suspended_managers,ota_accounting_invoicing_suspended_coordinators,ops_fee_management,ops_flight_operations,ops_flight_operations_manager,ota_flights,ota_flights_inventory,ota_flights_revenue,ssim_user,ssim_admin,ais_air_only,ais_bk_non_rev_standby,ais_bk_non_rev_standby_svc_provider,ais_bk_nrps,ais_bk_pilot_jump_seat'
			console.log("g4PortalToken: ", g4PortalToken)
		}
		return [g4PortalToken, g4url]
	}

	// async clickConfirmAndRedisplay() {
	// 	console.log("Verifing1")
	// 	await actions.pause(15000);
	// 	await actions.waitForDisplayed(confirmAndRedisplay,'confirmAndRedisplay button')
	// 	await $(confirmAndRedisplay).waitForClickable(5000);
	// 	await $(confirmAndRedisplay).click();
	// 	await actions.pause(10000);
	// 	console.log("Verifing2")
	// }

	async validateTripType(tripType, type) {
		await actions.pause(2000)
		if (tripType === 'oneway') {
			assert.equal(
				(await $(tripTypeOneway).getText()).split('Y')[0].replace("ONE-WA", "ONE-WAY"),
				type,
				'Validation Failed: Trip type not displayed!'
			);
		}
		if (tripType === 'roundTrip') {
			assert.equal(
				(await $(tripTypeRoundtrip).getText()).split('P')[0].replace("ROUND TRI", "ROUND TRIP"),
				type,
				'Validation Failed: Trip type not displayed!'
			);
		}
	}

	async validateTripSummary(details) {
		await actions.pause(2000)
		if (details === 'Flights') {
			/*assert.equal(
				await $(flightsFee).getText().split('await $')[1].replace("\nOverride Fare", "").replace(",", ""),
				bundlePageCollector.get('flightFareSubTotalWithoutTax'),
				'Validation Failed: flightFareWithoutTax not displayed!'
			);*/
		}
		if (details === 'Taxes & Govt Fees') {
			console.log("Govt Fees is " + (await $(taxesGovtFee).getText()).split('await $')[1].replace("await $", ""));
			// assert.equal(
			// 	await $(taxesGovtFee).getText().split('await $')[1].replace("await $",""),
			// 	bundlePageCollector.get('governmentTaxesAndFees'),
			// 	'Validation Failed: governmentTaxesAndFees not displayed!'
			// );
		}
		/*if (details === 'Carrier Usage Charge') {
			assert.equal(
				await $(carrierUsageCharge).getText().split('await $')[1],
				bundlePageCollector.get('carrierUsageCharge'),
				'Validation Failed: carrierUsageCharge not displayed!'
			);
		}*/
		if (details === 'Departure Date') {
			assert.equal(
				await $(depDate).isDisplayed(),
				true,
				'Validation Failed: departDate not displayed!'
			);
		}
		if (details === 'Departure City') {
			assert.equal(
				await $(depCity).getText(),
				flightPageCollector.get('departureCity'),
				'Validation Failed: departureCity not displayed!'
			);
		}
		if (details === 'Destination City') {
			assert.equal(
				await $(retCity).getText(),
				flightPageCollector.get('destinationCity'),
				'Validation Failed: destinationCity not displayed!'
			);
		}
	}

	async validatePaxCount() {
		assert.equal(
			(await $(paxCount).getText()).split(' ')[0],
			flightPageCollector.get('paxCount'),
			'Validation Failed: paxCount not displayed!'
		);
	}

	async validatePriorityAccess(text, paxNum, segment) {
		await actions.pause(2000)
		if (segment === "departing") {
			assert.equal(
				await $(priorityAccessSelectedSeg1.replace("X", paxNum)).getText(),
				text,
				'Validation Failed: Departing Segment Priority Access not displayed!'
			);
		}
		if (segment === "returning") {
			assert.equal(
				await $(priorityAccessSelectedSeg2.replace("X", paxNum)).getText(),
				text,
				'Validation Failed: Returning Segment Priority Access not displayed!'
			);
		}
	}

	async selectCarryOnBags(paxNum, segment) {
		await $(confirmationHeading).waitForDisplayed();
		await $(priorityAccess).click();
		await actions.pause(5000)
		if (segment === "both") {
			await $(carryOnBagsSelection.replace("X", paxNum).replace("Y", 1)).click()
			await browser.keys(['ArrowDown', 'Enter']);
			await $(carryOnBagsSelection.replace("X", paxNum).replace("Y", 2)).click()
			await browser.keys(['ArrowDown', 'Enter']);
			await actions.pause(10000)
			await $(doneButton).click();
		}
		if (segment === "departing") {
			await $(carryOnBagsSelection.replace("X", paxNum).replace("Y", 1)).click()
			await browser.keys(['ArrowDown', 'Enter']);
			await actions.pause(10000)
			await $(doneButton).click();
		}
		if (segment === "returning") {
			await $(carryOnBagsSelection.replace("X", paxNum).replace("Y", 2)).click()
			await browser.keys(['ArrowDown', 'Enter']);
			await actions.pause(10000)
			await $(doneButton).click();
		}
	}

	async selectCheckedBags(checked, paxNum, segment) {
		await $(confirmationHeading).waitForDisplayed({ timeout: 40000 });
		await $(priorityAccess).click();
		await actions.pause(5000)
		if (segment === "both") {
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 1)).scrollIntoView()
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 1)).waitForClickable({ timeout: 40000 });
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 1)).click()
			for (var i = 0; i < parseInt(checked.split(' ')[0]); i++) {
				await browser.keys(['ArrowDown']);
				await browser.keys(['Enter']);
			}
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 2)).scrollIntoView()
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 2)).waitForClickable({ timeout: 40000 });
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 2)).click()
			for (var i = 0; i < parseInt(checked.split(' ')[0]); i++) {
				await browser.keys(['ArrowDown']);
			}
			await browser.keys(['Enter']);
			await actions.pause(10000)
			await $(doneButton).waitForClickable({ timeout: 40000 });
			await $(doneButton).click();
		}
		if (segment === "departing") {
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 1)).click()
			for (var i = 0; i < parseInt(checked.split(' ')[0]); i++) {
				await browser.keys(['ArrowDown']);
			}
			await browser.keys(['Enter']);
			await actions.pause(10000)
			await $(doneButton).waitForClickable({ timeout: 40000 });
			await $(doneButton).click();
		}
		if (segment === "returning") {
			await $(checkedBagsSelection.replace("X", paxNum).replace("Y", 2)).click()
			for (var i = 0; i < parseInt(checked.split(' ')[0]); i++) {
				await browser.keys(['ArrowDown']);
			}
			await browser.keys(['Enter']);
			await actions.pause(10000)
			await $(doneButton).waitForClickable({ timeout: 40000 });
			await $(doneButton).click();
		}
	}

	async selectPriorityAccess(paxNum, segment) {
		await $(confirmationHeading).waitForDisplayed();
		await $(priorityAccess).click();
		await actions.pause(5000)
		if (segment === "both") {
			await $(priorityAccessSelection.replace("X", paxNum).replace("Y", 1)).click()
			await browser.keys(['ArrowUp', 'Enter']);
			await $(priorityAccessSelection.replace("X", paxNum).replace("Y", 2)).click()
			await browser.keys(['ArrowUp', 'Enter']);
			await actions.pause(10000)
			await $(doneButton).click();
		}
		if (segment === "departing") {
			await $(priorityAccessSelection.replace("X", paxNum).replace("Y", 1)).click()
			await browser.keys(['ArrowUp', 'Enter']);
			await actions.pause(10000)
			await $(doneButton).click();
		}
		if (segment === "returning") {
			await $(priorityAccessSelection.replace("X", paxNum).replace("Y", 2)).click()
			await browser.keys(['ArrowUp', 'Enter']);
			await actions.pause(10000)
			await $(doneButton).click();
		}
	}

	async validateCarryOnBags(text, paxNum, segment) {
		await actions.pause(2000)
		if (segment === "departing") {
			assert.equal(
				await $(carryOnBagsSelectedSeg1.replace("X", paxNum)).getText(),
				text,
				'Validation Failed: Departing Segment Carryon Bags not displayed!'
			);
		}
		if (segment === "returning") {
			assert.equal(
				await $(carryOnBagsSelectedSeg2.replace("X", paxNum)).getText(),
				text,
				'Validation Failed: Returning Segment Carryon Bags not displayed!'
			);
		}
	}

	async validateCheckedBags(text, paxNum, segment) {
		await actions.pause(2000)

		if (segment === "departing") {
			assert.equal(
				await $(checkedBagsSelectedSeg1.replace("X", paxNum)).getText(),
				text,
				'Validation Failed: Departing Segment Carryon Bags not displayed!'
			);
		}
		if (segment === "returning") {
			assert.equal(
				await $(checkedBagsSelectedSeg2.replace("X", paxNum)).getText(),
				text,
				'Validation Failed: Returning Segment Carryon Bags not displayed!'
			);
		}
	}

	async selectCarryOnBagInStations(paxNum) {
		await $(stationsCarryOnBagManage).waitForDisplayed();
		await $(stationsCarryOnBagManage).click();
		await actions.pause(7000)
		await $(stationsCarryOnBagIncrement.replace("X", paxNum)).click()
		await actions.pause(10000)
	}
	async selectCheckedBagInStations(checkedCount, paxNum) {
		await $(stationsCheckedBagManage.replace("X", paxNum)).waitForDisplayed();
		await $(stationsCheckedBagManage.replace("X", paxNum)).click();
		await actions.pause(7000)
		var count = 0;
		while (Number(count) < Number(checkedCount)) {
			await $(stationsCheckedBagIncrement.replace("X", paxNum)).click()
			count++
		}

		await actions.pause(10000)
	}
	async validateCarryOnBagsInStations(text, paxNum) {
		await actions.pause(2000)
		assert.equal(
			await $(stationsCarryOnBagsSelected.replace("X", paxNum)).getText(),
			text,
			'Validation Failed: Departing Segment Carryon Bags not displayed!'
		);
	}
	async validateCheckBagsInStations(count, paxNum) {
		await actions.pause(5000)
		await $(stationsCheckedBagsSelected.replace("X", paxNum)).waitForDisplayed()
		assert.equal(
			(await $(stationsCheckedBagsSelected.replace("X", paxNum)).getText()).replace(/\//g, "").replace("0", ""),
			count,
			'Validation Failed: Departing Segment Checked Bags not displayed!'
		);
	}
	async validateItnDetailsInStations(details) {
		await actions.pause(2000)
		if (details === 'Flight Number') {
			assert.equal(
				(await $(stationsFlightNumber).getText()).replace("#", ""),
				flightPageCollector.get('departFlightNum'),
				'Validation Failed: departFlightNum not displayed!'
			);
		}
		if (details === 'Departure City') {
			assert.equal(
				(await $(stationsFlightLocations).getText()).split(' ')[0],
				flightPageCollector.get('departureCity'),
				'Validation Failed: departureCity not displayed!'
			);
		}
		if (details === 'Destination City') {
			assert.equal(
				(await $(stationsFlightLocations).getText()).split(' ')[2],
				await flightPageCollector.get('destinationCity'),
				'Validation Failed: destinationCity not displayed!'
			);
		}
	}
	async validatePaxTotalInStations(paxTotal) {
		assert.equal(
			await $(stationsPassengerTotal.replace("X", paxTotal)).isDisplayed(),
			true,
			'Validation Failed: paxCount mismatch!'
		);
	}

	async transactionTypeSelectionInSVT() {
		await actions.pause(5000)
		await browser.switchWindow('Payments : Transactions : Search');
		await $(transactionSearchHeading).isDisplayed()
		await $(transactionTypeSelection).click();
		await actions.pause(1000)
		await $(orderReference).click();
	}

	async retrieveItineraryInSVT() {
		await actions.pause(1000)
		await $(itineraryInput).setValue(itinerary);
		await $(searchButtonInSVT).click()
		await actions.pause(5000)
	}

	async validatePaymentDetailsInSVT() {
		assert.equal(
			(await $(totalAmount).getText()).replace(",", ""),
			TotalFareAmount,
			'Validation Failed: Total amount mismatch!'
		);
	}

	async validateHotelName() {
		try {
			assert.equal(
				await $(hotelTitle).getText(),
				hotelsDetailsPageCollector.get('hoteldetailsPageName'),
				'Validation Failed: hotel title is not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(hotelTitle).isDisplayed()) {
				console.log("Hotel Name : " + (await $(hotelTitle).getText()));
			} else {
				console.log("Hotel Name not Displayed");
			}
		}
	}

	async validateRoomType() {
		try {
			assert.equal(
				await $(hotelRoom).getText(),
				hotelsDetailsPageCollector.get('hoteldetailsPageRoom'),
				'Validation Failed: hotel room not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(hotelRoom).isDisplayed()) {
				console.log("Room Type : " + (await $(hotelRoom).getText()));
			} else {
				console.log("Room Type Not Displayed");
			}
		}
	}

	async validateCheckInDate() {
		try {
			assert.equal(
				(await $(checkInDate).getText()).slice(4),
				hotelsPageCollector.get('checkInDate'),
				'Validation Failed: CheckIn date not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(checkInDate).isDisplayed()) {
				console.log("Hotel Checkin Date : " + (await $(checkInDate).getText()).slice(4));
			} else {
				console.log("Hotel Checkin Date Not Displayed");
			}
		}
	}

	async validateCheckOutDate() {
		try {
			assert.equal(
				(await $(checkOutDate).getText()).slice(4),
				hotelsPageCollector.get('checkOutDate'),
				'Validation Failed: CheckOut date not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(checkOutDate).isDisplayed()) {
				console.log("Hotel Checkout Date : " + (await $(checkOutDate).getText()).slice(4));
			} else {
				console.log("Hotel Checkout Date Not Displayed");
			}
		}
	}

	async validateRoomCount() {
		try {
			assert.equal(
				await $(roomCount).getText(),
				hotelsPageCollector.get('noOfRooms'),
				'Validation Failed: Room count not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(roomCount).isDisplayed()) {
				console.log("Hotel roomCount : " + (await $(roomCount).getText()));
			} else {
				console.log("Hotel roomCount Not Displayed");
			}
		}
	}

	async validateNightCount() {
		try {
			assert.equal(
				await $(totalNights).getText(),
				hotelsPageCollector.get('noOfNights'),
				'Validation Failed: Total nights not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(totalNights).isDisplayed()) {
				console.log("Room TotalNights Stay : " + (await $(totalNights).getText()));
			} else {
				console.log("Room TotalNights Stay Not Displayed");
			}
		}
	}

	async validateTotalPrice() {
		try {
			assert.equal(
				await $(totalPrice).getText(),
				hotelsDetailsPageCollector.get('hoteldetailsPagePrice'),
				'Validation Failed: Hotels Price not displayed!'
			);
		}
		catch {
			await actions.pause(1000);
			if (await $(totalPrice).isDisplayed()) {
				console.log("Hotel Stay TotalPrice : " + (await $(totalPrice).getText()));
			} else {
				console.log("Hotel Stay TotalPrice Not Displayed");
			}
		}
	}

	async clickHotelsMenu() {
		await actions.pause(3000);
		await $(carRentalsname).scrollIntoView();
		await actions.pause(2000);
		if (await $(hotelsMenu).isDisplayed()) {
			await $(hotelsMenu).click();
			console.log("Hotels Menu Clicked");
		} else {
			console.log("Hotels Menu Not Displayed");
		}
		// this.clickElement(hotelsMenu);
	}

	async clickCarRentalMenu() {
		// await this.clickElement(carRentalMenu);
		await actions.clickElement('click', carRentalMenu, '')
	}
	async clickPaymentTab() {
		await this.clickElement(paymentTab);
	}
	async clickReversal() {
		await this.clickElement(reversal);
		await actions.pause(3000)
	}
	async clickReversalCheckbox() {
		console.log(">>>>>>>>>>>>>>>>>>>>    :  " + (await $$(checkbox)).length)
		var checkboxLength = (await $$(checkbox)).length;
		var checkboxs = await $$(checkbox);
		for (var i = 0; i < checkboxLength; i++) {
			await checkboxs[i].click();
		}
	}

	async clickReasonDropdown() {
		await this.clickElement(reasonDropdown);
	}
	async clickNoShowRestore() {
		await this.clickElement(noShowRestore);
	}
	async clickApplyReverse() {
		await this.clickElement(applyReverse);
	}
	async clickApplyReverseContinue() {
		await this.clickElement(applyReverseContinue);
	}
	async RefundPayment() {
		await this.clickElement(refundPayment);
	}
	async RefundPaymentComment() {
		await this.clickElement(refundPaymentComment);
		await $(refundPaymentComment).setValue('Test');
	}
	async clickRefundButton() {
		await this.clickElement(refundButton);
	}
	async clickAdditionalOptions() {
		try {
			await actions.clickElement('click', additionalOptions, 'AdditionalOptions Button')
			console.log(">>>>>additionalOptions CLICKED<<<<<")
		} catch (Ex) {
			assert.fail("Unable to click additionalOptions")
		}
	}
	async clickCancelItinerary() {
		try {
			await actions.clickElement('click', cancelItinerary, 'CancelItinerary button')
			console.log(">>>>>cancelItinerary CLICKED<<<<<")
		} catch (Ex) {
			assert.fail("Unable to click cancelItinerary")
		}

	}
	async clickContinueCancel() {
		await actions.pause(3000);
		try {
			// await this.clickElement(continueCancel);
			await actions.clickElement('click', continueCancel, 'ContinueCancel button')
			console.log(">>>>>continueCancel CLICKED<<<<<")
		} catch (Ex) {
			assert.fail("Unable to click continueCancel")
		}
	}
	async clickPolicyOverrideCancel() {
		await actions.pause(3000);
		try {
			// await this.clickElement(policyOverrideCancel);
			await actions.clickElement('click', policyOverrideCancel, 'policyOverrideCancel button')
			console.log(">>>>>policyOverrideCancel CLICKED<<<<<")
		} catch (Ex) {
			assert.fail("Unable to click policyOverrideCancel")
		}
	}
	async clickCancelCheckbox() {
		await actions.pause(3000);
		try {
			// await this.clickElement(cancelCheckbox);
			await actions.clickElement('click', cancelCheckbox, 'cancelCheckbox button')
			console.log(">>>>>cancelCheckbox CLICKED<<<<<")
		} catch (Ex) {
			assert.fail("Unable to click cancelCheckbox")
		}
	}
	async clickWaiveFeeReason() {
		await actions.pause(3000);
		try {
			// await this.clickElement(waiveFeeReason);
			// await actions.clickElement('click',waiveFeeReason,'waiveFeeReason button')
			console.log("checking the dropdown value")
			await actions.waitForDisplayed(waiveFeeReason, "TEST SUPPORT OPTION")
			await actions.waitForClickable(waiveFeeReason, "TEST SUPPORT OPTION")
			await actions.clickElement('click', waiveFeeReason, 'waiveFeeReason button')
			// await $(waiveFeeReason).click()
			await actions.pause(5000);
			console.log(">>>>>waiveFeeReason CLICKED<<<<<")
		} catch (Ex) {
			console.log("why u r directly entering into the catch")
			assert.fail("Unable to click waiveFeeReason option")
		}
	}
	async clickCancelReason() {
		await actions.scroll(cancelReason,'cancelReason')
		await actions.clickElement('click', cancelReason, 'cancelReason button')
		console.log(">>>>>cancelReason CLICKED<<<<<")
	}
	async clickCancelReasonTestSupport() {
		await actions.clickElement('click', cancelReasonTestSupport, 'cancelReasonTestSupport button')
		console.log(">>>>>cancelReasonTestSupport CLICKED<<<<<")
	}
	async clickCancelOverrideReason() {
		await actions.pause(3000);
		let cor = await $$(cancelOverrideReason)
		if (cor.length != 0) {
			try {
				//this.clickElement(cancelOverrideReason);
				await $(cancelOverrideReason).click();
				console.log(">>>>>cancelOverrideReason CLICKED<<<<<")
			} catch (EX) {
				console.log(">>>>>cancelOverrideReason isn't CLICKED<<<<<")
			}
		}
	}

	async clickcancelOverrideReasonTestSupport() {
		await actions.pause(5000);
		let cort = await $$(cancelOverrideReasonTestSupport)
		if (cort.length != 0) {
			try {
				//this.clickElement(cancelOverrideReasonTestSupport);
				await $(cancelOverrideReasonTestSupport).click();
				console.log(">>>>>cancelOverrideReasonTestSupport CLICKED<<<<<")
			} catch (Ex) {
				console.log(">>>>>cancelOverrideReasonTestSupport is not CLICKED<<<<<")
			}
		}
	}

	async clickcancelReceivedFrom() {
		console.log(">>>>>cancelReceivedFrom CLICKED<<<<<")
		// await $(cancelReceivedFrom).setValue('Test Automation');
		await actions.setInputField('setValue', 'Test Automation', cancelReceivedFrom, 'cancelReceivedFrom')
	}
	async clickcancelSubmitButton() {
		await actions.waitForDisplayed(cancelSubmitButton, 'cancelSubmitButton button')
		await actions.clickElement('click', cancelSubmitButton, 'cancelSubmitButton button')
		console.log(">>>>>cancelSubmitButton CLICKED<<<<<")
	}
	async clickConfirmAndRedisplay() {
		try {
			await actions.waitForDisplayed(confirmAndRedisplay, 'ConfirmAndRedisplay button')
			await actions.clickElement('click', confirmAndRedisplay, 'confirmAndRedisplay button')
			console.log(">>>>>confirmAndRedisplay CLICKED<<<<<")
		} catch (Ex) {
			assert.fail("Unable to click on ConfirmAndRedisplay button")
		}
	}
	async validateConfirmationCancel() {
		await actions.waitForDisplayed(cancelConfirmation, 'cancelConfirmation')
		assert.isTrue(
			await actions.isDisplayed(cancelConfirmation, 'cancelConfirmation'),
			'Validation Failed: Confirmation Cancel is not displayed '
		)
		await actions.waitForDisplayed(balanceDollar, 'balanceAmount')
		assert.equal(
			await actions.getText(balanceDollar, 'balanceAmount'),
			"$0.00",
			'Validation Failed: Balance amount is not zero'
		)
	}
	async validateRefundedAmountEqualsAmountPaid() {
		try {
			if ((await actions.getText(refundedAmount, 'refundedAmount')) == (await actions.getText(amountPaid, 'amountPaid'))) {
				console.log("Amount has been refunded successfully " + (await actions.getText(refundedAmount, 'refundedAmount')));
			}
		}
		catch (Ex) {
			if ((await actions.getText(balanceDollar, 'refundedAmount')).includes("$0.00")) {
				console.log("Amount has been refunded successfully ");
			} else {
				assert.fail("Refund amount not displayed")
			}

		}
	}
	async selectUncheckinButton() {
		if (await $(stationsCheckinButton).isDisplayed()) {
			await $(stationsUncheckinButton).click();
			console.log("Has been Unchecked");
		}

	}
	async validateTripSummaryBalanceAmountToBeZero() {
		assert.equal(
			await $(balanceAmountTripSummary).getText(),
			"await $0.00",
			'Validation Failed: Balance amount is not zero'
		);
	}

	async validateProductCountLabelIsDisplayed() {
		assert.isTrue(
			await $(stadiumProductLabelOnProductsPanel).isDisplayed(),
			'Validation Failed: Product count label is not displayed on Products panel'
		);
	}

	async clickOneWayRadioLandingPage() {
		await this.clickElement(oneWayRadioLandingPage);
	}

	async validateCompanyName() {
		await actions.pause(3000)
		await $(bundlesTab).scrollIntoView()
		if (await $(carCompanyName).isDisplayed) {
			console.log("Car's Company Name Displayed");
		} else {
			console.log("Car's Rental Not Displayed");
			console.log("Car's Company name is not Displayed");
		}
	}

	async validateVehicleType() {
		await actions.pause(1000)
		if (await $(carVehicleType).isDisplayed()) {
			console.log("Car's Vehicle Type is Displayed");
		} else {
			console.log("Car's Vehicle Type Not Displayed");
		}
	}

	async validatePickUpDate() {
		await actions.pause(1000)
		if (await $(carpickupDate).isDisplayed()) {
			console.log("Car's PickUp Date is Displayed");
		} else {
			console.log("Car's Pickup Date Not Displayed");
		}
	}

	async validateReturnDate() {
		await actions.pause(1000)
		if (await $(cardropDate).isDisplayed()) {
			console.log("Car's Return Date is Displayed");
		} else {
			console.log("Car's Return Date Not Displayed");
		}
	}

	async validateTotalCarPrice() {
		if (await $(cartotalprice).isDisplayed()) {
			console.log("Car's Total Price is Displayed");
		} else {
			console.log("Car's Total Price Not Displayed");
		}
	}

	async navigateToG4_intviva() {
		await homePage.getEnvironmentValue()
		let env = process.env.ENV
		if (env.includes("prod")) {
			console.log("CAME HERE>>>>>>>>>>>>>>>>>>PROD")
			await browser.maximizeWindow()
			await browser.deleteAllCookies()
			await browser.url("https://g4plus-portal.allegiantair.com");
			await actions.pause(1000)
			await $(g4UserName).setValue(process.env.username);
			await $(g4Password).setValue(process.env.password);
			await $(g4Submit).click();
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
			await actions.openWebsite((await this.urlBuilder())[0]);
			await actions.pause(1000)
			await actions.openWebsite((await this.urlBuilder())[1])
			await actions.pause(10000);
		}
	}

	async Openclpageinnewtab() {
		await homePage.getEnvironmentValue()
		var getEnv = process.env.ENV
		if (getEnv.includes('okd')) {
			var envURL = getEnv.split('-')[1].split('.')[0]
			var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
			let pageurl = 'https://g4plus-res-' + envURL + '.okd.allegiantair.com/app/customers/list'
			await browser.newWindow(pageurl)
		} 
		else if (getEnv.includes('prd01')) {
			var envURL = getEnv.split('-')[1].split('.')[0]
			var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
			let pageurl = 'https://g4plus-res-' + envURL + '.allegiantair.com/app/customers/list'
			await browser.newWindow(pageurl)
		} else if (getEnv.includes('dev01')) {
			var envURL = getEnv.split('-')[1].split('.')[0]
			var env = envURL.slice(0, 3) + '.' + envURL.slice(3, 8) + '.' + envURL.slice(8, 13)
			let pageurl = 'https://g4plus-res-' + envURL + '.okd.allegiantair.com/app/customers/list'
			await browser.newWindow(pageurl)
		} else {
			let pageurl = 'https://g4plus-res' + getEnv + '.allegiantair.com/app/customers/list'
			await browser.newWindow(pageurl)
		}
	}

	async guestLogin() {
		await actions.pause(5000);
		await actions.scroll(guestLogin,'guestLogin')
		await actions.waitForDisplayed(guestLogin, 'guestLogin')
		await actions.clickElement('click', guestLogin, 'guestLogin')
		await actions.pause(10000);
		try {
			await browser.switchWindow('Allegiant | Cheap Flights');
		} catch (ex) {
			console.log("Allegiant Home window is not displayed");
		}
		const handles = await browser.getWindowHandles();
		console.log("Windows count ", handles.length);
		for (var i = 0; i < 2; i++) {
			console.log("---------WH--------1");
			await browser.switchToWindow(handles[i]);
			await browser.closeWindow();
			console.log("---------WH--------2");
		}
		try {
			await actions.pause(5000)
			await browser.switchWindow('Allegiant | Cheap Flights');
		} catch (ex) {
			console.log("Allegiant Home window is not displayed");
		}

		// if (process.env.silo.includes("blue") && process.env.appEnv.includes("stg")) {
		// 	browser.newWindow("https://www-rebr-int-blue.stg.allegiantair.com");
		// }
		// if (process.env.silo.includes("green") && process.env.appEnv.includes("stg")) {
		// 	browser.newWindow("https://www-rebr-int-green.stg.allegiantair.com");
		// }
	}
}

export default new ConfirmationPage();