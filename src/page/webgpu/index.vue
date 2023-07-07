<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 14:57:23
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 15:56:49
 * @FilePath: \snow-vue\src\page\webgpu\index.vue
 * @Description: webgpu
-->
<template>
    <el-tabs :tab-position="tabPosition" v-model="currentComponent" class="demo-tabs">
        <el-tab-pane v-for="(item, index) in componentArr" :key="index" :name="item.name" :label="item.label">
            <component v-if="currentComponent === item.name" :is="item.component"></component>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: 'WebgpuVue',
}
</script>
<script setup>
import triangleList from './triangleList.vue'
import newTriangleList from './newTriangleList.vue'
import { ref } from 'vue'

const componentArr = [
    {
        name: 'triangleList',
        component: triangleList,
        label: '三角形1'
    },
    {
        name: 'newTriangleList',
        component: newTriangleList,
        label: '三角形2'
    },
]

const currentComponent = ref(componentArr[0].name)
const tabPosition = ref('left')
</script>
<style lang='scss' scoped></style>
