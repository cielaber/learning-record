import { baseParse, NodeTypes } from "./parse";
import {
  transform,
  getBaseTransformPreset,
  FRAGMENT,
  OPEN_BLOCK,
  CREATE_BLOCK,
  TO_DISPLAY_STRING,
  CREATE_TEXT,
  CREATE_VNODE,
} from "./transform";

export const helperNameMap: any = {
  [FRAGMENT]: `Fragment`,
  [OPEN_BLOCK]: `openBlock`,
  [CREATE_BLOCK]: `createBlock`,
  [CREATE_VNODE]: `createVNode`,
  [TO_DISPLAY_STRING]: `toDisplayString`,
  [CREATE_TEXT]: `createTextVNode`,
};

function createCodegenContext(ast) {
  const newLine = (n) => {
    context.push("\n" + "   ".repeat(n));
  };

  const context = {
    code: ``, // 拼的结果
    push(c) {
      context.code += c;
    },
    helper(key) {
      return `${helperNameMap[key]}`;
    },
    indentLevel: 0, // 缩进次数
    newLine() {
      newLine(context.indentLevel); // 换行
    },
    indent() {
      newLine(++context.indentLevel); // 缩进
    },
    deindent() {
      newLine(--context.indentLevel);
    },
  };

  return context;
}

function genVnodeCall(node, context) {
  const { push, helper } = context;
  const { tag, children, props, patchFlag, isBlock } = node;

  if (isBlock) {
    push(`${helper(OPEN_BLOCK)}(),`);
    // 后面递归处理即可
  }
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.ELEMENT:
      break;
    case NodeTypes.TEXT:
      break;
    case NodeTypes.INTERPOLATION:
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      break;
    case NodeTypes.COMPOUND_EXPRESSION:
      break;
    case NodeTypes.TEXT_CALL:
      break;
    case NodeTypes.VNODE_CALL:
      genVnodeCall(node, context);
      break;
    case NodeTypes.JS_CALL_EXPRESSION:
      break;
  }
}

function generate(ast) {
  const context = createCodegenContext(ast);
  const { push, newLine, indent, deindent } = context;
  push(`const _Vue = Vue`);
  newLine();
  push(`return function render(_ctx){`);
  indent();
  push(`with (_ctx) {`);
  indent();
  push(
    `const { ${ast.helpers
      .map((s) => `${helperNameMap[s]}`)
      .join(", ")} } = _Vue`
  );
  newLine();
  push(`return `); // 需要根据转化后的结果生成字符串
  genNode(ast.codegenNode, context);
  deindent();
  push(`}`);
  deindent();
  push(`}`);

  return context.code;
}

export function baseCompile(template) {
  // 将模板转换成ast
  const ast = baseParse(template);

  const nodeTransforms = getBaseTransformPreset();

  transform(ast, nodeTransforms);

  return generate(ast);
}

// 最终还是new Function
