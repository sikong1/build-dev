/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-07 16:15:44
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 16:19:16
 * @FilePath: \snow-vue\src\pinia\pinia.js
 * @Description: 状态管理配置项
 */
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia();
pinia.use(piniaPersist)
export default pinia;
