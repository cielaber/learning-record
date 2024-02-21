/**
 * 序列化二叉树，空节点为#，value结束标识符为_
 */

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

/**
 * 先序方式序列化
 * @param {*} head 
 * @returns 
 */
function serialByPre(head) {
    if (!head) return "#_"

    const res = head.value + "_"
    res += serialByPre(head.left)
    res += serialByPre(head.right)
    return res
}

/**
 * 先序反序列化
 * @param {*} preStr 
 * @returns 
 */
function reconByPreString(preStr) {
    const values = preStr.split("_")
    const queue = []
    for (let i = 0; i != values.length; i++) {
        queue.push(values[i])
    }
    return reconPreOrder(queue)
}

function reconPreOrder(queue) {
    const value = queue.shift()
    if (value === '#') {
        return null
    }
    const head = new Node(+value)
    head.left = reconPreOrder(queue)
    head.right = reconPreOrder(queue)
    return head
}