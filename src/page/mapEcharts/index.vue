<template>
  <div class="map-box">
    <div id="map" ref="mapRef"></div>
  </div>
</template>

<script>
export default {
  name: 'SnowVueIndex',
};
</script>

<script setup>
import * as echarts from 'echarts'
// 获取中国地图信息
import chinaGeoJson from '@/config/china.ts';
import { getPoint } from '@/api/modules/point.js'
import { getOptions } from './options'
import { onMounted, onUnmounted, ref } from 'vue'

let resizeObserver = null
onMounted(() => {
  getPointList();
  // 窗口变化监听地图重绘
  resizeObserver = new ResizeObserver(() => {
    if (chart) {
      chart.resize();
    }
  });
  resizeObserver.observe(document.body);
})

onUnmounted(() => {
  // 取消监听
  if (resizeObserver) {
    resizeObserver.unobserve(document.body);
    resizeObserver.disconnect();
  }
})

const list = ref([])
const getPointList = async () => {
  const res = await getPoint()
  if (res?.status === 200) {
    list.value = res.data.data
    init()
  }
}

const name = 'china'
const mapRef = ref(null)
let chart = null
const init = () => {
  if (!mapRef.value) return;
  chart = echarts.init(mapRef.value);
  // 初始化地图
  echarts.registerMap(name, chinaGeoJson);
  const options = getOptions(name, list.value);
  console.log(options, 'optionsoptions');
  chart.setOption(options);
}

</script>

<style lang="scss" scoped>
.map-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  #map {
    width: 100%;
    height: 678px;
  }
}
</style>