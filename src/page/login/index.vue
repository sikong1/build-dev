<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 20:33:14
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-15 09:56:01
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
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <!-- <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" type="phone" />
      </el-form-item> -->
      <!-- <el-form-item>
        <div style="margin-top: 20px">
          <el-radio-group v-model="verifyName" size="small">
            <el-radio-button v-for="(item, index) in arr" :key="index" :label="item.name">{{ item.value
            }}</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item> -->
      <el-form-item>
        <el-button style="width: 80px;" @click="registerClick">注册</el-button>
        <el-button style="width: 80px;" type="primary" @click="loginClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  <Verify ref="verifyref" mode="pop" :captchaType="verifyName" :imgSize="{ width: '330px', height: '155px' }"
    @success="handleLogin" />
</template>

<script>
export default {
  name: 'SnowVueIndex',
};
</script>

<script setup>
import { reactive, ref } from 'vue'
import { login } from '@/server/modules/login.js';
import { ElMessage } from 'element-plus';
import { loginIn } from '@/utils/login';
import Verify from '@/components/Verifition/Verify.vue'
// import { isMobile } from '@/utils'
import { LoginEnum } from '@/enum/index.ts'
import { useRouter } from 'vue-router'
import { aesEncrypt } from '@/components/Verifition/utils/ase';
import { generateRandomString } from '@/utils/index';
import useStore from "@/pinia";

const { user } = useStore()
const router = useRouter()

const formSize = 'small';
const ruleFormRef = ref(null)
const ruleForm = reactive({
  username: '',
  password: '',
  phone: '',
});
const verifyName = ref(LoginEnum.clickWord.name)
// const arr = Object.values(LoginEnum)

const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号格式错误',
      trigger: 'blur',
    },
  ],
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
  //加密
  const key = generateRandomString(16)
  const obj = JSON.parse(JSON.stringify(ruleForm))
  obj.password = await aesEncrypt(ruleForm.password, key)
  obj.key = key
  const res = await login(obj)
  if (res.data.status === 200) {
    // 将user信息存入localStorage
    user.setUserInfo(res.data.user)
    loginIn(res.data.token)
  } else if (res.data.status === 400) {
    ElMessage({
      message: res.data.msg,
      type: 'warning',
    })
    verifyref.value.closeBox()
  }
}

// 注册
const registerClick = () => {
  router.push('/register')
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