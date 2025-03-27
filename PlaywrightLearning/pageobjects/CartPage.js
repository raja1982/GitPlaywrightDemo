const {test, expect} = require('@playwright/test');
class CartPage{
    constructor(page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart =  page.locator("[routerlink*='cart']");
        //this.checkout = page.locator("text=Checkout");
        this.checkout = page.locator("li[class='totalRow'] button[type='button']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }
    async VerifyProductIsDisplayed(productName)
    {
        console.log("Call product locator");
        await this.cartProducts.waitFor();
        console.log("Call product locator");
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async Checkout(){
        console.log("before checkout click");
        await this.checkout.click();
    }
    getProductLocator(productName){
        console.log("before" +productName);
        return this.page.locator("h3:has-text('"+productName+"')");
        console.log("after" +productName);
    }
}
module.exports={CartPage};