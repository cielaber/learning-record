
let config = require('./config')
let http = require('http')
let chalk = require('chalk')
let path = require('path')
let url = require('url')
let fs = require('fs')
let util = require('util')
let mime = require('mime')
let handlebars = require('handlebars')
let zlib = require('zlib')

/**
 * debug可用于模块化输出
 * static:app(命名约定=>模块名:文件名)是该模块的debug的命名空间
 * 当要输出该模块的debug时，命令行设置DEBUG环境变量，win设置方法：set DEBUG=static:app，mac和Linux设置方法：export DEBUG=static:app，如果需要同时输出所有模块，则设置为export DEBUG=*
 */
// 通过代码设置DEBUG环境变量
process.env.DEBUG = 'static:*'
let debug = require('debug')('static:app')

let stat = util.promisify(fs.stat)
let readdir = util.promisify(fs.readdir)

// 编译模版，得到一个渲染的方法，然后传入实际数据就可以得到渲染后的HTML
function list() {
    let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf-8')
    return handlebars.compile(tmpl)
}

class Server {
    constructor(argv) {
        this.list = list();
        this.config = Object.assign({}, this.config, argv);
    }
    start () {
        let server = http.createServer();
        server.on('request', this.request.bind(this))
        server.listen(config.port, () => {
            let url =`http://${config.host}:${config.port}`
            debug(`server start at ${chalk.green(url)}`);
        })
    }

    async request(req, res) {
        // 先取到客户端想访问的文件路径
        let { pathname } = url.parse(req.url)
        if (pathname === '/favicon.ico') return this.sendError(req, res)
        let filePath = path.join(config.root, pathname)
        try {
            let statObj = await stat(filePath);
            if (statObj.isDirectory()) {
               let files = await readdir(filePath)
               files = files.map(file => ({
                    name: file,
                    url: path.join(pathname, file)
               }))
               let html = this.list({
                    title: pathname,
                    files,
               })
               res.setHeader("Content-Type", 'text/html');
               res.end(html)

            } else {
                this.sendFile(req, res, filePath, statObj)
            }
        } catch (error) {
            debug(util.inspect(error)) // inspect把一个对象转成字符串
            this.sendError(req, res)
        }
    }

    sendError(req, res) {
        res.statusCode = 500;
        res.end(`there is something wrong!`)
    }

    sendFile(req, res, filePath, statObj) {
        if (this.handleCache(req, res, filePath, statObj)) return; // 如果走缓存，直接返回
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
        let encoding = this.getEncoding(req, res)
        if (encoding) {
            fs.createReadStream(filePath).pipe(encoding).pipe(res)
        } else {
            fs.createReadStream(filePath).pipe(res)
        }
    }

    // 根据不同的压缩类型返回不同的压缩流
    getEncoding(req, res) {
        let acceptEncoding = req.headers['accept-encoding']
        if (/\bgzip\b/.test(acceptEncoding)) {
            res.setHeader('Content-Encoding', 'gzip')
            return zlib.createGzip()
        } else if (/\bdeflate\b/.test(acceptEncoding)) {
            res.setHeader('Content-Encoding', 'deflate')
            return zlib.createDeflate()
        } else {
            return null;
        }
    }

    handleCache(req, res, filePath, statObj) {
        let ifModifiedSince = req.headers['if-modified-since']
        let isNoneMatch = req.headers['if-none-match']

        res.setHeader('Cache-Control', 'private,max-age=30')
        res.setHeader('Expires', new Date(Date.now() + 1000 * 30).toGMTString())
        
        let etag = statObj.size
        let lastModified = statObj.ctime.toGMTString()

        res.setHeader('ETag', etag)
        res.setHeader('Last-Modified', lastModified)

        if (isNoneMatch && isNoneMatch != etag) return false;
        if (ifModifiedSince && ifModifiedSince != lastModified) return false;
        if (isNoneMatch || ifModifiedSince) {
            res.writeHead(304);
            res.end()
            return true;
        }
        return false;
    }
}

// let server = new Server()
// server.start()

module.exports = Server