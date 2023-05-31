import { createRouter, createWebHashHistory } from "vue-router";
import { ElLoading } from 'element-plus'
// import useStore from "@/pinia";

// 路由配置
const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/page/index'),
    children: [
      {
        path: '/copy',
        name: 'copy',
        component: () => import('@/page/copy'),
        meta: {
          title: '复制'
        }
      },
      {
        path: '/loading-animation',
        name: 'loading-animation',
        component: () => import('@/page/loadingAnimation'),
        meta: {
          title: 'loading动画'
        }
      },
      {
        path: '/deep-copy',
        name: 'deep-copy',
        component: () => import('@/page/deepCopy'),
        meta: {
          title: '深拷贝'
        }
      },
      {
        path: '/water-animation',
        name: 'water-animation',
        component: () => import('@/page/waterAnimation'),
        meta: {
          title: '水滴动画'
        }
      },
      {
        path: '/search-box-animation',
        name: 'search-box-animation',
        component: () => import('@/page/searchBoxAnimation'),
        meta: {
          title: '搜索框动画'
        }
      },
      {
        path: '/drop',
        name: 'drop',
        component: () => import('@/page/drop'),
        meta: {
          title: '拖拽'
        }
      },
      {
        path: '/text-line',
        name: 'text-line',
        component: () => import('@/page/textLine'),
        meta: {
          title: '文字下划线',
        }
      },
      {
        path: '/scroll-loading',
        name: 'scroll-loading',
        component: () => import('@/page/scrollLoading'),
        meta: {
          title: '下拉加载更多',
        }
      },
      {
        path: '/snowflake-flutter',
        name: 'snowflake-flutter',
        component: () => import('@/page/snowflakeFlutter'),
        meta: {
          title: '雪花飘动',
        }
      },
      {
        path: '/pinyin',
        name: 'pinyin',
        component: () => import('@/page/pinyin'),
        meta: {
          title: '中文拼音',
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

// 前置守卫 增加loading效果
router.beforeEach((to, from, next) => {
  // const { loading } = useStore();
  // loading.setLoadingAll(true);
  console.log(to, from, next)
  next()
})

// 后置守卫 关闭loading效果
router.afterEach((to, from) => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
  console.log(to, from)
})


export default router