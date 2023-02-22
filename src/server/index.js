/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-02-22 09:06:22
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-02-22 14:27:27
 * @FilePath: \snow-vue\src\server\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { ElMessage as Message, ElMessageBox as MessageBox } from "element-plus";
// import qs from "qs";
var showLoginMessageBox = false;
axios.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";
// 创建axios实例
const baseURL = 'http://localhost:3000'
// const baseURL = process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_URL;

// const baseURL = "https://console.qzcjrh.cn/"
// console.log(baseURL)
const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 15000 // 请求超时时间
});
// service.defaults.withCredentials = true


// request拦截器
// service.interceptors.request.use(
//   config => {
//     if (
//       !config.headers["Content-Type"] ||
//       config.headers["Content-Type"].indexOf("multipart/form-data") == -1
//     ) {
//       config.data = qs.stringify(config.data);
//     }
//     return config;
//   },
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    const res = response.data;
    console.log(response.status, 'response.status');
    if (response.status === 200 && response.config.responseType === "blob") {
      // 文件类型特殊处理
      return response;
    } else if (res.success !== true) {
      if(res.code === 400){
        Message({
          message: res.error,
          type: "error"
        });
      }
      // 101	登录已失效 102	没有权限 103	账号已被删除或禁用
      if (res.code === 101) {
        if (!showLoginMessageBox) {
          showLoginMessageBox = true;
          MessageBox.confirm("你已被登出，请重新登录", "确定登出", {
            showCancelButton: false,
            showClose: false,
            confirmButtonText: "重新登录",
            type: "warning",
            callback: action => {
              showLoginMessageBox = false;
              if (action === "confirm") {
                // removeAuth()
                //   .then(() => {
                //     location.reload(); // 为了重新实例化vue-router对象 避免bug
                //   })
                //   .catch(() => {
                //     location.reload();
                //   });
              }
            }
          });
        }
      } else if (res.code === 402) {
        if (
          res.error &&
          Object.prototype.toString.call(res.error) === "[object Array]"
        ) {
          res.error = res.error.reduce(function(prev, cur) {
            return prev + "\r\n" + cur;
          });
        }
        Message({
          showClose: true,
          duration: 0,
          customClass: "el-close-message",
          message: res.error,
          type: "error"
        });
      } else {
        if (res) {
          if (!res.success) {
            Message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
          // let text = res.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "")
          // Message({
          //   showClose: true,
          //   message: text,
          //   type: "error"
          // });
        }
      }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: "网络请求失败，请稍候再试",
      type: "error"
    });
    return Promise.reject(error);
  }
);

export default service;

