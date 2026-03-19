const { test, expect } = require('@playwright/test');

test("handle drop downs buttons", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");


    //select multiple options from multi select dropdown

    //await page.selectOption("#colors",['Green','Blue','Red']);

//Assertions

// //1)check number of option in the dropdown

// const options=await page.locator('#colors option')

// await expect(options).toHaveCount(7)
//     await page.waitForTimeout(5000);

// //2)check number of option in the dropdown using JS Array

// const options=await page.$$('#colors option')

// console.log(await options.length)

// await expect(options.length).toBe(7);


//3)check the presence of value in the dropdown

const content=await page.locator('#colors').textContent();
await expect(content.includes('Blue')).toBeTruthy();


    await page.waitForTimeout(5000);


})