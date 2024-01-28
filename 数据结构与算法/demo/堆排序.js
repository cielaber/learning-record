const sortFnTest = require("./sort-test")
sortFnTest(heapSort)

function heapSort(arr) {
    if (!arr || arr.length < 2) return

    // 从下往上成堆 O(nlogn)
    // for (let i = 1; i < arr.length; i++) { // O(n)
    //     heapInsert(arr, i) // O(logn)
    // }

    // 从上往下成堆 O(n) 略快
    for (let i = arr.length - 1; i >= 0; i--) {
        heapify(arr, i, arr.length)
    }

    let heapsize = arr.length
    swap(arr, 0, --heapsize)
    while (heapsize > 0) { // O(n)
        heapify(arr, 0, heapsize) // O(logn)
        swap(arr, 0, --heapsize)
    }
}

function heapInsert(arr, index) {
    if (index === 0) return
    while (arr[index] > arr[(index - 1) >> 1]) {
        swap(arr, index, (index - 1) >> 1)
        index = (index - 1) >> 1
        if (index === 0) break
    }
}

function heapify(arr, index, heapsize) {
    let left = index * 2 + 1
    while (left < heapsize) {
        let largest = left + 1 < heapsize && arr[left + 1] > arr[left] ? left + 1 : left
        largest = arr[largest] > arr[index] ? largest : index
        if (largest === index) break;
        swap(arr, largest, index)
        index = largest
        left = index * 2 + 1
    }
}

function swap(arr, i, j) {
    if (i === j) return
    arr[i] = arr[i] ^ arr[j]
    arr[j] = arr[i] ^ arr[j]
    arr[i] = arr[i] ^ arr[j]
}

// 拓展题：已知一个几乎有序的数组，几乎有序是指，如果把数组排好序的话，每个元素移动的距离可以不超过k，且k对于数组来说比较小，请选择一个合适的排序算法针对这个数据进行排序
// 先实现一个小根堆
class PriorityQueue {
    heap
    heapsize
    constructor() {
        this.heap = []
        this.heapsize = 0
    }
    add(value) {
        this.heap.push(value)
        this.heapsize++
        if (this.heapsize > 1) {
            let index = this.heapsize - 1
            while (this.heap[index] < this.heap[(index - 1) >> 1]) {
                swap(this.heap, index, (index - 1) >> 1)
                index = (index - 1) >> 1
                if (index === 0) break
            }
        }
    }
    poll() {
        if (this.heapsize <= 0) return
        const result = this.heap.shift()
        this.heapsize--
        this.heap.unshift(this.heap.pop(this.heapsize - 1))

        if (this.heapsize > 1) {
            let index = 0
            let left = index * 2 + 1
            while (left < this.heapsize) {
                let min = left + 1 < this.heapsize && this.heap[left + 1] < this.heap[left] ? left + 1 : left;
                min = this.heap[min] < this.heap[index] ? min : index
                if (min === index) break
                swap(this.heap, min, index)
                index = min
                left = index * 2 + 1
            }
        }
        return result
    }
    isEmpty() {
        return this.heapsize <= 0
    }
}

function sortedArrDistanceLessK(arr, k) {
    const heap = new PriorityQueue()
    let index = 0
    while (index < Math.min(arr.length, k)) {
        heap.add(arr[index++])
    }
    let i = 0
    while (index < arr.length) {
        arr[i++] = heap.poll()
        heap.add(arr[index++])
    }
    while (!heap.isEmpty()) {
        arr[i++] = heap.poll()
    }
}