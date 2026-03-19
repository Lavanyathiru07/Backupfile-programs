const { test, expect } = require('@playwright/test');

test("handle drop downs buttons", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //multiple ways to select the dropdown

    // await page.locator("#country").selectOption({label:'Canada'})//label /visible

    //await page.locator("#country").selectOption('Canada');// using visible text

    //await page.locator("#country").selectOption({value:'uk'});// using value

    // await page.locator("#country").selectOption({index:1});// using index

// await page.selectOption("#country",'Canada');//by text

//assertions

//1 check the number of option in the dropdown

// const options=await page.locator('#country option')     //==like this represent this ----"//select(@id="country")/option"

//   await expect(options).toHaveCount(1);// copare with that option total count exactly equal then return true else return false

//     await page.waitForTimeout(5000);

// 


//2)check number of option in dropdowm ---Approach 2

// const options=await page.$$('#country option') ///return the variable  in the form of array

// // console.log("Number of options",options.length)

// await expect(options.length).toBe(10); // verifinf the count 

//3)check presence of value in the dropdown--aproach

// const content=await page.locator('#country').textContent();///it will return the text value then it is string return value

// await expect(content.includes('India')).toBeTruthy();


//4)Check presence of value in the dropdown -approach 2 --using for looping

// const options=await page.$$('#country option');
//  let status=false; //intiall status is false because you didn't find the match value till now 

//  for(const option of options)
//  {
//     console.log(await option.textContent());
//     let value=await option.textContent();
//      if(value.includes('France'))
//      {
//         status=true;
//         break;
//      }
//  }
// await expect(status).toBeTruthy();

//5)select the option from the dropdown

const options=await page.$$('#country option');

 for(const option of options)
 {
    let value=await option.textContent();
     if(value.includes('France'))
     {
       await page.selectOption("#country",value);
    
     }
 }

 await page.waitForTimeout(5000);

})