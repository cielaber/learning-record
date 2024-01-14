/**
 * 数组中存在一种数是奇数个，其他数都是偶数个，找出这个数
 * @param {*} A 
 * @returns 
 */
function fn(A) {
    let eor = 0
    A.forEach(element => {
        eor ^= element
    });
    return eor
}

console.log(fn([1, 1, 22, 22, 22, 1, 33, 33, 33, 1, 33]))

/**
 * 数组中存在两种数是奇数个，其他数都是偶数个，找出这两个数
 * @param {*} A 
 */
function fn2(A) {
    let eor = 0;
    A.forEach(element => {
        eor ^= element
    })
    // 此时 eor等于a^b
    // eor != 0 所以eor二进制位上必定有一个位是1
    let rightOne = eor & (~eor + 1) // 提取最右边的1
    let eor1 = 0
    A.forEach(element => {
        if ((element & rightOne) === 0) { // 区分a和b：找出某个位置为1的数，进行异或操作，得到的即a或b中的一个
            eor1 ^= element
        }
    })
    // 因此找出另一个数只需要 eor1 ^ eor
    return [eor1, eor1 ^ eor]
}

console.log(fn2([1, 1, 22, 22, 22, 10, 1, 33, 33, 33, 1, 33, 5, 5]))