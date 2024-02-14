/**
 * 将单链表按某值p划分成左边小、中间相等、右边大的形式。
 */

/**
 * 空间复杂度O(n)
 * 解法：将链表节点的值用数组记录，将数组进行排序，然后再用链表串起来
 */

/**
 * 空间复杂度O(1)
 * 解法：遍历链表，使用变量分别记录，小于区域的头、尾，等于区域的头、尾，大于区域的头、尾，最后将其串起。
 */

class Node {
    constructor(data) {
        this.value = data;
        this.next = null;
    }
}

function listPartition(head, pivot) {
    let sH = null,
        sT = null,
        eH = null,
        eT = null,
        mH = null,
        mT = null,
        next = null

    while (head !== null) {
        next = head.next
        head.next = null
        if (head.value < pivot) {
            if (sH == null) {
                sH = head
                sT = head
            } else {
                sT.next = head
                sT = head
            }
        } else if (head.value === pivot) {
            if (eH === null) {
                eH = head
                eT = head
            } else {
                eT.next = head
                eT = head
            }
        } else {
            if (mH === null) {
                mH = head
                mT = head
            } else {
                mT.next = head
                mT = head
            }
        }
        head = next
    }
    if (sT !== null) {
        sT.next = eH
        eT = eT === null ? sT : eT
    }
    if (eT !== null) {
        eT.next = mH
    }
    return sH !== null ? sH : (eH !== null ? eH : mH)
}


