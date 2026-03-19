const { test, expect } = require('@playwright/test');

test("handle inbox", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //input box

    // await page.getByPlaceholder("Enter Name").fill("Doganimal");
    await expect(await page.getByPlaceholder('Enter Name')).toBeVisible();
    await expect(await page.getByPlaceholder('Enter Name')).toBeEmpty();
    await expect(await page.getByPlaceholder('Enter Name')).toBeEditable();
    await expect(await page.getByPlaceholder('Enter Name')).toBeEnabled();


    await page.fill('[placeholder="Enter Name"]', 'catanimal')

    await page.waitForTimeout(5000);//pasusing code

})