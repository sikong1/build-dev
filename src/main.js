/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-30 15:01:35
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-18 09:14:14
 * @FilePath: \snow-vue\src\main.js
 * @Description: 主入口
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Router from '@/router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from "./pinia/pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import loading from '@/components/loading/index.js'
import 'echarts-wordcloud'
import '@/assets/css/index.scss'
import directives from '@/directives'
const app = createApp(App)
// console.log = function () { }
// console.error = function () { }
// console.dir = function () { }
// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus)
app.use(Router)
app.use(pinia).use(directives)
app.use(loading)

app.mount('#app')
