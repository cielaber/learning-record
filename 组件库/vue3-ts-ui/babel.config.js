module.exports = {
    presets: [ // babel解析的预设，其执行顺序与数组顺序相反
        "@babel/preset-env",
        "@babel/preset-typescript" // 先处理ts
    ],
    overrides: [{
        test: /\.vue$/, // 处理vue文件中的ts
        plugins: [
            '@babel/plugin-transform-typescript'
        ]
    }]
}