import { Given, When, Then } from '@cucumber/cucumber'
import HLOPage from '../page-objects/HLOPage'

Given(/^I am on HLO Homepage I click on Hotel page$/, async () => {
  await HLOPage.clickHoteltab();
});

Then(/^I am on HLO page I select Destination city$/, async () => {
  await HLOPage.selectDestination() ;
});

Then(/^I am on HLO page I select checkin date "([^"]*)" days from current day$/, async (day) =>  {
  await HLOPage.selectcheckindate(day);
});

Then(/^I am on HLO page I select checkout date "([^"]*)" days from checkin day$/, async (day) =>  {
await HLOPage.selectcheckoutdate(day);
});

Then(/^I am on HLO page click on Search Hotels button$/, async () =>  {
  await HLOPage.clicksearchbutton();
});

Then(/^I am on Hotels page I select a Hotel$/, async () =>  {
  await HLOPage.clickHotel();
});

Then(/^I am on Hotels page I select a Room$/, async () =>  {
  await HLOPage.clickroom();
});

Then(/^I am on payment page I enter Guest Informations$/, async () =>  {
  await HLOPage.guestInformation();
});

Then(/^I am on HLO payment page I enter all required card details$/, async () =>  {
  await HLOPage.cardDetails();
});

Then(/^I am on HLO Payment page I enter all required billing address details$/, async () =>  {
  await HLOPage.billingaddress();
});


Then(/^I am on HLO payments page I enter the ticketmaster email address$/, async () =>  {
  await HLOPage.ticketmastermail();
});

Then(/^I am on HLO Payment page I select Purchase my trip button$/, async () =>  {
  await HLOPage.purchasemytrip();
});

Then(/^I am on the HLO confirmation page I expect confirmation number to be displayed$/, async () =>  {
  await HLOPage.validateConfirmationNum();
});

Then(/^I select HLO bookings$/, async () =>  {
  await HLOPage.clickHLOradio();
});


Then(/^I click on transactions tab$/, async () =>  {
  await HLOPage.transaction();
});

Then(/^I Verify HLO Balance Amount$/, async () =>  {
  await HLOPage.validateBalanceAmount();
});

Then(/^I navigate to G4portal and retrive HLO itn in MOD application$/, async () =>  {
  await HLOPage.navigateToHLO();
});


Then(/^I am on HLO page I select Destination city as "([^"]*)"$/, async (city) => {
  await HLOPage.originSelection(city);
});

Then(/^I select checkin date "([^"]*)" days from current day$/, async (days) => {
  await HLOPage.selectcheckindate(days);
});

Then(/^I select checkout date "([^"]*)" days from checkin day$/, async (days) => {
  await HLOPage.selectcheckoutdate(days);
});

Then(/^I click on the search page$/, async () => {
  await HotelsOnlyPage.hotelSearchButton();
});

Then(/^I am selecting the hotel from the dispalyed options$/, async () => {
  await HotelsOnlyPage.hotelSelection();
});

Then(/^I am selecting the room$/, async () => {
  await HotelsOnlyPage.roomSelection();
});

Then(/^I enter the Guest Informations$/, async () => {
  await HotelsOnlyPage.guestInformation();
});

Then(/^I enter all required card details$/, async () => {
  await HotelsOnlyPage.cardDetails();
});

Then(/^I enter all required billing address details in HLO$/, async () => {
  await HotelsOnlyPage.billingaddress();
});

Then(/^I click on the purchase my trip for hotel booking$/, async () => {
  await HotelsOnlyPage.purchasemytrip();
});

