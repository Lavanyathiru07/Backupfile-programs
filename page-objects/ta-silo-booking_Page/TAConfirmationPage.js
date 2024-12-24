import actions from '@g4/prova-ui/src/support/actions'

const customerInfo = "#customer-information"
const confirmationNo = "//td[@data-th='Confirmation Number']/span";

class TAConfirmationPage{

    static confirmationNumber = ""

    async getConfirmationNumber(){
        await actions.waitForDisplayed(customerInfo, "customerInfo")

        this.confirmationNumber = await actions.getText(confirmationNo, "confirmationNum")       
        return this.confirmationNumber
    }

}
export default new TAConfirmationPage()