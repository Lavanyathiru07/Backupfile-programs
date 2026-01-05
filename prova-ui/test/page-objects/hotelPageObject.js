import Actions from '../../src/support/actions.js'

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

        await this.actions.waitUntilPageLoad()
        await this.actions.waitForLoadState('domcontentloaded', 15000)

        try {
            await this.actions.waitForDisplayed(hotelTitle, 'hotelTitle', 15000)
            console.log("Hotels page loaded successfully")
        } catch (error) {
            console.log('Hotels page heading not found, checking if we might be on cars page already')
            try {
                await this.actions.waitForDisplayed(carsPageHeader, 'cars page header', 3000)
                console.log('Already on cars page - hotels may have been skipped automatically')
                return
            } catch (carsError) {
                console.log('Not on cars page either, will attempt hotel skip anyway')
            }
        }

        const skipStrategies = [
            { selector: skipHotel, description: 'main skip hotel button' },
            { selector: continueButton, description: 'continue button' }
        ]

        let skipClicked = false
        for (const strategy of skipStrategies) {
            try {
                console.log(`Trying skip strategy: ${strategy.description}`)
                if (await this.actions.isDisplayed(strategy.selector, strategy.description)) {
                    await this.actions.scroll(strategy.selector) // Scroll to ensure visibility
                    await this.actions.waitForClickable(strategy.selector, strategy.description, 5000)
                    await this.actions.clickElement('click', strategy.selector, strategy.description)
                    console.log(`Successfully clicked: ${strategy.description}`)
                    skipClicked = true
                    break
                }
            } catch (error) {
                console.log(`Skip strategy failed - ${strategy.description}: ${error.message}`)
            }
        }

        if (!skipClicked) {
            console.log('Warning: Could not click any skip hotel button')
        }

        // Wait a bit for navigation to occur
        await this.actions.waitForLoadState('load', 5000)
        console.log('Hotel skip process completed')
    }

    async collectHotelPageDetailsForConfirmationPage() {
        await this.actions.waitForLoadState('domcontentloaded', 50000);
        await this.actions.waitForURL('**/hotels', 10000);
        await this.actions.waitForDisplayed(hotelsPageHeadingTitle, 'Hotel page heading', 25000);
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
        await this.actions.waitForDisplayed(roombooking, 'select room', 15000)
        await this.actions.waitForClickable(roombooking, 'select room button', 5000)
        await this.actions.clickElement('click', roombooking, "Button to book the rooms");
        // await this.actions.pause(5000)
    }

    async hotelContinueBtn() {
        await this.actions.waitForDisplayed(cbutton, 'cbutton button', 5000)
        await this.actions.waitForClickable(cbutton, 'cbutton button', 3000)
        await this.actions.waitForClickable(cbutton, 'cbutton button', 3000)
        // await this.actions.scroll(cbutton)
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
export default HotelPage