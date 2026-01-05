
const seatsPageSkip = "[data-hook='seats-page_skip']";
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
const breadcrumbToggle="[data-hook='flights-breadcrumb_toggle']"
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
const selectSeatsPopup= "[data-hook=seats-page-continue-button-popup]"
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
const travelerSelectedSeat ="//span[contains(@data-hook,'taken')]//span[contains(.,'X')]"
const legroomLegendTooltip ="[data-hook='seat-map-legend-legroom-plus-tooltip_trigger']"
const economyLegendTooltip ="[data-hook='seat-map-legend-economy-tooltip_trigger']"
const selectedSeatTypeDeselectPopup ="//div[contains(@data-hook,'deselect')]//span[contains(@data-hook,'seats-popover_seat_type_label_')]"
const selectedSeatIdDeselectPopup="//div[contains(@data-hook,'deselect')]//span[contains(@data-hook,'seats-popover_seat_id_')]"
const selectedSeatPriceDeselectPopup ="//div[contains(@data-hook,'deselect')]//span[contains(@data-hook,'seats-popover_seat_price_')]"
const selectedSeatTypeUpdatePopup ="//div[contains(@data-hook,'_active')]//span[contains(@data-hook,'seats-popover_seat_type_label_')]"
const selectedSeatIdUpdatePopup="//div[contains(@data-hook,'_active')]//span[contains(@data-hook,'seats-popover_seat_id_')]"
const selectedSeatPriceUpdatePopup ="//div[contains(@data-hook,'_active')]//span[contains(@data-hook,'seats-popover_seat_price_')]"
const activePopup ="//div[contains(@data-hook,'_active')][contains(@data-hook,'popover')]"
const tripType="[data-hook='header-flight-info_trip-type']"
var seatPriceDepart = [];
var seatPriceReturn = [];
var seatIdDepart = [];
var seatIdReturn = [];
let selectedSeat;
var deselectedSeatDetails;
var updatedSeatDetails;
var selectedSeatDetails;
class SeatPage {

	async skipSeatsPage() {
		await $(tailOfPlane).scrollIntoView()
		await $(seatsPageSkip).waitForEnabled();
		await $(seatsPageSkip).click()
	}
	/*
	*  seatType: any/exitRow/legroom/bundleSeat/economyBundleSeat/exitRowBundleSeat/economyNonBundleSeat/economy
	*  tripType: both/departing/returning
	*  travelerNum: all/paxNum
	*/
	async selectSeat(seatType, tripType, travelerNum) {
		if (tripType === "departing") {
			await this.selectDepartureSegAdjacentSeats(tripType,seatType, travelerNum)
		}
		else if (tripType == "returning") {
			await this.selectReturningSegAdjacentSeats(tripType,seatType, travelerNum)
		}
		else {
			
			await this.selectDepartureSegAdjacentSeats(tripType,seatType, travelerNum)			
			await this.selectReturningSegAdjacentSeats(tripType,seatType, travelerNum)
			
			await $(TravelerList).waitForDisplayed()
			var totalTravelers = await browser.$$(TravelerList)
			for (var i = 1; i <= totalTravelers.length; i++) {
				console.log("seatsSelected: " + await $(seatId.replace("X", i)).getText())
			}
			await this.collectTravelerSeatInfo()
		}
	}
	
	async selectSeatsByParams(params){
		if(!params.includes("false")){	
		var travelerNum= await params.split(' ')[0].split('-')[1]
		var seg= await params.split(' ')[1].split('-')[1]
		var seatType= await params.split(' ')[2].split('-')[1]
		if(seg.includes("all")){			
			if(await $(tripType).getText()==="Round Trip"){						
			await this.selectSeat(seatType,"departing",travelerNum)				
			await this.selectSeat(seatType,"returning",travelerNum)	
			}
			else{
				
			await this.selectSeat(seatType,"departing",travelerNum)
			
			}
		}else{
			await this.selectSeat(seatType,tripType,travelerNum)
		}		
		 
		}		
	}
	async selectSeatByPosition(position,adjacency,segment,traveler)  {
		
		if(adjacency==="adjacent"){
			if (segment === "departing") {
			await this.selectDepartureSegSeatByPosition(position, traveler)
		}
		if (segment === "returning") {
			await this.selectReturnSegSeatByPosition(position, traveler)
		}
		}
		if(adjacency==="non-adjacent"){
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
		var getSeats = await browser.$$(getAvailSeat)
		for (var i = 0; i < getSeats.length; i++) {
			let sname = await getSeats[i].getAttribute("data-hook")
			getAllSeats.push(await sname.split('_')[2])
		}
		await $(selectTraveler.replace("X", traveler)).click()		
		for (var i = 0; i < getAllSeats.length; i++) {			
			await $("//button//span[contains(@data-hook,'_" + getAllSeats[i] + "')]").click()
			break;
		}
		
	}
	async selectReturnSegSeatByPosition(position, traveler) {
		await $(seatBreadcrumb).scrollIntoView();
		if (await $(returningSeatsSelectButton).isDisplayed()) {
			await $(returningSeatsSelectButton).click()
		}
		else {
		await $(returningSeg).click()
		}
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await browser.$$(getAvailSeat)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(await getSeats[i].getAttribute("data-hook").split('_')[2])
		}
		await $(selectTraveler.replace("X", traveler)).click()		
		for (var i = 0; i < getAllSeats.length; i++) {			
			await $("//button//span[contains(@data-hook,'_" + getAllSeats[i] + "')]").click()
			break;
		}
	}
	
	async selectDepartureSegNonAdjacentSeatByPosition(position, traveler){
		var getAllSeats = []
		let getAvailSeat = "//button//span[contains(@aria-label,'" + position.toLowerCase() + "')]"  //aisle,middle,window
		var getSeats = await browser.$$(getAvailSeat)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(getSeats[i].getAttribute("data-hook").split('_')[2])
		}
		await $(selectTraveler.replace("X", traveler)).click()		
		for (var i = 0; i < getAllSeats.length; i++) {			
			await $("//button//span[contains(@data-hook,'_" + getAllSeats[i+1] + "')]").click()
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
			await $(TravelerList).waitForDisplayed()
			var totalTravelers = await browser.$$(TravelerList)
			for (var i = 1; i <= totalTravelers.length; i++) {
				console.log("seatsSelected: " + $(seatId.replace("X", i)).getText())
			}
			await this.collectTravelerSeatInfo()
		}
	}
	async selectDepartureSegAdjacentSeats(tripType,seatType,travelerNum) {
		var availableSeats
		var getAllSeats = []
		await $(TravelerList).waitForDisplayed({ timeout: 40000 });
		var totalTravelers = await browser.$$(TravelerList)
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
		await $(availableSeats).waitForDisplayed()
		var getSeats = await browser.$$(availableSeats)
		var len = await getSeats.length
		
		for (var i = 0; i < len; i++) {
			let seatname = await getSeats[i].getAttribute("data-hook")
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
				if (getAllSeats[i+1].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 1].slice(0, getAllSeats[i + 2].length - 1)) {
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
					getAllSeats[i+3].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 4].slice(0, getAllSeats[i + 3].length - 1) &&
					getAllSeats[i+3].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 5].slice(0, getAllSeats[i + 4].length - 1)&&
					getAllSeats[i+6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 7].slice(0, getAllSeats[i + 5].length - 1)&&	
					getAllSeats[i+8].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 9].slice(0, getAllSeats[i + 9].length - 1)&&				
					getAllSeats[i+8].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 10].slice(0, getAllSeats[i + 9].length - 1)&&
					getAllSeats[i+8].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 11].slice(0, getAllSeats[i + 10].length - 1)) {
							
					for(var j=0;j<totalTravelers.length;j++){
					adjacentSeats.push(getAllSeats[i + j])	
					}
				     break;  					
				}
			}
		}
		if(await $(breadcrumbToggle).isDisplayed()){
			await $(breadcrumbToggle).scrollIntoView()
		}
		else{			
			await $(seatBreadcrumb).scrollIntoView();
		}		
		await $(seatMap).waitForDisplayed()
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				$("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]").waitForClickable();
				$("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]").click();
				if (await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).isDisplayed()) {
					await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).click()
					await $(seatBreadcrumb).scrollIntoView();
				}
				if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}

				try{
					await $(takenSeats.replace("X", i + 1)).waitForDisplayed()
				}catch(ex){
					
				}
				
			}
		}
		else {
			await $(selectTraveler.replace("X", travelerNum)).click()
			var takenCount =await browser.$$(takenSeatsList)			
			if (takenCount.length > 0) {
				var lastSelectedSeat =await $(takenSeats.replace("X", takenCount.length)).getAttribute("data-hook").split('_')[3]
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "')]").click();
				if (!$(activePopup).isDisplayed()) {
					selectedSeatDetails=await seatType+'-'+adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1]+'-'+$("//span[@data-hook='seats-popover_seat_price_"+adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1]+"']").getText()
				}
				
				if (await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).click()
				}
				else if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}	
							
			}
			else {
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]").click();				
				if (!$(activePopup).isDisplayed()) {
					try{
					this.clickSelectedSeat(tripType,travelerNum)
					selectedSeatDetails=await $(selectedSeatTypeDeselectPopup).getText()+'-'+$(selectedSeatIdDeselectPopup).getText()+'-'+$(selectedSeatPriceDeselectPopup).getText()
				    this.clickSelectedSeat(tripType,travelerNum) 
                    }  
                    catch(ex){
	                 this.clickSelectedSeat(tripType,travelerNum) 
                     }               
				}				
				if (await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).click()
				}
				else if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}	
			}
	
		}
	}
	async selectDepartureSegNonAdjacentSeats(seatType, travelerNum) {
		var availableSeats
		var getAllSeats = []
		await $(TravelerList).waitForDisplayed()
		var totalTravelers =await browser.$$(TravelerList)
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
		await $(availableSeats).waitForDisplayed()
		var getSeats =await browser.$$(availableSeats)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(getSeats[i].getAttribute("data-hook").split('_')[2])
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
		await $(seatBreadcrumb).scrollIntoView();
		await $(seatMap).waitForDisplayed()
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]").click();
				if (await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).isDisplayed()) {
					await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).click()
					await $(seatBreadcrumb).scrollIntoView();
				}
				if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}

			}
		}
		else {
			await $(selectTraveler.replace("X", travelerNum)).click()
			await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]").click();
			if (await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).isDisplayed()) {
				await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).click()
			}
			if (await $(updateSelectedSeat).isDisplayed()) {
				updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
				await $(updateSelectedSeat).click()
			}

		}
	}
	async selectReturningSegAdjacentSeats(tripType,seatType, travelerNum) {
		await browser.execute("window.scrollBy(0,-1000)");
		if (await $(returningSeatsSelectButton).isDisplayed()) {
			await $(returningSeatsSelectButton).click()
			await browser.pause(5000);
		}
		else {
			await $(returningSeg).click()
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
		await $(availableSeats).waitForDisplayed()
		await $(TravelerList).waitForDisplayed()
		var totalTravelers =await browser.$$(TravelerList)
		var getSeats =await browser.$$(availableSeats)
		for (var i = 0; i < getSeats.length; i++) {
			let gseats = await getSeats[i].getAttribute("data-hook")
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
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 4].slice(0, getAllSeats[i + 4].length - 1)&&
					getAllSeats[i].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 5].slice(0, getAllSeats[i + 5].length - 1)&&
					getAllSeats[i+6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 7].slice(0, getAllSeats[i + 7].length - 1)&&
					getAllSeats[i+6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 8].slice(0, getAllSeats[i + 8].length - 1)&&
					getAllSeats[i+6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 9].slice(0, getAllSeats[i + 9].length - 1)&&
					getAllSeats[i+6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 10].slice(0, getAllSeats[i + 10].length - 1)&&
					getAllSeats[i+6].slice(0, getAllSeats[i].length - 1) === getAllSeats[i + 11].slice(0, getAllSeats[i + 11].length - 1)) {				
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
		await $(seatMap).waitForDisplayed()
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]").click();
				if (await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).isDisplayed()) {
					await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).click()
					await browser.execute("window.scrollBy(0,-1000)");
				}
				if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}
		
				try{
					await $(takenSeats.replace("X", i + 1)).waitForDisplayed()
				}catch(ex){
					
				}
			}
		}
		else {
			await $(selectTraveler.replace("X", travelerNum)).click()
			var takenCount =await browser.$$(takenSeatsList)
			if (takenCount.length > 0) {
				var lastSelectedSeat = await $(takenSeats.replace("X", takenCount.length)).getAttribute("data-hook").split('_')[3]
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[adjacentSeats.indexOf(lastSelectedSeat) + 1] + "')]").click();
				if (await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).isDisplayed()) {
					await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).click()
				}
				if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}
			}
			else {
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]").click();
				if (await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).isDisplayed()) {
					await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).click()
				}
				if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}
			}
	
		}
	}
	async validateSeatsPageLoaded() {

		await $(seatMap).waitForDisplayed()
		assert.equal(
			await $(seatMap).isDisplayed(),
			true,
			'validation failed: SeatMap not loaded correctly'
		);
	}
	async selectReturningSegNonAdjacentSeats(seatType, travelerNum) {
		await $(seatBreadcrumb).scrollIntoView();
		if (await $(returningSeatsSelectButton).isDisplayed()) {
			await $(returningSeatsSelectButton).click()
		}
		else {
			await $(returningSeg).click()
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
		await $(availableSeats).waitForDisplayed()
		await $(TravelerList).waitForDisplayed()
		var totalTravelers = await browser.$$(TravelerList)
		var getSeats = await browser.$$(availableSeats)
		for (var i = 0; i < getSeats.length; i++) {
			getAllSeats.push(getSeats[i].getAttribute("data-hook").split('_')[2])
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
		await $(seatMap).waitForDisplayed()
		if (travelerNum === "all") {
			for (var i = 0; i < adjacentSeats.length; i++) {
				await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[i] + "')]").click();
				if (await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).isDisplayed()) {
					await $(exitRowPopup.replace("XX", adjacentSeats[i].toUpperCase())).click()
					await $(seatBreadcrumb).scrollIntoView();
				}
				if (await $(updateSelectedSeat).isDisplayed()) {
					updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
					await $(updateSelectedSeat).click()
				}
			
				try{
					await $(takenSeats.replace("X", i + 1)).waitForDisplayed()	
				}catch(ex){
					
				}
				
			}
		}
		else {
			await $(selectTraveler.replace("X", travelerNum)).click()

			await $("//span[contains(@data-hook,'" + seatType + "')][contains(@data-hook,'_" + adjacentSeats[travelerNum - 1] + "')]").click();
			if (await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).isDisplayed()) {
				await $(exitRowPopup.replace("XX", adjacentSeats[travelerNum - 1].toUpperCase())).click()
				await $(seatBreadcrumb).scrollIntoView();
			}
			if (await $(updateSelectedSeat).isDisplayed()) {
				updatedSeatDetails=await $(selectedSeatTypeUpdatePopup).getText()+'-'+$(selectedSeatIdUpdatePopup).getText()+'-'+$(selectedSeatPriceUpdatePopup).getText()
				await $(updateSelectedSeat).click()
			}
	
			await $(takenSeats.replace("X", 1)).waitForDisplayed()
		}
	}
	async clickContinueButton() {		

		await $(tailOfPlane).scrollIntoView()
		await $(continueButton).waitForClickable({ timeout: 40000 })
		await $(continueButton).click();
		if(await $(selectSeatPopupContinueButton).isDisplayed()){
			await $(selectSeatsPopup).scrollIntoView();
			await $(selectSeatPopupContinueButton).click()
		}

		if(await $(seatsPageReturningTabs).isDisplayed()){
			await this.clickSelectSeatPopupContinueButton('returning')
			await browser.pause(5000)
		}
   
	}
	async clickSelectSeatPopupContinueButton(flightType) {
		if (flightType === 'Departing') {
			await $(tailOfPlane).scrollIntoView()
			await $(continueButton).click()
		}
		browser.pause(1000)
		if(await $(popupContinueButton).isDisplayed()){
			await $(popupContinueButton).click()
		}	
		browser.pause(1000)
		if(await $(selectSeatPopupContinueButton).isDisplayed()){
			await $(selectSeatPopupContinueButton).click()
		}	
	}

	async validateTravelersGridSeat(tripType) {
		var totalTravelers = await browser.$$(TravelerList)
		for (var i = 1; i <= totalTravelers.length; i++) {
			if(await $(seatId.replace("X", i)).isDisplayed()){
			assert.equal(
				await $(seatId.replace("X", i)).getAttribute("data-hook"),
				'seat-id',
				'validation failed: Seat is not updated in travelers grid for ' + tripType
			);
		}
		else{
			assert.fail("Validation Failed: Seat not assigned for travelers:"+i);
		}
		}
		
	}
	async deselectSelectedSeat(segment, paxNum) {
		if (segment == "departing") {
			await $(departingSeg).click()
			await $(travelerGridPaxNum.replace("X", paxNum)).click()
			await $(takenSeats.replace("X", paxNum)).click()			
		}
		else {
			await $(travelerGridPaxNum.replace("X", paxNum)).click()
			await $(takenSeats.replace("X", paxNum)).click()
		}
		deselectedSeatDetails=await $(selectedSeatTypeDeselectPopup).getText()+'-'+$(selectedSeatIdDeselectPopup).getText()+'-'+$(selectedSeatPriceDeselectPopup).getText()
		await $(deselectSeatButton).click()

	}
	async validateSelectedFlightTypeInSeatsPage(flightType) {
	
		if (flightType.toLowerCase() === 'departing') {
			await $(seatsPageDepartingTabs).waitForDisplayed();
			assert.equal(
				await $(seatsPageDepartingTabs).getAttribute('aria-selected'),
				'true',
				'Departing Tab not selected'
			);
		}
		if (flightType.toLowerCase() === 'returning') {
			await $(seatsPageReturningTabs).waitForDisplayed();
			await $(seatsPageReturningTabs).click();
			assert.equal(
				await $(seatsPageReturningTabs).getAttribute('aria-selected'),
				'true',
				'Returning Tab not selected'
			);
		}
	}
	async validateSelectSeatsForMeButton(travelers, display) {
		if (travelers === '3')
			assert.equal(
				await $(selectSeatsForMe).isDisplayed(),
				display,
				'Select seats for me button is not displayed, Failed'
			);
		if (travelers === '6')
			assert.equal(
				await $(selectSeatsForMe).isDisplayed(),
				display,
				'Select seats for me button is displayed, Failed'
			);
	}
	async clickSelectSeatsForMeButton(flightType) {
		await browser.pause(4000);
		if (flightType === 'Departing') {
			await $(seatsPageDepartingTabs).waitForDisplayed();
			await $(seatsPageDepartingTabs).click();
			await $(selectSeatsForMe).click();
			await browser.pause(4000);
		}
		if (flightType === 'Returning') {
			await $(seatsPageReturningTabs).waitForDisplayed();
			await $(seatsPageReturningTabs).click();
			await $(selectSeatsForMe).click();
			await browser.pause(4000);
			this.collectTravelerSeatInfo();
		}
	}
	async validateTravelersGridSeatIsUnselected(paxNum) {
		assert.equal(
			await $(unAssignedSeat.replace("X", 1)).getText(),
			' —',
			'validation failed: Travelers Grid Seat should be unselected for traveler ' + paxNum
		);
	}
	async validateActiveButtonInSeatsPage(button, flightType) {
		if (flightType === 'Departing') {
			await $(selectReturningButton).isClickable()
			assert.equal(
				await $(selectReturningButton).getText(),
				button,
				'SELECT RETURNING button is not displayed, Failed'
			);
		}
		if (flightType === 'Returning') {
			await $(continueButtonInReturning).isClickable()
			assert.equal(
				await $(continueButtonInReturning).getText(),
				button,
				'Continue button is not displayed, Failed'
			);
		}
	}
	async clickSelectReturningButtonInDepartingTab() {
		await $(frontOfPlane).scrollIntoView()
		await this.pause(4000);
		await $(selectReturningButton).click();
	}
	async clickContinueButtonInReturningTab() {
		await $(continueButtonInReturning).waitForDisplayed()
		await $(continueButtonInReturning).waitForClickable()
		await $(continueButtonInReturning).click();
	}
	async validateSelectSeatsPopup(text) {
		assert.equal(
			await $(selectSeatsPopupText).getText(),
			text.replace("�", "’"),
			'SELECT RETURNING button is not displayed, Failed'
		);
		assert.equal(
			await $(selectSeatsNowButton).isDisplayed(),
			true,
			'SELECT SEATS NOW button is not displayed in Select Seats Popup, Failed'
		);
		assert.equal(
			await $(selectSeatPopupContinueButton).isDisplayed(),
			true,
			'CONTINUE button is not displayed in Select Seats Popup, Failed'
		);
	}
	async clickSelectSeatContinueButton() {
		await $(selectSeatPopupContinueButton).click()
	}
	async clickSelectSeatNowButton() {
		await $(selectSeatsNowButton).waitForDisplayed()
		await $(selectSeatsNowButton).click()
	}
	async validateBundleContent(content) {
		assert.equal(
			await $(bundleBannerContent).getText(),
			await content.replace("star", ""),
			'validation failed: Mismatch in bundle banner content '
		);
	}
	async validateBundleSeat() {
		var starSeat = await browser.$$(bundleSeatCount)
		assert.isAbove(
			starSeat.length,
			1,
			'Validation failed: No star marked bundle seat found'
		);
	}
	async validateNonBundleSeat() {
		var count = browser.$$(nonBundleSeatCount)
		if (count.length < 1) {
			await $(returningSeg).click()
			count = await browser.$$(nonBundleSeatCount)
		}
		assert.isAbove(
			count.length,
			1,
			'Validation failed: No priced seat found in the Seat Map'
		);
	}

	async validateSelectedSeatIsHighlighted() {
		var totalTravelers = await browser.$$(TravelerList)
		var takenSeats = await browser.$$(takenSeatsList)
		assert.equal(
			totalTravelers.length,
			takenSeats.length,
			'validation failed: Mismatch selected seat count '
		);
	}
	async collectTravelerSeatInfo() {
		var totalTravelers = browser.$$(TravelerList)
		await $(seatBreadcrumb).scrollIntoView();
		await $(departingSeg).click()
		await $(TravelerList).scrollIntoView()
		while(seatIdDepart.length>0){
			seatIdDepart.pop() 
			seatIdReturn.pop()
			seatPriceReturn.pop()
		}
		for (var i = 0; i < totalTravelers.length; i++) {
			await $(seatId.replace("X", i + 1)).scrollIntoView()
			seatIdDepart.push(await $(seatId.replace("X", i + 1)).getText())
			seatPriceDepart.push(await $(seatPrice.replace("X", i + 1)).getText())
		}		
		if(await $(returningSeg).isDisplayed()){
			await $(seatBreadcrumb).scrollIntoView()
			await $(returningSeg).click()
		for (var i = 0; i < totalTravelers.length; i++) {
			
		    await $(seatId.replace("X", i + 1)).scrollIntoView()
			seatIdReturn.push(await $(seatId.replace("X", i + 1)).getText())
			seatPriceReturn.push(await $(seatPrice.replace("X", i + 1)).getText())
			
		}	
		}		
	}
	async validateChildNonAdjacentSeatWarningPopup(text) {		
		assert.equal(
			await $(nonAdjacentSeatPopUpWarning).getText(),
			text,
			'validation failed: non Adjacent Seat PopUp Warning msg mismatch'
		);
		assert.equal(
			await $(nonAdjacentSeatPopUpWarningOkButton).isClickable(),
			true,
			'validation failed: non Adjacent Seat PopUp Ok Button mismatch'
		);
	}
	async clickOkButton() {
		await $(nonAdjacentSeatPopUpWarningOkButton).click()
	}
	async validateNonAdjacentSeatWarningPopupIsClosed() {
		assert.equal(
			await $(nonAdjacentSeatPopUp).isDisplayed(),
			false,
			'validation failed: non Adjacent Seat PopUp not closed'
		);
	}
	async validateSeatLegendWrapper() {
		assert.equal(
			await $(legendWrapper).isDisplayed(),
			true,
			'Validation failed: Legend Wrapper not displayed'
		);
	}
	async validateLegendWrapperText(text) {
		assert.equal(
			await $(legendWrapperText).getText(),
			text,
			'Validation failed: Legend Wrapper text not displayed'
		);
	}
	async validateSeatLegendWrapperIcon(icon, text) {
		if (icon === 'tOne') {
			assert.equal(
				await $(legendWrapperT1).getText(),
				text,
				'Validation failed: Legend Wrapper T1 Icon not displayed'
			);
		}
		if (icon === 'Selected') {
			assert.equal(
				await $(legendWrapperT1Selected).getText().replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper T1 Selected not displayed'
			);
		}
		if (icon === 'Legroom') {
			assert.equal(
				await $(legendWrapperLegroom).getText().replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Legroom not displayed'
			);
		}
		if (icon === 'Unavailable') {
			assert.equal(
				await $(legendWrapperUnavailable).getText().replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Unavailable not displayed'
			);
		}
		if (icon === 'Economy') {
			assert.equal(
				await $(legendWrapperEconomy).getText().replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Economy not displayed'
			);
		}
		if (icon === 'ExitExit') {
			assert.equal(
				await $(legendWrapperExitRowIcon).getText().replace("\n", " "),
				text,
				'Validation failed: Legend Wrapper Exit Row not displayed'
			);
		}
		if (icon === 'ExitRow') {
			assert.equal(
				await $(legendWrapperExitRow).isDisplayed(),
				true,
				'Validation failed: Legend Wrapper Exit Row not displayed'
			);
		}
	}
	async validateSeatLegendLegroomTooltipContent(text, textOne, textTwo) {
		await $(legroomToolTip).waitForDisplayed();
		await $(legroomToolTip).click();
		assert.equal(
			await $(legroomToolTipContentPopup).isDisplayed(),
			true,
			'Validation failed: Seat Legend Legroom Content Popup not displayed'
		);
		assert.equal(
			await $(legroomPlusContent).getText(),
			text,
			'Validation failed: Seat Legend Legroom Plus Content not displayed'
		);
		assert.equal(
			await $(extraLegroomContent).getText(),
			textOne,
			'Validation failed: Seat Legend Legroom - Extra Legroom Content not displayed'
		);
		assert.equal(
			await $(extraComfortContent).getText().replace("\n", " "),
			textTwo,
			'Validation failed: Seat Legend Legroom Extra Comfort & Inc. Appl. Taxes Content not displayed'
		);
	}
	async validateSeatLegendEconomyTooltipContent(text) {
		await $(economyToolTip).waitForDisplayed();
		await $(economyToolTip).click();
		assert.equal(
			await $(economyToolTipContentPopup).isDisplayed(),
			true,
			'Validation failed: Seat Legend Economy Content Popup not displayed'
		);
		assert.equal(
			await $(economyToolTipContentPopup).getText().replace("\n", " "),
			text,
			'Validation failed: Seat Legend Economy Tooltip Content not displayed'
		);
	}
	async validateTravelersGridSeatPrice(tripType) {
		var totalTravelers = await browser.$$(TravelerList)
		for (var i = 1; i <= totalTravelers.length; i++) {
			assert.equal(
				await $(seatPrice.replace("X", i)).getAttribute("data-hook"),
				'seat-price',
				'validation failed: Seat price is not updated in travelers grid for ' + tripType
			);
		}
	}
	async validateUnassignSeatPopup(segment, paxNum) {
		if (segment == "departing") {
			await $(departingSeg).click()
			await $(travelerGridPaxNum.replace("X", paxNum)).click()
			await $(takenSeats.replace("X", paxNum)).click()
		}
		else {
			await $(travelerGridPaxNum.replace("X", paxNum)).click()
			await $(takenSeats.replace("X", paxNum)).click()
		}
	}
	async validateUnassignSeatPopupContent() {
		await $(seatsPopoverDeselect).waitForDisplayed()
		assert.equal(
			await $(seatsPopoverDeselect).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Deselect Popup is not displayed'
		);
		assert.equal(
			await $(seatsPopoverTravelerIcon).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Traveler Icon is not displayed'
		);
		assert.equal(
			await $(seatsPopoverTravelerName).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Traveler Name is not displayed'
		);
		assert.equal(
			await $(seatsPopoverSeatTypeLabel).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Traveler Type Label is not displayed'
		);
		assert.equal(
			await $(seatsPopoverSeatID).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Traveler Seat ID is not displayed'
		);
		assert.equal(
			await $(seatsPopoverSeatPrice).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Traveler Seat Price is not displayed'
		);
		assert.equal(
			await $(seatsPopoverComfortLevel).getText(),
			'Comfort Level',
			'Validation failed: Seat Popover - Comfort Level is not displayed'
		);
		assert.equal(
			await $(seatsPopoverStars).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Stars is not displayed'
		);
		assert.equal(
			await $(seatsPopoverSeatInfo).isDisplayed(),
			true,
			'Validation failed: Seat Popover - Seat Info is not displayed'
		);
	}
	async validateUnavailableSeatDisabled() {
		var restrictedSeats = await browser.$$(unavailable)
		for (var i = 0; i < restrictedSeats.length; i++) {
			try {
				restrictedSeats[i].click()
			}
			catch (ex) {
			}
			assert.equal(
				await $(takenSeats.replace("X", 1)).isDisplayed(),
				false,
				'Validation Failed: Unavailable Seats not disabled'
			);
		}
	}
	async storeCurrentlySelectedSeatDataHook() {
		let dataHook = await $("[data-hook*='taken']").getAttribute("data-hook");
		selectedSeat = dataHook;
	}

	async collectSelectedSeatIdAndPrice(segment) {
		await $("[data-hook='seat-id']").waitForDisplayed();
		if (segment === "departing") {
			await collect('departingSelectedSeatIdKey', $("[data-hook='seat-id']").getText());
			await collect('departingSelectedSeatPriceKey', $("[data-hook='seat-price']").getText());
		}
		else if (segment === "returning") {
			await collect('returningSelectedSeatIdKey', $("[data-hook='seat-id']").getText());
			await collect('returningSelectedSeatPriceKey', $("[data-hook='seat-price']").getText());
		}
	}

	async selectSpecificSeat() {
		let dataHook = await selectedSeat.replace("taken_", "");
		await $(`[data-hook='${dataHook}']`).click();
	}
    async clickSelectedSeat(segment,traveler){
		await browser.pause(2000);
	if(segment==="departing"){
		await $(travelerSelectedSeat.replace("X",traveler)).click()
	}	
    }
	async validateSpecificSeatIsNotDisplayed() {
		await browser.pause(2000);
		if (await $(`[data-hook='${selectedSeat}']`).isDisplayed()) {
			assert.fail("The unavailable seat is still displayed as selected.")
		}
		let dataHook = await selectedSeat.replace("taken_", "");
		await $(`[data-hook='${dataHook}']`).waitForDisplayed();
		try {
			await $(`[data-hook='${dataHook}']`).click();
			assert.fail("Seat is still available.");
		} catch(ex) {
			assert.isOk("The seat is no longer available.");
		}
	}
	
	async validateErrorMessageIsDisplayed(content){
		assert.equal(
			await $(adultAlreadySelectedPopup).getText(),
				content,
				'Validation Failed: Mismatch in adult already selected popup'
			);
	}
	async validateMessageWhileTravelingWithChild(content){		
		assert.equal(
			await $(travelingWithChildrenNote).getText(),
				content,
				'Validation Failed: Mismatch in traveling With Children Note'
			);
	}
	async clickInfoIconForPackage(seatType){
		if(seatType==="Legroom"){
			await $(legroomLegendTooltip).click()
		}
		if(seatType==="Economy"){
			await $(economyLegendTooltip).click()
		}
	}
	async clickLink(link){
		if(link==="Select Seats for me"){
			await $(selectSeatsForMe).click()
		}
		if(link==="No Thanks"){
			await $(seatsPageSkip).click()
		}
	}
}
export { seatIdDepart, seatPriceDepart, seatIdReturn, seatPriceReturn,deselectedSeatDetails,updatedSeatDetails,selectedSeatDetails }
export default new SeatPage(); 