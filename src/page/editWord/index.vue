<template>
  <div>
    <!-- add more textareas for additional placeholders as needed -->
    <el-form ref="ruleFormRef" :model="data" :rules="dataRules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-row>
        <el-col :span="6">
          <el-form-item label="支出事由：" prop="expenditure">
            <el-input type="text" v-model="data.expenditure" name="" id="" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额（元）：" prop="amount">
            <el-input-number v-model="data.amount" :precision="1" :step="0.1" :max="10000" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支出报销种类：" prop="type">
            <el-select v-model="data.type" placeholder="请选择">
              <el-option v-for="item in types" :key="item.value" :label="String(item.label)" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门经理：" prop="manager">
            <el-input type="text" v-model="data.manager" name="" id="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="日期：" prop="date">
        <el-date-picker class="m-t-10" type="date" v-model="data.date" placeholder="选择日期" />
      </el-form-item>
    </el-form>
    <div class="m-t-10">... ...</div>
    <el-button class="m-t-10" type="primary" @click="generateDocx">下载文档</el-button>
  </div>
</template>

<script>
export default {
  name: 'EditWord',
};
</script>

<script setup>
import useEditWord from '@/hooks/useEditWord.js'
import { reactive, ref } from 'vue';
import FileSaver from 'file-saver';
import { digitUppercase } from '@/utils'
import dayjs from 'dayjs'

const { downloadLink, getDocxLink } = useEditWord()

const types = [
  {
    value: 1,
    label: '餐饮费',
  },
  {
    value: 2,
    label: '交通费',
  },
  {
    value: 3,
    label: '住宿费',
  },
  {
    value: 4,
    label: '其他',
  }
]

const formSize = 'small'
const data = reactive({
  expenditure: '', // 支出事由
  amount: '', // 金额
  amountText: '', // 金额转成中文大写
  manager: '', // 部门经理
  type: '', // 报销种类
  date: '', // 日期
})

const dataRules = {
  expenditure: [
    { required: true, message: '请输入支出事由', trigger: 'blur' },
  ],
  amount: [
    { required: true, message: '请输入金额', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择报销种类', trigger: 'blur' },
  ],
  manager: [
    { required: true, message: '请输入部门经理', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '请选择日期', trigger: 'blur' },
  ],
}

const ruleFormRef = ref(null)
const generateDocx = async () => {
  // 验证表单
  const valid = await ruleFormRef.value.validate()
  if (!valid) return
  // 金额转成中文大写
  const amount = data.amount
  data.amountText = digitUppercase(amount)
  // 日期转换
  const newData = JSON.parse(JSON.stringify(data))
  newData.date = dayjs(newData.date).format('YYYY年MM月DD日')
  await getDocxLink('ceshi.docx', newData)
  FileSaver.saveAs(downloadLink.value, 'test1.docx')
}
</script>

<style lang="scss" scoped>
.m-t-10 {
  margin-top: 10px;
}

.m-b-10 {
  margin-bottom: 20px;
}

.flex-c {
  display: flex;
  align-items: center;
}
</style>
