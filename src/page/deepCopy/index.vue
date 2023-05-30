<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-12-07 10:49:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-26 23:35:12
 * @FilePath: \snow-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    
  </div>
</template>

<script>
  import { deepClone } from '@/utils/deepClone'
export default {
  name: 'SnowVueApp',

  data() {
    return {
    };
  },

  mounted() {
    const obj1 = {
      a: 1,
      b: 2,
    }
    const obj = deepClone(obj1)
    console.log(obj === obj1, 'obj === obj1')
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>