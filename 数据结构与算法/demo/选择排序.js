/**
 * O(n^2) 
 */

const sortFnTest = require("./sort-test")
sortFnTest(selectSort)

function selectSort(A) {
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            if (A[i] > A[j]) {
                swap(A, i, j)
            }
        }
    }
}

function swap(A, i, j) {
    if (i === j) return
    A[i] = A[i] ^ A[j]
    A[j] = A[i] ^ A[j]
    A[i] = A[i] ^ A[j]
}