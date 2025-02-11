<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-05-30 11:52:55
 * @LastEditors: sikong 1327325804@qq.com
 * @LastEditTime: 2024-05-30 14:36:12
 * @FilePath: \snow-vue\src\page\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <el-tabs type="border-card" @tab-click="currentRouter" v-model="tabValue">
      <router-view v-slot="{ Component }">
        <el-tab-pane
          v-for="item in routers"
          :key="item.name"
          :name="routerObj(item).path"
          :label="routerObj(item).meta.title"
        >
          <component
            v-if="routerObj(item).path === router.currentRoute.value.path"
            :is="Component"
          />
        </el-tab-pane>
      </router-view>
    </el-tabs>
    <!-- <button v-for="item in routers" :key="item.name" @click="currentRouter(item)" style="margin: 0 8px 8px 0;">{{
      routerTitle(item) }}</button>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view> -->
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<script setup>
import { useRouter, useRoute } from "vue-router"
import { computed, onMounted, ref, watch } from "vue"
import { getApi } from "@/server/modules/login.js"
import { isLoginOut } from "@/utils/login"

const router = useRouter()
const route = useRoute()

const routers = ref([])
let tabValue = ref(router.currentRoute.value.path)
onMounted(() => {
  console.log(tabValue.value, "tabValue")
  isLoginOut()
  getList()
  showRouter()
})


// 监听路由变化
watch(
  () => route.path,
  (newVal) => {
    const item = routers.value.find(
      (item) => routerObj.value(item).path === newVal
    )
    if (item) {
      tabValue.value = item.path
    }
  }
)

const getList = async () => {
  const res = await getApi()
}

const showRouter = () => {
  const routerItems = router.options.routes
  const appRouter = routerItems.find((item) => item.name === "tool")
  appRouter && (routers.value = appRouter.children)
}

const routerObj = computed(() => {
  return (item) => {
    if (!item.meta) {
      return ""
    }
    return item
  }
})

const currentRouter = (pane, e) => {
  const index = pane.index
  const item = routers.value[index]
  router.push(item.path)
}


</script>

<style lang="scss" scoped>
.main {
  ::v-deep(.el-tabs__content) {
    height: calc(100vh - 170px);
  }
}
.m-b-8 {
  margin-bottom: 16px;
}

.flex {
  display: flex;
  justify-content: flex-end;
}
</style>
