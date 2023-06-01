<template>
  <div class="loading-all" id="loading-all">
    <div class="center">
      <LoadingVue />
      <p>加载中{{ loading }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnowVueIndex',
};
</script>

<script setup>
import LoadingVue from '@/page/loadingAnimation/index.vue'
import useLoading from '@/hooks/loading-end.js'

const { loading } = useLoading()
</script>

<style lang="scss" scoped>
.loading-all {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);

  .center {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 缩放
    transform: scale(0.3) translate(-150%, -50%);

    p {
      font-size: 50px;
      margin-top: -15px;
    }
  }
}
</style>