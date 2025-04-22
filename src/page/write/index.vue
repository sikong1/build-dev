<template>
  <div class="write-blog">
    <h1 class="page-title">写博客</h1>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="blog-form"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>

      <el-form-item label="文章分类" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择文章分类"
          class="w-100"
        >
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="封面图片" prop="bgImg">
        <!-- <el-upload
          class="cover-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="beforeUpload"
        >
          <img v-if="form.bgImg" :src="form.bgImg" class="cover-image" />
          <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
        </el-upload> -->
        <img class="articles-img" :src="form.bgImg" alt="" />
      </el-form-item>

      <el-form-item label="文章摘要">
        <el-input
          v-model="form.abstract"
          type="textarea"
          :rows="3"
          placeholder="请输入文章摘要"
        />
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <!-- <el-input
          v-model="form.content"
          type="textarea"
          :rows="10"
          placeholder="请输入文章内容"
        /> -->
        <div style="border: 1px solid #ccc; z-index: 100;">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="form.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>

      <el-form-item label="标签">
        <el-tag
          v-for="tag in form.tag"
          :key="tag"
          class="mx-1"
          closable
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + 新标签
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">发布文章</el-button>
        <!-- <el-button @click="saveDraft">保存草稿</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "WiritePage"
}
</script>

<script setup>
import { ref, reactive, nextTick, onBeforeUnmount, shallowRef } from "vue"
import { ElMessage } from "element-plus"
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { setArticlesData } from "@/server/modules/articles";
import { articlesObs } from "@/utils/obs"
import useStore from "@/pinia"
import { useRouter } from "vue-router"

const router = useRouter()

const { user } = useStore()

const formRef = ref(null)
const InputRef = ref(null)
const inputVisible = ref(false)
const inputValue = ref("")
const editorRef = shallowRef()

const form = reactive({
  title: "",
  type: "",
  bgImg: `${articlesObs}/articles-bg.png`,
  abstract: "",
  content: "",
  tag: ""
})
const toolbarConfig = {}
const mode = 'default'
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {}
}

const categories = [
  { label: "前端开发", value: "1" },
  { label: "后端开发", value: "2" },
  { label: "开发工具", value: "3" },
  { label: "技术分享", value: "4" }
]

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const rules = reactive({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    {
      min: 2,
      max: 100,
      message: "标题长度应在2到100个字符之间",
      trigger: "blur"
    }
  ],
  type: [{ required: true, message: "请选择文章分类", trigger: "change" }],
  // abstract: [
  //   { required: true, message: "请输入文章摘要", trigger: "blur" },
  //   {
  //     min: 10,
  //     max: 300,
  //     message: "摘要长度应在10到300个字符之间",
  //     trigger: "blur"
  //   }
  // ],
  content: [
    { required: true, message: "请输入文章内容", trigger: "blur" },
    { min: 10, message: "文章内容至少100个字符", trigger: "blur" }
  ]
})


const handleClose = (tag) => {
  form.tag = form.tag.filter((t) => t !== tag)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value && !form.tag.includes(inputValue.value)) {
    form.tag.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ""
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      const obj = {
        ...form,
        username: user.userInfo.username,
        userId: user.userInfo._id,
        bgImg: form.bgImg
      }
      // TODO: 实现文章提交逻辑
      const res = await setArticlesData(obj)
      if (res.data.status !== 200) {
       return ElMessage.error(res.data.msg)
      }
      ElMessage.success("文章发布成功！")
      // 清空表单
      formRef.value.resetFields()

      // 跳转到文章列表
      router.push("/articles")
    }
  })
}

// const saveDraft = () => {
//   console.log("保存草稿:", form)
//   // TODO: 实现保存草稿逻辑
//   ElMessage.success("草稿保存成功！")
// }
</script>

<style scoped>
.write-blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  margin-bottom: 30px;
  font-size: 28px;
  color: #303133;
}

.blog-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .articles-img {
    width: 380px;
    height: 200px;
  }
}

.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}

.cover-uploader:hover {
  border-color: #409eff;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 178px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-image {
  width: 100%;
  height: 178px;
  object-fit: cover;
  display: block;
}

.w-100 {
  width: 100%;
}

.w-20 {
  width: 90px;
}

.mx-1 {
  margin: 0 4px;
}

.ml-1 {
  margin-left: 4px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.w-e-text-container) {
  height: 500px !important;
}
</style>
