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

// 金额转中文大写
export function digitUppercase(n) {
  const fraction = ["角", "分"];
  const digit = [
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖",
  ];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  let num = Math.abs(n);
  let s = "";
  fraction.forEach((item, index) => {
    s += (
      digit[Math.floor(num * 10 * 10 ** index) % 10] + item
    ).replace(/零./, "");
  });
  s = s || "整";
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = "";
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return (
    (n < 0 ? "负" : "") +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
}

export function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}