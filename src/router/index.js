/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-02 09:17:08
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-26 16:01:05
 * @FilePath: \snow-vue\src\router\index.js
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory } from "vue-router"
import { nextTick } from "vue"
// import { ElLoading } from 'element-plus'
// import LoadingVue from '@/components/loading/index.vue'
import useStore from "@/pinia"
import PageRouter from "./page" // 页面路由

// 路由配置
const routes = [
  {
    path: "/",
    name: "app",
    redirect: "/articles"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/index.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/page/login/index.vue")
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import("@/page/articles/index.vue")
  },
  {
    path: "/article/:id",
    name: "article-detail",
    component: () => import("@/page/articles/ArticleDetail.vue")
  },
  {
    path: "/write",
    name: "write",
    component: () => import("@/page/write/index.vue")
  },
  {
    path: "/tool",
    name: "tool",
    component: () => import("@/page/index"),
    redirect: "/copy",
    children: PageRouter
  },
  {
    // 404页面，必须放在最后
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/page/404")
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 前置守卫 增加loading效果
router.beforeEach((to, from, next) => {
  const { loading } = useStore()
  loading.loadingAll.open()
  next()
})

// 后置守卫
router.afterEach(() => {
  nextTick(() => {
    const { loading } = useStore()
    loading.loadingAll.close()
  })
})

export default router
