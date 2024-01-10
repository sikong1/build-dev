/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2024-01-09 15:10:51
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2024-01-10 13:21:30
 * @FilePath: \snow-vue\src\page\baiduMap\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export function BMPGL(ak) {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            // eslint-disable-next-line
            resolve(BMapGL)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
    })
}