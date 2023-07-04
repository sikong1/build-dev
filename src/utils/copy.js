/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 11:41:31
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 11:59:21
 * @FilePath: \snow-vue\src\utils\copy.js
 * @Description: 复制功能
 */
import Clipboard from 'clipboard' // clipboard 复制 base64 很慢
import { ElMessage } from "element-plus";


/**
 * 
 * @param {string} selector: 选择器 class id
 */
export const copy = (selector) => {
    console.log('lllll');
    let clipboard = new Clipboard(selector)
    console.log(clipboard,'clipboardclipboard');
    clipboard.on('success', (e) => {
        // 释放内存
        console.log(e, '复制成功')
        ElMessage.success('复制成功')

        clipboard.destroy()
    })
    clipboard.on('error', (e) => {
        console.log(e, '复制失败');
        ElMessage.error('复制失败')
        // 释放内存
        clipboard.destroy()
    })
}

// 原生js实现 
export const copyProtogenesis = (text) => {
    let input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    ElMessage.success('复制成功')
}