/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-11-24 09:15:20
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-07 09:52:04
 * @FilePath: \snow-vue\src\utils\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 封装一个函数，传入一个数组和需要返回的个数，返回一个随机的数组
export function getRandomArr(arr: any[], num: number) {
  let addArr = [];
  const arrLength = arr.length >= num ? num : arr.length;
  for (let i = 0; i < arrLength; i++) {
    const a = Math.random()
    const index = Math.floor(a * (arr.length - 1))
    addArr.push(...arr.splice(Number(index), 1))
  }
  return addArr
}

export function floatAdd(text1, text2) {
  const a = parseFloat(text1);
  const b = parseFloat(text2);

  if (Number.isNaN(a) || Number.isNaN(b)) return '';

  let c;
  let d;

  try {
    c = a.toString().split('.')[1].length;
  } catch (error) {
    c = 0;
  }

  try {
    d = b.toString().split('.')[1].length;
  } catch (error) {
    d = 0;
  }

  const e = 10 ** Math.max(c, d);

  return (floatMul(a, e) + floatMul(b, e)) / e;
}