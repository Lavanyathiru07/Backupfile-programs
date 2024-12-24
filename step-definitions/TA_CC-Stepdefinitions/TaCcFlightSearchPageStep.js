import {Given, When, Then} from '@cucumber/cucumber'
import tahomePage from '../../page-objects/ta-silo-booking_Page/TAHomePage'
import fakeData from 'faker'

Then(/^I Validate Flight search page is opened for TAPortal$/, async () => {
    await tahomePage.validateFlightPage()
})

//city-Pairs-triptype
Then(/^I select DepartureCity "([^"]*)" from Dropdown$/, async (deptCity) => {
        await tahomePage.select_Origin(deptCity)
})

Then(/^I Select the DepartureCity from dropdown$/, async () => {
        await tahomePage.select_random_deptCity()
})

Then(/^I select DestinationCity "([^"]*)" from Dropdown$/, async (destCity) => {
        await tahomePage.select_Dest(destCity)
})

Then(/^I Select the DestinationCity from dropdown$/, async () => {
        await tahomePage.select_random_destCity()
})

Then(/^I Select TripType as "([^"]*)" from Dropdown$/, async (type)=>{
    await tahomePage.select_tripType(type)
})

Then(/^I Select the TripType$/, async ()=>{
    await tahomePage.select_random_tripType()
})

Then(/^I enter Departure city "([^"]*)" Destination City "([^"]*)" trip type "([^"]*)" in booking page$/,async (deptCity, destCity, tripType) => {
    await tahomePage.select_Origin(deptCity)
    await tahomePage.select_Dest(destCity)
    await tahomePage.select_tripType(tripType)
})

//dep-des--dates
Then(/^I Select the Departure date as "([^"]*)" days from current available date$/,async(depDate)=>{
    await tahomePage.select_departureDate(depDate)
})

Then(/^I Select the Departure date as "([^"]*)" days for TAPortal$/,async(depDate)=>{
    await tahomePage.select_departureDate(depDate)
})

Then(/^I Select Departure date from Calendar icon for TAPortal$/,async()=>{
    let depDate = "14"
    await tahomePage.select_departureDate(depDate)
})

Then(/^I enter departure date "([^"]*)" in booking page$/,async (depDate)=>{
    await tahomePage.select_departureDate(depDate)
})

Then(/^I enter destination date "([^"]*)" in booking page$/,async (retDate)=>{
    await tahomePage.select_returnDate(retDate)
})

Then(/^I Select the Departure date$/,async ()=>{
    //select 1 to 10 days
    await tahomePage.select_departureDate(fakeData.random.number(9)+1)
})

//return-date
Then(/^I Select the Return date as "([^"]*)" days from Departure date$/,async (retDate)=>{
    await tahomePage.select_returnDate(retDate)
})

Then(/^I Select the Return date as "([^"]*)" days for TAPortal$/,async (retDate)=>{
    await tahomePage.select_returnDate(retDate)
})

Then(/^I Select return date from Calendar icon for TAPortal$/,async ()=>{
    let retDate = "3"
    await tahomePage.select_returnDate(retDate)
})

Then(/^I Select the Return date$/,async ()=>{
    //select 1 to 10 days
    await tahomePage.select_returnDate(fakeData.random.number(9)+1)
})

//pax-details
Then(/^I select Total "([^"]*)" from Dropdown$/, async (adults)=>{
    await tahomePage.select_Adults(adults)
})

Then(/^I Select Total "([^"]*)" Child passengers from Dropdown$/, async (childrens)=>{
    await tahomePage.select_Childrens(childrens)
})

Then(/^I enter Adult "([^"]*)" children "([^"]*)" in booking page$/,async (adults, children)=>{
    await tahomePage.select_Adults(adults)
    await tahomePage.select_Childrens(children)
})

Then(/^I Select the Adult passengers from Dropdown$/, async ()=>{
    //select 1 to 9 adults
    await tahomePage.select_Adults(fakeData.random.number(8)+1)
})

Then(/^I Select the Child passengers from Dropdown$/, async ()=>{
    //select 1 to 3 childs
    await tahomePage.select_Childrens(fakeData.random.number(2)+1)
})


//flights-search-button

Then(/^I can select the Search button from TAPortal$/, async ()=>{
    await tahomePage.click_SearchButtonTA()
})

Then(/^I click on search button from CCPortal$/,async ()=>{
    await tahomePage.click_SearchButton()
})