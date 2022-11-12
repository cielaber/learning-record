/**
 * string与String的区别
 * string表示类型，而String表示类。
 * 类也可以用来当作类型，但是对于new String()出来的实例，只能用String来声明。
 */

let str1: string = "string";
let str2: String = "string";
let str3: string = String("string");
let str4: String = new String("string");
// let str5: string = new String('string') // 这种不可以

/**
 * tuple：元组，ts特有的类型，内容固定、类型固定
 */
let tuple: [string, boolean, number] = ["1", true, 1];

/**
 * enum：枚举
 */

// 枚举默认为数字枚举，其值从0递增
enum ROLE {
  USER,
  ADMIN,
  MANAGER,
}
console.log(ROLE.USER);
// 数字枚举支持反举
console.log(ROLE[0]);

// 字符串枚举
enum ROLE1 {
  USER = "user",
  ADMIN = "admin",
  MANAGER = "manager",
}
console.log(ROLE1.USER);
// console.log(ROLE1["user"]); // 字符串枚举不支持反向枚举

// 异构枚举 即数字和字符串的混合
enum ROLE2 {
  USER = "user",
  ADMIN = 0,
  MANAGER,
}
console.log(ROLE2.USER);
// console.log(ROLE2["user"]); // 字符串枚举不支持反向枚举
console.log(ROLE2[0]);

// 常量枚举
const enum ROLE3 {
  USER,
  ADMIN,
  MANAGER,
}
console.log(ROLE3.USER);
// 数字枚举支持反举
// console.log(ROLE3[0]); // 常量枚举不支持反举

/**
 * TS的全局变量的影响
 */
let name;
// 默认情况下name变量无法被声明，由于ts全局文件中(lib.dom.d.ts)声明了此变量，要想允许声明改变量，可以在本文件中使用`export {}`，声明一个导出，代表该文件是一个模块，没有导出的ts会被全局合并，所以无法被重复声明。
export {};

/**
 * null、undefined：非严格模式下，null和undefined是任何类型的子类型，即其可以赋给任何类型。
 * 条件是：关闭tsconfig.json中严格模式中的strictNullChecks校验："strictNullChecks": false
 */
let num: number = undefined;

/**
 * never：表示：
 *    1.代码无法达到终点
 *    2.无法执行到结尾
 *    3.出错/异常
 *    4.死循环
 *    5.永远走不到的判断
 *
 * 是任何类型的子类型，一般用于给函数声明类型。
 *
 * 可以用于：
 *    1.做代码的完整性校验
 */

/**
 * void：表示函数返回值，也可以用于描述变量，该类型只能赋予null和undefined
 * 严格模式下不能把null赋给void类型
 */

/**
 * object：表示非原始数据类型
 */

/**
 * js中的类型：Symbol、BigInt
 */
