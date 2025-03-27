const base = require('@playwright/test')
exports.customtest = base.test.extend(
    {
        testDataForOrder: {  //JS Object so no ""
            username :    "anshika@gmail.com",
            password :    "Iamking@000",
            productName : "ZARA COAT 3"
        }
    }

)

