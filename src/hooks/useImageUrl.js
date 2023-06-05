import { ref } from "vue"

const imageUrl = () => {
  const url = ref('')

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      url.value = e.target.result;
    };
  };

  return {
    url,
    onFileChange
  }
}

export default imageUrl