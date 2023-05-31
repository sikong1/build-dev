<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:21:45
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-10-28 00:43:30
 * @FilePath: \snow-vue\src\pages\snow\Snow.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="snow">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
export default {
  name: 'SnowItem',
}
</script>

<script setup>
import { onMounted, ref } from 'vue';
import useStore from "@/pinia";

const { loading } = useStore()

onMounted(() => {
  if (loading) {
    loading.loadingAll.close()
  }
  setSnow()
})

const canvas = ref(null)

const setSnow = () => {
  // let canvas = document.querySelector('canvas');
  let context = canvas.value.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.value.width = w;
  canvas.value.height = h;


  let num = 200;
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 10 + 1
    })
  }
  console.log('a', arr);

  let move = () => {
    for (let i = 0; i < num; i++) {
      let snow = arr[i];
      snow.x += Math.random() * 5 + 1
      snow.y += Math.random() * 5 + 1
      if (snow.x > w) {
        snow.x = 0
      }
      if (snow.y > h) {
        snow.y = 0
      }
    }
  }

  let draw = () => {
    context.clearRect(0, 0, w, h);
    context.beginPath();
    context.fillStyle = 'rgb(255, 255, 255)';
    context.shadowColor = 'rgb(255, 255, 255)';
    context.shadowBlur = 10;

    for (let i = 0; i < num; i++) {
      let snow = arr[i];
      context.moveTo(snow.x, snow.y);
      context.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2);
    }
    console.log('dd', context);
    context.fill();
    context.closePath();
    move()
  }

  // draw()
  setInterval(draw, 30)
}
</script>

<style lang="scss" scoped>
.snow {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/night.jpg) no-repeat center/cover;
}
</style>
