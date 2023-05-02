const { resolvePlugins } = require('./plugins')
const { normalizePath } = require('./utils')
const path = require('path')

function resolveConfig() {
    const root = normalizePath(process.cwd())
    // 缓存目录，存放预编译后的文件和metadata.json
    const cacheDir = normalizePath(path.resolve(`node_modules/.my-vite`))
    let config = { 
        root,
        cacheDir,
    }
    const plugins = resolvePlugins(config)
    config.plugins = plugins
    return config
}

module.exports = resolveConfig