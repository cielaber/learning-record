/**
 * 一种新的二叉树节点类型如下，该结构比普通二叉树多了一个指向父节点的parent指针。
 * 假设有一颗二叉树，树中每个节点的parent都正确的指向父节点，头节点的parent指向null。
 * 只给一个在二叉树中的某个节点node，请实现返回node节点的后继节点的函数。
 * 在二叉树的中序遍历中，node的下一个节点叫作node的后继节点。
 * 假设
 */

class Node {
    constructor(val) {
        this.value = val
        this.left = null
        this.right = null
        this.parent = null
    }
}

/**
 * 获取二叉树的后继节点
 * @param {*} node 
 * @returns 
 */
function getSuccessorNode(node) {
    if (!node) return node
    if (node.right) { // 有右树的情况下，后继节点就是右树的最左节点
        return getLeftMost(node.right)
    } else {
        // 没有右树的情况下，往上寻找，找到node是某节点的左树的最右边一个节点，则这个节点就是node的后继节点
        // 当node是树的最后一个节点时，可能不存在于左侧中，此时返回null
        let parent = node.parent
        while (parent !== null && parent.left !== node) { // 当前节点是父节点的右树
            node = parent
            parent = node.parent // 当找到根节点时，为null
        }
        return parent
    }
}

function getLeftMost(node) {
    if (!node) return node
    while (node.left) {
        node = node.left
    }
    return node
}