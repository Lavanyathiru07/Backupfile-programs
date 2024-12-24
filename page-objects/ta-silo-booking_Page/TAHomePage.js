import actions from '@g4/prova-ui/src/support/actions';
import common from '../Utils/common'

const bookTrip = "//h2[text()='Book Trip']"
const deptCityPath2 = "[name='search_form[departure_city]']"
const deptCityPath1 = "(//*[@class='generic-wrapper'])[1]"
const destCityPath = "[id*='destination_city']"
const FlightTab = "//a[text()='Flight']"
const taLoginForm = "#user-login"
const agentID = "#edit-name"
const agentPass = "#edit-pass"
const agentName = "#edit-agent-name"
const signInButton = "#edit-submit"
const tripType = "[id*='trip_type']"
const depCalendar = "[name='search_form[departure_date]'], button[class='datepicker-toogle']"
const retCalendar = "[name='search_form[return_date]'], button[class='datepicker-toogle']"

const adults = "[data-hook='open_PartyPicker_adults']"
const childrens = "[data-hook='open_PartyPicker_children']"

const searchBtn = "#submit-search"
const flightsDepartingArea = '#flights-wrapper #departing'
const closepopup = "[class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']"

class TAHomePage {

    get depCity() {
        return $('[id*="departure_city"]')
    };
    get deptList() {
        return $$('#sfrom-list ul li')
    }
    get destList() {
        return $$('#sto-list ul li')
    }

    async open_url(url) {
        try {
            await actions.openWebsite(url)
            await actions.waitForDisplayed(taLoginForm, "taLoginForm")
        } catch (error) {
            throw "Login form not available yet...!"
        }
    }

    async ta_login_app() {
        try {
            await actions.waitForClickable(agentID, "InputFieldUserName")
        } catch (err) {
            throw "Agent ID field is not clickable"
        }

        await actions.setInputField("setValue", "99000070", agentID, "InputFieldUserName")
        await actions.setInputField("setValue", "allegiant", agentPass, "InputFieldUserName")
        await actions.setInputField("setValue", "agent", agentName, "InputFieldUserName")
        await actions.clickElement("click", signInButton, "TAsignInButton")

        try {
            await actions.waitForDisplayed(bookTrip, "bookTrip")
        } catch (err) {
            throw "Book trip is not visible"
        }

    }

    async validateFlightPage() {
        await actions.waitForDisplayed(FlightTab, "FlightTab")
        let displayed = await actions.isDisplayed(FlightTab, "FlightTab")
        if(displayed){
            await browser.deleteAllCookies()
            console.log("logged in TA portal successfully")
        }else{
            throw new Error("TA user login Failed")
        }
    }

    async select_Origin(deptCity) {
        await actions.waitForEnabled(deptCityPath1, "departure City Dropdown")
        await actions.waitForClickable(deptCityPath1, "departure City Dropdown")
        let clickable = await actions.isClickable(deptCityPath1, "departure City Dropdown")
        if (clickable) {
            await actions.clickElement('click', deptCityPath1, "departure City Dropdown")
            await actions.setInputField('setValue', deptCity, deptCityPath2, "departure City Dropdown")
            await browser.pause(3000)
            await actions.pressButton("Enter")
        } else {
            throw new Error("departure City Dropdown is not clickable")
        }
    }
    async select_Dest(destCity) {
        await actions.waitForEnabled(destCityPath, "destination City Dropdown")
        await actions.waitForClickable(destCityPath, "destination City Dropdown")
        let clickable = await actions.isClickable(destCityPath, "destination City Dropdown")
        if (clickable) {
            await actions.clickElement("click", destCityPath, "destination City Dropdown")
            await actions.setInputField("setValue", destCity, destCityPath, "destination City Dropdown")
            await browser.pause(3000)
            await actions.pressButton("Enter")
        } else {
            throw new Error("destination City Dropdown is not clickable")
        }
    }

    async select_tripType(type) {
        type = type.toLowerCase()
        await actions.waitFor(tripType,3000)
        await actions.waitForEnabled(tripType, "tripType Dropdown")
            if (type.includes('ow') || type.includes('oneway') || type.includes('one way')) {
                await actions.selectOption(tripType, 'value', 'oneway')
                console.log("Oneway is selected as triptype")
            } else {
                await actions.selectOption(tripType, 'value', 'return')
                console.log("Round trip is selected as triptype")
            }
    }

    async select_departureDate(depDate) {
        await actions.waitForEnabled(depCalendar, "departure calendar icon")
        await actions.waitForClickable(depCalendar, "departure calendar icon")
        let clickable = await actions.isClickable(depCalendar, "departure calendar icon")
        if (clickable) {
            // await actions.scroll(depCalendar)
            await actions.clickElement('click', depCalendar, "departure calendar icon")
            await browser.pause(5000)
            await common.selectDate(depDate)
            await browser.pause(5000)
        } else {
            throw new Error("departureDate calender icon is not clickable")
        }
    }

    async select_returnDate(retDate) {
        await actions.waitForEnabled(retCalendar, "return calendar icon")
        await actions.waitForClickable(retCalendar, "return calendar icon")
        let clickable = await actions.isClickable(retCalendar, "return calendar icon")
        if (clickable) {
            // await actions.scroll(retCalendar)
            await actions.clickElement('click', retCalendar, "return calendar icon")
            await browser.pause(5000)
            common.selectDate(retDate)
            await browser.pause(5000)
        } else {
            throw new Error("return calender icon is not clickable")
        }

    }

    async select_Adults(adultsCount) {
        if (adultsCount > 1) {
            await browser.pause(3000)
            await actions.isEnabled(adults, "adultsdropdown")
            await actions.selectOption(adults, 'value', adultsCount)
        }
    }

    async select_Childrens(childCount) {
        if (childCount > 0) {
            await actions.isEnabled(childrens, "childrensdropdown")
            await actions.selectOption(childrens, 'value', childCount)
        }
    }

    async click_SearchButton() {
        await actions.waitForEnabled(searchBtn, "searchButton")
        await actions.waitForClickable(searchBtn, "searchButton")
        let clickable = await actions.isClickable(searchBtn, "searchButton")
        if (clickable) {
            // await actions.scroll(searchBtn)
            await browser.pause(1000)
            await actions.clickElement('click', searchBtn, "searchButton")
            await browser.pause(1000)
        } else {
            throw new Error("Flight search Button is not clickable")
        }

    }
    
    async click_SearchButtonTA() {
        await actions.waitForEnabled(searchBtn, "searchButton")
        await actions.waitForClickable(searchBtn, "searchButton")
        let clickable = await actions.isClickable(searchBtn, "searchButton")
        if (clickable) {
            // await actions.scroll(searchBtn)
            await actions.clickElement('click', searchBtn, "searchButton")
            await browser.pause(10000)
            // await actions.waitForDisplayed(flightsDepartingArea, "flightsDepartingArea")
            let displayed = await actions.isDisplayed(flightsDepartingArea, "flightsDepartingArea")
            if (!(displayed)) {
                await this.ta_login_app()
                // await actions.scroll(searchBtn)
                await browser.pause(1000)
                await actions.clickElement('click', closepopup, "close cookie popup")
                await actions.clickElement('click', searchBtn, "searchButton")
            }
        } else {
            throw new Error("Flight search Button is not clickable")
        }

    }
}
export default new TAHomePage()