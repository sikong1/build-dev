<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:39:54
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-08 16:16:38
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <Scroll :getNextPageData="getNextPageData">
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
    </Scroll>
  </div>
</template> 

<script>
import Scroll from '@/components/scroll/index.vue'
export default {
  components: { Scroll },
  name: 'scrollLoading',

  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      setTimeout(() => {
        this.list.push(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      }, 300)
    },

    // 获取下一页数据
    getNextPageData() {
      this.getData()
    }
  }
}
</script>

<script setup>
import { onMounted, ref } from 'vue';
import useStore from "@/pinia";

const { loading } = useStore()

const list = ref([])

onMounted(() => {
  if (loading) {
    loading.loadingAll.close()
  }
  getData()
})

const getData = () => {
  setTimeout(() => {
    list.value.push(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  }, 300)
}
const getNextPageData = () => {
  getData()
}
</script>

<style lang="scss" scoped>
.box {
  width: 300px;
  height: 500px;
  margin: 100px auto;


  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
