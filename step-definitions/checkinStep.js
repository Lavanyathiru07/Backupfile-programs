import { Then } from '@cucumber/cucumber'
import CheckInPage from '../page-objects/checkInObject'

Then(/^I click on the check-in button$/, async () => {
    await CheckInPage.checkin()
})

Then(/^I click on the continue button in bags and boarding$/, async () => {
    await CheckInPage.bagsContinue()
})

Then(/^I click on continue button of manage-seats$/, async () => {
    await CheckInPage.seatsContinue()
})

Then(/^I am printing the boarding-passes$/, async () => {
    await CheckInPage.PrintBoardingPasses()
})