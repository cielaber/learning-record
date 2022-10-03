
import { effect } from "@vue/reactivity"
import { isObject, ShapeFlags } from "@vue/shared"
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component"
import { queueJob } from "./scheduler"
import { createVNode, normalizeVNode, Text } from "./vnode"

// 创建一个渲染器
export function createRenderer(rendererOptions) {
    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        // setScopeId: hostSetScopeId = NOOP,
        cloneNode: hostCloneNode,
        insertStaticContent: hostInsertStaticContent
    } = rendererOptions

    /*-----------------------------处理组件-----------------------------*/
    const setupRenderEffect = (instance, container) => {
        // 需要创建一个effect 在effect中调用render方法 这样render方法中拿到的数据会收集这个effect，数据更新时effect会重新执行
        instance.update = effect(function componentEffect() { // 每个组件都有一个effect vue3是组件级更新，数据变化会重新执行对应组件的effect
            if (!instance.isMounted) {// 初次渲染
                let proxyToUse = instance.proxy

                let subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse)

                // 用render函数的返回值继续渲染
                patch(null, subTree, container)

                instance.isMounted = true
            } else { //更新
                console.log('更新了')
            }
        }, {
            scheduler: queueJob // 保证多次相同的修改只执行一次更新
        })
    }

    const mountComponent = (initialVNode, container) => {
        // 组件的渲染流程最核心的就是调用setup拿到返回值，获取render函数的返回结果进行渲染

        // 1.先有实例
        const instance = (initialVNode.component = createComponentInstance(initialVNode))

        // 2.需要的数据解析到实例上
        setupComponent(instance) // state props sttrs render ...

        // 3.创建一个effect 数据变动让render函数执行
        setupRenderEffect(instance, container);
    }

    const processComponent = (n1, n2, container) => {
        if (n1 == null) { // 组件没有上一次的虚拟节点
            mountComponent(n2, container)
        } else { // 组件更新

        }
    }

    /*-----------------------------处理组件-----------------------------*/

    /*-----------------------------处理元素-----------------------------*/
    const mountChildren = (children, container) => {
        for (let i = 0; i < children.length; i++) {
            let child = normalizeVNode(children[i])
            patch(null, child, container)
        }
    }
    const mountElement = (vnode, container) => {
        // 递归渲染
        const { props, shapeFlag, type, children } = vnode
        let el = (vnode.el = hostCreateElement(type))

        if (props) {
            for (const key in props) {
                hostPatchProp(el, key, null, props[key])
            }
        }
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children)
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(children, el)
        }

        hostInsert(el, container)
    }

    const processElement = (n1, n2, container) => {
        if (n1 == null) {
            mountElement(n2, container)
        } else {
            // 元素更新
        }
    }

    const processText = (n1, n2, container) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateText(n2.children)), container)
        }
    }
    /*-----------------------------处理元素-----------------------------*/

    const patch = (n1, n2, container) => {
        // 针对不同类型做初始化操作
        const { shapeFlag, type } = n2

        switch (type) {
            case Text:
                processText(n1, n2, container)
                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    console.log('元素')
                    processElement(n1, n2, container)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    console.log('组件')
                    processComponent(n1, n2, container)
                }
                break;
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
