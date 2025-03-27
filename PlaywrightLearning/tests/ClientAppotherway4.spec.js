const {test, expect} = require('@playwright/test');
test('First Playwright Test',async ({page}) => 
{
    //modern architecture apps with service based calls
    const products = page.locator(".card-body"); 
    const productName = 'ZARA COAT 3';
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");    
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:"Login"}).click();
    //For service based architecture page has to wait until dom state is loaded & network is idle without any sleep
    await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);  
   //Zara Coat 4 - Apply filter
   await page.locator(".card-body").filter({hasText:'ZARA COAT 3'})
   .getByRole("button",{name:"Add to Cart"}).click()
   
   //await page.pause();
   //there are four carts available in the page. Hence add the listitem & then it would be 1
   await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
   await page.locator("div li").first().waitFor();  //No auto wait is there. We need to wait until the page is loaded with all the items
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name:"Checkout"}).click();
   //await page.locator("[placeholder*='Country']").fill("Ind"); //fill will not workout since it will put the entire string at once
   await page.getByPlaceholder("Select Country").pressSequentially('ind',{delay:100});
   await page.getByRole("button",{name:"India"}).nth(1).click();
   //the email id coming out on the top of box is the same used for login. This is email validation
   //await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.getByText("Place Order").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   
});
