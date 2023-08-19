/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:39:51
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-19 16:18:30
 * @FilePath: \snow-vue\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const IconResolver = require("unplugin-icons/resolver");
const { defineConfig } = require('@vue/cli-service')

// const libraryAPI = "http://202.109.255.147:8010";
// 获取当前的域名
// const getHost = () => {
//   const protocol = window.location.protocol;
//   const host = window.location.host;
//   return `${protocol}//${host}`;
// };process.env.VUE_APP_API_URL
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : 'https://console.qzcjrh.cn'
module.exports = defineConfig({
  transpileDependencies: true, // 默认为false, 如果你需要使用babel转译第三方包,需要设置为true
  chainWebpack(config) {
    // config.optimization.minimizer('terser').tap((args) => {
    //   args[0].terserOptions.compress.drop_console = true
    //   return args
    // })

    //gzip压缩
    let productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
    config.plugin('CompressionPlugin').use('compression-webpack-plugin', [
      {
        filename: '[path][base].gz',
        algorithm: 'gzip',
        // 要压缩的文件（正则）
        test: productionGzipExtensions,
        // 最小文件开启压缩
        threshold: 10240, // 10KB
        minRatio: 0.8,
      },
    ]);
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  configureWebpack: {
    resolve: {
      alias: { //配置别名,修改后需要重新编译才能生效
        'assets': '@/assets',
        'components': '@/components',
        'pages': '@/pages',
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconResolver({ componentPrefix: "icon" })] // 遇到前缀为icon自动解析
      })
      // Icons({ compiler: 'vue3', scale: 1, defaultClass: 'inline-block', autoInstall: true })
    ]
  },

  devServer: { // 配置代理,解决跨域问题，只在开发环境下生效，vercel部署后不生效,需要在vercel.json中配置,参考:https://vercel.com/docs/configuration#project/proxy
    proxy: {
      "/api": {
        // target: 'http://localhost:3000',
        target: baseUrl,
        // target: 'https://guopw-api.club',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      },
      // "/library": {
      //   target: libraryAPI,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/library": "/library"
      //   }
      // },
      // '/': {
      //   // target: 'http://localhost:8888',
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   pathRewrite: {},
      // },
      // '/att': {
      //   target: 'https://console.qzcjrh.cn/att',
      //   pathRewrite: {
      //     '^/att': ''
      //   }
      // },
      // '/webSocket': {
      //   target: 'ws://172.16.6.17:8888',
      //   changeOrigin: true,
      //   ws: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/webSocket': '',
      //   },
      // },
    },
  },
})
