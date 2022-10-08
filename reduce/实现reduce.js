Array.prototype.reduce = function (callback, previous) {
    for (let i = 0; i < this.length; i++) {
        if (!previous) {
            // 当previous参数不存在时，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）
            previous = callback(this[i], this[i + 1], i + 1, this);
            i++;
        } else {
            previous = callback(previous, this[i], i, this)
        }
    }
    return previous
}