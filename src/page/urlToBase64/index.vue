<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 11:14:16
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 11:58:23
 * @FilePath: \snow-vue\src\page\urlToBase64\index.vue
 * @Description: 图片转成base64 
-->
<template>
    <div class="to-base">
        <div class="top">
            <el-input :placeholder="tips" v-model="inputObj.value"></el-input>
            <el-button style="margin-left: 20px;" @click="startClick" type="primary" round>开始转换</el-button>
        </div>
        <div class="box" v-if="res">
            <span class="Collection-url-to-base" :data-clipboard-text="res">{{ res }}</span>
            <el-button size="small" @click="copyClick">复制</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'urlToBase64',
}
</script>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useImageToBase from '@/hooks/useImageToBase'
import { copyProtogenesis } from '@/utils/copy'

const { start } = useImageToBase()
const tips = '请输入图片url'
const inputObj = reactive({
    value: '',
    size: 'small',
})
const res = ref('')

// 开始转换
const startClick = async () => {
    // 去空
    res.value = ''
    // 判空
    if (!inputObj.value) {
        return ElMessage.warning(tips)
    }
    // 转换
    res.value = await start(inputObj.value).catch(() => {
        ElMessage.error('转换失败')
    })
}

// 复制
const copyClick = () => {
    copyProtogenesis(res.value)
}
</script>
<style lang='scss' scoped>
.to-base {
    .top {
        display: flex;
        justify-content: space-between;
    }

    .box {
        border: 1px solid #ccc;
        margin-top: 20px;
    }
}
</style>
