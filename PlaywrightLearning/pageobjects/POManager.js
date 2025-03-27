const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { CartPage } = require('./CartPage');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        
    }
    getLoginPage() {
        console.log("getLoginPage");
        return this.loginPage;
    }

    getCartPage() {
        console.log('getcartpage');
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