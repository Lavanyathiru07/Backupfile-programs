const {test,expect}=require('@playwright/test')

test("soft assertion",async({page})=>{

    await page.goto("https://www.demoblaze.com/");


//soft assertion

    await expect.soft(page).toHaveTitle('STOREe');
    await expect.soft(page).toHaveURL("https://www.demoblaze.com/");
    await expect.soft(page.locator('#nava')).toBeVisible();

   /* //hard assertion

    await expect(page).toHaveTitle('STOREe');
    await expect(page).toHaveURL("https://www.demoblaze.com/");
    await expect(page.locator('#nava')).toBeVisible();
    */
})