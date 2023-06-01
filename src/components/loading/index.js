import { createApp } from 'vue'
import LoadingVue from './index.vue'
import useStore from "@/pinia";

export default {
  install() {
    const loadingVue = createApp(LoadingVue)
    loadingVue.mount('#loading-g')
    const { loading } = useStore()
    const loadingConfig = {
      close: () => {
        const loading = document.getElementById('loading-all');
        loading && (loading.style.display = 'none');
      },
      open: () => {
        const loading = document.getElementById('loading-all');
        loading && (loading.style.display = 'block');
      }
    }
    loading.setLoadingAll(loadingConfig);
  }
}