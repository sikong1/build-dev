<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-14 11:42:09
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-18 10:26:49
 * @FilePath: \snow-vue\src\page\skeleton\index.vue
 * @Description: 骨架屏
-->
<template>
    <div v-skeleton="firstFlag" class="skeleton">
        <div class="api" v-for="(item, index) in api" :key="index">
            <span>{{ item.name }}</span>
            <!-- <el-input-number v-model="item.value" :step="inputConfig.step" :max="inputConfig.max" :min="inputConfig.min" /> -->
            <span>{{ item.value }}</span>
        </div>
        <div class="api-data">
            <div>
                <p>接口一数据</p>
                <child-first></child-first>
            </div>
            <div>
                <p>接口二数据</p>
                <child-last :lastFlag="lastFlag"></child-last>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SnowVueIndex',
};
</script>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import ChildFirst from './child-first.vue'
import ChildLast from './child-last.vue'


const state = reactive({
    first: 1000,
    last: 5000
})
// const inputConfig = {
//     max: 10000,
//     min: 1000,
//     step: 1000
// }
const api = [
    {
        name: '接口一获取数据时间：',
        value: state.first
    },
    {
        name: '接口二获取数据时间：',
        value: state.last
    }
]

onMounted(() => {
    getApi()
})

const firstFlag = ref(false)
const lastFlag = ref(false)
const getApi = () => {
    firstFlag.value = true
    lastFlag.value = true
    setTimeout(() => {
        firstFlag.value = false
    }, state.first)
    setTimeout(() => {
        lastFlag.value = false
    }, state.last)
}

</script>
<style lang='scss' scoped>
.skeleton {
    .api {
        margin-bottom: 20px;

    }

    .api-data {
        display: flex;

        >div {
            margin: 0 20px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
