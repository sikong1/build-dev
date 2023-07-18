/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-14 14:12:44
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-14 17:13:44
 * @FilePath: \snow-vue\src\directives\index.ts
 */
import onceClick from "./modules/once-click";
import { Skeleton, SkeletonItem } from "./modules/skeleton";

const directives = (app) => {
  app.directive("onceClick", onceClick);
  app.directive("skeleton", Skeleton);
  app.directive("skeleton-item", SkeletonItem);
};

export default directives;
