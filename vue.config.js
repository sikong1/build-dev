/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:39:51
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-10-27 23:48:59
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
  }
})
