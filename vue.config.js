/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:39:51
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-02-22 10:31:37
 * @FilePath: \snow-vue\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
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
    }
  },

  devServer: {
    proxy: {
      '/': {
        // target: 'http://localhost:8888',
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {},
      },
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
