import { currentInstance, setCurrentInstance } from "./component"

const enum LifeCycleHooks {
    BEFORE_MOUNT = 'bm',
    MOUNTED = 'm',
    BEFORE_UPDATE = 'bu',
    UPDATED = 'u',
}

const injectHook = (type, hook, target) => { 
    if(!target) {
        return console.warn('')
    } else {
        const hooks = target[type] || (target[type] = [])

        // 如果父组件包含子组件，父子组件的生命周期可能会混乱，所以为了保证父组件的生命周期中的instance是父组件本身而不是子组件
        // 因此执行生命钩子之前，先将实例置成自己的
        const wrap = () => {
            setCurrentInstance(target)
            hook.call(target)
            setCurrentInstance(null)
        }

        hooks.push(wrap)
    }
}

export const invokeArrayFns = (fns) => {
    for(let i = 0; i < fns.length; i++) {
        fns[i]()
    }
}

const createHook = (lifeCycle) => (hook, target = currentInstance) => { // 闭包保留了自己的实例
    injectHook(lifeCycle, hook, target)
}

export const onBeforeMount =  createHook(LifeCycleHooks.BEFORE_MOUNT)
export const onMounted = createHook(LifeCycleHooks.MOUNTED)
export const onBeforeUpdate = createHook(LifeCycleHooks.BEFORE_UPDATE)
export const onUpdated = createHook(LifeCycleHooks.UPDATED)