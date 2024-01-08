function bsearch(A, x) {
    let l = 0, // 查询范围左边界
        r = A.length - 1, // 查询范围右边界
        guess; // 猜测位置

    while (l <= r) {
        guess = Math.floor((1 + r) / 2);

        if (A[guess] === x) return guess;
        else if (A[guess] > x) r = guess - 1;
        else l = guess + 1;
    }
    return -1;
}
