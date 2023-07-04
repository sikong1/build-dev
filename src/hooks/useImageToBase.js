/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 11:17:19
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 11:20:40
 * @FilePath: \snow-vue\src\hooks\useImageToBase.js
 * @Description: 图片转base64
 */
// 实现一个将图片转为base64的hook
const useImageToBase = () => {
    const start = (url) => {
        return new Promise((resolve, reject) => {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = url
            img.onload = () => {
                canvas.height = img.height
                canvas.width = img.width
                ctx.drawImage(img, 0, 0)
                let dataURL = canvas.toDataURL('image/png')
                resolve(dataURL)
                canvas = null
            }
            img.onerror = () => {
                reject(new Error('图片转base64失败'))
            }
        })
    }

    return {
        start
    }
}

export default useImageToBase
