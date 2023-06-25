import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import UI from "../packages";
import "../packages/theme-chalk/index.scss";

createApp(App).use(UI).mount("#app");
