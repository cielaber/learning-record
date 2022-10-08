export const patchStyle = (el, pre, next) => {
    const style = el.style

    if (next == null) { // style 为空
        el.removeAttribute('style')
    } else {
        // 旧值有，新值没有，删除
        if (pre) {
            for(let key in pre) {
                if(next[key] == null) {
                    style[key] = ''
                }
            }
        }
        // 新值赋值到style上
        for (let key in next) {
            style[key] = next[key]
        }
    }


}
