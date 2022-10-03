export const patchEvent = (el, key, value) => {
    // 对函数的缓存
    const invokers = el._vei || (el._vei = {})

    const exists = invokers[key]

    if (value && exists) { // value有值，并且以前绑定过，直接将value替换掉
        exists.value = value
    } else { // 以前没绑定过
        const eventName = key.slice(2).toLowerCase();

        if (value) { // 添加事件
            let invoker = invokers[key] = createInvoker(value)
            el.addEventListener(eventName, invoker)
        } else { // 以前绑定过事件，但是新的value为空
            el.removeEventListener(eventName, exists) // 移除
            invokers[key] = undefined
        }
    }
}

function createInvoker(value) {
    const invoker = (e) => {
        invoker.value(e)
    }

    invoker.value = value // 如果绑定的事件更改，直接修改绑定事件的引用，而不需要每次先删除再绑定，提高性能

    return invoker
}