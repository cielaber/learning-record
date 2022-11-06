export const enum NodeTypes {
  ROOT, // fragment 解决多个根元素问题
  ELEMENT,
  TEXT,
  SIMPLE_EXPRESSION = 4, // 简单表达式：{{}}中间的内容
  INTERPOLATION = 5, // {{}}
  ATTRIBUTE = 6,
  DIRECTIVE = 7,
  COMPOUND_EXPRESSION = 8, // 组合表达式 `{{name}} hello`
  TEXT_CALL = 12, // createTextVnode
  VNODE_CALL = 13,
  JS_CALL_EXPRESSION = 17,
}

// 判断是不是解析完毕，context.source为空
function isEnd(context) {
  const source = context.source;

  if (source.startsWith("</")) {
    // 如果是结尾标签，直接结束
    return true;
  }

  return !source;
}

function advanceSpace(context) {
  const match = /^[ \t\r\n]+/.exec(context.source);

  if (match) {
    advanceBy(context, match[0].length);
  }
}

function parseTag(context) {
  const start = getCursor(context);
  const match = /^<\/?([a-z][^ \t\r\n/>]*)/i.exec(context.source);
  const tag = match[1];

  advanceBy(context, match[0].length);
  advanceSpace(context);

  const isSelfClosing = context.source.startsWith("/>");

  advanceBy(context, isSelfClosing ? 2 : 1);

  return {
    type: NodeTypes.ELEMENT,
    tag,
    isSelfClosing,
    loc: getSelection(context, start),
  };
}

function parseElement(context) {
  // 解析标签名
  let ele: any = parseTag(context);

  // 处理子节点
  const children = parseChildren(context);

  if (context.source.startsWith("</")) {
    parseTag(context); // 解析关闭标签时，移除关闭信息并更新偏移量
  }

  ele.children = children;

  ele.loc = getSelection(context, ele.loc.start);

  return ele;
}

function parseInterpolation(context) {
  const start = getCursor(context);
  const closeIndex = context.source.indexOf("}}", "{{");

  advanceBy(context, 2);

  const innerStart = getCursor(context);
  const innerEnd = getCursor(context);
  const rawContentLength = closeIndex - 2;

  const preTrimContent = parseTextData(context, rawContentLength);
  const content = preTrimContent.trim();
  const startOffset = preTrimContent.indexOf(content);

  // 前面有空格
  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, preTrimContent, startOffset);
  }

  const endOffset = content.length + startOffset;
  advancePositionWithMutation(innerEnd, preTrimContent, endOffset);

  advanceBy(context, 2);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      loc: getSelection(context, innerStart, innerEnd),
      content,
    },
    loc: getSelection(context, start),
  };
}

function getCursor(context) {
  let { line, column, offset } = context;

  return {
    line,
    column,
    offset,
  };
}

function advancePositionWithMutation(context, s, endIndex) {
  let linesCount = 0;
  let linesPos = -1;
  for (let i = 0; i < endIndex; i++) {
    if (s.charCodeAt(i) === 10) {
      // 遇到换行符就涨一行
      linesCount++;
      linesPos = i; // 换行后第一个的位置
    }
  }
  context.offset += endIndex;
  context.line += linesCount;
  context.column =
    linesPos === -1 ? context.column + endIndex : endIndex - linesPos;
}

function advanceBy(context, endIndex) {
  let s = context.source;

  // 计算出一个新的结束位置
  advancePositionWithMutation(context, s, endIndex); // 根据内容和结束索引来修改上下文信息

  context.source = s.slice(endIndex); // 截取内容
}

function parseTextData(context, endIndex) {
  const rawText = context.source.slice(0, endIndex);

  advanceBy(context, endIndex); // 在context.source中把文本内容删除掉

  return rawText;
}

// 获取这个信息对应的开始、结束、内容
function getSelection(context, start, end?) {
  end = end || getCursor(context);

  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset),
  };
}

// 文本处理
function parseText(context) {
  const endTokens = ["<", "{{"];
  let endIndex = context.source.length; // 文本的长度

  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }
  let start = getCursor(context);

  const content = parseTextData(context, endIndex);

  return {
    type: NodeTypes.TEXT,
    content,
    loc: getSelection(context, start),
  };
}

// 根据内容做不同的处理
function parseChildren(context) {
  const nodes = [];

  while (!isEnd(context)) {
    const s = context.source; // 当前上下文中的内容

    let node;
    if (s[0] === "<") {
      // 标签
      node = parseElement(context);
    } else if (s.startsWith("{{")) {
      // 表达式
      node = parseInterpolation(context);
    } else {
      // 文本
      node = parseText(context);
    }
    nodes.push(node);
  }

  nodes.forEach((node, index) => {
    if (node.type === NodeTypes.TEXT) {
      if (!/[^ \t\r\n]/.test(node.content)) {
        nodes[index] = null;
      } else {
        node.content = node.content.replace(/[ \t\r\n]+/g, " ");
      }
    }
  });

  return nodes.filter(Boolean);
}

function createParserContext(content) {
  return {
    line: 1,
    column: 1,
    offset: 0,
    source: content, // source会被不断的移除，直到source为空
    originalSource: content, // 记录传入的内容
  };
}

function createRoot(children, loc) {
  return {
    type: NodeTypes.ROOT,
    children,
    loc,
  };
}

export function baseParse(content) {
  // 标识节点信息：行、列、偏移量
  // 每解析一段就移除一部分
  const context = createParserContext(content);

  const start = getCursor(context);

  return createRoot(parseChildren(context), getSelection(context, start));
}
