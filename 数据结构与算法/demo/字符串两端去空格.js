function trim(str) {
    let l = 0, r = str.length - 1
    for(let i = 0; i < str.length; i++) {
        if (str.charAt(l) === ' ') {
            l++
        }
        if (str.charAt(r) === ' ') {
            r--
        }
        if (l >= r) break
    }
    return str.slice(l, r + 1);
}

function trim1(str) {
    let s
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === ' ') {
            s = str.slice(i + 1)
        } else {
            break
        }
    }
    for (let i = s.length - 1; i >= 0;i--) {
        if (s.charAt(i) === ' ') {
            s = s.slice(0, i + 1)
        } else {
            break
        }
    }
    return s
}