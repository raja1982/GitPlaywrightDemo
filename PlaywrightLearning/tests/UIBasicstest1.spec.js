const {test, expect} = require('@playwright/test')
//first launch the browser & then initiate the test - await & async are needed since the commands will not execute in sequence.
//The fixtures are available & come from @Playwright/test. No explicit declaration needed. In order to leverage fixtures inside method it has to be passed
//in {}, otherwise it would be a normal string variable
//test('First Playwright Test',async function(){ -- browser is a playwright feature,page fixture will automatically take care of the 2 lines
////test('First Playwright Test',async function({page}){ -- a default browser instance with a page will be given. No need of context & page declaration
//playwright.config.js - is the test runner which will be leveraged & it will choose which tests to be executed given in testDir
test('First Playwright Test',async ({browser}) => 
{
    // await will be enabled only if async is declared
    //await 
    //Section - 4 [19/5],    Topics - 21 [104/8],    Day1 - Section 5 ,    Day2 - Section 9,    Day3 - Section 12,    Day4 - Section 16,    Day5 - Section 20
    //chrome - plugins, cookies,
    //Create a new context, chrome -plugin & cookies are already available
    const context = await browser.newContext(); //fresh new incognito window. All the proxy & cookie information can be sent into browser.
    const page =  await context.newPage(); //const & let are keywords for declaration. An browser instance with above command but no page opened
    page.route('**/*.css',route => route.abort()); //block the css extension
    page.route('**/*.{jpg,png,jpeg}',route => route.abort());
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    //print all the requests
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //type, fill are 2 keywords used to enter data in the textbox
    //await page.locator("#username").fill("rahulshetty");
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    //await page.locator("#signInBtn").click();
    await signIn.click();
    //Error Message Validation - Extracting the text from browser. style value is dynamically changing style="display: none;"/"display: block"
    //Selenium webdriver wait
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    //After logging in how do you grab the title of first product. card-body css & a is where title
    //console.log(await page.locator(".card-body a").textContent()); - strict mode violation
    //out of 4 need 1st one
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").last().textContent());
    //All the values in an array/list can be got by alltextContents
    const allTitles = await cardTitles.allTextContents(); //textContent will wait until element is attached to DOM
    console.log(allTitles); //items will be shown in list - textContents will not wait & return empty without first,nth etc
    //techniques to wait dynamically for new page in Service based applications.
});

test('UI Controls',async ({page}) => 
{
    //page fixture will automatically declare new browser context & page
    //npx will automatically find the path of node_modules
    //await page.goto("https://google.com/");
    //console.log(await page.title());
    //await expect(page).toHaveTitle("Google") 
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    await dropdown.selectOption("consult");
    //radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //checkbox
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //no uncheck assertion validation + isChecked action is performed inside the bracket hence await is put when comparing to other expect
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //whether the above text "Free access to interview" is blinking or not
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    //await page.locator("#okayBtn").click();
    //await page.pause();
    //await signIn.click();
}); 

test('Child Windows handling',async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();        
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator("#username");
    //multiple statements have to be executed in parallel - use promise logic
    const [newPage]=await Promise.all([    
         context.waitForEvent('page'), //any new page getting opened in background or any event getting fired in backend
    //in general any JS statement have 3 promises pending, rejected, fulfilled

    //Open in new tab - Before clicking inform playwright that it will be opened in new page. This can be done only through browser context     
        documentLink.click(),  //new page already opened
    //waitForEvent - Only works with Chromium browsers presistent context
    ])
    const text = await  newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
   // await page.pause();
    console.log(await page.locator("#username").textContent());
    
});
