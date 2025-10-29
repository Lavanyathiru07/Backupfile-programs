import { Then } from '@cucumber/cucumber'
import ConfirmationPage from '../page-objects/confPageObject'
import GqlBookingPage from '../page-objects/bookingGql/GqlBookingPage'

Then(/^I am on confirmation page I click manage trip button$/, async () => {
    await ConfirmationPage.managetrip()
})

Then(/^I open new tab from the confirmation page$/,async() =>{
    await ConfirmationPage.newtab()
})

Then(/^I am on the confirmation page I expect confirmation number to be displayed$/, async () => {
    try {
        await ConfirmationPage.confirmationNumber()
        await GqlBookingPage.getBookingValues()
    } catch (error) {
        await ConfirmationPage.verifyGraphQlNetwork()
        process.env.SunSeekerPopUp = true
    }
})

Then(/^I am on the confirmation page I expect traveler details to be displayed correctly$/, async () => {
    await ConfirmationPage.validateTravelerDetailsDisplayedCorrectly()
})

Then(/^I am on the confirmation page I expect CarryOn-"([^"]*)" details to be displayed correctly$/, async (params) => {
    await ConfirmationPage.validateTravelerCarryOnBagDetailsDisplayedCorrectly(params);
});
Then(/^I am on the confirmation page I expect Check-"([^"]*)" details to be displayed correctly$/, async (params) => {
    await ConfirmationPage.validateTravelerCheckBagDetailsDisplayedCorrectly(params);
});
Then(/^I am on the confirmation page I expect priorityAccess-"([^"]*)" details to be displayed correctly$/, async (params) => {
    await ConfirmationPage.validateTravelerPriorityAccessDetailsDisplayedCorrectly(params);
});
Then(/^I am on the confirmation page I expect confirmation number to be displayed$/, async () => {
    try {
        // First validate that confirmation page has opened successfully
        await ConfirmationPage.validateConfirmationPageOpened()
        await ConfirmationPage.confirmationNumber()
        await GqlBookingPage.getBookingValues()
    } catch (error) {
        await ConfirmationPage.verifyGraphQlNetwork()
        process.env.SunSeekerPopUp = true
    }
})

Then(/^I am on confirmation page I expect (.+) SSR to be displayed for traveler (.+) for (.+) segments$/, async (petInCabin, paxNum, segment) => {
    await ConfirmationPage.validatePetInCabinInConfirmationPage(petInCabin, paxNum, segment);
});

Then(/^I am on confirmation page I expect correct seat assignment$/, async () => {
    await ConfirmationPage.validateSeatIdInConfirmationPage();
});

Then(/^I am on confirmation page I expect hotel title to be displayed$/, async () => {
    await ConfirmationPage.validateHotelTitle();
});

Then(/^I am on confirmation page I expect hotel address to be displayed$/, async () => {
    await ConfirmationPage.validateHotelAddress();
});

Then(/^I am on confirmation page I expect confirmation number to be displayed for the Hotel$/, async () => {
    await ConfirmationPage.validateHotelConfirmationNumber();
});

Then(/^I am on confirmation page I expect checkin date to be displayed for the hotel$/, async () => {
    await ConfirmationPage.validateCheckInDate();
});

Then(/^I am on confirmation page I expect checkout date to be displayed for the hotel$/, async () => {
    await ConfirmationPage.validateCheckOutDate();
});

Then(/^I am on confirmation page I expect room count and guest count to be displayed for the hotel$/, async () => {
    await ConfirmationPage.validateRoomCountAndGuestCount();
});

Then(/^I am on confirmation page I expect room type to be displayed$/, async () => {
    await ConfirmationPage.validateRoomType();
});

Then(/^I am on confirmation page I expect number of nights stay to be displayed$/, async () => {
    await ConfirmationPage.validateNightsStay();
});

Then(/^I am on confirmation page I expect cars title to be displayed$/, async () => {
    await ConfirmationPage.validateCarsTitle();
});

Then(/^I am on confirmation page I expect cars type to be displayed$/, async () => {
    await ConfirmationPage.validateCarsType();
});

Then(/^I am on confirmation page I expect confirmation number to be displayed for the car$/, async () => {
    await ConfirmationPage.validateCarsConfirmationNumber();
});

Then(/^I am on confirmation page I expect pickup date to be displayed$/, async () => {
    await ConfirmationPage.validatePickUpDate();
});

Then(/^I am on confirmation page I expect drop off date to be displayed$/, async () => {
    await ConfirmationPage.validateDropOffDate();
});

Then(/^I am on confirmation page I expect vendor name to be displayed$/, async () => {
    await ConfirmationPage.validateVendorName();
});

Then(/^I am on the confirmation page I expect customer name and emailId to be displayed correctly$/, async () => {
    await ConfirmationPage.validateCustomerNameAndEmailId();
});
