class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }
    async searchProductAddCart(productName) {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        //Zara Coat 4
        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                console.log("Added to cart");
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();
        console.log("Cart link clicked");
    }
    async navigateToOrders() {
        await this.orders.click();
    }


}

module.exports = { DashboardPage };