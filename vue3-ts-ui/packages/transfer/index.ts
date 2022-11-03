import Transfer from "./src/index.vue";

import { App } from "vue";

Transfer.install = (app: App): void => {
  app.component(Transfer.name, Transfer);
};

// 在原有类型上新增install方法
type IWithInstall<T> = T & { install(app: App): void };

const _Transfer: IWithInstall<typeof Transfer> = Transfer;

export default _Transfer;
