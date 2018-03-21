How To USE: <br>  
<br>  
*** please view code in file cachu.example.js  
-Step 1: npm install  
-Step 2: npm test   

-- IMPORTANT:  
- Create new PaymentGateway:  
    -code :
        - const cachu = require('./cachu.module');
        - var paymentGateway = new cachu(option);

    -note:   
        -Structure of option  
          -  option: Object = {  
          -      mode: 'dev' || 'live', //'dev' is sandbox. 'live' is live production  
          -      encryption_key: string // the encryption key  
          -      merchantID: string //the merchantID ID  
          -      service_name: string // the service_name in account  
          -  }
- Create a paymentRequest;  
    -code:  
        cachu.doPaymentRequest(option) // Promise function  
    -response:  
        -success :  
            - html code  
        -error :  
            - the error happen  
    -note:  
    -Structure of option  
        -option:Object = {  
           - *amount :  string or number // amount of item  
           - *currency : string //currency Code,  
           - *language : string // code of language,  
           - *sessionID : string // session hash,  
           - displayText  : string //   
           - txt1 :' ',  
           - txt2 :' ',  
           - txt3: ' ',  
           - txt4 : ' ',  
           - txt5 : ' ',  
           - testMode: '0' // the testMode  
        -}  
  