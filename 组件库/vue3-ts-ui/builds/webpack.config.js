const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../packages/my-ui/index.ts'),
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: 'index.js',
        libraryTarget: 'umd', // umd支持commonjs和amd，但不支持es6，可以直接在浏览器中使用
        library: 'my-ui'
    },
    externals: {
        vue: { // 不打包vue
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue'
        }
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
            // 使用@babel/preset-typescript和@babel/plugin-transform-typescript搭配也能达到单独配置ts-loader的效果
            // {
            //     test: /\.(ts)x?$/, // 解析ts、tsx
            //     exclude: /node_modules/, // 不解析node_modules中第三方模块
            //     loader: 'ts-loader', // 以使用ts-loader解析ts、tsx
            //     options: {
            //         // 指定特定的ts编译配置
            //         configFile: path.resolve(__dirname, '../tsconfig.json'),
            //         // vue 单文件组件中假如使用了lang="ts"，ts-loader需要配置appendTsSuffixTo: [/\.vue$/]，用来给.vue文件添加个.ts后缀用于编译，否则会报错：Can't resolve './App.vue'。
            //         appendTsSuffixTo: [/\.vue$/],
            //     }
            // },
            {
                test: /\.vue$/, // 使用vue-loader解析vue
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}