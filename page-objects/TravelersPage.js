import actions from '@g4/prova-ui/src/support/actions'
const TravelersPageHeading = "[data-hook='travelers-page_page-heading']";
var firstName
var lastName
class TravelersPage {

	async enterTravelerFirstName(firstName) {
		await actions.waitForDisplayed(TravelersPageHeading, 'Travellers Page Heading')
		var Fname = firstName.split('|')
		var travelerNum = 0;
		for (var i = 0; i < Fname.length; i++) {
			// Fname[i]
			// firstName
			travelerNum = travelerNum + 1;
			var travelerFirstName = "(//input[contains(@data-hook,'first-name')])[" + travelerNum + "]"
			await actions.scroll(travelerFirstName,'travelerFirstName')
			let travelerFirstNameClickable = await actions.isClickable(travelerFirstName, 'Traveler FirstName')
			if (travelerFirstNameClickable) {
				await actions.clickElement('click', travelerFirstName, 'travelerFirstName')
				await actions.setInputField('setValue', Fname[i], travelerFirstName, 'TravelerFirstName input field')
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
			await actions.scroll(travelerLastName,'travelerLastName')
			let travelerLastNameClickable = await actions.isClickable(travelerLastName, 'Traveler LastName')
			if (travelerLastNameClickable) {
				await actions.clickElement('click', travelerLastName, 'travelerLastName')
				await actions.setInputField('setValue', lname[i], travelerLastName, 'travelerLastName input field')
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
			let maleRadioButtonClickable = await actions.isClickable(male, 'Male Radio Button')
			let femaleRadioButtonClickable = await actions.isClickable(female, 'female Radio Button')
			if (gen[i] === "male") {
				await actions.scroll(male,'male')
				if (maleRadioButtonClickable) {
					await actions.clickElement('click', male, 'male Radio Button')
				}
			}
			else if (gen[i] === "female") {
				await actions.scroll(female,'female')
				if (femaleRadioButtonClickable) {
					await actions.clickElement('click', female, 'female Radio Button')
				}
			}
		}
	}

	async selectTravelerDOB(dateOfBirth) {
		var DOB = dateOfBirth.split('|')
		var travelerNum = 0;
		var dateOfMonthFields = await browser.$$("//div[contains(@data-hook,'dob-month')]")
		var dateOfdayFields = await browser.$$("//div[contains(@data-hook,'dob-day')]")
		var dateOfYearFields = await browser.$$("//input[contains(@data-hook,'dob-year')]")
		for (var i = 0; i < dateOfMonthFields.length; i++) {
			let date = DOB[i].split("-")[0]
			let month = DOB[i].split("-")[1]
			let year = DOB[i].split("-")[2]
			console.log(month + "-" + date + "-" + year)
			// for (var i = 0; i < DOB.length; i++) {
			// travelerNum = travelerNum + 1;
			// var travelerDOBMonth = "(//div[contains(@data-hook,'dob-month')])[" + travelerNum + "]"
			// var travelerDOBDate = "(//div[contains(@data-hook,'dob-day')])[" + travelerNum + "]"
			// var travelerDOBYear = "(//input[contains(@data-hook,'dob-year')])[" + travelerNum + "]"

			await actions.scroll(dateOfMonthFields[i])
			let dateOfMonthFieldsVisibility = await actions.isClickable(dateOfMonthFields[i], 'travelerDOBMonth dropdown')
			if (dateOfMonthFieldsVisibility) {
				await actions.clickElement('click', dateOfMonthFields[i], 'travelerDOBMonth DropDown')
				await browser.keys(String(month));
				await actions.pressButton('Enter')
			}

			await actions.scroll(dateOfdayFields[i])
			let dateOfdayFieldsVisibility = await actions.isClickable(dateOfdayFields[i], 'travelerDOBDate dropdown')
			if (dateOfdayFieldsVisibility) {
				await actions.clickElement('click', dateOfdayFields[i], 'travelerDOBDate DropDown')
				await browser.keys(String(date));
				await actions.pressButton('Enter')
			}

			await actions.scroll(dateOfYearFields[i])
			let dateOfYearFieldsVisibility = await actions.isClickable(dateOfYearFields[i], 'travelerDOBYear input field')
			if (dateOfYearFieldsVisibility) {
				await actions.clickElement('click', dateOfYearFields[i], 'travelerDOBYear input field')
                const value = String(year)
                await actions.setInputField('setValue', value, dateOfYearFields[i], 'TravelerDOBYear')
			}
		}
	}

	async enterTravelerEmailId(email) {
		var emailAddress = email.split('|')
		var travelerNum = 0;
		for (var i = 0; i < emailAddress.length; i++) {
			travelerNum = travelerNum + 1;
			var travelerEmailId = "(//input[contains(@data-hook,'email')])[" + travelerNum + "]"
			await actions.scroll(travelerEmailId,'travelerEmailId')
			let travelerEmailIdClickable = await actions.isClickable(travelerEmailId, 'travelerEmailId')
			if (travelerEmailIdClickable) {
				await actions.clickElement('click', travelerEmailId, 'travelerEmailId')
				await actions.clearInputField(travelerEmailId, 'travelerEmailId')
				await actions.setInputField('setValue', emailAddress[i], travelerEmailId, 'travelerEmailId')
			}
		}
		await browser.keys("Tab")
	}
	async enterTravelerPhone(phone) {
		var phoneNumber = phone.split('|')
		var travelerNum = 0;
		for (var i = 0; i < phoneNumber.length; i++) {
			travelerNum = travelerNum + 1;
			var travelerPhone = "(//input[contains(@data-hook,'phone-number')])[" + travelerNum + "]"
			let travelerPhoneVisibility = await actions.isClickable(travelerPhone, 'travelerPhone')
			if (travelerPhoneVisibility) {
				await actions.clickElement('click', travelerPhone, 'travelerPhone')
				await actions.setInputField('setValue', phoneNumber[i], travelerPhone, 'travelerPhone')
			}
		}
	}
}

export { firstName, lastName }
export default new TravelersPage()