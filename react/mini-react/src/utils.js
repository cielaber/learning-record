

export const NoFlags = /*                      */ 0b000000000000000000000000;

// 新增、插入
export const Placement = /*                    */ 0b000000000000000000000010;
// 节点更新
export const Update = /*                       */ 0b000000000000000000000100;
// 删除
export const ChildDeletion = /*                */ 0b00000000000000000000001000;
export const ContentReset = /*                 */ 0b00000000000000000000010000;

// These are not really side effects, but we still reuse this field.
export const Incomplete = /*                   */ 0b00000000000100000000000000;
export const Forked = /*                       */ 0b00000010000000000000000000;



export function isStr(s) {
    return typeof s === "string";
}

export function isStringOrNumber(s) {
    return typeof s === "string" || typeof s === "number";
}

export function isFn(fn) {
    return typeof fn === "function";
}

export function isArray(arr) {
    return Array.isArray(arr);
}

export function isUndefined(s) {
    return s === undefined;
}

export function updateNode(node, nextVal) {
    Object.keys(nextVal).forEach(k => {
        if (k === 'children') {
            if (isStringOrNumber(nextVal[k])) {
                node.textContent = nextVal[k]
            }
        } else {
            node[k] = nextVal[k]
        }
    })
}