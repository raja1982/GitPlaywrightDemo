const {Given,When,Then} = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test'); //exposing playwright keyword
const playwright = require('@playwright/test');  //this is needed for customized object since page/browser are accessible only in test class with playwright
Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    /*const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage(); //it is not directly exposed under page
    //const poManager = new POManager(page);  //cucumber annotation does not give any page hence no life
    // world constructor to access variables, classes & methods
    this.poManager = new POManager(page);
    //this.poManager = new POManager(page); */ //All prerequisite has been added to hooks
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage(); //get all the pages from PO Manager
    //this.loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password);
    await loginPage.validLogin(username,password);
  });
  
When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions dashboard is used down
     this.dashboardPage = this.poManager.getDashboardPage(); //it can be leveraged globally. The scope has increased.
     await this.dashboardPage.searchProductAddCart(productName);
     await this.dashboardPage.navigateToCart();
     
});

Then('Verify {string} is diplayed in the Cart',{timeout: 100*1000},async function (productName) {
// Write code here that turns the phrase above into concrete actions
    // const cartPage = this.poManager.getCartPage();
    this.cartPage = this.poManager.getCartPage();
     await this.cartPage.VerifyProductIsDisplayed(productName);
     await this.cartPage.Checkout();
   
});

When('Enter valid details and Place the Order',{timeout: 100*1000}, async function () {
 // Write code here that turns the phrase above into concrete actions
   this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
     
});
Then('Verify order is present in the OrderHistory page', {timeout: 100*1000},async function () {
 // Write code here that turns the phrase above into concrete actions
     await this.dashboardPage.navigateToOrders();
      this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
      await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
     expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
     
});

//what are the problems with above approach & how it can be fixed through world constructor


   
   Given('a login to Ecommerce2 applicaiton with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    //const userName = this.page.locator('#username');
    //const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //await userName.fill(username);
    await this.page.locator('#username').fill(username);
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#signInBtn").click();
  });

  Then('Verify Error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
    
  }); 