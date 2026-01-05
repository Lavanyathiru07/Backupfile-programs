import { Then } from '@cucumber/cucumber'


Then(/^I am on cars page I add a car to cart$/, async function () {
    await this.CarsPage.addToCart()
    await this.CarsPage.collectCarsPageDetailsCP()
})

Then(/^I am on cars page Added to cart message is shown$/, async function () {
    await this.CarsPage.addedToCart()
})

Then(/^I am on cars page and I click on continue$/, async function () {
    await this.CarsPage.carspageContinueBtn()
})

Then(/^I am on Cars page I click No thanks button$/, async function () {
    try {
        await this.CarsPage.carspageskip()
    } catch (er) {
        console.log("Cars Page is not displayed")
    }
})