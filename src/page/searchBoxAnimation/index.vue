<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-27 23:21:45
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-11-17 00:15:18
 * @FilePath: \snow-vue\src\pages\snow\Snow.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <div class="seach" ref="seach">
      <div class="icon" @click="setWidth"></div>
      <div class="text-input">
        <input v-model="inputText" type="text" placeholder="seach">
        <input type="submit" value="go" id="go" @click="clearWidth">
        <div class="clear" @click="delText"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SnowItem',
}
</script>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import useStore from "@/pinia";

const { loading } = useStore()

onMounted(() => {
  if (loading) {
    loading.loadingAll.close()
  }
})


const inputText = ref('')

const setWidth = () => {
  const seach = document.querySelector('.seach')
  seach.classList.toggle('changeWidth')
}
const clearWidth = () => {
  const seach = document.querySelector('.seach')
  seach.classList.remove('changeWidth')
  inputText.value = ''
}
const delText = () => {
  inputText.value = ''
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: dodgerblue;
  display: flex;
  justify-content: center;
  align-items: center;
}

.seach {
  position: relative;
  width: 60px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  border-radius: 60px;
  transition: 0.5s;

  overflow: hidden;

  .icon {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &::before {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 3px solid dodgerblue;
    }

    &::after {
      content: '';
      width: 3px;
      height: 12px;
      background-color: dodgerblue;

      position: absolute;
      transform: translate(10px, 10px) rotate(315deg);
    }
  }

  .text-input {
    width: 320px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
    position: absolute;
    top: 0;
    left: 60px;

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 18px;
    }

    .clear {
      width: 15px;
      height: 15px;
      position: absolute;
      right: 22%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: '';
        width: 1px;
        height: 15px;
        background-color: #999;
        transform: rotate(45deg);
        position: absolute;
      }

      &::after {
        content: '';
        width: 1px;
        height: 15px;
        background-color: #999;
        transform: rotate(315deg);
      }
    }

    #go {
      width: 12%;
      height: 60%;
      position: absolute;
      top: 22%;
      right: 0;
      border-radius: 8px;
      color: #fff;
      box-shadow: 0 0 2px rbga(0, 0, 0.4);
      background: linear-gradient(skyblue, deepskyblue);

      &:hover {
        cursor: pointer;
        background: #ccc;
      }
    }
  }
}

.changeWidth {
  width: 400px;
}
</style>
