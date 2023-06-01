import { ref, onUnmounted, onMounted } from 'vue'

export default function useLoading(length = 3) {
  const loading = ref('.')
  const timer = ref(null)
  const start = () => {
    timer.value = setInterval(() => {
      loading.value += '.'
      if (loading.value.length > length) {
        loading.value = '.'
      }
    }, 500)
  }

  const end = () => {
    clearInterval(timer.value)
    loading.value = ''
  }

  onUnmounted(() => {
    clearInterval(timer.value)
  })

  onMounted(() => {
    start()
  })

  return {
    loading,
    start,
    end
  }
}