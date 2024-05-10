/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-14 14:12:44
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2024-05-10 17:15:57
 * @FilePath: \snow-vue\src\directives\index.ts
 */
import onceClick from "./modules/once-click";

const directives = (app) => {
  app.directive("onceClick", onceClick);
};

export default directives;
