const{test, expect}=require('@playwright/test');

test.skip("haow to handle alerts",async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    //enabling alert handling or dialog window handler
page.on('dialog',async dialog=>{
expect(dialog.type()).toContain('alert');
expect(dialog.message()).toContain('I am an alert box!');
await dialog.accept();
})

 await page.click("//button[@id='alertBtn']");//before alert appear you have to enable the alert handling or dialog window handler and then click on the button to get the alert and handle it
await page.waitForTimeout(5000);
});

test.skip("haow to confirmation alert",async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    //enabling alert handling or dialog window handler
page.on('dialog',async dialog=>{
expect(dialog.type()).toContain('confirm');
expect(dialog.message()).toContain('Press a button!');
await dialog.accept();//close using okay button
//await dialog.dismiss();//close using cancel button
})

 await page.click("//button[@id='confirmBtn']");//before alert appear you have to enable the alert handling or dialog window handler and then click on the button to get the alert and handle it
await expect(page.locator("//p[@id='demo']")).toHaveText('You pressed OK!');//after accepting the alert you have to verify the text on the page


await page.waitForTimeout(5000);
});


test("how to handle the prompt alert",async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    //enabling alert handling or dialog window handler
page.on('dialog',async dialog=>{
expect(dialog.type()).toContain('prompt');
expect(dialog.message()).toContain('Please enter your name:');
expect(dialog.defaultValue()).toContain('Harry Potter');
await dialog.accept('john');//pause the value in the acccept alert
})

 await page.click("//button[@id='promptBtn']");//before alert appear you have to enable the alert handling or dialog window handler and then click on the button to get the alert and handle it
await expect(page.locator("//p[@id='demo']")).toHaveText('Hello john! How are you today?');//after accepting the alert you have to verify the text on the page


await page.waitForTimeout(5000);
});