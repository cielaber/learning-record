// 写一个插件，使在项目中能够使用名为env的虚拟模块获得环境变量
const envPlugin = {
    name: 'env',
    setup(build) {
        // 拦截名为env的导入路径，并自定义命名空间，以使esbuild不把它们映射到文件系统中
        build.onResolve({ filter: /^env$/ }, args => {
            return {
                path: args.path, // 代表模块的路径
                namespace: 'env-ns' // 指定env模块不属于file命名空间，也就是说该模块不对应文件系统中的文件，而是一个虚拟模块
            }
        });
        build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => {
            return {
                contents: JSON.stringify(process.env), // 用于指定模块的内容，如果指定了这一项，就不走后面的逻辑
                loader: 'json' // 用json这个load处理这个内容
            }
        })
    }
}

require('esbuild').build({
    entryPoints: ['main.js'], // 入口文件
    bundle: true,
    plugins: [envPlugin], // 使用插件
    outfile: 'out.js' // 目标文件
})