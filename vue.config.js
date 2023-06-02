/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:39:51
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-03-08 14:53:56
 * @FilePath: \snow-vue\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const IconResolver = require("unplugin-icons/resolver");
const { defineConfig } = require('@vue/cli-service')

const libraryAPI = "http://202.109.255.147:8010";
// 获取当前的域名
// const getHost = () => {
//   const protocol = window.location.protocol;
//   const host = window.location.host;
//   return `${protocol}//${host}`;
// };
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack(config) {
  //   config.optimization.minimizer('terser').tap((args) => {
  //     args[0].terserOptions.compress.drop_console = true
  //     return args
  //   })
  // },
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

  devServer: {
    proxy: {
      "/api": {
        target: 'https://guopw.club',
        // target: 'http://guopw.club:3008',
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
