
let config = require('./config')
let http = require('http')
let chalk = require('chalk')
let path = require('path')
let url = require('url')
let fs = require('fs')
let util = require('util')
let mime = require('mime')
let handlebars = require('handlebars')

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
        res.setHeader('Content-Type', mime.getType(filePath))
        fs.createReadStream(filePath).pipe(res)
    }
}

// let server = new Server()
// server.start()

module.exports = Server