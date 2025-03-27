const {test, expect} = require('@playwright/test');
test('Playwright special locators', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    //getbylabel is stable with clicks but not with edits
    //await page.getByLabel("Employed").uncheck();
    await page.getByLabel("Check me out if you Love IceCreams!").uncheck();
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    //await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    //easy way of identifying items
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

});