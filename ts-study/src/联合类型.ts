/**
 * 联合类型
 */
let numOrStr: string | number;

/**
 * 联合类型在没有确定类型之前，只能调用两个类型公用的方法。
 *
 * 如果确定当前是联合类型中的某个类型，可以使用强制转换。
 */

// 强制转换成联合类型中的某一种
<number>numOrStr;
// 与as不同的是，该方法只能转换联合类型中的某一种，而as能转成任意。
numOrStr as any as boolean;

/**
 * 字面量类型：类型的内容是固定的值
 */
let type: "a" | "b" | 1;
