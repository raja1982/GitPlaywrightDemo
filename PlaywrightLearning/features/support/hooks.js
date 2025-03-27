const {POManager} = require('../../pageobjects/POManager');
const {Before,After,AfterStep,Status} = require('@cucumber/cucumber');
const playwright = require('@playwright/test'); 
Before(async function(){
    const browser = await playwright.chromium.launch({headless:false},{timeout: 100*1000});  //playwright keyword is exposed through which we are able to give life to the page variable
    const context = await browser.newContext(); //local variable & it cannot be used in any other functions. One option is to declare globally
    //const page = await context.newPage(); //but with world constructor the same can be implemented
    //Using page variable in steps file. Hence using this.page to globalize. It is a world constructor
    this.page = await context.newPage();
    this.poManager = new POManager(this.page); //since this object is needed in every page
});

AfterStep(async function({ result }){
    if(result.status === Status.FAILED)
    {
        console.log('yes');
        await this.page.screenshot({path: 'screenshot1.png'});
    }
})

After(function(){
    console.log("I am last to execute");
});