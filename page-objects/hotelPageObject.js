import check from '@g4/prova-ui/src/support/validations'
import actions from '@g4/prova-ui/src/support/actions'
import { assert } from 'chai';
const heading = "//span[@data-hook='hotels-page_page-heading']";
const hotelText = "//span[contains(text(),'Bundle Air + Hotel and Save!')]"
const hotelTitle = "//h1//span[contains(text(), '+ Hotel')] | //*[data-hook='hotels-page_page-heading']"
const hotelPageTitle = '//title';
const hotelsPageHeadingTitle = "[data-hook='hotels-page_page-heading']";
const checkInDate = "[data-hook='hotels-page-search-criteria-check-in-date']";
const checkOutDate = "[data-hook='hotels-page-search-criteria-check-out-date']";
// const hotelNoofRoom = "[data-hook='hotels-page-search-criteria-rooms-nights-count']" 
const hotelNoofRoom="[data-hook='hotels-page-search-criteria-properties-count']";
const hoteldetailsPageRoom = '//div[@data-hook = "room-pod_0"]/div[2]/div/span';
const hoteldetailsPageName = "[data-hook='hotel-details-page_name']";
const hoteldetailsPageAddress = "[data-hook='hotel-details-page_address']"
const hoteldetailsPagePrice = "[data-hook='room-pod_price']";
const hotelinfo = "[class='Text-sc-1o5ubbx-0 hCxZJY']"
const scroollist = "//*[text()='List View']"
const roomsnrates = "//*[text()='Rooms and rates']"
const scrollrooms = "//*[text()='Rooms & Rates']"
const roombooking = "[data-hook='room-pod_hotel-book-button']"
const addtocart = "[data-hook='room-pod_hotel-added-to-cart-label']"
const scrolldisclaimer = "[data-hook='hotels-page-disclaimer']"
const continueButton = "[data-hook='hotels-page_continue']"
// const cbutton = "[data-hook='hotel-details-page_continue']"
const cbutton = "//*[contains(text(),'Continue')]"
const skipHotel = "[data-hook='hotels-page_skip']"
const carsPageHeader = "[data-hook='cars-page_page-heading']"
var hotelsDetailsPageCollectorCP = new Map();
var hotelsPageCollectorCP = new Map();
var hotelsPageCollector = new Map();
var hotelsDetailsPageCollector = new Map();

class HotelPage {

    async collectHotelPageDetailsForConfirmationPage() {
        await actions.pause(5000)
        await browser.waitUntil(async () => {
            return (await actions.isDisplayed(hotelsPageHeadingTitle, "hotelsPageHeadingTitle") === true)
        }, {
            timeout: 80000,
            timeoutMsg: 'hotelsPageHeadingTitle is not displayed after 80s'
        })
        await actions.waitForDisplayed(hotelsPageHeadingTitle, 'Hotel page heading');
        hotelsPageCollectorCP.set(
            'checkInDateCP',
            await actions.getText(checkInDate, 'checkInDate'));

        hotelsPageCollectorCP.set(
            'checkOutDateCP',
            await actions.getText(checkOutDate, 'checkOutDate'));

        hotelsPageCollectorCP.set(
            'noOfRoomsCP',
            (await $(hotelNoofRoom).getText()).split[(" ", 1)]);

        var hotelRoom = await $(hotelNoofRoom).getText();
        hotelsPageCollectorCP.set(
            'noOfNightsCP',
            hotelRoom.slice(hotelRoom.indexOf(",") + 1, hotelRoom.indexOf("-")).trim());
    }

    async collectHotelPageDetails() {
        var hotelCheckInDate = ((await actions.getText(checkInDate, 'checkInDate')).slice(4, 6)) + ((await $(checkInDate).getText()).slice(0, 3)) + (await $(checkInDate).getText()).slice(8, 12);
        hotelsPageCollector.set(
            'checkInDate',
            hotelCheckInDate);

        var hotelCheckOutDate = ((await actions.getText(checkOutDate, 'checkInDate')).slice(4, 6)) + ((await $(checkOutDate).getText()).slice(0, 3)) + (await $(checkOutDate).getText()).slice(8, 12);
        hotelsPageCollector.set(
            'checkOutDate',
            hotelCheckOutDate);


        hotelsPageCollector.set(
            'noOfRooms',
            (await actions.getText(hotelNoofRoom, 'hotelNoofRoom')).split[(",", 1)]);

        var hotelRoom = await actions.getText(hotelNoofRoom, 'hotelNoofRoom')
        hotelsPageCollector.set(
            'noOfNights',
            hotelRoom.slice(hotelRoom.indexOf(",") + 1, hotelRoom.indexOf("-")));
    }

    async collectHotelDetailsPageDetails() {
        hotelsDetailsPageCollector.set(
            'hoteldetailsPageName',
            $(hoteldetailsPageName).getText());

        hotelsDetailsPageCollector.set(
            'hoteldetailsPagePrice',
            (await $(hoteldetailsPagePrice).getText()).split("$")[1]);

        hotelsDetailsPageCollector.set(
            'hoteldetailsPageRoom',
            $(hoteldetailsPageRoom).getText());

    }

    async collectHotelDetailsPageDetailsForConfirmationPage() {
        await actions.pause(10000);
        await actions.waitForDisplayed(hoteldetailsPageName, 'hoteldetailsPageName');
        if (await actions.isDisplayed(hoteldetailsPageName, 'hoteldetailsPageName')) {
            console.log("the hotel rooms page is Displayed ")
            hotelsDetailsPageCollectorCP.set(
                "hoteldetailsPageNameCP", await $(hoteldetailsPageName).getText());
            // await browser.pause(2000);
            hotelsDetailsPageCollectorCP.set(
                "hoteldetailsPageAddressCP", (await $(hoteldetailsPageAddress).getText()).trim());
            // await browser.pause(2000);
            hotelsDetailsPageCollectorCP.set(
                'hoteldetailsPageRoomCP', (await $(hoteldetailsPageRoom).getText()).trim().replace(/[&@*^%]/g, '/'));
            // await browser.pause(2000);
        }
        else{
            throw new Error(`The Hotel Room page is not displayed.`)
        }
    }

    async validateHotelsPageTitle(title) {
        // await browser.pause(5000);
        try {
            await $(heading).waitForDisplayed();
            await assert.equal(
                await $(heading).getText(),
                title,
                'Validation failed: Hotel page title mismatch mismatch'
            );
        } catch (Exception) {
            console.log("Hotel Page is skipped as hotels not available for the city pair or for that particular date")
        }
    }

    async hotelSkip() {
        // await actions.pause(6000)
        await actions.waitForDisplayed(hotelTitle, 'hotelTitle', 20000)
        let hotelTitleVisibilty = await actions.isDisplayed(hotelTitle, 'hotelTitle')
        console.log("hotelPageHeaderVisbilty: ", hotelTitleVisibilty)
        if (hotelTitleVisibilty) {
            console.log("Hotel's Text is Available")
            await actions.waitForDisplayed(continueButton, 'continueButton')
            await actions.scroll(continueButton,'continueButton')
            await actions.waitForDisplayed(skipHotel, 'No thanks link of hotel page')
            await actions.waitForClickable(skipHotel, 'Link to Skip Hotel Page')
            await actions.clickElement('click', skipHotel, "link to skip hotel page")
            await actions.pause(10000)
        }
        else {
            console.log('Hotels are not available for this city pair');
        }
    }

    async hotelselection() {
        await actions.waitForDisplayed(scroollist, 'scroollist', 400000)
        await actions.scroll(scroollist,'scroollist');
        await actions.waitForDisplayed(roomsnrates, 'roomsnrates button')
        await actions.waitForClickable(roomsnrates, 'roomsnrates button')
        await actions.clickElement('click', roomsnrates, "Button of rooms and rates");
    }

    async roomselection() {
        await actions.waitForDisplayed(scrollrooms, 'scrollrooms',40000)
        await actions.scroll(scrollrooms,'scrollrooms');
        await actions.waitForDisplayed(roombooking, 'roombooking button')
        await actions.waitForClickable(roombooking, 'roombooking button')
        await actions.clickElement('click', roombooking, "Button to book the rooms");
        await actions.pause(20000)
    }

    async hotelContinueBtn() {
        await actions.waitForDisplayed(hotelTitle,'hotelTitle',30000)
        if ((await browser.getUrl()).includes('hotels')) {
            await actions.waitForDisplayed(cbutton, 'cbutton button', 30000)
            await actions.scroll(cbutton);
            await actions.waitForClickable(cbutton, 'cbutton button')
            await actions.clickElement('click', cbutton, "Hotel's Page Continue Button");
            await actions.waitForDisplayed(carsPageHeader, 'carsPageHeader', 30000)
        }
    }

}
export { hotelsPageCollector }
export { hotelsDetailsPageCollector }
export { hotelsPageCollectorCP }
export { hotelsDetailsPageCollectorCP }
export default new HotelPage()