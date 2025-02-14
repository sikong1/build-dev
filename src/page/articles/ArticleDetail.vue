<template>
  <div class="article-detail">
    <div class="article-header" :style="{ backgroundImage: `url(${article.bgImg})` }">
      <div class="header-content">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <el-tag size="large">{{ article.typeName }}</el-tag>
          <span class="author">
            <el-icon><User /></el-icon>
            {{ article.username }}
          </span>
          <span class="tag" v-if="article.tag">
            <el-icon><Collection /></el-icon>
            {{ article.tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="article-container">
      <div class="article-content">
        <p class="abstract">{{ article.abstract }}</p>
        <div class="content markdown-body" v-html="renderedContent"></div>
        <!-- <div class="content markdown-body" v-html=article.content></div> -->
      </div>

      <div class="article-sidebar">
        <div class="author-info">
          <h3>关于作者</h3>
          <div class="author-card">
            <el-avatar :size="64" src="https://placeholder.co/100">{{ article.username }}</el-avatar>
            <h4>{{ article.username }}</h4>
            <p>作者简介待完善</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { User, Collection } from '@element-plus/icons-vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useRoute } from "vue-router"
import 'highlight.js/styles/github.css'
import { getArticlesItemData } from '@/server/modules/articles'
// import { sanitizeHtml } from '@/utils'

const route = useRoute()
// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  breaks: true // 支持GitHub风格的换行
})

const article = ref({
  _id: '',
  title: '',
  type: '',
  typeName: '',
  bgImg: '',
  content: '',
  abstract: '',
  username: '',
  userId: '',
  tag: ''
})

const renderedContent = computed(() => {
  // 将HTML内容转换为Markdown格式
  return marked(article.value.content)
})

onMounted(() => {
  getData()
})

const getData = async () => {
  console.log(route.params.id)

  const res = await getArticlesItemData(route.params.id)
  article.value = res.data.data
  console.log(article.value, "res")
}
</script>

<style>
/* Markdown样式 */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 { font-size: 2em; }
.markdown-body h2 { font-size: 1.5em; }
.markdown-body h3 { font-size: 1.25em; }

.markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

.markdown-body pre code {
  display: block;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}
</style>

<style scoped>
.article-detail {
  min-height: 100vh;
}

.article-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 40px 0;
}

.article-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  position: relative;
  color: white;
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.article-meta .el-icon {
  margin-right: 5px;
}

.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
}

.article-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.abstract {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.content {
  line-height: 1.8;
  color: #333;
}

.article-sidebar {
  position: sticky;
  top: 80px;
}

.author-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.author-info h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.author-card {
  text-align: center;
}

.author-card h4 {
  margin: 10px 0;
  color: #303133;
}

.author-card p {
  color: #606266;
  margin: 0;
}
</style>