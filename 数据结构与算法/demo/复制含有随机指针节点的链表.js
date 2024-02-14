/**
 * 复制含有随机指针节点的链表
 * rand指针式单链表结构中新增的指针，rand可能指向链表中的任意一个节点，也可能指向null，给定一个由Node节点类型组成的无环单链表的头节点head，实现一个函数完成这个链表的复制，并返回复制的新链表的头节点。
 */

class Node {
    constructor(data) {
        this.value = data;
        this.next = null;
        this.rand = null; // 一个随机指向
    }
}

// 使用哈希表实现
function copyListWithRand(head) {
    const map = new Map()
    let cur = head
    while (cur !== null) {
        map.set(cur, new Node(cur.value))
        cur = cur.next
    }
    cur = head
    while (cur !== null) {
        map.get(cur).next = map.get(cur.next)
        map.get(cur).rand = map.get(cur.rand)
        cur = cur.next
    }
    return map.get(head)
}

// 不使用哈希表实现
function copyListWithRand1(head) {
    if (head === null) {
        return null
    }
    let cur = head,
        next = null
    // 遍历节点，并生成一个新的拷贝节点将其置于原节点之后
    while (cur !== null) {
        next = cur.next
        cur.next = new Node(cur.value)
        cur.next.next = next
        cur = next
    }
    cur = head
    let curCopy = null
    while (cur !== null) {
        next = cur.next.next
        curCopy = cur.next
        curCopy.rand = cur.rand !== null ? cur.rand.next : null; // 获取拷贝节点的rand
        cur = next
    }
    let result = head.next
    cur = head
    // 分离原链表和拷贝后的链表
    while (cur !== null) {
        next = cur.next.next
        curCopy = cur.next
        cur.next = next
        curCopy.next = next !== null ? next.next : null // 获取拷贝节点的next
        cur = next
    }
    return result
}