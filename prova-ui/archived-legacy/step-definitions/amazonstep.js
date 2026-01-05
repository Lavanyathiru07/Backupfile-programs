import { Then } from '@cucumber/cucumber'
import amazon from '../page-objects/amazonObject'

Then(/^I set "([^"]*)" to the inputfield and click on submit button$/, async (value) => {
    await amazon.entering(value)
})

Then(/^I expect the alertbox should be open$/, async () => {
    await amazon.alertboxverification()
})