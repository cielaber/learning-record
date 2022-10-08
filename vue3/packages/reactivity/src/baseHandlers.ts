// 实现new Proxy(target, handler)

import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject } from '@vue/shared'
import { TrackOpTypes, TriggerOpTypes } from './operators'
import { reactive, readonly } from './reactive'
import { track, trigger } from './effect'

// 拦截获取功能
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) { // let proxy = reactive()

        // 后续Object上的方法会被迁移到Reflect Reflect.getProptypeof()
        // 以前target[key] = value 方式设置值可能会失败，且不会报异常，也没有返回值
        // Reflect 方法具备返回值
        const result = Reflect.get(target, key, receiver)

        if (!isReadonly) {
            // 收集依赖，数据变化后更新视图

            // 执行effect时会取effect中依赖的key的值，收集effect
            // TrackOpTypes.GET : 代表当对target对象中的key做GET操作的时候
            track(target, TrackOpTypes.GET, key)
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

        const oldValue = target[key] // 获取老的值

        let hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key)

        const result = Reflect.set(target, key, value, receiver)
        
        // 要区分是新增的还是修改的
        // vue2里无法监控索引更改，无法监控数组的长度，而是需要hack特殊处理
        if(!hasKey) {
            // 新增
            trigger(target, TriggerOpTypes.ADD, key, value)
        } else if(hasChanged(oldValue, value)) {
            // 修改
            trigger(target, TriggerOpTypes.SET, key, value, oldValue)
        }

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