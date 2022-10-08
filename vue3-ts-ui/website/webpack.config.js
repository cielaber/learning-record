const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'main.ts'),
    output: {
        path: path.resolve(__dirname, '../website-dist'),
        filename: 'bundle.js'
    },
    resolve: { // 导入模块支持的对应的拓展名有哪些
        extensions: ['.ts', '.tsx', '.js', '.vue']
    },
    module: { // 解析模块的规则
        rules: [
            {
                test: /\.(ts|js)x?$/, // 解析js、ts、jsx、tsx
                exclude: /node_modules/, // 不解析node_modules中第三方模块
                use: 'babel-loader', //以上格式文件使用Babel解析
            },
            {
                test: /\.vue$/, // 使用vue-loader解析vue
                loader: 'vue-loader'
            },
            {
                test: /\.(svg|otf|woff|woff2|eot|gif|png)$/, // 解析图片文件
                loader: 'url-loader'
            },
            {
                test: /\.(sass|scss|css)/, // 解析css
                // loader有三种写法：{},[],""，使用数组时使用use
                use: [ // 执行顺序按数组倒序 
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template.html')
        })
    ]
}