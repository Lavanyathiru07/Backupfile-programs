const{test,except, expect}=require('@playwright/test');
const { notDeepEqual } = require('node:assert');

test("AssertionsTest",async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


    //expect(page).toHaveURL   page have url
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


    //2)expect(page).toHaveTitle()     page has title

    await expect(page).toHaveTitle('OrangeHRM')


    //3)expect(page).toBevisible()
 const elementvisible=await page.locator('.orangehrm-login-branding')
 await expect(elementvisible).toBeVisible();

 //4)except(page).toBeEnabled() and except(page).toBeDisabled()

const elementenable=await page.getByPlaceholder('Username')
await expect(elementenable).toBeEnabled();
await elementenable.fill('Admin');

const elementenable1=await page.getByPlaceholder('password')
await expect(elementenable).toBeEnabled();
await elementenable1.fill('admin123');
 await page.click("//button[@type='submit']");
//5)expect (locator).toBeChecked()        Radio/checkbox is checked

await page.getByText('My Info').click();
const maleRatioButton =await page.locator("//input[@type='radio' and @value='1']");
await expect(maleRatioButton).toBeChecked();

//checkbox 

// const newsletterCheckbox = await page.locator('#NewsLetterSubscriptions_0__IsActive')
// await expect(newsletterCheckbox).toBeChecked();

//6) expect(locator).toHaveAttribute()    element has attribute

const firstname=await page.getByPlaceholder('First Name');
await expect(firstname).toHaveAttribute('name','firstName');// that elelment having this attribute or notDeepEqual


//7)expect(locator).toHaveText()---Elelemnt matches with text
const heading=await page.locator("(//h6[@class='oxd-text oxd-text--h6 orangehrm-main-title'])[1]");
await expect(heading).toHaveText('Personal Details');

//8)expect(locator).toContainText()--Element conatains text
 await expect(page.locator("(//h6[@class='oxd-text oxd-text--h6 orangehrm-main-title'])[1]")).toContainText('Personal ')

 //9)expect(locator).toHaveValue(Value)  Input has value

 await firstname.fill('lavanya');
 await expect(firstname).toHaveValue('lavanya');

 //10)expect(locator).toHaveCount()          list of element has given length
 //10)expect(locator).not.toHaveCount() 
await page.locator("//div[text()='Singaporean']").click();
 const option=await page.locator("div[class='oxd-select-dropdown --positon-bottom']");
 await expect(option).toHaveCount(30);

    
})