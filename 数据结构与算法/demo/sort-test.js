module.exports = function sortFnTest(fn) {
    console.log('Start test sort function...')
    const testTime = 50
    const maxSize = 10000
    const maxValue = 100
    console.log('testTime:', testTime)
    console.log('maxSize:', maxSize)
    console.log('maxValue:', maxValue)
    let succeed = true
    let time1 = 0
    let time2 = 0
    for (let i = 0; i < testTime; i++) {
        let arr1 = generateRadomArray(maxSize, maxValue)
        let arr2 = copyArray(arr1)
        const t1 = new Date().getTime()
        fn(arr1)
        time1 += new Date().getTime() - t1

        const t2 = new Date().getTime()
        comparator(arr2)
        time2 += new Date().getTime() - t2

        if (!isEaqual(arr1, arr2)) {
            succeed = false
            break
        }
    }

    console.log(`${fn.name} times(ms):`, time1 / 1000)
    console.log(`compartor times(ms):`, time2 / 1000)
    console.log(succeed ? "Nice!" : "Fucking fucked!")
}

function generateRadomArray(maxSize, maxValue) {
    const arr = new Array(Number.parseInt((maxSize + 1) * Math.random()))
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Number.parseInt(((maxValue + 1) * Math.random()) - (maxValue * Math.random()))
    }
    return arr
}

function copyArray(arr) {
    const res = new Array(arr.length)
    for (let i = 0; i < arr.length; i++) {
        res[i] = arr[i]
    }
    return res
}

function isEaqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
    }
    return true
}

function comparator(arr) {
    arr.sort((a, b) => a - b)
}