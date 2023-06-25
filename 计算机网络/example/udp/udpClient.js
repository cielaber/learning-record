let dgram = require('dgram')
let socket = dgram.createSocket('udp4')

let buf = Buffer.from('一段消息')

socket.send(buf, 3, 6, 41234, 'localhost', (arg) => {
    console.log(arg);
})

socket.on('message', (message, info) => {
    console.log(message.toString());
})