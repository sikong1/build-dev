<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-09-08 16:42:03
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-09-08 16:43:37
 * @FilePath: \snow-vue\src\page\testPage\child.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div v-if="item.type === 1" class="box one" :class="item.className"></div>
    <div v-else class="box two" :class="item.className"></div>
</template>
<script>
export default {
    name: 'childVue'
}
</script>
<script setup>
defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang='scss' scoped></style>
