import actions from '@g4/prova-ui/src/support/actions'
import fakeData from 'faker';
import common from '../Utils/common';

const travelersArea = "//h2[text()='Who Will Be Traveling?']"
const adultForm = ".allegiant_traveller_form"
const continueButton = '#travellers button.continue'

const tFirstName = '[name="traveller[firstname]"]';
const tMiddleName = '[name="traveller[middlenames]"]';
const tLastName = '[name="traveller[lastname]"]';
const tSuffix = '[name="traveller[suffix]"]';
const tGendermale = "//span[text()='Male']";
const tGenderfemale = "//span[text()='Female']";
const tDobMonth = "[name='dmy[m]']";
const tDobDay = "[name='dmy[d]']";
const tDobYear = "[name='dmy[y]']";
const tPhone = '[name="traveller[phone]"]';
const tEmail = '[name="traveller[email]"]';
const tLapOwner = '[name="lap_traveller[lapOwner]"]';
const travelerLabel = 'label[for*="firstname"]';
const tLapTravelerLabel = 'label[for*="lap_traveller"]';

class TATravelersPage {


    get adultTravelersForm() {
        return $$('#travellers .allegiant_traveller_form .adult.traveller')
    };
    get childTravelersForm() {
        return $$('#travellers .allegiant_traveller_form .child.traveller')
    };
    get lapInfantTravelersForm() {
        return $$('#travellers .lap-child-forms .infant.lap_traveller')
    };

    get tripFlexPopup() {
        return $('.ui-dialog-content .allegiant_tripflex')
    };
    get acceptTripFlex() {
        return $('.ui-dialog.tripflex-message button.accepted')
    };
    get declineTripFlex() {
        return $('.ui-dialog.tripflex-message button.declined')
    };

    async waitForTravelersPage() {
        await actions.waitForDisplayed(travelersArea, "Who Will Be Traveling? text");
    }
    async getTravelersInfo(genderNumber) {
        let env = process.env.ENV
        let firstname, lastname
        if(env.includes("prod")){
            firstname = "QAPRD";
            lastname = "TESTPRD";
        }else{
            firstname = "QA";
            lastname = "TEST";
        }
        let gender = (genderNumber === 0) ? 'male' : 'female'
        let email = fakeData.internet.email(firstname, lastname, 'allegiant.com')

        return {
            firstname,
            lastname,
            gender,
            email,
        }
    }
    async getAdultDobDetails() {

        let {
            adultDOBStart,
            adultDOBEnd,
        } = await common.getAdultStartEndDOB()

        // Pick any adult dob between 15 years and 100 years of age
        let randomAdultDob = fakeData.date.between(adultDOBStart, adultDOBEnd);

        let dobDate = randomAdultDob.getDate()
        let dobMonth = randomAdultDob.getMonth() + 1
        let dobYear = randomAdultDob.getFullYear()

        return {
            dobDate,
            dobMonth,
            dobYear,
        }
    }

    async adultTravelersDetails() {
        await actions.waitForDisplayed(adultForm, "adult Travelers Form")
            let {
                firstname,
                lastname,
                gender,
                email
            } = await this.getTravelersInfo(fakeData.random.number(1));
        if (process.env.ENV.includes("prod")) {
            await this.enterFirstName("QAPROD")
            await this.enterLastName("PLZIGNORE")

        } else {
            await this.enterFirstName(firstname)
            await this.enterLastName(lastname)

        }
            
            await this.selectAdultGender(gender)

            await this.selectDOB()

            await actions.waitForClickable(tPhone, "Input PhoneNumber Field")
            await actions.setInputField('setValue', "7338308525", tPhone, "Input PhoneNumber Field")
            await actions.waitForClickable(tEmail, "Input Email Field")
            if (process.env.ENV.includes("prod")) {
                await actions.setInputField('setValue', "bat@allegiantair.com", tEmail, "Input Email Field")
            }else{
                await actions.setInputField('setValue', email, tEmail, "Input Email Field")
            }
            
    }

    async enterFirstName(firstname) {
        await this.waitForTravelersPage()
        await actions.waitForClickable(tFirstName, "InputFirstName")
        await actions.setInputField("setValue", firstname, tFirstName, "InputFirstName")
    }

    async enterLastName(lastname) {
        await actions.waitForClickable(tLastName, "InputLastName")
        await actions.setInputField("setValue", lastname, tLastName, "InputLastName")
    }

    async selectGender(genderNumber) {
        await actions.scroll(tGendermale)
        await actions.waitForClickable(tGendermale, "male radio button")
        let gender = (genderNumber === 0) ? 'male' : 'female'
        if (gender === 'male') {
            await actions.clickElement('click', tGendermale, "male radio button")
        } else {
            await actions.clickElement('click', tGenderfemale, "female radio button")
        }
    }
    async selectAdultGender(gender) {
        await actions.scroll(tGendermale)
        await actions.waitForClickable(tGendermale, "male radio button")
        if (gender === 'male') {
            await actions.clickElement('click', tGendermale, "male radio button")
        } else {
            await actions.clickElement('click', tGenderfemale, "female radio button")
        }
    }

    async selectDOB() {
        let {
            dobDate,
            dobMonth,
            dobYear
        } = await this.getAdultDobDetails();

        await actions.waitForEnabled(tDobMonth, "Month dropdown")
        await actions.selectOption(tDobMonth, "value", dobMonth)

        await actions.waitForEnabled(tDobDay, "day dropdown")
        await actions.selectOption(tDobDay, "value", dobDate)

        await actions.waitForClickable(tDobYear, "InputYearField")
        await actions.setInputField("setValue", dobYear, tDobYear, "InputYearField")
    }

    async enterChildrenTravelersDetails() {
        await actions.waitForDisplayed(this.childTravelersForm, "childTravelersForm")
        let displayed =  await actions.isDisplayed(this.childTravelersForm, "childTravelersForm")
        if(displayed){
        this.childTravelersForm.forEach(element => {
            let {
                firstname,
                middlename,
                lastname,
                gender,
                email
            } = this.getTravelersInfo(fakeData.random.number(1));

            actions.clickElement("click", element.$(travelerLabel), "firstNameLabel");

            actions.setInputField("setValue", firstname, element.$(tFirstName), "InputFirstName")
            actions.setInputField("setValue", middlename, element.$(tMiddleName), "InputMiddleName")
            actions.setInputField("setValue", lastname, element.$(tLastName), "InputLastName")

            actions.selectOptionByIndex(element.$(tSuffix), 2)

            element.$(tGender + '[value="' + gender + '"]').nextElement().click();
        });
    }
    }
    async enterLapInfantTravelersDetails() {
        await actions.waitForDisplayed(this.lapInfantTravelersForm, "lapInfantTravelersForm")
        let displayed =  await actions.isDisplayed(this.lapInfantTravelersForm, "lapInfantTravelersForm")
        if(displayed){
        this.lapInfantTravelersForm.forEach((element, index) => {
            actions.clickElement("click", element.$(tLapTravelerLabel), "LapTravelerLabel");

            if (actions.isEnabled(element.$(tLapOwner), "LapOwner")) {
                actions.selectOptionByIndex(element.$(tLapOwner), (index + 1))
            }
        });
    }
    }

    async travelersPageContinueButton() {
        await actions.waitForEnabled(continueButton, "travelersPage continueButton")
        await actions.waitForClickable(continueButton, "travelersPage continueButton")
        let clickable = await actions.isClickable(continueButton, "travelersPage continueButton")
        if (clickable) {
            await actions.scroll(continueButton)
            await actions.clickElement('click', continueButton, "travelersPage continueButton");
        } else {
            throw new Error("travelersPage continueButton is not clickable")
        }
    }

}
export default new TATravelersPage()