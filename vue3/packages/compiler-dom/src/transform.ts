import { PatchFlags } from "@vue/shared";
import { NodeTypes } from "./parse";

export const CREATE_VNODE = Symbol("createVnode");
export const TO_DISPLAY_STRING = Symbol("toDisplayString");
export const OPEN_BLOCK = Symbol("openBlock");
export const CREATE_BLOCK = Symbol("createBlock");
export const FRAGMENT = Symbol("Fragment");
export const CREATE_TEXT = Symbol("createTextVNode");

function createVnodeCall(context, tag, props, children, patchFlag) {
  context.helper(CREATE_VNODE);
  return {
    type: NodeTypes.VNODE_CALL,
    tag,
    props,
    children,
    patchFlag,
  };
}

function transformElement(node, context) {
  console.log("处理元素", node, context);
  if (node.type !== NodeTypes.ELEMENT) {
    return;
  }

  return () => {
    console.log("处理元素的回调");

    const { tag, children } = node;
    let vnodeTag = `'${tag}'`;
    let vnodeProps;
    let vnodeChildren;
    let vnodePatchFlag;
    let patchFlag; // 标记标签是否是动态的

    if (children.length > 0) {
      if (children.length === 1) {
        const child = children[0];
        const type = child.type;

        const hasDymanicTextChild =
          type === NodeTypes.INTERPOLATION ||
          type === NodeTypes.COMPOUND_EXPRESSION;
        if (hasDymanicTextChild) {
          patchFlag |= PatchFlags.TEXT;
        }
        vnodeChildren = child;
      } else {
        vnodeChildren = children;
      }
    }

    if (patchFlag !== 0) {
      vnodePatchFlag = patchFlag + "";
    }

    node.codegenNode = createVnodeCall(
      context,
      vnodeTag,
      vnodeProps,
      vnodeChildren,
      vnodePatchFlag
    );
  };
}

function isText(node) {
  return node.type === NodeTypes.INTERPOLATION || node.type === NodeTypes.TEXT;
}

function createCallExpression(callee, args) {
  return {
    type: NodeTypes.JS_CALL_EXPRESSION,
    callee,
    arguments: args,
  };
}

function transformText(node, context) {
  if (node.type === NodeTypes.ROOT || node.type === NodeTypes.ELEMENT) {
    return () => {
      console.log("处理文本的回调");
      // 对元素中的文本进行合并操作
      let hasText = false;
      let children = node.children;
      let container = null;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText(child)) {
          hasText = true; // 当前元素有文本，需要合并
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            if (isText(next)) {
              if (!container) {
                container = children[i] = {
                  type: NodeTypes.COMPOUND_EXPRESSION,
                  loc: child.loc,
                  children: [child],
                };
                container.children.push(`+`, next);
                children.splice(j, 1);
                j--;
              }
            } else {
              container = null;
              break;
            }
          }
        }
      }
      // 文本需要增加 createText方法 helper里增加
      if (!hasText || children.length === 1) {
        // 在只有一个孩子的时候，直接innerHTML 无需createText
        return;
      }

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText(child) || child.type === NodeTypes.COMPOUND_EXPRESSION) {
          const callArgs = [];
          callArgs.push(child);
          if (child.type !== NodeTypes.TEXT) {
            callArgs.push(PatchFlags.TEXT + "");
          }

          children[i] = {
            type: NodeTypes.TEXT_CALL,
            content: child,
            loc: child.loc,
            codegenNode: createCallExpression(
              // 用于最后生成代码的
              context.helper(CREATE_TEXT),
              callArgs
            ),
          };
        }
      }
    };
  }
}

export function getBaseTransformPreset() {
  return [transformElement, transformText];
}

function createTransformContext(root, nodeTransforms) {
  // context的目的是为了传参方便
  const context = {
    root,
    currentNode: root, // 当前节点会随着树的遍历而更新
    nodeTransforms,
    helpers: new Set(),
    // 代码中用到了具体方法，需要调用此方法，将对应的名字加入到helpers中
    helper(name) {
      context.helpers.add(name);
      return name;
    },
  };

  return context;
}

// 深度优先
function traverseChildren(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    traverseNode(child, context);
  }
}

function traverseNode(node, context) {
  const { nodeTransforms } = context;
  context.currentNode = node;

  const exits = [];
  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context);
    if (onExit) {
      exits.push(onExit);
    }
  }

  switch (node.type) {
    case NodeTypes.ROOT:
    case NodeTypes.ELEMENT:
      traverseChildren(node, context);
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING);
  }

  let i = exits.length;

  context.currentNode = node;

  while (i--) {
    exits[i]();
  }
}

function createRootCodegen(root, context) {
  const { helper } = context;
  const children = root.children;

  helper(OPEN_BLOCK);
  helper(CREATE_BLOCK);
  if (children.length === 1) {
    const child = children[0];
    const codegen = child.codegenNode;

    codegen.isBlock = true; // 只有一个儿子，他就是blocktree的根节点

    root.codegenNode = codegen;
  } else if (children.length > 1) {
    root.codegenNode = createVnodeCall(
      context,
      helper(FRAGMENT),
      undefined,
      children,
      PatchFlags.STABLE_FRAGMENT
    );
    root.codegenNode.isBlock = true;
  }
}

export function transform(root, nodeTransforms) {
  const context = createTransformContext(root, nodeTransforms);
  traverseNode(root, context);

  // 根节点
  createRootCodegen(root, context);

  root.helpers = [...context.helpers];
}
