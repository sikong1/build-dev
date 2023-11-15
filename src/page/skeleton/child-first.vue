<template>
    <div class="first">
        <div v-skeleton-item class="img">
            <img src="@/assets/images/avatar.png" alt="">
        </div>
        <span v-skeleton-item>13131313</span>
    </div>
</template>
<script>
export default {
    name: 'childVue'
}
</script>
<script setup>
</script>
<style lang='scss' scoped>
.first {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.img {
    border-radius: 50%;
    margin-bottom: 20px;
}

img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
