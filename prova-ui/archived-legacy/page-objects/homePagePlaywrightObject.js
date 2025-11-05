import actions from "../../src/support/actions"
import market from '../../utility/market-OneDayflight'
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"

const buttontoclosepopup = "//button[@class='Popup__CloseIcon-sc-1kasz48-2 eKPgGA']/img"
const cookieepopup = "//button[contains(@class,'close-button')]"
const loginpath = "[data-hook='header-user-menu-item_log-in']"
const oneway = "[data-hook='flight-search-trip-type_ONEWAY']"
const roundtrip = "[data-hook='flight-search-trip-type_ROUNDTRIP']"
const origin = "[data-hook='flight-search-origin']"
const originloc = "[data-hook='flight-search-origin'] input"
const destination = "[data-hook='flight-search-destination']"
const destinationloc = "[data-hook='flight-search-destination'] input"
const departureDate = "[data-hook='flight-search-date-picker_expand-start-date']";
const departureDateField = "[data-hook='flight-search-date-picker_input-start-date']";
const calendarDatePicker = "[data-hook= 'flight-search-date-picker_calendars']"
const datePickerPrevious = "[data-hook='flight-search-date-picker_navigate-previous-month']";
const datePickerNext = "//button[@data-hook='flight-search-date-picker_navigate-next-month']|//button[@aria-label='Go to next month']";
const calendarMonthAndYearTextLeft = "[data-hook='flight-search-date-picker_calendar-0_display-month-year']";
const calendarMonthAndYearTextRight = "[data-hook='flight-search-date-picker_calendar-1_display-month-year']";
const returningDate = "//button[@data-hook='flight-search-date-picker_expand-end-date']";
const returnDatePlaceholder = "//input[@data-hook='flight-search-date-picker_input-end-date']";
const isRoundTripSelected = "//label[@data-hook='flight-search-trip-type_ROUNDTRIP']//div//input"
const dateExpand = "[data-hook='flight-search-date-picker_expand-start-date']"
const homesubmit = "[data-hook='flight-search-submit']"
const scrollingpurpose = "[data-hook='flight-search-travelers-expando-button']"
const classcheck = "#personalized-deals-disclaimer"
const incrementAdults = "[data-hook='flight-search-adults_increment']"
const travelersField = "[data-hook='flight-search-travelers-expando-button']"
const adultCurrentValue = "//input[@id='adults']"
const incrementChildren = "[data-hook='flight-search-children_increment']"
const incrementInfantInLap = "[data-hook='flight-search-infants-lap_increment']"
const incrementInfantInSeat = "[data-hook='flight-search-infants-seat_increment']"
const oneWay = "[data-hook='flight-search-trip-type_ONEWAY']"
const roundTrip = "[data-hook='flight-search-trip-type_ROUNDTRIP']"

var billboardNameList = []
var BookingDisabledFromMonth;
var billboardNameList = []
var BookingDisabledFromMonth;
let newDate = new Date();

class HomePage {

	async openURL(page) {
		await actions.openWebsite(page)
		// await check.checkURL('https://www.stg.allegiantair.com/',"opening the allegiantair application")
		// await check.checkTitle('Rediffmail','reddiff-mail website')
		// await check.checkURLPath('/','allegiantair UI')
	}

	async popupClosing() {

		try {
			await actions.waitFor(buttontoclosepopup, 5000, '', true, 'button to close popup')
			await actions.isDisplayed(buttontoclosepopup, "Overlay Merchandise Pop-up button")
			await actions.waitForClickable(buttontoclosepopup, 'Overlay Merchandise Pop-up button')
			await actions.clickElement('click', buttontoclosepopup, "button to close the Overlay Merchandise pop-up")
		} catch (error) {
			console.log("Overlay Merchandise Popup not Displayed")
		}
		if (await actions.isDisplayed(cookieepopup, "Accept All Cookies Popup button")) {
			await actions.waitForDisplayed(cookieepopup, 'Accept All Cookies Popup button')
			await actions.waitForClickable(cookieepopup, 'Accept All Cookies Popup button')
			await actions.clickElement('click', cookieepopup, 'Button to close Accept All Cookies Popup')
		} else {
			console.log("Accept All Cookies Popup not Displayed")
		}
	}
	async loginlink() {
		await actions.clickElement('click', loginpath, "log-in link")
	}

	async oneway() {
		await actions.clickElement('click', oneway, "one-way radio-button")
	}
	async selectingorigin(value) {
		await actions.waitForDisplayed(origin, "origin")
		await actions.waitForClickable(origin, "origin")
		await actions.clickElement('click', origin, "origin input field")
		await actions.setInputField('setValue', value, originloc, "origin-input-field")
		await actions.pressButton("Enter", 'press')
	}

	async selectingdestination(value) {
		await actions.scroll(destination)
		await actions.clickElement('click', destination, "destination input field")
		await actions.setInputField('setValue', value, destinationloc, "destination-input-field")
		await actions.pressButton("Enter", 'press')
		// await actions.pause(3000)
		await this.popupClosing()
		await actions.waitForDisplayed(dateExpand, "date expand button")
		await actions.clickElement('click', dateExpand, "date expand button")

		// await check.isEnabled(departureDate,true,'date-selection field after city-pair selection')
	}

	async openReturningDateCalendar() {
		await actions.clickElement('click', returningDate, "returning date input field")
	}

	async chooseDepartingDate(dateNumber) {
		const day1 = "button[data-hook='flight-search-date-picker_calendar-0_select-day-X'][aria-hidden='false']"
		const day2 = "button[data-hook='flight-search-date-picker_calendar-1_select-day-X'][aria-hidden='false']"
		await actions.waitForDisplayed(departureDate, 'departureDate')
		let departureDateIsEnabled = await actions.isEnabled(departureDate, "Date-Expand button")
		if (departureDateIsEnabled) {
			let calendarDisplayed = await actions.isDisplayed(calendarDatePicker, 'calendar datepicker')
			if (!(calendarDisplayed)) {
				await actions.clickElement('click', departureDate, "Date-Expand button")
			}
			let newDate = new Date();
			let { calendarMonthLeft, month, dayInt, nextDate } = await this.calculateDate(
				dateNumber,
				newDate
			);
			if (month === calendarMonthLeft) {
				await actions.waitForDisplayed(day1.replace('X', dayInt), "Start Day")
				await actions.clickElement('click', day1.replace('X', dayInt), "Start Day")
			} else {
				await actions.waitForDisplayed(day2.replace('X', dayInt), "End Day")
				await actions.clickElement('click', day2.replace('X', dayInt), "End Day")
			}
			return nextDate;
		} else {
			console.log("Expected Departing date is not enabled to select");
		}
	}

	async chooseReturningDate(dateNumber, departureDate) {
		let titleValidation = await browser.title()
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

		let calMonthLeft = await actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")
		let calendarMonthLeft = calMonthLeft
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		let calMonthRight = await actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextLeft")
		let calendarMonthRight = calMonthRight
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();

		while (!(month === calendarMonthLeft || month === calendarMonthRight)) {
			let nextMonth = await actions.getAttribute(direction, "disabled", "direction")
			if (nextMonth == null) {
				await actions.clickElement('click', direction, "direction")
			} else {
				return null;
			}
			calMonthLeft = await actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")

			calendarMonthLeft = calMonthLeft
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();

			calMonthRight = await actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextRight")
			calendarMonthRight = calMonthRight
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
		let calLeftData = await actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")
		let calendarYearLeft = calLeftData
			.toString()
			.split(' ')[1]
			.trim();
		let calRightData = await actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextRight")
		let calendarYearRight = calRightData
			.toString()
			.split(' ')[1]
			.trim();
		while (!(year === calendarYearLeft || year === calendarYearRight)) {
			await actions.clickElement('click', datePickerNext, "datePickerNext")

			calLeftData = await actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")
			calendarYearLeft = calLeftData
				.toString()
				.split(' ')[1]
				.trim();
			calRightData = await actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextRight")
			calendarYearRight = calRightData
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
			await actions.clickElement('click', departureDate, "departureDate")
			monthNumber = newDate.getMonth() + 1;
			newDate = new Date(year, monthNumber, 1);
			stringDate = newDate.toDateString().slice(3);
			month = stringDate.slice(0, -8).trim();
			dayInt = 1;
			calendarMonthLeft = this.selectMonth(month, direction);
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
		isDisabled = await actions.isEnabled(dayCalendar)
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
			isDisabled = await actions.isEnabled(dayCalendar)
		}
		return { calendarMonthLeft, month, dayInt, nextDate };
	}

	async submithomepage() {
		// await actions.scroll(classcheck)
		// await check.checkClass(classcheck,'disclaimer','disclaimer-class')
		await actions.scroll(scrollingpurpose)
		await actions.clickElement('click', homesubmit, "submit button")
	}

	async selectTripType(tripType) {
		await this.popUps()
		process.env.appEnv = await browser.url()
		await actions.isDisplayed(oneWay, 'oneWay Radio Button')
		if (tripType.includes("oneway")) {
			await actions.waitForDisplayed(oneWay, 'oneway')
			await actions.waitForClickable(oneWay, 'oneway')
			await actions.clickElement('click', oneWay, "Radio Button to select oneway")
		}
		else if (tripType.includes("roundTrip")) {
			let roundTripSelected = await actions.isSelected(isRoundTripSelected)
			if (!(roundTripSelected)) {
				await actions.waitForClickable(roundTrip, 'RoundTrip Radio Button')
				await actions.clickElement('click', roundTrip, "Radio Button to select roundTrip")
			}
		}
	}

	async popUps() {
		// // await actions.pause(5000)
		try {
			await actions.waitFor(buttontoclosepopup, 5000, '', true, 'button to close popup')
			await actions.waitForClickable(buttontoclosepopup, 'Overlay Merchandise Pop-up button')
			await actions.clickElement('click', buttontoclosepopup, "button to close the Overlay Merchandise pop-up")
		} catch (error) {
			console.log("Overlay Merchandise Popup not Displayed")
		}
		if (await actions.isDisplayed(cookieepopup, "Accept All Cookies Popup button")) {
			await actions.waitForDisplayed(cookieepopup, "Accept All Cookies Popup button")
			await actions.waitForClickable(cookieepopup, "Accept All Cookies Popup button")
			await actions.clickElement('click', cookieepopup, 'Button to close Accept All Cookies Popup')
		} else {
			console.log("Accept All Cookies Popup not Displayed")
		}
	}

	async calculateDate(dateNumber, newDate) {
		let dateSelected = parseInt(dateNumber);
		await newDate.setDate(newDate.getDate() + dateSelected);
		let stringDate = await newDate.toDateString().slice(3);
		let month = await stringDate.slice(0, -8).trim();
		let day = await stringDate.slice(4, -5).trim();
		let dayInt = parseInt(day);
		let year = await stringDate.slice(7).trim();
		let calLeftData = await actions.getText(calendarMonthAndYearTextLeft, 'calendarMonthAndYearTextLeft')
		let calendarYearLeft = await calLeftData
			.toString()
			.split(' ')[1]
			.trim();
		let calRightData = await actions.getText(calendarMonthAndYearTextRight, 'calendarMonthAndYearTextRight')
		let calendarYearRight = await calRightData
			.toString()
			.split(' ')[1]
			.trim();

		while (!(year === calendarYearLeft || year === calendarYearRight)) {
			await actions.click(datePickerNext, 'datePickerNext')

			calLeftData = await actions.getText(calendarMonthAndYearTextLeft, 'calendarMonthAndYearTextLeft')
			calendarYearLeft = await calLeftData
				.toString()
				.split(' ')[1]
				.trim();
			calRightData = await actions.getText(calendarMonthAndYearTextRight, 'calendarMonthAndYearTextRight')
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
			await actions.click(departureDate, 'departureDate')
			monthNumber = newDate.getMonth() + 1;
			newDate = new Date(year, monthNumber, 1);
			stringDate = newDate.toDateString().slice(3);
			month = stringDate.slice(0, -8).trim();
			dayInt = 1;
			calendarMonthLeft = this.selectMonth(month, direction);
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
			isDisabled = await actions.isEnabled(dayCalendar)
		}
		return { calendarMonthLeft, month, dayInt, nextDate };
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
			let nextMonth = await actions.getAttribute(direction, 'disabled', 'direction')
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

	async selectAdults(adultsCount) {
		let incrementAdultsIsDisplayed = await actions.isDisplayed(incrementAdults, 'increment adults')
		console.log("incrementAdultsIsDisplayed "+incrementAdultsIsDisplayed)
		if ((incrementAdultsIsDisplayed) === false) {
			// browser.execute("window.scrollBy(0,-300)");
			await actions.waitForDisplayed(travelersField, 'travelers field')
			await actions.clickElement('click', travelersField, 'travelersField')
		}
		await actions.waitForDisplayed(incrementAdults, 'increment adults')
		let adultCurrentValueGetAttribute = await actions.getAttribute(adultCurrentValue, 'value', 'adult current value')
		let adultValue = Number(adultCurrentValueGetAttribute)
		let incrementAdultsIsClickable = await actions.isClickable(incrementAdults, 'increment adults')
		if (Number(adultsCount) > Number(1)) {
			if ((adultValue) < Number(adultsCount) && (incrementAdultsIsClickable) === true) {
				for (let i = 1; i < Number(adultsCount); i++) {
					await actions.waitForClickable(incrementAdults, 'increment adults')
					await actions.clickElement('click', incrementAdults, 'increment adults')
				}
			}
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
	async newWindowURL(url){
		await actions.setWindowSize(1000,500)
		await actions.newWindow(url)
	}

	async closeFirstTab(){
		await actions.closeAllButFirstTab()
	}

	async openDepartureDateCalendar() {
		await actions.waitForDisplayed(dateExpand, 'Date Expand Button', 50000)
		await actions.waitForEnabled(dateExpand, 'Date Expand Button')
		await actions.waitForClickable(dateExpand, 'dateExpand button')
		// await actions.pause(3000)
		// await actions.clickElement('click', dateExpand, "date expand button")
		await actions.click(dateExpand, "date expand button")
		await actions.pause(3000)
	}

	async getmarket() {
		let env;
		process.env.ENV = await browser.url()
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
		await actions.clickElement('click', origin, "origin input field")
		await actions.setInputField('setValue', departure, originloc, "origin-input-field")
		await actions.pressButton("Enter", 'press')
	}

	async selectDestination(arrival) {
		await actions.scroll(oneWay)
		await actions.clickElement('click', destination, "destination input field")
		await actions.setInputField('setValue', arrival, destinationloc, "destination-input-field")
		await actions.pressButton("Enter", 'press')
		await actions.pause(3000)
		await actions.pressButton("Enter", 'press')
		await actions.pause(5000)
	}

}
export default new HomePage()
export { BookingDisabledFromMonth, billboardNameList }