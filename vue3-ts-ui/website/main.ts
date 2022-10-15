import { createApp } from "vue";
import App from './App.vue'
// import MyUI from 'my-ui'
// import MyUI from '../lib/index.js' // umd使用
// import MyUI from '../lib/index.esm.js' // esm使用
import Button from '../lib/button/index' // 按需引入
import Icon from '../lib/icon/index' // 按需引入

import "theme-chalk/src/index.scss"

// 可以在这里写一个网站，显示所有组件
console.log(App)
createApp(App).use(Button).use(Icon).mount('#app')