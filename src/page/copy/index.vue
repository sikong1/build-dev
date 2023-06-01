<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-12-07 10:49:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-01-05 11:32:16
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <p>{{ message }}</p>

    <button @click="copy" class="Collection-btn" :data-clipboard-text="message">复制</button>
  </div>
</template>

<script>
export default {
  name: 'SnowVueApp',
};
</script>

<script setup>
import Clipboard from 'clipboard'
import { ElMessage } from "element-plus";

const message = 'message'
const copy = () => {
  let clipboard = new Clipboard('.Collection-btn ')
  console.log(clipboard)
  clipboard.on('success', (e) => {
    // 释放内存
    console.log(e, '复制成功')
    ElMessage.success('复制成功')

    clipboard.destroy()
  })
  clipboard.on('error', (e) => {
    console.log(e, '复制失败');
    ElMessage.error('复制失败')
    // 释放内存
    clipboard.destroy()
  })
}
</script>

<style lang="scss" scoped></style>