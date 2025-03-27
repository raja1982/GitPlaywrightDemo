import{test, expect,Locator,Page} from '@playwright/test';
export class LoginPage{
    page:Page;
    signInbutton:Locator;
    userName: Locator;
    password: Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']"); //anything mapped with this is associated to this class alone. When object is created it initialized all variables
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client"); 
    }
    async validLogin(username:string,password:string)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
} 
