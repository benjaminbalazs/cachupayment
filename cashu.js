// import required library
const soap = require('soap');
const md5 = require('md5');
const request = require('request');
// import required library

//declare some useful function
var lowerCase = (str) => {
    return str.toLowerCase();
}

//init CONFIG
const CONFIG = {
    endpoint : {
        dev: {
            urlSoap : 'https://sandbox.cashu.com/secure/payment.wsdl',
            testMode: '0',
        },
        live: {
            urlSoap: 'https://secure.cashu.com/payment.wsdl',
            testMode: '0',
        }
    },
    defaultData: {
        language: 'en',
        txt1 :' ',
        testMode: '0',
    }
}
// init CONFIG
//declare class ES5 (SYNTAX)
function CachuModule(option) {

    // Play with Constructor
    if( option.mode ==null || option.encryption_key == null || option.service_name == null || option.merchantID == null ) throw 'missing required option';
        else {
            this.option = Object.assign(option);
            if(this.option.mode == 'live')
                this.option.endpoint = CONFIG.endpoint.live;
                else this.option.endpoint = CONFIG.endpoint.dev;
        }
    //Play with Constructor

    this.getTransactionCode = (sessionOption) => {
        
        if(sessionOption.currency == null || sessionOption.amount == null ) throw 'missing Session Option';

        //prepare  required Data send to SOAP
        let dataRequest = Object.assign(CONFIG.defaultData, sessionOption);
        dataRequest.merchantID = this.option.merchantID;
        dataRequest.servicesName = this.option.service_name;
        dataRequest.testMode = this.option.testMode;

        dataRequest.token = md5(lowerCase(dataRequest.merchantID) + ':' + dataRequest.amount + ':' + lowerCase(dataRequest.currency) + ':' +  lowerCase(dataRequest.sessionID) + ':' + this.option.encryption_key);
        //prepare  required Data send to SOAP

        return new Promise((resolve, reject) => {
            soap.createClient(this.option.endpoint.urlSoap, (err, client) => {
                if(err) {
                    reject(err.toString())
                    return;
                }
                    else {
                        client.DoPaymentRequest(dataRequest, (err, result) => {
                            if(err) {
                                reject(err.toString())
                                return;
                            } else {
                                var returnObject = result.DoPaymentRequestReturn['$value'].split('=');
                                if(returnObject[0] !='Transaction_Code') {
                                    reject(result);
                                    return;
                                } else {
                                    resolve(returnObject[1]);
                                }

                            }
                        })
                    }
            });

        });
    }

}

module.exports = CachuModule;
