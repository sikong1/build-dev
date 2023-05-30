/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-12-26 23:23:59
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-26 23:36:26
 * @FilePath: \snow-vue\deepClone.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 深拷贝(组件内部data里的数据拷贝报错)
export const deepClone = (obj) => {
  return new Promise((resovle) => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = (e) => {
      resovle(e.data);
    }
  })
}