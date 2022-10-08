// runtime-dom的核心就是提供了domAPI方法
// 操作节点：节点的增删改查
// 属性操作：样式、类、事件等属性的增删改

import { createRenderer } from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { node } from 'execa'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProps'

const rendererOptions = extend({ patchProp }, nodeOps)

// vue中runtime-core提供核心的渲染方法，它会使用runtime-dom中的api进行渲染
// runtime-dom主要提供对平台（浏览器）的兼容

export function createApp(rootComponent, rootProps = null) {
    const app = createRenderer(rendererOptions).createApp(rootComponent, rootProps)

    let { mount } = app

    app.mount = function (contianer) {
        // 清空app容器内原有的内容
        contianer = nodeOps.querySelector(contianer)
        contianer.innerHTML = ''

        // 将组件渲染成dom 进行挂载
        mount(contianer)
    }

    return app;
}

export * from '@vue/runtime-core';