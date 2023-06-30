<template>
    <div class="container">
        <div id="pyramid" style="width:560px;height:350px;"></div>
    </div>
</template>
<script>
export default {    
    name: 'PyramidVue',
};
</script>
<script setup>
import { onMounted } from 'vue';
import { pyramidOption3 } from './option';
import * as echarts from 'echarts'

let chart = null
onMounted(() => {
    chart = echarts.init(document.getElementById('pyramid'))
    init()
})

const init = () => {
    chart.setOption(pyramidOption3)
    const option = pyramidOption3
}
</script>
<style lang='scss' scoped>
.container {
    width: 560px;
    height: 350px;
    background-color: #000000;
    position: relative;
}

.imgContent {
    width: 164px;
    height: 86px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
}

// #pyramid {
//     width: 400px;
//     height: 400px;
// }
</style>
