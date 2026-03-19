const { test, expect } = require('@playwright/test');

test("handle drop downs buttons", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");




    await page.waitForTimeout(5000);
})