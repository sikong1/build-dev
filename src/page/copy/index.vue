<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-12-07 10:49:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 11:45:40
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <p>{{ message }}</p>

    <button @click="copyClick" class="Collection-btn" :data-clipboard-text="message">复制</button>
  </div>
</template>

<script>
export default {
  name: 'SnowVueApp',
};
</script>

<script setup>
import { copy } from '@/utils/copy'

const message = 'message'
const copyClick = () => {
  copy('.Collection-btn')
}
</script>

<style lang="scss" scoped></style>