

const {test,expect}=require('@playwright/test');

//test is required to create our test
//expect is required to check the condition

test("Home page",async({page})=>{

   await page.goto('https://www.demoblaze.com/');

   const pageTitle=await page.title();

   console.log('page title is: ',pageTitle);

await expect(page).toHaveTitle('STORE');

await expect(page).toHaveURL('https://www.demoblaze.com/')

const pageURL=await page.url();

console.log("page URL is:" ,pageURL)

await page.close();

});

//async will ensure it will return the promise
//await will enure the it will wait for the promise
//page contains all required methods