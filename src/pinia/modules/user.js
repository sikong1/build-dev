/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-07 16:08:52
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 16:31:13
 * @FilePath: \snow-vue\src\pinia\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

const useUser = defineStore({
    id: "user",
    state: () => ({
        userInfo: false,
    }),
    persist: {
        enabled: true, // true 表示开启持久化保存
        strategies: [
            { storage: localStorage, paths: ['userInfo'] },
        ],
    },
    actions: {
        setUserInfo(user) {
            this.userInfo = user;
        },
    }
});

export default useUser;
