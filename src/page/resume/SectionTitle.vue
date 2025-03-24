<!-- SectionTitle.vue -->
<template>
  <div class="section-title">
    <h2>{{ title }}</h2>
    <div class="divider"></div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped>
.section-title {
  margin: 30px 0 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.divider {
  height: 2px;
  background: #2c3e50;
  width: 60px;
}
</style>