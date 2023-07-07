/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-02 11:54:58
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 21:24:05
 * @FilePath: \snow-vue\src\server\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import router from '@/router'
import { isLoginOut, loginOut401Message, loginOut403Message } from '@/utils/login'
import { ElMessage } from 'element-plus'

const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// token白名单
const whiteList = ['/login', '/code', '/code/check', '/newToken', '/register']
// 请求拦截器
api.interceptors.request.use(
  config => {
    // 白名单不需要token
    if (whiteList.includes(config.url)) {
      return config
    }
    // 获取token
    const { token } = isLoginOut()
    // 在请求头中加token
    config.headers.Authorization = token
    return config
  })


// 响应拦截器
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          ElMessage.error(error.response.data.msg)
          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          loginOut401Message()
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          loginOut403Message()
          router.push({
            path: '/login'
          })
          break
        // 404请求不存在
        case 404:
          router.push({
            path: '/404'
          })
          break
      }
    }
    return Promise.reject(error.response)
  })

export default api