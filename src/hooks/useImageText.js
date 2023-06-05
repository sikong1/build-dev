import Tesseract from 'tesseract.js';
import { ref } from 'vue';

const imageText = () => {
  const text = ref('')
  const doOCR = async (params) => {
    const { data: { text: textData } } = await Tesseract.recognize(params, 'eng')
    text.value = textData
  }

  return {
    text,
    doOCR
  }
}

export default imageText