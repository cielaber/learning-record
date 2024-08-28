const dgram = require('dgram')

const socket = dgram.createSocket('udp4')

// 监听服务方发送的消息
socket.on('message', (message, remoteInfo) => {
    console.log(message.toString())
    console.log(remoteInfo)
})

const message = 'hello'

// 向服务方发送一个消息
socket.send(Buffer(message), 0, message.length, 41234, 'localhost', (error, bytes) => {
    console.log('向服务端发送了%d字节', bytes)
})
