<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 20:41:14
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-13 16:10:55
 * @FilePath: \snow-vue\src\page\404\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box-404">
    404页面
    <div class="text">
      <el-link class="home line" @click="goHome">
        返回首页
      </el-link>
      <el-link class="back line" @click="goBack">
        返回上一页
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnowVueIndex',
};
</script>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.box-404 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .text {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .line {
      display: inline-block;
      padding: 5px 8px;
      cursor: pointer;

      border-bottom: 1px solid #6486ed;
    }

    .home {
      margin-right: 20px;
    }
  }

}
</style>