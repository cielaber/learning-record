import { patchAttr } from "./attr";
import { patchClass } from "./class"
import { patchEvent } from "./event";
import { patchStyle } from "./style";

// 这里处理针对属性的操作
export const patchProp = (el, key, preValue, nextValue) => {
    switch (key) {
        case 'class':
            patchClass(el, nextValue)
            break;
        case 'style':
            patchStyle(el, preValue, nextValue)
            break;
        default:
            // 如果不是事件，就是属性
            if (true) {
                if (/^on[^a-z]/.test(key)) {
                    patchEvent(el, key, nextValue)

                }
            } else {
                patchAttr(el, key, nextValue)
            }
            break;

    }
}