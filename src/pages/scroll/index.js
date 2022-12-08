/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-12-08 09:09:53
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-08 16:25:30
 * @FilePath: \snow-vue\src\utils\scroll.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @param {*} scrollRef: 监听的元素
 * @param {*} rootRef: 相对于哪个元素监听，默认为视口
 * @param {*} fn: 异步函数（获取数据的函数）,函数要有返回值，返回值为true时，取消监听
 */

const scroll = (scrollRef, fn, rootRef) => {
  const loading = scrollRef;
  var observer = new IntersectionObserver(
    async (arr) => {
      // 当loading元素进入视口时，执行异步函数
      if (arr[0].isIntersecting) {
        // 执行异步函数
        const res = await fn();
        // res为true时，代表数据已经全部加载完毕，取消监听
        if (res) {
          // 取消监听
          observer.unobserve(loading);
        }
      }
    },
    {
      // 设置触发条件，当loading元素进入视口前100px时，触发回调函数
      root: rootRef,
      rootMargin: "100px",
    }
  );
  // 调用函数，开始监听
  observer.observe(loading);
}

export default scroll
