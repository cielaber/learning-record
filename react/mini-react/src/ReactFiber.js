import { ClassComponent, FunctionComponent, HostComponent } from "./ReactWorkTags";
import { Placement, isFn, isStr } from "./utils";

export function createFiber(vnode, returnFiber) {
    const fiber = {
        /**
         * 类型
         */
        type: vnode.type,
        key: vnode.key,
        props: vnode.props,
        /**
         * 不同类型的组件，stateNode不同
         * 原生标签：dom节点
         * class组件：类实例
         */
        stateNode: null,

        /**
         * 第一个子节点
         */
        child: null,
        /**
         * 下一个兄弟节点
         */
        sibling: null,
        /**
         * 父节点
         */
        return: returnFiber,

        /**
         * 标记当前fiber干什么
         */
        flags: Placement,
        /**
         * 记录节在当前层级下的位置
         */
        index: null
    }

    const { type } = vnode

    if (isStr(type)) {
        fiber.tag = HostComponent
    } else if (isFn(type)) {
        fiber.tag = type.prototype.isReactComponent ? ClassComponent : FunctionComponent
        console.log(fiber.tag)
    }

    return fiber
}