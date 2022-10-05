// let arr = [1, 8, 5, 3, 4, 9, 7, 6, 0]
let arr = [2, 3, 1, 5, 6, 8, 7, 9, 4]

// 求出连续最长递增子序列 最终结果是索引
function getSequence(arr) {
    let len = arr.length
    const result = [0]
    const p = arr.slice(0) // 和原数组相同，用来存放索引
    let start, end, middle

    for (let i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            let resultlastIndex = result[result.length - 1];
            if (arr[resultlastIndex] < arrI) {
                p[i] = resultlastIndex // 标记当前前一个人对应的索引

                result.push(i)
                continue
            }

            // 二分查找 找到比当前值大的那一个，换掉它
            start = 0
            end = result.length - 1
            while (start < end) { // 重合了说明找到了对应的值
                middle = ((start + end) / 2) | 0
                if (arr[result[middle]] < arrI) {
                    start = middle + 1
                } else {
                    end = middle
                }
            }
            if (arrI < arr[result[start]]) {
                if (start > 0) {
                    p[i] = result[start - 1] // 要替换掉的前一个
                }

                result[start] = i
            }
        }
    }

    let len1 = result.length
    let last = result[len1 - 1]
    while (len1-- > 0) { // 根据前驱节点，向前查找
        result[len1] = last
        last = p[last]
    }


    return result
}

console.log(getSequence(arr))