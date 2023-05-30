import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Router from '@/router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App)

// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus)
app.use(Router)

app.mount('#app')
