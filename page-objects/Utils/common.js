import fakeData from 'faker'
import actions from '@g4/prova-ui/src/support/actions'

const closeElement = "//button[text()='Close']"
const nextMonth = "[data-handler='next']"
const calendarMonth = '.ui-datepicker-title'
const selectableDates = ".ui-datepicker-calendar td[data-handler='selectDay']"
class common {
       
       

        async select_random_airport(list){
             let randonIndex = fakeData.random.number(list.length-1)

             const cityValue = list.find((ele, index) => {
                     return index === randonIndex
             })

             cityValue.click()
        }

        async selectDate(date){
             let dateAvailable = false;

             while(!dateAvailable){
                let len = await browser.$$(selectableDates).length
                dateAvailable = await this.selectAvailableDate(len, date)
                if ((date - len) > 0) {
                        date = date - len
                }
             }
             let dates = await browser.$$(selectableDates)
             await actions.scroll(closeElement)
             await dates[date].click()
        }

        async selectAvailableDate(length, datesCount){
             if(length <= datesCount){
                await actions.waitForClickable(nextMonth, "next icon in calender")
                let clickable = await actions.isClickable(nextMonth, "next icon in calender")
                if(!clickable){
                        await actions.waitUntil(calendarMonth, "month year text")
                        let monthYearText = await actions.getText(calendarMonth, "month year text")
                        throw new Error("Date schedule is not available untill ",monthYearText)
                }
                await actions.clickElement('click', nextMonth, "next icon in calender")
                return false
             }
             return true
        }

        async getAdultStartEndDOB(){
                // Adult dob start year as 100 years from current date
        let adultDOBStart = new Date();
        adultDOBStart = adultDOBStart.setFullYear(adultDOBStart.getFullYear()-100);
        adultDOBStart = new Date(adultDOBStart).toDateString();

                // Adult dob end year as 21 years from current date
        let adultDOBEnd = new Date();
        adultDOBEnd = adultDOBEnd.setFullYear(adultDOBEnd.getFullYear()-21);
        adultDOBEnd = new Date(adultDOBEnd).toDateString();

        return {
                adultDOBStart,
                adultDOBEnd,
        }
        }

        async getCardDetails() {
                let cardNos = ["5454545454545454", "4000020000000000", "4400000000000008", "6243030000000001", "6011055039379233"];
                let card = fakeData.random.number(cardNos.length-1);
        
                return {
                    cardNo: cardNos[card],
                    expireMonth: "12",
                    expireYear: "2030",
                    cvv: "737",
                    nameOnCard: fakeData.name.firstName(0)
                }
            }

        async getBillingDetails() {
                let fname = fakeData.name.firstName(0);
                let lname = fakeData.name.lastName(0);
        
                return {
                    firstname: fname,
                    lastname: lname,
                    country: 'US',
                    addr: fakeData.address.streetAddress(),
                    city: fakeData.address.city(),
                    state: 'AL',
                    postalCode: fakeData.address.zipCode()
                }
            }

}
export default new common()