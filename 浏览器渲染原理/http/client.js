const net = require("net");
// 自定义的一个http响应的parser，用于解析http的响应内容
const HttpParser = require("./http-parser");
const HtmlParser = require("htmlparser2");
const css = require("css");

class HTTPRequest {
  constructor(options = {}) {
    this.host = options.host;
    this.method = options.method || "GET";
    this.path = options.path || "/";
    this.port = options.port || 80;
    this.headers = options.headers;
  }

  send() {
    return new Promise((resolve, reject) => {
      // 构建http请求
      const rows = [];
      rows.push(`${this.method} ${this.path} HTTP/1.1`);

      Object.keys(this.headers).forEach((key) => {
        rows.push(`${key}: ${this.headers[key]}`);
      });

      let data = rows.join("\r\n") + "\r\n\r\n";

      // 创建tcp连接，传输数据
      let socket = net.createConnection(
        {
          host: this.host,
          port: this.port,
        },
        () => {
          socket.write(data);
        }
      );
      const parser = new HttpParser();
      socket.on("data", function (chunk) {
        // console.log(chunk.toString());
        parser.parse(chunk);
        let result = parser.result;
        if (result) {
          resolve(result);
        }
      });
    });
  }
}

function parserCss(styleText) {
  const ast = css.parse(styleText);
  console.log(ast.stylesheet);
}

async function request() {
  const request = new HTTPRequest({
    host: "127.0.0.1",
    method: "GET",
    port: 3000,
    headers: {
      name: "zhangsan",
      age: 18,
    },
  });

  let { responseLine, headers, body } = await request.send();

  console.log(body);

  // http => http-parser(解析http响应并拿到body，也就是html) => dom tree词法分析
  // 解析后需要生成tree，一个典型的栈型结构
  let stack = [{ type: "document", children: [] }];
  const parser = new HtmlParser.Parser({
    onopentag(name, attributes) {
      console.log("start", name, attributes);

      let parent = stack[stack.length - 1];
      let element = {
        tagName: name,
        attributes,
        children: [],
        parent,
      };
      parent.children.push(element);
      stack.push(element);
    },
    ontext(text) {
      console.log("text", text);
      let parent = stack[stack.length - 1];
      let textNode = {
        type: "text",
        text,
      };
      parent.children.push(textNode);
    },
    onclosetag(name) {
      console.log("name", name);

      let parent = stack[stack.length - 1];

      // 解析css
      if (name === "style") {
        // console.log(parent.children[0].text);
        let styleText = parent.children[0].text;
        parserCss(styleText);
      }
      stack.pop();
    },
  });
  parser.end(body);
  //   console.dir(stack, { depth: null });

  // TODO: 结合dom和cssom生成渲染树，并模拟渲染。
}

request();
