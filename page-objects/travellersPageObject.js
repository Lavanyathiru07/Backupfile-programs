import actions from '@g4/prova-ui/src/support/actions'
import TravelersPage from './TravelersPage'
import { departDate, returnDate } from './flightsPageObject'
import faker from 'faker'
var firstName
var lastName
let countTraveler
const travelerType = "//span[contains(@data-hook,'_title')][contains(@data-hook,'travelers-form_')]"
const infantInLap = "//span[contains(@data-hook,'travelers-form_infantsInLap_0_title')]"
const infantInLapMonth = "[data-hook='travelers-form_infantsInLap_0_dob-month']"
const infantInLapDay = "[data-hook='travelers-form_infantsInLap_0_dob-day']"
const infantInLapYear = "[data-hook='travelers-form_infantsInLap_0_dob-year']"
const designatedLapField = "//div[@data-hook='travelers-form_TYPE_X_designated-lap']//div//div//div"
const designatedLapDropDownOptionSelection = "//div[contains(@id,'react-select-infantsInLap.X.designated-lap-option-Y')]"
const nameValidation = "[data-hook='travelers-form_adults_0_first-name']"
const lname = "[data-hook='travelers-form_adults_0_last-name']"
const month = "[data-hook='travelers-form_adults_0_dob-month']"
const settingmonth = "[data-hook='travelers-form_adults_0_dob-month'] input"
const day = "[data-hook='travelers-form_adults_0_dob-day']"
const selectingdate = "[data-hook='travelers-form_adults_0_dob-day'] input"
const year = "[data-hook='travelers-form_adults_0_dob-year']"
const namescroll = "[data-hook='travelers-form_adults_0_title']"
const selectinggender = "[data-hook='travelers-form_adults_0_gender_MALE']"
const ssrscrolling = "[data-hook='travelers-form_adults_0_ssrs-section_open-button']"
const travelerCount = "//*[@data-hook='header-flight-info_seated']"
const continuetrav = "[data-hook='travelers-page_continue']"
const spinnerBar = "//span[contains(@data-hook,'spinner')]"
const addButtonSSR = "[data-hook='travelers-form_adults_X_ssrs-section_label']"
const addButtonSSRChild = "//*[@data-hook='travelers-form_children_X_ssrs-section_label']"
const wheelchairAssistance = "//label[@data-hook='travelers-form_adults_X_LEG_airport-provided-wheelchair_label']//div[contains(@class,'Checkbox')]";
const wheelchairAssistanceChild = "//label[@data-hook='travelers-form_children_X_LEG_airport-provided-wheelchair_label']//div[contains(@class,'Checkbox')]";
const personalWheelChairScooter = "//label[@data-hook='travelers-form_adults_X_LEG_wheelchair_label']//div[contains(@class,'Checkbox')]"
const personalWheelChairScooterChild = "//label[@data-hook='travelers-form_children_X_LEG_wheelchair_label']//div[contains(@class,'Checkbox')]"
const departingPersonalWheelchairOrScooter = "[data-hook='travelers-form_adults_0_departing_wheelchair_label']";
const returningPersonalWheelchairOrScooter = "[data-hook='travelers-form_adults_0_returning_wheelchair_label']";
const departingWheelchairWCHS = "[data-hook='travelers-form_adults.0.departing_WCHS']";
const returningWheelchairWCHS = "[data-hook='travelers-form_adults.0.returning_WCHS']";
const wheelchairType = "[data-hook='travelers-form_adults.X.LEG_SSRTYPE']";
const departingPersonalWheelchairWCBW = "[data-hook='travelers-form_adults.0.departing_WCBW']";
const returningPersonalWheelchairWCBW = "[data-hook='travelers-form_adults.0.returning_WCBW']";
const departingOxygenConcentrator = "[data-hook='travelers-form_adults_0_departing_oxygen-concentrator_label']";
const returningOxygenConcentrator = "[data-hook='travelers-form_adults_0_returning_oxygen-concentrator_label']";
const oxygenConcentrator = "//label[@data-hook='travelers-form_adults_X_LEG_oxygen-concentrator_label']//div[contains(@class,'Checkbox')]";
const oxygenConcentratorChild = "//label[@data-hook='travelers-form_children_X_LEG_oxygen-concentrator_label']//div[contains(@class,'Checkbox')]";
const departingEmotionalSupport = "(//span[contains(text(),'Emotional Support')])[1]";
const returningEmotionalSupport = "(//span[contains(text(),'Emotional Support')])[2]";
const departingDeaf = "(//span[contains(text(),'Deaf')])[1]";
const returningDeaf = "(//span[contains(text(),'Deaf')])[2]";
const deafSSR = "//label[@data-hook='travelers-form_adults_X_LEG_deaf-hard-of-hearing_label']//div[contains(@class,'Checkbox')]"
const deafSSRChild = "//label[@data-hook='travelers-form_children_X_LEG_deaf-hard-of-hearing_label']//div[contains(@class,'Checkbox')]"
const serviceAnimal = "//label[@data-hook='travelers-form_adults_X_LEG_service-animal_label']//div[contains(@class,'Checkbox')]"
const serviceAnimalChild = "//label[@data-hook='travelers-form_children_X_LEG_service-animal_label']//div[contains(@class,'Checkbox')]"
const blindSSR = "//label[@data-hook='travelers-form_adults_X_LEG_visually-impaired_label']//div[contains(@class,'Checkbox')]"
const intellectualSSR = "//label[@data-hook='travelers-form_adults_X_LEG_intellectual-or-developmental-disability_label']//div[contains(@class,'Checkbox')]"
const blindSSRChild = "//label[@data-hook='travelers-form_children_X_LEG_visually-impaired_label']//div[contains(@class,'Checkbox')]"
const intellectualSSRChild = "//label[@data-hook='travelers-form_children_X_LEG_intellectual-or-developmental-disability_label']//div[contains(@class,'Checkbox')]"
const lapInfantheader = "[data-hook='travelers-form_infantsInLap_0_title']"
const tofromGate = "//label[@data-hook='travelers-form_adults.X.LEG_WCHR']/div[2]"
const tofromGateChild = "//label[@data-hook='travelers-form_children.X.LEG_WCHR']/div[2]"
const manualWheelChairScooter = "//label[@data-hook='travelers-form_adults.X.LEG_WCMP']/div[2]"
const manualWheelChairScooterChild = "//label[@data-hook='travelers-form_children.X.LEG_WCMP']/div[2]"
const infantInLapFirstName = "//input[@data-hook='travelers-form_adults_0_infant-in-lap-first-name']"
const infantInLapLastName = "//input[@data-hook='travelers-form_adults_0_infant-in-lap-last-name']"
const infantInLapMaleGender = "[data-hook='travelers-form_adults_0_infant-in-lap-gender_MALE']"
const infantInLapFemaleGender = "[data-hook='travelers-form_adults_0_infant-in-lap-gender_FEMALE']"
const infantInLapGender = "//label[@data-hook='travelers-form_infantsInLap_0_gender_FEMALE']"
const departingText = "(//*[@class='Text-sc-1o5ubbx-0 bUDeQp'])[1]"
const InfantinLapCheckBox ="//div[@class='Checkbox__CheckboxWrapper-rs63ys-0 ekGfWh']"
const TravelerspageHeader="//span[text()='Who Will Be Traveling?']"
const infantdobMonthDropdown = "//div[@data-hook='travelers-form_adults_0_infant-in-lap-dob-month']"
const infantdobDayDropdown = "//div[@data-hook='travelers-form_adults_0_infant-in-lap-dob-day']"
const infantyearfield = "//input[@data-hook='travelers-form_adults_0_infant-in-lap-dob-year']"
class TravellersPage {
    async fillAlltravelerDetails(travelerCount) {
        var LapInfantCheck = travelerCount
        // await actions.waitFor(travelerType,30000)
        await actions.waitUntil(travelerType, 'traveller form')
        await actions.waitForDisplayed(travelerType, 'traveller form')
        var paxType = await browser.$$(travelerType)
        console.log("paxType.length: " + paxType.length)
        if (travelerCount === "all") {
            travelerCount = paxType.length
            // if (await actions.isDisplayed(infantInLap, 'infant in lap form')) {
            //     travelerCount = paxType.length - 1
            // }
        }
        for (var i = 0; i < paxType.length; i++) {
            console.log("paxType[i].getText(): " + (await actions.getText(paxType[i], 'paxType')))
        }
        var Fname = "";
        var Lname = "";
        var Mail;
        if (process.env.ENV.includes("prod")) {
            Fname = "QAPROD"
            Lname = "PLZIGNORE"
            Mail = "bat@allegiantair.com"
        } else {
            Fname = "QA"
            process.env.firstName = Fname
            Lname = "Automation"
            process.env.lastName = Lname
            Mail = "someone@invalidemail.com"
        }
        var randomFname
        var randomLname
        var randomGender
        var randomDOB
        var FakeDOB
        var gen = "male"
        var dateOfBirth = "10-10-1990"
        var infantCount = 0;

        for (var i = 1; i < travelerCount; i++) {
            randomFname = await faker.name.firstName();
            Fname = Fname + "|" + randomFname
            randomLname = await faker.name.lastName();
            Lname = Lname + "|" + randomLname
            //FakeDOB = faker.date.between('01-10-1970', '01-10-1990');
            let travellertype = (await paxType[i].getText()).split(':')[1]
            if (travellertype.toLowerCase().trim().includes("infant")) {
                infantCount = infantCount + 1;
            }
            FakeDOB = await this.getDOB(travellertype.toLowerCase().trim())
            var month = FakeDOB.getMonth() + 1
            var fakeDate = FakeDOB.getDate()
            // if (month < 10) {
            //     month = "0" + month;
            // }
            if (fakeDate < 10) {
                fakeDate = "15";
            }
            randomDOB = fakeDate + "-" + month + "-" + FakeDOB.getFullYear()
            dateOfBirth = dateOfBirth + "|" + randomDOB
            randomGender = "male"
            gen = gen + "|" + randomGender
        }
        await TravelersPage.enterTravelerFirstName(Fname);
        await TravelersPage.enterTravelerLastName(Lname);
        await TravelersPage.selectTravelerDOB(dateOfBirth);
        await TravelersPage.selectTravelerGender(gen);
        await TravelersPage.enterTravelerPhone("78456912332");
        await TravelersPage.enterTravelerEmailId(Mail);

        firstName = Fname;
        Fname = "";
        lastName = Lname;
        Lname = "";

        if (infantCount > 0) {
            let infantInLapVisibility = await actions.isDisplayed(infantInLap, 'LapInfant form')
            if (infantInLapVisibility) {
                await actions.scroll(lapInfantheader)
                await actions.clickElement('click', designatedLapField.replace("TYPE", 'infantsInLap').replace("X", 0), "designated lap dropdown")
                await actions.clickElement('click', designatedLapDropDownOptionSelection.replace("X", 0).replace("Y", 0), "designated lap dropdown")
            }
        }
    }

    async getDOB(DOB) {
        var newDOB = new Date(departDate);
        console.log("departDate: ", departDate)

        if (DOB.includes("adult")) {
            newDOB.setDate(newDOB.getDate() - 12000);
        }
        if (DOB.includes("child")) {
            await actions.pause(3000)
            newDOB.setDate(newDOB.getDate() - 5110);
        }
        if (DOB.trim().includes("infant")) {
            newDOB.setDate(newDOB.getDate() - 300);
        }
        if (DOB === "currentDate") {
            newDOB.setDate(newDOB.getDate() - 0);
        }
        if (DOB === "yearInFuture") {
            newDOB.setDate(newDOB.getDate() + 366);
        }
        if (DOB === ">2yrsForRetrunflight") {
            newDOB = new Date(returnDate);
            newDOB.setDate(newDOB.getDate() - 732);
        }
        return newDOB
    }

    async travellerinfo(departDateOffset) {
            function getRandomArrayElement(array) {
            const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }

        const firstNames = ["Ava", "Liam", "Sophia", "Ethan", "Isla", "Noah", "Emma"];
        const lastNames = ["Smith", "Johnson", "Brown", "Miller", "Anderson", "Davis"];
       
        function getRandomGender() {
            const genders = ['Male', 'Female'];
            const randomIndex = Math.floor(Math.random() * genders.length);
            return genders[randomIndex];
        }
        await actions.isDisplayed(TravelerspageHeader, 'TravelerspageHeader',30000)
        let Travelerspageheadervisibility = await actions.isDisplayed(TravelerspageHeader)
        console.log("Travelers page heading is displayed:", Travelerspageheadervisibility)
        if (Travelerspageheadervisibility) {
            await actions.pause(5000)
            await actions.scroll(InfantinLapCheckBox, 'InfantinLapCheckBox');
            await actions.waitForDisplayed(InfantinLapCheckBox, 'InfantinLapCheckBox')
            await actions.waitForClickable(InfantinLapCheckBox, 'InfantinLapCheckBox');
            await actions.clickElement('click', InfantinLapCheckBox, "Clicked InfantinLapCheckBox")

            await browser.pause(5000)
            console.log("InfantinLap checkbox is clicked")
            await actions.pause(5000)
        }
        //  Random names
       const randomFirstName = getRandomArrayElement(firstNames);
       const randomLastName = getRandomArrayElement(lastNames);

        await actions.clearInputField(infantInLapFirstName, "first name Input-Field");
        await actions.setInputField('setValue', randomFirstName, infantInLapFirstName, "first name field");

        await actions.clearInputField(infantInLapLastName, "last name Input-field");
        await actions.setInputField('setValue', randomLastName, infantInLapLastName, "last name field");
        //Random gender selection

        const randomGender = getRandomGender();
        console.log("Random gender selected:", randomGender);
        if (randomGender === 'Female') {
            await actions.clickElement('click', infantInLapFemaleGender, "Female Gender Radio Button");
        } else {
            await actions.clickElement('click', infantInLapMaleGender, "Male Gender Radio Button");
        }
        let departDate = new Date();
        departDate.setDate(departDate.getDate() + parseInt(departDateOffset));
        console.log("Departdate".departDate);
        await this.setInfantDOB(departDate);
    }

    async setInfantDOB(departDate) {

        let infantDOB = new Date(departDate);
        console.log("departdate:", departDate)
        infantDOB.setDate(infantDOB.getDate() - 299);

        let month = infantDOB.toLocaleString('default', { month: 'long' });
        let date = infantDOB.getDate().toString();
        let year = infantDOB.getFullYear().toString();
        console.log("Month:", month)
        console.log("Date:", date)
        console.log("Year:", year)
        await actions.scroll(infantdobMonthDropdown)
        let dateOfMonthFieldsVisibility = await actions.isClickable(infantdobMonthDropdown, 'travelerDOBMonth dropdown')
        if (dateOfMonthFieldsVisibility) {
            await actions.clickElement('click', infantdobMonthDropdown, 'travelerDOBMonth DropDown')
            await browser.keys(String(month));
            await actions.pressButton('Enter')
        }


        let dateOfdayFieldsVisibility = await actions.isClickable(infantdobDayDropdown, 'travelerDOBDate dropdown')
        if (dateOfdayFieldsVisibility) {
            await actions.clickElement('click', infantdobDayDropdown, 'travelerDOBDate DropDown')
            await browser.keys(String(date));
            await actions.pressButton('Enter')
        }


        let dateOfYearFieldsVisibility = await actions.isClickable(infantyearfield, 'travelerDOBYear input field')
        if (dateOfYearFieldsVisibility) {
            await actions.clickElement('click', infantyearfield, 'travelerDOBYear input field')
            const value = String(year)
            // await actions.addValue(value, dateOfYearFields[i], "TravelerDOBYear")
            //await actions.setInputField('setValue', value, dateOfYearFields[i], 'TravelerDOBYear')
            for (let char of value) {
                await browser.keys(char); // Type each character
                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay of 1 second }
            }
        }

    }


    async selectSSR(ssrType) {
        let ssr = ssrType
        await actions.waitFor(travelerCount)
        await actions.waitForDisplayed(travelerCount, 'traveler count')
        countTraveler = parseInt((await actions.getText(travelerCount, 'travelerCount')).split('Seated')[0])
        console.log("TOTAL TRAVELER SEATED = " + countTraveler)
        let paxNum = countTraveler
        let segment = 'departing'
        await actions.scroll(ssrscrolling)
        console.log("paxNUM ====> " + paxNum)
        for (let i = 0; i < paxNum; i++) {
            console.log("i = " + i)
            await actions.waitFor($(addButtonSSR.replace("X", i)), 30000)
            await actions.waitForDisplayed($(addButtonSSR.replace("X", i)), 'add button SSR')
            await actions.waitForClickable($(addButtonSSR.replace("X", i)), 'add button SSR')
            await actions.clickElement('click', $(addButtonSSR.replace("X", i)), "Add button to select the SSR")

            let addButtonSSRChildIsDisplayed = await actions.isDisplayed($(addButtonSSRChild.replace("X", i)), 'addButtonSSRChild')
            if (addButtonSSRChildIsDisplayed) {
                await actions.waitForClickable($(addButtonSSRChild.replace("X", i)), 'add button SSR')
                await actions.clickElement('click', $(addButtonSSRChild.replace("X", i)), "Add button to select the SSR")
            }
            console.log(ssr)
            switch (true) {
                case ssr.includes('Wheelchair'): {
                    await actions.waitForDisplayed($(wheelchairAssistance.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    await actions.waitForClickable($(wheelchairAssistance.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    await actions.clickElement('click', $(wheelchairAssistance.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    // tofromGate
                    await actions.waitForClickable($(tofromGate.replace('X', i).replace('LEG', segment)), 'toFromGate')
                    await actions.clickElement('click', $(tofromGate.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')

                    let wheelchairAssistanceChildIsDisplayed = await actions.isDisplayed($(wheelchairAssistanceChild.replace("X", i).replace('LEG', segment)), 'wheelchairAssistanceChild')
                    if (wheelchairAssistanceChildIsDisplayed) {
                        await actions.waitForClickable($(wheelchairAssistanceChild.replace("X", i).replace('LEG', segment)), 'wheelchairAssistanceChild')
                        await actions.clickElement('click', $(wheelchairAssistanceChild.replace("X", i).replace('LEG', segment)), "wheelchairAssistanceChild")
                        // tofromGate
                        await actions.waitForClickable($(tofromGateChild.replace('X', i).replace('LEG', segment)), 'toFromGate')
                        await actions.clickElement('click', $(tofromGateChild.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    }
                    break
                }
                case ssr.includes('Traveling with personal wheelchair/scooter'): {
                    await actions.waitForDisplayed($(personalWheelChairScooter.replace('X', i).replace('LEG', segment)), 'personalWheelChairScooter')
                    await actions.waitForClickable($(personalWheelChairScooter.replace('X', i).replace('LEG', segment)), 'personalWheelChairScooter')
                    await actions.clickElement('click', $(personalWheelChairScooter.replace('X', i).replace('LEG', segment)), 'personalWheelChairScooter')
                    // manual wheel chair
                    await actions.waitForClickable($(manualWheelChairScooter.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')
                    await actions.clickElement('click', $(manualWheelChairScooter.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')

                    let personalWheelChairScooterIsDisplayed = await actions.isDisplayed($(personalWheelChairScooterChild.replace("X", i).replace('LEG', segment)), 'personalWheelChairScooterChild')
                    if (personalWheelChairScooterIsDisplayed) {
                        await actions.waitForClickable($(personalWheelChairScooterChild.replace("X", i).replace('LEG', segment)), 'personalWheelChairScooterChild')
                        await actions.clickElement('click', $(personalWheelChairScooterChild.replace("X", i).replace('LEG', segment)), "personalWheelChairScooterChild")
                        // manual wheel chair
                        await actions.waitForClickable($(manualWheelChairScooterChild.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')
                        await actions.clickElement('click', $(manualWheelChairScooterChild.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')
                    }
                    break
                }
                case ssr.includes('oxygencylinder'): {
                    await actions.waitForDisplayed($(oxygenConcentrator.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                    await actions.waitForClickable($(oxygenConcentrator.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                    await actions.clickElement('click', $(oxygenConcentrator.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')

                    let oxygenConcentratorChildIsDisplayed = await actions.isDisplayed($(oxygenConcentratorChild.replace("X", i).replace('LEG', segment)), 'oxygenConcentratorChild')
                    if (oxygenConcentratorChildIsDisplayed) {
                        await actions.waitForDisplayed($(oxygenConcentratorChild.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                        await actions.waitForClickable($(oxygenConcentratorChild.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                        await actions.clickElement('click', $(oxygenConcentratorChild.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                    }
                    break
                }
                case ssr.includes('Service Animal'): {
                    await actions.waitForDisplayed($(serviceAnimal.replace('X', i).replace('LEG', segment)), 'serviceAnimal')
                    await actions.waitForClickable($(serviceAnimal.replace('X', i).replace('LEG', segment)), 'serviceAnimal')
                    await actions.clickElement('click', $(serviceAnimal.replace('X', i).replace('LEG', segment)), 'serviceAnimal')

                    let serviceAnimalChildIsDisplayed = await actions.isDisplayed($(serviceAnimalChild.replace("X", i).replace('LEG', segment)), 'serviceAnimalChild')
                    if (serviceAnimalChildIsDisplayed) {
                        await actions.waitForDisplayed($(serviceAnimalChild.replace('X', i).replace('LEG', segment)), 'serviceAnimalChild')
                        await actions.waitForClickable($(serviceAnimalChild.replace('X', i).replace('LEG', segment)), 'serviceAnimalChild')
                        await actions.clickElement('click', $(serviceAnimalChild.replace('X', i).replace('LEG', segment)), 'serviceAnimalChild')
                    }
                    break
                }
                case ssr.includes('Deaf'): {
                    await actions.waitForDisplayed($(deafSSR.replace('X', i).replace('LEG', segment)), 'deafSSR')
                    await actions.waitForClickable($(deafSSR.replace('X', i).replace('LEG', segment)), 'deafSSR')
                    await actions.clickElement('click', $(deafSSR.replace('X', i).replace('LEG', segment)), 'deafSSR')

                    let deafSSRChildIsDisplayed = await actions.isDisplayed($(deafSSRChild.replace("X", i).replace('LEG', segment)), 'serviceAnimalChild')
                    if (deafSSRChildIsDisplayed) {
                        await actions.waitForDisplayed($(deafSSRChild.replace('X', i).replace('LEG', segment)), 'deafSSRChild')
                        await actions.waitForClickable($(deafSSRChild.replace('X', i).replace('LEG', segment)), 'deafSSRChild')
                        await actions.clickElement('click', $(deafSSRChild.replace('X', i).replace('LEG', segment)), 'deafSSRChild')
                    }
                    break
                }
                case ssr.includes('Blind'): {
                    await actions.waitForDisplayed($(blindSSR.replace('X', i).replace('LEG', segment)), 'blindSSR')
                    await actions.waitForClickable($(blindSSR.replace('X', i).replace('LEG', segment)), 'blindSSR')
                    await actions.clickElement('click', $(blindSSR.replace('X', i).replace('LEG', segment)), 'blindSSR')

                    let blindSSRChildIsDisplayed = await actions.isDisplayed($(blindSSRChild.replace("X", i).replace('LEG', segment)), 'blindSSRChild')
                    if (blindSSRChildIsDisplayed) {
                        await actions.waitForDisplayed($(blindSSRChild.replace('X', i).replace('LEG', segment)), 'blindSSRChild')
                        await actions.waitForClickable($(blindSSRChild.replace('X', i).replace('LEG', segment)), 'blindSSRChild')
                        await actions.clickElement('click', $(blindSSRChild.replace('X', i).replace('LEG', segment)), 'blindSSRChild')
                    }
                    break
                }
                case ssr.includes('Intellectual or Developmental Disability'): {
                    await actions.waitForDisplayed($(intellectualSSR.replace('X', i).replace('LEG', segment)), 'intellectualSSR')
                    await actions.waitForClickable($(intellectualSSR.replace('X', i).replace('LEG', segment)), 'intellectualSSR')
                    await actions.clickElement('click', $(intellectualSSR.replace('X', i).replace('LEG', segment)), 'intellectualSSR')

                    let intellectualSSRChildIsDisplayed = await actions.isDisplayed($(intellectualSSRChild.replace("X", i).replace('LEG', segment)), 'intellectualSSRChild')
                    if (intellectualSSRChildIsDisplayed) {
                        await actions.waitForDisplayed($(intellectualSSRChild.replace('X', i).replace('LEG', segment)), 'intellectualSSRChild')
                        await actions.waitForClickable($(intellectualSSRChild.replace('X', i).replace('LEG', segment)), 'intellectualSSRChild')
                        await actions.clickElement('click', $(intellectualSSRChild.replace('X', i).replace('LEG', segment)), 'intellectualSSRChild')
                    }
                    break
                }
            }
        }
    }

    async continuebuttontravellers() {
        await actions.pause(2000);
        console.log("process.env.timeline : ", process.env.timeline)
        await actions.waitForDisplayed(continuetrav, "travellers page continue button")
        await actions.scroll(continuetrav, "travellers page continue button")
        await actions.waitForClickable(continuetrav, "travellers page continue button")
        await actions.pause(2000)
        await actions.clickElement('click', continuetrav, "travellers page continue button")
        await actions.pause(30000)
    }
}

export { firstName, lastName }
export default new TravellersPage()