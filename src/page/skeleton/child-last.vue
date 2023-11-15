<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-14 14:08:47
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-15 09:37:01
 * @FilePath: \snow-vue\src\page\skeleton\child-last.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div v-skeleton="lastFlag" class="last">
        <div  v-skeleton-item class="img">
            <img src="@/assets/images/avatar.png" alt="">
        </div>
        <span v-skeleton-item>13131313</span>
    </div>
</template>
<script setup>

defineProps({
    lastFlag: {
        type: Boolean,
        default: false
    }
})
</script>
<style lang='scss' scoped>
.last {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .img {
        border-radius: 50%;
        margin-bottom: 20px;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}
</style>
