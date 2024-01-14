const sortFnTest = require("./sort-test")
sortFnTest(mergeSort1)

/**
 * 合并两个有序数据
 * @param {*} A 
 * @param {*} B 
 * @returns 
 */
function merge(A, B) {
    let p = 0, q = 0
    let r = []

    for (let i = 0; i < (A.length + B.length); i++) {
        if (A[p] < B[q]) {
            if (p < A.length) {
                r.push(A[p++])
                if (p === A.length) {
                    r = r.concat(B.slice(q))
                    return r
                }
            }
        } else {
            if (q < B.length) {
                r.push(B[q++])
                if (q === B.length) {
                    r = r.concat(A.slice(p))
                    return r
                }
            }
        }
    }

    return r;
}

function mergeSort(A) {
    let middle = Math.floor(A.length / 2)
    let left = A.slice(0, middle)
    let right = A.slice(middle, A.length)

    while (middle > 1) {
        left = mergeSort(left)
        right = mergeSort(right)
        middle--
    }

    return merge(left, right)
}

/**** 优化版 ****/
/**
 * Time O(nlogn) 
 * Space O(n)
 */
function merge1(A, p, q, r) {
    const A1 = A.slice(p, q)
    const A2 = A.slice(q, r)
    A1.push(Number.MAX_SAFE_INTEGER)
    A2.push(Number.MAX_SAFE_INTEGER)
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] > A2[j] ? A2[j++] : A1[i++]
    }
}

function mergeSort1(A, p = 0, r = A.length) {
    if (r - p < 2) return
    const q = Math.ceil(p + ((r - p) >> 1))
    mergeSort1(A, p, q)
    mergeSort1(A, q, r)
    merge1(A, p, q, r)
    return A
}

