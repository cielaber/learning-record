// 实现new Proxy(target, handler)

import { extend, isObject } from '@vue/shared'
import { reactive, readonly } from './reactive'

// 拦截获取功能
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) { // let proxy = reactive()

        // 后续Object上的方法会被迁移到Reflect Reflect.getProptypeof()
        // 以前target[key] = value 方式设置值可能会失败，且不会报异常，也没有返回值
        // Reflect 方法具备返回值
        const result = Reflect.get(target, key, receiver)

        if (!isReadonly) {
            // 收集依赖，数据变化后更新视图
        }

        if (shallow) {
            // 只代理第一层
            return result
        }

        if (isObject(result)) {
            // 递归代理
            // vue2 是一上来就递归，vue3是当取值时进行代理（懒代理）
            return isReadonly ? readonly(result) : reactive(result)
        }

        return result
    }
}

// 拦截设置功能
function createSetter(isShallow = false) {
    return function set(target, key, value,receiver) {
        const result = Reflect.set(target, key, value, receiver)

        return result
    }
}

const get = createGetter();
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const shallowSet = createSetter(true)

export const mutableHandlers = {
    get,
    set
}

export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
}

let readonlyObj = {
    set: (target, key) => {
        console.warn(`set on key ${key} falied`)
    }
}

export const readonlyHandlers = extend({
    get: readonlyGet,
}, readonlyObj)

export const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet
}, readonlyObj)