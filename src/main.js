import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Router from '@/router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App)
console.log = function () { }
console.error = function () { }
console.dir = function () { }
// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus)
app.use(Router)
app.use(createPinia())

app.mount('#app')
