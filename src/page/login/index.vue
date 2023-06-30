<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 20:33:14
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-30 15:48:20
 * @FilePath: \snow-vue\src\page\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 180px;" type="primary" @click="loginClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  <Verify ref="verifyref" mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }"
    @success="handleLogin" />
</template>

<script>
export default {
  name: 'SnowVueIndex',
};
</script>

<script setup>
import { reactive, ref } from 'vue'
import { login } from '@/api/modules/login.js';
import { ElMessage } from 'element-plus';
import { loginIn } from '@/utils/login';
import Verify from '@/components/Verifition/Verify.vue'


const formSize = 'small';
const ruleFormRef = ref(null)
const ruleForm = reactive({
  username: '',
  password: '',
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' },
  ],
}

const verifyref = ref(null)
const loginClick = async () => {
  // 校验表单
  const valid = await ruleFormRef.value.validate()
  if (!valid) {
    return ElMessage({
      message: '请填写完整信息',
      type: 'warning',
    })
  }
  // 校验验证码
  verifyref.value.show()
}

const handleLogin = async () => {
  const res = await login(ruleForm)

  if (res.data.status === 200) {
    loginIn(res.data.token)
  } else if (res.data.status === 400) {
    ElMessage({
      message: res.data.message,
      type: 'warning',
    })
  }
}

</script>

<style lang="scss" scoped>
.login-box {
  position: fixed;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}
</style>