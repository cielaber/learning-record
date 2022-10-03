export const isObject = (value) => typeof value === 'object' && value !== null;

export const extend = Object.assign

export const isArray = Array.isArray;

export const isFunction = (value) => typeof value === 'function'

export const isNumber = (value) => typeof value === 'number'

export const isString = (value) => typeof value === 'string'

// 是否是一个整型的key
export const isIntegerKey = (key) => parseInt(key) + '' === key

let hasOwnProperty = Object.prototype.hasOwnProperty
// 判断当前对象是否有该属性
export const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export const hasChanged = (oldValue, value) => oldValue !== value

export * from './shapeFlag'