<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-08-06 09:42:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-06 10:55:10
 * @FilePath: \snow-vue\src\page\carousel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="carousel">
        <el-carousel ref="carouselRef" :interval="5000" arrow="always" indicator-position="none" @change=change>
            <el-carousel-item v-for="item in arr" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="carousel-item">
            <img class="l" src="@/assets/images/images/矩形3.png" @click="up" alt="">
            <div class="center">
                <h3 v-for="(item, index) in arr" :key="item" text="2xl" :class="currentIndex === index && 'active'" justify="center">{{ item }}</h3>
            </div>
            <img class="r" src="@/assets/images/images/矩形3拷贝.png" @click="down" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'carouselVue',
}
</script>

<script setup>
import { onMounted, ref } from 'vue';


const arr = [1, 2, 3, 4]
const carouselRef = ref(null)
const currentIndex = ref(0);
const change = (val, e) => {
    currentIndex.value = val;
}

onMounted(() => {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 38) {
            up()
        } else if (e.keyCode == 40) {
            down()
        }
    })
})

const up = () => {
    if (currentIndex.value === 0) {
        return
    }
    carouselRef.value.prev()
    currentIndex.value--;
}

const down = () => {
    if (currentIndex.value === arr.length - 1) {
        return
    }
    carouselRef.value.next()
    currentIndex.value++;
}
</script>
<style lang='scss' scoped>
.carousel {
    position: relative;

    .carousel-item {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 73px;
        display: flex;
        justify-content: center;
        align-items: center;

        .l {
            cursor: pointer;
        }

        .center {
            flex: 1;
            height: 73px;

            display: flex;
            justify-content: space-between;

            h3 {
                flex: 1;
                text-align: center;
                line-height: 73px;
                background-color: #ccc;
                margin: 0;
                cursor: pointer;
            }

            .active {
                border: 1px solid #409eff;
            }
        }

        .r {
            cursor: pointer;
        }
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

:deep(.el-carousel__arrow) {
    display: none;
}
</style>
