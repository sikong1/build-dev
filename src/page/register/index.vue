<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 20:33:14
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-15 10:12:44
 * @FilePath: \snow-vue\src\page\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="newpassword">
        <el-input v-model="ruleForm.newpassword" type="password" />
      </el-form-item>
      <!-- <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" />
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
        <el-button style="width: 80px" @click="backClick">返回</el-button>
        <el-button style="width: 80px" @click="registerClick">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
  <Verify
    ref="verifyref"
    mode="pop"
    :captchaType="verifyName"
    :imgSize="{ width: '330px', height: '155px' }"
    @success="handleRegister"
  />
</template>

<script>
export default {
  name: "SnowVueIndex",
};
</script>

<script setup>
import { reactive, ref } from "vue";
import Verify from "@/components/Verifition/Verify.vue";
// import { isMobile } from '@/utils'
import { LoginEnum } from "@/enum/index.ts";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { login, register } from "@/server/modules/login.js";
import { aesEncrypt } from "@/components/Verifition/utils/ase";
import { generateRandomString } from "@/utils/index";
import { loginIn } from "@/utils/login";
import useStore from "@/pinia";

const router = useRouter();
const { user } = useStore();

const formSize = "small";
const ruleFormRef = ref(null);
const ruleForm = reactive({
  username: "",
  password: "",
  phone: "",
  newpassword: "",
});
const verifyName = ref(LoginEnum.clickWord.name);
// const arr = Object.values(LoginEnum)

// 自定义校验规则
const validatePass = (rule, value, callback) => {
  console.log(ruleForm.password, value, "kknnn");
  if (ruleForm.password !== value) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" },
  ],
  newpassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" },
    // 自定义校验规则
    { validator: validatePass, trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号格式错误",
      trigger: "blur",
    },
  ],
};

// 注册成功
const verifyref = ref(null);
const registerClick = async () => {
  // 校验表单
  const valid = await ruleFormRef.value.validate();
  if (!valid) {
    return ElMessage({
      message: "请填写完整信息",
      type: "warning",
    });
  }
  // 校验验证码
  verifyref.value.show();
};

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

      handleLogin(obj);
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

const handleLogin = async (obj) => {
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

// 返回
const backClick = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.login-box {
  position: fixed;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}
</style>
