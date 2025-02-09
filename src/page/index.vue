<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-05-30 11:52:55
 * @LastEditors: sikong 1327325804@qq.com
 * @LastEditTime: 2024-05-30 14:36:12
 * @FilePath: \snow-vue\src\page\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="m-b-8 flex">
      <!-- <el-button type="primary" size="small" @click="outLogin">退出登录</el-button> -->
      <!-- <img :src="`${loginObs}/avatar.png`" alt="" class="logo" /> -->
      <el-dropdown>
       <!-- <span>13</span> -->
        <img :src="`${avatarObs}/avatar-default.png`" style="width: 50px; height: 50px; border-radius: 50%;" alt="" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
            <el-dropdown-item @click="toDetails('https://github.com/sikong1/build-dev.git')">前端项目地址</el-dropdown-item>
            <el-dropdown-item @click="toDetails('https://github.com/sikong1/cervel-node')">后端项目地址</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
import { ElMessage, ElMessageBox } from "element-plus"
import { getApi, getMongoData } from "@/server/modules/login.js"
import { isLoginOut, loginOut } from "@/utils/login"
import { avatarObs } from "@/utils/obs.js"

const router = useRouter()
const route = useRoute()

const routers = ref([])
let tabValue = ref(router.currentRoute.value.path)
onMounted(() => {
  console.log(tabValue.value, "tabValue")
  isLoginOut()
  getList()
  showRouter()

  getUserInfo()
})

const getUserInfo = async () => {
  const res = await getMongoData({
    username: "sikong"
  })
}

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
  const appRouter = routerItems.find((item) => item.name === "index")
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

const outLogin = () => {
  // 退出登录确认框
  ElMessageBox.confirm("确认退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage({
        message: "退出成功",
        type: "success"
      })
      // 清除token
      loginOut()
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消退出"
      })
    })
}

const toDetails = (url) => {
  window.open(url, "_blank")
}
</script>

<style lang="scss" scoped>
.m-b-8 {
  margin-bottom: 16px;
}

.flex {
  display: flex;
  justify-content: flex-end;
}
</style>
