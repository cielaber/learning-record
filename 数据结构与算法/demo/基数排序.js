/**
 * 只适用于正整数
 */
function radixSort(arr) {
    if (!arr || arr.length <= 1) return
    radixSort_(arr, 0, arr.length - 1)
}

const a = [21321, 12, 5, 23, 222, 312, 234532, 0, 231, 423, 4, 2, 1231, 11, 34, 53, 24455, 1124512312]
radixSort(a)
console.log(a)

function radixSort_(arr, l, r) {
    const radix = 10
    const bucket = new Array(r - l + 1)
    const digit = getArrMaxDigit(arr)
    for (let d = 1; d <= digit; d++) {
        const count = new Array(radix).fill(0)
        for (let i = l; i <= r; i++) {
            let v = getDigitValue(arr[i], d)
            count[v]++
        }
        for (let i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1]
        }
        for (let i = r; i >= l; i--) {
            const v = getDigitValue(arr[i], d)
            bucket[count[v] - 1] = arr[i]
            count[v]--
        }
        for (let i = l, j = 0; i <= r; i++, j++) {
            arr[i] = bucket[j]
        }
    }
}

function getArrMaxDigit(arr) {
    const max = Math.max(...arr)
    return `${max}`.length
}

function getDigitValue(number, digit) {
    return Math.floor((number / Math.pow(10, digit - 1)) % 10);
}