import { isObject } from "@vue/shared"
import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from "./baseHandlers"


export function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers)
}

export function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers)
}

export function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers)
}

export function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers)
}

/**
 * 用来存储被代理的对象
 * WeakMap会自动垃圾回收，又不会造成内存泄漏，存储的key只能是对象
 */
const reactiveMap = new WeakMap()
const readonlyMap = new WeakMap()

// 柯里化 new Proxy() 
// 最核心的需要的需要拦截数据的读取和数据的修改
export function createReactiveObject(target, isReadonly, baseHandlers) {
    // 如果目标不是对象，没法拦截，reactive这个api只能拦截对象类型
    if (!isObject(target)) return target;

    // 如果某个对象已经被代理过了，就不需要再次代理了，因此被代理了的对象需要存储起来
    // 可能一个对象被深度代理，又被仅读代理了

    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    // 从缓存读取该对象是否被代理
    const existProxy = proxyMap.get(target);
    // 如果已经被代理了，直接返回即可
    if (existProxy) return existProxy

    // 对象没有被代理则new一个代理对象
    const proxy = new Proxy(target, baseHandlers);
    // 将要代理的对象和对应的代理结果缓存起来
    proxyMap.set(target, proxy)

    return proxy;
}