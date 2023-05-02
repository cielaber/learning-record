const { normalizePath } = require('./utils')

function resolveConfig() {
    const root = normalizePath(process.cwd())
    let config = { 
        root
    }
    return config
}

module.exports = resolveConfig