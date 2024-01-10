export default [
  {
    path: "/copy",
    name: "copy",
    component: () => import("@/page/copy"),
    meta: {
      title: "复制",
    },
  },
  {
    path: "/loading-animation",
    name: "loading-animation",
    component: () => import("@/page/loadingAnimation"),
    meta: {
      title: "loading动画",
    },
  },
  {
    path: "/deep-copy",
    name: "deep-copy",
    component: () => import("@/page/deepCopy"),
    meta: {
      title: "深拷贝",
    },
  },
  {
    path: "/water-animation",
    name: "water-animation",
    component: () => import("@/page/waterAnimation"),
    meta: {
      title: "水滴动画",
    },
  },
  {
    path: "/search-box-animation",
    name: "search-box-animation",
    component: () => import("@/page/searchBoxAnimation"),
    meta: {
      title: "搜索框动画",
    },
  },
  {
    path: "/drop",
    name: "drop",
    component: () => import("@/page/drop"),
    meta: {
      title: "拖拽",
    },
  },
  {
    path: "/text-line",
    name: "text-line",
    component: () => import("@/page/textLine"),
    meta: {
      title: "文字下划线",
    },
  },
  {
    path: "/scroll-loading",
    name: "scroll-loading",
    component: () => import("@/page/scrollLoading"),
    meta: {
      title: "下拉加载更多",
    },
  },
  {
    path: "/snowflake-flutter",
    name: "snowflake-flutter",
    component: () => import("@/page/snowflakeFlutter"),
    meta: {
      title: "雪花飘动",
    },
  },
  {
    path: "/pinyin",
    name: "pinyin",
    component: () => import("@/page/pinyin"),
    meta: {
      title: "中文拼音",
    },
  },
  {
    path: "/tesseract",
    name: "tesseract",
    component: () => import("@/page/tesseract"),
    meta: {
      title: "图片文字识别功能(英文)",
    },
  },
  {
    path: "/editWord",
    name: "editWord",
    component: () => import("@/page/editWord/index.vue"),
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
    component: () => import("@/page/wordcloud/index.vue"),
    meta: {
      title: "echarts词云图",
    },
  },
  {
    path: "/pyramid",
    name: "pyramid",
    component: () => import("@/page/pyramid/index.vue"),
    meta: {
      title: "echarts三角柱状图",
    },
  },
  {
    path: "/url-to-base64",
    name: "url-to-base64",
    component: () => import("@/page/urlToBase64/index.vue"),
    meta: {
      title: "图片url转base64",
    },
  },
  {
    path: "/webgpu",
    name: "webgpu",
    component: () => import("@/page/webgpu/index.vue"),
    meta: {
      title: "webgpu",
    },
  },
  {
    path: "/skeleton",
    name: "skeleton",
    component: () => import("@/page/skeleton/index.vue"),
    meta: {
      title: "自定义指令-骨架屏",
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/page/chat/index.vue"),
    meta: {
      title: "聊天对话框",
    },
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/page/baiduMap/map-box.vue"),
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
];
