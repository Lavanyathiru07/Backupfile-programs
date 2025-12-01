import { Given , When , Then} from '@cucumber/cucumber';
import TravellersPage from '../page-objects/travellersPageObject'


When(/^I fill all the travellers information in travellers page$/, async () => {
    await TravellersPage.travellerinfo()
})

Then(/^I click on the continue button in travellers page$/, async () => {
    await TravellersPage.continuebuttontravellers()
})