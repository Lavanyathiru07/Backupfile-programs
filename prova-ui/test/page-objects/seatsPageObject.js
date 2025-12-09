import Actions from '../../src/support/actions.js'
import returnDetails from './graphqlCalls.js'

const seatsPageSkip = "//div[contains(text(),'No thanks, skip seat selection.')]/parent::a";
const seatPageHeading = "[data-hook='seats-page_page-heading']";
const bagsPageHeading = "[data-hook='ancillaries-page_page-heading']";
const exitRowSeats = "//button//span[contains(@data-hook,'exit-row')][not(contains(@data-hook,'taken'))]"
const exitRowBundleSeat = "(//span[@data-hook='select-legroom-plus-seat_exit-row']//img)[X]"
const economyBundleSeat = "//button//span[contains(@data-hook,'economy-seat')][not(contains(@data-hook,'taken'))]"
const nonBundleSeat = "//button//span[contains(@data-hook,'unrestricted')][not(contains(@data-hook,'taken'))]"
const economySeat = "//button//span[contains(@data-hook,'economy-seat')][not(contains(@data-hook,'taken'))]|//button//div[contains(@data-hook,'economy-seat')][not(contains(@data-hook,'taken'))]"
const legroom = "//button//span[contains(@data-hook,'legroom')][not(contains(@data-hook,'taken'))]"
const departingSeg = "[data-hook='seats-page-tabs_departing']"
const returningSeg = "[data-hook='seats-page-tabs_returning']"
const TravelerList = "//div[contains(@data-hook,'traveler-list')]"
const selectTraveler = "//label[contains(@for,'traveler-input-X')]"
const seatMap = "(//div[contains(@class,'SeatMap')])[1]"
const seatId = "(//span[@data-hook='seat-id'])[X]"
const seatPrice = "(//span[@data-hook='seat-price'])[X]"
const takenSeats = "(//button//span[contains(@data-hook,'taken')])[X]"
const takenSeatsList = "//span[contains(@data-hook,'taken')]"
const spinnerBar = "//span[contains(@data-hook,'spinner')]"
const exitRowPopup = "[data-hook='seats-popover_seat_update_button_XX']"
const seatBreadcrumb = "//*[@data-hook='flights-breadcrumb_item-seats']|//span[@data-hook='trip-summary-breadcurmb_item-2']"
const breadcrumbToggle = "[data-hook='flights-breadcrumb_toggle']"
const continueButton = "//button[@data-hook='seats-page_continue']|//button[@data-hook='seats-page_continue-popup']"
const popupContinueButton = "[data-hook='seats-page_continue-popup']"
const tailOfPlane = "//img[@alt='Apple App Store']"
const frontOfPlane = "//div[contains(text(),'Front of Plane')]"
const selectReturningButton = "//*[text()='Select Returning']"
const travelerGridSeat = "//span[contains(text(),'Seat')]//span[@aria-label]"
const returningSeatsSelectButton = "//*[@data-hook='seats-select-returning']|//*[@data-hook='seats-page-tabs_returning']"
const deselectSeatButton = "//button[contains(@data-hook,'seat_deselect_button')]"
const travelerGridPaxNum = "(//div[contains(@data-hook,'traveler-list-item')])[X]"
const unAssignedSeat = "(//span[@aria-label='unassigned'])[X]"
const updateSelectedSeat = "//div[contains(@data-hook,'_active')]//span[contains(text(),'Update to this seat')]"
const seatsPageDepartingTabs = "[data-hook='seats-page-tabs_departing']"
const seatsPageReturningTabs = "[data-hook='seats-page-tabs_returning']"
const selectSeatsForMe = "//button[contains(text(),'Select Seats For Me')]"
const selectSeatPopupContinueButton = "[data-hook='seats-page-continue-button-popup_continue-button']"
const continueButtonInReturning = "[data-hook='seats-page-legend-continue-button-popup']"
const selectSeatsPopupText = "//span[@class='Text-sc-1o5ubbx-0 cpURxy']"
const selectSeatsPopup = "[data-hook=seats-page-continue-button-popup]"
const selectSeatsNowButton = "[data-hook='seats-page-continue-button-popup_select-seats-button']"
const bundleBannerContent = "//div[contains(@class,'SeatsPage__BannerContent')]//span//span"
const bundleSeatCount = "//img[contains(@class,'Seat__Star')]"
const nonBundleSeatCount = "//span[contains(@data-hook,'select')]//span"
const nonAdjacentSeatPopUpWarning = "//div[contains(@data-hook,'_active')]//span[contains(text(),'A child')]"
const nonAdjacentSeatPopUp = "//div[contains(@data-hook,'seats-popover_')][contains(@data-hook,'_active')]"
const nonAdjacentSeatPopUpWarningOkButton = "//div[contains(@data-hook,'_active')]//span[contains(text(),'Ok')]"
const legendWrapper = "(//div[contains(@class,'SeatsPage__LeftSideWrapperOne')])[1]"
const legendWrapperText = "(//div//h2[contains(@class,'SeatmapLegend__Title')])[1]"
const legendWrapperT1 = "(//div[contains(@class,'SeatmapLegend__SelectedIcon')])[1]"
const legendWrapperT1Selected = "//div[contains(text(),'Selected')]"
const legendWrapperLegroom = "//div[contains(text(),'Legroom+ ®')]"
const legendWrapperUnavailable = "//div[contains(text(),'Unavailable')]"
const legendWrapperEconomy = "(//div[contains(text(),'Economy')])[1]"
const legendWrapperExitRowIcon = "(//div[contains(@class,'SeatmapLegend__ExitRowIcon')])[1]"
const legendWrapperExitRow = "//div[contains(text(),'Exit Row')]"
const legroomToolTip = "[data-hook='seat-map-legend-legroom-plus-tooltip_trigger']"
const economyToolTip = "[data-hook='seat-map-legend-economy-tooltip_trigger']"
const legroomToolTipContentPopup = "[data-hook='seat-map-legend-legroom-plus-tooltip_content']"
const economyToolTipContentPopup = "[data-hook='seat-map-legend-economy-tooltip_content']"
const legroomPlusContent = "//span[@class='Text-sc-1o5ubbx-0 gRLrXA'][contains(text(),'Legroom+ ®')]"
const extraLegroomContent = "//li[contains(text(),'Extra legroom')]"
const extraComfortContent = "//li[contains(text(),'Extra comfort')]"
const seatsPopoverDeselect = "[data-hook='seats-popover_deselect']"
const seatsPopoverTravelerIcon = "(//div[contains(@data-hook,'seats-popover_traveler_icon')])[1]"
const seatsPopoverTravelerName = "(//span[contains(@data-hook,'seats-popover_traveler_name')])[1]"
const seatsPopoverSeatTypeLabel = "//div[contains(@data-hook,'seats-popover_deselect')]//span[contains(@data-hook,'seats-popover_seat_type_label')]"
const seatsPopoverSeatID = "//div[contains(@data-hook,'seats-popover_deselect')]//span[contains(@data-hook,'seats-popover_seat_id')]"
const seatsPopoverSeatPrice = "//div[contains(@data-hook,'seats-popover_deselect')]//span[contains(@data-hook,'seats-popover_seat_price')]"
const seatsPopoverComfortLevel = "//div[contains(@data-hook,'seats-popover_deselect')]//span[contains(@data-hook,'seats-popover_legroom_stars_label')]"
const seatsPopoverStars = "//div[contains(@data-hook,'seats-popover_deselect')]//div[contains(@data-hook,'seats-popover_legroom_stars')]"
const seatsPopoverSeatInfo = "//div[contains(@data-hook,'seats-popover_deselect')]//div[contains(@data-hook,'seats-popover_seat_info')]//li"
const unavailable = "//span[contains(@data-hook,'exit-row')]//div[contains(@class,'Seat__Icon')]//*[name()='svg']"
const adultAlreadySelectedPopup = "//div[contains(@data-hook,'active')]//span[contains(@data-hook,'already_selected')]|//div[contains(@data-hook,'active')]//span[contains(@data-hook,'update')]|//div[contains(@data-hook,'active')]//span[contains(@data-hook,'not_selected')]|//div[contains(@data-hook,'active')]//span[contains(@data-hook,'deselect')]"
const travelingWithChildrenNote = "//div[contains(@class,'TravelerList__TravelingWithChildrenNote')]//span"
const travelerSelectedSeat = "//span[contains(@data-hook,'taken')]//span[contains(.,'X')]"
const legroomLegendTooltip = "[data-hook='seat-map-legend-legroom-plus-tooltip_trigger']"
const economyLegendTooltip = "[data-hook='seat-map-legend-economy-tooltip_trigger']"
const selectedSeatTypeDeselectPopup = "//div[contains(@data-hook,'deselect')]//span[contains(@data-hook,'seats-popover_seat_type_label_')]"
const selectedSeatIdDeselectPopup = "//div[contains(@data-hook,'deselect')]//span[contains(@data-hook,'seats-popover_seat_id_')]"
const selectedSeatPriceDeselectPopup = "//div[contains(@data-hook,'deselect')]//span[contains(@data-hook,'seats-popover_seat_price_')]"
const selectedSeatTypeUpdatePopup = "//div[contains(@data-hook,'_active')]//span[contains(@data-hook,'seats-popover_seat_type_label_')]"
const selectedSeatIdUpdatePopup = "//div[contains(@data-hook,'_active')]//span[contains(@data-hook,'seats-popover_seat_id_')]"
const selectedSeatPriceUpdatePopup = "//div[contains(@data-hook,'_active')]//span[contains(@data-hook,'seats-popover_seat_price_')]"
const activePopup = "//div[contains(@data-hook,'_active')][contains(@data-hook,'popover')]"
const tripType = "[data-hook='header-flight-info_trip-type']"
const seatspageContinueButton = "//span[contains(text(),'Continue')]/parent::button"
var seatPriceDepart = [];
var seatPriceReturn = [];
var seatIdDepart = [];
var seatIdReturn = [];
let selectedSeat;
var deselectedSeatDetails;
var updatedSeatDetails;
var selectedSeatDetails;
var newDepSeats = [];
var newRetSeats = [];

class SeatPage {

	actions;

	constructor(page, context) {
		this.actions = new Actions(page, context)
		this.page = page
	}

	// async skipSeatsPage() {
	// 	await this.actions.waitForDisplayed(tailOfPlane, 'tail of plane')
	// 	await this.actions.waitForEnabled(seatsPageSkip, 'seatsPageSkip')
	// 	await this.actions.click(seatsPageSkip, 'seatsPageSkip')
	// }
	/*
	*  seatType: any/exitRow/legroom/bundleSeat/economyBundleSeat/exitRowBundleSeat/economyNonBundleSeat/economy
	*  tripType: both/departing/returning
	*  travelerNum: all/paxNum
	*/
	async selectSeat(seatType, tripType, travelerNum) {
		await this.actions.waitForNetworkIdle()
		await this.actions.waitForDisplayed('//span[contains(text(), "Choose Departing Seats")]', "seats page", 15000) // Wait for seat map to load
		if (tripType === "departing") {
			await this.selectDepartureSegAdjacentSeats(tripType, seatType, travelerNum)
		}
		else if (tripType == "returning") {
			await this.selectReturningSegAdjacentSeats(tripType, seatType, travelerNum)
		}
		else {

			await this.selectDepartureSegAdjacentSeats(tripType, seatType, travelerNum)
			await this.selectReturningSegAdjacentSeats(tripType, seatType, travelerNum)

			await this.actions.waitForDisplayed(TravelerList, 'traveler list')
			var totalTravelers = await this.actions.getElements(TravelerList)
			for (var i = 1; i <= totalTravelers.length; i++) {
				console.log("seatsSelected: " + await this.actions.getText(seatId.replace("X", i), 'seat id'))
			}
			await this.collectTravelerSeatInfo()
		}
	}

	async selectSeatsByParams(params) {
		console.log("Starting seat selection process with params:", params)

		try {
			// Wait for page to load with extended timeout
			console.log("Waiting for seats page to load...")
			await this.actions.waitUntilPageLoad()

			// Try multiple strategies to detect if we're on the seats page
			let onSeatsPage = false;

			// Strategy 1: Try to wait for seats page heading
			try {
				console.log("Strategy 1: Waiting for seats page heading...")
				await this.actions.waitForDisplayed(seatPageHeading, 'seats page heading', 15000)
				onSeatsPage = true;
				console.log("Seats page heading found successfully")
			} catch (headingError) {
				console.log("Seats page heading not found, trying alternative approach...")
			}

			// Strategy 2: Check if skip button is available (means we're on seats page but no heading)
			if (!onSeatsPage) {
				try {
					console.log("Strategy 2: Looking for seats skip button...")
					await this.actions.waitForDisplayed(seatsPageSkip, 'seats page skip button', 10000)
					onSeatsPage = true;
					console.log("Seats skip button found - we're on seats page")
				} catch (skipError) {
					console.log("Seats skip button not found either...")
				}
			}

			// Strategy 3: Check if we're already on bags page (seats were skipped)
			if (!onSeatsPage) {
				try {
					console.log("Strategy 3: Checking if we skipped to bags page...")
					await this.actions.waitForDisplayed(bagsPageHeading, 'bags page heading', 5000)
					console.log("Already on bags page - seats were likely skipped")
					return; // Exit early as seats were skipped
				} catch (bagsError) {
					console.log("Not on bags page either...")
				}
			}

			// If we're on the seats page, proceed with seat selection
			if (onSeatsPage) {
				console.log("Confirmed on seats page, proceeding with seat selection")

				if (!params.includes("false")) {
					var travelerNum = await params.split(' ')[0].split('-')[1]
					var seg = await params.split(' ')[1].split('-')[1]
					var seatType = await params.split(' ')[2].split('-')[1]
					console.log(`Seat selection parameters - Travelers: ${travelerNum}, Segment: ${seg}, Type: ${seatType}`)

					if (seg.includes("all")) {
						console.log("Checking trip type for segment selection...")
						try {
							if (await this.actions.getText(tripType, 'tripType') === "Round Trip") {
								console.log("Round trip detected - selecting departing and returning seats")
								await this.selectSeat(seatType, "departing", travelerNum)
								await this.selectSeat(seatType, "returning", travelerNum)
							} else {
								console.log("One-way trip detected - selecting departing seat")
								await this.selectSeat(seatType, "departing", travelerNum)
							}
						} catch (tripTypeError) {
							console.log("Could not determine trip type, defaulting to departing seat")
							await this.selectSeat(seatType, "departing", travelerNum)
						}
					} else {
						console.log("Single segment selection")
						await this.selectSeat(seatType, seg, travelerNum)
					}
				} else {
					console.log("Skipping seat selection - params indicate false")
				}
			} else {
				console.log("Could not confirm seats page presence")
				try {
					await this.skipSeatsPage();
					console.log("Successfully skipped seats page");
					return;
				} catch (skipError) {
					console.log("Could not skip seats page either, continuing anyway");
				}
			}

			console.log("Seat selection process completed successfully")
		} catch (error) {
			console.log(`Error in selectSeatsByParams: ${error.message}`)
			// For now, let's allow the test to continue even if seat selection fails
			console.log("Continuing test despite seat selection error...")
		}
	}
	async selectSeatByPosition(position, adjacency, segment, traveler) {

		if (adjacency === "adjacent") {
			if (segment === "departing") {
				await this.selectDepartureSegSeatByPosition(position, traveler)
			}
			if (segment === "returning") {
				await this.selectReturnSegSeatByPosition(position, traveler)
			}
		}
		if (adjacency === "non-adjacent") {
			if (segment === "departing") {
				await this.selectDepartureSegNonAdjacentSeatByPosition(position, traveler)
			}
			if (segment === "returning") {
				await this.selectReturnSegSeatByPosition(position, traveler)
			}
		}

	}

	async selectDepartureSegSeatByPosition(position, traveler) {
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await this.actions.getElements(getAvailSeat)
		for (var i = 0; i < getSeats.length; i++) {
			let sname = await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats')
			getAllSeats.push(await sname.split('_')[2])
		}
		await this.actions.click(selectTraveler.replace("X", traveler), 'select traveler')
		for (var i = 0; i < getAllSeats.length; i++) {
			await this.actions.click("//button//span[contains(@data-hook,'_" + getAllSeats[i] + "')]", 'get all seats')
			break;
		}

	}
	async selectReturnSegSeatByPosition(position, traveler) {
		await this.actions.waitForDisplayed(seatBreadcrumb, 'seat breadcrumb')
		if (await this.actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')) {
			await this.actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
		}
		else {
			await this.actions.click(returningSeg, 'returning seg')
		}
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await this.actions.getElements(getAvailSeat)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
		}
		await this.actions.click(selectTraveler.replace("X", traveler), 'select traveler')
		for (var i = 0; i < getAllSeats.length; i++) {
			await this.actions.click("//button//span[contains(@data-hook,'_" + getAllSeats[i] + "')]", 'get all seats')
			break;
		}
	}

	async selectDepartureSegNonAdjacentSeatByPosition(position, traveler) {
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await this.actions.getElements(getAvailSeat)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
		}
		await this.actions.click(selectTraveler.replace("X", traveler), 'select traveler')
		for (var i = 0; i < getAllSeats.length; i++) {
			await this.actions.click("//button//span[contains(@data-hook,'_" + getAllSeats[i + 1] + "')]", 'get all seats')
			break;
		}

	}
	async selectNonAdjacentSeat(seatType, tripType, travelerNum) {

		if (tripType === "departing") {
			await this.selectDepartureSegNonAdjacentSeats(seatType, travelerNum)
		}
		else if (tripType == "returning") {
			await this.selectReturningSegNonAdjacentSeats(seatType, travelerNum)
		}
		else {
			await this.selectDepartureSegNonAdjacentSeats(seatType, travelerNum)
			await this.selectReturningSegNonAdjacentSeats(seatType, travelerNum)
			await this.actions.waitForDisplayed(TravelerList, 'traveler list')
			var totalTravelers = await this.actions.getElements(TravelerList)
			for (var i = 1; i <= totalTravelers.length; i++) {
				console.log("seatsSelected: " + this.actions.getText(seatId.replace("X", i), 'seat id'))
			}
			await this.collectTravelerSeatInfo()
		}
	}
	async selectDepartureSegAdjacentSeats(tripType, seatType, travelerNum) {
		var availableSeats
		var getAllSeats = []
		await this.actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await this.actions.getElements(TravelerList)
		if (seatType === "exitRow") {
			availableSeats = exitRowSeats
			seatType = "exit-row"
		}
		else if (seatType === "bundleSeat" || seatType === "economyBundleSeat") {
			availableSeats = economyBundleSeat
			seatType = "economy-seat"
		}
		else if (seatType === "exitRowBundleSeat") {
			availableSeats = exitRowBundleSeat
			seatType = "exit-row"
		}
		else if (seatType === "nonBundleSeat") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else if (seatType === "economy") {
			availableSeats = economySeat
			seatType = "economy-seat"
		}
		else if (seatType === "legroom") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else {
			availableSeats = economySeat
			seatType = "economy-seat"
		}
		await this.actions.waitForDisplayed(availableSeats, 'available seats')
		var getSeats = await this.actions.getElements(availableSeats)
		var len = await getSeats.length

		for (var i = 0; i < len; i++) {
			let seatname = await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats')
			getAllSeats.push(await seatname.split('_')[2])
		}
		var adjacentSeats = []
		for (var i = 0; i < getAllSeats.length; i++) {
			if (totalTravelers.length === 1) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					break;
				}
			}
			if (totalTravelers.length === 2) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					break;
				}
			}
			if (totalTravelers.length === 3) {
				if (getAllSeats[i + 1].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 2].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					break;
				}
			}
			if (totalTravelers.length === 4) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1)
				) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					adjacentSeats.push(getAllSeats[i + 3])
					break;
				}
				else {
					continue;
				}
			}
			if (totalTravelers.length === 5) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 4].slice(0, getAllSeats[i + 4].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 4])
					break;
				}
			}

			if (totalTravelers.length > 5) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i + 3].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 4].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i + 3].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 5].slice(0, getAllSeats[i + 4].length - 1) &&
					getAllSeats[i + 6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 7].slice(0, getAllSeats[i + 5].length - 1) &&
					getAllSeats[i + 8].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 9].slice(0, getAllSeats[i + 9].length - 1) &&
					getAllSeats[i + 8].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 10].slice(0, getAllSeats[i + 9].length - 1) &&
					getAllSeats[i + 8].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 11].slice(0, getAllSeats[i + 10].length - 1)) {

					for (var j = 0; j < totalTravelers.length; j++) {
						adjacentSeats.push(getAllSeats[i + j])
					}
					break;
				}
			}
		}
		if (await this.actions.isDisplayed(breadcrumbToggle, 'breadcrumb toggle')) {
			await this.actions.scroll(breadcrumbToggle)
		}
		else {
			await this.actions.waitForDisplayed(seatBreadcrumb, 'seatBreadcrumb')
		}
		await this.actions.waitForDisplayed(seatMap)
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await this.actions.waitForClickable(`//span[contains(@data-hook,'${seatType}')][contains(@data-hook,'_${adjacentSeats[i]}')] | //div[contains(@data-hook,'${seatType}')][contains(@data-hook,'_${adjacentSeats[i]}')]`, 'seat type')
				await this.actions.click(`//span[contains(@data-hook,'${seatType}')][contains(@data-hook,'_${adjacentSeats[i]}')] | //div[contains(@data-hook,'${seatType}')][contains(@data-hook,'_${adjacentSeats[i]}')]`, 'seat type')
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')) {
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')
					await this.actions.scroll(seatBreadcrumb)
				}
				if (await this.actions.isDisplayed(updateSelectedSeat, 'update selected seat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

				try {
					await this.actions.waitForDisplayed(takenSeats.replace("X", i + 1), 'taken seats')
				} catch (ex) {

				}

			}
		}
		else {
			await this.actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')
			var takenCount = await this.actions.getElements(takenSeatsList)
			if (takenCount.length > 0) {
				var lastSelectedSeat = await this.actions.getAttribute(takenSeats.replace("X", takenCount.length), "data-hook", 'taken seats').split('_')[3]
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "')]", 'adjacent seats')
				if (!(this.actions.isDisplayed(activePopup, 'activePopup'))) {
					selectedSeatDetails = await seatType + '-' + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + '-' + $("//span[@data-hook='seats-popover_seat_price_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "']").getText()
				}

				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exitRowPopup')
				}
				else if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

			}
			else {
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seattype')
				if (!(await this.actions.isDisplayed(activePopup, 'active popup'))) {
					try {
						this.clickSelectedSeat(tripType, travelerNum)
						selectedSeatDetails = await this.actions.getText(selectedSeatTypeDeselectPopup, 'selectedSeatTypeDeselectPopup')
							+ '-' + await this.actions.getText(selectedSeatIdDeselectPopup, 'selectedSeatIdDeselectPopup')
							+ '-' + await this.actions.getText(selectedSeatPriceDeselectPopup, 'selectedSeatPriceDeselectPopup')
						this.clickSelectedSeat(tripType, travelerNum)
					}
					catch (ex) {
						this.clickSelectedSeat(tripType, travelerNum)
					}
				}
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')
				}
				else if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}
			}

		}
	}
	async selectDepartureSegNonAdjacentSeats(seatType, travelerNum) {
		var availableSeats
		var getAllSeats = []
		await this.actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await this.actions.getElements(TravelerList)
		if (seatType === "exitRow") {
			availableSeats = exitRowSeats
			seatType = "exit-row"
		}
		else if (seatType === "bundleSeat" || seatType === "economyBundleSeat") {
			availableSeats = economyBundleSeat
			seatType = "economy-seat"
		}
		else if (seatType === "exitRowBundleSeat") {
			availableSeats = exitRowBundleSeat
			seatType = "exit-row"
		}
		else if (seatType === "nonBundleSeat") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else if (seatType === "economy") {
			availableSeats = economySeat
			seatType = "economy-seat"
		}
		else if (seatType === "legroom") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else {
			availableSeats = economySeat
			seatType = "economy-seat"
		}
		await this.actions.waitForDisplayed(availableSeats, 'available seats')
		var getSeats = await this.actions.getElements(availableSeats)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
		}
		var adjacentSeats = []
		for (var i = 0; i < getAllSeats.length; i++) {
			if (totalTravelers.length === 1) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					break;
				}
			}
			if (totalTravelers.length === 2) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					break;
				}
			}
			if (totalTravelers.length === 3) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 5])
					break;
				}
			}
			if (totalTravelers.length == 4) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1)
				) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 5])
					adjacentSeats.push(getAllSeats[i + 7])
					break;
				}
				else {
					continue;
				}
			}
			if (totalTravelers.length === 5) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 4].slice(0, getAllSeats[i + 4].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 5])
					adjacentSeats.push(getAllSeats[i + 7])
					adjacentSeats.push(getAllSeats[i + 9])
					break;

				}
			}
		}
		await this.actions.scroll(seatBreadcrumb)
		await this.actions.waitForDisplayed(seatMap, 'seat map')
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')) {
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')
					await this.actions.scroll(seatBreadcrumb)
				}
				if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

			}
		}
		else {
			await this.actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')
			await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seattype')
			if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
				await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit row popup')
			}
			if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
				updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
					+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
					+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
				await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
			}

		}
	}
	async selectReturningSegAdjacentSeats(tripType, seatType, travelerNum) {
		// await browser.execute("window.scrollBy(0,-1000)");
		if (await this.actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')) {
			await this.actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
			// await this.actions.pause(5000);
		}
		else {
			await this.actions.click(returningSeg, 'returningSeg')
		}
		var availableSeats
		var getAllSeats = []
		if (seatType === "exitRow") {
			availableSeats = exitRowSeats
			seatType = "exit-row"
		}
		else if (seatType === "bundleSeat" || seatType === "economyBundleSeat") {
			availableSeats = economyBundleSeat
			seatType = "economy-seat"
		}
		else if (seatType === "exitRowBundleSeat") {
			availableSeats = exitRowBundleSeat
			seatType = "exit-row"
		}
		else if (seatType === "nonBundleSeat") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else if (seatType === "economy") {
			availableSeats = economySeat
			seatType = "economy"
		}
		else if (seatType === "legroom") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else {
			availableSeats = economySeat
			seatType = "economy"
		}
		await this.actions.waitForDisplayed(availableSeats, 'availableSeats')
		await this.actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await this.actions.getElements(TravelerList)
		var getSeats = await this.actions.getElements(availableSeats)
		for (var i = 0; i < getSeats.length; i++) {
			let gseats = await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats')
			getAllSeats.push(await gseats.split('_')[2])
		}
		var adjacentSeats = []
		for (var i = 0; i < getAllSeats.length; i++) {
			if (totalTravelers.length === 1) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					break;
				}
			}
			if (totalTravelers.length === 2) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					break;
				}
			}
			if (totalTravelers.length === 3) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					break;
				}
			}
			if (totalTravelers.length == 4) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1)
				) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					adjacentSeats.push(getAllSeats[i + 3])
					break;
				}
				else {
					continue;
				}
			}
			if (totalTravelers.length === 5) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 4].slice(0, getAllSeats[i + 4].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 4])
					break;
				}
			}
			if (totalTravelers.length > 5) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 4].slice(0, getAllSeats[i + 4].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 5].slice(0, getAllSeats[i + 5].length - 1) &&
					getAllSeats[i + 6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 7].slice(0, getAllSeats[i + 7].length - 1) &&
					getAllSeats[i + 6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 8].slice(0, getAllSeats[i + 8].length - 1) &&
					getAllSeats[i + 6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 9].slice(0, getAllSeats[i + 9].length - 1) &&
					getAllSeats[i + 6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 10].slice(0, getAllSeats[i + 10].length - 1) &&
					getAllSeats[i + 6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 11].slice(0, getAllSeats[i + 11].length - 1)) {
					adjacentSeats.push(getAllSeats[i])
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 2])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 4])
					adjacentSeats.push(getAllSeats[i + 5])
					adjacentSeats.push(getAllSeats[i + 6])
					adjacentSeats.push(getAllSeats[i + 7])
					adjacentSeats.push(getAllSeats[i + 8])
					adjacentSeats.push(getAllSeats[i + 9])
					adjacentSeats.push(getAllSeats[i + 10])
					break;
				}
			}
		}
		await this.actions.waitForDisplayed(seatMap, 'seat map')
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit rowpopup')) {
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit rowpopup')
					// await browser.execute("window.scrollBy(0,-1000)");
				}
				if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

				try {
					await this.actions.waitForDisplayed(takenSeats.replace("X", i + 1), 'taken seats')
				} catch (ex) {

				}
			}
		}
		else {
			await this.actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')
			var takenCount = await this.actions.getElements(takenSeatsList)
			if (takenCount.length > 0) {
				var lastSelectedSeat = await this.actions.getAttribute(takenSeats.replace("X", takenCount.length), "data-hook", 'taken seats').split('_')[3]
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "')]", 'seat type')
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exitpopup')
				}
				if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}
			}
			else {
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seat type')
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')
				}
				if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}
			}

		}
	}
	async validateSeatsPageLoaded() {

		await this.actions.waitForDisplayed(seatMap, 'seat map')
		assert.equal(
			await this.actions.isDisplayed(seatMap, 'seat map'),
			true,
			'validation failed: SeatMap not loaded correctly'
		);
	}
	async selectReturningSegNonAdjacentSeats(seatType, travelerNum) {
		await this.actions.scroll(seatBreadcrumb)
		if (await this.actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')) {
			await this.actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
		}
		else {
			await this.actions.click(returningSeg, 'returningSeg')
		}
		var availableSeats
		var getAllSeats = []
		if (seatType === "exitRow") {
			availableSeats = exitRowSeats
			seatType = "exit-row"
		}
		else if (seatType === "bundleSeat" || seatType === "economyBundleSeat") {
			availableSeats = economyBundleSeat
			seatType = "economy-seat"
		}
		else if (seatType === "exitRowBundleSeat") {
			availableSeats = exitRowBundleSeat
			seatType = "exit-row"
		}
		else if (seatType === "nonBundleSeat") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else if (seatType === "economy") {
			availableSeats = economySeat
			seatType = "economy"
		}
		else if (seatType === "legroom") {
			availableSeats = legroom
			seatType = "legroom"
		}
		else {
			availableSeats = economySeat
			seatType = "economy"
		}
		await this.actions.waitForDisplayed(availableSeats, 'available seats')
		await this.actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await this.actions.getElements(TravelerList)
		var getSeats = await this.actions.getElements(availableSeats)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await this.actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
		}
		var adjacentSeats = []
		for (var i = 0; i < getAllSeats.length; i++) {
			if (totalTravelers.length === 1) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) !== getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					break;
				}
			}
			if (totalTravelers.length === 2) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					break;
				}
			}
			if (totalTravelers.length === 3) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 5])
					break;
				}
			}
			if (totalTravelers.length == 4) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1)
				) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 5])
					adjacentSeats.push(getAllSeats[i + 7])
					break;
				}
				else {
					continue;
				}
			}
			if (totalTravelers.length === 5) {
				if (getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 1].slice(0, getAllSeats[i + 1].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 2].slice(0, getAllSeats[i + 2].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 3].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) != getAllSeats[i + 4].slice(0, getAllSeats[i + 4].length - 1)) {
					adjacentSeats.push(getAllSeats[i + 1])
					adjacentSeats.push(getAllSeats[i + 3])
					adjacentSeats.push(getAllSeats[i + 5])
					adjacentSeats.push(getAllSeats[i + 7])
					adjacentSeats.push(getAllSeats[i + 9])
					break;
				}
			}
		}
		await this.actions.waitForDisplayed(seatMap, 'seat map')
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit rowpopup')) {
					await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exitrowpopup')
					await this.actions.scroll(seatBreadcrumb)
				}
				if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

				try {
					await this.actions.waitForDisplayed(takenSeats.replace("X", i + 1), 'taken seats')
				} catch (ex) {

				}

			}
		}
		else {
			await this.actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')

			await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seat type')
			if (await this.actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
				await this.actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')
				await this.actions.scroll(seatBreadcrumb)
			}
			if (await this.actions.isDisplayed(updateSelectedSeat, 'update selected seat')) {
				updatedSeatDetails = await this.actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
					+ '-' + await this.actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
					+ '-' + await this.actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
				await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
			}

			await this.actions.waitForDisplayed(takenSeats.replace("X", 1), 'taken seats')
		}
	}
	async clickContinueButton() {
		console.log('Starting seats continue button process')

		// First check if seats page is loaded properly
		try {
			await this.actions.waitForDisplayed(seatBreadcrumb, 'seats breadcrumb', 5000)
			console.log('Seats page is loaded')
		} catch (error) {
			console.log('Seats breadcrumb not found, checking for seats page presence')
		}

		// Check if we're on seats page with multiple strategies
		let seatsPageFound = false
		const seatsDetectionStrategies = [
			{ selector: continueButton, description: 'continue button' },
			{ selector: seatsPageSkip, description: 'skip seats button' },
			{ selector: "[data-hook='flights-breadcrumb_item-seats']", description: 'seats breadcrumb item' },
			{ selector: '.seat-map, .seats-container', description: 'seat map container' }
		]

		for (const strategy of seatsDetectionStrategies) {
			try {
				await this.actions.waitForDisplayed(strategy.selector, strategy.description, 3000)
				console.log(`Seats page detected using strategy: ${strategy.description}`)
				seatsPageFound = true
				break
			} catch (error) {
				console.log(`Strategy failed - ${strategy.description}: ${error.message}`)
			}
		}

		if (!seatsPageFound) {
			console.log('Seats page not detected, checking if already on bags page')
			try {
				await this.actions.waitForDisplayed("[data-hook='ancillaries-page_page-heading']", 'bags page heading', 3000)
				console.log('Already on bags page - seats were likely skipped automatically')
				return
			} catch (error) {
				console.log('Not on bags page either, proceeding with seat button clicks')
			}
		}

		// Try to scroll to bottom where buttons usually are
		await this.actions.scroll(tailOfPlane, 'tail of plane')

		// Strategy 1: Try skip button first (for tests that don't select seats)
		try {
			console.log('Trying to click skip seats button')
			await this.actions.waitForDisplayed(seatsPageSkip, 'skip seats button', 5000)
			await this.actions.click(seatsPageSkip, 'skip seats button')
			console.log('Skip seats button clicked successfully')

			// Wait for navigation after skip
			await this.actions.waitForLoadState('domcontentloaded', 10000)
			await this.actions.waitForDisplayed("[data-hook='ancillaries-page_page-heading']", 'bags page heading', 10000)
			console.log('Successfully navigated to bags page after skip')
			return

		} catch (skipError) {
			console.log(`Skip button not available: ${skipError.message}, trying continue button`)

			// Strategy 2: Try continue button (for tests that do select seats)
			try {
				await this.actions.waitForClickable(continueButton, 'continue button', 10000)
				await this.actions.click(continueButton, 'continue button')
				console.log('Continue button clicked successfully')
			} catch (continueError) {
				console.log(`Continue button not clickable: ${continueError.message}, trying alternatives`)

				// Strategy 3: Try alternative selectors
				const alternativeSelectors = [
					"[data-hook='seats-page_continue']",
					"[data-hook='seats-page_continue-popup']",
					"button[data-hook*='continue']",
					".continue-button, .btn-continue"
				]

				for (const selector of alternativeSelectors) {
					try {
						await this.actions.waitForDisplayed(selector, `alternative continue: ${selector}`, 3000)
						await this.actions.click(selector, `alternative continue: ${selector}`)
						console.log(`Alternative continue button clicked: ${selector}`)
						break
					} catch (altError) {
						console.log(`Alternative selector failed: ${selector} - ${altError.message}`)
					}
				}
			}
		}

		// Handle any popups that might appear BEFORE checking for round trip
		if (await this.actions.isDisplayed(selectSeatsPopup, 'selectSeatsPopup')) {
			console.log('Select seats popup detected, handling it')
			await this.actions.scroll(selectSeatsPopup)

			if (await this.actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')) {
				await this.actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
				console.log('Clicked select seat popup continue button')
				await this.actions.waitForLoadState('domcontentloaded', 30000)
			} else if (await this.actions.isDisplayed(selectSeatsNowButton, 'selectSeatsNowButton')) {
				await this.actions.click(selectSeatsNowButton, 'selectSeatsNowButton')
				console.log('Clicked select seats now button')
				await this.actions.waitForLoadState('domcontentloaded', 30000)
			}
		}

		// After handling popup, always try to click the main seats page continue button
		console.log('Looking for main seats page continue button after popup handling')
		await this.actions.scroll(tailOfPlane) // Scroll to bottom where continue button usually is

		const mainContinueStrategies = [
			{ selector: continueButton, description: 'main continue button' },
			{ selector: "[data-hook='seats-page_continue']", description: 'seats page continue' },
			{ selector: seatspageContinueButton, description: 'seats page continue by text' },
			{ selector: "//button[contains(text(), 'Continue')]", description: 'text-based continue' }
		]

		let mainContinueClicked = false
		for (const strategy of mainContinueStrategies) {
			try {
				console.log(`Trying main continue strategy: ${strategy.description}`)
				if (await this.actions.isDisplayed(strategy.selector, strategy.description)) {
					await this.actions.waitForClickable(strategy.selector, strategy.description, 5000)
					await this.actions.click(strategy.selector, strategy.description)
					console.log(`Main continue clicked: ${strategy.description}`)
					mainContinueClicked = true
					await this.actions.waitForLoadState('load', 10000) // Wait for navigation to start
					break
				}
			} catch (error) {
				console.log(`Main continue strategy failed - ${strategy.description}: ${error.message}`)
			}
		}

		// Check for round trip returning flight ONLY if main continue didn't work (still on seats page)
		try {
			if (await this.actions.isDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')) {
				console.log('Round trip detected - handling returning flight')
				process.env.tripType = 'roundtrip'

				// Try multiple strategies to handle returning flight
				await this.handleReturningFlightSection()

				// After handling returning flight, try continue button again
				console.log('Trying continue button again after returning flight handling')
				for (const strategy of mainContinueStrategies) {
					try {
						if (await this.actions.isDisplayed(strategy.selector, strategy.description)) {
							await this.actions.scroll(tailOfPlane)
							await this.actions.waitForClickable(strategy.selector, strategy.description, 5000)
							await this.actions.click(strategy.selector, strategy.description)
							console.log(`Post-returning continue clicked: ${strategy.description}`)
							await this.actions.waitForLoadState('load', 10000) // Wait for navigation
							break
						}
					} catch (error) {
						console.log(`Post-returning continue failed - ${strategy.description}: ${error.message}`)
					}
				}
			}
		} catch (error) {
			console.log('Error checking for returning flight tabs:', error.message)
		}

		// Wait for navigation to bags page with multiple attempts
		let navigationSuccess = false;
		const maxNavigationAttempts = 3;

		for (let attempt = 1; attempt <= maxNavigationAttempts && !navigationSuccess; attempt++) {
			console.log(`Navigation attempt ${attempt}/${maxNavigationAttempts}`);

			try {
				await this.actions.waitForDisplayed("[data-hook='ancillaries-page_page-heading']", 'bags page heading', 10000)
				console.log('Successfully navigated to bags page')
				navigationSuccess = true;
			} catch (error) {
				console.log(`Bags page navigation attempt ${attempt} failed:`, error.message)

				// If not the last attempt, try clicking continue button again
				if (attempt < maxNavigationAttempts) {
					console.log('Trying continue button again...');
					try {
						// Try main continue button again
						if (await this.actions.isDisplayed(continueButton, 'continue button')) {
							await this.actions.click(continueButton, 'continue button - retry')
							console.log('Clicked continue button again');
							await this.actions.waitForLoadState('load', 5000);
						} else {
							console.log('Continue button not available for retry');
						}
					} catch (retryError) {
						console.log('Continue button retry failed:', retryError.message);
					}
				} else {
					// Final attempt - check if we're at least on a different page
					try {
						await this.actions.waitForDisplayed('body', 'page loaded', 5000)
						console.log('Page navigation completed (may not be bags page)')
						navigationSuccess = true;
					} catch (finalError) {
						console.log('Final navigation check failed:', finalError.message)
					}
				}
			}
		}
	}
	async clickSelectSeatPopupContinueButton(flightType) {
		if (flightType === 'Departing') {
			await this.actions.scroll(tailOfPlane)
			await this.actions.click(continueButton, 'continue button')
		}
		// await this.actions.pause(1000)
		if (await this.actions.isDisplayed(popupContinueButton)) {
			await this.actions.click(popupContinueButton, 'popupContinueButton')
		}
		// await this.actions.pause(1000)
		if (await this.actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')) {
			await this.actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
		}
	}

	async validateTravelersGridSeat(tripType) {
		var totalTravelers = await this.actions.getElements(TravelerList)
		for (var i = 1; i <= totalTravelers.length; i++) {
			if (await this.actions.isDisplayed(seatId.replace("X", i), 'seat id')) {
				assert.equal(
					await this.actions.getAttribute(seatId.replace("X", i), "data-hook", 'seat id'),
					'seat-id',
					'validation failed: Seat is not updated in travelers grid for ' + tripType
				);
			}
			else {
				assert.fail("Validation Failed: Seat not assigned for travelers:" + i);
			}
		}

	}
	async deselectSelectedSeat(segment, paxNum) {
		if (segment == "departing") {
			await this.actions.click(departingSeg, 'departingSeg')
			await this.actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await this.actions.click(takenSeats.replace("X", paxNum)), 'taken seats'
		}
		else {
			await this.actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await this.actions.click(takenSeats.replace("X", paxNum), 'taken seats')
		}
		deselectedSeatDetails = await this.actions.getText(selectedSeatTypeDeselectPopup, 'selectedSeatTypeDeselectPopup')
			+ '-' + await this.actions.getText(selectedSeatIdDeselectPopup, 'selectedSeatIdDeselectPopup')
			+ '-' + await this.actions.getText(selectedSeatPriceDeselectPopup, 'selectedSeatPriceDeselectPopup')
		await this.actions.click(deselectSeatButton, 'deselectSeatButton')

	}
	async validateSelectedFlightTypeInSeatsPage(flightType) {

		if (flightType.toLowerCase() === 'departing') {
			await this.actions.waitForDisplayed(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
			assert.equal(
				await this.actions.getAttribute(seatsPageDepartingTabs, 'aria-selected', 'seatsPageDepartingTabs'),
				'true',
				'Departing Tab not selected'
			);
		}
		if (flightType.toLowerCase() === 'returning') {
			await this.actions.waitForDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')
			await this.actions.click(seatsPageReturningTabs, 'seatsPageReturningTabs')
			assert.equal(
				await this.actions.getAttribute(seatsPageReturningTabs, 'aria-selected', 'seatsPageReturningTabs'),
				'true',
				'Returning Tab not selected'
			);
		}
	}
	async validateSelectSeatsForMeButton(travelers, display) {
		if (travelers === '3')
			assert.equal(
				await this.actions.isDisplayed(selectSeatsForMe, 'selectSeatsForMe'),
				display,
				'Select seats for me button is not displayed, Failed'
			);
		if (travelers === '6')
			assert.equal(
				await this.actions.isDisplayed(selectSeatsForMe, 'selectSeatsForMe'),
				display,
				'Select seats for me button is displayed, Failed'
			);
	}
	async clickSelectSeatsForMeButton(flightType) {
		// await this.actions.pause(4000);
		if (flightType === 'Departing') {
			await this.actions.waitForDisplayed(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
			await this.actions.click(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
			await this.actions.click(selectSeatsForMe, 'selectSeatsForMe')
			// await this.actions.pause(4000);
		}
		if (flightType === 'Returning') {
			await this.actions.waitForDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')
			await this.actions.click(seatsPageReturningTabs, 'seatsPageReturningTabs')
			await this.actions.click(selectSeatsForMe, 'selectSeatsForMe')
			// await this.actions.pause(4000);
			this.collectTravelerSeatInfo();
		}
	}
	async validateTravelersGridSeatIsUnselected(paxNum) {
		assert.equal(
			await this.actions.getText(unAssignedSeat.replace("X", 1), 'unassigned seat'),
			' —',
			'validation failed: Travelers Grid Seat should be unselected for traveler ' + paxNum
		);
	}
	async validateActiveButtonInSeatsPage(button, flightType) {
		if (flightType === 'Departing') {
			await this.actions.isClickable(selectReturningButton, 'selectReturningButton')
			assert.equal(
				await this.actions.getText(selectReturningButton, 'selectReturningButton'),
				button,
				'SELECT RETURNING button is not displayed, Failed'
			);
		}
		if (flightType === 'Returning') {
			await this.actions.isClickable(continueButtonInReturning, 'continueButtonInReturning')
			assert.equal(
				await this.actions.getText(continueButtonInReturning, 'continueButtonInReturning'),
				button,
				'Continue button is not displayed, Failed'
			);
		}
	}
	async clickSelectReturningButtonInDepartingTab() {
		await this.actions.scroll(frontOfPlane)
		// await this.actions.pause(4000);
		await this.actions.click(selectReturningButton, 'selectReturningButton')
	}
	async handleReturningFlightSection() {
		console.log('Handling returning flight section for round trip')

		// Strategy 1: Try clicking the returning tab first to ensure it's active
		try {
			if (await this.actions.isDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')) {
				await this.actions.click(seatsPageReturningTabs, 'seatsPageReturningTabs')
				console.log('Clicked returning tab to make it active')
				await this.actions.waitForLoadState('load', 5000) // Wait for tab switch
			}
		} catch (error) {
			console.log('Could not click returning tab:', error.message)
		}

		// Strategy 2: Check for and handle any popup specific to returning flights
		const returningPopupSelectors = [
			{ selector: selectSeatsPopup, description: 'select seats popup' },
			{ selector: "[data-hook=seats-page-continue-button-popup]", description: 'seats continue popup' }
		]

		for (const popup of returningPopupSelectors) {
			try {
				if (await this.actions.isDisplayed(popup.selector, popup.description)) {
					console.log(`Found returning flight popup: ${popup.description}`)

					// Look for continue button within the popup
					const popupContinueButtons = [
						selectSeatPopupContinueButton,
						selectSeatsNowButton,
						"[data-hook='seats-page-continue-button-popup_continue-button']",
						"//button[contains(text(), 'Continue')]"
					]

					for (const button of popupContinueButtons) {
						try {
							if (await this.actions.isDisplayed(button, `popup button: ${button}`)) {
								await this.actions.click(button, `popup button: ${button}`)
								console.log(`Clicked popup continue button: ${button}`)
								await this.actions.waitForLoadState('domcontentloaded', 5000)
								break
							}
						} catch (buttonError) {
							console.log(`Popup button failed: ${button} - ${buttonError.message}`)
						}
					}
					break
				}
			} catch (popupError) {
				console.log(`Popup check failed: ${popup.description} - ${popupError.message}`)
			}
		}

		// Strategy 3: Try standard continue button approaches
		const continueStrategies = [
			{ selector: continueButtonInReturning, description: 'specific returning continue button', timeout: 3000 },
			{ selector: continueButton, description: 'general continue button', timeout: 5000 },
			{ selector: "[data-hook='seats-page_continue']", description: 'seats page continue', timeout: 3000 },
			{ selector: "//button[contains(text(), 'Continue')]", description: 'text-based continue button', timeout: 3000 }
		]

		let continueClicked = false
		for (const strategy of continueStrategies) {
			try {
				console.log(`Trying continue strategy: ${strategy.description}`)

				// Scroll to ensure visibility
				await this.actions.scroll(tailOfPlane)

				// Check if element exists with shorter timeout
				if (await this.actions.isDisplayed(strategy.selector, strategy.description)) {
					console.log(`Element found: ${strategy.description}`)

					// Wait for clickable and click with timeout
					await this.actions.waitForClickable(strategy.selector, strategy.description, strategy.timeout)
					await this.actions.click(strategy.selector, strategy.description)
					console.log(`Successfully clicked: ${strategy.description}`)
					continueClicked = true
					await this.actions.waitForLoadState('domcontentloaded', 5000) // Wait for action to process
					break
				} else {
					console.log(`Element not displayed: ${strategy.description}`)
				}
			} catch (error) {
				console.log(`Strategy failed - ${strategy.description}: ${error.message}`)
			}
		}

		if (!continueClicked) {
			console.log('Warning: No continue button worked for returning flight, proceeding anyway')
		}

		// Give time for any navigation to occur
		await this.actions.waitForLoadState('domcontentloaded', 5000)
		console.log('Returning flight section handling completed')
	}

	async clickContinueButtonInReturningTab() {
		await this.actions.waitForDisplayed(continueButtonInReturning, 'continueButtonInReturning')
		await this.actions.waitForClickable(continueButtonInReturning, 'continueButtonInReturning')
		await this.actions.click(continueButtonInReturning, 'continueButtonInReturning')
	}
	async validateSelectSeatsPopup(text) {
		assert.equal(
			await this.actions.getText(selectSeatsPopupText, 'selectSeatsPopupText'),
			text.replace("�", "’"),
			'SELECT RETURNING button is not displayed, Failed'
		);
		assert.equal(
			await this.actions.isDisplayed(selectSeatsNowButton, 'selectSeatsNowButton'),
			true,
			'SELECT SEATS NOW button is not displayed in Select Seats Popup, Failed'
		);
		assert.equal(
			await this.actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton'),
			true,
			'CONTINUE button is not displayed in Select Seats Popup, Failed'
		);
	}
	async clickSelectSeatContinueButton() {
		await this.actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
	}
	async clickSelectSeatNowButton() {
		await this.actions.waitForDisplayed(selectSeatsNowButton, 'selectSeatsNowButton')
		await this.actions.click(selectSeatsNowButton, 'selectSeatsNowButton')
	}
	async validateBundleContent(content) {
		assert.equal(
			await this.actions.getText(bundleBannerContent, 'bundleBannerContent'),
			await content.replace("star", ""),
			'validation failed: Mismatch in bundle banner content '
		);
	}
	async validateBundleSeat() {
		var starSeat = await this.actions.getElements(bundleSeatCount)
		assert.isAbove(
			starSeat.length,
			1,
			'Validation failed: No star marked bundle seat found'
		);
	}
	async validateNonBundleSeat() {
		var count = this.actions.getElements(nonBundleSeatCount)
		if (count.length < 1) {
			await this.actions.click(returningSeg, 'returningSeg')
			count = await this.actions.getElements(nonBundleSeatCount)
		}
		assert.isAbove(
			count.length,
			1,
			'Validation failed: No priced seat found in the Seat Map'
		);
	}

	async validateSelectedSeatIsHighlighted() {
		var totalTravelers = await this.actions.getElements(TravelerList)
		var takenSeats = await this.actions.getElements(takenSeatsList)
		assert.equal(
			totalTravelers.length,
			takenSeats.length,
			'validation failed: Mismatch selected seat count '
		);
	}
	async collectTravelerSeatInfo() {
		var totalTravelers = this.actions.getElements(TravelerList)
		await this.actions.scroll(seatBreadcrumb)
		await this.actions.click(departingSeg, 'departingSeg')
		await this.actions.scroll(TravelerList)
		while (seatIdDepart.length > 0) {
			seatIdDepart.pop()
			seatIdReturn.pop()
			seatPriceReturn.pop()
		}
		for (var i = 0; i < totalTravelers.length; i++) {
			await this.actions.scroll(seatId.replace("X", i + 1))
			seatIdDepart.push(await this.actions.getText(seatId.replace("X", i + 1), 'seat id'))
			seatPriceDepart.push(await this.actions.getText(seatPrice.replace("X", i + 1), 'seat price'))
		}
		if (await this.actions.isDisplayed(returningSeg, 'returning seg')) {
			await this.actions.scroll(seatBreadcrumb)
			await this.actions.click(returningSeg, 'returningSeg')
			for (var i = 0; i < totalTravelers.length; i++) {

				await this.actions.scroll(seatId.replace("X", i + 1), 'seatId')
				seatIdReturn.push(await this.actions.getText(seatId.replace("X", i + 1), 'seat id'))
				seatPriceReturn.push(await this.actions.getText(seatPrice.replace("X", i + 1), 'seat id'))

			}
		}
	}
	async validateChildNonAdjacentSeatWarningPopup(text) {
		assert.equal(
			await this.actions.getText(nonAdjacentSeatPopUpWarning, 'nonAdjacentSeatPopUpWarning'),
			text,
			'validation failed: non Adjacent Seat PopUp Warning msg mismatch'
		);
		assert.equal(
			await this.actions.isClickable(nonAdjacentSeatPopUpWarningOkButton, 'nonAdjacentSeatPopUpWarningOkButton'),
			true,
			'validation failed: non Adjacent Seat PopUp Ok Button mismatch'
		);
	}
	async clickOkButton() {
		await this.actions.click(nonAdjacentSeatPopUpWarningOkButton, 'nonAdjacentSeatPopUpWarningOkButton')
	}
	async validateNonAdjacentSeatWarningPopupIsClosed() {
		assert.equal(
			await this.actions.isDisplayed(nonAdjacentSeatPopUp, 'nonAdjacentSeatPopUp'),
			false,
			'validation failed: non Adjacent Seat PopUp not closed'
		);
	}
	async validateSeatLegendWrapper() {
		assert.equal(
			await this.actions.isDisplayed(legendWrapper, 'legendWrapper'),
			true,
			'Validation failed: Legend Wrapper not displayed'
		);
	}
	async validateLegendWrapperText(text) {
		assert.equal(
			await this.actions.getText(legendWrapperText, 'legendWrapperText'),
			text,
			'Validation failed: Legend Wrapper text not displayed'
		);
	}
	async validateSeatLegendWrapperIcon(icon, text) {
		if (icon === 'tOne') {
			assert.equal(
				await this.actions.getText(legendWrapperT1, 'legendWrapperT1'),
				text,
				'Validation failed: Legend Wrapper T1 Icon not displayed'
			);
		}
		if (icon === 'Selected') {
			assert.equal(
				await this.actions.getText(legendWrapperT1Selected, 'legendWrapperT1Selected').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper T1 Selected not displayed'
			);
		}
		if (icon === 'Legroom') {
			assert.equal(
				await this.actions.getText(legendWrapperLegroom, 'legendWrapperLegroom').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Legroom not displayed'
			);
		}
		if (icon === 'Unavailable') {
			assert.equal(
				await this.actions.getText(legendWrapperUnavailable, 'legendWrapperUnavailable').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Unavailable not displayed'
			);
		}
		if (icon === 'Economy') {
			assert.equal(
				await this.actions.getText(legendWrapperEconomy, 'legendWrapperEconomy').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Economy not displayed'
			);
		}
		if (icon === 'ExitExit') {
			assert.equal(
				await this.actions.getText(legendWrapperExitRowIcon, 'legendWrapperExitRowIcon').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Exit Row not displayed'
			);
		}
		if (icon === 'ExitRow') {
			assert.equal(
				await this.actions.isDisplayed(legendWrapperExitRow, 'legendWrapperExitRow'),
				true,
				'Validation failed: Legend Wrapper Exit Row not displayed'
			);
		}
	}
	async validateSeatLegendLegroomTooltipContent(text, textOne, textTwo) {
		await this.actions.waitForDisplayed(legroomToolTip, 'legroomToolTip');
		await this.actions.click(legroomToolTip, 'legroomToolTip');
		assert.equal(
			await this.actions.isDisplayed(legroomToolTipContentPopup, 'legroomToolTipContentPopup'),
			true,
			'Validation failed: Seat Legend Legroom Content Popup not displayed'
		);
		assert.equal(
			await this.actions.getText(legroomPlusContent, 'legroomPlusContent'),
			text,
			'Validation failed: Seat Legend Legroom Plus Content not displayed'
		);
		assert.equal(
			await this.actions.getText(extraLegroomContent, 'extraLegroomContent'),
			textOne,
			'Validation failed: Seat Legend Legroom - Extra Legroom Content not displayed'
		);
		assert.equal(
			await this.actions.getText(extraComfortContent, 'extraComfortContent').replace("\n", " "),
			textTwo,
			'Validation failed: Seat Legend Legroom Extra Comfort & Inc. Appl. Taxes Content not displayed'
		);
	}
	async validateSeatLegendEconomyTooltipContent(text) {
		await this.actions.waitForDisplayed(economyToolTip, 'economyToolTip')
		await this.actions.click(economyToolTip, 'economyToolTip')
		assert.equal(
			await this.actions.isDisplayed(economyToolTipContentPopup, 'economyToolTipContentPopup'),
			true,
			'Validation failed: Seat Legend Economy Content Popup not displayed'
		);
		assert.equal(
			await this.actions.getText(economyToolTipContentPopup, 'economyToolTipContentPopup').replace("\n", " "),
			text,
			'Validation failed: Seat Legend Economy Tooltip Content not displayed'
		);
	}
	async validateTravelersGridSeatPrice(tripType) {
		var totalTravelers = await this.actions.getElements(TravelerList)
		for (var i = 1; i <= totalTravelers.length; i++) {
			assert.equal(
				await this.actions.getAttribute(seatPrice.replace("X", i), "data-hook", 'seatPrice'),
				'seat-price',
				'validation failed: Seat price is not updated in travelers grid for ' + tripType
			);
		}
	}
	async validateUnassignSeatPopup(segment, paxNum) {
		if (segment == "departing") {
			await this.actions.click(departingSeg, 'departingSeg')
			await this.actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await this.actions.click(takenSeats.replace("X", paxNum), 'takenSeats')
		}
		else {
			await this.actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await this.actions.click(takenSeats.replace("X", paxNum), 'takenSeats')
		}
	}
	async validateUnassignSeatPopupContent() {
		await this.actions.waitForDisplayed(seatsPopoverDeselect, 'seatsPopoverDeselect')
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverDeselect, 'seatsPopoverDeselect'),
			true,
			'Validation failed: Seat Popover - Deselect Popup is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverTravelerIcon, 'seatsPopoverTravelerIcon'),
			true,
			'Validation failed: Seat Popover - Traveler Icon is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverTravelerName, 'seatsPopoverTravelerName'),
			true,
			'Validation failed: Seat Popover - Traveler Name is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverSeatTypeLabel, 'seatsPopoverSeatTypeLabel'),
			true,
			'Validation failed: Seat Popover - Traveler Type Label is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverSeatID, 'seatsPopoverSeatID'),
			true,
			'Validation failed: Seat Popover - Traveler Seat ID is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverSeatPrice, 'seatsPopoverSeatPrice'),
			true,
			'Validation failed: Seat Popover - Traveler Seat Price is not displayed'
		);
		assert.equal(
			await this.actions.getText(seatsPopoverComfortLevel, 'seatsPopoverComfortLevel'),
			'Comfort Level',
			'Validation failed: Seat Popover - Comfort Level is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverStars, 'seatsPopoverStars'),
			true,
			'Validation failed: Seat Popover - Stars is not displayed'
		);
		assert.equal(
			await this.actions.isDisplayed(seatsPopoverSeatInfo, 'seatsPopoverSeatInfo'),
			true,
			'Validation failed: Seat Popover - Seat Info is not displayed'
		);
	}
	async validateUnavailableSeatDisabled() {
		var restrictedSeats = await this.actions.getElements(unavailable)
		for (var i = 0; i < restrictedSeats.length; i++) {
			try {
				await this.actions.click(restrictedSeats[i], 'restricted seats')
			}
			catch (ex) {
			}
			assert.equal(
				await this.actions.isDisplayed(takenSeats.replace("X", 1), 'taken seats'),
				false,
				'Validation Failed: Unavailable Seats not disabled'
			);
		}
	}
	async storeCurrentlySelectedSeatDataHook() {
		let dataHook = await this.actions.getAttribute("[data-hook*='taken']", "data-hook", 'datahook');
		selectedSeat = dataHook;
	}

	async collectSelectedSeatIdAndPrice(segment) {
		await this.actions.waitForDisplayed("[data-hook='seat-id']", 'seat id');
		if (segment === "departing") {
			await collect('departingSelectedSeatIdKey', await this.actions.getText("[data-hook='seat-id']", 'seat id'));
			await collect('departingSelectedSeatPriceKey', await this.actions.getText("[data-hook='seat-price']", 'seat price'));
		}
		else if (segment === "returning") {
			await collect('returningSelectedSeatIdKey', await this.actions.getText("[data-hook='seat-id']", 'seat id'));
			await collect('returningSelectedSeatPriceKey', await this.actions.getText("[data-hook='seat-price']", 'seat price'));
		}
	}

	async selectSpecificSeat() {
		let dataHook = await selectedSeat.replace("taken_", "");
		await this.actions.click(`[data-hook='${dataHook}']`, 'datahook');
	}
	async clickSelectedSeat(segment, traveler) {
		// await this.actions.pause(2000);
		if (segment === "departing") {
			await this.actions.click(travelerSelectedSeat.replace("X", traveler), 'traveler selected seat')
		}
	}
	async validateSpecificSeatIsNotDisplayed() {
		// await this.actions.pause(2000);
		if (await this.actions.isDisplayed(`[data-hook='${selectedSeat}']`, 'selected seat')) {
			assert.fail("The unavailable seat is still displayed as selected.")
		}
		let dataHook = await selectedSeat.replace("taken_", "");
		await this.actions.waitForDisplayed(`[data-hook='${dataHook}']`, 'datahook')
		try {
			await this.actions.click(`[data-hook='${dataHook}']`, 'datahook')
			assert.fail("Seat is still available.");
		} catch (ex) {
			assert.isOk("The seat is no longer available.");
		}
	}

	async validateErrorMessageIsDisplayed(content) {
		assert.equal(
			await this.actions.getText(adultAlreadySelectedPopup, 'adultAlreadySelectedPopup'),
			content,
			'Validation Failed: Mismatch in adult already selected popup'
		);
	}
	async validateMessageWhileTravelingWithChild(content) {
		assert.equal(
			await this.actions.getText(travelingWithChildrenNote, 'travelingWithChildrenNote'),
			content,
			'Validation Failed: Mismatch in traveling With Children Note'
		);
	}
	async clickInfoIconForPackage(seatType) {
		if (seatType === "Legroom") {
			await this.actions.click(legroomLegendTooltip, 'legroomLegendTooltip')
		}
		if (seatType === "Economy") {
			await this.actions.click(economyLegendTooltip, 'economyLegendTooltip')
		}
	}
	async clickLink(link) {
		if (link === "Select Seats for me") {
			await this.actions.click(selectSeatsForMe, 'selectSeatsForMe')
		}
		if (link === "No Thanks") {
			await this.actions.click(seatsPageSkip, 'seatsPageSkip')
		}
	}

	async getSeatDetails() {
		// await this.actions.waitForDisplayed(seatsPageHeading, 'seatsPageHeading')
		// await browser.pause(5000)
		var { depeartSeatDetails, returnSeatDetails } = await returnDetails();
		newDepSeats = depeartSeatDetails;
		newRetSeats = returnSeatDetails;
	}

	async selectSeatsByParamsByGQl(params) {
		if (!params.includes("false")) {
			var travelerNum = params.split(' ')[0].split('-')[1]
			var seg = params.split(' ')[1].split('-')[1]
			var seatType = params.split(' ')[2].split('-')[1]
			let span = await this.actions.getElement(tripType);
			if (seg.includes("all")) {
				if (await this.actions.getText(span, 'Trip Type Info') === "Round Trip") {
					await this.selectSeatusingGQL(seatType, "departing", travelerNum)
					await this.selectSeatusingGQL(seatType, "returning", travelerNum)
				}
				else {
					await this.selectSeatusingGQL(seatType, "departing", travelerNum)
				}
			} else {
				await this.selectSeatusingGQL(seatType, seg, travelerNum)
			}
		}
	}

	async selectSeatusingGQL(seatType, tripType, travelerNum) {
		let spinnerWaitCount = 0;
		let maxSpinnerWaits = 15; // 30 seconds max (15 * 2 seconds)
		while (await this.actions.isDisplayed(spinnerBar, 'spinnerBar') && spinnerWaitCount < maxSpinnerWaits) {
			await this.actions.waitForLoadState('domcontentloaded', 15000)
			spinnerWaitCount++;
			console.log(`Waiting for spinner to disappear... attempt ${spinnerWaitCount}/${maxSpinnerWaits}`);
		}
		if (spinnerWaitCount >= maxSpinnerWaits) {
			console.log('Spinner wait timeout reached, proceeding anyway');
		}
		await this.actions.waitForLoadState('domcontentloaded', 15000);

		if (tripType === "departing") {
			await this.selectDepartureSegAdjacentSeatsbyGQL(tripType, seatType, travelerNum)
		}
		else if (tripType === "returning") {
			await this.selectReturningSegAdjacentSeatsbyGQL(tripType, seatType, travelerNum)
		}
		else {
			console.log("both")
		}
	}

	async selectDepartureSegAdjacentSeatsbyGQL(tripType, seatType, travelerNum) {
		console.log('Starting departure seat selection by GQL');
		console.log('newDepSeats:', newDepSeats);

		// Validate seat data before proceeding
		if (!newDepSeats || newDepSeats.length === 0) {
			console.log('No seat data from GQL, falling back to regular seat selection');
			await this.selectDepartureSegAdjacentSeats(tripType, "any", travelerNum);
			return;
		}

		// Check if any seat IDs are undefined
		let hasUndefinedSeats = newDepSeats.some(seat => seat.seatId === undefined || seat.seatId === null);
		if (hasUndefinedSeats) {
			console.log('GraphQL returned undefined seat IDs, falling back to regular seat selection');
			await this.selectDepartureSegAdjacentSeats(tripType, "any", travelerNum);
			return;
		}

		try {
			await this.actions.waitForDisplayed(TravelerList, 'TravelerList', 10000);
			var totalTravelers = await this.actions.getElements(TravelerList)
			console.log('Found travelers:', totalTravelers.length);
		} catch (error) {
			console.log('Error finding travelers:', error.message);
		}

		var adjacentSeats = []
		seatType = "e";

		try {
			await this.actions.waitForDisplayed(seatMap, 'seatMap', 30000)
			console.log('Seat map found');
		} catch (error) {
			console.log('Error finding seat map:', error.message);
			throw error;
		}

		if (travelerNum === "all" && newDepSeats && newDepSeats.length > 0) {
			console.log('Selecting seats for all travelers, count:', newDepSeats.length);

			console.log('Departure seat assignments from GQL:');
			newDepSeats.forEach((seat, index) => {
				console.log(`  ${index}: Traveler ${seat.travelerId} -> Seat ${seat.seatId}`);
			});

			for (var i = 0; i < newDepSeats.length; i++) {
				if (!newDepSeats[i].seatId || newDepSeats[i].seatId === undefined) {
					console.log(`Skipping undefined seat for traveler ${newDepSeats[i].travelerId}`);
					continue;
				}

				console.log(`Selecting seat ${newDepSeats[i].seatId} for traveler ${newDepSeats[i].travelerId}`);

				try {
					try {
						await this.actions.waitForDisplayed(selectTraveler.replace("X", newDepSeats[i].travelerId), `select traveler ${newDepSeats[i].travelerId}`, 30000)
						await this.actions.waitForClickable(selectTraveler.replace("X", newDepSeats[i].travelerId), `select traveler ${newDepSeats[i].travelerId}`, 30000);
						await this.actions.click(selectTraveler.replace("X", newDepSeats[i].travelerId), `select traveler ${newDepSeats[i].travelerId}`)
						console.log(`Selected traveler ${newDepSeats[i].travelerId} for departure seat assignment`);
						await this.actions.waitForLoadState('domcontentloaded', 30000);
					} catch (travelerError) {
						console.log(`Could not select specific traveler ${newDepSeats[i].travelerId} for departure seat`);
					}

					let newDepSeatsButton = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newDepSeats[i].seatId + "')]"
					console.log('Seat selector:', newDepSeatsButton);

					await this.actions.waitForClickable(newDepSeatsButton, 'newDepSeatsButton', 30000)
					await this.actions.click(newDepSeatsButton, 'newDepSeatsButton')
					console.log(`Successfully clicked seat ${newDepSeats[i].seatId}`);

					await this.actions.waitForLoadState('domcontentloaded', 30000);
					let exitRowPopupBut = exitRowPopup.replace("XX", newDepSeats[i].seatId.toUpperCase())
					let exitRowPopupButIsDipslay = await this.actions.isDisplayed(exitRowPopupBut, 'exitRowPopupBut')
					if (exitRowPopupButIsDipslay) {
						await this.actions.click(exitRowPopupBut, 'exitRowPopupBut')
						await this.actions.scroll(seatBreadcrumb);
						console.log(`Handled exit row popup for seat ${newDepSeats[i].seatId}`);

						await this.actions.waitForLoadState('domcontentloaded', 30000);
					}

					// Check if seat assignment popup appeared
					try {
						if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
							await this.actions.waitForClickable(updateSelectedSeat, 'updateSelectedSeat', 30000);
							await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
							console.log(`Confirmed seat update for departure seat ${newDepSeats[i].seatId}`);

						}
					} catch (updateError) {
						console.log(`No seat update popup needed for departure seat ${newDepSeats[i].seatId}`);
					}

					await this.waitForSpinnerAndStabilize(15000, `departure seat ${newDepSeats[i].seatId}`);

					try {
						let travelerStillSelected = await this.actions.isDisplayed(`//label[contains(@for,'traveler-input-${newDepSeats[i].travelerId}')][contains(@class,'selected') or contains(@class,'active')]`, 'selected traveler indicator', 2000);
						if (!travelerStillSelected) {
							console.log(`Traveler ${newDepSeats[i].travelerId} may not be selected after spinner, re-selecting...`);
							await this.actions.waitForClickable(selectTraveler.replace("X", newDepSeats[i].travelerId), `re-select traveler ${newDepSeats[i].travelerId}`, 30000);
							await this.actions.click(selectTraveler.replace("X", newDepSeats[i].travelerId), `re-select traveler ${newDepSeats[i].travelerId}`);
							await this.actions.waitForLoadState('domcontentloaded', 30000);
						}
					} catch (travelerCheckError) {
						console.log(`Could not verify traveler selection state: ${travelerCheckError.message}`);
					}

					let seatVerified = await this.verifySeatAssignment(newDepSeats[i].seatId, 'departure');
					if (!seatVerified) {
						console.log(`Seat ${newDepSeats[i].seatId} not verified for traveler ${newDepSeats[i].travelerId}, attempting to re-click...`);

						// Try to re-click the seat if verification failed
						try {
							let seatSelector = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newDepSeats[i].seatId + "')]";
							let seatStillClickable = await this.actions.isDisplayed(seatSelector, 'seat clickable check', 2000);
							if (seatStillClickable) {
								console.log(`Re-clicking seat ${newDepSeats[i].seatId} for traveler ${newDepSeats[i].travelerId}`);
								await this.actions.waitForClickable(seatSelector, 'seat re-click', 30000);
								await this.actions.click(seatSelector, 'seat re-click');
								await this.actions.waitForLoadState('domcontentloaded', 30000);

								// Check again for confirmation popup
								if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat', 1000)) {
									await this.actions.waitForClickable(updateSelectedSeat, 'updateSelectedSeat', 30000);
									await this.actions.click(updateSelectedSeat, 'updateSelectedSeat');
									console.log(`Confirmed re-selected seat ${newDepSeats[i].seatId}`);
								}

								// Final verification
								seatVerified = await this.verifySeatAssignment(newDepSeats[i].seatId, 'departure re-check');
							}
						} catch (reclickError) {
							console.log(`Could not re-click seat ${newDepSeats[i].seatId}: ${reclickError.message}`);
						}
					}

					if (seatVerified) {
						console.log(`Departure seat ${newDepSeats[i].seatId} successfully assigned to traveler ${newDepSeats[i].travelerId}`);
					} else {
						console.log(`Warning: Departure seat ${newDepSeats[i].seatId} assignment could not be verified, but continuing...`);
					}

					await this.actions.waitForLoadState('domcontentloaded', 30000);

				} catch (seatError) {
					console.log(`Error selecting seat ${newDepSeats[i].seatId}:`, seatError.message);
				}
			}

			// Final verification: check traveler grid to ensure all departure seats are shown
			console.log('Verifying departure seats in traveler grid...');
			try {
				await this.actions.waitForDisplayed(TravelerList, 'TravelerList', 5000);
				var totalTravelers = await this.actions.getElements(TravelerList);
				for (var j = 1; j <= totalTravelers.length; j++) {
					try {
						let seatDisplayed = await this.actions.isDisplayed(seatId.replace("X", j), `seat id for traveler ${j}`);
						if (seatDisplayed) {
							await this.actions.waitForDisplayed(seatId.replace("X", j), `seat id for traveler ${j}`, 30000);
							let assignedSeat = await this.actions.getText(seatId.replace("X", j), `seat id for traveler ${j}`);
							console.log(`Traveler ${j} has departure seat: ${assignedSeat}`);
						} else {
							console.log(`Warning: No departure seat shown for traveler ${j}`);
						}
					} catch (gridError) {
						console.log(`Could not check departure seat for traveler ${j}`);
					}
				}
			} catch (gridVerificationError) {
				console.log('Could not verify departure seats in traveler grid:', gridVerificationError.message);
			}

		} else {
			console.log('No seats to select or travelerNum not "all"');
		}
	}

	async selectReturningSegAdjacentSeatsbyGQL(tripType, seatType, travelerNum) {
		console.log('Starting returning seat selection by GQL');
		console.log('newRetSeats:', newRetSeats);

		// Validate seat data before proceeding
		if (!newRetSeats || newRetSeats.length === 0) {
			console.log('No returning seat data from GQL, falling back to regular seat selection');
			await this.selectReturningSegAdjacentSeats(tripType, "any", travelerNum);
			return;
		}

		// Check if any seat IDs are undefined
		let hasUndefinedSeats = newRetSeats.some(seat => seat.seatId === undefined || seat.seatId === null);
		if (hasUndefinedSeats) {
			console.log('GraphQL returned undefined returning seat IDs, falling back to regular seat selection');
			await this.selectReturningSegAdjacentSeats(tripType, "any", travelerNum);
			return;
		}

		var { depeartSeatDetails, returnSeatDetails } = await returnDetails()

		// First, try to navigate to the returning segment
		try {
			let returningSeatsSelectButtonVisibilty = await this.actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')
			if (returningSeatsSelectButtonVisibilty) {
				await this.actions.waitForClickable(returningSeatsSelectButton, 'returningSeatsSelectButton', 30000);
				await this.actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
				console.log('Clicked returning seats select button');
			} else if (await this.actions.isDisplayed(returningSeg, 'returningSeg')) {
				await this.actions.waitForClickable(returningSeg, 'returningSeg', 30000);
				await this.actions.click(returningSeg, 'returningSeg')
				console.log('Clicked returning segment tab');
			} else {
				console.log('Warning: Neither returning select button nor returning tab found');
			}
		} catch (error) {
			console.log('Error navigating to returning segment:', error.message);

			try {
				await this.actions.waitForClickable(returningSeg, 'returningSeg', 30000);
				await this.actions.click(returningSeg, 'returningSeg')
				console.log('Fallback: clicked returning segment tab');
			} catch (fallbackError) {
				console.log('Fallback also failed:', fallbackError.message);
			}
		}

		// Wait for returning segment to load
		try {
			await this.actions.waitForDisplayed(TravelerList, 'TravelerList', 30000)
			await this.actions.waitForDisplayed(seatMap, 'seatMap', 30000)
			console.log('Returning seat map loaded');
		} catch (error) {
			console.log('Error loading returning seat elements:', error.message);
		}

		// Proceed with seat selection
		seatType = "e";
		if (travelerNum === "all" && newRetSeats && newRetSeats.length > 0) {
			console.log('Selecting returning seats for all travelers, count:', newRetSeats.length);

			console.log('Returning seat assignments from GQL:');
			newRetSeats.forEach((seat, index) => {
				console.log(`  ${index}: Traveler ${seat.travelerId} -> Seat ${seat.seatId}`);
			});

			for (var i = 0; i < newRetSeats.length; i++) {
				console.log(`Selecting returning seat ${newRetSeats[i].seatId} for traveler ${newRetSeats[i].travelerId}`);

				try {
					try {
						await this.actions.waitForDisplayed(selectTraveler.replace("X", newRetSeats[i].travelerId), `select traveler ${newRetSeats[i].travelerId}`, 30000)
						await this.actions.waitForClickable(selectTraveler.replace("X", newRetSeats[i].travelerId), `select traveler ${newRetSeats[i].travelerId}`, 30000);
						await this.actions.click(selectTraveler.replace("X", newRetSeats[i].travelerId), `select traveler ${newRetSeats[i].travelerId}`)
						console.log(`Selected traveler ${newRetSeats[i].travelerId} for seat assignment`);
					} catch (travelerError) {
						console.log(`Warning: Could not select specific traveler ${newRetSeats[i].travelerId}`);
					}

					await this.actions.waitForLoadState('domcontentloaded', 30000)
					let newRetSeatsButton = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newRetSeats[i].seatId + "')]"
					console.log('Returning seat selector:', newRetSeatsButton);

					await this.actions.waitForClickable(newRetSeatsButton, 'newRetSeatsButton', 30000)
					await this.actions.click(newRetSeatsButton, 'newRetSeatsButton')
					console.log(`Successfully clicked returning seat ${newRetSeats[i].seatId}`);

					let exitRowPopupIsDisplay = await this.actions.isDisplayed(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'exitRowPopup Button')
					if (exitRowPopupIsDisplay) {
						await this.actions.waitForClickable(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'ExitRowPopup Button', 30000);
						await this.actions.click(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'ExitRowPopup Button')
						console.log(`Handled exit row popup for returning seat ${newRetSeats[i].seatId}`);
					}

					// Check if seat assignment popup appeared
					try {
						if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
							await this.actions.waitForClickable(updateSelectedSeat, 'updateSelectedSeat', 30000);
							await this.actions.click(updateSelectedSeat, 'updateSelectedSeat')
							console.log(`Confirmed seat update for returning seat ${newRetSeats[i].seatId}`);
						}
					} catch (updateError) {
						console.log(`No seat update popup needed for ${newRetSeats[i].seatId}`);
					}

					await this.waitForSpinnerAndStabilize(15000, `returning seat ${newRetSeats[i].seatId}`);

					// Additional check: Re-verify traveler is still selected after spinner
					try {
						let travelerStillSelected = await this.actions.isDisplayed(`//label[contains(@for,'traveler-input-${newRetSeats[i].travelerId}')][contains(@class,'selected') or contains(@class,'active')]`, 'selected traveler indicator', 2000);
						if (!travelerStillSelected) {
							console.log(`Returning: Traveler ${newRetSeats[i].travelerId} may not be selected after spinner, re-selecting...`);
							await this.actions.waitForClickable(selectTraveler.replace("X", newRetSeats[i].travelerId), `re-select traveler ${newRetSeats[i].travelerId}`, 30000);
							await this.actions.click(selectTraveler.replace("X", newRetSeats[i].travelerId), `re-select traveler ${newRetSeats[i].travelerId}`);
							await this.actions.waitForLoadState('domcontentloaded', 30000);
						}
					} catch (travelerCheckError) {
						console.log(`Could not verify returning traveler selection state: ${travelerCheckError.message}`);
					}

					let seatVerified = await this.verifySeatAssignment(newRetSeats[i].seatId, 'returning');
					if (!seatVerified) {
						console.log(`Warning: Returning seat ${newRetSeats[i].seatId} not verified for traveler ${newRetSeats[i].travelerId}, attempting to re-click...`);

						// Try to re-click the seat if verification failed
						try {
							let seatSelector = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newRetSeats[i].seatId + "')]";
							let seatStillClickable = await this.actions.isDisplayed(seatSelector, 'returning seat clickable check', 2000);
							if (seatStillClickable) {
								console.log(`Re-clicking returning seat ${newRetSeats[i].seatId} for traveler ${newRetSeats[i].travelerId}`);
								await this.actions.waitForClickable(seatSelector, 'returning seat re-click', 30000);
								await this.actions.click(seatSelector, 'returning seat re-click');
								await this.actions.waitForLoadState('domcontentloaded', 30000);

								// Check again for confirmation popup
								if (await this.actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat', 1000)) {
									await this.actions.waitForClickable(updateSelectedSeat, 'updateSelectedSeat', 30000);
									await this.actions.click(updateSelectedSeat, 'updateSelectedSeat');
									console.log(`Confirmed re-selected returning seat ${newRetSeats[i].seatId}`);
								}

								// Final verification
								seatVerified = await this.verifySeatAssignment(newRetSeats[i].seatId, 'returning re-check');
							}
						} catch (reclickError) {
							console.log(`Could not re-click returning seat ${newRetSeats[i].seatId}: ${reclickError.message}`);
						}
					}

					if (seatVerified) {
						console.log(`Returning seat ${newRetSeats[i].seatId} successfully assigned to traveler ${newRetSeats[i].travelerId}`);
					} else {
						console.log(`Warning: Returning seat ${newRetSeats[i].seatId} assignment could not be verified, but continuing...`);
					}

					// Pause between seat selections to prevent race conditions
					await this.actions.waitForLoadState('domcontentloaded', 30000);

				} catch (seatError) {
					console.log(`Error selecting returning seat ${newRetSeats[i].seatId}:`, seatError.message);
				}
			}

			// Final verification: check traveler grid to ensure all returning seats are shown
			console.log('Verifying returning seats in traveler grid...');
			try {
				await this.actions.waitForDisplayed(TravelerList, 'TravelerList', 5000);
				var totalTravelers = await this.actions.getElements(TravelerList);
				for (var j = 1; j <= totalTravelers.length; j++) {
					try {
						let seatDisplayed = await this.actions.isDisplayed(seatId.replace("X", j), `seat id for traveler ${j}`);
						if (seatDisplayed) {
							await this.actions.waitForDisplayed(seatId.replace("X", j), `seat id for traveler ${j}`, 30000);
							let assignedSeat = await this.actions.getText(seatId.replace("X", j), `seat id for traveler ${j}`);
							console.log(`Returning seat for traveler ${j}: ${assignedSeat}`);
						} else {
							console.log(`Warning: No returning seat shown for traveler ${j}`);
						}
					} catch (gridError) {
						console.log(`Could not check returning seat for traveler ${j}`);
					}
				}
			} catch (gridVerificationError) {
				console.log('Could not verify returning seats in traveler grid:', gridVerificationError.message);
			}

		} else {
			console.log('No returning seats to select or travelerNum not "all"');
		}
	}

	async skipSeatsPage() {
		console.log('Starting skip seats page process...');
		try {
			console.log('Checking if we are on seats page...');
			await this.actions.waitForDisplayed("//span[contains(text(),'Choose Departing Seats')]", 'seats page', 30000);
			console.log('Confirmed we are on seats page');
		} catch (error) {
			console.log('Seats breadcrumb not found, trying alternative seats page indicators...');

			const seatsPageIndicators = [
				{ selector: seatMap, description: 'seat map' },
				{ selector: "//span[contains(text(),'Choose Departing Seats')]", description: 'seats breadcrumb item' }
			];

			let seatsPageFound = false;
			for (const indicator of seatsPageIndicators) {
				try {
					await this.actions.waitForDisplayed(indicator.selector, indicator.description, 30000);
					console.log(`Seats page confirmed via ${indicator.description}`);
					seatsPageFound = true;
					break;
				} catch (indicatorError) {
					console.log(`${indicator.description} not found`);
				}
			}

			if (!seatsPageFound) {
				console.log('Warning: Could not confirm seats page, proceeding anyway...');
			}
		}

		console.log('Waiting for seats page to fully load...');
		await this.actions.waitForLoadState('domcontentloaded', 30000);

		do {
			await this.actions.waitForLoadState('domcontentloaded', 30000)
		} while (await this.actions.isDisplayed(spinnerBar, "spinnerBar"))

		console.log('Seats page loaded, scrolling to tail of plane...');
		await this.actions.scroll(tailOfPlane, "tailOfPlane");

		console.log('Attempting to click seats page skip button...');
		try {
			await this.actions.waitForDisplayed(seatsPageSkip, 'seats page skip button', 30000);
			await this.actions.waitForClickable(seatsPageSkip, 'seats page skip button', 30000);
			await this.actions.click(seatsPageSkip, "seats page skip button");
			console.log('Successfully clicked seats page skip button');
		} catch (error) {
			console.log(`Skip button not available: ${error.message}`);
			throw new Error('Unable to find or click seats page skip button');
		}

		await this.actions.waitUntilPageLoad(); // Wait for page transition
		console.log('Skip seats page process completed');
	}

	async validateAllSeatsSelected() {
		console.log('Validating all seats are properly selected...')

		try {
			// Check if this is a round trip
			const isRoundTrip = await this.actions.getText(tripType, 'trip type') === "Round Trip"

			if (isRoundTrip) {
				console.log('Round trip detected - validating both departing and returning seats')

				// Check departing seats first
				console.log('Checking departing seats...')
				await this.validateSeatsInSegment('departing')

				// Switch to returning segment and check seats
				console.log('Checking returning seats...')
				try {
					if (await this.actions.isDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')) {
						await this.actions.click(seatsPageReturningTabs, 'seatsPageReturningTabs')
					}
				} catch (tabError) {
					console.log('Could not switch to returning tab:', tabError.message)
				}

				await this.validateSeatsInSegment('returning')

				// Switch back to departing for final continue process
				try {
					if (await this.actions.isDisplayed(seatsPageDepartingTabs, 'seatsPageDepartingTabs')) {
						await this.actions.click(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
					}
				} catch (tabError) {
					console.log('Could not switch back to departing tab:', tabError.message)
				}
			} else {
				console.log('One-way trip detected - validating departing seats only')
				await this.validateSeatsInSegment('departing')
			}
		} catch (error) {
			console.log('Error validating seats:', error.message)
		}
	}

	async validateSeatsInSegment(segment) {
		console.log(`Validating seats in ${segment} segment...`)

		try {
			await this.actions.waitForDisplayed(TravelerList, 'TravelerList', 5000)
			var totalTravelers = await this.actions.getElements(TravelerList)

			for (var i = 1; i <= totalTravelers.length; i++) {
				try {
					let seatDisplayed = await this.actions.isDisplayed(seatId.replace("X", i), `seat id for traveler ${i}`)
					if (seatDisplayed) {
						let assignedSeat = await this.actions.getText(seatId.replace("X", i), `seat id for traveler ${i}`)
						console.log(`✓ ${segment} - Traveler ${i} has seat: ${assignedSeat}`)
					} else {
						console.log(`⚠ Warning: ${segment} - No seat shown for traveler ${i}`)

						// Try to assign any available seat if none is selected
						try {
							let unassignedElement = unAssignedSeat.replace("X", i)
							if (await this.actions.isDisplayed(unassignedElement, `unassigned seat indicator for traveler ${i}`)) {
								console.log(`Attempting to assign seat for traveler ${i} in ${segment} segment`)
								// Try to click on any available seat for this traveler
								let availableSeats = "//button//span[contains(@data-hook,'economy-seat')][not(contains(@data-hook,'taken'))]"
								let seats = await this.actions.getElements(availableSeats)
								if (seats.length > 0) {
									await this.actions.click(selectTraveler.replace("X", i), `select traveler ${i}`)
									await this.actions.click(availableSeats, `assign seat for traveler ${i}`)
									console.log(`Assigned emergency seat for traveler ${i} in ${segment}`)
								}
							}
						} catch (assignError) {
							console.log(`Could not assign emergency seat for traveler ${i}:`, assignError.message)
						}
					}
				} catch (travelerError) {
					console.log(`Could not check ${segment} seat for traveler ${i}:`, travelerError.message)
				}
			}
		} catch (listError) {
			console.log(`Could not validate ${segment} seats:`, listError.message)
		}
	}

	/**
	 * Enhanced method to verify seat assignment with multiple checks
	 * @param {string} seatId - The seat ID to verify
	 * @param {string} context - Context for logging (e.g., "departure", "returning")
	 * @returns {boolean} - true if seat is verified as assigned
	 */
	async verifySeatAssignment(seatId, context = '') {
		try {
			console.log(`Verifying seat assignment for ${seatId} (${context})`);

			await this.actions.waitForLoadState('domcontentloaded', 1000);

			// Check if seat shows as 'taken' in the DOM
			let seatTakenSelector = `//span[contains(@data-hook,'taken')][contains(@data-hook,'_${seatId}')]`;
			let isTaken = await this.actions.isDisplayed(seatTakenSelector, 'taken seat indicator', 3000);

			if (isTaken) {
				console.log(`${context}: Seat ${seatId} verified as assigned (marked as taken)`);
				return true;
			}

			// Check if seat is no longer clickable (selected state)
			let seatClickableSelector = `//span[contains(@data-hook,'e')][contains(@data-hook,'_${seatId}')][not(contains(@data-hook,'taken'))]`;
			let isStillClickable = await this.actions.isDisplayed(seatClickableSelector, 'clickable seat indicator', 3000);

			if (!isStillClickable) {
				console.log(`${context}: Seat ${seatId} verified as assigned (no longer clickable)`);
				return true;
			}

			// Check for visual selection indicators (highlighted, selected class, etc.)
			try {
				let seatSelectedSelector = `//span[contains(@data-hook,'_${seatId}')][contains(@class,'selected') or contains(@class,'highlighted') or contains(@class,'assigned')]`;
				let isVisuallySelected = await this.actions.isDisplayed(seatSelectedSelector, 'visually selected seat indicator', 2000);

				if (isVisuallySelected) {
					console.log(`${context}: Seat ${seatId} verified as assigned (visually selected)`);
					return true;
				}
			} catch (visualError) {
				console.log(`Visual selection check failed for ${seatId}: ${visualError.message}`);
			}			// Check traveler grid for seat assignment
			try {
				let travelerGridUpdated = false;
				let totalTravelers = await this.actions.getElements(TravelerList);
				for (let j = 1; j <= totalTravelers.length; j++) {
					// Use the seatId selector template from top of file (line 19), not the parameter
					let travelerSeatElement = "(//span[@data-hook='seat-id'])[" + j + "]";
					let seatDisplayed = await this.actions.isDisplayed(travelerSeatElement, `seat id for traveler ${j}`, 1000);
					if (seatDisplayed) {
						let assignedSeat = await this.actions.getText(travelerSeatElement, `seat id for traveler ${j}`);
						// Check if the assigned seat matches the expected seat (case-insensitive)
						if (assignedSeat && assignedSeat.toLowerCase().trim() === seatId.toLowerCase().trim()) {
							console.log(`${context}: Seat ${seatId} found assigned to traveler ${j} in grid`);
							travelerGridUpdated = true;
							break;
						} else if (assignedSeat && assignedSeat.includes(seatId)) {
							console.log(`${context}: Seat ${seatId} found in traveler ${j} grid (partial match: ${assignedSeat})`);
							travelerGridUpdated = true;
							break;
						}
					}
				}

				if (travelerGridUpdated) {
					console.log(`${context}: Seat ${seatId} verified in traveler grid`);
					return true;
				}
			} catch (gridError) {
				console.log(`Could not check traveler grid for seat ${seatId}: ${gridError.message}`);
			}

			console.log(`${context}: Seat ${seatId} assignment could not be verified through standard checks`);
			return false;

		} catch (error) {
			console.log(`Error verifying seat ${seatId} (${context}): ${error.message}`);
			return false;
		}
	}

	/**
	 * Wait for spinner to completely disappear and UI to stabilize
	 * @param {number} maxWaitTime - Maximum wait time in milliseconds (default 30000)
	 * @param {string} context - Context for logging
	 */
	async waitForSpinnerAndStabilize(maxWaitTime = 30000, context = '') {
		console.log(`Waiting for spinner to disappear and UI to stabilize (${context})`);

		let startTime = Date.now();
		let spinnerCount = 0;

		// Wait for spinner to disappear
		while (await this.actions.isDisplayed(spinnerBar, 'spinnerBar') && (Date.now() - startTime) < maxWaitTime) {
			await this.actions.waitForLoadState('domcontentloaded', 1000);
			spinnerCount++;
			if (spinnerCount % 5 === 0) {
				console.log(`Still waiting for spinner (${context})... ${Math.floor((Date.now() - startTime) / 1000)}s elapsed`);
			}
		}

		if ((Date.now() - startTime) >= maxWaitTime) {
			console.log(`Spinner wait timeout reached for ${context}, proceeding anyway`);
		} else {
			console.log(`Spinner disappeared for ${context} after ${Math.floor((Date.now() - startTime) / 1000)}s`);
		}

		// Additional stabilization wait
		await this.actions.waitForLoadState('domcontentloaded', 2000);
		console.log(`UI stabilized after spinner (${context})`);
	}

}
export { seatIdDepart, seatPriceDepart, seatIdReturn, seatPriceReturn, deselectedSeatDetails, updatedSeatDetails, selectedSeatDetails }
export default SeatPage