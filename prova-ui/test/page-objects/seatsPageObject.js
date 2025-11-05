import Actions from "../../src/support/actions"
import getSeatArray from './graphqlCalls'

const seatsPageSkip = "[data-hook='seats-page_skip']";
const seatPageHeading = "[data-hook='seats-page_page-heading']";
const bagsPageHeading = "[data-hook='ancillaries-page_page-heading']";
const exitRowSeats = "//button//span[contains(@data-hook,'exit-row')][not(contains(@data-hook,'taken'))]"
const exitRowBundleSeat = "(//span[@data-hook='select-legroom-plus-seat_exit-row']//img)[X]"
const economyBundleSeat = "//button//span[contains(@data-hook,'economy-seat')][not(contains(@data-hook,'taken'))]"
const nonBundleSeat = "//button//span[contains(@data-hook,'unrestricted')][not(contains(@data-hook,'taken'))]"
const economySeat = "//button//span[contains(@data-hook,'economy-seat')][not(contains(@data-hook,'taken'))]"
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
const seatBreadcrumb = "[data-hook='flights-breadcrumb_item-seats']"
const breadcrumbToggle = "[data-hook='flights-breadcrumb_toggle']"
const continueButton = "//button[@data-hook='seats-page_continue']|//button[@data-hook='seats-page_continue-popup']"
const popupContinueButton = "[data-hook='seats-page_continue-popup']"
const tailOfPlane = "[data-hook='footer-sub-menu-heading_company']"
const frontOfPlane = "//div[contains(text(),'Front of Plane')]"
const selectReturningButton = "//*[text()='Select Returning']"
const travelerGridSeat = "//span[contains(text(),'Seat')]//span[@aria-label]"
const returningSeatsSelectButton = "[data-hook='seats-select-returning']"
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
	}

	async skipSeatsPage() {
		await this.actions.waitForDisplayed(tailOfPlane, 'tail of plane')
		await this.actions.waitForEnabled(seatsPageSkip, 'seatsPageSkip')
		await this.actions.click(seatsPageSkip, 'seatsPageSkip')
	}
	/*
	*  seatType: any/exitRow/legroom/bundleSeat/economyBundleSeat/exitRowBundleSeat/economyNonBundleSeat/economy
	*  tripType: both/departing/returning
	*  travelerNum: all/paxNum
	*/
	async selectSeat(seatType, tripType, travelerNum) {
		await this.actions.pause(10000)
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
		await this.actions.waitUntilPageLoad()
		await this.actions.waitForDisplayed(seatPageHeading, 'seats page heading')
		if (!params.includes("false")) {
			var travelerNum = await params.split(' ')[0].split('-')[1]
			var seg = await params.split(' ')[1].split('-')[1]
			var seatType = await params.split(' ')[2].split('-')[1]
			if (seg.includes("all")) {
				if (await this.actions.getText(tripType, 'tripType') === "Round Trip") {
					await this.selectSeat(seatType, "departing", travelerNum)
					await this.selectSeat(seatType, "returning", travelerNum)
				}
				else {

					await this.selectSeat(seatType, "departing", travelerNum)

				}
			} else {
				await this.selectSeat(seatType, tripType, travelerNum)
			}

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
				await this.actions.waitForClickable("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				await this.actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
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

		await this.actions.scroll(tailOfPlane, 'tail of plane')
		await this.actions.waitForClickable(continueButton, 'continue button')
		await this.actions.click(continueButton, 'continue button')
		if (await this.actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')) {
			await this.actions.scroll(selectSeatsPopup)
			await this.actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
		}
		await this.actions.pause(10000)
		if (await this.actions.isDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')) {
			await this.clickSelectSeatPopupContinueButton('returning')
			await this.actions.pause(8000)
			process.env.tripType = 'roundtrip'
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
		var { depeartSeatDetails, returnSeatDetails } = await getSeatArray();
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
				await this.selectSeatusingGQL(seatType, tripType, travelerNum)
			}
		}
	}

	async selectSeatusingGQL(seatType, tripType, travelerNum) {
		do {
			await this.actions.pause(5000)
		} while (await this.actions.isDisplayed(spinnerBar, 'spinnerBar'))
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
		var availableSeats
		try {
			(await this.actions.waitForDisplayed(TravelerList, 'TravelerList'));
			var totalTravelers = await this.actions.getElements(TravelerList)
		} catch (error) {

		}
		try {
			await this.actions.waitForDisplayed(availableSeats, 'availableSeats')
			var getSeats = await this.actions.getElements(availableSeats)
		} catch (error) {

		}

		var adjacentSeats = []
		seatType = "e";
		await this.actions.waitForDisplayed(seatMap, 'seatMap')
		if (travelerNum === "all") {
			for (var i = 0; i < newDepSeats.length; i++) {
				let newDepSeatsButton = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newDepSeats[i].seatId + "')]"
				await this.actions.waitForClickable(newDepSeatsButton, 'newDepSeatsButton')
				await this.actions.click(newDepSeatsButton, 'newDepSeatsButton')
				let exitRowPopupBut = exitRowPopup.replace("XX", newDepSeats[i].seatId.toUpperCase())
				let exitRowPopupButIsDipslay = await this.actions.isDisplayed(exitRowPopupBut, 'exitRowPopupBut')
				if (exitRowPopupButIsDipslay) {
					await this.actions.click(exitRowPopupBut, 'exitRowPopupBut')
					await this.actions.scroll(seatBreadcrumb);
				}
				do {
					await this.actions.pause(5000)
				} while (await this.actions.isDisplayed(spinnerBar, 'spinnerBar'))
				try {
					await $(takenSeats.replace("X", i + 1)).waitForDisplayed()
				} catch (ex) {

				}

			}
		}
	}

	async selectReturningSegAdjacentSeatsbyGQL(tripType, seatType, travelerNum) {
		var { depeartSeatDetails, returnSeatDetails } = getSeatArray()
		// await browser.execute("window.scrollBy(0,-1000)");
		let returningSeatsSelectButtonVisibilty = await this.actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')
		if (returningSeatsSelectButtonVisibilty) {
			let returningSeatsSelectButtonIsDisplay = await this.actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')
			if (returningSeatsSelectButtonIsDisplay) {
				await this.actions.clickElement('click', returningSeatsSelectButton, 'returningSeatsSelectButton')
				// await browser.pause(15000);
			}
			else {
				await this.actions.clickElement('click', returningSeg, 'returningSeg')
			}
			var availableSeats

			try {
				await this.actions.waitForDisplayed(availableSeats, 'availableSeats')
				await this.actions.waitForDisplayed(TravelerList, 'TravelerList')
				await this.actions.waitForDisplayed(seatMap, 'seatMap')
			} catch (error) {

			}
			seatType = "e";
			if (travelerNum === "all") {
				for (var i = 0; i < newRetSeats.length; i++) {
					await this.actions.pause(5000)
					let newRetSeatsButton = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newRetSeats[i].seatId + "')]"
					await this.actions.click(newRetSeatsButton, 'newRetSeatsButton')
					let exitRowPopupIsDisplay = await this.actions.isDisplayed(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'exitRowPopup Button')
					if (exitRowPopupIsDisplay) {
						await this.actions.click(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'ExitRowPopup Button')
						// await browser.execute("window.scrollBy(0,-1000)");
					}
					do {
						await this.actions.pause(5000)
					} while (await this.actions.isDisplayed(spinnerBar, 'spinnerBar'))
					try {
						await $(takenSeats.replace("X", i + 1)).waitForDisplayed()
					} catch (ex) {

					}
				}
			}
		}
	}

	async skipSeatsPage() {
		do {
			await this.actions.pause(2000)
		} while (await this.actions.isDisplayed(spinnerBar, "spinnerBar"))
		let continue1 = "button[data-hook='seats-page_continue']"
		let continue2 = "button[data-hook='seats-page_continue-popup']"
		let continue3 = "button[data-hook='seats-page-continue-button-popup_continue-button']"
		await this.actions.scroll(tailOfPlane, "tailOfPlane")
		// await actions.pause(2000);
		// await actions.scroll(continue2, "seat Continue");
		await this.actions.pause(8000);
		console.log('Seat Trip Type : ', process.env.tripType)
		if (String(process.env.tripType).toLowerCase().includes('roundtrip')) {
			await this.actions.pause(5000);
			await this.actions.click(continue1, "continue1")
			await this.actions.pause(3000);
		}
		await this.actions.click(continue2, "continue2");
		await this.actions.pause(3000);
		await this.actions.click(continue3, "continue3");
		await this.actions.pause(25000);
	}

}
export { seatIdDepart, seatPriceDepart, seatIdReturn, seatPriceReturn, deselectedSeatDetails, updatedSeatDetails, selectedSeatDetails }
export default SeatPage