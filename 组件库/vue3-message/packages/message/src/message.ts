import { createVNode, render, VNode } from "vue";
import { IMessageParams } from "./message.types";
import MessageComponent from "./message.vue";

const instances: VNode[] = [];

const Message = (options: IMessageParams) => {
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }

  // 计算偏移量
  let offset = options.offset || 20;
  instances.forEach((vm) => {
    offset += vm.el!.offsetHeight + 20; // 每多创建一个，位置就往下移20
  });

  let userClose = options.onClose;

  let opts = {
    ...options,
    offset,
    onClose: () => {
      // TODO: 当移除的时候需要把位置进行一个调整，把位置向上移，移除实例
      // 根据id移除
      // ...

      userClose?.(); // 调用用户的onClose
    },
  };

  // 创建一个容器
  const contanier = document.createElement("div");

  // 将组件创建为虚拟节点
  const vm = createVNode(MessageComponent, opts as any);

  // 手动挂载一个onDestroy事件
  vm.props!.onDestroy = () => {
    render(null, contanier); // 传入null可以移除dom
  };

  // 将虚拟节点挂载到容器中
  render(vm, contanier);

  // 渲染到页面
  document.body.appendChild(contanier.firstElementChild!);

  // 保存实例
  instances.push(vm);
};

export default Message;
