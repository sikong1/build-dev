<template>
  <div>
    <el-button @click="handleClick">点击上传</el-button>
    <input
      type="file"
      ref="file"
      @change="handleChange"
      style="display: none"
    />

    <div v-if="fileStore.fileData.fileHash">
      上传进度：<el-progress :percentage="fileStore.progress" />
    </div>
  </div>
</template>
<script>
export default {
  name: "breakpointContinuationVue",
};
</script>
<script setup>
import useFileSizeUpload from "@/hooks/useFileSizeUpload";
import useStore from "@/pinia";
import { ref } from "vue";

const { fileUpload, postFile } = useFileSizeUpload();
const { fileStore } = useStore();

const file = ref(null);
// 点击选择文件
const handleClick = () => {
  file.value && file.value.click();
};

// 打开文件选择框
const handleChange = (event) => {
  fileUpload(event.target.files[0], 10, postFile);

  file.value.value = "";
};
</script>
<style lang="scss" scoped></style>
