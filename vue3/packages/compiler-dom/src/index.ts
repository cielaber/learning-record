import { baseParse } from "./parse";

export function baseCompile(template) {
  // 将模板转换成ast
  const ast = baseParse(template);

  return ast;
}
