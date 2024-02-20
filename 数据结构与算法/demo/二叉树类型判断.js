/**
 * 判断是否是搜索二叉树
 * 搜索二叉树：左子树比父节点小，右子树比父节点大
 * 判断逻辑：采用中序遍历的结果数据是递增的
 * @param {*} head 
 */
function isBST(head) {
    /**
     * 递归中序遍历写法
     */
    // let preValue = Number.MIN_SAFE_INTEGER

    // function inOrder(head) {
    //     if (!head) return true
    //     const isLfetBst = inOrder(head.left)
    //     if (!isLfetBst) {
    //         return false
    //     }
    //     if (head.value <= preValue) {
    //         return false
    //     } else {
    //         preValue = head.value
    //     }
    //     return inOrder(head.right)
    // }

    // return inOrder(head)

    /**
     * 非递归中序遍历写法
     */
    if (!head) return true
    let preValue = Number.MIN_SAFE_INTEGER
    const stack = [head]
    while (stack.length) {
        if (head) {
            stack.push(head)
            head = head.left
        } else {
            head = stack.pop()
            if (preValue >= head.value) {
                return false
            }
            preValue = head.value
            head = head.right
        }
    }
    return true
}

class ReturnData {
    constructor(isBST, min, max) {
        this.isBST = isBST
        this.min = min
        this.max = max
    }
}
/**
 * 树形DP写法
 * @param {*} x 
 * @returns 
 */
function processBST(x) {
    if (!x) return null
    const leftData = processBST(x.left)
    const rightData = processBST(x.right)

    let min = x.value
    let max = x.value
    if (leftData) {
        min = Math.min(min, leftData.min)
        max = Math.max(max, leftData.max)
    }
    if (rightData) {
        min = Math.min(min, leftData.min)
        max = Math.max(max, leftData.max)
    }

    let isBST = true
    if (leftData && (!leftData.isBST || leftData.max >= x.value)) {
        isBST = false
    }
    if (rightData && (!rightData.isBST || x.value >= rightData.min)) {
        isBST = false
    }
    return new ReturnData(isBST, min, max)
}

/**
 * 判断是否是完全二叉树
 * 完全二叉树：只有最底层的节点未被填满，且最底层节点尽量靠左填充
 * 判断条件：
 *      1.存在右节点但不存在左节点则直接不符合
 *      2.如果遇到了不双全的节点之后，又发现后面的节点有孩子
 * @param {*} head 
 * @returns 
 */
function isCBT(head) {
    if (!head) return true
    const queue = []
    let leaf = false // 标识是否遇到过两个孩子不双全的节点
    let l = null,
        r = null
    queue.push(head)
    while (queue.length) {
        head = queue.pop()
        l = head.left
        r = head.right

        if (
            (leaf && (l || r)) // 发现不双全的节点后，又发现当前节点有孩子
            ||
            (!l || r)) {
            return false
        }
        if (l) queue.push(l)
        if (r) queue.push(r)
        if (!l || !r) {
            leaf = true
        }
    }
}

/**
 * 判断是否是平衡二叉树
 * 平衡二叉树：任意节点的左子树和右子树的高度之差不超过1
 * @param {*} head 
 * @returns 
 */
function isBalance(head) {
    return processBalance(head).isBalanced
}
class ReturnType {
    constructor(b, h) {
        this.isBalanced = b
        this.height = h
    }
}
function processBalance(x) {
    if (!x) return new ReturnType(true, 0)
    const leftData = processBalance(x.left)
    const rightData = processBalance(x.right)
    const height = Math.max(leftData.height, rightData.height) + 1
    const isBalanced = leftData.isBalanced && rightData.isBalanced && Math.abs(leftData.height - rightData.height) < 2
    return new ReturnType(isBalanced, height)
}

/**
 * 判断是否是满二叉树(完美二叉树)
 * 判断条件：节点数 = (2**树高度) - 1
 * @param {*} head 
 * @returns 
 */
function isFull(head) {
    if (!head) return true
    const data = processFull(head)
    return data.nodes === (1 << data.height) - 1
}
class Info {
    constructor(height, nodes) {
        this.height = height
        this.nodes = nodes
    }
}
function processFull(x) {
    if (!x) {
        return new Info(0, 0)
    }
    const leftData = processFull(x.left)
    const rightData = processFull(x.right)
    const height = Math.max(leftData.height, rightData.height) + 1
    const nodes = leftData.nodes + rightData.nodes + 1
    return new Info(height, nodes)
}