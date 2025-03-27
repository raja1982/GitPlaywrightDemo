export class APIUtils{
    apicontext:any;
    loginPayLoad:string;
    constructor(apicontext:any,loginPayLoad:string){
        this.apicontext = apicontext;
        this.loginPayLoad = loginPayLoad;
    }
  async getToken(){
    
    const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        })//200,201
        //expect(loginResponse.ok()).toBeTruthy();
        //need to grab the response & get the token value
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token; 
        console.log(token);
        return token;
    }
    async createOrder(orderPayLoad:string)
    {
        let response={token:String,orderId:String};
        response.token = await this.getToken();
        const orderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data:orderPayLoad,
                headers:{
                            'Authorization' : response.token,
                            'Content-Type':'application/json'
                       },
    
            })
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId=orderId;
            console.log(orderId);
            return response;
    }
}

module.exports={APIUtils};