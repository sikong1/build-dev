<template>
  <div class="box-404">
    404页面
    <div class="text">
      <span class="home line" @click="goHome">
        返回首页
      </span>
      <span class="back line" @click="goBack">
        返回上一页
      </span>
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