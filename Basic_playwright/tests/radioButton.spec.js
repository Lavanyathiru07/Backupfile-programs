const { test, expect } = require('@playwright/test');

test("handle radio buttons", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //radio button

    // await page.locator("#female").check();

    await page.check("#female");
    await expect(await page.locator("#female")).toBeChecked();
    await expect(await page.locator("#female").isChecked()).toBeTruthy();
    //await page.locator("#female").isChecked())--it will return true then compare with tobetruthy both are true it will be true

    //male radio button is not selected
    await expect(await page.locator("#male").isChecked()).toBeFalsy();
    //(await page.locator("#male").isChecked)===return false because it isnot checked and check with tobefalsy ---=F then condition will be true
    
    await page.waitForTimeout(5000);
})