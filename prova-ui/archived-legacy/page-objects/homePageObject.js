import actions from "../../src/support/actions"
import check from "../../src/support/validations"

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
			await actions.waitFor(buttontoclosepopup, 5000)
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
		await actions.pause(3000)
		await actions.clickElement('click', dateExpand, "date expand button")

		// await check.isEnabled(departureDate,true,'date-selection field after city-pair selection')
	}

	async openReturningDateCalendar() {
		await actions.clickElement('click', returningDate, "returning date input field")
	}

	async chooseDepartingDate(dateNumber) {
		await actions.waitForDisplayed(departureDate, "departureDate")
		if (await actions.isEnabled(departureDate)) {
			let newDate = new Date();
			let { calendarMonthLeft, month, dayInt, nextDate } = await this.calculateDate(
				dateNumber,
				newDate
			);
			if (month === calendarMonthLeft) {
				await actions.clickElement('click', "button[data-hook='flight-search-date-picker_calendar-0_select-day-" +
					dayInt +
					"'][aria-hidden='false']", "depart calender date seclection")

			} else {
				await actions.clickElement('click', "button[data-hook='flight-search-date-picker_calendar-1_select-day-" +
					dayInt +
					"'][aria-hidden='false']", "depart calender date seclection")
			}
			return nextDate;
		} else {
			console.log("Expected Departing date is not enabled to select");
		}
	}

	async chooseReturningDate(dateNumber, departureDate) {
		if (await actions.isSelected(isRoundTripSelected)) {
			let returnDate = new Date();
			let { calendarMonthLeft, month, dayInt } = await this.calculateDate(
				dateNumber,
				departureDate
			);
			if (month === calendarMonthLeft) {
				await actions.clickElement('click', "button[data-hook='flight-search-date-picker_calendar-0_select-day-"+dayInt+"'][aria-hidden='false']", "return calender date seclection")
			} else {
				await actions.clickElement('click', "button[data-hook='flight-search-date-picker_calendar-1_select-day-"+dayInt+"'][aria-hidden='false']", "return calender date seclection")
			}
			return returnDate;
		}
	}

	async selectMonth(month, direction) {
		
		let calMonthLeft = await actions.getText(calendarMonthAndYearTextLeft,"calendarMonthAndYearTextLeft")
		let calendarMonthLeft = calMonthLeft
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
		let calMonthRight = await actions.getText(calendarMonthAndYearTextRight,"calendarMonthAndYearTextLeft")
		let calendarMonthRight = calMonthRight
			.toString()
			.split(' ')[0]
			.slice(0, 3)
			.trim();
			
		while (!(month === calendarMonthLeft || month === calendarMonthRight)) {
			let nextMonth = await actions.getAttribute(direction,"disabled","direction")
			if (nextMonth == null) {
				await actions.clickElement('click', direction, "direction")				
			} else {
				return null;
			}
			calMonthLeft = await actions.getText(calendarMonthAndYearTextLeft,"calendarMonthAndYearTextLeft")
			 
			calendarMonthLeft = calMonthLeft
				.toString()
				.split(' ')[0]
				.slice(0, 3)
				.trim();

			calMonthRight = await actions.getText(calendarMonthAndYearTextRight,"calendarMonthAndYearTextRight")			
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
		let calLeftData = await actions.getText(calendarMonthAndYearTextLeft,"calendarMonthAndYearTextLeft")
		let calendarYearLeft = calLeftData
			.toString()
			.split(' ')[1]
			.trim();
		let calRightData = await actions.getText(calendarMonthAndYearTextRight,"calendarMonthAndYearTextRight")			
		let calendarYearRight = calRightData
			.toString()
			.split(' ')[1]
			.trim();
		while (!(year === calendarYearLeft || year === calendarYearRight)) {
			await actions.clickElement('click', datePickerNext, "datePickerNext")

			calLeftData = await actions.getText(calendarMonthAndYearTextLeft,"calendarMonthAndYearTextLeft")
			calendarYearLeft = calLeftData
				.toString()
				.split(' ')[1]
				.trim();
			calRightData = await actions.getText(calendarMonthAndYearTextRight,"calendarMonthAndYearTextRight")			
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

}
export default new HomePage()
export { BookingDisabledFromMonth, billboardNameList }