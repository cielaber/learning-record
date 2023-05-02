const connect = require('connect')
const { log } = require('console')
const serverStaticMiddleware = require('./middlewares/static')
const resolveConfig = require('../config')
const { createOptimizeDepsRun } = require('../optimizer')

async function createServer() {
    const config = resolveConfig()
    const middlewares = connect()
    const server = {
        async linsten(port) {
            await runOptimize(config, server)
            require('http').createServer(middlewares).listen(port, () => {
                log(`dev server running at: http://localhost:${port}`)
            })
        }
    }
    middlewares.use(serverStaticMiddleware(config))
    return server;
}

async function runOptimize(config, server) {
    await createOptimizeDepsRun(config)
}

exports.createServer = createServer;