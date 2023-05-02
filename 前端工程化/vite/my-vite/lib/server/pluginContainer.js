const { normalizePath } = require("../utils");
const path = require('path')

async function createPluginContainer({ root, plugins }) {
    class PluginContext {
        async resolve(importee, importer = path.join(root, 'index.html')) {
            return await container.resolveId(importee, importer)
        }
    }
    const container  = {
        async resolveId(importee, importer) {
            let ctx = new PluginContext()
            let resolveId = importee;
            for(const plugin of plugins) {
                if (!plugin.resolveId) {
                    continue
                }

                const result = await plugin.resolveId.call(ctx, importee, importer)
                if (result) {
                    resolveId = result.id || result
                    break; // 只要有一个插件返回了resolveId，就返回
                }
            }

            return {
                id: normalizePath(resolveId)
            }
        }
    }

    return container;
}

exports.createPluginContainer = createPluginContainer