const cachu = require('./cashu');

var payment = new cachu({
    mode: 'dev',
    encryption_key: 'key',
    merchantID : 'id',
    service_name: 'Service name'
});

payment.getTransactionCode({
    currency: 'EUR',
    amount : 12,
    language: 'ar',
    displayText: 'Hello',
    sessionID: '1234567897/'
}).then(code => {
    console.log(code)
}).catch(error => {
    console.log(error)
})
