import actions from '@g4/prova-ui/src/support/actions'
import { assert } from 'chai';
import { firstName, lastName } from './travellersPageObject'
import { seatIdDepart, seatIdReturn } from './seatsPageObject'
import { hotelsPageCollectorCP, hotelsDetailsPageCollectorCP } from './hotelPageObject'
import { CarsPageCollectorCP } from './carsPageObject'
import { paymentPageCollector } from './paymentPageObj';
import { flightPageCollector } from '../page-objects/flightsPageObject.js'
import fetch from 'node-fetch';
import graphqlQueryConfirmationPage from '../utility/graphqlQueryConfirmationPage.js';
import manageTravel from './manageTravel.js';
import jsonPath from 'jsonpath'

const iframe1 = "//iframe[contains(@title,'Rokt placement')]"
const iframe2 = "[title='Rokt offer']"
const buttonselector = "//button[@title='Close']"
const scrollitn = "[data-hook='confirmation-page-section_customer-info_title']"
const itnNumber = "[data-hook='confirmation-number_text']"
const scrollmanage = "[data-hook='confirmation-page-section_customer-info_title']"
const managetravell = "[data-hook='button-view-update-trip']"
const departingSeatAssigned = "(//div[@data-hook='confirmation-page-flight-departing']//td//span[normalize-space(text())='Seat Assignment']/../..)[X]"
const repartingSeatAssigned = "(//div[@data-hook='confirmation-page-flight-returning']//td//span[normalize-space(text())='Seat Assignment']/../..)[X]"
const customerFullName = "[data-hook='customer-full-name']"
const customerEmail = "[data-hook='confirmation-page-thank-you-message_email']"
const travelerName = "//div[1]/div[1]/div[2]/div[1]/div[3]/div[X]/div[1]/div[1]/div[1]/span[1]"
const departingCarryOnBag = "(//div[@data-hook='confirmation-page-flight-departing']//td//span[normalize-space(text())='Carry-On']/../..)[X]"
const returningCarryOnBag = "(//div[@data-hook='confirmation-page-flight-returning']//td//span[normalize-space(text())='Carry-On']/../..)[X]"
const totalPax = "//div[@data-hook='confirmation-page-flight-departing']//div[@display='flex']"
const departingCheckedBag = "(//div[@data-hook='confirmation-page-flight-departing']//td//span[contains(text(),'Checked Bag')]/../..)[X]"
const returningCheckedBag = "(//div[@data-hook='confirmation-page-flight-returning']//td//span[contains(text(),'Checked Bag')]/../..)[X]"
const returnSeg = "(//div[@data-hook='confirmation-page-flight-returning'])"
const departingPriorityAccess = "(//div[@data-hook='confirmation-page-flight-departing']//span[contains(normalize-space(text()),'Priority Access')])[X]"
const returningPriorityAccess = "(//div[@data-hook='confirmation-page-flight-returning']//span[contains(normalize-space(text()),'Priority Access')])[X]"
const hotelStayDetailstext = "//span[@data-hook='confirmation-page-booked-hotel_stay_details_label']"
const hotelsTitle = "[data-hook='confirmation-page-section_hotel_title']"
const hotelName = "[data-hook='confirmation-page-booked-hotel_name']"
const hotelAddress = "[data-hook='confirmation-page-booked-hotel_address']"
const hotelConfirmationNumber = "[data-hook='confirmation-page-booked-hotel_confirmation_number_value']"
const hotelCheckInDate = "[data-hook='confirmation-page-booked-hotel_check_in_date']"
const hotelCheckOutDate = "[data-hook='confirmation-page-booked-hotel_checkout_time']"
const hotelRoomType = "[data-hook='confirmation-page-booked-hotel_room_value']"
const hotelNightsCount = "[data-hook='confirmation-page-booked-hotel_stay_length_value']"
const carTitle = "[data-hook='confirmation-page-section_car_title']"
const carVendorName = "[data-hook='confirmation-page-rented-car_vendor_name']"
const carType = "[data-hook='confirmation-page-rented-car_type_value']"
const carConfirmationNumber = "[data-hook='confirmation-page-rented-car_confirmation_number_value']"
const carPickupDate = "[data-hook='confirmation-page-rented-car_pick_up_date']"
const carDropOffDate = "[data-hook='confirmation-page-rented-car_drop_off_date']"
const travelerinfo = "[data-hook='confirmation-page-section_flight-traveler-info_title']"
const manageTripLink = "[data-hook='header-top-bar-menu-item_manage-trip']"

let itinerary

var travellerName = "QA TEST"

class ConfirmationPage {

	async manageframes() {
		await actions.pause(5000)
		let iframeVisibility = await actions.isDisplayed(iframe1, "first iframe")
		if (iframeVisibility) {
			await actions.switchToFrame(iframe1, "first iframe")
			// await actions.switchToFrame(iframe2, "second iframe")
			await actions.waitForDisplayed(buttonselector, 'buttonselector', 10000)
			await actions.waitForClickable(buttonselector, 'buttonselector')
			await actions.pause(5000)
			await actions.click(buttonselector, "button to close the ROKT pop-up")
			await actions.pause(5000)
			await actions.switchToParentFrame()
		}
		else {
			console.log("COOL!, No such Rocketer popup got displayed")
		}
	}

	async validateTravelerDetailsDisplayedCorrectly() {
		await this.manageframes()
		var fname = await firstName.split('|')
		for (var i = 0; i < fname.length; i++) {
			assert.equal(
				await actions.getText(travelerName.replace("X", i + 1), 'Traveler Info'),
				firstName.split('|')[i] + ' ' + lastName.split('|')[i],
				'Validation Failed: Traveler ' + i + 1 + ' is not displayed correctly'
			);
		}
	}

	async validateTravelerCarryOnBagDetailsDisplayedCorrectly(params) {
		var pax = params.split(' ')[0].split('-')[1]
		var segment = params.split(' ')[1].split('-')[1]
		if (pax.includes("all")) {
			await actions.scroll(travelerinfo)
			await $(totalPax).waitForDisplayed()
			var all = await browser.$$(totalPax)
			for (var i = 0; i < all.length; i++) {
				if (segment.includes("departing") || segment.includes("both")) {
					assert.equal(
						(await $(departingCarryOnBag.replace("X", i + 1)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
						'1 Carry-On',
						'Validation Failed: Traveler ' + Number(i) + Number(1) + ' CarryOn bag is not displayed correctly for departing seg'
					);
				}
				if (segment.includes("returning") || (segment.includes("both") && (await $(returnSeg).isDisplayed()) === true)) {
					assert.equal(
						(await $(returningCarryOnBag.replace("X", i + 1)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
						'1 Carry-On',
						'Validation Failed: Traveler ' + Number(i) + Number(1) + ' CarryOn bag is not displayed correctly for returning seg'
					);
				}
			}
		}
		else {
			if (segment.includes("departing") || segment.includes("both")) {
				assert.equal(
					(await $(departingCarryOnBag.replace("X", pax)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
					'1 Carry-On',
					'Validation Failed: Traveler ' + pax + ' CarryOn bag is not displayed correctly for departing seg'
				);
			}
			if (segment.includes("returning") || (segment.includes("both") && (await $(returnSeg).isDisplayed()) === true)) {
				assert.equal(
					(await $(departingCarryOnBag.replace("X", pax)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
					'1 Carry-On',
					'Validation Failed: Traveler ' + pax + ' CarryOn bag is not displayed correctly for returning seg'
				);
			}
		}
	}
	async validateTravelerCheckBagDetailsDisplayedCorrectly(params) {
		var pax = params.split(' ')[0].split('-')[1]
		var segment = params.split(' ')[1].split('-')[1]
		var count = params.split(' ')[2].split('-')[1]
		var bag = 'Bags'
		if (count === '1') {
			bag = 'Bag'
		}
		if (pax.includes("all")) {
			await actions.waitForDisplayed(totalPax, 'Total Pax')
			var all = await browser.$$(totalPax)
			for (var i = 0; i < all.length; i++) {
				if (segment.includes("departing") || segment.includes("both")) {
					assert.equal(
						(await $(departingCheckedBag.replace("X", i + 1)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
						count + ' Checked ' + bag,
						'Validation Failed: Traveler ' + Number(i) + Number(1) + ' Check bag is not displayed correctly for depart seg'
					);
				}
				if (segment.includes("returning") || (segment.includes("both") && (await $(returnSeg).isDisplayed()) === true)) {
					assert.equal(
						(await $(returningCheckedBag.replace("X", i + 1)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
						count + ' Checked ' + bag,
						'Validation Failed: Traveler ' + Number(i) + Number(1) + ' Check bag is not displayed correctly for depart seg'
					);
				}
			}
		}
		else {
			if (segment.includes("departing") || segment.includes("both")) {
				assert.equal(
					(await $(departingCheckedBag.replace("X", pax)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
					count + ' Checked ' + bag,
					'Validation Failed: Traveler ' + pax + ' Check bag is not displayed correctly for depart seg'
				);
			}
			if (segment.includes("returning") || (segment.includes("both") && (await $(returnSeg).isDisplayed()) === true)) {
				assert.equal(
					(await $(returningCheckedBag.replace("X", pax)).getText()).replace(/(\r\n|\n|\r)/gm, " "),
					count + ' Checked ' + bag,
					'Validation Failed: Traveler ' + pax + ' Check bag is not displayed correctly for depart seg'
				);
			}
		}
	}
	async validateTravelerPriorityAccessDetailsDisplayedCorrectly(params) {
		var segment = params.split(' ')[1].split('-')[1]
		if (segment.includes("departing") || segment.includes("both")) {
			await actions.scroll(departingPriorityAccess.replace("X", 1))
			assert.equal(
				await actions.getText(departingPriorityAccess.replace("X", 1), 'Departing Priority Access Info'),
				'Priority Access',
				'Validation Failed: Segment ' + Number(1) + ' Priority Access is not displayed correctly for depart seg'
			);
		}

		if (segment.includes("returning") || segment.includes("both")) {
			await actions.scroll(returningPriorityAccess.replace("X", 1))
			assert.equal(
				await actions.getText(returningPriorityAccess.replace("X", 1), 'Returning Priority Access Info'),
				'Priority Access',
				'Validation Failed: Segment ' + Number(2) + ' Priority Access is not displayed correctly for return seg'
			);
		}
	}

	async validateSeatIdInConfirmationPage() {

		for (var i = 0; i < seatIdDepart.length; i++) {
			assert.equal(
				(await $(departingSeatAssigned.replace("X", i + 1)).getText()).replace(/(\r\n|\n|\r)/gm, " ").split(' ')[0],
				seatIdDepart[i],
				'Validation failed: Confirmation Page Departing Seat mismatch for pax: ' + Number(i) + Number(1)
			);
		}
		for (var i = 0; i < seatIdReturn.length; i++) {
			assert.equal(
				(await $(repartingSeatAssigned.replace("X", i + 1)).getText()).replace(/(\r\n|\n|\r)/gm, " ").split(' ')[0],
				seatIdReturn[i],
				'Validation failed: Confirmation Page Returning Seat mismatch for pax: ' + Number(i) + Number(1)
			);
		}
		while (seatIdDepart.length > 0) {
			seatIdDepart.pop()
			seatIdReturn.pop()
		}
	}

	async validateHotelName() {
		try {
			assert.equal(
				await actions.getText(hotelName, 'Hotel Name'),
				hotelsDetailsPageCollectorCP.get('hoteldetailsPageNameCP'),
				'Validation Failed: hotel Name is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelName, 'hotelName')) {
				console.log("Hotel Name " + (await actions.getText(hotelName, 'hotelName')));
			} else {
				assert.fail("Hotel Name is not Displayed");
			}
		}
	}

	async validateHotelTitle() {
		await actions.pressButton(['PgDn'])
		try {
			assert.equal(
				await actions.isDisplayed(hotelsTitle, 'hotelsTitle'),
				true,
				'Validation Failed: hotel title is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelsTitle, 'hotelsTitle')) {
				console.log("Hotel's Title : " + (await actions.getText(hotelsTitle, 'hotelsTitle')))
			} else {
				console.log("Hotel's Title Not Displayed")
			}
		}
	}

	async validateHotelAddress() {
		try {
			assert.equal(
				await actions.getText(hotelAddress, 'hotelAddress'),
				hotelsDetailsPageCollectorCP.get('hoteldetailsPageAddressCP'),
				'Validation Failed: hotel address is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelAddress, 'hotelAddress')) {
				console.log("Hotel Address : " + (await actions.getText(hotelAddress, 'hotelAddress')));
			} else {
				assert.fail("Hotel Address is not Displayed");
			}
		}
	}

	async validateHotelConfirmationNumber() {
		try {
			assert.equal(
				await actions.isDisplayed(hotelConfirmationNumber, 'hotelConfirmationNumber'),
				true,
				'Validation Failed: hotel confirmation number is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelConfirmationNumber, 'hotelConfirmationNumber')) {
				console.log("Hotel Confirmation Number is Displayed");
			} else {
				assert.fail("Hotel Confirmation Number is not Displayed");
			}
		}
	}
	async validateCheckInDate() {
		try {
			assert.equal(
				await actions.getText(hotelCheckInDate, 'hotelCheckInDate'),
				hotelsPageCollectorCP.get('checkInDateCP'),
				'Validation Failed: hotel checkin date is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelCheckInDate, 'hotelCheckInDate')) {
				console.log("Hotel Checkin Date : " + (await actions.getText(hotelCheckInDate, 'hotelCheckInDate')));
			} else {
				assert.fail("Hotel Checkin date is not Displayed");
			}
		}
	}

	async validateCheckOutDate() {
		try {
			assert.equal(
				await actions.getText(hotelCheckOutDate, 'hotelCheckOutDate'),
				hotelsPageCollectorCP.get('checkOutDateCP'),
				'Validation Failed: hotel checkOut date is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelCheckOutDate, 'hotelCheckOutDate')) {
				console.log("Hotel Checkin Date : " + (await actions.getText(hotelCheckOutDate, 'hotelCheckOutDate')));
			} else {
				assert.fail("Hotel Checkout date is not Displayed");
			}
		}
	}

	async validateRoomCountAndGuestCount() {

	}

	async validateRoomType() {
		await actions.waitForDisplayed(hotelRoomType, 'hotelRoomType')
		let roomtype = (await actions.getText(hotelRoomType, 'hotelRoomType')).trim();
		await actions.scroll(hotelRoomType)
		try {
			Console.log("Hotel Room Type is " + (await actions.getText(hotelRoomType, 'hotelRoomType')));
		}
		catch {
			console.log("Hotel Room Type Displayed");
		}
	}

	async validateNightsStay() {
		try {
			assert.equal(
				(await actions.getText(hotelNightsCount, 'hotelNightsCount')).split(" ", 1),
				hotelsPageCollectorCP.get('noOfNightsCP'),
				'Validation Failed: hotel number of nights is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(hotelNightsCount, 'hotelNightsCount')) {
				console.log("Hotel Nights Stay Count : " + (await actions.getText(hotelNightsCount, 'hotelNightsCount')).split(" ", 1));
			} else {
				assert.fail("Hotel Night Count Not Displayed");
			}
		}
	}

	async validateCarsTitle() {
		await actions.pressButton('PgDn')
		if (await actions.isDisplayed(carTitle, 'carTitle')) {
			console.log("Car's Title is: " + (await actions.getText(carTitle, 'carTitle')));
		} else {
			console.log("Car's Title Not Booking");
		}
	}

	async validateCarsConfirmationNumber() {
		try {
			assert.equal(
				await actions.isDisplayed(carConfirmationNumber, 'carConfirmationNumber'),
				true,
				'Validation Failed: Car confirmation number is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(carConfirmationNumber, 'carConfirmationNumber')) {
				console.log("Car Confirmation Number : " + (await actions.getText(carConfirmationNumber, 'carConfirmationNumber')));
			} else {
				assert.fail("Car Confirmation Number is not Displayed");
			}
		}
	}
	async validateCarsType() {
		try {
			assert.equal(
				await actions.getText(carType, 'carType'),
				CarsPageCollectorCP.get('vehicletypeCP'),
				'Validation Failed: vehicle type is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(carType, 'carType')) {
				console.log("Car Type is : " + (await actions.getText(carType, 'carType')));
			} else {
				assert.fail("Car Type is not Displayed");
			}
		}
	}

	async validateVendorName() {
		await actions.scroll(hotelStayDetailstext)
		try {
			assert.equal(
				await actions.isDisplayed(carVendorName, 'carVendorName'),
				true,
				'Validation Failed: vendor Name is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(carVendorName, 'carVendorName')) {
				console.log("Car Vendor name : " + (await actions.getText(carVendorName, 'carVendorName')));
			} else {
				assert.fail("Car Vendor name not Displayed");
			}
		}
	}

	async validatePickUpDate() {
		await actions.scroll(carPickupDate)
		try {
			assert.equal(
				(await actions.getText(carPickupDate, 'carPickupDate')).slice(0, 6),
				CarsPageCollectorCP.get('pickUpDateFieldCP'),
				'Validation Failed: pickup date is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(carPickupDate, 'carPickupDate')) {
				console.log("Car Pickup Date : " + (await actions.getText(carPickupDate, 'carPickupDate')).slice(0, 6));
			} else {
				assert.fail("Car Pickup Date is not Displayed");
			}
		}
	}

	async validateDropOffDate() {
		await actions.scroll(carDropOffDate)
		try {
			assert.equal(
				(await actions.getText(carDropOffDate, 'carDropOffDate')).slice(0, 6,),
				CarsPageCollectorCP.get('dropOffDateFieldCP'),
				'Validation Failed: drop off date is not displayed!'
			);
		}
		catch {
			if (await actions.isDisplayed(carDropOffDate, 'carDropOffDate')) {
				console.log("Car Dropoff Date : " + (await actions.getText(carDropOffDate, 'carDropOffDate')).slice(0, 6));
			} else {
				assert.fail("Car Dropoff Date is not Displayed");
			}
		}
	}

	async newtab() {
		let url = process.env.appEnv
		await actions.openWebsite(url)
		await actions.pause(20000)
		await actions.waitForDisplayed(manageTripLink, 'manageTripLink')

		if (await actions.isDisplayed(manageTripLink, 'manageTripLink')) {
			await actions.waitForClickable(manageTripLink, 'manageTripLink')
			await actions.click(manageTripLink, 'manageTripLink')
			console.log("Successfully clicked manageTrip link")
			await actions.pause(10000)
		}
	}


	async managetrip() {
		console.log(`Entered Manage Travel`)
		console.log(`process.env.SunSeekerPopUp => ${process.env.SunSeekerPopUp}`)

		// Validate payment completion before proceeding
		if (process.env.paymentCompleted !== "true") {
			throw new Error("Cannot access Manage Travel before payment is completed.")
		}

		if (process.env.SunSeekerPopUp) {
			try {
				let mturl = `${process.env.appEnv}manage-travel`
				console.log(mturl)
				await browser.newWindow(mturl)
				await browser.switchWindow('/manage-travel')
				await manageTravel.enterMTLookupDetails()
			} catch (error) {
				let urlMT = `${process.env.appEnv}manage-travel/${process.env.transactionid}/summary?orderNumber=${process.env.confirmationNumber}&firstName=QA&lastName=AUTOMATION`
				console.log(urlMT)
				await browser.newWindow(urlMT)
				await browser.switchWindow('/manage-travel')
			}
		} else {
			await this.manageframes()
			await actions.scroll(scrollmanage)
			// await actions.scroll(managetravell)
			await actions.clickElement('click', managetravell, "manage travel button")
			await actions.focusLastOpenedWindow()
		}
	}

	async verifyGraphQlNetwork() {
		console.log(`Entered GraphQl Network`)
		console.log("Current Page Url is " + await browser.getUrl());
		process.env.transactionid = (await browser.getUrl()).split("booking/")[1].split("/")[0]
		await this.fetchAPI(graphqlQueryConfirmationPage)
			.then(body => console.log(body))
			.catch(error => console.error(error))
	}

	async fetchAPI(query) {
		let reqURL = `${process.env.appEnv}graphql`
		console.log("reqURL")
		console.log(reqURL)

		var DepartDate = flightPageCollector.get('departDate')
		console.log("DepartDate")
		console.log(DepartDate)

		var ReturnDate = flightPageCollector.get('returnDate')
		console.log("ReturnDate")
		console.log(ReturnDate)

		let variables = {
			"origin": process.env.origin,
			"destination": process.env.arrival,
			"departureDate": DepartDate,
			"returnDate": ReturnDate
		}

		fetch(reqURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'transaction-id': process.env.transactionid
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Network response was not ok`)
				}
				return response.json()
			})
			.then(body => {
				console.log(body)
				var jsonLength = Object.keys(body.data).length;
				console.log(jsonLength); // 3
				assert.isTrue(jsonLength === 3, 'Response json length is not equal to 3')
				var confirmationNumber = jsonPath.query(body, '$..order.confirmationNumber')
				console.log(confirmationNumber);
				process.env.confirmationNumber = confirmationNumber

			})
			.catch(err => console.error('Error: ', err));
	}

	async validateCustomerNameAndEmailId() {
		await actions.scroll(customerEmail)
		assert.equal(
			await actions.getText(customerFullName, 'customerFullName'),
			paymentPageCollector.get('customerFirstName') + ' ' + paymentPageCollector.get('customerLastName'),
			'Validation Failed: customerName is not displayed correctly'
		);
		await $(customerEmail).scrollIntoView();
		assert.equal(
			await actions.getText(customerEmail, 'customerEmail'),
			paymentPageCollector.get('emailAddress'),
			'Validation Failed: emailAddress is not displayed correctly'
		);
	}
		async validateConfirmationPageOpened() {
		try {
			// Check if the URL contains confirmation
			const currentUrl = await browser.getUrl();
			assert.isTrue(currentUrl.includes('/confirmation'), 
				`Expected to be on confirmation page but current URL is: ${currentUrl}`);
			
			// Wait for confirmation page elements to be displayed
			await actions.waitForDisplayed(scrollitn, 'confirmation page section', 30000);
			
			// Verify that the confirmation number section is present
			const confirmationSectionDisplayed = await actions.isDisplayed(scrollitn, 'confirmation section');
			assert.isTrue(confirmationSectionDisplayed, 
				'Confirmation page section is not displayed');
			
			// Verify that the confirmation number is present
			await actions.waitForDisplayed(itnNumber, 'confirmation number', 15000);
			const confirmationNumberDisplayed = await actions.isDisplayed(itnNumber, 'confirmation number');
			assert.isTrue(confirmationNumberDisplayed, 
				'Confirmation number is not displayed on the page');
			
			// Verify that manage trip button is present
			await actions.waitForDisplayed(managetravell, 'manage trip button', 15000);
			const manageButtonDisplayed = await actions.isDisplayed(managetravell, 'manage trip button');
			assert.isTrue(manageButtonDisplayed, 
				'Manage trip button is not displayed on the confirmation page');
			
			console.log("Confirmation page validation passed - all required elements are present");
			return true;
			
		} catch (error) {
			console.error("Confirmation page validation failed:", error.message);
			throw new Error(`Confirmation page did not open properly: ${error.message}`);
		}
	}

	async confirmationNumber() {
		await this.manageframes()
		await actions.scroll(scrollitn)
		itinerary = await actions.getText(itnNumber, 'itnNumber')
		console.log("Generated ITN no : " + itinerary);
		process.env.confNumber = itinerary
		return itinerary
	}
}

export { itinerary }
export default new ConfirmationPage()