<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-11-14 22:22:55
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-11-14 22:48:28
 * @FilePath: \snow-vue\src\pages\drop\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="list" ref="list">
    <div draggable="true" class="list-item">1</div>
    <div draggable="true" class="list-item">2</div>
    <div draggable="true" class="list-item">3</div>
    <div draggable="true" class="list-item">4</div>
    <div draggable="true" class="list-item">5</div>
  </div>
</template>

<script>
export default {
  name: 'SnowVueIndex',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import useStore from "@/pinia";

const { loading } = useStore()

const suorceNode = ref(null)

onMounted(() => {
  if (loading) {
    loading.loadingAll.close()
  }
  init()
})

const init = () => {
  const list = document.querySelector('.list')
  list.ondragstart = e => {
    setTimeout(() => {
      e.target.classList.add('moving')
    }, 0)
    suorceNode.value = e.target
    e.dataTransfer.effectAllowed = 'move'
  }

  list.ondragover = e => {
    e.preventDefault()
  }

  list.ondragenter = e => {
    e.preventDefault();
    if (e.target === list || e.target === suorceNode.value) {
      return;
    }
    const children = Array.from(list.children)
    const suorceIndex = children.indexOf(suorceNode.value)
    const targetIndex = children.indexOf(e.target)
    if (suorceIndex > targetIndex) {
      // console.log('向上');
      list.insertBefore(suorceNode.value, e.target)
    } else {
      // console.log('向下');
      list.insertBefore(suorceNode.value, e.target.nextElementSibling)
    }
  }

  list.ondragend = e => {
    e.target.classList.remove('moving');
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin: 100px 0 0 500px;

  .list-item {
    width: 300px;
    height: 50px;
    background-color: red;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .moving {
    background: transparent;
    color: transparent;
    border: 1px dashed #ccc;
  }
}
</style>