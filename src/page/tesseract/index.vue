<template>
  <div>
    <input type="file" @change="onFileChange" />
    <img :src="url" />
    <button @click="recognizeText">识别</button>
    <pre>{{ text }}</pre>
  </div>
</template>

<script>
export default {
  name: 'TesseractVue',
}
</script>

<script setup>
import useImageText from '@/hooks/useImageText.js';
import imageUrl from '@/hooks/useImageUrl.js'
import useStore from "@/pinia";

const { loading } = useStore();

const { text, doOCR } = useImageText();
const { url, onFileChange } = imageUrl();

const recognizeText = async () => {
  console.log(9090);
  loading.loadingAll.open()
  await doOCR(url.value);
  loading.loadingAll.close()
};
</script>