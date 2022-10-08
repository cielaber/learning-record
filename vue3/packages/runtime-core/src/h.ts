import { isArray, isObject } from "@vue/shared"
import { createVNode, isVnode } from "./vnode"

/**
 * h 函数支持多种写法
 * h('div', { a: 1 })
 * h('div', {}, 'hello world')
 * h('div', {}, h('span'))
 * h('div', h('span'))
 * h('div', [h('span'), h('span')])
 * h('div', null, h('span'), h('span'))
 * h('div', null, 'a', 'b')
 * @param type 
 * @param propsOrChildren 
 * @param children 
 * @returns 
 */

export function h(type, propsOrChildren, children) {
    const l = arguments.length

    // h函数中的子节点要么是字符串要么是数组

    if (l === 2) { // 类型+属性、类型+子节点
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
            if (isVnode(propsOrChildren)) {
                return createVNode(type, null, [propsOrChildren])
            }

            return createVNode(type, propsOrChildren)

        } else { // 如果第二个参数不是对象，那一定是子节点
            return createVNode(type, null, propsOrChildren)
        }
    } else {
        if (l > 3) {
            children = Array.prototype.slice.call(arguments, 2)
        } else if (l === 3 && isVnode(children)) {
            children = [children]
        }
        return createVNode(type, propsOrChildren, children)
    }
}