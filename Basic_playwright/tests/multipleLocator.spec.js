const {test,except}=require('@playwright/test')

test('Locate the multiple element',async({page})=>{

await page.goto("https://www.demoblaze.com/");

// const links=await page.$$('a');
// for(const link of links){
//     const linktext=await link.textContent();
//     console.log(linktext);
// }

await page.waitForSelector("//div[@class='col-lg-4 col-md-6 mb-4']//h4/a");//this optional if that's take time retrive the data means you can use waitforselector
const products=await page.$$("//div[@class='col-lg-4 col-md-6 mb-4']//h4/a")

for(const product of products)
{
    const producttext=await product.textContent();
    console.log(producttext);
}


})