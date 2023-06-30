/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-08 09:18:57
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-30 15:01:54
 * @FilePath: \snow-vue\src\components\Verifition\utils\ase.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CryptoJS from 'crypto-js';

/**
 * @word object 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
export function aesEncrypt(word, keyWord = 'XwKsGlMcdPMEhR1B') {
    console.log(word, keyWord, 'word');
    let key = CryptoJS.enc.Utf8.parse(keyWord);
    let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word));
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
