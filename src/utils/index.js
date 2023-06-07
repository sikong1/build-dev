// 封装一个函数，传入一个数组和需要返回的个数，返回一个随机的数组
export function getRandomArr(arr, num) {
  let addArr = [];
  const arrLength = arr.length >= num ? num : arr.length;
  for (let i = 0; i < arrLength; i++) {
    const a = Math.random()
    const index = Math.floor(a * (arr.length - 1))
    addArr.push(...arr.splice(Number(index), 1))
  }
  return addArr
}

// export function floatAdd(text1, text2) {
//   const a = parseFloat(text1);
//   const b = parseFloat(text2);

//   if (Number.isNaN(a) || Number.isNaN(b)) return '';

//   let c;
//   let d;

//   try {
//     c = a.toString().split('.')[1].length;
//   } catch (error) {
//     c = 0;
//   }

//   try {
//     d = b.toString().split('.')[1].length;
//   } catch (error) {
//     d = 0;
//   }

//   const e = 10 ** Math.max(c, d);

//   return (floatMul(a, e) + floatMul(b, e)) / e;
// }

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    return (
      val === "null" ||
      !val ||
      val === "undefined" ||
      val === undefined ||
      val === ""
    );
  }
  return false;
}
