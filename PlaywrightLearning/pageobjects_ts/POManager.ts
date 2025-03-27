import { DashboardPage } from  "./DashboardPage"
import { LoginPage } from "./LoginPage";
import  {OrdersHistoryPage} from "./OrdersHistoryPage";
import  {OrdersReviewPage} from "./OrdersReviewPage";
import {CartPage} from "./CartPage";
import { Page } from "@playwright/test";


export class POManager {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    ordersHistoryPage: OrdersHistoryPage;
    ordersReviewPage: OrdersReviewPage;
    cartPage: CartPage;
    page:Page;
    constructor(page:Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
         
    }
    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

}

module.exports = { POManager };