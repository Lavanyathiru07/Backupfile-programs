import { Then } from '@cucumber/cucumber'
import CarPage from '../page-objects/carsPageObject'

Then(/^I am on cars page I add a car to cart$/, async () => {
    await CarPage.collectCarsPageDetailsCP()
    await CarPage.addToCart()
})

Then(/^I am on Cars page I click No thanks button$/, async () => {
    await CarPage.carspageskip()
})

Then(/^I click on the Continue button in Cars Page$/, async () => {
    await CarPage.carspageContinueBtn()
})

Then(/^I am on cars page Added to cart message is shown$/, async () => {
    await CarPage.addedToCart()
})

Then(/^I am on cars page and I click on continue$/, async () => {
    await CarPage.carspageContinueBtn()
})