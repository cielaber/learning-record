// rollup配置

import path from 'path'
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import resolvePlugin from '@rollup/plugin-node-resolve'

// 根据环境变量中的target属性获取对应模块中的package.json
console.log('process.env.TARGET', process.env.TARGET)

const packagesDir = path.resolve(__dirname, 'packages')

console.log('packagesDir', packagesDir)

// 需要打包的目录
const packageDir = path.resolve(packagesDir, process.env.TARGET)

console.log('packageDir', packageDir)

// 永远针对的是某个模块
const resolve = (p) => path.resolve(packageDir, p)

const pkg = require(resolve('package.json'))

console.log('pkg', pkg)

// 取packages目录下的包的目录名
const name = path.basename(packageDir)

console.log('name', name)

// 对打包类型做一个映射表，根据package.json提供的fromats来格式化需要打包的内容
const outputConfig = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    'global': {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife'
    }
}

// 在package.json中定义的buildOptions
const options = pkg.buildOptions;

console.log('options', options)

function createConfig(fromat, output) {
    output.name = options.name // 使用package.json中的buildOptions.name
    output.sourcemap = true; // 生成sourcemap

    // 生成rollup配置
    return {
        input: resolve('src/index.ts'),
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin(), // 解析第三方模块
        ]
    }
}

// rollup最终需要导出配置
export default options.formats.map(format => {
    console.log('format', format)
    return createConfig(format, outputConfig[format])
})