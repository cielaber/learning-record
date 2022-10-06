
import { effect } from "@vue/reactivity"
import { isObject, ShapeFlags } from "@vue/shared"
import { createAppAPI } from "./apiCreateApp"
import { invokeArrayFns } from "./apiLifeCycle"
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
                let { bm, m } = instance;
                if (bm) {
                    invokeArrayFns(bm)
                }

                let proxyToUse = instance.proxy

                let subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse)

                // 用render函数的返回值继续渲染
                patch(null, subTree, container)

                instance.isMounted = true

                if (m) { // mounted 要求必须在子组件完全处理完成后才会调用，这里没有考虑子组件的异步
                    invokeArrayFns(m)
                }
            } else { //更新
                let { bu, u } = instance
                if (bu) {
                    invokeArrayFns(bu)
                }

                const preTree = instance.subTree;
                let proxyToUse = instance.proxy
                const nextTree = instance.render.call(proxyToUse, proxyToUse)

                patch(preTree, nextTree, container)

                if (u) {
                    invokeArrayFns(u)
                }
            }
        }, {
            scheduler: queueJob // 保证多次修改只执行一次更新
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
    const mountElement = (vnode, container, anchor = null) => {
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

        hostInsert(el, container, anchor)
    }

    const patchProps = (oldProps, newProps, el) => {
        if (oldProps !== newProps) {
            for (let key in newProps) {
                const prev = oldProps[key]
                const next = newProps[key]

                if (prev !== next) {
                    hostPatchProp(el, key, prev, next)
                }
            }

            for (let key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProp(el, key, oldProps[key], null)
                }
            }
        }
    }

    const unmountChildren = (children) => {
        for (let i = 0; i < children.length; i++) {
            unmount(children[i])
        }
    }

    // 求出最长递增子序列 最终结果是索引
function getSequence(arr) {
    let len = arr.length
    const result = [0]
    const p = arr.slice(0) // 和原数组相同，用来存放索引
    let start, end, middle

    for (let i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            let resultlastIndex = result[result.length - 1];
            if (arr[resultlastIndex] < arrI) {
                p[i] = resultlastIndex // 标记当前前一个人对应的索引

                result.push(i)
                continue
            }

            // 二分查找 找到比当前值大的那一个，换掉它
            start = 0
            end = result.length - 1
            while (start < end) { // 重合了说明找到了对应的值
                middle = ((start + end) / 2) | 0
                if (arr[result[middle]] < arrI) {
                    start = middle + 1
                } else {
                    end = middle
                }
            }

            if (arrI < arr[result[start]]) {
                if (start > 0) {
                    p[i] = result[start - 1] // 要替换掉的前一个
                }

                result[start] = i
            }
        }
    }

    let len1 = result.length
    let last = result[len1 - 1]
    while (len1-- > 0) { // 根据前驱节点，向前查找
        result[len1] = last
        last = p[last]
    }

    return result
}

    const patchKeyedChildren = (c1, c2, el) => {
        let i = 0; // 默认从头开始比较
        let e1 = c1.length - 1
        let e2 = c2.length - 1
        // sync from start 从头开始比较 遇到一个不同的就停止了，尽可能减少比对的范围
        while (i <= e1 && i <= e2) {
            const n1 = c1[i]
            const n2 = c2[i]

            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, el)
            } else {
                break;
            }
            i++
        }

        // sync from end
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1]
            const n2 = c2[e2]

            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, el)
            } else {
                break;
            }
            e1--
            e2--
        }

        // common sequence + mount
        // 比较后 有一方已经比较完了

        // 如果完成后最终的i值大于e1 说明老的少

        if (i > e1) { // 有一方已经比对完成 老的少，新的多
            if (i <= e2) { // 表示有新增的部分
                // 想知道是向前插入还是向后插入
                const nextPos = e2 + 1
                const anchor = nextPos < c2.length ? c2[nextPos].el : null
                while (i <= e2) {
                    patch(null, c2[i], el, anchor)
                    i++
                }
            }
        } else if (i > e2) { // 有一方已经比对完成 老的多，新的少
            while (i <= e1) {
                unmount(c1[i])
                i++
            }
        } else {
            // 乱序比较，已存在的节点需要尽可能复用，用新的节点做成一个映射表(vue2用老的做映射表)取老的里找，一样的就复用，不一样的要么插入要么删除

            let s1 = i
            let s2 = i

            const keyToNewIndexMap = new Map()

            for (let i = s2; i <= e2 ; i++){
                const childVNode = c2[i]
                keyToNewIndexMap.set(childVNode.key, i)
            }

            const toBePatched = e2 - s2 + 1
            const newIndexToOldIndexMap = new Array(toBePatched).fill(0)

            // 拿老的key去新的里面找，看看有没有能复用的
            for (let i = s1; i <= e1; i++){
                const oldVnode = c1[i]
                let newIndex = keyToNewIndexMap.get(oldVnode.key)

                if(newIndex === undefined){ // 老的里不存在新的中，直接卸载
                    unmount(oldVnode)
                } else { // 新老比对，有差异

                    // 新旧之间的索引关系
                    newIndexToOldIndexMap[newIndex - s2] = i + 1

                    patch(oldVnode, c2[newIndex], el)
                }
            }

            let increasingNewIndexSequence = getSequence(newIndexToOldIndexMap)
            let j = increasingNewIndexSequence.length - 1 // 取出最后一个人的索引

            for (let i = toBePatched - 1; i >= 0; i--) {
                let currentIndex = i + s2;
                let child = c2[currentIndex]
                let anchor = currentIndex + 1 < c2.length ? c2[currentIndex + 1].el : null

                if(newIndexToOldIndexMap[i] == 0) { // 如果自己是0 说明没有被patch过
                    patch(null, child, el, anchor)
                } else {
                    // 这种操作需要将节点全部移动一遍，我们希望尽可能少的移动
                    if(i != increasingNewIndexSequence[j]) {
                        hostInsert(child.el, el, anchor)
                    } else {
                        j -- // 跳过不需要移动的元素，为了减少移动操作，所以需要最长递增子序列
                    }
                }
            }
        }
    }

    const patchChildren = (n1, n2, el) => {
        const c1 = n1.children
        const c2 = n2.children

        const prevShapeFlag = n1.shapeFlag
        const shapeFlag = n2.shapeFlag


        // 两个都是文本的情况
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            // 老的是n个子节点 但新的是文本
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                unmountChildren(c1) // 如果c1中包含组件会调用组件的销毁方法
            }

            // 两个都是文本，看两个是否一样，不一样则直接替换
            if (c2 !== c1) {
                hostSetElementText(el, c2)
            }
        } else {
            // 现在是数组(元素会包装成数组) 之前是文本或者数组
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {

                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    // 当前是数组 之前是数组
                    // 两个数组的对比 -> diff

                    patchKeyedChildren(c1, c2, el)

                } else { // 现在没有孩子，当前是null
                    unmountChildren(c1) // 删除之前的数组
                }

            } else {
                // 上一次是文本，清空文本
                if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                    hostSetElementText(el, '')
                }
                // 挂载当前的
                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    mountChildren(c2, el)
                }
            }
        }
    }

    const patchElement = (n1, n2, container) => {
        // 元素是相同节点
        let el = (n2.el = n1.el)

        // 更新属性 
        const oldProps = n1.props || {}
        const newProps = n2.props || {}

        patchProps(oldProps, newProps, el)

        // 更新子节点
        patchChildren(n1, n2, el)
    }

    const processElement = (n1, n2, container, anchor) => {
        if (n1 == null) {
            mountElement(n2, container, anchor)
        } else {
            // 元素更新
            patchElement(n1, n2, container)
        }
    }

    const processText = (n1, n2, container) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateText(n2.children)), container)
        }
    }

    const isSameVNodeType = (n1, n2) => {
        return n1.type === n2.type && n1.key === n2.key;
    }

    const unmount = (n1) => {
        hostRemove(n1.el)
    }
    /*-----------------------------处理元素-----------------------------*/

    const patch = (n1, n2, container, anchor = null) => {
        // 针对不同类型做初始化操作
        const { shapeFlag, type } = n2

        if (n1 && !isSameVNodeType(n1, n2)) { // 如果前后两个标签类型不同
            // 把以前的删掉，换成n2
            anchor = hostNextSibling(n1.el)
            unmount(n1)
            n1 = null; // 相当于重新渲染n2对应的内容
        }

        switch (type) {
            case Text:
                processText(n1, n2, container)
                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    console.log('元素')
                    processElement(n1, n2, container, anchor)
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
