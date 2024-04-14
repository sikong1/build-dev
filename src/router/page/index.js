const Copy = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/copy')
const LoadingAnimation = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/loadingAnimation')
const DeepCopy = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/deepCopy')
const WaterAnimation = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/waterAnimation')
const SearchBoxAnimation = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/searchBoxAnimation')
const Drop = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/drop')
const TextLine = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/textLine')
const ScrollLoading = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/scrollLoading')
const SnowflakeFlutter = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/snowflakeFlutter')
const Pinyin = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/pinyin')
const Tesseract = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/tesseract')
const EditWord = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/editWord/index.vue')
const Wordcloud = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/wordcloud/index.vue')
const Pyramid = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/pyramid/index.vue')
const UrlToBase64 = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/urlToBase64/index.vue')
const Webgpu = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/webgpu/index.vue')
const Skeleton = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/skeleton/index.vue')
const Chat = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/chat/index.vue')
const BaiduMap = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/baiduMap/map-box.vue')
const BreakpointContinuation = () => import( /* webpackChunkName: 'ImportFuncDemo' */ '@/page/breakpoint-continuation/index.vue')

export default [
  {
    path: "/copy",
    name: "copy",
    component: Copy,
    meta: {
      title: "复制",
    },
  },
  {
    path: "/loading-animation",
    name: "loading-animation",
    component: LoadingAnimation,
    meta: {
      title: "loading动画",
    },
  },
  {
    path: "/deep-copy",
    name: "deep-copy",
    component: DeepCopy,
    meta: {
      title: "深拷贝",
    },
  },
  {
    path: "/water-animation",
    name: "water-animation",
    component: WaterAnimation,
    meta: {
      title: "水滴动画",
    },
  },
  {
    path: "/search-box-animation",
    name: "search-box-animation",
    component: SearchBoxAnimation,
    meta: {
      title: "搜索框动画",
    },
  },
  {
    path: "/drop",
    name: "drop",
    component: Drop,
    meta: {
      title: "拖拽",
    },
  },
  {
    path: "/text-line",
    name: "text-line",
    component: TextLine,
    meta: {
      title: "文字下划线",
    },
  },
  {
    path: "/scroll-loading",
    name: "scroll-loading",
    component: ScrollLoading,
    meta: {
      title: "下拉加载更多",
    },
  },
  {
    path: "/snowflake-flutter",
    name: "snowflake-flutter",
    component: SnowflakeFlutter,
    meta: {
      title: "雪花飘动",
    },
  },
  {
    path: "/pinyin",
    name: "pinyin",
    component: Pinyin,
    meta: {
      title: "中文拼音",
    },
  },
  {
    path: "/tesseract",
    name: "tesseract",
    component: Tesseract,
    meta: {
      title: "图片文字识别功能(英文)",
    },
  },
  {
    path: "/editWord",
    name: "editWord",
    component: EditWord,
    meta: {
      title: "动态转换word（docxtemplater实现）",
    },
  },
  // {
  //   path: "/mapEcharts",
  //   name: "mapEcharts",
  //   component: () => import("@/page/mapEcharts/index.vue"),
  //   meta: {
  //     title: "echarts地图",
  //   },
  // },
  {
    path: "/wordcloud",
    name: "wordcloud",
    component: Wordcloud,
    meta: {
      title: "echarts词云图",
    },
  },
  {
    path: "/pyramid",
    name: "pyramid",
    component: Pyramid,
    meta: {
      title: "echarts三角柱状图",
    },
  },
  {
    path: "/url-to-base64",
    name: "url-to-base64",
    component: UrlToBase64,
    meta: {
      title: "图片url转base64",
    },
  },
  {
    path: "/webgpu",
    name: "webgpu",
    component: Webgpu,
    meta: {
      title: "webgpu",
    },
  },
  {
    path: "/skeleton",
    name: "skeleton",
    component: Skeleton,
    meta: {
      title: "自定义指令-骨架屏",
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    meta: {
      title: "聊天对话框",
    },
  },
  {
    path: "/map",
    name: "map",
    component: BaiduMap,
    meta: {
      title: "百度地图",
    },
  },
  // {
  //   path: "/gis",
  //   name: "gis",
  //   component: () => import("@/gis.vue"),
  //   meta: {
  //     title: "arcgis",
  //   },
  // },
  // {
  //   path: "/carousel",
  //   name: "carousel",
  //   component: () => import("@/page/carousel/index.vue"),
  //   meta: {
  //     title: "轮播图",
  //   },
  // },
  {
    path: "/breakpoint-continuation",
    name: "breakpointContinuation",
    component: BreakpointContinuation,
    meta: {
      title: "断点续传",
    },
  }
];
