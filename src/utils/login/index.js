import { ElMessage } from "element-plus";
import { getStore, removeStore, setStore } from "@/utils/storage";
import router from "@/router";
import { tokenStore } from "@/page/login";

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
  ElMessage({
    message: '无权限，请重新登录',
    type: 'warning',
  })
  router.push('/login')
}
export const loginOut403Message = () => {
  ElMessage({
    message: '登录过期，请重新登录',
    type: 'warning',
  })
  router.push('/login')
}

export const loginInMessage = () => {
  ElMessage({
    message: '登录成功',
    type: 'success',
  })
}

export const loginOut = () => {
  removeStore({
    name: tokenStore
  })
  router.push({
    path: '/login'
  })
}

export const loginIn = (token) => {
  loginInMessage()
  setStore({
    name: tokenStore,
    content: token,
  })
  router.push('/index')
}