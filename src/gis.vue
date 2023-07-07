<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-02-21 11:27:13
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 14:32:55
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="map-container">
    <!-- <div v-show="lodding" class="el-loading-mask" style="background-color: rgba(0, 0, 0, 0.8)">
      <div class="el-loading-spinner">
      </div>
    </div> -->
    <!-- <img src="@/assets/images/loading.png" alt="" /> -->
    <div id="mapContainer" class="mapViewDiv"></div>
  </div>
</template>

<script>
// import ConfingMap from '@/page/ConfigMap/index.vue';
// import MapPoint from '@/pages/ConfigMap/MapPoint.vue';
import { init, create2DView } from '@/utils/map/map';
import config from '@/utils/map/appConfig'
import { viewDiv } from './utils/point/point';
export default {
  name: 'gisVue',
  components: {
    // ConfingMap,
    // MapPoint
  },
  data() {
    return {
      lodding: false,
    };
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      init().then(async () => {
        // create3DView();
        await create2DView().then(() => {
          config.activeView.on("click", (event) => {
            console.log(event, 'eventevent');
            config.activeView.hitTest(event).then((info) => {
              // info.results[0].graphic.attributes 就是你要的点位数据
              console.log(info.results, info.results[0].graphic.attributes, 'info');
            });
          })
          this.lodding = true

          // 打点
          viewDiv([{
            longitude: 118.129794,
            latitude: 24.495605,
            name: '测试点位',
            id: 1
          }], 'point')
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.esri-popup__pointer) {
  display: none;
}

.map-container {
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 2;
  width: 1200px;
  height: 500px;
  // 缩小地图 底部出现白条
  background-color: transparent;
}

.mapViewDiv,
#mapContainer {
  height: 500px;
  width: 500px;
  position: relative;
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

// .mapbutton {
//   position: absolute;
//   z-index: 33;
//   left: 55vw;
//   top: 40vh;
// }

// .point-list {
//   position: absolute;
//   left: 10%;
//   top: 20%;
//   z-index: 99;
//   height: 500px;
//   overflow: scroll;

//   li {
//     color: #fff;
//     line-height: 30px;
//     cursor: pointer;
//   }
// }
.tool {
  position: fixed;
  bottom: -15px;
  z-index: 99;
  right: 10px;
  cursor: pointer;

  width: 28px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(193, 193, 193, 0.5);
  border-radius: 6px 6px 6px 6px;
  opacity: 1;
  padding: 10px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.el-loading-mask {
  width: 100vw;
  height: 100vh;
}
</style>