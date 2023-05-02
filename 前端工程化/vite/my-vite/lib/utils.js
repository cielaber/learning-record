function normalizePath(id) {
    return id.replace(/\\/g, '/')
}

const knownJsSrcRE = /\.js/
const isJSRequest = (url) => {
    return knownJsSrcRE.test(url)
}

exports.normalizePath = normalizePath
exports.isJSRequest = isJSRequest