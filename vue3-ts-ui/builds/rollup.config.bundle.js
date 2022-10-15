const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const path = require('path')
const vue = require('rollup-plugin-vue')

module.exports = {
    input: path.resolve(__dirname, '../packages/my-ui/index.ts'),
    output: {
        format: 'es',
        file: 'lib/index.esm.js',
    },
    plugins: [
        nodeResolve(),
        vue({
            target: 'browser'
        }),
        typescript({ // 默认调用ts.config.json，会对每个ts文件生成d.ts文件
            tsconfigOverride: {
                exclude: [ // 忽略编译
                    'node_modules',
                    'website',
                ]
            }
        })
    ],
    external(id) { // 打包排除vue 
        return /^vue/.test(id)
    }
}
