const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const path = require('path')
const { getPackagesSync } = require('@lerna/project')
const vue = require('rollup-plugin-vue')

// 获取所有包的名字，以@my-ui开头的
const inputs = getPackagesSync().map(pck => pck.name).filter(name => name.includes('@my-ui'))

module.exports = inputs.map(name => {
    const pckName = name.split('@my-ui')[1];
    return {
        input: path.resolve(__dirname, `../packages/${pckName}/index.ts`),
        output: {
            format: 'es',
            file: `lib/${pckName}/index.js`,
        },
        plugins: [
            nodeResolve(),
            vue({
                target: 'browser'
            }),
            typescript({ // 默认调用ts.config.json
                tsconfigOverride: {
                    compilerOptions: { // 打包单个组件的时候不生成d.ts文件，全量打包成esm的时候已经生成了各个组件的d.ts文件
                        declaration: false,
                    },
                    exclude: [ // 忽略编译
                        'node_modules',
                    ]
                }
            })
        ],
        external(id) { // 打包排除vue，和自己组件库内的包(因为如果组件引用的另一个组件，这种情况不需要打包另一个组件，而是提示需要引入另一个组件。全量打包中不需要考虑这个，因为重复组件会被覆盖。)
            return /^vue/.test(id) || /^@my-ui/.test(id)
        }
    }
})
