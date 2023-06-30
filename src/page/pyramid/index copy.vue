<template>
    <div class="container">
        <div id="pyramid" style="width:560px;height:150px;"></div>
    </div>
</template>
<script>
export default {
    name: 'PyramidVue',
};
</script>
<script setup>
import { onMounted } from 'vue';
import { pyramidOption4 } from './option';
import * as echarts from 'echarts'
import { getParametricEquation } from './charts'

let chart = null
onMounted(() => {
    chart = echarts.init(document.getElementById('pyramid'))
    init()
})

let selectedIndex = ''
let hoveredIndex = ''

const init = () => {
    chart.setOption(pyramidOption4)
    const option = pyramidOption4

    // 监听点击事件，实现选中效果（单选）
    chart.on('click', function (params) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        if (!option.series[params.seriesIndex].pieStatus) {
            return;
        }
        let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
        let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
        let startRatio = option.series[params.seriesIndex].pieData.startRatio;
        let endRatio = option.series[params.seriesIndex].pieData.endRatio;

        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
            option.series[selectedIndex].parametricEquation = getParametricEquation(option.series[selectedIndex].pieData.startRatio, option.series[selectedIndex].pieData.endRatio, false, false);
            option.series[selectedIndex].pieStatus.selected = false;
        }

        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered);
        option.series[params.seriesIndex].pieStatus.selected = isSelected;

        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        isSelected ? selectedIndex = params.seriesIndex : null;

        console.log('option-click: ', option)
        // 使用更新后的 option，渲染图表
        chart.setOption(option);
    });

    // 监听 mouseover，近似实现高亮（放大）效果
    chart.on('mouseover', function (params) {

        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;

        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
            return;
            // 否则进行高亮及必要的取消高亮操作
        } else {
            // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
            if (hoveredIndex !== '') {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                isSelected = option.series[hoveredIndex].pieStatus.selected;
                isHovered = false;
                startRatio = option.series[hoveredIndex].pieData.startRatio;
                endRatio = option.series[hoveredIndex].pieData.endRatio;

                // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered);
                option.series[hoveredIndex].pieStatus.hovered = isHovered;

                // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                hoveredIndex = '';
            }

            // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
            if (params.seriesName !== 'mouseoutSeries') {
                if (!option.series[params.seriesIndex].pieStatus) {
                    return;
                }
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                console.log(option.series[params.seriesIndex],'option.series[params.seriesIndex]');
                isSelected = option.series[params.seriesIndex].pieStatus.selected;
                isHovered = true;
                startRatio = option.series[params.seriesIndex].pieData.startRatio;
                endRatio = option.series[params.seriesIndex].pieData.endRatio;

                // 对当前点击的扇形，执行高亮操作（对 option 更新）
                option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered);
                option.series[params.seriesIndex].pieStatus.hovered = isHovered;

                // 记录上次高亮的扇形对应的系列号 seriesIndex
                hoveredIndex = params.seriesIndex;
            }
            // 使用更新后的 option，渲染图表
            chart.setOption(option);
        }
    });

    // 修正取消高亮失败的 bug
    chart.on('globalout', function () {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;

            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered);
            option.series[hoveredIndex].pieStatus.hovered = isHovered;

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = '';
        }

        // 使用更新后的 option，渲染图表
        chart.setOption(option);
    });

}
</script>
<style lang='scss' scoped>
.container {
    width: 560px;
    height: 164px;
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
