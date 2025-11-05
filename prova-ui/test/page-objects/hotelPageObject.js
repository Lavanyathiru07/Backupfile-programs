const Actions = require("../../src/support/actions")

const scrollskip = "[data-hook='hotels-page_continue']"
const skipHotel = "[data-hook='hotels-page_skip']"
const hotelsPageHeadingTitle = "[data-hook='hotels-page_page-heading']";
const checkInDate = "[data-hook='hotels-page-search-criteria-check-in-date']";
const checkOutDate = "[data-hook='hotels-page-search-criteria-check-out-date']";
const hotelNoofRoom = "[data-hook='hotels-page-search-criteria-rooms-nights-count']";
const hoteldetailsPageRoom = '(//span[contains(@class,"Text-sc-1o5ubbx-0 bltVao")])[1]';
const hoteldetailsPageName = "[data-hook='hotel-details-page_name']";
const hoteldetailsPageAddress = "[data-hook='hotel-details-page_address']"
const scroollist = "//*[text()='List View']"
const roomsnrates = "//*[text()='Rooms and rates']"
const scrollrooms = "//*[text()='Rooms & Rates']"
const roombooking = "[data-hook='room-pod_hotel-book-button']"
const cbutton = "//*[@data-hook='hotels-page_continue'] | //*[@data-hook='hotel-details-page_continue'] | //*[text()='Continue']"
const carsPageHeader = "[data-hook='cars-page_page-heading']"
const hotelTitle = "[data-hook='hotels-page_page-heading']"
const continueButton = "[data-hook='hotels-page_continue']"
var hotelsDetailsPageCollectorCP = new Map();
var hotelsPageCollectorCP = new Map();

class HotelPage {

    actions;

    constructor(page, context) {
        this.actions = new Actions(page, context)
    }

    async hotelSkip() {
        await this.actions.pause(10000)
        await this.actions.waitForDisplayed(hotelTitle, 'hotelTitle', 6000)
        let hotelTitleVisibilty = await this.actions.isDisplayed(hotelTitle, 'hotelTitle')
        console.log("hotelPageHeaderVisbilty: ", hotelTitleVisibilty)
        if (hotelTitleVisibilty) {
            console.log("Hotel's Text is Available")
            await this.actions.waitForDisplayed(continueButton, 'continueButton')
            // await this.actions.scroll(continueButton)
            await this.actions.waitForDisplayed(skipHotel, 'No thanks link of hotel page')
            await this.actions.waitForClickable(skipHotel, 'Link to Skip Hotel Page')
            await this.actions.clickElement('click', skipHotel, "link to skip hotel page")
        }
        else {
            console.log('Hotels are not available for this city pair');
        }
    }

    async collectHotelPageDetailsForConfirmationPage() {
        await this.actions.waitUntilPageLoad()
        await this.actions.pause(5000)
        await this.actions.waitForDisplayed(hotelsPageHeadingTitle, 'Hotel page heading');
        hotelsPageCollectorCP.set(
            'checkInDateCP',
            await this.actions.getText(checkInDate, 'checkInDate'));

        hotelsPageCollectorCP.set(
            'checkOutDateCP',
            await this.actions.getText(checkOutDate, 'checkOutDate'));

        hotelsPageCollectorCP.set(
            'noOfRoomsCP',
            (await this.actions.getText(hotelNoofRoom, 'hotel no of room')).split[(" ", 1)]);

        var hotelRoom = await this.actions.getText(hotelNoofRoom, 'hotel no of room');
        hotelsPageCollectorCP.set(
            'noOfNightsCP',
            hotelRoom.slice(hotelRoom.indexOf(",") + 1, hotelRoom.indexOf("-")).trim());
    }

    async hotelselection() {
        await this.actions.waitForDisplayed(scroollist, 'scroollist')
        await this.actions.scroll(scroollist);
        await this.actions.waitForDisplayed(roomsnrates, 'roomsnrates button')
        // await this.actions.waitForClickable(roomsnrates, 'roomsnrates button')
        await this.actions.clickElement('click', roomsnrates, "Button of rooms and rates");
    }

    async roomselection() {
        await this.actions.waitUntilPageLoad()
        await this.actions.pause(15000)
        await this.actions.waitForDisplayed(roombooking, 'select room')
        await this.actions.clickElement('click', roombooking, "Button to book the rooms");
        // await this.actions.pause(5000)
    }

    async hotelContinueBtn() {
        await this.actions.pause(5000)
        await this.actions.waitForDisplayed(cbutton, 'cbutton button')
        // await this.actions.scroll(cbutton)
        await this.actions.waitForClickable(cbutton, 'cbutton button')
        await this.actions.clickElement('click', cbutton, "Hotel's Page Continue Button");
        await this.actions.waitForDisplayed(carsPageHeader, 'carsPageHeader')
    }

    async collectHotelDetailsPageDetailsForConfirmationPage() {
        hotelsDetailsPageCollectorCP.set(
            "hoteldetailsPageNameCP", await this.actions.getText(hoteldetailsPageName, 'hotel details page name'));
        // await browser.pause(2000);
        hotelsDetailsPageCollectorCP.set(
            "hoteldetailsPageAddressCP", (await this.actions.getText(hoteldetailsPageAddress, 'hotel details page address')).trim());
        // await browser.pause(2000);
        hotelsDetailsPageCollectorCP.set(
            'hoteldetailsPageRoomCP', (await this.actions.getText(hoteldetailsPageRoom, 'hotel details page room')).trim().replace(/[&@*^%]/g, '/'));
        // await browser.pause(2000);
    }

}
module.exports = HotelPage