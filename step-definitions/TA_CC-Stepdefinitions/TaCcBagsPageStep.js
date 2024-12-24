import {Given, When, Then} from '@cucumber/cucumber'
import TABagsPage from '../../page-objects/ta-silo-booking_Page/TABagsPage'

Then(/^I am on bagspage I choose carryon-bag as "([^"]*)" checked-bag as "([^"]*)" priority-access as "([^"]*)"$/, async (COB, CIB, PA)=>{
    await TABagsPage.selectBags(COB, CIB, PA)
})

Then(/^I Select "([^"]*)" from carry-on Bags drop down$/, async (COB)=>{
    await TABagsPage.selectCarryOnBags(COB)
})

Then(/^I Select Carry-On Bags as "([^"]*)" from drop down$/, async (COB)=>{
    await TABagsPage.selectCarryOnBags(COB)
})

Then(/^I Select "([^"]*)" from Checked-in Bags drop down$/, async (CIB)=>{
    await TABagsPage.selectCheckedInBags(CIB)
})

Then(/^I Select Checked-in Bags as "([^"]*)" from drop down$/, async (CIB)=>{
    await TABagsPage.selectCheckedInBags(CIB)
})

Then(/^I Select "([^"]*)" from Priority Access drop down$/, async (PA)=>{
    await TABagsPage.selectPriorityAccess(PA)
})

Then(/^I Select Priority Access as "([^"]*)" from drop down$/, async (PA)=>{
    await TABagsPage.selectPriorityAccess(PA)
})

// Then(/^I select "([^"]*)" in drop down for carry on bag$/, async (COB)=>{
//     await TABagsPage.selectCarryOnBags(COB)
// })
// Then(/^I select "([^"]*)" in drop down for checked bag$/, async (CIB)=>{
//     await TABagsPage.selectCheckedInBags(CIB)
// })

//search button - bags
Then(/^I Click Continue button from Bags Page from TAPortal$/, async ()=>{
    await TABagsPage.bagsPageContinueButton()
})

Then(/^I click on continue button from Bags page for CC$/, async ()=>{
    await TABagsPage.bagsPageContinueButton()
})

//select random bags
Then(/^I am on bagspage I choose carryon-bag checked-bag priority-access$/, async ()=>{
    await TABagsPage.selectRandomBags()
})

