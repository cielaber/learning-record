### 复杂度分类

![image-20240113155813598](./image-algo/image-20240113155813598.png)

### master公式

适用于子问题规模等规模的递归。

![image-20240114110942835](./image-algo/image-20240114110942835.png)

![image-20240114111203606](./image-algo/image-20240114111203606.png)

```js
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
```

例如，以上递归可用master公式表示为：T(n) = 2 * T(1 * n/2) + O(n)，如果没有中间for循环的console.log(A[i])，其表达式则为：T(n) = 2 * T(1 * n/2) + O(1)。