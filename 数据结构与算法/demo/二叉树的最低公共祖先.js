/**
 * 给定两个二叉树的节点o1和o2，找到他们的最低公共祖先 
 */


function lowestAncestor(head, o1, o2) {
    const fatherMap = new Map() // 设置一个map，记录每个节点的父节点
    fatherMap.set(head, head)
    process(head, fatherMap)
    const set = new Set() // 设置一个set，记录o1往上走经历的节点
    set.add(o1)
    let cur = o1
    while (cur !== fatherMap.get(cur)) {
        set.add(cur)
        cur = fatherMap.get(cur)
    }
    set.add(head)

    // o2往上走，如果遇到的第一个在o1所在的链路的节点即是最近公共祖先
    cur = o2
    let result = head
    while (cur !== fatherMap.get(cur)) {
        if (set.has(cur)) {
            result = cur
            break
        }
        cur = fatherMap.get(cur)
    }
    return result
}
function process(head, fatherMap) {
    if (!head) return
    fatherMap.set(head.left, head)
    fatherMap.set(head.right, head)
    process(head.left, fatherMap)
    process(head.right, fatherMap)
}

/**
 * 优化版本，理解难度较大
 * @param {*} head 
 * @param {*} o1 
 * @param {*} o2 
 * @returns 
 */
function lowestAncestor(head, o1, o2) {
    if (!head || head === o1 || head === o2) {
        return head
    }
    let left = lowestAncestor(head.left, o1, o2)
    let right = lowestAncestor(head.left, o1, o2)
    if (left && right) {
        return head
    }
    return left ? left : right
}