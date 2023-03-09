<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-03-09 14:45:13
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-03-09 14:45:26
 * @FilePath: \snow-vue\src\pages\ConfigMap\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="map-container">
    <div v-show="loading" class="el-loading-mask" style="background-color: rgba(0, 0, 0, 0.8)">
      <div class="el-loading-spinner">
        <!-- <img src="@/assets/images/loading.png" alt="" /> -->
      </div>
    </div>
    <!-- <ul class="point-list">
                <li v-for="point, index in point.pointList" @click="handlePointClick(point)">点位{{index + 1}}</li>
              </ul> -->
    <!-- <div class="mapbutton" @click="showVisual()"><el-button>当前视角</el-button></div> -->
    <!-- <div id="map" class="mapViewDiv" :style="Style.mapStyle"> -->
    <div id="mapContainer" class="mapViewDiv"></div>
  </div>
</template>

<script>
export default {
  name: 'SnowVueIndex',
  data() {
    return {

    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // 缩小地图 底部出现白条
  background-color: #162733;
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
  height: 100%;
  width: 100%;
  position: relative;
}
</style>