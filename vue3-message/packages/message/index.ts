import type { App } from "vue";
import Message from "./src/message";

(Message as any).install = function (app: App) {
  // 兼容vue2，在this中使用
  app.config.globalProperties.$message = Message;
};

export { Message };

export default Message;
