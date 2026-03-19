const { test, expect } = require('@playwright/test');

test("handle checkboxes", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //checkbox

    await page.locator("#sunday").check();
    await expect(await page.locator("#sunday")).toBeChecked();

    //ischecked() and toBeTruthy()
    await expect(await page.locator("#sunday").isChecked()).toBeTruthy();

    await expect(await page.locator("#monday").isChecked()).toBeFalsy();
   // await page.check("#sunday");


   //mutilecheckbox

   const checkboxes=["#monday","#tuesday","#saturday"]

   for(const checkboxlocator of checkboxes)
{
    await page.check(checkboxlocator);
}

await page.waitForTimeout(5000);

   for(const checkboxlocator of checkboxes)
{
    if(await page.locator(checkboxlocator).isChecked()){
    await page.uncheck(checkboxlocator);
    }
}


await page.waitForTimeout(5000);

})