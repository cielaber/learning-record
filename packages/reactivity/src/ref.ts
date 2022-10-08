// ref 和 reactive的区别：reactive内部采用proxy ref中内部使用的是Object.defineProperty(实际上用的是class的get set)
// ref将传进来的普通类型转变成一个对象

import { hasChanged, isArray, isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operators";
import { reactive } from "./reactive";

// value也可以是个对象
export function ref(value) {
    return createRef(value)
}

export function shallowRef(value) {
    return createRef(value, true)
}

const convert = (val) => isObject(val) ? reactive(val) : val

// vue3的bate版本中ref就是一个对象，由于不方便拓展，之后改成了类
class RefImpl {
    public _value;
    public __v_isRef = true; // 表示是一个ref

    constructor(public rawValue, public shallow) { // 参数前面添加修饰符，此属性就被声明并赋值到实例上了
        this._value = shallow ? rawValue : convert(rawValue) // 如果是深度，需要把里面的都变成响应式的
    }
    // 类的属性访问器
    get value () {
        track(this, TrackOpTypes.GET, 'value')
        return this._value
    }

    set value (newValue) {
        // 判断老值和新值是否有变化
        if (hasChanged(newValue, this.rawValue)) {
            this.rawValue = newValue; // 有变化则新值赋值给rawValue
            this._value = this.shallow ? newValue : convert(newValue);
            trigger(this, TriggerOpTypes.SET, 'value', newValue)
        }
    }
}

export function createRef(rawValue, shallow = false) {
    return new RefImpl(rawValue, shallow)
}

class ObjectRefImpl {
    public __v_isRef = true;

    constructor (public target, public key) {}

    get value () {
        return this.target[this.key] // 如果源对象是响应式，就会依赖收集
    }

    set value(newValue) {
        this.target[this.key] = newValue // 如果源对象是响应式的，就会触发更新
    }
}

// reactive的对象不能解构，解构出来的属性会失去响应式
// 可以将一个对象某个key的值转换成ref类型
export function toRef(target, key) {
    return new ObjectRefImpl(target, key)
}

// reactive的对象不能解构，解构出来的属性会失去响应式
// 可以将对象中的所有属性都转成响应式
export function toRefs(object) { // object可能是数组或者是对象
    const ret = isArray(object) ? new Array(object.length) : {}

    for (let key in object) {
        ret[key] = toRef(object, key);
    }

    return ret;
    
}