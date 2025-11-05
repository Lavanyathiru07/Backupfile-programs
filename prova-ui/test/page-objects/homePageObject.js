import Actions from '../../src/support/actions.js'
import market from '../../utility/market-OneDayflight.js'

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

	actions;

	constructor(page, context) {
		this.actions = new Actions(page, context)
	}

	async openURL(page) {
		await this.actions.openWebsite(page)
		process.env.ENV = await this.actions.getUrl()
		// await check.checkURL('https://www.stg.allegiantair.com/',"opening the allegiantair application")
		// await check.checkTitle('Rediffmail','reddiff-mail website')
		// await check.checkURLPath('/','allegiantair UI')
	}

	async setWindow(screenWidth, screenHeight) {
		await this.actions.setWindowSize(screenWidth, screenHeight)
	}

	async popupClosing(timeout = 5000) {
		const popups = [
			{
				selector: buttontoclosepopup,
				name: "Overlay Merchandise Popup",
				description: "button to close the Overlay Merchandise pop-up"
			},
			{
				selector: cookieepopup,
				name: "Accept All Cookies Popup",
				description: "Button to close Accept All Cookies Popup"
			}
		];

		for (const popup of popups) {
			try {
				const isDisplayed = await this.actions.isDisplayed(popup.selector, popup.name);

				if (isDisplayed) {
					await this.actions.waitForClickable(popup.selector, popup.name, timeout);
					await this.actions.clickElement('click', popup.selector, popup.description);
					console.log(`${popup.name} successfully closed`);
				} else {
					console.log(`${popup.name} not displayed`);
				}
			} catch (error) {
				console.log(`Failed to close ${popup.name}: ${error.message}`);
			}
		}
	}
	async loginlink() {
		await this.actions.clickElement('click', loginpath, "log-in link")
	}

	async oneway() {
		await this.actions.clickElement('click', oneway, "one-way radio-button")
	}
	async selectingorigin(value) {
		await this.actions.waitForDisplayed(origin, "origin")
		await this.actions.waitForClickable(origin, "origin")
		await this.actions.clickElement('click', origin, "origin input field")
		await this.actions.setInputField('setValue', value, originloc, "origin-input-field")
		await this.actions.pressButton("Enter", 'press')
	}

	async selectingdestination(value) {
		await this.actions.scroll(destination)
		await this.actions.clickElement('click', destination, "destination input field")
		await this.actions.setInputField('setValue', value, destinationloc, "destination-input-field")
		await this.actions.pressButton("Enter", 'press')
		// await this.actions.pause(3000)
		await this.popupClosing()
		await this.actions.waitForDisplayed(dateExpand, "date expand button")
		await this.actions.clickElement('click', dateExpand, "date expand button")

		// await check.isEnabled(departureDate,true,'date-selection field after city-pair selection')
	}

	async openReturningDateCalendar() {
		await this.actions.clickElement('click', returningDate, "returning date input field")
	}

	async chooseDepartingDate(dateNumber) {
		const day1 = "button[data-hook='flight-search-date-picker_calendar-0_select-day-X'][aria-hidden='false']"
		const day2 = "button[data-hook='flight-search-date-picker_calendar-1_select-day-X'][aria-hidden='false']"
		await this.actions.waitForDisplayed(departureDate, 'departureDate')
		let departureDateIsEnabled = await this.actions.isEnabled(departureDate, "Date-Expand button")
		if (departureDateIsEnabled) {
			let calendarDisplayed = await this.actions.isDisplayed(calendarDatePicker, 'calendar datepicker')
			if (!(calendarDisplayed)) {
				await this.actions.clickElement('click', departureDate, "Date-Expand button")
			}
			let newDate = new Date();
			let { calendarMonthLeft, month, dayInt, nextDate } = await this.calculateDate(
				dateNumber,
				newDate
			);
			if (month === calendarMonthLeft) {
				await this.actions.waitForDisplayed(day1.replace('X', dayInt), "Start Day")
				await this.actions.clickElement('click', day1.replace('X', dayInt), "Start Day")
			} else {
				await this.actions.waitForDisplayed(day2.replace('X', dayInt), "End Day")
				await this.actions.clickElement('click', day2.replace('X', dayInt), "End Day")
			}
			return nextDate;
		} else {
			console.log("Expected Departing date is not enabled to select");
		}
	}

	async chooseReturningDate(dateNumber, departureDate) {
		let titleValidation = await this.actions.getTitle()
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
				await this.actions.clickElement('click', dateSelection, "button to select the departure date")
			} else {
				await this.actions.clickElement('click', dateSelectionret, "button to select the departure date")
			}
			return returnDate;
		} else {
			let roundTripIsSelcted = await this.actions.isSelected(isRoundTripSelected, 'isRoundTripSelected')
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
					await this.actions.clickElement('click', dateSelection, "button to select the departure date")
				} else {
					await this.actions.clickElement('click', dateSelectionret, "button to select the departure date")
				}
				return returnDate;
			}
		}
	}

	async selectMonth(month, direction) {

		let calMonthLeft = await this.actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")
		let calendarMonthLeft = calMonthLeft
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		let calMonthRight = await this.actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextLeft")
		let calendarMonthRight = calMonthRight
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();

		while (!(month === calendarMonthLeft || month === calendarMonthRight)) {
			let nextMonth = await this.actions.getAttribute(direction, "disabled", "direction")
			if (nextMonth == null) {
				await this.actions.clickElement('click', direction, "direction")
			} else {
				return null;
			}
			calMonthLeft = await this.actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")

			calendarMonthLeft = calMonthLeft
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();

			calMonthRight = await this.actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextRight")
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
		let calLeftData = await this.actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")
		let calendarYearLeft = calLeftData
			.toString()
			.split(' ')[1]
			.trim();
		let calRightData = await this.actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextRight")
		let calendarYearRight = calRightData
			.toString()
			.split(' ')[1]
			.trim();
		while (!(year === calendarYearLeft || year === calendarYearRight)) {
			await this.actions.clickElement('click', datePickerNext, "datePickerNext")

			calLeftData = await this.actions.getText(calendarMonthAndYearTextLeft, "calendarMonthAndYearTextLeft")
			calendarYearLeft = calLeftData
				.toString()
				.split(' ')[1]
				.trim();
			calRightData = await this.actions.getText(calendarMonthAndYearTextRight, "calendarMonthAndYearTextRight")
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
			await this.actions.clickElement('click', departureDate, "departureDate")
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
		isDisabled = await this.actions.isEnabled(dayCalendar)
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
			isDisabled = await this.actions.isEnabled(dayCalendar)
		}
		return { calendarMonthLeft, month, dayInt, nextDate };
	}

	async submithomepage() {
		// await this.actions.scroll(classcheck)
		// await check.checkClass(classcheck,'disclaimer','disclaimer-class')
		await this.actions.waitForDisplayed(scrollingpurpose, 'scrollingpurpose')
		await this.actions.clickElement('click', homesubmit, "submit button")
	}

	async selectTripType(tripType) {
		await this.popUps()
		await this.actions.isDisplayed(oneWay, 'oneWay Radio Button')
		if (tripType.includes("oneway")) {
			await this.actions.waitForDisplayed(oneWay, 'oneway')
			await this.actions.waitForClickable(oneWay, 'oneway')
			await this.actions.clickElement('click', oneWay, "Radio Button to select oneway")
		}
		else if (tripType.includes("roundTrip")) {
			let roundTripSelected = await this.actions.isSelected(isRoundTripSelected)
			if (!(roundTripSelected)) {
				await this.actions.waitForClickable(roundTrip, 'RoundTrip Radio Button')
				await this.actions.clickElement('click', roundTrip, "Radio Button to select roundTrip")
			}
		}
	}

	async popUps() {
		// // await this.actions.pause(5000)
		try {
			await this.actions.waitForDisplayed(buttontoclosepopup, 'button to close popup')
			await this.actions.waitForClickable(buttontoclosepopup, 'Overlay Merchandise Pop-up button')
			await this.actions.clickElement('click', buttontoclosepopup, "button to close the Overlay Merchandise pop-up")
		} catch (error) {
			console.log("Overlay Merchandise Popup not Displayed")
		}
		if (await this.actions.isDisplayed(cookieepopup, "Accept All Cookies Popup button")) {
			await this.actions.waitForDisplayed(cookieepopup, "Accept All Cookies Popup button")
			await this.actions.waitForClickable(cookieepopup, "Accept All Cookies Popup button")
			await this.actions.clickElement('click', cookieepopup, 'Button to close Accept All Cookies Popup')
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
		let calLeftData = await this.actions.getText(calendarMonthAndYearTextLeft, 'calendarMonthAndYearTextLeft')
		let calendarYearLeft = await calLeftData
			.toString()
			.split(' ')[1]
			.trim();
		let calRightData = await this.actions.getText(calendarMonthAndYearTextRight, 'calendarMonthAndYearTextRight')
		let calendarYearRight = await calRightData
			.toString()
			.split(' ')[1]
			.trim();

		while (!(year === calendarYearLeft || year === calendarYearRight)) {
			await this.actions.click(datePickerNext, 'datePickerNext')

			calLeftData = await this.actions.getText(calendarMonthAndYearTextLeft, 'calendarMonthAndYearTextLeft')
			calendarYearLeft = await calLeftData
				.toString()
				.split(' ')[1]
				.trim();
			calRightData = await this.actions.getText(calendarMonthAndYearTextRight, 'calendarMonthAndYearTextRight')
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
			await this.actions.click(departureDate, 'departureDate')
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
		isDisabled = await this.actions.isClickable(dayCalendar, 'Day Calender')
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
			isDisabled = await this.actions.isEnabled(dayCalendar)
		}
		return { calendarMonthLeft, month, dayInt, nextDate };
	}

	async selectMonth(month, direction) {
		let calMonthLeft = await this.actions.getText(calendarMonthAndYearTextLeft, 'month and year')
		let calendarMonthLeft = await calMonthLeft
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		let calMonthRight = await this.actions.getText(calendarMonthAndYearTextRight, 'month and year')
		let calendarMonthRight = await calMonthRight
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		while (!(month === calendarMonthLeft || month === calendarMonthRight)) {
			let nextMonth = await this.actions.getAttribute(direction, 'disabled', 'direction')
			if (nextMonth == null) {
				await this.actions.clickElement('click', direction, 'direction button')
			} else {
				return null;
			}
			calMonthLeft = await this.actions.getText(calendarMonthAndYearTextLeft, 'Month and Year')
			calendarMonthLeft = await calMonthLeft
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();

			calMonthRight = await this.actions.getText(calendarMonthAndYearTextRight, 'Month and Year')
			calendarMonthRight = await calMonthRight
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();
		}
		return calendarMonthLeft;
	}

	async selectAdults(adultsCount) {
		let incrementAdultsIsDisplayed = await this.actions.isDisplayed(incrementAdults, 'increment adults')
		console.log("incrementAdultsIsDisplayed " + incrementAdultsIsDisplayed)
		if ((incrementAdultsIsDisplayed) === false) {
			// browser.execute("window.scrollBy(0,-300)");
			await this.actions.waitForDisplayed(travelersField, 'travelers field')
			await this.actions.clickElement('click', travelersField, 'travelersField')
		}
		await this.actions.waitForDisplayed(incrementAdults, 'increment adults')
		let adultCurrentValueGetAttribute = await this.actions.getAttribute(adultCurrentValue, 'value', 'adult current value')
		let adultValue = Number(adultCurrentValueGetAttribute)
		let incrementAdultsIsClickable = await this.actions.isClickable(incrementAdults, 'increment adults')
		if (Number(adultsCount) > Number(1)) {
			if ((adultValue) < Number(adultsCount) && (incrementAdultsIsClickable) === true) {
				for (let i = 1; i < Number(adultsCount); i++) {
					await this.actions.waitForClickable(incrementAdults, 'increment adults')
					await this.actions.clickElement('click', incrementAdults, 'increment adults')
				}
			}
		}
	}

	async selectChildren(childrenNumber) {
		for (let i = 0; i < childrenNumber; i++) {
			await this.actions.clickElement('click', incrementChildren, 'LapInfant increment button')
		}
	}

	async selectLapInfantPlusOne(ClickCount) {
		for (let i = 0; i < ClickCount - 1; i++) {
			await this.actions.clickElement('click', incrementInfantInLap, 'LapInfant increment button')
		}
	}

	async selectInfantInSeat(infantInSeatNumber) {
		await this.actions.waitForClickable(incrementInfantInSeat, "increment button for Infant in seat")
		for (let i = 0; i < infantInSeatNumber; i++) {
			await this.actions.clickElement('click', incrementInfantInSeat, 'InfantinSeat increment button')
		}
	}
	async selectInfantInLap(infantInLapNumber) {
		for (let i = 0; i < infantInLapNumber; i++) {
			await this.actions.waitForDisplayed(incrementInfantInLap, 'increment button for InfantInLap')
			await this.actions.clickElement('click', incrementInfantInLap, 'Infant in Lap increment button')
		}
	}
	async newWindowURL(url) {
		await this.actions.setWindowSize(1000, 500)
		await this.actions.newWindow(url)
	}

	async closeFirstTab() {
		await this.actions.closeAllButFirstTab()
	}

	async openDepartureDateCalendar() {
		await this.actions.pause(3000)
		await this.actions.waitForDisplayed(dateExpand, 'Date Expand Button', 50000)
		// await this.actions.waitForEnabled(dateExpand, 'Date Expand Button')
		// await this.actions.waitForClickable(dateExpand, 'dateExpand button')
		// await this.actions.pause(3000)
		// await this.actions.clickElement('click', dateExpand, "date expand button")
		await this.actions.click(dateExpand, "date expand button")
		await this.actions.pause(3000)
	}

	async getmarket() {
		let env;
		process.env.ENV = await this.actions.getUrl()
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
		await this.actions.clickElement('click', origin, "origin input field")
		await this.actions.setInputField('setValue', departure, originloc, "origin-input-field")
		await this.actions.pressButton("Enter", 'press')
	}

	async selectDestination(arrival) {
		await this.actions.scroll(oneWay)
		await this.actions.clickElement('click', destination, "destination input field")
		await this.actions.setInputField('setValue', arrival, destinationloc, "destination-input-field")
		await this.actions.pressButton("Enter", 'press')
		await this.actions.pause(3000)
		await this.actions.pressButton("Enter", 'press')
		await this.actions.pause(5000)
	}

}
export default HomePage
export { BookingDisabledFromMonth, billboardNameList }