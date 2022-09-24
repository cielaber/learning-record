// 打包packages目录下的所有包

const fs = require('fs');
const execa = require('execa')

// 获取packages下的包
const targets = fs.readdirSync('packages')
    .filter(file => {
        // 过滤出packages下的目录
        if (!fs.statSync(`packages/${file}`).isDirectory()) return false;
        return true;
    })

console.log('targets', targets)

async function bulid(target) {
    console.log('bulid.target', target)
    /**
     * 开启子进程进行打包，最终还是使用rollup来进行打包
     * rollup -c : 使用rollup配置文件
     * --environment `TARGET:${target}` 将包目录地址${target}写入环境变量TARGET中
     */
    await execa(
        'rollup',
        ['-c', '--environment', `TARGET:${target}`],
        { stdio: 'inherit' } // 将子进程打包的信息共享给父进程
    );
}

function runParallel(targets, iteratorFn) {
    const res = []
    for (const item of targets) {
        const p = iteratorFn(item)
        res.push(p)
    }
    return Promise.all(res)
}

// 对目标进行依次打包，并行打包
runParallel(targets, bulid)
