 import { expect,type Locator, type Page} from '@playwright/test';
 var message1 = "Hello";
 message1 = "bye";
 console.log(message1);
 let age1:number = 20;
 console.log(age1);
 let isActive : boolean = false;
 let numberArry:number[] =[1,2,3];
 let data : any = "this could be anything";
 data = 42;
 console.log(data);
function add(a:number,b:number): number
{
    return a+b
}
add(3,4)
//object declaration
let user:{name:String,age:Number} = {name:"Bob", age:49};
user.location="Houston";

class CartPage{
    page:Page;
    cartProducts:Locator;
    productsText:Locator;
    cart:Locator;
    checkout:Locator;
    orders:Locator;
    constructor(page:any){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart =  page.locator("[routerlink*='cart']");
        this.checkout = page.locator("text=Checkout");
        this.orders = page.locator("button[routerlink*='myorders']");
    }
}