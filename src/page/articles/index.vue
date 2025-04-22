<template>
  <div class="home">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in carouselItems" :key="item.id">
        <div
          class="carousel-content"
          :style="{ backgroundImage: `url(${item.bgImg})` }"
        >
          <div class="carousel-text">
            <h2>{{ item.title }}</h2>
            <!-- <p>{{ item.abstract }}</p> -->
            <div class="article-meta">
              <el-tag size="small">{{ item.typeName }}</el-tag>
              <span class="author">作者：{{ item.username }}</span>
            </div>
            <el-button type="primary" @click="viewArticle(item._id)"
              >阅读更多</el-button
            >
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 最新文章列表 -->
   <div class="articles-section">
      <h2 class="section-title">最新文章</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="article in data" :key="article._id">
          <el-card class="article-card" :body-style="{ padding: '0px' }">
            <img :src="article.bgImg" class="article-image">
            <div class="article-content">
              <el-tag size="small" class="article-type">{{ article.typeName }}</el-tag>
              <h3>{{ article.title }}</h3>
              <!-- <p class="article-abstract">{{ article.abstract }}</p> -->
              <div class="article-footer">
                <span class="author">{{ article.username }}</span>
                <el-button type="text" @click="viewArticle(article._id)">
                  阅读全文
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
              </div>
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
import { getArticlesData } from "@/server/modules/articles";
import { ArrowRight } from "@element-plus/icons-vue"
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const data = ref([])

onMounted(() => {
  getData()
})

const getData = async () => {
  const res = await getArticlesData()

  data.value = res.data.data
}

const carouselItems = computed(() => {
  return data.value.slice(0, 3)
})

const viewArticle = (id) => {
  router.push(`/article/${id}`)
}
</script>

<style lang="scss" scoped>
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
  width: 100%;
  margin-bottom: 70px;
}

.carousel-text h2 {
  margin: 0 0 10px 0;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
}

.articles-section {
  margin-top: 40px;
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

.article-type {
  margin-bottom: 10px;
}

.article-content h3 {
  margin: 10px 0;
  font-size: 18px;
  color: #303133;
}

.article-abstract {
  color: #606266;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.author {
  color: #909399;
  font-size: 14px;
}
</style>
