let https = require('https')
let fs = require('fs')

let options = {
    host: 'localhost',
    port: 443,
    path: '/',
    key: fs.readFileSync('./rsa_private.key'),
    cert: fs.readFileSync('././certificate.pem'),
    rejectUnhauthorized: false,
}

// 由于是自证书，因此无法认证成功
https.request(options, (err, response, body) => {
    console.log(body)
})