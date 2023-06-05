function getSelectors(path) {
    return path.reverse().filter(element => {
        return element !== document && element !== window;
    }).map(element => {
        let selector = "";
        if (element.id) {
            selector = `${element.nodeName.toLowerCase()}#${element.id}`
        } else if (element.className && typeof element.className === 'string') {
            selector = `${element.nodeName.toLowerCase()}.${element.className}`;
        } else {
            selector = element.nodeName.toLowerCase();
        }

        return selector
    }).join(' ')
}

export default function (path) {
    if (Array.isArray(path)) {
        return getSelectors(path)
    }
}