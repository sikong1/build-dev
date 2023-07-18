<template>
    <div v-skeleton="lastFlag" class="last">
        <img v-skeleton-item src="@/assets/images/avatar.png" alt="">
        <span v-skeleton-item>13131313</span>
    </div>
</template>
<script setup>

defineProps({
    lastFlag: {
        type: Boolean,
        default: false
    }
})
</script>
<style lang='scss' scoped>
.last {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
    }
}
</style>
