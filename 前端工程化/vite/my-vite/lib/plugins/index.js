const resolvePlugin = require('./resolve')
const importAnalysisPlugin = require('./importAnalysis')
const preAliasPlugin = require('./preAlias')

async function resolvePlugins(config, userPlugins) {
    return [
        preAliasPlugin(config),
        resolvePlugin(config),
        ...userPlugins,
        importAnalysisPlugin(config),
    ]
}

exports.resolvePlugins = resolvePlugins