<template>
    <div id="pyramid">
    </div>
</template>
<script>
export default {
    name: 'PyramidVue',
};
</script>
<script setup>
import { onMounted } from 'vue';
import { pyramidOption } from './option';
import * as echarts from 'echarts'

let chart = null
onMounted(() => {
    chart = echarts.init(document.getElementById('pyramid'))
    init()
})

const init = () => {
    chart.setOption(pyramidOption)
}
</script>
<style lang='scss' scoped>
#pyramid {
    width: 500px;
    height: 500px;
}
</style>
