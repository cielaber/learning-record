/**
 * 强制缓存
 */

let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
let mime = require('mime')
let crypto = require('crypto')

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    let filePath = path.join(__dirname, pathname);
    console.log(pathname);
    fs.stat(filePath, (err, stat) => {
        if (err) {  
            return sendError(req, res)
        } else {
            return send(req, res, filePath, stat)
        }
    })
}).listen(8080)

function send(req, res, filePath, stat) {
    res.setHeader('Content-Type', mime.getType(filePath))
    // 设置缓存时间为10s
    res.setHeader('Cache-Control', 'max-age=10')
    // expires指定过期时间，1.1不用改字段，但是为了兼容，一般和Cache-Control都设置上
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    fs.createReadStream(filePath).pipe(res)
}

function sendError(req, res) {
    res.statusCode = 500;
    res.end(`there is something wrong!`)
}