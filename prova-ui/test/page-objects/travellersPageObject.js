import Actions from '../../src/support/actions.js'
import Checks from '../../src/support/validations.js'
import { departDate, returnDate } from './flightsPageObject.js'
import { faker } from '@faker-js/faker'

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
const continuetrav = "[data-hook='travelers-page_continue']"
const TravelersPageHeading = "[data-hook='travelers-page_page-heading']"
const travelerType = "//span[contains(@data-hook,'_title')][contains(@data-hook,'travelers-form_')]"
const infantInLap = "//span[contains(@data-hook,'travelers-form_infantsInLap_0_title')]"
const designatedLapField = "//div[@data-hook='travelers-form_TYPE_X_designated-lap']//div//div//div"
const designatedLapDropDownOptionSelection = "//div[contains(@id,'react-select-infantsInLap.X.designated-lap-option-Y')]"
const travelerCount = "//*[@data-hook='header-flight-info_seated']"
const addButtonSSR = "[data-hook='travelers-form_adults_X_ssrs-section_label']"
const addButtonSSRChild = "//*[@data-hook='travelers-form_children_X_ssrs-section_label']"
const wheelchairAssistance = "//label[@data-hook='travelers-form_adults_X_LEG_airport-provided-wheelchair_label']//div[contains(@class,'Checkbox')]";
const wheelchairAssistanceChild = "//label[@data-hook='travelers-form_children_X_LEG_airport-provided-wheelchair_label']//div[contains(@class,'Checkbox')]";
const personalWheelChairScooter = "//label[@data-hook='travelers-form_adults_X_LEG_wheelchair_label']//div[contains(@class,'Checkbox')]"
const personalWheelChairScooterChild = "//label[@data-hook='travelers-form_children_X_LEG_wheelchair_label']//div[contains(@class,'Checkbox')]"
const oxygenConcentrator = "//label[@data-hook='travelers-form_adults_X_LEG_oxygen-concentrator_label']//div[contains(@class,'Checkbox')]";
const oxygenConcentratorChild = "//label[@data-hook='travelers-form_children_X_LEG_oxygen-concentrator_label']//div[contains(@class,'Checkbox')]";
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
const homesubmit = "[data-hook='flight-search-submit']"

var firstName
var lastName
let countTraveler

class TravellersPage {
    actions;
    check;

    constructor(page, context) {
        this.actions = new Actions(page, context)
        this.check = new Checks(page, context)
    }


    async travellerinfo() {
        await this.actions.scroll(namescroll)
        await this.check.checkContainsAnyText(nameValidation, "Input-field", false)
        await this.actions.clearInputField(nameValidation, "name field")
        await this.actions.setInputField('setValue', 'Karthik', nameValidation, "first name field")
        await this.actions.clearInputField(lname, "last name")
        await this.actions.setInputField('setValue', 'Patnuri', lname, "last name field")
        // await this.actions.clearInputField(lname)
        // await this.actions.setInputField('setValue','Patnuri',lname)
        await this.actions.clickElement('click', selectinggender, "male Gender radio button")
        await this.actions.clickElement('click', month, "month drop down of DOB")
        await this.actions.setInputField('setValue', 'SEP', settingmonth, "passing the month to field of DOB")
        await this.actions.pressButton("Enter")
        await this.actions.clickElement('click', day, "date field of DOB")
        await this.actions.setInputField('setValue', '19', selectingdate, "passing the date of DOB")
        await this.actions.pressButton("Enter")
        await this.actions.setInputField('setValue', '1995', year, "Passing the year of DOB")
    }

    async continuebuttontravellers() {
        await this.actions.waitForDisplayed(continuetrav, 'travellers page continue button')
        await this.actions.clickElement('click', continuetrav, "travellers page continue button")
    }

    async fillAlltravelerDetails(travelerCount) {
        await this.actions.waitUntilPageLoad()
        await this.actions.waitForDisplayed(TravelersPageHeading, 'Travellers Page Heading')
        await this.actions.pause(15000)
        // await this.actions.waitUntil(travelerType, 'visible')
        // await this.actions.waitForDisplayed(travelerType, 'traveler type')
        let paxType = await this.actions.getElements(travelerType)
        console.log("paxType.length : " + await paxType.length)
        if (travelerCount === "all") {
            travelerCount = await paxType.length
        }
        for (let i = 0; i < await paxType.length; i++) {
            // await this.actions.pause(1000)
            console.log("paxType[i].getText(): " + (await this.actions.getText(paxType[i], 'paxType')))
        }

        var Fname = "QA"
        var Lname = "Automation"
        var Mail = "someone@invalidemail.com"

        var randomFname
        var randomLname
        var randomGender
        var randomDOB
        var FakeDOB
        var gen = "male"
        var dateOfBirth = "10-10-1990"
        var infantCount = 0;

        for (var i = 1; i < travelerCount; i++) {
            randomFname = faker.name.firstName();
            Fname = Fname + "|" + randomFname
            randomLname = faker.name.lastName();
            Lname = Lname + "|" + randomLname
            let travellertype = (await this.actions.getText(paxType[i])).split(':')[1]
            if (travellertype.toLowerCase().trim().includes("infant")) {
                infantCount = infantCount + 1;
            }
            FakeDOB = await this.getDOB(travellertype.toLowerCase().trim())
            console.log(FakeDOB)
            var month = FakeDOB.getMonth() + 1
            var fakeDate = FakeDOB.getDate()
            if (fakeDate < 10) {
                fakeDate = "15";
            }
            randomDOB = fakeDate + "-" + month + "-" + FakeDOB.getFullYear()
            dateOfBirth = dateOfBirth + "|" + randomDOB
            console.log(dateOfBirth)
            randomGender = "male"
            gen = gen + "|" + randomGender
        }
        await this.enterTravelerFirstName(Fname);
        await this.enterTravelerLastName(Lname);
        await this.selectTravelerDOB(dateOfBirth);
        await this.selectTravelerGender(gen);
        await this.enterTravelerPhone("78456912332");
        await this.enterTravelerEmailId(Mail);

        firstName = Fname;
        Fname = "";
        lastName = Lname;
        Lname = "";

        if (infantCount > 0) {
            let infantInLapVisibility = await this.actions.isDisplayed(infantInLap, 'LapInfant form')
            if (infantInLapVisibility) {
                await this.actions.scroll(lapInfantheader)
                await this.actions.clickElement('click', designatedLapField.replace("TYPE", 'infantsInLap').replace("X", 0), "designated lap dropdown")
                await this.actions.clickElement('click', designatedLapDropDownOptionSelection.replace("X", 0).replace("Y", 0), "designated lap dropdown")
            }
        }
    }

    async getDOB(DOB) {
        var newDOB = new Date(departDate);
        console.log("departDate: " + departDate)

        if (DOB.includes("adult")) {
            newDOB.setDate(newDOB.getDate() - 12000);
        }
        if (DOB.includes("child")) {
            newDOB.setDate(newDOB.getDate() - 5000);
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

    async travellerinfo() {
        await this.actions.scroll(namescroll)
        await this.actions.clearInputField(nameValidation, "first name Input-Field")
        await this.actions.setInputField('fill', 'QA', nameValidation, "first name field")
        await this.actions.clearInputField(lname, "last name Input-field")
        await this.actions.setInputField('fill', 'TEST', lname, "last name field")
        await this.actions.clickElement('click', selectinggender, "Male Gender Radio Button")
        await this.actions.waitForDisplayed(month, 'month')
        await this.actions.clickElement('click', month, "month drop down of DOB")
        await this.actions.setInputField('fill', 'SEP', settingmonth, "passing the month to field of DOB")
        await this.actions.pressButton("Enter", 'press')
        await this.actions.waitForDisplayed(day, 'day')
        await this.actions.clickElement('click', day, "date field of DOB")
        await this.actions.setInputField('fill', '19', selectingdate, "passing the date of DOB")
        await this.actions.pressButton("Enter", 'press')
        await this.actions.waitForDisplayed(year, 'year')
        await this.actions.setInputField('fill', '1999', year, "Passing the year of DOB")
    }

    async selectSSR(ssrType) {
        let ssr = ssrType
        // await this.actions.waitFor(travelerCount, 5000, '', true, 'traveler count')
        await this.actions.waitForDisplayed(travelerCount, 'traveler count')
        countTraveler = parseInt((await this.actions.getText(travelerCount, 'travelerCount')).split('Seated')[0])
        console.log("TOTAL TRAVELER SEATED = " + countTraveler)
        let paxNum = countTraveler
        let segment = 'departing'
        await this.actions.scroll(ssrscrolling)
        console.log("paxNUM ====> " + paxNum)
        for (let i = 0; i < paxNum; i++) {
            console.log("i = " + i)
            // await this.actions.waitFor((addButtonSSR.replace("X", i)), 30000, '', true, 'add button SSR')
            await this.actions.waitForDisplayed((addButtonSSR.replace("X", i)), 'add button SSR')
            await this.actions.waitForClickable((addButtonSSR.replace("X", i)), 'add button SSR')
            await this.actions.clickElement('click', (addButtonSSR.replace("X", i)), "Add button to select the SSR")

            let addButtonSSRChildIsDisplayed = await this.actions.isDisplayed((addButtonSSRChild.replace("X", i)), 'addButtonSSRChild')
            if (addButtonSSRChildIsDisplayed) {
                await this.actions.waitForClickable((addButtonSSRChild.replace("X", i)), 'add button SSR')
                await this.actions.clickElement('click', (addButtonSSRChild.replace("X", i)), "Add button to select the SSR")
            }
            console.log(ssr)
            switch (true) {
                case ssr.includes('Wheelchair'): {
                    await this.actions.waitForDisplayed((wheelchairAssistance.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    await this.actions.waitForClickable((wheelchairAssistance.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    await this.actions.clickElement('click', (wheelchairAssistance.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    // tofromGate
                    await this.actions.waitForClickable((tofromGate.replace('X', i).replace('LEG', segment)), 'toFromGate')
                    await this.actions.clickElement('click', (tofromGate.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')

                    let wheelchairAssistanceChildIsDisplayed = await this.actions.isDisplayed((wheelchairAssistanceChild.replace("X", i).replace('LEG', segment)), 'wheelchairAssistanceChild')
                    if (wheelchairAssistanceChildIsDisplayed) {
                        await this.actions.waitForClickable((wheelchairAssistanceChild.replace("X", i).replace('LEG', segment)), 'wheelchairAssistanceChild')
                        await this.actions.clickElement('click', (wheelchairAssistanceChild.replace("X", i).replace('LEG', segment)), "wheelchairAssistanceChild")
                        // tofromGate
                        await this.actions.waitForClickable((tofromGateChild.replace('X', i).replace('LEG', segment)), 'toFromGate')
                        await this.actions.clickElement('click', (tofromGateChild.replace('X', i).replace('LEG', segment)), 'wheel chair assistance')
                    }
                    break
                }
                case ssr.includes('Traveling with personal wheelchair/scooter'): {
                    await this.actions.waitForDisplayed((personalWheelChairScooter.replace('X', i).replace('LEG', segment)), 'personalWheelChairScooter')
                    await this.actions.waitForClickable((personalWheelChairScooter.replace('X', i).replace('LEG', segment)), 'personalWheelChairScooter')
                    await this.actions.clickElement('click', (personalWheelChairScooter.replace('X', i).replace('LEG', segment)), 'personalWheelChairScooter')
                    // manual wheel chair
                    await this.actions.waitForClickable((manualWheelChairScooter.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')
                    await this.actions.clickElement('click', (manualWheelChairScooter.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')

                    let personalWheelChairScooterIsDisplayed = await this.actions.isDisplayed((personalWheelChairScooterChild.replace("X", i).replace('LEG', segment)), 'personalWheelChairScooterChild')
                    if (personalWheelChairScooterIsDisplayed) {
                        await this.actions.waitForClickable((personalWheelChairScooterChild.replace("X", i).replace('LEG', segment)), 'personalWheelChairScooterChild')
                        await this.actions.clickElement('click', (personalWheelChairScooterChild.replace("X", i).replace('LEG', segment)), "personalWheelChairScooterChild")
                        // manual wheel chair
                        await this.actions.waitForClickable((manualWheelChairScooterChild.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')
                        await this.actions.clickElement('click', (manualWheelChairScooterChild.replace('X', i).replace('LEG', segment)), 'manualWheelChairScooter')
                    }
                    break
                }
                case ssr.includes('oxygencylinder'): {
                    await this.actions.waitForDisplayed((oxygenConcentrator.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                    await this.actions.waitForClickable((oxygenConcentrator.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                    await this.actions.clickElement('click', (oxygenConcentrator.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')

                    let oxygenConcentratorChildIsDisplayed = await this.actions.isDisplayed((oxygenConcentratorChild.replace("X", i).replace('LEG', segment)), 'oxygenConcentratorChild')
                    if (oxygenConcentratorChildIsDisplayed) {
                        await this.actions.waitForDisplayed((oxygenConcentratorChild.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                        await this.actions.waitForClickable((oxygenConcentratorChild.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                        await this.actions.clickElement('click', (oxygenConcentratorChild.replace('X', i).replace('LEG', segment)), 'oxygenConcentrator')
                    }
                    break
                }
                case ssr.includes('Service Animal'): {
                    await this.actions.waitForDisplayed((serviceAnimal.replace('X', i).replace('LEG', segment)), 'serviceAnimal')
                    await this.actions.waitForClickable((serviceAnimal.replace('X', i).replace('LEG', segment)), 'serviceAnimal')
                    await this.actions.clickElement('click', (serviceAnimal.replace('X', i).replace('LEG', segment)), 'serviceAnimal')

                    let serviceAnimalChildIsDisplayed = await this.actions.isDisplayed((serviceAnimalChild.replace("X", i).replace('LEG', segment)), 'serviceAnimalChild')
                    if (serviceAnimalChildIsDisplayed) {
                        await this.actions.waitForDisplayed((serviceAnimalChild.replace('X', i).replace('LEG', segment)), 'serviceAnimalChild')
                        await this.actions.waitForClickable((serviceAnimalChild.replace('X', i).replace('LEG', segment)), 'serviceAnimalChild')
                        await this.actions.clickElement('click', (serviceAnimalChild.replace('X', i).replace('LEG', segment)), 'serviceAnimalChild')
                    }
                    break
                }
                case ssr.includes('Deaf'): {
                    await this.actions.waitForDisplayed((deafSSR.replace('X', i).replace('LEG', segment)), 'deafSSR')
                    await this.actions.waitForClickable((deafSSR.replace('X', i).replace('LEG', segment)), 'deafSSR')
                    await this.actions.clickElement('click', (deafSSR.replace('X', i).replace('LEG', segment)), 'deafSSR')

                    let deafSSRChildIsDisplayed = await this.actions.isDisplayed((deafSSRChild.replace("X", i).replace('LEG', segment)), 'serviceAnimalChild')
                    if (deafSSRChildIsDisplayed) {
                        await this.actions.waitForDisplayed((deafSSRChild.replace('X', i).replace('LEG', segment)), 'deafSSRChild')
                        await this.actions.waitForClickable((deafSSRChild.replace('X', i).replace('LEG', segment)), 'deafSSRChild')
                        await this.actions.clickElement('click', (deafSSRChild.replace('X', i).replace('LEG', segment)), 'deafSSRChild')
                    }
                    break
                }
                case ssr.includes('Blind'): {
                    await this.actions.waitForDisplayed((blindSSR.replace('X', i).replace('LEG', segment)), 'blindSSR')
                    await this.actions.waitForClickable((blindSSR.replace('X', i).replace('LEG', segment)), 'blindSSR')
                    await this.actions.clickElement('click', (blindSSR.replace('X', i).replace('LEG', segment)), 'blindSSR')

                    let blindSSRChildIsDisplayed = await this.actions.isDisplayed((blindSSRChild.replace("X", i).replace('LEG', segment)), 'blindSSRChild')
                    if (blindSSRChildIsDisplayed) {
                        await this.actions.waitForDisplayed((blindSSRChild.replace('X', i).replace('LEG', segment)), 'blindSSRChild')
                        await this.actions.waitForClickable((blindSSRChild.replace('X', i).replace('LEG', segment)), 'blindSSRChild')
                        await this.actions.clickElement('click', (blindSSRChild.replace('X', i).replace('LEG', segment)), 'blindSSRChild')
                    }
                    break
                }
                case ssr.includes('Intellectual or Developmental Disability'): {
                    await this.actions.waitForDisplayed((intellectualSSR.replace('X', i).replace('LEG', segment)), 'intellectualSSR')
                    await this.actions.waitForClickable((intellectualSSR.replace('X', i).replace('LEG', segment)), 'intellectualSSR')
                    await this.actions.clickElement('click', (intellectualSSR.replace('X', i).replace('LEG', segment)), 'intellectualSSR')

                    let intellectualSSRChildIsDisplayed = await this.actions.isDisplayed((intellectualSSRChild.replace("X", i).replace('LEG', segment)), 'intellectualSSRChild')
                    if (intellectualSSRChildIsDisplayed) {
                        await this.actions.waitForDisplayed((intellectualSSRChild.replace('X', i).replace('LEG', segment)), 'intellectualSSRChild')
                        await this.actions.waitForClickable((intellectualSSRChild.replace('X', i).replace('LEG', segment)), 'intellectualSSRChild')
                        await this.actions.clickElement('click', (intellectualSSRChild.replace('X', i).replace('LEG', segment)), 'intellectualSSRChild')
                    }
                    break
                }
            }
        }
    }

    async enterTravelerFirstName(firstName) {
        var Fname = firstName.split('|')
        var travelerNum = 0;
        for (var i = 0; i < Fname.length; i++) {
            travelerNum = travelerNum + 1;
            var travelerFirstName = "(//input[contains(@data-hook,'first-name')])[" + travelerNum + "]"
            // await this.actions.scroll(travelerFirstName)
            let travelerFirstNameClickable = await this.actions.isClickable(travelerFirstName, 'Traveler FirstName')
            if (travelerFirstNameClickable) {
                await this.actions.clickElement('click', travelerFirstName, 'travelerFirstName')
                await this.actions.setInputField('setValue', Fname[i], travelerFirstName, 'TravelerFirstName input field')
            }
        }
    }

    async enterTravelerLastName(lastName) {
        var lname = lastName.split('|')
        var travelerNum = 0;
        for (var i = 0; i < lname.length; i++) {
            console.log("lname: " + lname[i])
            travelerNum = travelerNum + 1;
            var travelerLastName = "(//input[contains(@data-hook,'last-name')])[" + travelerNum + "]"
            // await this.actions.scroll(travelerLastName)
            let travelerLastNameClickable = await this.actions.isClickable(travelerLastName, 'Traveler LastName')
            if (travelerLastNameClickable) {
                await this.actions.clickElement('click', travelerLastName, 'travelerLastName')
                await this.actions.setInputField('setValue', lname[i], travelerLastName, 'travelerLastName input field')
            }
        }
    }

    async selectTravelerGender(gender) {
        var gen = gender.split('|')
        var travelerNum = 0;
        for (var i = 0; i < gen.length; i++) {
            travelerNum = travelerNum + 1;
            var male = "(//*[contains(@data-hook,'gender_MALE')])[" + travelerNum + "]"
            var female = "(//*[contains(@data-hook,'gender_FEMALE')])[" + travelerNum + "]"
            let maleRadioButtonClickable = await this.actions.isClickable(male, 'Male Radio Button')
            let femaleRadioButtonClickable = await this.actions.isClickable(female, 'female Radio Button')
            if (gen[i] === "male") {
                await this.actions.scroll(male)
                if (maleRadioButtonClickable) {
                    await this.actions.clickElement('click', male, 'male Radio Button')
                }
            }
            else if (gen[i] === "female") {
                await this.actions.scroll(female)
                if (femaleRadioButtonClickable) {
                    await this.actions.clickElement('click', female, 'female Radio Button')
                }
            }
        }
    }

    async selectTravelerDOB(dateOfBirth) {
        var DOB = dateOfBirth.split('|')
        var dateOfMonthFields = await this.actions.getElements("//div[contains(@data-hook,'dob-month')]")
        var dateOfdayFields = await this.actions.getElements("//div[contains(@data-hook,'dob-day')]")
        var dateOfYearFields = await this.actions.getElements("//input[contains(@data-hook,'dob-year')]")
        for (var i = 0; i < dateOfMonthFields.length; i++) {
            console.log("DOB: " + DOB)
            let date = DOB[i].split("-")[0]
            let month = DOB[i].split("-")[1]
            let year = DOB[i].split("-")[2]
            console.log(month + "-" + date + "-" + year)
            // await this.actions.scroll(dateOfMonthFields[i])
            let dateOfMonthFieldsVisibility = await this.actions.isDisplayed(dateOfMonthFields[i], 'travelerDOBMonth dropdown')
            if (dateOfMonthFieldsVisibility) {
                await this.actions.clickElement('click', dateOfMonthFields[i], 'travelerDOBMonth DropDown')
                await this.actions.pressButton(String(month), 'type');
                await this.actions.pressButton('Enter', 'press')
            }
            // await this.actions.scroll(dateOfdayFields[i])
            let dateOfdayFieldsVisibility = await this.actions.isDisplayed(dateOfdayFields[i], 'travelerDOBDate dropdown')
            if (dateOfdayFieldsVisibility) {
                await this.actions.clickElement('click', dateOfdayFields[i], 'travelerDOBDate DropDown')
                await this.actions.pressButton(String(date), 'type');
                await this.actions.pressButton('Enter', 'press')
            }

            // await this.actions.scroll(dateOfYearFields[i])
            let dateOfYearFieldsVisibility = await this.actions.isDisplayed(dateOfYearFields[i], 'travelerDOBYear input field')
            if (dateOfYearFieldsVisibility) {
                await this.actions.clickElement('click', dateOfYearFields[i], 'travelerDOBYear input field')
                const value = String(year)
                await this.actions.setInputField('setValue', value, dateOfYearFields[i], 'TravelerDOBYear')
            }
        }
    }

    async enterTravelerEmailId(email) {
        var emailAddress = email.split('|')
        var travelerNum = 0;
        for (var i = 0; i < emailAddress.length; i++) {
            travelerNum = travelerNum + 1;
            var travelerEmailId = "(//input[contains(@data-hook,'email')])[" + travelerNum + "]"
            await this.actions.scroll(travelerEmailId)
            let travelerEmailIdClickable = await this.actions.isClickable(travelerEmailId, 'travelerEmailId')
            if (travelerEmailIdClickable) {
                await this.actions.clickElement('click', travelerEmailId, 'travelerEmailId')
                await this.actions.clearInputField(travelerEmailId, 'travelerEmailId')
                await this.actions.setInputField('setValue', emailAddress[i], travelerEmailId, 'travelerEmailId')
            }
        }
        await this.actions.pressButton("Tab", 'press')
    }
    async enterTravelerPhone(phone) {
        var phoneNumber = phone.split('|')
        var travelerNum = 0;
        for (var i = 0; i < phoneNumber.length; i++) {
            travelerNum = travelerNum + 1;
            var travelerPhone = "(//input[contains(@data-hook,'phone-number')])[" + travelerNum + "]"
            let travelerPhoneVisibility = await this.actions.isClickable(travelerPhone, 'travelerPhone')
            if (travelerPhoneVisibility) {
                await this.actions.clickElement('click', travelerPhone, 'travelerPhone')
                await this.actions.setInputField('setValue', phoneNumber[i], travelerPhone, 'travelerPhone')
            }
        }
    }

    async submithomepage() {
        // await this.actions.pause(3000)
        await this.actions.waitForDisplayed(homesubmit, 'home submit')
        // await this.actions.pause(5000)
        await this.actions.clickElement('click', homesubmit, "submit button")
    }
}

export { firstName, lastName }
export default TravellersPage