import { isArray, isObject, isString, ShapeFlags } from "@vue/shared"

// 创建虚拟节点
export const createVNode = (type, props, children = null) => {
    // 根据type来区分是组件还是普通标签元素

    // 给虚拟节点加个类型
    const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObject(type) ? ShapeFlags.STATEFUL_COMPONENT : 0

    const vnode = { // 用一个对象来描述，虚拟节点有跨平台的能力
        __v_isVnode: true,
        type,
        props,
        children,
        component: null, // 组件实例
        el: null, // 会将虚拟节点和真实节点对应起来
        key: props && props.key, // diff算法会用到key
        shapeFlag, // 判断出自己和children的类型
    }

    normalizeChildren(vnode, children)

    return vnode
}

function normalizeChildren(vnode, children) {
    let type = 0
    if(children == null) {
        
    } else if (isArray(children)) {
        type = ShapeFlags.ARRAY_CHILDREN;
    } else {
        type = ShapeFlags.TEXT_CHILDREN
    }

    vnode.shapeFlag |= type


    
}