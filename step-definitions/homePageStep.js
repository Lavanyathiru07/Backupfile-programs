import { Given, When, Then } from '@cucumber/cucumber';
import homePage from '../page-objects/homePageObject'

let departureDate;

Given(/^I open the UI application url "([^"]*)"$/, async (url) => {
    await homePage.openURL(url)
})

Given(/^I Navigate to the Url "([^"]*)"$/, async (url) => {
    await homePage.Url(url)
})

Given(/^I am on landing page I select "([^"]*)"$/, async (triptype) => {
    await homePage.selectTripType(triptype)
})

Given(/^I get market from gql for OLCI$/, { timeout : 180 * 4000 }, async function () {
    await homePage.getmarket();
});

Given(/^I am on landing page I select market$/, async () => {
    await homePage.selectDeparture(process.env.origin);
    await homePage.selectDestination(process.env.arrival);
});

When(/^I click on the button for closing the popup$/, async () => {
    await homePage.popupClosing()
})

Then(/^I select the trip type as one way$/, async () => {
    await homePage.oneway()
})

When(/^I click on the login-button$/, async () => {
    await homePage.loginlink()
})

When(/^I set email and password to the inputfields$/, async () => {
    await homePage.loginWithCredentials()
})

When(/^I set "([^"]*)" to the inputfield of e-mail$/, async (value) => {
    await homePage.loginlink(value)
})

When(/^I set "([^"]*)" to the inputfield of pwd$/, async (value) => {
    await homePage.pwd(value)
})

Then(/^I click on the sign-in button$/, async () => {
    await homePage.submit()
})

When(/^I am on landing page I select "([^"]*)" for the departure airport$/, async (value) => {
    await homePage.selectingorigin(value)
})
When(/^I am on landing page I select "([^"]*)" for the destination airport$/, async (value) => {
    await homePage.selectingdestination(value)
})

When(/^I am on MT landing page I choose the departure date "(.+)" days from current day$/, async (number) => {
    await homePage.openDepartureDateCalendar()
    if (process.env.ENV.includes("prod") || process.env.tag.includes("prod")) {
        departureDate = await homePage.chooseDepartingDate(18);
    } else {
        await browser.setWindowSize(2700, 2700)
        departureDate = await homePage.chooseDepartingDate(number);
    }
});

When(/^I am on landing page I choose the departure date "([^"]*)" days from current day$/, async (number) => {
    await homePage.openDepartureDateCalendar()
    if (process.env.ENV.includes("prod") || process.env.tag.includes("prod")) {
        departureDate = await homePage.chooseDepartingDate(95);
    } else {
        departureDate = await homePage.chooseDepartingDate(number);
    }
    await browser.pause(3000)
});

When(/^I am on landing page I choose the returning date "(.+)" days from departure$/, async (number) => {
    await homePage.chooseReturningDate(number, departureDate);
});

Given(/^I am on landing page I select "([^"]*)" adult travelers$/, async (count) => {
    await homePage.selectAdults(count)
})

Given(/^I am on landing page I select Child as "([^"]*)"$/, async (count) => {
    await homePage.selectChildren(count)
})

Given(/^I am on landing page I select InfantInSeat as "([^"]*)"$/, async (count) => {
    await homePage.selectInfantInSeat(count)
})

Given(/^I am on landing page I select InfantInLap as "([^"]*)"$/, async (count) => {
    await homePage.selectInfantInLap(count)
})

Then(/^I am on landing page I click on search button$/, async () => {
    await homePage.submithomepage()
    await homePage.validateSearchPage()
})

Then(/^I click on the hotel-link$/, async () => {
    await homePage.hotellandonly()
})

Given(/^I navigate to www application$/, async () => {
    await homePage.getEnvironmentValue()
    let env = process.env.ENV
    let url
    if (process.env.tag.includes('green') || process.env.tag.includes('blue')) {
        if (env.includes('stg') && process.env.tag.includes('green')) {
            url = `https://www-rebr-int-green.stg.allegiantair.com`
        }
        else if (env.includes('stg') && process.env.tag.includes('blue')) {
            url = `https://www-rebr-int-blue.stg.allegiantair.com`
        }
    } else {
        if (env.includes('-')) {
            url = `https://www${env}.allegiantair.com`
        }
        else if (env.includes('.')) {
            url = `https://www${env}.allegiantair.com`
        }
        else if (env.includes('prod') && process.env.tag.includes('prod')) {
            url = `https://www.allegiantair.com`
        }
    }
    await homePage.openURL(url)
    await homePage.getURL()
})

Given(/^I load payment key$/, async () => {
    let env = process.env.ENV
    let url
    if (env.includes('prod')) {
        console.log("Payment Key not required for PROD")
    } else {
        if (env.includes('stg')) {
            url = `https://fes.stg.allegiantair.com/pie/v1/1/getkey.js`
        } else if (env.includes('okd')) {
            url = `https://fes-dev-devshare.okd.allegiantair.com/pie/v1/1/getkey.js`
        } else {
            url = `https://fes.devshare.allegiantair.com/pie/v1/1/getkey.js`
        }
        await homePage.openKey(url)
    }
})


Given(/^I navigate to prod application "([^"]*)"$/, async silo => {
    console.log("COMING HERE????????????????????????")
    let env = process.env.ENV;
    if (env.includes("prod")) {
        if (silo === 'rebrand-blue') {
            await homePage.openURL("https://www-rebr-int-blue.prd.allegiantair.com");
            console.log('The Launched url is: https://www-rebr-int-blue.prd.allegiantair.com');
        }
        if (silo === 'rebrand-green') {
            await homePage.openURL("https://www-rebr-int-green.prd.allegiantair.com");
            console.log('The Launched url is: https://www-rebr-int-green.prd.allegiantair.com');
        }
        if (silo === 'MainVIP') {
            homePage.openURL("https://www.allegiantair.com");
        }
    }
    else if (!env.includes("prod") && !env.includes("okd")) {

        if (silo === 'rebrand-blue') {
            await homePage.openURL('https://www-rebr-int-blue' + env + '.allegiantair.com');
        }
        if (silo === 'rebrand-green') {
            await homePage.openURL('https://www-rebr-int-green' + env + '.allegiantair.com');
        }
        if (silo === 'MainVIP' && !env.includes("prd02.aws")) {
            await homePage.openURL('https://www' + env + '.allegiantair.com');
        }
    } else if (env.includes("aws") || env.includes("okd")) {
        if (silo === 'MainVIP' && env.includes("okd")) {
            await homePage.openURL('https://www' + env + '.allegiantair.com');
        }
        if (silo === 'rebrand-blue') {
            console.log(`${env} ENV is not available for rebrand blue`)
        }
        if (silo === 'rebrand-green') {
            console.log(`${env} ENV is not available for rebrand green`)
        }
    }
    else {
        await homePage.openURL(env);
    }
});
