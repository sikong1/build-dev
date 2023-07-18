/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-14 14:12:44
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-14 14:33:01
 * @FilePath: \snow-vue\src\directives\modules\once-click.js
 * @Description: 点击一次
 */
export default {
    mounted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 1500);
            }
        });
    },
};
