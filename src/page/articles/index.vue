<template>
  <div class="home">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in carouselItems" :key="item.id">
        <div
          class="carousel-content"
          :style="{ backgroundImage: `url(${item.image})` }"
        >
          <div class="carousel-text">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <el-button type="primary" @click="readMore(item)"
              >阅读更多</el-button
            >
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 最新文章列表 -->
    <div class="latest-articles">
      <h2 class="section-title">最新文章</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="article in latestArticles" :key="article.id">
          <el-card class="article-card" :body-style="{ padding: '0px' }">
            <img :src="article.image" class="article-image" />
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <div class="article-meta">
                <el-icon><Calendar /></el-icon>
                <span>{{ article.date }}</span>
              </div>
              <p>{{ article.summary }}</p>
              <el-button type="text" @click="readMore(article)">
                阅读全文
                <el-icon class="el-icon--right"><ArrowRight /></el-icon>
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlesPage"
}
</script>

<script setup>
import { Calendar, ArrowRight } from "@element-plus/icons-vue"

const carouselItems = [
  {
    id: 1,
    title: "探索Vue3新特性",
    description: "深入了解Vue3的Composition API和新的响应式系统",
    image: "https://picsum.photos/1200/400?random=1"
  },
  {
    id: 2,
    title: "TypeScript最佳实践",
    description: "使用TypeScript提升代码质量和开发效率",
    image: "https://picsum.photos/1200/400?random=2"
  },
  {
    id: 3,
    title: "现代化前端工程化",
    description: "探讨前端工程化的最新趋势和实践",
    image: "https://picsum.photos/1200/400?random=3"
  }
]

const latestArticles = [
  {
    id: 1,
    title: "Vue3组件设计模式",
    summary: "探讨Vue3中常用的组件设计模式和最佳实践...",
    date: "2024-03-20",
    image: "https://picsum.photos/400/200?random=4"
  },
  {
    id: 2,
    title: "TypeScript高级技巧",
    summary: "深入理解TypeScript的类型系统和高级特性...",
    date: "2024-03-19",
    image: "https://picsum.photos/400/200?random=5"
  },
  {
    id: 3,
    title: "Element Plus实战",
    summary: "使用Element Plus构建现代化的后台管理系统...",
    date: "2024-03-18",
    image: "https://picsum.photos/400/200?random=6"
  }
]

const readMore = (item) => {
  console.log("Reading more about:", item.title)
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.carousel-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 40px;
}

.carousel-text {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  color: white;
  margin-bottom: 40px;
}

.carousel-text h2 {
  margin: 0 0 10px 0;
}

.section-title {
  margin: 40px 0 20px;
  font-size: 24px;
  color: #303133;
}

.article-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 20px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #909399;
  margin: 10px 0;
}

.article-content h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.article-content p {
  color: #606266;
  margin: 10px 0;
}
</style>
