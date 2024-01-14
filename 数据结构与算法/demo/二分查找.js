/**
 * O(logn) 
 * Ω(1)
 */

function bsearch(A, x) {
    let l = 0, // 查询范围左边界
        r = A.length - 1, // 查询范围右边界
        guess; // 猜测位置

    while (l <= r) {
        guess = Math.floor(l + ((r - l) >> 1));

        if (A[guess] === x) return guess;
        else if (A[guess] > x) r = guess - 1;
        else l = guess + 1;
    }
    return -1;
}

/**
 * 递归查找最大值
 * O(n)
 * @param {*} A 
 * @returns 
 */
function getMax(A) {
    return process(A, 0, A.length - 1)
}
function process(A, l, r) {
    if (l == r) {
        return A[l]
    }

    for (let i = l; i <= r; i++) {
        console.log(A[i]);
    }

    const mid = l + ((r - l) >> 1)
    const lMax = process(A, l, mid)
    const rMax = process(A, mid + 1, r)
    return Math.max(lMax, rMax)
}

console.log(getMax([10, 2, 1, 23, 2, 1, 323, 121, 1]))