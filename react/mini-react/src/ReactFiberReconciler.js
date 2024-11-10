import { createFiber } from "./ReactFiber"
import { isArray, isStringOrNumber, updateNode } from "./utils"

export function updateHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        updateNode(wip.stateNode, wip.props)
    }
    reconcileChildren(wip, wip.props.children)
}

export function updateFunctionComponent(wip) {
    const { type, props } = wip
    const children = type(props)
    reconcileChildren(wip, children)
}

export function updateClassComponent(wip) {
    const { type, props } = wip
    console.log(type, props)
    const instance = new type(props)
    const children = instance.render()
    reconcileChildren(wip, children)
}

export function updateFragmentComponent() {

}

export function updateHostTextComponent() {

}


function reconcileChildren(wip, children) {
    // 文本或者数字则不对比
    if (isStringOrNumber(children)) {
        return
    }

    const newChildren = isArray(children) ? children : [children]

    // 记录上一个节点，形成链表结构
    let previousNewFiber = null

    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        if (newChild === null) {
            continue;
        }

        const newFiber = createFiber(newChild, wip)

        if (previousNewFiber === null) {
            wip.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }
}