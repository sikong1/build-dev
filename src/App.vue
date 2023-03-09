<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-02-21 11:27:13
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-03-09 15:15:39
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <ConfingMap />
    <MapPoint v-if="lodding" />
  </div>
</template>

<script>
import ConfingMap from '@/pages/ConfigMap/index.vue';
import MapPoint from '@/pages/ConfigMap/MapPoint.vue';
import { init, create2DView } from '@/utils/map/map';
export default {
  components: {
    ConfingMap,
    MapPoint
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
          this.lodding = true
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>