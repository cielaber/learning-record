var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/main.js
var { createApp } = __require("/Users/eternitywith/Desktop/learning-record/\u524D\u7AEF\u5DE5\u7A0B\u5316/vite/my-vite-use/node_modules/vue/dist/vue.runtime.esm-bundler.js");
console.log(createApp);
