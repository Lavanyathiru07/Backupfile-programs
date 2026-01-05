import actions from "../../src/support/actions"
import check from "../../src/support/validations"

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

class TravellersPage {

    async travellerinfo ()
    {
        await actions.scroll(namescroll)
        await check.checkContainsAnyText(nameValidation,"Input-field",false)
        await actions.clearInputField(nameValidation,"name field")
        await actions.setInputField('setValue','Karthik',nameValidation,"first name field")
        await actions.clearInputField(lname,"last name")
        await actions.setInputField('setValue','Patnuri',lname,"last name field")
        // await actions.clearInputField(lname)
        // await actions.setInputField('setValue','Patnuri',lname)
        await actions.clickElement('click',selectinggender,"male Gender radio button")
        await actions.clickElement('click',month,"month drop down of DOB")
        await actions.setInputField('setValue','SEP',settingmonth,"passing the month to field of DOB")
        await actions.pressButton("Enter",'press')
        await actions.clickElement('click',day,"date field of DOB")
        await actions.setInputField('setValue','19',selectingdate,"passing the date of DOB")
        await actions.pressButton("Enter",'press')
        await actions.setInputField('setValue','1995',year,"Passing the year of DOB")
    }

    async continuebuttontravellers()
    {
        await actions.scroll(ssrscrolling)
        await actions.clickElement('click',continuetrav,"travellers page continue button")
    }
}

export default new TravellersPage()