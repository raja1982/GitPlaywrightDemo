const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
//48 video code has to be rewritten
const loginPayLoad = {userEmail: "anshika@gmail.com",userPassword: "Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6581ca979fd99c85e8ee7faf"}]};
let response;
//let token;

test.beforeAll(async () =>{
    //Login API
    const apicontext = await request.newContext();
    const apiUtils = new APIUtils(apicontext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)
    
    //create order api call
    });

  //response object is created because token & order id is needed
test.describe('group',{tag:'@report'},()=>{
    test('@API Place the order without logging in',async ({page}) => 
    {
       /* page.addInitScript(value => {
            window.localStorage.setItem('token',value);
        }, token); */
        //javascript has to be used to add the local storage token
        page.addInitScript(value => {
            window.localStorage.setItem('token',value);
        }, response.token);  //token is the argument for value[value is argument initialized at top]

        await page.goto("https://rahulshettyacademy.com/client");        
       await page.locator("button[routerlink*='myorders']").click();
       await page.locator("tbody").waitFor(); //there are no operations for autowait
       const rows = await page.locator("tbody tr");
       for(let i=0;i<await rows.count();++i){
            console.log('rm');
            console.log(rows.count());
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            //console.log(rowOrderId);
            //console.log(orderId);
            if(response.orderId.includes(rowOrderId)){
                await rows.nth(i).locator("button").first().click();
                break;
            }
       }
       const orderIdDetails = await page.locator(".col-text").textContent();
       expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    });
});