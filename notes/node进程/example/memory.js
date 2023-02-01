let s = process.memoryUsage()
console.log(s);

// {
//   rss: 29212672, // 常驻内存量，分配的内存总量
//   heapTotal: 4964352, // 堆的总申请量
//   heapUsed: 4014480, // 堆的使用量
//   external: 299796, // 绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量。
//   arrayBuffers: 11158 // 为 ArrayBuffer 和 SharedArrayBuffer 分配的内存，包括所有 Node.js Buffer。该值不算在rss中，是额外分配的，会算在external中。
// }

let buf = Buffer.alloc(1024 * 1024 * 1014)
let ss = process.memoryUsage()
console.log(ss);
/**
 * external和arrayBuffers明显变多了，由此可见buffer的内存是额外分配的
 */
// {
//   rss: 29589504,
//   heapTotal: 5242880,
//   heapUsed: 4312600,
//   external: 1063555900,
//   arrayBuffers: 1063267222
// }