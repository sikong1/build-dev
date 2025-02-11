<template>
  <div class="box">
    <div class="app-container">
      <header class="header">
        <el-menu
          :default-active="route.path"
          :router="true"
          mode="horizontal"
          class="nav-menu"
        >
          <div class="logo">
            <span class="logo-text">你好 {{ user.userInfo.username }}</span>
          </div>
          <div class="menu-items">
            <el-menu-item index="/">文章</el-menu-item>
            <el-menu-item index="/about">关于我</el-menu-item>
            <el-menu-item index="/tool">工具</el-menu-item>
            <el-menu-item index="/contact">联系我</el-menu-item>
          </div>
          <div class="right-section">
            <!-- <el-input
              v-model="searchQuery"
              placeholder="搜索文章..."
              class="search-input"
              :prefix-icon="Search"
            /> -->
            <el-dropdown>
              <!-- <span>13</span> -->
              <img
                :src="`${avatarObs}/avatar-default.png`"
                style="width: 35px; height: 35px; border-radius: 50%"
                alt=""
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="outLogin"
                    >退出登录</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="
                      toDetails('https://github.com/sikong1/build-dev.git')
                    "
                    >前端项目地址</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="toDetails('https://github.com/sikong1/cervel-node')"
                    >后端项目地址</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-menu>
      </header>
      <div style="padding-top: 90px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { avatarObs } from "@/utils/obs.js"
import { useRoute } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"
import { loginOut } from "@/utils/login"
import useStore from "@/pinia"

const { user } = useStore()

const route = useRoute()

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
.app-container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  height: 32px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409eff;
}

.menu-items {
  display: flex;
  gap: 20px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-input {
  width: 200px;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.main-content {
  margin-top: 60px;
  flex: 1;
  padding: 20px;
}

.footer {
  background-color: #f5f5f5;
  padding: 20px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
}

.footer-links a:hover {
  color: #409eff;
}
</style>
