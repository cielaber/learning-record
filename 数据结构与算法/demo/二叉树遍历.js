class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

/**
 * 递归实现前序遍历
 * @param {*} head 
 */
function preOrderRecur(head) {
    if (head == null) return
    console.log(head.value)
    preOrderRecur(head.left)
    preOrderRecur(head.right)
}

/**
 * 递归实现中序遍历
 * @param {*} head 
 * @returns 
 */
function inOrderRecur(head) {
    if (head == null) return
    inOrderRecur(head.left)
    console.log(head.value)
    inOrderRecur(head.right)
}

/**
 * 递归实现后序遍历
 * @param {*} head 
 * @returns 
 */
function posOrderRecur(head) {
    if (head == null) return
    posOrderRecur(head.left)
    posOrderRecur(head.right)
    console.log(head.value)
}

/**
 * 非递归实现前序遍历
 * @param {*} head 
 */
function preOrderUnRecur(head) {
    if (head !== null) {
        const stack = [] // 使用栈手动压栈
        stack.push(head)
        while (stack.length) {
            head = stack.pop()
            console.log(head.value)
            if (head.right !== null) {
                stack.push(head.right)
            }
            if (head.left !== null) {
                stack.push(head.left)
            }
        }
    }
}

/**
 * 非递归实现后序遍历
 * @param {*} head 
 */
function posOrderUnRecur(head) {
    if (head !== null) {
        const stack = [] // 使用栈手动压栈，使其出栈顺序为头、右、左
        stack.push(head)
        const stack1 = [] // 然后定义一个收集栈，按第一个栈的出栈顺序入栈，然后再出栈即是左、右、头的后序遍历顺序
        while (stack.length) {
            head = stack.pop()
            stack1.push(head)
            if (head.left !== null) {
                stack.push(head.left)
            }
            if (head.right !== null) {
                stack.push(head.right)
            }
        }
        while (stack1.length) {
            console.log(stack1.pop().value)
        }
    }
}

/**
 * 非递归实现中序遍历
 * @param {*} head 
 */
function inOrderUnRecur(head) {
    if (head !== null) {
        const stack = []
        while (stack.length && head !== null) {
            if (head !== null) { // 每遇到一个节点，先将左子树节点全部入栈
                stack.push(head)
                head = head.left
            } else { // 左子树全部入栈之后，进行出栈操作，此时进行打印，然后对右子树进行之前同样的操作
                head = stack.pop()
                console.log(head.value)
                head = head.right
            }
        }
    }
}

/**
 * 广度优先遍历
 * @param {*} head 
 */
function levelOrder(head) {
    if (head === null) return
    const queue = []
    queue.unshift(head)
    while (queue.length) {
        head = queue.pop()
        console.log(head.value)
        if (head.left) queue.unshift(head.left)
        if (head.right) queue.unshift(head.right)
    }
}

/**
 * 获取树的最大宽度
 * @param {*} head 
 */
function levelOrder(head) {
    if (head === null) return
    const queue = []
    queue.unshift(head)
    const map = new Map() // 使用哈希表记录每个节点所在的层数
    map.set(head, 1)
    let curLevel = 1, // 记录当前所在层
        curLevelNodes = 0, // 当前层节点数
        max = Number.MIN_SAFE_INTEGER

    while (queue.length) {
        let cur = queue.pop()
        let curNodeLevel = map.get(cur)
        if (curNodeLevel === curLevel) {
            curLevelNodes++
        } else {
            max = Math.max(max, curLevelNodes)
            curLevel++
            curLevelNodes = 1
        }
        if (cur.left) {
            map.set(cur.left, curNodeLevel + 1)
            queue.unshift(cur.left)
        }
        if (cur.right) {
            map.set(cur.right, curNodeLevel + 1)
            queue.unshift(cur.right)
        }
    }
    return max
}