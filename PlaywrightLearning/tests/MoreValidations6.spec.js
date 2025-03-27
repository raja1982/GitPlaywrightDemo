const {test,expect} = require('@playwright/test')
test('popup validations',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    //page navigation
   /* await page.goto("https://google.com");    
    await page.goBack();
    await page.goForward();*/
    //validate if the element is in hidden mode or not
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //alert popups - java or java script. No html related. It is called dialog
    //on method will wait until event executes. once dialog appears,click yes or no
    //the event has to occur & then take next steps
    page.on('dialog',dialog => dialog.accept());
    //page.on('dialog',dialog => dialog.dismiss();
    await page.locator("#confirmbtn").click();
    //mouse hover
    await page.locator('#mousehover').hover();
    //how to handle & automate frames within playwright - tag iFrame will determine the control
    //framelocator to convert from normal page
    const framesPage = page.frameLocator("#courses-iframe");
    //playwright will access only visible locators, invisible can be eliminated
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]); 
});

test("Screenshot & Visual comparison",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");   
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screenshot - store -> screenshot
test('visual',async({page})=>{
    await page.goto("https://www.academy.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})