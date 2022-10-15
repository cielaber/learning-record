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
            // 使用@babel/preset-typescript无法编译，因此换成ts-loader
            {
                test: /\.(ts)x?$/, // 解析ts、tsx
                exclude: /node_modules/, // 不解析node_modules中第三方模块
                loader: 'ts-loader', // 以使用ts-loader解析ts、tsx
                options: {
                    // 指定特定的ts编译配置
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
                    // vue 单文件组件中假如使用了lang="ts"，ts-loader需要配置appendTsSuffixTo: [/\.vue$/]，用来给.vue文件添加个.ts后缀用于编译，否则会报错：Can't resolve './App.vue'。
                    appendTsSuffixTo: [/\.vue$/],
                }
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
                test: /\.(sass|scss|css)$/, // 解析css
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