import Actions from '../../src/support/actions.js';
import Check from '../../src/support/validations.js';
import market from '../../utility/market-OneDayflight.js'
import GqlCall from '../../utility/graph-ql-call.js'
import GetOrder from '../../utility/getOrder.js';
import jsonPath from 'jsonpath'


const manageTripLink = "[data-hook='header-top-bar-menu-item_manage-trip']"
const checkInLink = "[data-hook='header-top-bar-menu-item_check-in']"
const myTripText = "//*[contains(text(),'FIND MY TRIP')]"
const firstName = "[data-hook='lookup-page-input-first-name_firstName']"
const lastName = "[data-hook='lookup-page-input-last-name_lastName']"
const confirmNumber = "[data-hook='lookup-page-input-confirmation-number_orderNumber']"
const findTrip = "[data-hook='lookup-page-lookup-button']"
const Managetrip = "(//*[contains(text(),'Manage Trip')])[2]"
const cc_confirmation = "[data-hook='lookup-page-input-confirmation-number']"
const cc_search = "(//span[@class='Button__ButtonText-sc-1ececxa-0 fFLZUm'])[2]"
class GqlBookingPage {

	// async getEnvironment() {
	// 	let env = process.env.ENV
	// 	return env
	// }
	async getEnvironment() {
		let env;
		try {

			let envs = process.env.appEnv
			let value = envs.split('www')[1]
			value = value.split('.allegiantair.com')[0]
			env = value
			console.log(env)
			return env
		}
		catch {
			throw new Error("Unable to build the environment,please recheck the details")
		}
	}

	async getmarket(env) {
		let src, dest
		var citypair = await market(env)
		var dataCollected = citypair.dataCollected;
		if (dataCollected === undefined || dataCollected.length === 0) {
			throw new Error("GQL Flight booking failed due to unavailability of flights")
		}
		console.log("OLCI origin ", dataCollected[0].origin)
		console.log("OLCI destination ", dataCollected[0].destination)
		src = dataCollected[0].origin
		dest = dataCollected[0].destination
		return {
			src,
			dest,
		}
	}

	async clickManageTrip() {
		await actions.pause(5000)
		await actions.waitForDisplayed(manageTripLink, 'manageTripLink')

		if (await actions.isDisplayed(manageTripLink, 'manageTripLink')) {
			await actions.waitForClickable(manageTripLink, 'manageTripLink')
			await actions.click(manageTripLink, 'manageTripLink')
			console.log("Successfully clicked manageTrip link")
		}
	}

	async clickCheckIn() {
		await actions.pause(5000)
		await actions.waitForDisplayed(checkInLink, 'checkInLink')

		if (await actions.isDisplayed(checkInLink, 'checkInLink')) {
			await actions.waitForClickable(checkInLink, 'checkInLink')
			await actions.click(checkInLink, 'checkInLink')
			console.log("Successfully clicked CheckIn link")
		}
	}

	async enterOLCIdetails() {
		await actions.pause(2000)
		await actions.waitForDisplayed(myTripText, 'myTripText')

		if (await actions.isDisplayed(myTripText, 'myTripText')) {

			await actions.waitForClickable(firstName, 'first name')
			await actions.click(firstName, 'first name')
			await actions.setValue(process.env.OLCIfirstName, firstName, 'first name')

			await actions.waitForClickable(lastName, 'last name')
			await actions.click(lastName, 'last name')
			await actions.setValue(process.env.OLCIlastName, lastName, 'last name')

			await actions.waitForClickable(confirmNumber, 'confirm number')
			await actions.click(confirmNumber, 'confirm number')
			await actions.setValue(process.env.OLCIconfNumber, confirmNumber, 'confirm Number')

			await actions.waitForClickable(findTrip, 'find trip')
			await actions.click(findTrip, 'find trip')
		}
	}

	async enterCCOLCIdetails() {
		let itn_number;
		if (process.env.confNumber == undefined || process.env.confNumber == '' || process.env.confNumber == null) {
			// Parse confirmationNumber if it's a JSON string to extract the actual confirmation number
			try {
				if (process.env.confirmationNumber && process.env.confirmationNumber.startsWith('{')) {
					let bookingData = JSON.parse(process.env.confirmationNumber);
					itn_number = bookingData.confirmationNumber;
				} else {
					itn_number = process.env.confirmationNumber;
				}
			} catch (error) {
				console.log("Error parsing confirmation number:", error);
				itn_number = process.env.confirmationNumber;
			}
		}
		else {
			itn_number = process.env.confNumber
		}
		await actions.pause(20000)
		let ManageTripisdispalyed = await actions.isDisplayed(Managetrip, 'Managetrip')
		if (ManageTripisdispalyed) {
			console.log("ManageTip heading is displayed")
			console.log("ITN:", itn_number)
			await actions.waitForClickable(cc_confirmation, 'cc_confirmation')
			await actions.click(cc_confirmation, 'cc_confirmation')
			await actions.setValue(itn_number, cc_confirmation, 'confirm Number')

			await actions.waitForClickable(cc_search, 'cc_search')
			await actions.click(cc_search, 'cc_search')
			await actions.pause(10000)
			const handles = await browser.getWindowHandles();
			console.log("Windows count ", handles.length);
			await browser.switchToWindow(handles[handles.length - 1]);
			console.log("browserurl:", await browser.getUrl())
			// await browser.switchWindow('/manage-travel');
			await actions.pause(10000)
		} else {
			console.log("Manage trip is not dispalyed")
		}
	}
	async enterOWDomesticdetails() {
		await actions.pause(2000)
		await actions.waitForDisplayed(myTripText, 'myTrip text')

		if (await actions.isDisplayed(myTripText, 'myTrip Text')) {

			await actions.waitForClickable(firstName, 'first name')
			await actions.click(firstName, 'first name')
			await actions.setValue(process.env.OWDomFirstName, firstName, 'firstName')

			await actions.waitForClickable(lastName, 'last name')
			await actions.click(lastName, 'last name')
			await actions.setValue(process.env.OWDomLastName, lastName, 'lastName')

			await actions.waitForClickable(confirmNumber, 'confirm number')
			await actions.click(confirmNumber, 'confirm number')
			await actions.setValue(process.env.OWDomConfNumber, confirmNumber, 'confirm Number')

			await actions.waitForClickable(findTrip, 'find trip')
			await actions.click(findTrip, 'find trip')
		}
	}

	async enterRTDomesticdetails() {
		await actions.pause(2000)
		await actions.waitForDisplayed(myTripText, 'myTrip Text')

		if (await actions.isDisplayed(myTripText, 'myTrip Text')) {

			await actions.waitForClickable(firstName, 'first name')
			await actions.click(firstName, 'first name')
			await actions.setValue(process.env.RTDomFirstName, firstName, 'firstName')

			await actions.waitForClickable(lastName, 'last name')
			await actions.click(lastName, 'last name')
			await actions.setValue(process.env.RTDomLastName, lastName, 'lastName')

			await actions.waitForClickable(confirmNumber, 'confirm Number')
			await actions.click(confirmNumber, 'confirma number')
			await actions.setValue(process.env.RTDomConfNumber, confirmNumber, 'confirmNumber')

			await actions.waitForClickable(findTrip, 'find trip')
			await actions.click(findTrip, 'find trip')
		}
	}

	async getBookingValues() {
		try {
			let gqlCall = new GqlCall(await this.getEnvironment())
			let itineraryDetails = new GetOrder(gqlCall)

			let resultsJson = await itineraryDetails.getItineraryDetails(process.env.firstName, process.env.lastName, process.env.confNumber)
			let newResponse = {}
			newResponse.firstName = (jsonPath.query(resultsJson, '$..order.travelers[0].firstName'))[0]
			newResponse.lastName = (jsonPath.query(resultsJson, '$..order.travelers[0].lastName'))[0]
			newResponse.confirmationNumber = (jsonPath.query(resultsJson, '$..confirmationNumber'))[0]
			newResponse.origin = (jsonPath.query(resultsJson, '$..items[0].flight.origin.code'))[0]
			newResponse.destination = (jsonPath.query(resultsJson, '$..order.items[0].flight.destination.code'))[0]

			if ((jsonPath.query(resultsJson, '$..findOrder.order.loyaltyCustomer')).length != 0) {
				newResponse.customerType = (jsonPath.query(resultsJson, '$..findOrder.order.loyaltyCustomer.__typename'))[0]
				newResponse.email = (jsonPath.query(resultsJson, '$..findOrder.order.loyaltyCustomer.email'))[0]
			}

			switch ((jsonPath.query(resultsJson, '$..findOrder.order.items..price.discountType'))[0]) {
				case "ROUND_TRIP":
					{
						newResponse.tripType = (jsonPath.query(resultsJson, '$..findOrder.order.items..price.discountType'))[0]
						newResponse.departTripDepartingTime = (jsonPath.query(resultsJson, '$..findOrder.order.items[0].flight.departingTime'))[0]
						// newResponse.departTripArrivalTime = (jsonPath.query(resultsJson, '$..findOrder.order.items[0].flight.arrivalTime'))[0]
						newResponse.returnTripDepartingTime = (jsonPath.query(resultsJson, '$..findOrder.order.items[1].flight.departingTime'))[0]
						// newResponse.returnTripArrivalTime = (jsonPath.query(resultsJson, '$..findOrder.order.items[1].flight.arrivalTime'))[0]
						newResponse.depFlightID = (jsonPath.query(resultsJson, '$..findOrder.order.items[0].flight.id'))[0]
						newResponse.retFlightID = (jsonPath.query(resultsJson, '$..findOrder.order.items[1].flight.id'))[0]
						break;
					}
				default:
					newResponse.tripType = "ONE_WAY"
					newResponse.departingTime = (jsonPath.query(resultsJson, '$..findOrder.order.items[0].flight.departingTime'))[0]
					newResponse.arrivalTime = (jsonPath.query(resultsJson, '$..findOrder.order.items[0].flight.arrivalTime'))[0]
					newResponse.depFlightID = (jsonPath.query(resultsJson, '$..findOrder.order.items[0].flight.id'))[0]
					break;
			}

			if ((jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.type == "ADULT")]')).length != 0) {
				newResponse.adultsCount = (jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.type == "ADULT")]')).length
			}
			if ((jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.type == "CHILD")]')).length != 0) {
				newResponse.childCount = (jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.type == "CHILD")]')).length
			}
			if ((jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.type == "INFANT_IN_SEAT")]')).length != 0) {
				newResponse.seatInfantCount = (jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.type == "INFANT_IN_SEAT")]')).length
			}
			if ((jsonPath.query(resultsJson, `$..findOrder.order.travelers..ssrs[?(@.code== "INFT" && @.flightId == "${newResponse.depFlightID}")]`)).length != 0) {
				newResponse.lapInfantCount = (jsonPath.query(resultsJson, `$..findOrder.order.travelers..ssrs[?(@.code== "INFT" && @.flightId == "${newResponse.depFlightID}")]`)).length
			}

			let bundleType = (jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "BundleOrderItem")]'))
			if (bundleType.length != 0) {
				newResponse.bundleType = (jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "BundleOrderItem")].bundle.name'))[0]
			}

			let travelerCount = jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.__typename == "Traveler")]').length
			let depSeatMap = []
			let retSeatMap = []
			for (let i = 1; i <= travelerCount; i++) {
				let depSeatAvailable = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "SeatOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.travelerId== "${i}")]`))
				if (depSeatAvailable.length != 0) {
					let depSeatRow = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "SeatOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.travelerId== "${i}")].row`))
					let depSeatColumn = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "SeatOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.travelerId== "${i}")].column`))
					depSeatMap.push(`Traveler ${i} : ${depSeatRow}${depSeatColumn}`)
					newResponse.depSeatNumber = depSeatMap
				}

				let retSeatAvailable = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "SeatOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.travelerId== "${i}")]`))
				if (retSeatAvailable.length != 0) {
					let retSeatRow = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "SeatOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.travelerId== "${i}")].row`))
					let retSeatColumn = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "SeatOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.travelerId== "${i}")].column`))
					retSeatMap.push(`Traveler ${i} : ${retSeatRow}${retSeatColumn}`)
					newResponse.retSeatNumber = retSeatMap
				}
			}

			//ancillaries
			let checkInBagDep = []
			let checkInBagRet = []
			let carryOnBagDep = []
			let carryOnBagRet = []
			let priorityBoardingDep = []
			let priorityBoardingRet = []

			switch ((jsonPath.query(resultsJson, '$..findOrder.order.items..price.discountType'))[0]) {
				case "ROUND_TRIP":
					for (let i = 1; i <= travelerCount; i++) {
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CHECK_IN_BAG" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let checkDep = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CHECK_IN_BAG" && @.travelerId== "${i}")].quantity`))
							checkInBagDep.push(`Traveler ${i}: ${checkDep}`)
							newResponse.depCheckinBag = checkInBagDep
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.ancillaryType== "CHECK_IN_BAG" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let checkRet = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.ancillaryType== "CHECK_IN_BAG" && @.travelerId== "${i}")].quantity`))
							checkInBagRet.push(`Traveler ${i}: ${checkRet}`)
							newResponse.retCheckinBag = checkInBagRet
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CARRY_ON_BAG" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let carryDep = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CARRY_ON_BAG" && @.travelerId== "${i}")].quantity`))
							carryOnBagDep.push(`Traveler ${i}: ${carryDep}`)
							newResponse.depCarryOnBag = carryOnBagDep
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.ancillaryType== "CARRY_ON_BAG" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let carryRet = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.ancillaryType== "CARRY_ON_BAG" && @.travelerId== "${i}")].quantity`))
							carryOnBagRet.push(`Traveler ${i}: ${carryRet}`)
							newResponse.retCarryOnBag = carryOnBagRet
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "PRIORITY_BOARDING" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let priorityDep = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "PRIORITY_BOARDING" && @.travelerId== "${i}")].quantity`))
							priorityBoardingDep.push(`Traveler ${i}: ${priorityDep}`)
							newResponse.depPriorityBoarding = priorityBoardingDep
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.ancillaryType== "PRIORITY_BOARDING" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let priorityRet = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.retFlightID}" && @.ancillaryType== "PRIORITY_BOARDING" && @.travelerId== "${i}")].quantity`))
							priorityBoardingRet.push(`Traveler ${i}: ${priorityRet}`)
							newResponse.retPriorityBoarding = priorityBoardingRet
						}
					}
					break;
				default:
					for (let i = 1; i <= travelerCount; i++) {
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CHECK_IN_BAG" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let checkDep = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CHECK_IN_BAG" && @.travelerId== "${i}")].quantity`))
							checkInBagDep.push(`Traveler ${i}: ${checkDep}`)
							newResponse.depCheckinBag = checkInBagDep
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CARRY_ON_BAG" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let carryDep = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "CARRY_ON_BAG" && @.travelerId== "${i}")].quantity`))
							carryOnBagDep.push(`Traveler ${i}: ${carryDep}`)
							newResponse.depCarryOnBag = carryOnBagDep
						}
						if ((jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "PRIORITY_BOARDING" && @.travelerId== "${i}")].quantity`)).length != 0) {
							let priorityDep = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.__typename== "TravelerAncillaryOrderItem" && @.flightId== "${newResponse.depFlightID}" && @.ancillaryType== "PRIORITY_BOARDING" && @.travelerId== "${i}")].quantity`))
							priorityBoardingDep.push(`Traveler ${i}: ${priorityDep}`)
							newResponse.depPriorityBoarding = priorityBoardingDep
						}
					}
					break;
			}

			let tripflexAvailable = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.ancillaryType== "TRIP_FLEX")]`))
			if (tripflexAvailable.length != 0) {
				newResponse.tripflex = (jsonPath.query(resultsJson, `$..findOrder.order.items[?(@.ancillaryType== "TRIP_FLEX")].quantity`))[0]
			}

			let deptravelerSSRList = []
			let rettravelerSSRList = []
			jsonPath.query(resultsJson, '$..findOrder.order.travelers[?(@.__typename == "Traveler")]').forEach((_element, i) => {
				if ((jsonPath.query(resultsJson, `$..findOrder.order.travelers[${i}].ssrs[?(@.__typename== "Ssr")]`)).length > 0) {
					let depList = (jsonPath.query(resultsJson, `$..findOrder.order.travelers[${i}].ssrs[?(@.__typename== "Ssr" && @.flightId == "${newResponse.depFlightID}")].code`))
					deptravelerSSRList.push(`Traveler ${i + 1}: ${depList}`)
				}
				if ((jsonPath.query(resultsJson, `$..findOrder.order.travelers[${i}].ssrs[?(@.__typename== "Ssr")]`)).length > 0) {
					let retList = (jsonPath.query(resultsJson, `$..findOrder.order.travelers[${i}].ssrs[?(@.__typename== "Ssr" && @.flightId == "${newResponse.retFlightID}")].code`))
					rettravelerSSRList.push(`Traveler ${i + 1}: ${retList}`)
				}
			});
			if (deptravelerSSRList.length > 0) {
				newResponse.departSSRTravelerList = deptravelerSSRList
			}
			if (rettravelerSSRList.length > 0) {
				newResponse.returnSSRTravelerList = rettravelerSSRList
			}

			let hotelAvailable = (jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "HotelOrderItem")]'))
			if (hotelAvailable.length != 0) {
				newResponse.hotelName = `${(jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "HotelOrderItem")].hotel.name'))[0]}`
				newResponse.roomType = `${(jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "HotelOrderItem")].roomType'))[0]}`
			}

			let vehicleAvailable = (jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "VehicleOrderItem")]'))
			if (vehicleAvailable.length != 0) {
				let vehicleName = `${(jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "VehicleOrderItem")].vehicle.category'))[0]} ${(jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "VehicleOrderItem")].vehicle.type'))[0]}`
				newResponse.vehicleName = vehicleName
				let vendorName = (jsonPath.query(resultsJson, '$..findOrder.order.items[?(@.__typename== "VehicleOrderItem")].vendor.name'))[0]
				newResponse.vendorName = vendorName
			}

			if (jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "CreditCardPayment")]').length > 0) {
				newResponse.cardpaymentMethod = jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "CreditCardPayment")].paymentMethod')[0]
				newResponse.cardName = jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "CreditCardPayment")].cardName')[0]
				newResponse.cardNumber = jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "CreditCardPayment")].cardNumber')[0]
			}

			if (jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "VoucherPayment")]').length > 0) {
				newResponse.voucherpaymentMethod = jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "VoucherPayment")].paymentMethod')[0]
				newResponse.voucherType = jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "VoucherPayment")].type')[0]
				newResponse.voucherNumber = jsonPath.query(resultsJson, '$..findOrder.order.payments[?(@.__typename== "VoucherPayment")].id')[0]
			}

			console.log(`*****************************`)
			console.log(newResponse)
			console.log(`*****************************`)
			process.env.confirmationNumber = JSON.stringify(newResponse, null, 2)

			// with delimiter
			// let itnDetails = Object.entries(newResponse).map(([key, value]) => `${key}: ${value}`).join('\n| ')
			// console.log(itnDetails)
			// process.env.confirmationNumber = itnDetails

		} catch (error) {
			console.log(error)
			console.log(`Itinerary Details not captured to display in CAT`)
		}
	}

}
export default new GqlBookingPage();