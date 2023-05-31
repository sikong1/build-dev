/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-10-26 18:22:37
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-11-17 15:52:25
 * @FilePath: \hldn-city-screen\src\store\modules\tab.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

const useMapStore = defineStore({
  id: "loading",
  state: () => ({
    loadingAll: false,
  }),
  actions: {
    setLoadingAll(loadingAll) {
      this.loadingAll = loadingAll;
    },
  }
});

export default useMapStore;
