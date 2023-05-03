const fs = require('fs')
const { parse, compileScript, compileStyle, compileTemplate, rewriteDefault } = require('vue/compiler-sfc')

function vue() {
    return {
        name: 'vue',
        // 此插件的核心功能是把App.vue的原始内容编译成js内容返回
        async transform(code, id) {
            const { filename } = parseVueRequest(id)
            if (filename.endsWith('.vue')) {
                let result = await transformMain(code, filename)
                return result
            }
            return null
        }
    }
}

async function transformMain(source, filename) {
    const descriptor = await getDescriptor(filename)
    const scriptCode = getScriptCode(descriptor, filename)
    const templateCode = genTempalteCode(descriptor, filename)
    let resolveCode = [
        templateCode,
        scriptCode,
        `_sfc_main.render=render`,
        `export default _sfc_main`
    ].join('\n')

    return {
        code: resolveCode
    }
}

function genTempalteCode(descriptor, filename) {
    const content = descriptor.template.content
    const result = compileTemplate({ source: content, id: filename })
    return result.code
}

function getScriptCode(descriptor, filename) {
    let scriptCode = ''
    let script = compileScript(descriptor, filename)
    scriptCode = rewriteDefault(script.content, '_sfc_main')
    return scriptCode
}

async function getDescriptor(filename) {
    const content = await fs.promises.readFile(filename, 'utf-8')
    const result = parse(content, { filename })
    let descriptor = result.descriptor
    return descriptor
}

module.exports = vue

function parseVueRequest(id) {
    const [filename, querystring = ''] = id.split('?')
    let query = new URLSearchParams(querystring)

    return {
        filename, query
    }
}