// 打包当前开发的包

const fs = require('fs');
const execa = require('execa')

const target = 'reactivity'

async function bulid(target) {
    console.log('bulid.target', target)
    /**
     * 开启子进程进行打包，最终还是使用rollup来进行打包
     * rollup -c : 使用rollup配置文件 
     * -w : 监控文件变化后进行打包
     * --environment `TARGET:${target}` 将包目录地址${target}写入环境变量TARGET中
     */
    await execa(
        'rollup',
        ['-cw', '--environment', `TARGET:${target}`],
        { stdio: 'inherit' } // 将子进程打包的信息共享给父进程
    );
}

bulid(target)
