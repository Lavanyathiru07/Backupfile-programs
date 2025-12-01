import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"
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
const tailOfPlane = "//div[contains(text(),'Tail of Plane')]"
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

	async skipSeatsPage() {
		await actions.waitForDisplayed(tailOfPlane, 'tail of plane')
		await actions.waitForEnabled(seatsPageSkip, 'seatsPageSkip')
		await actions.click(seatsPageSkip, 'seatsPageSkip')
	}
	/*
	*  seatType: any/exitRow/legroom/bundleSeat/economyBundleSeat/exitRowBundleSeat/economyNonBundleSeat/economy
	*  tripType: both/departing/returning
	*  travelerNum: all/paxNum
	*/
	async selectSeat(seatType, tripType, travelerNum) {
		if (tripType === "departing") {
			await this.selectDepartureSegAdjacentSeats(tripType, seatType, travelerNum)
		}
		else if (tripType == "returning") {
			await this.selectReturningSegAdjacentSeats(tripType, seatType, travelerNum)
		}
		else {

			await this.selectDepartureSegAdjacentSeats(tripType, seatType, travelerNum)
			await this.selectReturningSegAdjacentSeats(tripType, seatType, travelerNum)

			await actions.waitForDisplayed(TravelerList, 'traveler list')
			var totalTravelers = await browser.locator(TravelerList).all()
			for (var i = 1; i <= totalTravelers.length; i++) {
				console.log("seatsSelected: " + await actions.getText(seatId.replace("X", i), 'seat id'))
			}
			await this.collectTravelerSeatInfo()
		}
	}

	async selectSeatsByParams(params) {
		await actions.waitUntilPageLoad()
		await actions.waitForDisplayed(seatPageHeading, 'seats page heading')
		if (!params.includes("false")) {
			var travelerNum = await params.split(' ')[0].split('-')[1]
			var seg = await params.split(' ')[1].split('-')[1]
			var seatType = await params.split(' ')[2].split('-')[1]
			if (seg.includes("all")) {
				if (await actions.getText(tripType, 'tripType') === "Round Trip") {
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
		var getSeats = await browser.locator(getAvailSeat).all()
		for (var i = 0; i < getSeats.length; i++) {
			let sname = await actions.getAttribute(getSeats[i], "data-hook", 'get seats')
			getAllSeats.push(await sname.split('_')[2])
		}
		await actions.click(selectTraveler.replace("X", traveler), 'select traveler')
		for (var i = 0; i < getAllSeats.length; i++) {
			await actions.click("//button//span[contains(@data-hook,'_" + getAllSeats[i] + "')]", 'get all seats')
			break;
		}

	}
	async selectReturnSegSeatByPosition(position, traveler) {
		await actions.waitForDisplayed(seatBreadcrumb, 'seat breadcrumb')
		if (await actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')) {
			await actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
		}
		else {
			await actions.click(returningSeg, 'returning seg')
		}
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await browser.locator(getAvailSeat).all()
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
		}
		await actions.click(selectTraveler.replace("X", traveler), 'select traveler')
		for (var i = 0; i < getAllSeats.length; i++) {
			await actions.click("//button//span[contains(@data-hook,'_" + getAllSeats[i] + "')]", 'get all seats')
			break;
		}
	}

	async selectDepartureSegNonAdjacentSeatByPosition(position, traveler) {
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await browser.locator(getAvailSeat).all()
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
		}
		await actions.click(selectTraveler.replace("X", traveler), 'select traveler')
		for (var i = 0; i < getAllSeats.length; i++) {
			await actions.click("//button//span[contains(@data-hook,'_" + getAllSeats[i + 1] + "')]", 'get all seats')
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
			await actions.waitForDisplayed(TravelerList, 'traveler list')
			var totalTravelers = await browser.locator(TravelerList).all()
			for (var i = 1; i <= totalTravelers.length; i++) {
				console.log("seatsSelected: " + actions.getText(seatId.replace("X", i), 'seat id'))
			}
			await this.collectTravelerSeatInfo()
		}
	}
	async selectDepartureSegAdjacentSeats(tripType, seatType, travelerNum) {
		var availableSeats
		var getAllSeats = []
		await actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await browser.locator(TravelerList).all()
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
		await actions.waitForDisplayed(availableSeats, 'available seats')
		var getSeats = await browser.locator(availableSeats).all()
		var len = await getSeats.length

		for (var i = 0; i < len; i++) {
			let seatname = await actions.getAttribute(getSeats[i], "data-hook", 'get seats')
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
		if (await actions.isDisplayed(breadcrumbToggle, 'breadcrumb toggle')) {
			await actions.scroll(breadcrumbToggle)
		}
		else {
			await actions.scroll(seatBreadcrumb)
		}
		await actions.waitForDisplayed(seatMap)
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await actions.waitForClickable("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')) {
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')
					await actions.scroll(seatBreadcrumb)
				}
				if (await actions.isDisplayed(updateSelectedSeat, 'update selected seat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

				try {
					await actions.waitForDisplayed(takenSeats.replace("X", i + 1), 'taken seats')
				} catch (ex) {

				}

			}
		}
		else {
			await actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')
			var takenCount = await browser.locator(takenSeatsList).all()
			if (takenCount.length > 0) {
				var lastSelectedSeat = await actions.getAttribute(takenSeats.replace("X", takenCount.length), "data-hook", 'taken seats').split('_')[3]
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "')]", 'adjacent seats')
				if (!(actions.isDisplayed(activePopup, 'activePopup'))) {
					selectedSeatDetails = await seatType + '-' + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + '-' + $("//span[@data-hook='seats-popover_seat_price_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "']").getText()
				}

				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exitRowPopup')
				}
				else if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

			}
			else {
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seattype')
				if (!(await actions.isDisplayed(activePopup, 'active popup'))) {
					try {
						this.clickSelectedSeat(tripType, travelerNum)
						selectedSeatDetails = await actions.getText(selectedSeatTypeDeselectPopup, 'selectedSeatTypeDeselectPopup')
							+ '-' + await actions.getText(selectedSeatIdDeselectPopup, 'selectedSeatIdDeselectPopup')
							+ '-' + await actions.getText(selectedSeatPriceDeselectPopup, 'selectedSeatPriceDeselectPopup')
						this.clickSelectedSeat(tripType, travelerNum)
					}
					catch (ex) {
						this.clickSelectedSeat(tripType, travelerNum)
					}
				}
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')
				}
				else if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}
			}

		}
	}
	async selectDepartureSegNonAdjacentSeats(seatType, travelerNum) {
		var availableSeats
		var getAllSeats = []
		await actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await browser.locator(TravelerList).all()
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
		await actions.waitForDisplayed(availableSeats, 'available seats')
		var getSeats = await browser.locator(availableSeats).all()
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
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
		await actions.scroll(seatBreadcrumb)
		await actions.waitForDisplayed(seatMap, 'seat map')
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')) {
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit row popup')
					await actions.scroll(seatBreadcrumb)
				}
				if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

			}
		}
		else {
			await actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')
			await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seattype')
			if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
				await actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit row popup')
			}
			if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
				updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
					+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
					+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
				await actions.click(updateSelectedSeat, 'updateSelectedSeat')
			}

		}
	}
	async selectReturningSegAdjacentSeats(tripType, seatType, travelerNum) {
		// await browser.execute("window.scrollBy(0,-1000)");
		if (await actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')) {
			await actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
			// await actions.pause(5000);
		}
		else {
			await actions.click(returningSeg, 'returningSeg')
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
		await actions.waitForDisplayed(availableSeats, 'availableSeats')
		await actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await browser.locator(TravelerList).all()
		var getSeats = await browser.locator(availableSeats).all()
		for (var i = 0; i < getSeats.length; i++) {
			let gseats = await actions.getAttribute(getSeats[i], "data-hook", 'get seats')
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
		await actions.waitForDisplayed(seatMap, 'seat map')
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit rowpopup')) {
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit rowpopup')
					// await browser.execute("window.scrollBy(0,-1000)");
				}
				if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

				try {
					await actions.waitForDisplayed(takenSeats.replace("X", i + 1), 'taken seats')
				} catch (ex) {

				}
			}
		}
		else {
			await actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')
			var takenCount = await browser.locator(takenSeatsList).all()
			if (takenCount.length > 0) {
				var lastSelectedSeat = await actions.getAttribute(takenSeats.replace("X", takenCount.length), "data-hook", 'taken seats').split('_')[3]
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "')]", 'seat type')
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exitpopup')
				}
				if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}
			}
			else {
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seat type')
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')
				}
				if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}
			}

		}
	}
	async validateSeatsPageLoaded() {

		await actions.waitForDisplayed(seatMap, 'seat map')
		assert.equal(
			await actions.isDisplayed(seatMap, 'seat map'),
			true,
			'validation failed: SeatMap not loaded correctly'
		);
	}
	async selectReturningSegNonAdjacentSeats(seatType, travelerNum) {
		await actions.scroll(seatBreadcrumb)
		if (await actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')) {
			await actions.click(returningSeatsSelectButton, 'returningSeatsSelectButton')
		}
		else {
			await actions.click(returningSeg, 'returningSeg')
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
		await actions.waitForDisplayed(availableSeats, 'available seats')
		await actions.waitForDisplayed(TravelerList, 'traveler list')
		var totalTravelers = await browser.locator(TravelerList).all()
		var getSeats = await browser.locator(availableSeats).all()
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await actions.getAttribute(getSeats[i], "data-hook", 'get seats').split('_')[2])
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
		await actions.waitForDisplayed(seatMap, 'seat map')
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]", 'seat type')
				if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exit rowpopup')) {
					await actions.click(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase()), 'exitrowpopup')
					await actions.scroll(seatBreadcrumb)
				}
				if (await actions.isDisplayed(updateSelectedSeat, 'updateSelectedSeat')) {
					updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
						+ '-' + actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
						+ '-' + actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
					await actions.click(updateSelectedSeat, 'updateSelectedSeat')
				}

				try {
					await actions.waitForDisplayed(takenSeats.replace("X", i + 1), 'taken seats')
				} catch (ex) {

				}

			}
		}
		else {
			await actions.click(selectTraveler.replace("X", travelerNum), 'select traveler')

			await actions.click("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]", 'seat type')
			if (await actions.isDisplayed(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')) {
				await actions.click(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase()), 'exit rowpopup')
				await actions.scroll(seatBreadcrumb)
			}
			if (await actions.isDisplayed(updateSelectedSeat, 'update selected seat')) {
				updatedSeatDetails = await actions.getText(selectedSeatTypeUpdatePopup, 'selectedSeatTypeUpdatePopup')
					+ '-' + await actions.getText(selectedSeatIdUpdatePopup, 'selectedSeatIdUpdatePopup')
					+ '-' + await actions.getText(selectedSeatPriceUpdatePopup, 'selectedSeatPriceUpdatePopup')
				await actions.click(updateSelectedSeat, 'updateSelectedSeat')
			}

			await actions.waitForDisplayed(takenSeats.replace("X", 1), 'taken seats')
		}
	}
	async clickContinueButton() {

		await actions.scroll(tailOfPlane)
		await actions.waitForClickable(continueButton, 'continue button')
		await actions.click(continueButton, 'continue button')
		if (await actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')) {
			await actions.scroll(selectSeatsPopup)
			await actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
		}

		if (await actions.isDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')) {
			await this.clickSelectSeatPopupContinueButton('returning')
			// await actions.pause(5000)
		}

	}
	async clickSelectSeatPopupContinueButton(flightType) {
		if (flightType === 'Departing') {
			await actions.scroll(tailOfPlane)
			await actions.click(continueButton, 'continue button')
		}
		// await actions.pause(1000)
		if (await actions.isDisplayed(popupContinueButton)) {
			await actions.click(popupContinueButton, 'popupContinueButton')
		}
		// await actions.pause(1000)
		if (await actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')) {
			await actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
		}
	}

	async validateTravelersGridSeat(tripType) {
		var totalTravelers = await browser.locator(TravelerList).all()
		for (var i = 1; i <= totalTravelers.length; i++) {
			if (await actions.isDisplayed(seatId.replace("X", i), 'seat id')) {
				assert.equal(
					await actions.getAttribute(seatId.replace("X", i), "data-hook", 'seat id'),
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
			await actions.click(departingSeg, 'departingSeg')
			await actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await actions.click(takenSeats.replace("X", paxNum)), 'taken seats'
		}
		else {
			await actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await actions.click(takenSeats.replace("X", paxNum), 'taken seats')
		}
		deselectedSeatDetails = await actions.getText(selectedSeatTypeDeselectPopup, 'selectedSeatTypeDeselectPopup')
			+ '-' + await actions.getText(selectedSeatIdDeselectPopup, 'selectedSeatIdDeselectPopup')
			+ '-' + await actions.getText(selectedSeatPriceDeselectPopup, 'selectedSeatPriceDeselectPopup')
		await actions.click(deselectSeatButton, 'deselectSeatButton')

	}
	async validateSelectedFlightTypeInSeatsPage(flightType) {

		if (flightType.toLowerCase() === 'departing') {
			await actions.waitForDisplayed(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
			assert.equal(
				await actions.getAttribute(seatsPageDepartingTabs, 'aria-selected', 'seatsPageDepartingTabs'),
				'true',
				'Departing Tab not selected'
			);
		}
		if (flightType.toLowerCase() === 'returning') {
			await actions.waitForDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')
			await actions.click(seatsPageReturningTabs, 'seatsPageReturningTabs')
			assert.equal(
				await actions.getAttribute(seatsPageReturningTabs, 'aria-selected', 'seatsPageReturningTabs'),
				'true',
				'Returning Tab not selected'
			);
		}
	}
	async validateSelectSeatsForMeButton(travelers, display) {
		if (travelers === '3')
			assert.equal(
				await actions.isDisplayed(selectSeatsForMe, 'selectSeatsForMe'),
				display,
				'Select seats for me button is not displayed, Failed'
			);
		if (travelers === '6')
			assert.equal(
				await actions.isDisplayed(selectSeatsForMe, 'selectSeatsForMe'),
				display,
				'Select seats for me button is displayed, Failed'
			);
	}
	async clickSelectSeatsForMeButton(flightType) {
		// await actions.pause(4000);
		if (flightType === 'Departing') {
			await actions.waitForDisplayed(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
			await actions.click(seatsPageDepartingTabs, 'seatsPageDepartingTabs')
			await actions.click(selectSeatsForMe, 'selectSeatsForMe')
			// await actions.pause(4000);
		}
		if (flightType === 'Returning') {
			await actions.waitForDisplayed(seatsPageReturningTabs, 'seatsPageReturningTabs')
			await actions.click(seatsPageReturningTabs, 'seatsPageReturningTabs')
			await actions.click(selectSeatsForMe, 'selectSeatsForMe')
			// await actions.pause(4000);
			this.collectTravelerSeatInfo();
		}
	}
	async validateTravelersGridSeatIsUnselected(paxNum) {
		assert.equal(
			await actions.getText(unAssignedSeat.replace("X", 1), 'unassigned seat'),
			' —',
			'validation failed: Travelers Grid Seat should be unselected for traveler ' + paxNum
		);
	}
	async validateActiveButtonInSeatsPage(button, flightType) {
		if (flightType === 'Departing') {
			await actions.isClickable(selectReturningButton, 'selectReturningButton')
			assert.equal(
				await actions.getText(selectReturningButton, 'selectReturningButton'),
				button,
				'SELECT RETURNING button is not displayed, Failed'
			);
		}
		if (flightType === 'Returning') {
			await actions.isClickable(continueButtonInReturning, 'continueButtonInReturning')
			assert.equal(
				await actions.getText(continueButtonInReturning, 'continueButtonInReturning'),
				button,
				'Continue button is not displayed, Failed'
			);
		}
	}
	async clickSelectReturningButtonInDepartingTab() {
		await actions.scroll(frontOfPlane)
		// await actions.pause(4000);
		await actions.click(selectReturningButton, 'selectReturningButton')
	}
	async clickContinueButtonInReturningTab() {
		await actions.waitForDisplayed(continueButtonInReturning, 'continueButtonInReturning')
		await actions.waitForClickable(continueButtonInReturning, 'continueButtonInReturning')
		await actions.click(continueButtonInReturning, 'continueButtonInReturning')
	}
	async validateSelectSeatsPopup(text) {
		assert.equal(
			await actions.getText(selectSeatsPopupText, 'selectSeatsPopupText'),
			text.replace("�", "’"),
			'SELECT RETURNING button is not displayed, Failed'
		);
		assert.equal(
			await actions.isDisplayed(selectSeatsNowButton, 'selectSeatsNowButton'),
			true,
			'SELECT SEATS NOW button is not displayed in Select Seats Popup, Failed'
		);
		assert.equal(
			await actions.isDisplayed(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton'),
			true,
			'CONTINUE button is not displayed in Select Seats Popup, Failed'
		);
	}
	async clickSelectSeatContinueButton() {
		await actions.click(selectSeatPopupContinueButton, 'selectSeatPopupContinueButton')
	}
	async clickSelectSeatNowButton() {
		await actions.waitForDisplayed(selectSeatsNowButton, 'selectSeatsNowButton')
		await actions.click(selectSeatsNowButton, 'selectSeatsNowButton')
	}
	async validateBundleContent(content) {
		assert.equal(
			await actions.getText(bundleBannerContent, 'bundleBannerContent'),
			await content.replace("star", ""),
			'validation failed: Mismatch in bundle banner content '
		);
	}
	async validateBundleSeat() {
		var starSeat = await browser.locator(bundleSeatCount).all()
		assert.isAbove(
			starSeat.length,
			1,
			'Validation failed: No star marked bundle seat found'
		);
	}
	async validateNonBundleSeat() {
		var count = browser.locator(nonBundleSeatCount).all()
		if (count.length < 1) {
			await actions.click(returningSeg, 'returningSeg')
			count = await browser.locator(nonBundleSeatCount).all()
		}
		assert.isAbove(
			count.length,
			1,
			'Validation failed: No priced seat found in the Seat Map'
		);
	}

	async validateSelectedSeatIsHighlighted() {
		var totalTravelers = await browser.locator(TravelerList).all()
		var takenSeats = await browser.locator(takenSeatsList).all()
		assert.equal(
			totalTravelers.length,
			takenSeats.length,
			'validation failed: Mismatch selected seat count '
		);
	}
	async collectTravelerSeatInfo() {
		var totalTravelers = browser.locator(TravelerList).all()
		await actions.scroll(seatBreadcrumb)
		await actions.click(departingSeg, 'departingSeg')
		await actions.scroll(TravelerList)
		while (seatIdDepart.length > 0) {
			seatIdDepart.pop()
			seatIdReturn.pop()
			seatPriceReturn.pop()
		}
		for (var i = 0; i < totalTravelers.length; i++) {
			await actions.scroll(seatId.replace("X", i + 1))
			seatIdDepart.push(await actions.getText(seatId.replace("X", i + 1), 'seat id'))
			seatPriceDepart.push(await actions.getText(seatPrice.replace("X", i + 1), 'seat price'))
		}
		if (await actions.isDisplayed(returningSeg, 'returning seg')) {
			await actions.scroll(seatBreadcrumb)
			await actions.click(returningSeg, 'returningSeg')
			for (var i = 0; i < totalTravelers.length; i++) {

				await actions.scroll(seatId.replace("X", i + 1), 'seatId')
				seatIdReturn.push(await actions.getText(seatId.replace("X", i + 1), 'seat id'))
				seatPriceReturn.push(await actions.getText(seatPrice.replace("X", i + 1), 'seat id'))

			}
		}
	}
	async validateChildNonAdjacentSeatWarningPopup(text) {
		assert.equal(
			await actions.getText(nonAdjacentSeatPopUpWarning, 'nonAdjacentSeatPopUpWarning'),
			text,
			'validation failed: non Adjacent Seat PopUp Warning msg mismatch'
		);
		assert.equal(
			await actions.isClickable(nonAdjacentSeatPopUpWarningOkButton, 'nonAdjacentSeatPopUpWarningOkButton'),
			true,
			'validation failed: non Adjacent Seat PopUp Ok Button mismatch'
		);
	}
	async clickOkButton() {
		await actions.click(nonAdjacentSeatPopUpWarningOkButton, 'nonAdjacentSeatPopUpWarningOkButton')
	}
	async validateNonAdjacentSeatWarningPopupIsClosed() {
		assert.equal(
			await actions.isDisplayed(nonAdjacentSeatPopUp, 'nonAdjacentSeatPopUp'),
			false,
			'validation failed: non Adjacent Seat PopUp not closed'
		);
	}
	async validateSeatLegendWrapper() {
		assert.equal(
			await actions.isDisplayed(legendWrapper, 'legendWrapper'),
			true,
			'Validation failed: Legend Wrapper not displayed'
		);
	}
	async validateLegendWrapperText(text) {
		assert.equal(
			await actions.getText(legendWrapperText, 'legendWrapperText'),
			text,
			'Validation failed: Legend Wrapper text not displayed'
		);
	}
	async validateSeatLegendWrapperIcon(icon, text) {
		if (icon === 'tOne') {
			assert.equal(
				await actions.getText(legendWrapperT1, 'legendWrapperT1'),
				text,
				'Validation failed: Legend Wrapper T1 Icon not displayed'
			);
		}
		if (icon === 'Selected') {
			assert.equal(
				await actions.getText(legendWrapperT1Selected, 'legendWrapperT1Selected').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper T1 Selected not displayed'
			);
		}
		if (icon === 'Legroom') {
			assert.equal(
				await actions.getText(legendWrapperLegroom, 'legendWrapperLegroom').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Legroom not displayed'
			);
		}
		if (icon === 'Unavailable') {
			assert.equal(
				await actions.getText(legendWrapperUnavailable, 'legendWrapperUnavailable').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Unavailable not displayed'
			);
		}
		if (icon === 'Economy') {
			assert.equal(
				await actions.getText(legendWrapperEconomy, 'legendWrapperEconomy').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Economy not displayed'
			);
		}
		if (icon === 'ExitExit') {
			assert.equal(
				await actions.getText(legendWrapperExitRowIcon, 'legendWrapperExitRowIcon').replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Exit Row not displayed'
			);
		}
		if (icon === 'ExitRow') {
			assert.equal(
				await actions.isDisplayed(legendWrapperExitRow, 'legendWrapperExitRow'),
				true,
				'Validation failed: Legend Wrapper Exit Row not displayed'
			);
		}
	}
	async validateSeatLegendLegroomTooltipContent(text, textOne, textTwo) {
		await actions.waitForDisplayed(legroomToolTip, 'legroomToolTip');
		await actions.click(legroomToolTip, 'legroomToolTip');
		assert.equal(
			await actions.isDisplayed(legroomToolTipContentPopup, 'legroomToolTipContentPopup'),
			true,
			'Validation failed: Seat Legend Legroom Content Popup not displayed'
		);
		assert.equal(
			await actions.getText(legroomPlusContent, 'legroomPlusContent'),
			text,
			'Validation failed: Seat Legend Legroom Plus Content not displayed'
		);
		assert.equal(
			await actions.getText(extraLegroomContent, 'extraLegroomContent'),
			textOne,
			'Validation failed: Seat Legend Legroom - Extra Legroom Content not displayed'
		);
		assert.equal(
			await actions.getText(extraComfortContent, 'extraComfortContent').replace("\n", " "),
			textTwo,
			'Validation failed: Seat Legend Legroom Extra Comfort & Inc. Appl. Taxes Content not displayed'
		);
	}
	async validateSeatLegendEconomyTooltipContent(text) {
		await actions.waitForDisplayed(economyToolTip, 'economyToolTip')
		await actions.click(economyToolTip, 'economyToolTip')
		assert.equal(
			await actions.isDisplayed(economyToolTipContentPopup, 'economyToolTipContentPopup'),
			true,
			'Validation failed: Seat Legend Economy Content Popup not displayed'
		);
		assert.equal(
			await actions.getText(economyToolTipContentPopup, 'economyToolTipContentPopup').replace("\n", " "),
			text,
			'Validation failed: Seat Legend Economy Tooltip Content not displayed'
		);
	}
	async validateTravelersGridSeatPrice(tripType) {
		var totalTravelers = await browser.locator(TravelerList).all()
		for (var i = 1; i <= totalTravelers.length; i++) {
			assert.equal(
				await actions.getAttribute(seatPrice.replace("X", i), "data-hook", 'seatPrice'),
				'seat-price',
				'validation failed: Seat price is not updated in travelers grid for ' + tripType
			);
		}
	}
	async validateUnassignSeatPopup(segment, paxNum) {
		if (segment == "departing") {
			await actions.click(departingSeg, 'departingSeg')
			await actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await actions.click(takenSeats.replace("X", paxNum), 'takenSeats')
		}
		else {
			await actions.click(travelerGridPaxNum.replace("X", paxNum), 'travelerGridPaxNum')
			await actions.click(takenSeats.replace("X", paxNum), 'takenSeats')
		}
	}
	async validateUnassignSeatPopupContent() {
		await actions.waitForDisplayed(seatsPopoverDeselect, 'seatsPopoverDeselect')
		assert.equal(
			await actions.isDisplayed(seatsPopoverDeselect, 'seatsPopoverDeselect'),
			true,
			'Validation failed: Seat Popover - Deselect Popup is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverTravelerIcon, 'seatsPopoverTravelerIcon'),
			true,
			'Validation failed: Seat Popover - Traveler Icon is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverTravelerName, 'seatsPopoverTravelerName'),
			true,
			'Validation failed: Seat Popover - Traveler Name is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverSeatTypeLabel, 'seatsPopoverSeatTypeLabel'),
			true,
			'Validation failed: Seat Popover - Traveler Type Label is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverSeatID, 'seatsPopoverSeatID'),
			true,
			'Validation failed: Seat Popover - Traveler Seat ID is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverSeatPrice, 'seatsPopoverSeatPrice'),
			true,
			'Validation failed: Seat Popover - Traveler Seat Price is not displayed'
		);
		assert.equal(
			await actions.getText(seatsPopoverComfortLevel, 'seatsPopoverComfortLevel'),
			'Comfort Level',
			'Validation failed: Seat Popover - Comfort Level is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverStars, 'seatsPopoverStars'),
			true,
			'Validation failed: Seat Popover - Stars is not displayed'
		);
		assert.equal(
			await actions.isDisplayed(seatsPopoverSeatInfo, 'seatsPopoverSeatInfo'),
			true,
			'Validation failed: Seat Popover - Seat Info is not displayed'
		);
	}
	async validateUnavailableSeatDisabled() {
		var restrictedSeats = await browser.locator(unavailable).all()
		for (var i = 0; i < restrictedSeats.length; i++) {
			try {
				await actions.click(restrictedSeats[i], 'restricted seats')
			}
			catch (ex) {
			}
			assert.equal(
				await actions.isDisplayed(takenSeats.replace("X", 1), 'taken seats'),
				false,
				'Validation Failed: Unavailable Seats not disabled'
			);
		}
	}
	async storeCurrentlySelectedSeatDataHook() {
		let dataHook = await actions.getAttribute("[data-hook*='taken']", "data-hook", 'datahook');
		selectedSeat = dataHook;
	}

	async collectSelectedSeatIdAndPrice(segment) {
		await actions.waitForDisplayed("[data-hook='seat-id']", 'seat id');
		if (segment === "departing") {
			await collect('departingSelectedSeatIdKey', await actions.getText("[data-hook='seat-id']", 'seat id'));
			await collect('departingSelectedSeatPriceKey', await actions.getText("[data-hook='seat-price']", 'seat price'));
		}
		else if (segment === "returning") {
			await collect('returningSelectedSeatIdKey', await actions.getText("[data-hook='seat-id']", 'seat id'));
			await collect('returningSelectedSeatPriceKey', await actions.getText("[data-hook='seat-price']", 'seat price'));
		}
	}

	async selectSpecificSeat() {
		let dataHook = await selectedSeat.replace("taken_", "");
		await actions.click(`[data-hook='${dataHook}']`, 'datahook');
	}
	async clickSelectedSeat(segment, traveler) {
		// await actions.pause(2000);
		if (segment === "departing") {
			await actions.click(travelerSelectedSeat.replace("X", traveler), 'traveler selected seat')
		}
	}
	async validateSpecificSeatIsNotDisplayed() {
		// await actions.pause(2000);
		if (await actions.isDisplayed(`[data-hook='${selectedSeat}']`, 'selected seat')) {
			assert.fail("The unavailable seat is still displayed as selected.")
		}
		let dataHook = await selectedSeat.replace("taken_", "");
		await actions.waitForDisplayed(`[data-hook='${dataHook}']`, 'datahook')
		try {
			await actions.click(`[data-hook='${dataHook}']`, 'datahook')
			assert.fail("Seat is still available.");
		} catch (ex) {
			assert.isOk("The seat is no longer available.");
		}
	}

	async validateErrorMessageIsDisplayed(content) {
		assert.equal(
			await actions.getText(adultAlreadySelectedPopup, 'adultAlreadySelectedPopup'),
			content,
			'Validation Failed: Mismatch in adult already selected popup'
		);
	}
	async validateMessageWhileTravelingWithChild(content) {
		assert.equal(
			await actions.getText(travelingWithChildrenNote, 'travelingWithChildrenNote'),
			content,
			'Validation Failed: Mismatch in traveling With Children Note'
		);
	}
	async clickInfoIconForPackage(seatType) {
		if (seatType === "Legroom") {
			await actions.click(legroomLegendTooltip, 'legroomLegendTooltip')
		}
		if (seatType === "Economy") {
			await actions.click(economyLegendTooltip, 'economyLegendTooltip')
		}
	}
	async clickLink(link) {
		if (link === "Select Seats for me") {
			await actions.click(selectSeatsForMe, 'selectSeatsForMe')
		}
		if (link === "No Thanks") {
			await actions.click(seatsPageSkip, 'seatsPageSkip')
		}
	}

	async getSeatDetails() {
		// await actions.waitForDisplayed(seatsPageHeading, 'seatsPageHeading')
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
			let span = await browser.locator(tripType);
			if (seg.includes("all")) {
				if (await actions.getText(span, 'Trip Type Info') === "Round Trip") {
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
			await actions.pause(5000)
		} while (await actions.isDisplayed(spinnerBar, 'spinnerBar'))
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
			(await actions.waitForDisplayed(TravelerList, 'TravelerList'));
			var totalTravelers = await browser.locator(TravelerList).all()
		} catch (error) {

		}
		try {
			await actions.waitForDisplayed(availableSeats, 'availableSeats')
			var getSeats = await browser.locator(availableSeats).all()
		} catch (error) {

		}

		var adjacentSeats = []
		seatType = "e";
		await actions.waitForDisplayed(seatMap, 'seatMap')
		if (travelerNum === "all") {
			for (var i = 0; i < newDepSeats.length; i++) {
				let newDepSeatsButton = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newDepSeats[i].seatId + "')]"
				await actions.waitForClickable(newDepSeatsButton, 'newDepSeatsButton')
				await actions.click(newDepSeatsButton, 'newDepSeatsButton')
				let exitRowPopupBut = exitRowPopup.replace("XX", newDepSeats[i].seatId.toUpperCase())
				let exitRowPopupButIsDipslay = await actions.isDisplayed(exitRowPopupBut, 'exitRowPopupBut')
				if (exitRowPopupButIsDipslay) {
					await actions.click(exitRowPopupBut, 'exitRowPopupBut')
					await actions.scroll(seatBreadcrumb);
				}
				do {
					await actions.pause(5000)
				} while (await actions.isDisplayed(spinnerBar, 'spinnerBar'))
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
		let returningSeatsSelectButtonVisibilty = await actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')
		if (returningSeatsSelectButtonVisibilty) {
			let returningSeatsSelectButtonIsDisplay = await actions.isDisplayed(returningSeatsSelectButton, 'returningSeatsSelectButton')
			if (returningSeatsSelectButtonIsDisplay) {
				await actions.clickElement('click', returningSeatsSelectButton, 'returningSeatsSelectButton')
				// await browser.pause(15000);
			}
			else {
				await actions.clickElement('click', returningSeg, 'returningSeg')
			}
			var availableSeats

			try {
				await actions.waitForDisplayed(availableSeats, 'availableSeats')
				await actions.waitForDisplayed(TravelerList, 'TravelerList')
				await actions.waitForDisplayed(seatMap, 'seatMap')
			} catch (error) {

			}
			seatType = "e";
			if (travelerNum === "all") {
				for (var i = 0; i < newRetSeats.length; i++) {
					await actions.pause(5000)
					let newRetSeatsButton = "//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + newRetSeats[i].seatId + "')]"
					await actions.click(newRetSeatsButton, 'newRetSeatsButton')
					let exitRowPopupIsDisplay = await actions.isDisplayed(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'exitRowPopup Button')
					if (exitRowPopupIsDisplay) {
						await actions.click(exitRowPopup.replace("XX", newRetSeats[i].seatId.toUpperCase()), 'ExitRowPopup Button')
						// await browser.execute("window.scrollBy(0,-1000)");
					}
					do {
						await actions.pause(5000)
					} while (await actions.isDisplayed(spinnerBar, 'spinnerBar'))
					try {
						await $(takenSeats.replace("X", i + 1)).waitForDisplayed()
					} catch (ex) {

					}
				}
			}
		}
	}

	async skipSeatsPage() {
		await actions.pause(5000)
		await actions.waitForDisplayed(seatsPageSkip, 'seatsPageSkip', 20000)
		await actions.scroll(seatsPageSkip)
		// await actions.pause(3000)
		await actions.waitForDisplayed(seatsPageSkip, 'seatsPageSkip')
		await actions.clickElement('click', seatsPageSkip, "seatsPageSkip")
		await actions.pause(8000)
	}

}
export { seatIdDepart, seatPriceDepart, seatIdReturn, seatPriceReturn, deselectedSeatDetails, updatedSeatDetails, selectedSeatDetails }
export default new SeatPage(); 