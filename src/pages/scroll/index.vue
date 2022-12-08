<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-12-07 10:52:51
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-08 16:30:34
 * @FilePath: \snow-vue\src\pages\scroll\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="scroll-box">
    <div class="scroll-content" ref="scrollContent">
      <!-- 数据自定义展示 -->
      <slot></slot>
      <!-- 监听 是否需要加载下一条数据 -->
      <div ref="scroll" class="scroll"></div>
    </div>
  </div>
</template>

<script>
import scroll from '@/pages/scroll'
export default {
  name: 'ScrollIndex',
  props: {
    getNextPageData: { // 获取下一页数据方法
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    // 监听滚动事件
    scroll(this.$refs.scroll, this.getNextPageData, this.$refs.scrollContent)
  },
}
</script>

<style lang="scss" scoped>
.scroll-box {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  .scroll-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .scroll {
    height: 1px;
  }
}
</style>