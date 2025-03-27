const {test, expect} = require('@playwright/test');
test('First Playwright Test',async ({page}) => 
{
    //modern architecture apps with service based calls
    const products = page.locator(".card-body"); 
    const productName = 'ZARA COAT 3';
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //For service based architecture page has to wait until dom state is loaded & network is idle without any sleep
    await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);  
   //Zara Coat 4
   const count = await products.count();
   console.log(count);
   for(let i=0;i < count; ++i) {
    if(await products.nth(i).locator("b").textContent() === productName){
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
   }
   //await page.pause();
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();  //No auto wait is there. We need to wait until the page is loaded with all the items
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();  //has-text is a psueudo class inside css
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   //await page.locator("[placeholder*='Country']").fill("Ind"); //fill will not workout since it will put the entire string at once
   await page.locator("[placeholder*='Country']").pressSequentially('ind',{delay:100});
   const countryDropdown = page.locator(".ta-results");
   await countryDropdown.waitFor();
   const optionsCount = await countryDropdown.locator("button").count();
   for(let i=0;i<optionsCount;++i) {
     const countryText = await countryDropdown.locator("button").nth(i).textContent();
     if(countryText === " India"){  //text.trim() or text.includes
        await countryDropdown.locator("button").nth(i).click();
        break;
     }
   }
   //the email id coming out on the top of box is the same used for login. This is email validation
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   //parent child tagging to get the order id separately
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   //await page.pause();
   console.log(orderId);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor(); //there are no operations for autowait
   const rows = await page.locator("tbody tr");
   for(let i=0;i<await rows.count();++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
