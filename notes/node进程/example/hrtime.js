let fs = require('fs')
let path = require('path')
let time = process.hrtime()
let data = fs.readFileSync(path.join(__dirname, './memory.js'))
let diff = process.hrtime(time)
console.log(`读取文件操作耗时：${diff[0]}秒，${diff[1]}纳秒`);