import { createRouter, createWebHashHistory } from "vue-router";
import { nextTick } from 'vue'
// import { ElLoading } from 'element-plus'
// import LoadingVue from '@/components/loading/index.vue'
import useStore from "@/pinia";

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
      {
        path: '/tesseract',
        name: 'tesseract',
        component: () => import('@/page/tesseract'),
        meta: {
          title: '图片文字识别功能(英文)',
        }
      },
      {
        path: '/editWord',
        name: 'editWord',
        component: () => import('@/page/editWord/index.vue'),
        meta: {
          title: '动态转换word（docxtemplater实现）',
        }
      },
      {
        path: '/mapEcharts',
        name: 'mapEcharts',
        component: () => import('@/page/mapEcharts/index.vue'),
        meta: {
          title: 'echarts地图',
        }
      },
      {
        path: '/wordcloud',
        name: 'wordcloud',
        component: () => import('@/page/wordcloud/index.vue'),
        meta: {
          title: 'echarts词云图',
        }
      },
      {
        path: '/pyramid',
        name: 'pyramid',
        component: () => import('@/page/pyramid/index.vue'),
        meta: {
          title: 'echarts金字塔图',
        }
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/page/404'),
  }
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