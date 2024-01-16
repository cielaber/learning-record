const sortFnTest = require("./sort-test")
sortFnTest(quickSort)

/**
 * 一个数组，给定范围，以该范围内最后一个数为参考，小于该数的放数组左边，等于该数的放中间，大于该数的放后边
 * 返回的是中间等于部分的区间
 * @param {*} A 
 * @param {*} l 
 * @param {*} r 
 * @returns 
 */
function partition(A, l, r) {
    l--
    let last = r
    const num = A[last]
    for (let i = l + 1; i < r; i++) {
        if (A[i] < num) {
            swap(A, i, ++l)
            continue
        }
        if (A[i] > num) {
            swap(A, i, --r)
            --i
            continue
        }
        if (A[i] === num) {
            continue
        }
    }
    swap(A, r, last)
    return [l + 1, r]

    // let less = l - 1
    // let more = r
    // while (l < more) {
    //     if (A[l] < A[r]) {
    //         swap(A, ++less, l++)
    //     } else if (A[l] > A[r]) {
    //         swap(A, --more, l)
    //     } else {
    //         l++
    //     }
    // }
    // swap(A, more, r)
    // return [less + 1, more]
}

/**
 * 
 * @param {*} A 
 */
function quickSort(A) {
    sort(A, 0, A.length - 1)
}

function sort(A, l, r) {
    if (l < r) {
        // 这段加上会有问题
        // const num = l + Math.ceil(Math.random() * (r - l + 1)) // 随机生成一个数放到最后，增加其随机性，降低最坏情况出现的概率
        // swap(A, num, r)
        const p = partition(A, l, r)
        sort(A, l, p[0] - 1)
        sort(A, p[1] + 1, r)
    }
}

function swap(A, i, j) {
    if (i === j) return
    A[i] = A[i] ^ A[j]
    A[j] = A[i] ^ A[j]
    A[i] = A[i] ^ A[j]
}