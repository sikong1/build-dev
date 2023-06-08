<template>
  <div>
    <div id="wordcloudChart" ref="wordcloudRef"></div>
  </div>
</template>

<script>
export default {
  name: 'WordcloudVue',
};
</script>

<script setup>
import * as echarts from 'echarts'
import { wordcloudOption } from './options'
import { onMounted, ref } from 'vue'

onMounted(() => {
  init()
})

let chart = null
const wordcloudRef = ref(null)
const init = () => {
  if (!wordcloudRef.value) return;
  chart = echarts.init(wordcloudRef.value);
  chart.setOption(wordcloudOption);
}
</script>

<style lang="scss" scoped>
#wordcloudChart {
  width: 400px;
  height: 400px;
}
</style>