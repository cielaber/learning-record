process.on('uncaughtException', (e) => {
    console.log('程序产生了一个错误', e);
})

setTimeout(() => {
    error()
}, 3000)