/**
 * 两个单链表相交的一系列问题
 * 给定两个可能有环也可能无环的单链表，头节点head1和head2，请实现一个函数，如果两个链表相交，请返回相交的第一个节点，如果不相交，请返回null。
 * 如果两个链表长度之和为n，时间复杂度O(n)，空间复杂度O(1)
 */

class Node {
    constructor(data) {
        this.value = data;
        this.next = null;
    }
}

/**
 * 判断单个链表是否成环
 * 空间复杂度O(n)，解法：
 * 使用Set记录每一个节点，遍历过程中若存在已经存在的节点，则为链表有环
 */

/**
 * 判断单个链表是否成环
 * 空间复杂度O(1)，解法：
 * 使用快慢指针，首先快指针一次两步，慢指针一次一步，若两指针相遇，则必有环。然后将快指针回到头节点，然后快慢指针都一次一步走，两者第一次相遇的地方则是环的第一个节点。
 */
function getLoopNode(head) {
    if (head === null || head.next === null || head.next.next === null) return null

    let n1 = head.next, // 慢指针一次走一步
        n2 = head.next.next // 快指针一次走两步

    while (n1 !== n2) {
        if (n2.next === null || n2.next.next === null) {
            return null
        }
        n2 = n2.next.next
        n1 = n1.next
    }
    // 如果两者相等，则必定有环
    // 此时快指针回到头节点
    // 然后慢指针、快指针均一次走一步，两者相遇的地方则是环的第一个节点
    n2 = head
    while (n1 !== n2) {
        n1 = n1.next
        n2 = n2.next
    }
    return n1
}

// 两个无环链表相交问题
// 这种情况下只能是Y字形
function noLoop(head1, head2) {
    if (head1 === null || head2 === null) {
        return null
    }
    let cur1 = head1,
        cur2 = head2

    let n = 0 // 记录两个链表的长度差
    while (cur1.next !== null) {
        n++
        cur1 = cur1.next
    }
    while (cur2.next !== null) {
        n--
        cur2 = cur2.next
    }
    if (cur1 !== cur2) { // 如果两个链表最后的节点不相同，则两个链表没有相交
        return null
    }
    cur1 = n > 0 ? head1 : head2 // cur1为长链表
    cur2 = cur1 === head1 ? head2 : head1 // cur2为短链表
    n = Math.abs(n)
    while (n !== 0) { // 长链表先走掉长度差个步长
        n--
        cur1 = cur1.next
    }
    // 然后两个链表各每次走一步
    // 首次相遇的节点即是两个链表的第一个相交节点
    while (cur1 !== cur2) {
        cur1 = cur1.next
        cur2 = cur2.next
    }
    return cur1
}

// 不存在一个链表有环，另一个链表无环的相交情况，只存在两个链表都有环的相交情况
// 两个有环单链表，返回第一个相交节点，如果不相交返回null
function bothLoop(head1, loop1, head2, loop2) {
    let cur1 = null,
        cur2 = null

    // 两个有环链表只有一个相交节点的情况(Y字型)
    if (loop1 === loop2) {
        cur1 = head1
        cur2 = head2
        let n = 0
        while (cur1 !== loop1) {
            n++
            cur1 = cur1.next
        }
        while (cur2 !== loop2) {
            n--
            cur2 = cur2.next
        }
        cur1 = n > 0 ? head1 : head2
        cur2 = cur1 === head1 ? head2 : head1
        n = Math.abs(n)
        while (n !== 0) {
            n--
            cur1 = cur1.next
        }
        while (cur1 !== cur2) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
        return cur1
    } else { // 两个环链表存在两个相交节点的情况：1、两个链表各自有环但不相交 2、两个链表共用一个环但有两个相交节点
        cur1 = loop1.next
        while (cur1 !== loop1) {
            if (cur1 === loop2) {
                return loop1 // 两个链表共用一个环但有两个相交节点，这种情况下让其中一个链表继续往下走，在回到这个相交节点之前必定会走到另一个相交节点，如果存在则就是两个链表共用一个环但有两个相交节点，这两个相交节点随便返回其中一个即可
            }
            cur1 = cur1.next
        }
        return null // 否则就是两个链表各自有环但不相交
    }
}

/**
 * 两个可能有环也可能无环的单链表，返回相交的第一个节点
 * @param {*} head1 
 * @param {*} head2 
 * @returns 
 */
function getIntersectNode(head1, head2) {
    if (head1 === null || head2 === null) {
        return null
    }

    let loop1 = getLoopNode(head1)
    let loop2 = getLoopNode(head2)
    if (loop1 === loop2) {
        return noLoop(head1, head2)
    }
    if (loop1 !== null && loop2 !== null) {
        return bothLoop(head1, loop1, head2, loop2)
    }
    return null
}