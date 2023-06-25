let net = require('net')

let server = net.createServer((socket) => {
    // 监听客户端发送过来的数据
    socket.on('data', (data) => {
        console.log(data.toString())
        // 收到客户端的数据之后立即将客户端发送来的数据写回给客户端
        socket.write(data)
    })
    // 监听客户端断开连接
    socket.on('end', (data) => {
        console.log('end')
    })
})

server.listen(8080, () => {
    console.log('server started at 8080 port!')
})
