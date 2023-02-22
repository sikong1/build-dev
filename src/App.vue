<template>
  <div>
    <input type="text" v-model="name">
    <input type="text" v-model="password">
    <el-button @click="getData">登录</el-button>
    <el-button @click="register">注册</el-button>
  </div>
</template>

<script>
import { login, postRegister } from '@/server/models/login.js'
export default {
  name: 'SnowVueApp',

  data() {
    return {
      name: '',
      password: ''
    };
  },

  mounted() {
  },

  methods: {
    async getData() {
      const res = await login(this.name, this.password)
      console.log('res', res);
    },

    async register() {
      const res = await postRegister(this.name, this.password)
      console.log('res', res);
    }
  },
};
</script>

<style lang="scss" scoped></style>