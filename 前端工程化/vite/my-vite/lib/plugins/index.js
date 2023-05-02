const resolvePlugin = require('./resolve')
const importAnalysisPlugin = require('./importAnalysis')
const preAliasPlugin = require('./preAlias')

function resolvePlugins(config) {
    return [
        preAliasPlugin(config),
        resolvePlugin(config),
        importAnalysisPlugin(config)
    ]
}

exports.resolvePlugins = resolvePlugins