import { ElMessage } from "element-plus";
import { getStore, removeStore, setStore } from "@/utils/storage";
import router from "@/router";
import { tokenStore } from "@/page/login";

let timer = 0
export const isLoginOut = () => {
  const isLogin = getStore({
    name: tokenStore
  })
  if (!isLogin) {
    loginOut401Message()
    return {
      token: false
    }
  }
  return {
    token: isLogin
  }
}

export const loginOut401Message = () => {
  const now = new Date().getTime()
  if (now - timer > 3000) {
    console.log(now - timer, 'now - timer');
    timer = now
    ElMessage({
      message: '无权限，请重新登录',
      type: 'warning',
    })
    router.push('/login')
  }
}
export const loginOut403Message = () => {
  const now = new Date().getTime()
  if (now - timer > 3000) {
    timer = now
    ElMessage({
      message: '登录过期，请重新登录',
      type: 'warning',
    })
    router.push('/login')
  }
}

export const loginInMessage = () => {
  ElMessage({
    message: '登录成功',
    type: 'success',
  })
}

export const loginOut = () => {
  const now = new Date().getTime()
  if (now - timer > 3000) {
    timer = now
    removeStore({
      name: tokenStore
    })
    router.push({
      path: '/login'
    })
  }
}

export const loginIn = (token) => {
  const now = new Date().getTime()
  if (now - timer > 3000) {
    timer = now
    loginInMessage()
    setStore({
      name: tokenStore,
      content: token,
    })
    router.push('/index')
  }
}