
import { ShapeFlags } from "@vue/shared"
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component"

// 创建一个渲染器
export function createRenderer(rendererOptions) {
    const setupRenderEffect = () => {}
    
    const mountComponent = (initialVNode, container) => {
      // 组件的渲染流程最核心的就是调用setup拿到返回值，获取render函数的返回结果进行渲染

      // 1.先有实例
    const instance = (initialVNode.component = createComponentInstance(initialVNode))
    
    // 2.需要的数据解析到实例上
    setupComponent(instance)

    // 3.创建一个effect 数据变动让render函数执行
    setupRenderEffect();
}

    const processComponent = (n1, n2, container) => {
        if(n1 == null) { // 组件没有上一次的虚拟节点
            mountComponent(n2, container)
        } else { // 组件更新

        }
    }

    const patch = (n1, n2, container) => {
        // 针对不同类型做初始化操作
        const { shapeFlag } = n2
        if(shapeFlag & ShapeFlags.ELEMENT) {
            console.log('元素')
        } else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            console.log('组件')
            processComponent(n1, n2, container)
        }
    }

    const render = (vnode, container) => {
        // runtime-core的核心 根据不同的虚拟节点，创建对应的真实元素
        // 默认是调用render
        patch(null, vnode, container)
    }

    return {
        createApp: createAppAPI(render)
    }
}