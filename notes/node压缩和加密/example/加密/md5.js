/**
 * md5作用：
 * - 可以用来校验要下载的文件是否被改动过
 * - 对密码进行加密
 */

let crypto = require('crypto');

// 获取加密类型
// console.log(crypto.getHashes());

let md5 = crypto.createHash('md5');
md5.update('hello'); // 指定要加密的值
md5.update('world'); // 再次添加要加密的值
console.log(md5.digest('hex')); // 输出md5值，指定输出的格式 hex 十六进制
// fc5e038d38a57032085441e7fe7010b0 // 32位

let sha = crypto.createHash('sha1');
sha.update('hello'); // 指定要加密的值
sha.update('world'); // 再次添加要加密的值
console.log(sha.digest('hex'));
// 6adfb183a4a2c94a2f92dab5ade762a47889a5a1 // 40位

