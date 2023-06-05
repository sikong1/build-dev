<template>
  <div>
    <input type="file" @change="onFileChange" />
    <img :src="url" />
    <button @click="recognizeText">识别</button>
    <div v-html="text"></div>
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

const { text, doOCR } = useImageText();
const { url, onFileChange } = imageUrl();

const recognizeText = () => {
  doOCR(url.value);
};
</script>