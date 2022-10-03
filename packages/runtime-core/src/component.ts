import { ShapeFlags } from "@vue/shared"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
    const instance = { // 组件实例
        vnode,
        ctx: {},
        type: vnode.type,
        props: {},
        attrs: {},
        slots: {},
        data: {},
        setupState: {}, // 如果setup返回一个对象，这个对象会作为setupState
        render: null,
        isMounted: false, // 表示这个组件是否挂载过
    }

    instance.ctx = { _: instance }

    return instance
}

export function setupComponent(instance) {
    const { props, children } = instance.vnode

    // 根据props 解析出props和attrs，将其放到instance上

    instance.props = props
    instance.children = children

    // 需要先看一下当前的组件是不是有状态的组件
    let isStateful = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
    if (isStateful) { // 表示现在是一个带状态的组件
        // 调用当前实例的setup方法，用返回值填充setupState和对应的render方法

        setupStatefulComponent(instance)

    }
}

function setupStatefulComponent(instance) {
    // 1.代理 传递给render函数的参数
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)

    // 2.获取组件的类型 拿到组件的setup并调用
    let Component = instance.type
    let { setup } = Component
    let setupContext = createSetupContext(instance)

    setup(instance.props, setupContext)

    Component.render(instance.proxy)
}

function createSetupContext(instance) {
    return {
        attrs: instance.attrs,
        slots: instance.slots,
        emit: () => { },
        expose: () => { },
    }
}

// instance 表示组件的实例，组件的各种个样的状态，组件的相关信息
// context就4个参数，为了开发时使用
// proxy 主要为了在render中取值方便