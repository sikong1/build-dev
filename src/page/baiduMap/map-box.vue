<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-12-15 15:01:34
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2024-01-10 13:14:40
 * @FilePath: \snow-vue\src\page\baiduMap\map-box.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <span>行政区划鼠标事件</span>
        <el-select v-model="state.district" placeholder="请选择行政区划" @change="change">
            <el-option v-for="(item, index) in districts" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <div id="container"></div>
    </div>
</template>
<script>
export default {
    name: 'mapBox',
}
</script>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { BMPGL } from './index'
import areaData from './data'

const districts = ref([])

const state = reactive({
    district: '泉州市',

    BMapGL: null,
    map: null
})

onMounted(() => {
    init();
    districts.value = Object.values(areaData.city_list)
})

const change = () => {
    draw()
}

const init = () => {
    new BMPGL('1dWpi170PhfmKqxj7kxaxA9oyIGhCwmG').then((BMapGL) => {
        state.BMapGL = BMapGL
        state.map = new BMapGL.Map('container');
        var map = state.map;
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 7);
        map.panBy(50, 1180);
        map.enableScrollWheelZoom();
        var zoomCtrl = new BMapGL.ZoomControl();
        map.addControl(zoomCtrl);
        draw()
    })
}

// 绘制
let dist = null
const draw = () => {
    // dist && dist.setMap(null)
    state.map.clearOverlays()
    // --- 添加行政区划 ---
    dist = new state.BMapGL.DistrictLayer({
        name: `(${state.district})`,
        kind: 1,
        fillColor: '#618bf8',
        fillOpacity: 1,
        depth: 2,
        strokeColor: '#daeafa',
        viewport: true
    });
    state.map.addDistrictLayer(dist);
    // dist.setMap(state.map)
    // --- 行政区划添加鼠标事件 ---
    dist.addEventListener('mouseover', function (e) {
        e.currentTarget.setFillColor('#9169db');
    });
    dist.addEventListener('mouseout', function (e) {
        e.currentTarget.setFillColor(e.currentTarget.style.fillColor);
    });
}

</script>
<style lang='scss' scoped>
#container {
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin: 20px 0 0;
    padding: 0
}
</style>
