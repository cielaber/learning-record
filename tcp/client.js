let net = require('net')

let socket = net.Socket()

socket.connect(8080, 'localhost')

// 监听连接成功之后往服务端发送数据
socket.on('connect', (data) => {
    socket.write('hello')
})

// 监听服务端发来的数据
socket.on('data', (data) => {
    console.log(data.toString())
})