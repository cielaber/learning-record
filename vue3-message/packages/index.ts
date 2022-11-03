import type { App } from "vue";
import Message from "./message";

const plugins = [
  Message,
  // ...
];

const install = (app: App) => {
  plugins.forEach((plugin) => {
    app.use(plugin as any);
  });
};

export default {
  install,
};
