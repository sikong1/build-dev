<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-03-16 09:55:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-03-25 14:38:15
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div v-html="setText('我是中国人AAAAA')" style="margin-top: 8px;"></div>
  </div>
</template>

<script>
export default {
  name: 'SnowVueApp',
};
</script>

<script setup>
import pinyin from 'pinyin'
import { computed } from 'vue';

// 匹配从a-z,A-Z,0-9
const rep = /[a-zA-Z0-9]/;

const setText = computed(() => {
  return (val) => {
    let textVal = ''
    val.split('').forEach((item) => {
      // 如果在正则内部，则不用转换拼音
      if (rep.test(item)) {
        return textVal += item;
      }
      const pinyinArr = pinyin(item);
      textVal += `<ruby>${item}<rp>(</rp><rt>${pinyinArr[0]}</rt><rp>)</rp></ruby> &nbsp;&nbsp;`
    });
    return textVal;
  }
})
</script>

<style lang="scss">
rt {
  font-size: 12px;
  color: green;
}
</style>