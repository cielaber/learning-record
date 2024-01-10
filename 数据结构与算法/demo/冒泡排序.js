function swap(A, i, j) {
    let v = A[i]
    A[i] = A[j]
    A[j] = v
}

function bubble_sort(A) {
    for (let i = A.length - 1; i > 0; i--)
        for (let j = 0; j <= i; j++)
            A[j] > A[j + 1] && swap(A, j, j + 1)
}