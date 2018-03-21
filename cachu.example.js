const cachu = require('./cachu.module');
var payment = new cachu({
    mode: 'dev',
    encryption_key: 'ptidgxxesqu89zeh',
    merchantID : 'soluki',
    service_name: 'Soluki'
});
payment.doPaymentRequest({
    currency: 'EUR',
    amount : 12,
    language: 'ar',
    displayText: 'Hello',
    sessionID: '1234567897/'
}).then(html =>{
    console.log(html)
}).catch(err => {
    console.log(err)
})
