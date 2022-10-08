import { isArray, isIntegerKey } from "@vue/shared";
import { TriggerOpTypes } from "./operators";

/**
 * effect实现原理：
 * 当effect执行时，会对fn中需要依赖的目标收集当前的effect。
 * 比如effect的fn中对某个目标进行了取值操作，就代表这个effect依赖这个目标，当这个目标改变时就得重新执行这个effect
 * 因此在目标的set中进行依赖收集操作（track函数），将当前的effect和目标绑定起来。
 * @param fn 
 * @param options 
 * @returns 
 */
export function effect(fn, options: any = {}) {
    // 让effect变为响应式才能做到数据变化重新执行
    const effect = createReactiveEffect(fn, options)

    if (!options.lazy) {
        effect(); // 响应式effect默认会先执行一次，而懒执行的effect第一次不执行
    }

    return effect

}

let uuid = 0;
let activeEffect; // 存储当前的effect
const effectStack = [] // 函数调用是一个栈，effect里可以再次调用effect，所以这里用一个栈结构，将每个每个新增的effect加入到栈中，当前effect永远取栈顶，保证当前的effect是正确的。
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // 保证加入到effectStack中的effect不会重新加入
            try {
                effectStack.push(effect)
                activeEffect = effect;
                return fn(); // 函数执行时会取值，取值时在get中收集effect中的依赖
            } finally {
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }

    effect.id = uuid++; // 制作一个effect标识，用于区分effect
    effect._isEffect = true; // 用于标识这个是响应式effect
    effect.raw = fn; // 保留effect对应的原函数
    effect.options = options; // 在effect上保留用户的信息
    return effect;
}

// 让target中的key收集当前对应的effect函数
// type: 代表当对target对象中的key做type操作的时候
// targetMap结构：key：target value：map，其中value是一个map结构，这个map的结构是：key：target中的目标属性 value：一个set集合，集合中存放对应所依赖的effect
const targetMap = new WeakMap()
export function track(target, type, key) { // 可以拿到当前的effect
    // activeEffect; // 当前正在运行的effect
    if (activeEffect === undefined) { // 此属性不用收集，因为没在effect中
        return;
    }

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
    }
}

export function trigger(target, type, key?, newValue?, oldValue?) {
    // 如果这个属性没有收集过effect，则不需要做任何操作
    const depsMap = targetMap.get(target)
    if (!depsMap) return;

    // 将所有的要执行的effct全部存到一个新的集合中，最终一起执行
    const effects = new Set() // 对effect去重
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => effects.add(effect))
        }
    }

    // 1. 看修改的是不是修改的数组长度，改长度影响大
    if (isArray(target) && key === 'length') {
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key > newValue) { // 如果更改的数组长度小于收集的索引(删除)，那么这个索引也要触发effect重新执行
                add(dep)
            }
        })
    } else {
        // 可能是对象
        if (key !== undefined) { // 修改
            add(depsMap.get(key));
        }
        // 如果是修改数组中的某一个索引
        switch (type) {
            case TriggerOpTypes.ADD: // 如果添加了一个索引(数组新增)就触发长度的更新
                if (isArray(target) && isIntegerKey(key)) {
                    add(depsMap.get('length'))
                }
        }
    }

    // 最终执行所有的effect
    effects.forEach((effect: any) => {
        if (effect.options.scheduler) {
            effect.options.scheduler(effect)
        } else {
            effect()
        }
    })
}
