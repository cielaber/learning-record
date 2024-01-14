/**
 * O(n^2) 
 */

const sortFnTest = require("./sort-test")
sortFnTest(bubbleSort)

function swap(A, i, j) {
    if (i === j) return
    A[i] = A[i] ^ A[j]
    A[j] = A[i] ^ A[j]
    A[i] = A[i] ^ A[j]
}

function bubbleSort(A) {
    for (let i = A.length - 1; i > 0; i--)
        for (let j = 0; j <= i; j++)
            A[j] > A[j + 1] && swap(A, j, j + 1)
}