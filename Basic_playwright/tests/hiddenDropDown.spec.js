const { test, expect } = require('@playwright/test');

test("hidden dropdown", async ({ page }) => {

await page.goto("https://demoqa.com/select-menu");

await page.locator("#react-select-2-input").click();
//crt+shift+p FOR hiiden dropdown
const sleectoreoption=await page.$$("//div[contains(@id,'react-select-2-option')]");
await page.waitForTimeout(5000);
for(let selopt of sleectoreoption)
{
    await page.waitForTimeout(20000);
    const value=selopt.textContent();
    if(value.includes("Group 1, option 1"))
    {
        await console.log(value);
        await selopt.click();
        break;
    }
}
await page.waitForTimeout(5000);
})