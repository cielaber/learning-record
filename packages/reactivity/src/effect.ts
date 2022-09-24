export function effect(fn, options = {}) {
    // 让effect变为响应式才能做到数据变化重新执行
    const effect = createReactiveEffect(fn, options)

    effect(); // 响应式effect默认会先执行一次

    return effect

}

let uuid = 0;

let activeEffect;// 存储当前的effect
const effectStack = [] // 函数调用是一个栈，effect里可以再次调用effect，所以这里用一个栈结构，将每个每个新增的effect加入到栈中，当前effect永远取栈顶，保证当前的effect是正确的

function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // 保证加入到effectStack中的effect不会重新加入
            try {
                effectStack.push(effect)
                activeEffect = effect;
                return fn(); // 函数执行时会取值
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

// 让某个对象中的属性收集当前对应的effect函数
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
    if (!depsMap.has(activeEffect)) {
        dep.add(activeEffect)
    }

    console.log(targetMap)
}
