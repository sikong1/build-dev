/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-30 15:01:35
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2024-05-10 17:20:38
 * @FilePath: \snow-vue\src\main.js
 * @Description: 主入口
 */
import { createApp } from 'vue'
import Router from '@/router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from "./pinia/pinia";
import loading from '@/components/loading/index.js'
import '@/assets/css/index.scss'
import directives from '@/directives'
import skeleton from 'sikong-skeleton-screen'

const app = createApp(App)
app.use(Router)
app.use(pinia).use(directives)
app.use(skeleton)
app.use(loading)

app.mount('#app')
