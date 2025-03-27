const base = require('@playwright/test')
import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username:string;
    password:string;
    productName:string;
}
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder: {  //JS Object so no ""
            username :    "anshika@gmail.com",
            password :    "Iamking@000",
            productName : "ZARA COAT 3"
        }
    }

)

