import { Given , When , Then} from '@cucumber/cucumber';
import LoginPage from '../page-objects/loginPageObject'

Then(/^I login to the application$/, async () => {
    await LoginPage.login()
})