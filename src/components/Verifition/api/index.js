/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-08 09:18:57
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 14:28:33
 * @FilePath: \snow-vue\src\components\Verifition\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request from '@/server/index'

// 获取验证图片
export function reqGet(params) {
    return request({
        url: '/code',
        method: 'get',
        params,
    });
}

// 滑动或者点选验证
export function reqCheck(data) {
    return request({
        url: '/code/check',
        method: 'post',
        data,
    });
}
