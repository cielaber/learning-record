/**
 * http基于tcp
 * req和res都是从socket(流对象)来的，先监听socket的data事件，然后等事件发生的时候进行解析data，解析出请求对象再根据请求对象创建响应对象
 */


let http = require('http')
let querystring = require('querystring')
let server = http.createServer()

server.on('connection', () => {
    console.log('客户端连接');
})

server.on('request', (req, res) => {
    // console.log(req);
    console.log(req.url);
    console.log(req.method);

    // 获取请求体中的数据
    let result = []
    req.on('data', (data) => {
        result.push(data)
    })
    req.on('end', () => {
        let str = Buffer.concat(result).toString();

        // 根据不同的content-type解析请求体
        let contentType = req.headers['content-type']
        let body;
        if (contentType === 'application/x-www-form-urlencoded') {
            body = querystring.parse(str)
        } else if (contentType === 'application/json') {
            body = JSON.parse(str)
        } else {
            body = querystring.parse(str)
        }
        console.log(body);
        res.end(JSON.stringify(body))
    })
})

server.on('close', () => {
    console.log('服务器关闭');
})

server.on('error', (err) => {
    console.log('服务器错误');
})

server.listen(8080, () => {
    console.log('sever sarted at http://localhost:8080');
})