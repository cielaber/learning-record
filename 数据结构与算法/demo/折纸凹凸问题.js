/**
 * 折纸问题
 * 请把一段纸条竖着，然后从下往上对折一次，压出折痕后展开，此时折痕是凹下去的，即折痕凸起方向为纸条的背面。
 * 如果从纸条的下边向上连续对着两次，压出折痕后展开，此时有三条折痕，从上往下依次是下折痕、下折痕、上折痕。
 * 给定一个输入参数n，代表纸条都从下边往上连续对着n次。请从上到下打印所有折痕的方向。
 * 解题：规律发现，第i次生成的折痕后，第i+1次生成折痕是第i次折痕的两倍，且第i次生成的折痕每个折痕的上方都会生成一个凹折痕，下方都会生成一个凸折痕。是一个二叉树，且从上到下的顺序就是树中序遍历的顺序。
 * 
 */

function printAllFolds(n) {
    printProcess(1, n, true)
}

function printProcess(i, n, down) {
    if (i > n) return
    printProcess(i + 1, n, true)
    console.log(down ? "凹" : "凸")
    printProcess(i + 1, n, false)
}