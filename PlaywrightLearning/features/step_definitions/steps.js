/*const {Given,When,Then} = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');  //this is needed for customized object since page/browser are accessible only in test class with playwright
Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    //all the presetup has been cut down & placed it in hooks before
     //const browser = await playwright.chromium.launch({headless:false});  //playwright keyword is exposed through which we are able to give life to the page variable
   // const context = await browser.newContext(); //local variable & it cannot be used in any other functions. One option is to declare globally
    //const page = await context.newPage(); //but with world constructor the same can be implemented
     // Write code here that turns the phrase above into concrete actions
    //const poManager = new POManager(page); instead of const make it this in that way it executes fine
    //this.poManager = new POManager(page);
    //const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage(); //get all the pages from PO Manager
    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password);
    await loginPage.validLogin(username,password);
  });
  
When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage(); //it can be leveraged globally. The scope has increased.
     await this.dashboardPage.searchProductAddCart(productName);
     await this.dashboardPage.navigateToCart();
     
});

Then('Verify {string} is diplayed in the Cart',async function (productName) {
// Write code here that turns the phrase above into concrete actions
     this.cartPage = this.poManager.getCartPage();
     await this.cartPage.VerifyProductIsDisplayed(productName);
     await this.cartPage.Checkout();
   
});

When('Enter valid details and Place the Order', async function () {
 // Write code here that turns the phrase above into concrete actions
 this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
     
});
Then('Verify order is present in the OrderHistory page', async function () {
 // Write code here that turns the phrase above into concrete actions
     await this.dashboardPage.navigateToOrders();
     this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
      await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
     expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
     
});

//what are the problems with above approach & how it can be fixed through world constructor

Given('a login to Ecommerce2 applicaiton with {string} and {string}', async function (username, password) {
     // Write code here that turns the phrase above into concrete actions
     const userName = this.page.locator('#username');
     const signIn = this.page.locator("#signInBtn");
     await this.page.goto("https://rahulshettyacademy.com/logingpagePractise/");
     console.log(await page.title());
     await userName.fill(username);
     await this.page.locator("[type='password']").fill(password);
     await signIn.click();
   });

   Then('Verify Error message is displayed', async function () {
     // Write code here that turns the phrase above into concrete actions
     console.log(await this.page.locator("[style*='block']").textContent());
     await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
     
   }); */