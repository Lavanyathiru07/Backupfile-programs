import {Given, When, Then} from '@cucumber/cucumber'
import actions from '@g4/prova-ui/src/support/actions'
import tahomePage from '../../page-objects/ta-silo-booking_Page/TAHomePage'

const closepopup = "[class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']"
const closepopup2 = ".onetrust-close-btn-handler.onetrust-close-btn-ui"

let env=process.env.ENV
let url

Given(/^I navigate to TA page$/,async () =>{
    if(env.includes("aws")){
        url = `https://ta.${env}.allegiantair.com/ta-login`
        await tahomePage.open_url(url)
        await tahomePage.ta_login_app()
        await actions.clickElement('click', closepopup, "close cookie popup")
    }
    else if(env.includes("okd")){
        // throw new Error("TA url is not available for OKD environments")
        url = `https://ta-${env}.allegiantair.com/ta-login`
        await tahomePage.open_url(url)
        await tahomePage.ta_login_app()
        await actions.clickElement('click', closepopup, "close cookie popup")
    }
    else{
        url = `https://ta.${env}.allegiantair.com/ta-login`
        await tahomePage.open_url(url)
        await tahomePage.ta_login_app()
        await actions.clickElement('click', closepopup, "close cookie popup")
    }
})

Given(/^I navigate to the TA "([^"]*)" page$/,async (siloType) =>{

    if(env.includes("prod")){
        let url = `https://ta-sw-prod-${siloType}.allegiantair.com/ta-login`
        await tahomePage.open_url(url)
        await tahomePage.ta_login_app()
        await actions.clickElement('click', closepopup, "close cookie popup")
    }
    else if(env.includes("okd")){
        throw new Error(siloType," url is not available for OKD environments")
    }
    else{
        let url = `https://ta-${siloType}${env}.allegiantair.com/ta-login`
        await tahomePage.open_url(url)
        await tahomePage.ta_login_app()
        await actions.clickElement('click', closepopup, "close cookie popup")
    }
    
})

Given(/^I navigate to the CC application$/,async () =>{
    let url
    if(env){
        if (env.includes("prod")) {
            url = `http://cc-sw-prod-silo1.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("okd")) {
            url = `https://cc-${env}.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("prd01")) {
            url = `https://cc-prd01.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("prd02")) {
            url = `https://cc-prd02.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("dev01")) {
            url = `https://cc.dev01.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
    }
})

Then(/^I navigate to the CC "([^"]*)" application$/,async (siloType) =>{
    
        if (env.includes("prod")) {
            let url = `https://cc-sw-prod-${siloType}.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("prd01")) {
            let url = `https://cc-prd01.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("prd02")) {
            let url = `https://cc-prd02.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("dev01")) {
            let url = `https://cc.dev01.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
        else if (env.includes("dev02")) {
            let url = `https://cc.dev02.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }  
        else {
            let url = `https://cc-${siloType}${env}.allegiantair.com/`
            await actions.openWebsite(url)
            await actions.clickElement('click', closepopup, "close cookie popup")
        }
})

When(/^I login to TA application$/, async () => {
await tahomePage.ta_login_app()
})