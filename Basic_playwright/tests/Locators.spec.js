// const{test,except}=require('@playwright/test')
import { test, expect } from '@playwright/test'

test('Locators', async ({ page }) => {

    await page.goto("https://www.demoblaze.com/");

    //click on login in button-property

    // await page.locator('id=login2').click();

    await page.click('id=login2');

    //provide username -css

    //await page.locator('#loginusername').fill("lavanya");

    await page.fill('#loginusername', 'pavanol')

    // await page.type('#loginusername');

    //provide password

    // await page.fill("input[id=loginpassword']", "Lavan@87");


    await page.fill('#loginpassword',"test@123");

    //click on login button

    await page.click("//button[text()='Log in']")

    //verify logout link presence

    const logoutlink = await page.locator("//a[text()='Log out']")
    await expect(logoutlink).toBeVisible();

    await page.close();

})