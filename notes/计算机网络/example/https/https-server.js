const https = require('https')
const fs = require('fs')

// 私钥
let key = fs.readFileSync('./rsa_private.key', 'utf-8')
// CA机构颁发的证书
let cert = fs.readFileSync('./certificate.pem', 'utf-8')

let options = {
    key,
    cert
}

let server = https.createServer(options, (req, res) => {
    res.end('hello')
})

server.listen(443)

