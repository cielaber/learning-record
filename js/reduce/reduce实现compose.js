/**
 * 实现组合函数compose
 * compose接受一个函数列表，并返回一个函数
 * 返回函数的参数先在compose函数列表的最后一个函数中执行，其执行结果作为参数传递给倒数第二个函数，以此类推。
 */

// 实现效果
function sum(a, b) {
    return a + b;
}

function len(str) {
    return str.length
}

function addPrefix(str) {
    return '$' + str
}

let r = addPrefix(len(sum('a', 'b')))

console.log(r) //$2

/**
 * 要求实现compose函数，使以下结果成立
 * let final = compose(addPrefix, len, sum)
 * final('a', 'b') === r
 */

/**
 * 方法一：使用reduceRight
 */
const compose = (...fns) => {
    return (...args) => {
        let lastFn = fns.pop()
        let res = lastFn(args)
        return fns.reduceRight((previous, current) => {
            return current(previous)
        }, res)
    }
}
// 简化如下
// const compose = (...fns) =>  (...args) => fns.reduceRight((previous, current)=> current(previous), fns.pop()(...args))

/**
 * 方法二：使用reduce
 */

function compose(...fns) {
    return fns.reduce((previous, current) => {
        return (...args) => {
            return previous(current(...args))
        }
    })
}

// 简化如下
// const compose = (...fns) => fns.reduce((previous, current) => (...args) => previous(current(...args)))

let final = compose(addPrefix, len, sum)
console.log(final('a', 'b'))
