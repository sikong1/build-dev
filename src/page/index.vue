<template>
  <div>
    <button v-for="item in routers" :key="item.name" @click="currentRouter(item)" style="margin: 0 8px 8px 0;">{{ routerTitle(item) }}</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<script setup>

import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue';

const router = useRouter();

const routers = ref([])
onMounted(() => {
  const routerItems = router.options.routes;
  const appRouter = routerItems.find((item) => item.name === 'index');
  appRouter && (routers.value = appRouter.children);
  console.log(routers.value,'routersrouters');
})


const routerTitle = computed(() => {
  return (item) => {
    if (!item.meta) {
      return ''
    }
    return item.meta.title
  }
})

const currentRouter = (item) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped></style>