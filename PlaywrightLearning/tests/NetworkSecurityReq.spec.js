const { test, expect, request } = require('@playwright/test');
test('Security test request intercept', async ({ page }) => {
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //For service based architecture page has to wait until dom state is loaded & network is idle without any sleep
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    //intercepting the request calls - route.continue({headers,url:'',cookie})
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});