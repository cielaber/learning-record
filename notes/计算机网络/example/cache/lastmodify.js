/**
 * 对比缓存 Last-Modified
 * 第一次访问客户端的时候，服务器返回资源和缓存的规则，客户端会把此资源缓存在本地的缓存数据库。
 * 第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器资源是否需要更新。
 */

let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
let mime = require('mime')

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    let filePath = path.join(__dirname, pathname);
    fs.stat(filePath, (err, stat) => {
        if (err) {
            return sendError(req, res)
        } else {
            // 文件的最后修改时间和上次发给客户端的时间(Last-Modified)做对比
            let ifModifiedSince = req.headers['if-modified-since'];
            let lastModified = stat.ctime.toGMTString();
            if (ifModifiedSince == lastModified) { // 如果相等，直接返回304状态码，客户端直接从缓存取
                res.writeHead(304);
                res.end('')
            } else {
                return send(req, res, filePath, stat)
            }
        }
    })
}).listen(8080)

function send(req, res, filePath, stat) {
    res.setHeader('Content-Type', mime.getType(filePath))
    // 该请求头发送给客户端之后，客户端会把此时间保存起来，下次再获取此资源的时候会把这个时间再发给服务器
    res.setHeader('Last-Modified', stat.ctime.toGMTString())
    fs.createReadStream(filePath).pipe(res)
}

function sendError(req, res) {
    res.statusCode = 500;
    res.end(`there is something wrong!`)
}