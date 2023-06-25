let path = require('path')

module.exports = {
    host: 'localhost', // 配置监听的主机
    port: 8080, // 监听的端口
    root: process.cwd(),
    // root: path.resolve(__dirname, '../public/'),  // 静态文件根目录
}