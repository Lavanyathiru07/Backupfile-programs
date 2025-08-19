import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'
import market from '../utility/market-OneDayflight'
import { assert } from 'chai';
const buttontoclosepopup = "//button[@class='Popup__CloseIcon-sc-1kasz48-2 eKPgGA']/img"
const overlaymerchandise = "[data-hook='overlay-merchandise_ice-pop_close']"
const cookieepopup = "//button[contains(@class,'close-button')]"
const loginpath = "[data-hook='header-user-menu-item_log-in']"
const emailfield = "[data-hook='home-login_email-field_login-email']"
const passwordfield = "[data-hook='home-login_password-field_login-password']"
const signinbutton = "//span[contains(text(),'LOG IN')]"
const roundTrip = "[data-hook='flight-search-trip-type_ROUNDTRIP']";
const oneWay = "[data-hook='flight-search-trip-type_ONEWAY']";
const origin = "[data-hook='flight-search-origin']"
const originloc = "[data-hook='flight-search-origin'] input"
const destinationField = "[data-hook='flight-search-destination']"
const destinationloc = "[data-hook='flight-search-destination'] input"
const departureDate = "[data-hook='flight-search-date-picker_expand-start-date']";
const departureDateField = "[data-hook='flight-search-date-picker_input-start-date']";
const datePickerPrevious = "[data-hook='flight-search-date-picker_navigate-previous-month']";
const datePickerNext = "//button[@data-hook='flight-search-date-picker_navigate-next-month']|//button[@aria-label='Go to next month']";
const calendarMonthAndYearTextLeft = "[data-hook='flight-search-date-picker_calendar-0_display-month-year']";
const calendarMonthAndYearTextRight = "[data-hook='flight-search-date-picker_calendar-1_display-month-year']";
const returningDate = "//button[@data-hook='flight-search-date-picker_expand-end-date']";
const returnDatePlaceholder = "//input[@data-hook='flight-search-date-picker_input-end-date']";
const incrementAdults = "[data-hook='flight-search-adults_increment']";
const travelersField = "[data-hook='flight-search-travelers-expando-button']";
const adultCurrentValue = "//input[@id='adults']"
const incrementInfantInLap = "[data-hook='flight-search-infants-lap_increment']";
const incrementChildren = "[data-hook='flight-search-children_increment']";
const incrementInfantInSeat = "[data-hook='flight-search-infants-seat_increment']";
const isRoundTripSelected = "//label[@data-hook='flight-search-trip-type_ROUNDTRIP']//div//input"
const dateExpand = "[data-hook='flight-search-date-picker_expand-start-date']"
const homesubmit = "[data-hook='flight-search-submit']"
const flightheading = "[data-hook='flights-page_page-heading']"
const scrollingpurpose = "[data-hook='flight-search-travelers-expando-button']"
const hotelLink = "[data-hook='header-main-menu-item_hotel']"
const classcheck = "#personalized-deals-disclaimer"

let url
var billboardNameList = []
var BookingDisabledFromMonth;
let newDate = new Date();

class HomePage {

	async openKey(page) {
		await actions.openWebsite(page)
	}

	async openURL(page) {
		await actions.openWebsite(page)
		await this.popUps()
	}

	async getURL() {
		await actions.pause(3000)
		process.env.appEnv = await browser.getUrl();
	}

	async popUps() {
		await actions.pause(5000)
		try {
			let buttontoclosepopupVisibilty = await actions.isDisplayed(buttontoclosepopup, 'button to close Merchandise Pop-up')
			if (buttontoclosepopupVisibilty) {
				await actions.waitForDisplayed(buttontoclosepopup, 'Overlay Merchandise Pop-up button', 5000)
				await actions.isDisplayed(buttontoclosepopup, "Overlay Merchandise Pop-up button")
				await actions.waitForClickable(buttontoclosepopup, 'Overlay Merchandise Pop-up button')
				await actions.clickElement('click', buttontoclosepopup, "button to close the Overlay Merchandise pop-up")
			}
		} catch (error) {
			console.log("Overlay Merchandise Popup not Displayed")
			await browser.keys(['Escape']);
		}
		await actions.pause(2000)
		let cookieepopupVisibile = await actions.isDisplayed(cookieepopup, "Accept All Cookies Popup button")
		if (cookieepopupVisibile) {
			await actions.waitForDisplayed(cookieepopup, 'Accept All Cookies Popup button', 5000)
			await actions.waitForClickable(cookieepopup, 'Accept All Cookies Popup button')
			await actions.clickElement('click', cookieepopup, 'Button to close Accept All Cookies Popup')
		} else {
			console.log("Accept All Cookies Popup not Displayed")
		}
	}

	async loginlink() {
		await actions.pause(3000)
		await actions.waitForClickable(loginpath, 'log-in link')
		await actions.clickElement('click', loginpath, "log-in link")
	}

	async loginWithCredentials() {
		await actions.setInputField('setValue', "tsqa.automation+94720230112@allegiantsqa.com", emailfield, "Email-Input-Field")
		await actions.setInputField('setValue', "tsqa.automation+94720230112@allegiantsqa.coM", passwordfield, "Password-Input-Field")
		await actions.clickElement('click', signinbutton, "Sign in-Button")
	}

	async selectTripType(tripType) {
		await this.popUps()
		await actions.pressButton('Esc')
		await check.isDisplayed(oneWay, 'oneWay Radio Button', true)
		if (tripType.includes("oneway")) {
			await actions.waitForDisplayed(oneWay, 'oneWay Radio Button')
			await actions.waitForClickable(oneWay, 'oneWay Radio Button')
			await actions.clickElement('click', oneWay, "Radio Button to select oneway")
		}
		else if (tripType.includes("roundTrip")) {
			if (!(await $(isRoundTripSelected).isSelected())) {
				await actions.waitForClickable(roundTrip, 'RoundTrip Radio Button')
				await actions.clickElement('click', roundTrip, "Radio Button to select roundTrip")
			}
		}
	}

	async getmarket() {
		let env;
		let getEnv = process.env.ENV
		if (getEnv.includes('stg')) {
			env = '.stg';
		} else if (getEnv.includes('okd')) {
			if (getEnv.includes('intnexusg4')) {
				env = '-intnexusg4.okd';
			} else if (getEnv.includes('qatnexusg4')) {
				env = '-qatnexusg4.okd';
			}
		} else {
			console.log('Kindly enter valid env')
		}
		var citypair = await market(env)
		console.log(citypair)
		console.log(citypair.dataCollected[0].origin)
		console.log(citypair.dataCollected[0].destination)
		process.env.origin = citypair.dataCollected[0].origin
		process.env.arrival = citypair.dataCollected[0].destination
	}

	async selectDeparture(departure) {
		await actions.waitForDisplayed(origin, "origin")
		await actions.waitForClickable(origin, "origin")
		await actions.clickElement('click', origin, "origin input field")
		await actions.setInputField('setValue', departure, originloc, "origin-input-field")
		await actions.pressButton("Enter")
		// $(departureField).click()
		// $(departureFieldInput).setValue(departure)
		// browser.keys('Enter');
	}

	async selectDestination(destination) {
		await actions.scroll(oneWay)
		await actions.clickElement('click', destinationField, "destination input field")
		await actions.setInputField('setValue', destination, destinationloc, "destination-input-field")
		await actions.pressButton("Enter")
		await actions.pause(3000)
		await actions.pressButton("Enter")
		await actions.pause(3000)
	}

	async selectingorigin(value) {
		await actions.waitForDisplayed(origin, "origin")
		await actions.waitForClickable(origin, "origin")
		await actions.clickElement('click', origin, "origin input field")
		await actions.setInputField('setValue', value, originloc, "origin-input-field")
		await actions.pressButton("Enter")
		process.env.origin = value
		console.log(process.env.origin)
	}

	async selectingdestination(value) {
		await actions.scroll(oneWay,'oneWay')
		await actions.clickElement('click', destinationField, "destination input field")
		await actions.setInputField('setValue', value, destinationloc, "destination-input-field")
		await actions.pressButton("Enter")
		await actions.pause(1000)
		await actions.pressButton("Enter")
		process.env.arrival = value
		console.log(process.env.arrival)
	}

	async openDepartureDateCalendar() {
		await actions.waitForDisplayed(dateExpand, 'Date Expand Button', 50000)
		await actions.waitForEnabled(dateExpand, 'Date Expand Button')
		await actions.waitForClickable(dateExpand, 'dateExpand button')
		// await actions.clickElement('click', dateExpand, "date expand button")
		await actions.click(dateExpand, "date expand button")
		await actions.pause(3000)
	}

	async openReturningDateCalendar() {
		await actions.clickElement('click', returningDate, "return date button")
	}

	async chooseDepartingDate(dateNumber) {
		const day1 = "button[data-hook='flight-search-date-picker_calendar-0_select-day-X'][aria-hidden='false']"
		const day2 = "button[data-hook='flight-search-date-picker_calendar-1_select-day-X'][aria-hidden='false']"
		await actions.waitForEnabled(departureDate, 'departureDate')
		let departureDateIsEnabled = await actions.isEnabled(departureDate, "Date-Expand button")
		if (departureDateIsEnabled) {
			let newDate = new Date();
			let { calendarMonthLeft, month, dayInt, nextDate } = await this.calculateDate(
				dateNumber,
				newDate
			);

			if (month === calendarMonthLeft) {
				// await	$(
				// 	"button[data-hook='flight-search-date-picker_calendar-0_select-day-" +
				// 	dayInt +
				// 	"'][aria-hidden='false']"
				// ).click();
				await actions.clickElement('click', day1.replace('X', dayInt), "Start Day")
			} else {
				// await	$(
				// 	"button[data-hook='flight-search-date-picker_calendar-1_select-day-" +
				// 	dayInt +
				// 	"'][aria-hidden='false']"
				// ).click();
				await actions.clickElement('click', day2.replace('X', dayInt), "End Day")
			}
			return nextDate;
		} else {
			console.log("Expected Departing date is not enabled to select");
		}
	}

	async chooseReturningDate(dateNumber, departureDate) {
		let titleValidation = await browser.getTitle()
		console.log("TITLE: ", titleValidation)
		if (titleValidation == 'Flights and Extras') {
			console.log('IF')
			let returnDate = new Date();
			let { calendarMonthLeft, month, dayInt } = await this.calculateDate(
				dateNumber,
				departureDate
			);
			let dateSelection = "button[data-hook='flight-search-date-picker_calendar-0_select-day-" +
				dayInt +
				"'][aria-hidden='false']"
			let dateSelectionret = "button[data-hook='flight-search-date-picker_calendar-1_select-day-" +
				dayInt +
				"'][aria-hidden='false']"
			if (month === calendarMonthLeft) {
				await actions.clickElement('click', dateSelection, "button to select the departure date")
			} else {
				await actions.clickElement('click', dateSelectionret, "button to select the departure date")
			}
			return returnDate;
		} else {
			let roundTripIsSelcted = await actions.isSelected(isRoundTripSelected, 'isRoundTripSelected')
			if (roundTripIsSelcted) {
				//if (await actions.) {
				let returnDate = new Date();
				let { calendarMonthLeft, month, dayInt } = await this.calculateDate(
					dateNumber,
					departureDate
				);
				let dateSelection = "button[data-hook='flight-search-date-picker_calendar-0_select-day-" +
					dayInt +
					"'][aria-hidden='false']"
				let dateSelectionret = "button[data-hook='flight-search-date-picker_calendar-1_select-day-" +
					dayInt +
					"'][aria-hidden='false']"
				if (month === calendarMonthLeft) {
					await actions.clickElement('click', dateSelection, "button to select the departure date")
				} else {
					await actions.clickElement('click', dateSelectionret, "button to select the departure date")
				}
				return returnDate;
			}
		}
	}

	async selectMonth(month, direction) {
		let calMonthLeft = await actions.getText(calendarMonthAndYearTextLeft, 'month and year')
		let calendarMonthLeft = await calMonthLeft
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		let calMonthRight = await actions.getText(calendarMonthAndYearTextRight, 'month and year')
		let calendarMonthRight = await calMonthRight
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		while (!(month === calendarMonthLeft || month === calendarMonthRight)) {
			let nextMonth = await $(direction).getAttribute('disabled');
			if (nextMonth == null) {
				await actions.clickElement('click', direction, 'direction button')
			} else {
				return null;
			}
			calMonthLeft = await actions.getText(calendarMonthAndYearTextLeft, 'Month and Year')
			calendarMonthLeft = await calMonthLeft
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();

			calMonthRight = await actions.getText(calendarMonthAndYearTextRight, 'Month and Year')
			calendarMonthRight = await calMonthRight
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();
		}
		return calendarMonthLeft;
	}

	async calculateDate(dateNumber, newDate) {
		let dateSelected = parseInt(dateNumber);
		await newDate.setDate(newDate.getDate() + dateSelected);
		let stringDate = await newDate.toDateString().slice(3);
		let month = await stringDate.slice(0, -8).trim();
		let day = await stringDate.slice(4, -5).trim();
		let dayInt = parseInt(day);
		let year = await stringDate.slice(7).trim();
		await actions.pause(2000)
		let calLeftData = await actions.getText(calendarMonthAndYearTextLeft, 'calendarMonthAndYearTextLeft')
		await actions.pause(2000)
		let calendarYearLeft = await calLeftData
			.toString()
			.split(' ')[1]
			.trim();
		let calRightData = await actions.getText(calendarMonthAndYearTextRight, 'calendarMonthAndYearTextRight')
		let calendarYearRight = await calRightData
			.toString()
			.split(' ')[1]
			.trim();
		//
		while (!(year === calendarYearLeft || year === calendarYearRight)) {
			// await $(datePickerNext).click()
			await actions.click(datePickerNext, 'datePicker Next')
			// calLeftData = await $(calendarMonthAndYearTextLeft).getText()
			calLeftData = await actions.getText(calendarMonthAndYearTextLeft, 'calendarMonthAndYearTextLeft')
			calendarYearLeft = await calLeftData
				.toString()
				.split(' ')[1]
				.trim();
			// calRightData = await $(calendarMonthAndYearTextRight).getText()
			calRightData = await actions.getText(calendarMonthAndYearTextRight, 'calendarMonthAndYearTextLeft')
			calendarYearRight = await calRightData
				.toString()
				.split(' ')[1]
				.trim();
		}
		let direction;
		if (dateNumber < 0) {
			direction = datePickerPrevious;
		} else {
			direction = datePickerNext;
		}
		let calendarMonthLeft = await this.selectMonth(month, direction);
		let monthNumber;
		while (calendarMonthLeft == null) {
			// await $(departureDate).click();
			await actions.click(departureDate, 'departureDate')
			monthNumber = newDate.getMonth() + 1;
			newDate = new Date(year, monthNumber, 1);
			stringDate = newDate.toDateString().slice(3);
			month = stringDate.slice(0, -8).trim();
			dayInt = 1;
			calendarMonthLeft = await this.selectMonth(month, direction);
		}
		let isDisabled = false;
		let dayCalendar;
		if (month === calendarMonthLeft) {
			dayCalendar =
				"button[data-hook='flight-search-date-picker_calendar-0_select-day-" +
				dayInt +
				"'][aria-hidden='false']";
		} else {
			dayCalendar =
				"button[data-hook='flight-search-date-picker_calendar-1_select-day-" +
				dayInt +
				"'][aria-hidden='false']";
		}
		//isDisabled = await $(dayCalendar).isClickable();
		isDisabled = await actions.isClickable(dayCalendar, 'Day Calender')
		let nextDate = newDate;
		while (!isDisabled) {
			await nextDate.setDate(nextDate.getDate() + 1);
			stringDate = await nextDate.toDateString().slice(3);
			day = await stringDate.slice(4, -5).trim();
			dayInt = parseInt(day);
			month = await stringDate.slice(0, -8).trim();
			calendarMonthLeft = await this.selectMonth(month, direction);

			if (month === calendarMonthLeft) {
				dayCalendar =
					"button[data-hook='flight-search-date-picker_calendar-0_select-day-" +
					dayInt +
					"'][aria-hidden='false']";
			} else {
				dayCalendar =
					"button[data-hook='flight-search-date-picker_calendar-1_select-day-" +
					dayInt +
					"'][aria-hidden='false']";
			}
			//isDisabled = await $(dayCalendar).isEnabled();
			isDisabled = await actions.isEnabled(dayCalendar, 'dayCalendar')
		}
		return { calendarMonthLeft, month, dayInt, nextDate };
	}

	async selectAdults(adultsCount) {
		if ((await actions.isDisplayed(incrementAdults, 'adults increment button')) === false) {
			await browser.execute("window.scrollBy(0,-300)");
			await actions.clickElement('click', travelersField, 'expand button of travellers')
		}
		await actions.waitForDisplayed(incrementAdults, 'adults increment button')
		if (Number(adultsCount) > Number(1)) {
			do {
				if ((await actions.isDisplayed(incrementAdults, 'adults increment button')) === false) {
					await browser.execute("window.scrollBy(0,-300)");
					await actions.clickElement('click', travelersField, 'expand button of travellers')
				}
				await actions.waitForClickable(incrementAdults, 'adults increment button')
				await actions.clickElement('click', incrementAdults, 'adults increment button')
			} while (Number(await $(adultCurrentValue).getAttribute('value')) < Number(adultsCount) && (await $(incrementAdults).isClickable()) === true)
		}
	}

	async selectChildren(childrenNumber) {
		for (let i = 0; i < childrenNumber; i++) {
			await actions.clickElement('click', incrementChildren, 'LapInfant increment button')
		}
	}

	async selectLapInfantPlusOne(ClickCount) {
		for (let i = 0; i < ClickCount - 1; i++) {
			await actions.clickElement('click', incrementInfantInLap, 'LapInfant increment button')
		}
	}

	async selectInfantInSeat(infantInSeatNumber) {
		await actions.waitForClickable(incrementInfantInSeat, "increment button for Infant in seat")
		for (let i = 0; i < infantInSeatNumber; i++) {
			await actions.clickElement('click', incrementInfantInSeat, 'InfantinSeat increment button')
		}
	}
	async selectInfantInLap(infantInLapNumber) {
		for (let i = 0; i < infantInLapNumber; i++) {
			await actions.waitForDisplayed(incrementInfantInLap, 'increment button for InfantInLap')
			await actions.clickElement('click', incrementInfantInLap, 'Infant in Lap increment button')
		}
	}

	async submithomepage() {
		try {
			await actions.pause(3000)
			// await actions.scroll(destinationField)
			// await browser.pause(2000)
			await actions.waitForClickable(homesubmit, "submit button", 5000)
			await actions.clickElement('click', homesubmit, "submit button")
		} catch (er) {
		}
	}

	async validateSearchPage() {
		await actions.pause(5000);
		if ((await browser.getUrl()).includes('manage-travel/')) {
			console.log('Selecting new fligts');
		} else {
			if (await browser.getTitle() === 'Flights') {
				console.log('Successfully completed on Search Page');
			} else {
				assert.fail('Something not proceed with Search page')
			}
		}
	}

	async hotellandonly() {
		await actions.clickElement('click', hotelLink, "link to navigate to the hotels page")
	}

	async getEnvironmentValue() {
		try{

			let  envVar;
			let envs = process.env.appEnv
			let value = envs.split('www')[1]
			envVar = value.split('.allegiantair.com')[0]
			process.env.ENV = envVar
			console.log(envVar)
		}
		catch
		{
			throw new Error("Unable to build the environment,please recheck the details")
		}
	}

}
export default new HomePage()
export { BookingDisabledFromMonth, billboardNameList }