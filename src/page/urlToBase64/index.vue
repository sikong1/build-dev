<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 11:14:16
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 11:58:23
 * @FilePath: \snow-vue\src\page\urlToBase64\index.vue
 * @Description: 图片转成base64 
-->
<template>
  <div class="to-base">
    <div class="top">
      <el-button
        style="margin-left: 20px"
        @click="startClick"
        type="primary"
        round
        >选择图片</el-button
      >
      <input
        type="file"
        name=""
        id=""
        ref="inputRef"
        @change="fileChange"
        style="display: none"
      />
    </div>
    <div class="box" v-if="base">
      <span class="Collection-url-to-base text" :data-clipboard-text="base">{{
        base
      }}</span>
      <hr />
      <img :src="base" alt="" style="vertical-align: bottom">
      <el-button type="primary" @click="copyClick">复制</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "urlToBase64",
};
</script>

<script setup>
import { ref } from "vue";
// import { ElMessage } from "element-plus";
// import useImageToBase from "@/hooks/useImageToBase";
import { copyProtogenesis } from "@/utils/copy";
import { getBase64 } from "@/utils";

// const { start } = useImageToBase();
const base = ref('')
const inputRef = ref("");

// 开始转换
const startClick = async () => {
  // 去空
  // res.value = ''
  // 判空
  // if (!inputObj.value) {
  //     return ElMessage.warning(tips)
  // }
  // 转换
  // res.value = await start(inputObj.value).catch(() => {
  //     ElMessage.error('转换失败')
  // })

  inputRef.value && inputRef.value.click()
};

const fileChange = async (e) => {
  const file = e.target.files[0];
  base.value = await getBase64(file);
};

// 复制
const copyClick = () => {
  copyProtogenesis(base.value);
};
</script>
<style lang="scss" scoped>
.to-base {
  .top {
    display: flex;
    justify-content: space-between;
  }

  .box {
    border: 1px solid #ccc;
    margin-top: 20px;
  }

  .text {
    // word-wrap: break-word;

    // 超过10行，展示...
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-all;
    width: 100%;
  }
}
</style>
