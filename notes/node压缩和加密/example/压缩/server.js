let http = require('http');
let path = require('path');
let url = require('url');
let fs = require('fs');
let { promisify } = require('util');
let mime = require('mime')
let zlib = require('zlib')

let stat = promisify(fs.stat)

http.createServer(async (req, res) => {
    let { pathname } = url.parse(req.url);
    let filepath = path.join(__dirname, pathname);
    try {
        let statObj = await stat(filepath);
        // 根据不同的文件内容返回不同的Content-Type
        res.setHeader('Content-Type', mime.getType(pathname))

        // 为了兼容不同的浏览器，node把所有的请求头全转成了小写
        let acceptEncoding = req.headers['accept-encoding'];

        if (acceptEncoding) {
            if (acceptEncoding.match(/\bgzip\b/)) {
                // 响应体返回对应的压缩方法
                res.setHeader('Content-Encoding', 'gzip')
                fs.createReadStream(filepath).pipe(zlib.createGzip().pipe(res))
            } else if (acceptEncoding.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate')
                fs.createReadStream(filepath).pipe(zlib.createDeflate().pipe(res))
            } else {
                fs.createReadStream(filepath).pipe(res);
            }
        } else { // 没有压缩
            fs.createReadStream(filepath).pipe(res);
        }
    } catch (error) {
        res.statusCode = 404;
        res.end();
    }
}).listen(8080)