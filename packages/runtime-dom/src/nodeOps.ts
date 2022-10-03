export const nodeOps = {
    // 创建
    createElement: tagName => document.createElement(tagName),

    // 删除
    remove: child => {
        const parent = child.parentNode;
        if(parent) {
            parent.removeChild(child)
        }
    },

    // 插入
    insert: (child, parent, anchor = null) => {
        parent.insertBefore(child,anchor)
    },

    // 查找
    querySelector: selector => document.querySelector(selector),

    // 设置标签文本
    setElementText: (el, text) => el.textContext = text,

    // 创建文本
    createText: text => document.createTextNode(text),

    setText: (node, text) => node.nodeValue = text,



}