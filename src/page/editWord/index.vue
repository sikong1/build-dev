<template>
  <div>
    <!-- add more textareas for additional placeholders as needed -->
    姓名：<input type="text" v-model="data.name" name="" id="">
    年龄：<input type="text" v-model="data.age" name="" id="">
    <button @click="generateDocx">保存文档</button>
  </div>
</template>

<script>
export default {
  name: 'EditWord',
};
</script>

<script setup>
import useEditWord from '@/hooks/useEditWord.js'
import { ref } from 'vue';
import FileSaver from 'file-saver';

const { downloadLink, getDocxLink } = useEditWord()

const data = ref({
  name: '',
  age: ''
})

const generateDocx = async () => {
  await getDocxLink('ceshi.docx', data.value)
  FileSaver.saveAs(downloadLink.value, 'test1.docx')
}
</script>
