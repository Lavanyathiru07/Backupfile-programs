const { test, expect, chromium } = require('@playwright/test');

test("handling windows", async ({ page }) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();



    const page2 = await context.newPage();

    const allpages = context.pages();

    console.log("total pages are: ", allpages.length);

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");

    await page2.goto("https://orangehrm.com/");
    await expect(page2).toHaveTitle("OrangeHRM: All in One HR Software for Businesses ");
})

test.only("handling windows 09", async ({ page }) => {

    const browser = await chromium.launch();//to handle the mutilple window first launch the chromium browser 
    const context = await browser.newContext();//in chromium we have to create the context to handle the multiple pages
    const page1 = await context.newPage();// after creating the context we have to create the page to perform the action on that page
    const page2 = await context.newPage();

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");// this page is parent page

   const pagePromise= context.waitForEvent('page')// to open the child page we have to wait for the event of page and store it in a variable
await page1.click("//a[text()='OrangeHRM, Inc']");
const newPage=await pagePromise;//new page is a child page which is opened after clicking on the link in parent page+l
await newPage.waitForLoadState();
await expect(newPage).toHaveTitle("OrangeHRM: All in One HR Software for Businesses ");

await page1.waitForTimeout(5000);// page 1
await newPage.waitForTimeout(5000);//page 2
})