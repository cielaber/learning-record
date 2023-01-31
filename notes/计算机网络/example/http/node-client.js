// node作为http客户端

let http = require('http');
let options = {
    host: 'localhost',
    port: 8080,
    method: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        // "Content-Type": "application/json"
    }
}

// 这个时候请求并没有真正发出，req也是一个流对象，是一个可写流
let req = http.request(options);
// 向请求体写入数据
// req.write('name=aa');
req.write('{ "age": 18, "name": "aa" }');
// 结束写入，这个时候才会真正向服务器请求
req.end()

// 获取服务器的响应
req.on('response', ( res) => {
    // console.log(res);
    console.log(res.headers);
    console.log(res.statusCode);

    // 获取响应的数据
    let result = [];
    res.on('data', (data) => {
        result.push(data)
    })
    res.on('end', (data) => {
        let str = Buffer.concat(result);
        console.log(str.toString());
    })
})
