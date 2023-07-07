<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 11:08:21
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 11:31:25
 * @FilePath: \snow-vue\src\page\ConfigMap\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="map-container">
        <div v-show="loading" class="el-loading-mask" style="background-color: rgba(0, 0, 0, 0.8)">
            <div class="el-loading-spinner">
                <!-- <img src="@/assets/images/loading.png" alt="" /> -->
            </div>
        </div>
        <div id="mapContainer" class="mapViewDiv"></div>
    </div>
</template>
<script>
export default {
    name: 'ConfigMap',
}
</script>
<script setup>
</script>
<style lang='scss' scoped>
.map-container {
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 2;
    width: 1200px;
    // 缩小地图 底部出现白条
    background-color: transparent;
}

.el-loading-spinner {
    margin-top: 0 !important;
    transform: translateY(-50%);

    .el-icon-loading {
        color: #1d5db0;
    }

    img {
        display: block;
        width: 500px;
        margin: 20px auto;
    }

    .el-loading-text {
        color: #1d5db0;
    }
}

.mapViewDiv,
#mapContainer {
    height: 100vh;
    width: 100vw;
    position: relative;
}

.el-loading-mask {
    width: 100vw;
    height: 100vh;
}
</style>
