<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="decorative-line top"></div>
    <div class="decorative-line bottom"></div>

    <!-- 主登录框 -->
    <div class="login-box">
      <!-- 标题 -->
      <h1 class="chinese-title">云中阁-{{ isLogin ? "登录" : "注册" }}</h1>

      <!-- 表单区域 -->
      <el-form
        class="login-form"
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
      >
        <!-- 用户名输入 -->
        <el-form-item prop="username">
          <el-input
            placeholder="用户名"
            v-model="ruleForm.username"
            prefix-icon="User"
            class="custom-input"
          />
        </el-form-item>

        <!-- 密码输入 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            prefix-icon="Lock"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item v-if="!isLogin" prop="newpassword">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="ruleForm.newpassword"
            prefix-icon="Lock"
            class="custom-input"
          />
        </el-form-item>

        <!-- 按钮组 -->
        <div class="button-group">
          <el-button
            v-if="isLogin"
            type="primary"
            class="login-btn"
            @click="loginClick"
            >登 录</el-button
          >
          <el-button
            v-else
            type="primary"
            class="login-btn"
            @click="registerSubmit"
            >确定</el-button
          >
          <div class="divider">或</div>
          <el-button v-if="isLogin" class="register-btn" @click="registerClick"
            >注 册</el-button
          >
          <el-button v-else class="register-btn" @click="backClick"
            >返回</el-button
          >
        </div>
      </el-form>
    </div>

    <!-- 底部装饰 -->
    <div class="bottom-decoration">
      <div class="circle"></div>
      <div class="line"></div>
      <div class="circle"></div>
    </div>
  </div>

  <Verify
    ref="verifyref"
    mode="pop"
    :captchaType="verifyName"
    :imgSize="{ width: '330px', height: '155px' }"
    @success="handleLogin"
  />
</template>

<script>
export default {
  name: "SnowVueIndex"
}
</script>

<script setup>
import { computed, reactive, ref } from "vue"
import { login, register } from "@/server/modules/login.js"
import { ElMessage } from "element-plus"
import { loginIn } from "@/utils/login"
import Verify from "@/components/Verifition/Verify.vue"
// import { isMobile } from '@/utils'
import { LoginEnum } from "@/enum/index.ts"
import { useRouter, useRoute } from "vue-router"
import { aesEncrypt } from "@/components/Verifition/utils/ase"
import { generateRandomString } from "@/utils/index"
import useStore from "@/pinia"

const { user } = useStore()
const router = useRouter()
const route = useRoute()

const ruleFormRef = ref(null)
const ruleForm = reactive({
  username: "",
  password: "",
  newpassword: "",
  phone: ""
})
const verifyName = ref(LoginEnum.clickWord.name)
// const arr = Object.values(LoginEnum)

// 自定义校验规则
const validatePass = (rule, value, callback) => {
  console.log(ruleForm.password, value, "kknnn")
  if (ruleForm.password !== value) {
    callback(new Error("两次输入密码不一致!"))
  } else {
    callback()
  }
}
const rules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号格式错误",
      trigger: "blur"
    }
  ],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
  ],

  newpassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" },
    // 自定义校验规则
    { validator: validatePass, trigger: "blur" }
  ]
}

const verifyref = ref(null)

const isLogin = computed(() => {
  return route.fullPath === "/login"
})

const registerSubmit = async () => {
  // 校验表单
  const valid = await ruleFormRef.value.validate()
  if (!valid) {
    return ElMessage({
      message: "请填写完整信息",
      type: "warning"
    })
  }
  // 校验验证码
  verifyref.value.show()
}

const loginClick = async () => {
  // 校验表单
  const valid = await ruleFormRef.value.validate()
  if (!valid) {
    return ElMessage({
      message: "请填写完整信息",
      type: "warning"
    })
  }
  // 校验验证码
  verifyref.value.show()
}

const handleLogin = async () => {
  if (!isLogin.value) return handleRegister()
  //加密
  const key = generateRandomString(16)
  const obj = JSON.parse(JSON.stringify(ruleForm))
  obj.password = await aesEncrypt(ruleForm.password, key)
  obj.key = key
  const res = await login(obj)
  if (res.data.status === 200) {
    // 将user信息存入localStorage
    user.setUserInfo(res.data.userInfo)
    loginIn(res.data.token)
  } else if (res.data.status === 400) {
    ElMessage({
      message: res.data.msg,
      type: "warning"
    })
    verifyref.value.closeBox()
  }
}

const handleRegister = async () => {
  //加密
  const key = generateRandomString(16);
  const obj = JSON.parse(JSON.stringify(ruleForm));
  obj.password = await aesEncrypt(obj.password, key);
  obj.newpassword = "";
  obj.key = key;
  const res = await register(obj);
  if (!res.data) {
    return;
  }
  const data = res.data;
  switch (data.status) {
    case 200:
      // 注册成功
      ElMessage({
        message: data.msg,
        type: "success",
      });
      // router.push('/login')

     successRegister(obj);
      break;
    case 400:
      // 注册失败, 取消验证码
      ElMessage({
        message: data.msg,
        type: "warning",
      });
      verifyref.value.closeBox();
      break;
  }
};

const successRegister = async (obj) => {
  const res = await login(obj);
  if (res.data.status === 200) {
    // 将user信息存入localStorage
    user.setUserInfo(res.data.user);
    loginIn(res.data.token);
  } else if (res.data.status === 400) {
    ElMessage({
      message: res.data.msg,
      type: "warning",
    });
    verifyref.value.closeBox();
  }
};

// 注册
const registerClick = () => {
  router.push("/register")
}
// 返回
const backClick = () => {
  router.go(-1)
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(150deg, #f4e6d4 0%, #d8c3a5 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.decorative-line {
  position: absolute;
  height: 2px;
  background: #b2967d;
  width: 80%;
  left: 10%;
  opacity: 0.3;
}

.decorative-line.top {
  top: 20%;
  transform: rotate(2deg);
}

.decorative-line.bottom {
  bottom: 20%;
  transform: rotate(-1deg);
}

.login-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px 50px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  width: 400px;
}

.chinese-title {
  font-family: "华文行楷", cursive;
  text-align: center;
  color: #6b4f3a;
  font-size: 2.5em;
  margin-bottom: 30px;
  letter-spacing: 4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.custom-input {
  margin-bottom: 20px;
}

.custom-input :deep(.el-input__wrapper) {
  background: #f8f1e8;
  border: 1px solid #d4c0ab;
  height: 45px;
  border-radius: 8px;
  color: #6b4f3a;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: #b2967d;
  box-shadow: 0 0 0 1px #b2967d inset;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.login-btn {
  background: linear-gradient(45deg, #b2967d, #9c7d64);
  border: none;
  height: 45px;
  font-size: 16px;
  letter-spacing: 4px;
  border-radius: 8px;
  transition: all 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(156, 125, 100, 0.3);
}

.register-btn {
  border: 1px solid #b2967d;
  color: #b2967d;
  height: 45px;
  font-size: 16px;
  letter-spacing: 4px;
  border-radius: 8px;
  background: transparent;
  transition: all 0.3s;
}

.register-btn:hover {
  color: #fff;
  background: #b2967d;
}

.divider {
  text-align: center;
  color: #d4c0ab;
  position: relative;
}

.divider:before,
.divider:after {
  content: "";
  display: inline-block;
  width: 45%;
  height: 1px;
  background: #d4c0ab;
  vertical-align: middle;
  margin: 0 10px;
}

.bottom-decoration {
  position: absolute;
  bottom: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #b2967d;
  opacity: 0.3;
}

.line {
  width: 100px;
  height: 2px;
  background: #b2967d;
  opacity: 0.3;
}
</style>
