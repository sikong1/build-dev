<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-11-15 22:47:33
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-11-15 23:33:38
 * @FilePath: \snow-vue\src\pages\water\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <div class="water"></div>
  </div>
</template>
<script>
export default {
  name: 'WaterItem',
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-color: rgba(40, 134, 241, 0.925);
}
.water {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 测试用的边框 */
  /* border: 1px solid; */
  box-sizing: border-box;
  /* 设置弯曲 */
  border-radius: 30% 70% 70% 30% / 30% 35% 65% 70%;
  /* 设置box-shadow :水平方向阴影  垂直方向阴影  模糊距离  阴影尺寸  阴影颜色  内/外阴影(inset/outset(默认)) 
            盒子阴影可以有多组值,之间用逗号隔开
            水平阴影和垂直阴影必须写,其余4个是可选的*/
  box-shadow: inset 10px 20px 30px rgba(0, 0, 0, 0.5), 10px 10px 20px rgba(0, 0, 0, 0.3), 15px 15px 30px rgba(0, 0, 0, 0.05),
    inset -10px -10px 15px rgba(255, 255, 254, 0.83);
  /*使用关键帧  watermove  9s播放  匀速 无限循环*/
  animation: watermove 9s linear infinite;

  &::after {
    content: "";
    position: absolute;
    width: 35px;
    height: 35px;
    background: rgba(255, 255, 255, 0.82);
    border-radius: 50%;
    left: 60px;
    top: 80px;
    /*使用关键帧  watermove  4s播放  匀速 无限循环*/
    animation: watermove 4s linear infinite;
  }

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.82);
    border-radius: 50%;
    left: 120px;
    top: 55px;
    /*使用关键帧  watermove  4s播放  匀速 无限循环*/
    animation: watermove 4s linear infinite;
  }
}

/* 关键帧 */
@keyframes watermove {
  20% {
    border-radius: 30% 70% 53% 47% / 28% 44% 56% 72%;
  }

  40% {
    border-radius: 30% 70% 39% 61% / 34% 39% 61% 66%;
  }

  60% {
    border-radius: 25% 75% 45% 55% / 40% 55% 45% 60%;
  }

  80% {
    border-radius: 28% 72% 31% 69% / 32% 39% 61% 68%;
  }
}
</style>
