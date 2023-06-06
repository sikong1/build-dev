<template>
  <input type="file" @change="handleFileChange" />
  <div>{{ recognizeResult }}</div>
</template>

<script>
import * as AipOcrClient from 'baidu-aip-sdk/ocr';

const APP_ID = 'your-app-id';
const API_KEY = 'your-api-key';
const SECRET_KEY = 'your-secret-key';

export default {
  name: 'ImageToText',
  data() {
    return {
      recognizeResult: '',
    };
  },
  methods: {
    async handleFileChange(event) {
      const file = event.target.files[0];
      const image = await this.getImageBase64(file);
      const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

      client.generalBasic(image).then((result) => {
        if (!result.words_result) {
          return Promise.reject(new Error('No text recognized'));
        }

        const words = result.words_result.map(w => w.words);
        this.recognizeResult = words.join('\n');
      }).catch((err) => {
        console.error(err);
      });
    },
    getImageBase64(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
    },
  },
};
</script>