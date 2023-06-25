let dgram = require('dgram')
let socket = dgram.createSocket('udp4')

socket.bind(41234, 'localhost');

socket.on('message', (message, info) => {
    console.log(message.toString());

    socket.send(Buffer.from(message), 0, message.length, info.port, info.address)


    // 广播
    // socket.setBroadcast(true)
    // socket.send(Buffer.from(message), 0, message.length, info.port, '192.168.0.255')
})