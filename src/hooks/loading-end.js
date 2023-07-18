/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-01 09:27:11
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-10 09:17:16
 * @FilePath: \snow-vue\src\hooks\loading-end.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    console.log('clearInterval,组件卸载');
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