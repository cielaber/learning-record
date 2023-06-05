import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
import tracker from "../utils/tracker"

export function injectJsError() {
    //监听全局未捕获的错误
    window.addEventListener('error', function (event) {
        console.log(event);
        let lastEvent = getLastEvent(); // 获取最后一个交互事件
        console.log(lastEvent)
        let log = {
            kind: 'stability', // 监控指标的大类
            type: 'error', // 小类，这是一个错误
            errorType: 'jsError', // JS错误
            message: event.message, // 报错信息
            filename: event.filename, // 报错文件
            position: `${event.lineno}:${event.colno}`,
            stack: getLines(event.error.stack),
            selector:  lastEvent ? getSelector(getEventPath(lastEvent)) : '', // 代表最后一个操作的元素
        }
        console.log(log)

        tracker.send(log)
    });

    function getEventPath(event) {
        return event.path || event.composedPath(); // path为非标准属性，chrome在新版本中将其删除了
    }

    function getLines(stack) {
        return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join("^")
    }
}