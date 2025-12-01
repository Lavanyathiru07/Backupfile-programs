import { Then } from '@cucumber/cucumber'
import CarPage from '../page-objects/carsPageObject'

Then(/^I click on the skip on Cars Page$/, async () => {
    await CarPage.carspageskip()
})