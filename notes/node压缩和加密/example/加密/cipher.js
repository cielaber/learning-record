// 对称加密

let crypto = require('crypto');
let path = require('path')
let fs = require('fs');

let str = 'hello'

let privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));

// 加密
let cipher = crypto.createCipher('blowfish', privateKey)
cipher.update(str, 'utf-8')
let result = cipher.final('hex');
console.log(result);

// 解密
let decipher = crypto.createDecipher('blowfish', privateKey);
decipher.update(result, 'hex');
let source = decipher.final('utf-8');
console.log(source);
