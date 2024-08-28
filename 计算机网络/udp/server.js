const dgram = require('dgram')

const socket = dgram.createSocket('udp4')

socket.on('message', (message, remoteInfo) => {
    console.log(message.toString())
    console.log(remoteInfo)

    // 将客户端发送的消息发回给对方
    socket.send(message, 0, message.length, remoteInfo.port, remoteInfo.address)
})

socket.bind(41234, 'localhost')