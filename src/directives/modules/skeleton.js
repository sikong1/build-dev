/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 16:27:53
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-18 10:33:08
 * @FilePath: /vue3.0-ts/src/directives/modules/skeleton.ts
 * @Description: 骨架屏指令
 */
import { reactive, h, render, ref, watchEffect } from 'vue';

const stateObj = ref({});
const getStyle = (el) => {
  // 骨架屏的样式
  return {
    position: 'absolute',
    top: el.getBoundingClientRect().top + 'px',
    left: el.getBoundingClientRect().left + 'px',
    width: el.getBoundingClientRect().width + 'px',
    height: el.getBoundingClientRect().height + 'px',
    borderRadius: getComputedStyle(el).borderRadius,
    animation: 'mu-skeleton-loading 1.4s ease infinite',
    background: `linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)`,
    backgroundSize: `400% 100%`,
  };
};
const id = '__skeleton-id';
watchEffect(() => {
  console.log('改变了');
  const keys = Object.keys(stateObj.value); // 获取所有的key
  const elArr = []; // 存放所有的dom
  keys.forEach((item) => {
    // 遍历所有的key
    stateObj.value[item].list.forEach((el) => {
      elArr.push({
        obj: stateObj.value[item],
        el,
        type: item, // 用于删除dom，给dom添加属性
      });
    });
  });

  const children = elArr.map((item) =>
    h('div', item.obj.loading ? {
      style: getStyle(item.el), // 给dom添加样式,骨架屏的样式
      [id]: item.type, // 给dom添加属性
    } : null)
  );

  // 创建 div 容器
  const container = h('div', children);

  // 将 div容器 渲染到 body 中
  render(container, document.body);
});

/**
 *
 * @param loading 加载状态
 * @param type 类型id
 */
const removeDom = (loading, type) => {
  if (!loading) {
    // loading为false时，删除dom
    const elArr = document.querySelectorAll(`[${id}=${type}]`); // 获取所有的dom
    // 删除dom
    elArr.forEach((item) => {
      // 遍历删除
      item.parentNode.removeChild(item);
    });
  }
};

let index = 0;
let list = [];
/**
 * @description: 骨架屏指令，用于显示隐藏骨架屏，只需要在需要骨架屏的元素上添加 v-skeleton 指令即可，例如：v-skeleton="loading"
 * @param {HTMLElement} el 当前元素
 * @param {boolean} binding.value 骨架屏的显示隐藏，true为显示，false为隐藏
 * @param {vnodeType} vnode 当前元素的虚拟dom
 */
const Skeleton = {
  mounted(el, binding, vnode) {
    index += 1;
    const type = `${id}${index}`; // 用于区分不同的el
    vnode.$$index = type; // 在 updated 中需要，更新loading状态
    const listArr = []; // 用于存放不包含el的list
    const newList = []; // 用于存放包含el的list
    list.forEach((item) => {
      // 判断当前el的子孙节点是否包含item
      if (el.contains(item)) {
        // 包含
        newList.push(item);
      } else {
        // 不包含
        listArr.push(item);
      }
    });
    stateObj.value[type] = reactive({
      loading: binding.value, // loading状态
      type, // 用于删除骨架屏dom
      list: newList, // 存放包含el的list
    });
    list = listArr; // 将不包含el的list赋值给list，用于下次 v-skeleton 指令的判断
  },
  updated(el, binding, vnode) {
    console.log(el, vnode, '正式环境');
    stateObj.value[vnode.el.__vnode.$$index].loading = binding.value; // 更新loading状态
    removeDom(binding.value, vnode.el.__vnode.$$index); // 删除dom
  },
  unmounted(el, binding, vnode) {
    console.log(el, binding);
    stateObj.value[vnode.el.__vnode.$$index].loading = false; // 更新loading状态
  },
};

/**
 * @description: 骨架屏指令，哪个元素需要骨架屏，就在哪个元素上添加该指令
 * @param {HTMLElement} el 当前元素
 * @param {vnodeType} vnode 当前元素的虚拟dom
 */
const SkeletonItem = {
  mounted(el) {
    // 将el存入list
    list.push(el);
  },
  unmounted(el, binding, vnode) {
    console.log(el, binding);
    // 删除 el
    stateObj.value[vnode.el.__vnode.$$index].list = [];
  },
};

export { Skeleton, SkeletonItem };
