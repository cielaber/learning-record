const scanImports = require('./scan')

async function createOptimizeDepsRun(config){
    // 分析依赖，找出项目中依赖了哪些第三方模块
    const deps = await scanImports(config)
    console.log(deps);
}

exports.createOptimizeDepsRun = createOptimizeDepsRun