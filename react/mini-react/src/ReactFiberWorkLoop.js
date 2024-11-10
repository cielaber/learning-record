import { updateClassComponent, updateFragmentComponent, updateFunctionComponent, updateHostComponent, updateHostTextComponent } from "./ReactFiberReconciler";
import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTags"
import { Placement } from "./utils";

let wip = null // work in progress 当前正在执行的fiber
let wipRoot = null

// 初次渲染和更新
export function scheduleUpdateOnFiber(fiber) {
    wip = fiber;
    wipRoot = fiber
}

function performUnitWork() {
    const { tag } = wip
    console.log('-', tag)
    // TODO: 更新当前组件
    switch (tag) {
        case HostComponent:
            updateHostComponent(wip)
            break;
        case FunctionComponent:
            updateFunctionComponent(wip)
            break;
        case ClassComponent:
            updateClassComponent(wip)
            break;
        case Fragment:
            updateFragmentComponent(wip)
            break;
        case HostText:
            updateHostTextComponent(wip)
            break;
        case HostComponent:
            updateHostComponent(wip)
            break;
        default:
            break;
    }

    // TODO: 更新下一个组件
    if (wip.child) {
        wip = wip.child
        return
    }

    let next = wip

    while (next) {
        if (next.sibling) {
            wip = next.sibling
            console.log('wip', wip)
            return
        }
        next = next.sibling
    }

    wip = null
}

function workLoop(IdleDeadLine) {
    console.log('wip--', wip)
    while (wip && IdleDeadLine.timeRemaining() > 0) {
        performUnitWork()
    }

    if (!wip && wipRoot) {
        commitRoot()
    }
}

requestIdleCallback(workLoop)

function commitRoot() {
    commitWorker(wipRoot)
    wipRoot = null
}

function commitWorker(wip) {
    if (!wip) {
        return
    }

    const parentNode = getParentNode(wip.return)
    const { flags, stateNode } = wip
    if (flags & Placement && stateNode) {
        parentNode.appendChild(stateNode)
    }

    // 提交子节点
    commitWorker(wip.child)
    // 提交兄弟节点
    commitWorker(wip.sibling)
}

function getParentNode(wip) {
    let tem = wip
    while (tem) {
        if (tem.stateNode) {
            return tem.stateNode
        }
        tem = tem.return
    }
}