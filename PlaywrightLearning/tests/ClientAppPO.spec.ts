import { test, expect } from '@playwright/test';
import  {POManager} from '../pageobjects_ts/POManager';
import {customTest} from '../utils_ts/test-base';
//JSON -> string -> JS object
const dataset = JSON.parse(JSON.stringify(require('../utils_ts/placeorderTestData.json'))); //Convert JSON object into Java Script object
//test.describe.configure({mode:'parallel'}); //individual tests within this spec file will run in parallel
//test.describe.configure({mode:'serial'}); //interdependency files will not get triggered if the main test fails
for(const data of dataset){
test(`Client App login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    //modern architecture apps with service based calls
    //const products = page.locator(".card-body");
    //const productName = 'ZARA COAT 3';
    //const username = "anshika@gmail.com";
    //const password = "Iamking@000";
    //const loginPage = new LoginPage(page);
    const loginPage = poManager.getLoginPage(); //get all the pages from PO Manager
    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password);
    await loginPage.validLogin(data.username, data.password);
    //const  dashboardPage = new DashboardPage(page);
    const dashboardPage = poManager.getDashboardPage();
    //await dashboardPage.searchProductAddCart(dataset.productName);
    //await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    //await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


});
}
//custom test fixture - cannot be parameterized. only one input can be given
customTest(`Client App login for`, async ({ page,testDataForOrder }) => {
    const poManager = new POManager(page);
    //modern architecture apps with service based calls
    //const products = page.locator(".card-body");
    //const productName = 'ZARA COAT 3';
    //const username = "anshika@gmail.com";
    //const password = "Iamking@000";
    //const loginPage = new LoginPage(page);
    const loginPage = poManager.getLoginPage(); //get all the pages from PO Manager
    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password);
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    //const  dashboardPage = new DashboardPage(page);
    const dashboardPage = poManager.getDashboardPage();
    //await dashboardPage.searchProductAddCart(dataset.productName);
    //await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    //await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


});
