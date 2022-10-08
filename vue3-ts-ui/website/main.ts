import { createApp } from "vue";
import App from './App.vue'
import MyUI from 'my-ui'

// 可以在这里写一个网站，显示所有组件
console.log(App)
createApp(App).use(MyUI).mount('#app')