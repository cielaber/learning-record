/**
 * 对比缓存 Etag
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
    fs.stat(filePath, (err, stat) => {
        if (err) {  
            return sendError(req, res)
        } else {
            let ifNoneMatch = req.headers['if-none-match'];
            
            fs.readFile(filePath, (err, content) => {
                let etag = crypto.createHash('md5').update(content).digest('hex')
                if (ifNoneMatch == etag) {
                    res.writeHead(304);
                    res.end('')
                } else {
                    return send(req, res, filePath, stat)
                }
            })

            // 文件过大时，使用流
            // let out = fs.createReadStream(filePath);
            // let etag = crypto.createHash('md5')
            // out.on('data', (data) => {
            //     etag.update(data)
            // })
            // out.on('end', () => {
            //     etag.digest('hex')
            //     if (ifNoneMatch == etag) {
            //         res.writeHead(304);
            //         res.end('')
            //     } else {
            //         return send(req, res, filePath, stat)
            //     }
            // })
        }
    })
}).listen(8080)

function send(req, res, filePath, stat) {
    res.setHeader('Content-Type', mime.getType(filePath))
    // 将资源生成一个摘要返回给客户端
    fs.readFile(filePath, (err, content) => {
        res.setHeader('Etag', crypto.createHash('md5').update(content).digest('hex'))
        fs.createReadStream(filePath).pipe(res)
    })
}

function sendError(req, res) {
    res.statusCode = 500;
    res.end(`there is something wrong!`)
}