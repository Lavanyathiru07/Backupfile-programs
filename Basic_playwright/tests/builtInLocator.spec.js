/*
page.getByRole() to locate by explicit and implicit accessibility attributes

 page.getByText() to locate a from control by associated lable's getByText

 page.getByLabel()

 page.getByPlaceholder()

 page.getByAlttext()== to locate an element,usually image,by its text alternative

 page.getByTitle()

 page.getByTestId()



*/

const {test,expect}=require('@playwright/test')

test('Bulit in locator',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

   //page.getByAltText() to locate an element, usually image, by its text alternative.
    const logo =await page.getByAltText('company-branding');//alt='company-branding' alt attribute most of time present in image

    await expect(logo).toBeVisible();

    //page.getByPlaceholder() to locate an input by placeholder.

   await page.getByPlaceholder('Username').fill('Admin');

   await page.getByPlaceholder('Password').fill('admin123');


   //page.getByRole() to locate by explicit and implicit accessibility attributes.  actionable eleement


   await page.getByRole('button',{type:'submit'}).click(); //which tag(button,input,a),{alt:'value'}  // eg  <button type="submit" >


/*<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>

await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

await page.getByRole('checkbox', { name: 'Subscribe' }).check();

await page.getByRole('button', { name: /submit/i }).click();
*/


//page.getByText() to locate by text content.
 
const profilename=await page.locator("//p[@class='oxd-userdropdown-name']");

//await expect(page.getByText('manda user')).toBeVisible();
await expect(page.getByText(profilename)).toBeVisible();

//page.getByLabel() to locate a form control by associated label's text.


//<label>Password <input type="password" /></label>

//await page.getByLabel('Password').fill('secret');


/*
page.getByTitle() to locate an element by its title attribute.

<span title='Issues count'>25 issues</span>

await expect(page.getByTitle('Issues count')).toHaveText('25 issues');


//<button data-testid="directions">Itinéraire</button>


await page.getByTestId('directions').click();
*/


})