// 简单模拟parser方法解析http的请求对象

let fs = require('fs')
let path = require('path')
let { StringDecoder } = require('string_decoder')

// 将buffer转成字符时可以防止乱码
let decoder = new StringDecoder()

function parser(requestStream, requestListener) {
    function onReadable() {
        let buf;
        let buffers = [];
        while(null != (buf = requestStream.read())) {
            buffers.push(buf)
            let result = Buffer.concat(buffers).toString()
            let str = decoder.write(result);
            if (str.match(/\n\n/)) { // 存在连接的换行符，代表请求头和请求体的分割处
                let values = result.split(/\n\n/);
                let headers = values.shift();
                let headerObj = parserHeader(headers)
                Object.assign(requestStream, headerObj)
                let body = values.join('\n\n')
                requestStream.removeListener('readable', onReadable)
                // unshift 把请求体返回给requestStream
                requestStream.unshift(Buffer.from(body))
                return requestListener(requestStream)
            }
        }
    }
    requestStream.on('readable', onReadable);
}

function parserHeader(headerStr) {
    let lines = headerStr.split(/\n/);
    let startLine = lines.shift();
    let starts = startLine.split(' ');
    let method = starts[0];
    let url = starts[1];
    let protcol = starts[2];
    let protcolName = protcol.split('/')[0];
    let protcolVerion = protcol.split('/')[1]
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1]
    })

    return { headers, method, url, protcolName, protcolVerion }
}

// 模拟tcp请求产生的socket
let rs = fs.createReadStream(path.join(__dirname, 'req.txt'));
parser(rs, (req) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    req.on('data', (data) => {
        console.log(data.toString());
    })
    req.on('end', () => {
        console.log('请求处理结束，开始响应。');
    })
})