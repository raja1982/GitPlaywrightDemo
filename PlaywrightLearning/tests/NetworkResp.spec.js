const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
//48 video code has to be rewritten
const loginPayLoad = {userEmail: "anshika@gmail.com",userPassword: "Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6581ca979fd99c85e8ee7faf"}]};
const fakePayLoadOrders = {data:[],message:"No orders"}; //javascript object need to be converted to json
let response;

test.beforeAll(async () =>{
    //Login API
    const apicontext = await request.newContext();
    const apiUtils = new APIUtils(apicontext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)
    
    //create order api call
    });

  
test('Place the order without logging in',async ({page}) => 
    {
        
        //javascript has to be used to add the local storage token
        page.addInitScript(value => {
            window.localStorage.setItem('token',value);
        }, response.token);  //token is the argument for value[value is argument initialized at top]

        await page.goto("https://rahulshettyacademy.com/client");        
       //simulate the condition no orders displayed in the webpage. Go & mock my orders call
       //route is the command. route the api the way i want to see. 2nd argument is a function route()
       await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request()) //fetch the response of above api call
            //intercepting response - API response -> hijack[playwright fake resp] browser ->render data on front end
            //control is only on the browser & not on the server level
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }); //send response to browser
        });        
        await page.locator("button[routerlink*='myorders']").click();
        await page.pause();
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
        //generalize by putting *
        console.log(await page.locator(".mt-4").textContent());
       

    });
    