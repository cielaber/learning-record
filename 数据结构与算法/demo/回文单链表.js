/**
 * 给定一个单链表的头节点head，请判断该链表是否为回文结构
 */

/**
 * 时间复杂度O(n)，空间复杂度O(n)
 * 解法1: 第一次递归链表，给每一项入栈，出栈然后第二次递归链表，对比是否相同。
 * 解法2: 将后半部分入栈，然后和前一部分链表做对比。比解法1省一半空间。
 *      如何将后部分入栈：快慢指针，快指针一次走两步，慢指针一次走一步，快指针走到头则慢指针走到中点。
 * 
 * 时间复杂度O(n)，空间复杂度O(1)
 * 解法3: 快慢指针，快指针一次走两步，慢指针一次走一步，慢指针走到中点时，中点置为null，并将后半部分逆序，走完后标记最后一个节点B和头节点A，AB节点同时进步并对比，直到值为null(中点)时结束对比，最后恢复链表原结构。
 */

class Node {
    constructor(data) {
        this.value = data;
        this.next = null;
    }
}

// 解法1
function isPalindrome1(head) {
    const stack = []
    let cur = head
    while (cur !== null) {
        stack.push(cur)
        cur = cur.next
    }

    while (head !== null) {
        if (head.value !== stack.pop().value) {
            return false
        }
        head = head.next
    }
    return true
}

// 解法2
function isPalindrome2(head) {
    if (head === null || head.next === null) {
        return true
    }
    let right = head.next
    let cur = head
    while (cur.next !== null && cur.next.next !== null) {
        right = right.next
        cur = cur.next.next
    }
    const stack = []
    while (right !== null) {
        stack.push(right)
        right = right.next
    }
    while (!stack.isEmpty()) {
        if (head.value !== stack.pop().value) {
            return false
        }
        head = head.next
    }
    return true
}

// 解法3
function isPalindrome3(head) {
    if (head === null || head.next == null) {
        return null
    }
    let n1 = head
    let n2 = head
    while (n2.next !== null && n2.next.next !== null) {
        n1 = n1.next
        n2 = n2.next.next
    }
    n2 = n1.next // n2指向右边第一个节点
    n1.next = null // 将中间值置为null
    let n3 = null
    while (n2 !== null) {
        n3 = n2.next; // 保存下一个
        n2.next = n1 // 后半部分逆序
        // 往下走
        n1 = n2
        n2 = n3
    }
    n3 = n1 // 标记最后一个节点
    n2 = head // 标记初始节点
    let result = true
    while (n1 !== null && n2 !== null) {
        if (n1.value !== n2.value) {
            result = false
            break
        }
        n1 = n1.next
        n2 = n2.next
    }

    // 恢复逆序
    n1 = n3.next
    n3.next = null
    while (n1 !== null) {
        n2 = n1.next
        n1.next = n3
        n3 = n1
        n1 = n2
    }
    return result
}