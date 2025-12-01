import actions from "../../src/support/actions"
import { page as browser } from "../../src/hooks-playwright/playwright-hooks"

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
const cbutton = "//*[@data-hook='hotels-page_continue'] | //*[@data-hook='hotel-details-page_continue']"
const carsPageHeader = "[data-hook='cars-page_page-heading']"
const hotelTitle = "[data-hook='hotels-page_page-heading']"
const continueButton = "[data-hook='hotels-page_continue']"
var hotelsDetailsPageCollectorCP = new Map();
var hotelsPageCollectorCP = new Map();

class HotelPage {

    async hotelSkip() {
        await actions.pause(6000)
        await actions.waitForDisplayed(hotelTitle, 'hotelTitle', 6000)
        let hotelTitleVisibilty = await actions.isDisplayed(hotelTitle, 'hotelTitle')
        console.log("hotelPageHeaderVisbilty: ", hotelTitleVisibilty)
        if (hotelTitleVisibilty) {
            console.log("Hotel's Text is Available")
            await actions.waitForDisplayed(continueButton, 'continueButton')
            await actions.scroll(continueButton)
            await actions.waitForDisplayed(skipHotel, 'No thanks link of hotel page')
            await actions.waitForClickable(skipHotel, 'Link to Skip Hotel Page')
            await actions.clickElement('click', skipHotel, "link to skip hotel page")
        }
        else {
            console.log('Hotels are not available for this city pair');
        }
    }

    async collectHotelPageDetailsForConfirmationPage() {
        await actions.waitUntilPageLoad()
        await actions.pause(5000)
        await actions.waitForDisplayed(hotelsPageHeadingTitle, 'Hotel page heading');
        hotelsPageCollectorCP.set(
            'checkInDateCP',
            await actions.getText(checkInDate, 'checkInDate'));

        hotelsPageCollectorCP.set(
            'checkOutDateCP',
            await actions.getText(checkOutDate, 'checkOutDate'));

        hotelsPageCollectorCP.set(
            'noOfRoomsCP',
            (await actions.getText(hotelNoofRoom, 'hotel no of room')).split[(" ", 1)]);

        var hotelRoom = await actions.getText(hotelNoofRoom, 'hotel no of room');
        hotelsPageCollectorCP.set(
            'noOfNightsCP',
            hotelRoom.slice(hotelRoom.indexOf(",") + 1, hotelRoom.indexOf("-")).trim());
    }

    async hotelselection() {
        await actions.waitForDisplayed(scroollist, 'scroollist')
        await actions.scroll(scroollist);
        await actions.waitForDisplayed(roomsnrates, 'roomsnrates button')
        // await actions.waitForClickable(roomsnrates, 'roomsnrates button')
        await actions.clickElement('click', roomsnrates, "Button of rooms and rates");
    }

    async roomselection() {
        await actions.waitUntilPageLoad()
        await actions.waitForDisplayed(roombooking, 'select room')
        await actions.clickElement('click', roombooking, "Button to book the rooms");
        // await actions.pause(5000)
    }

    async hotelContinueBtn() {
        // await actions.pause(5000)
        await actions.waitForDisplayed(cbutton, 'cbutton button')
        await actions.scroll(cbutton)
        await actions.waitForClickable(cbutton, 'cbutton button')
        await actions.clickElement('click', cbutton, "Hotel's Page Continue Button");
        await actions.waitForDisplayed(carsPageHeader, 'carsPageHeader')
    }

    async collectHotelDetailsPageDetailsForConfirmationPage() {
        hotelsDetailsPageCollectorCP.set(
            "hoteldetailsPageNameCP", await actions.getText(hoteldetailsPageName, 'hotel details page name'));
        // await browser.pause(2000);
        hotelsDetailsPageCollectorCP.set(
            "hoteldetailsPageAddressCP", (await actions.getText(hoteldetailsPageAddress, 'hotel details page address')).trim());
        // await browser.pause(2000);
        hotelsDetailsPageCollectorCP.set(
            'hoteldetailsPageRoomCP', (await actions.getText(hoteldetailsPageRoom, 'hotel details page room')).trim().replace(/[&@*^%]/g, '/'));
        // await browser.pause(2000);
    }

}
export default new HotelPage()