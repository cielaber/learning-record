// 使用密钥生成摘要

let crypto = require('crypto');
let fs = require('fs')
let path = require('path');

// let key = 'abc'

/**
 * 使用PEM格式的密钥
 * 生成命令：openssl genrsa -out rsa_private.key 1024
 */
let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'))

let hmac = crypto.createHmac('sha1', key);
hmac.update('123');
let result = hmac.digest('hex');
console.log(result);