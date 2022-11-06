import { baseParse } from "./parse";
import { transform, getBaseTransformPreset } from "./transform";

export function baseCompile(template) {
  // 将模板转换成ast
  const ast = baseParse(template);

  const nodeTransforms = getBaseTransformPreset();

  transform(ast, nodeTransforms);

  return ast;
}
