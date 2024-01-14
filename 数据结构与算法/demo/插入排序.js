/**
 * O(n^2) 
 * Ω(n)
 */

const sortFnTest = require("./sort-test")
sortFnTest(insertionSort)

/**
 * 向一个有序数组中插入一个值
 * @param {*} A 
 * @param {*} x 
 */
function insert(A, i, x) {
    let p = i - 1
    while (p >= 0 && A[p] > x) {
        A[p + 1] = A[p]
        p--
    }

    A[p + 1] = x
}

/**
 * 向一个无序数组中插入一个值并排序
 * 在上一个有序数组插入的基础上，无序数组从第一个数开始循环，假设一个数为一个有序数组。
 * @param {*} A 
 */
function insertionSort(A) {
    for (let i = 1; i < A.length; i++) {
        insert(A, i, A[i])
    }
}