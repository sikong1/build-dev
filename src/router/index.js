/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-02 09:17:08
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 14:02:47
 * @FilePath: \snow-vue\src\router\index.js
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory } from "vue-router";
import { nextTick } from 'vue'
// import { ElLoading } from 'element-plus'
// import LoadingVue from '@/components/loading/index.vue'
import useStore from "@/pinia";
import PageRouter from './page' // 页面路由

// 路由配置
const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/index',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/page/register/index.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/page/index'),
    redirect: '/copy',
    children: PageRouter,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/page/404'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

// 前置守卫 增加loading效果
router.beforeEach((to, from, next) => {
  const { loading } = useStore();
  loading.loadingAll.open()
  console.log(to, from, next)
  next()
})

// 后置守卫
router.afterEach((to, from) => {
  console.log(to, from)
  nextTick(() => {
    const { loading } = useStore();
    loading.loadingAll.close()
  })
})


export default router