const { test, expect } = require('@playwright/test');
import { Homepage } from '../pages/HomePage';
import { loginPage }  from '../pages/LoginPage';
import { cartpage }  from '../pages/cartpages';
test("page object case", async ({ page }) => {

     //login
 const login=new loginPage(page);//what you mention in the constructor will be passed here eg. async ({ page })
 await login.gotoApplication();
 await login.login("pavanol","test@123");
await page.waitForTimeout(5000);
     //home
 const home=new Homepage(page);
await home.addProductTOCard("Samsung galaxy s7");
await home.gotoCart();
await page.waitForTimeout(5000);
     //cart

     const cart=new cartpage(page);
   const status=  await cart.checkProductIncart("Samsung galaxy s7");
   expect(status).toBe(true);
     await page.waitForTimeout(5000);
})