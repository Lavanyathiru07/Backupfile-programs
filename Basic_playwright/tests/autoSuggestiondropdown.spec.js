const { test, expect } = require('@playwright/test');

test("auto suggestion option", async ({ page }) => {
    await page.goto("https://demoqa.com/auto-complete");
await page.locator("#autoCompleteMultipleInput").fill("a");
await page.waitForTimeout(5000);
const options = await page.$$("//div[contains(@id,'react-select-2-option-')]");
for (let opt of options)
{
   const value=await opt.textContent();
//    console.log(value);
if(value.includes("Black")){
    await opt.click();
    break;
}
}

await page.waitForTimeout(5000);
})          