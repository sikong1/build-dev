/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-05-31 16:30:29
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 16:19:50
 * @FilePath: \snow-vue\src\pinia\index.js
 * @Description: 状态管理
 */
import loading from "./modules/loading";
import useUser from "./modules/user";
const useStore = () => ({
  loading: loading(),
  user: useUser(),
});

export default useStore;
