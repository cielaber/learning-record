function getDeep(o) {
    let max = 0
    let d
    if (Array.isArray(o)) {
        for(let i = 0; i < o.length; i++) {
            d =  getDeep(o[i])
        }
    } else {
        for (const key in o) {
            d =  getDeep(o[key])
        }
    }
    max = d > max ? d : max
    return max + 1
}