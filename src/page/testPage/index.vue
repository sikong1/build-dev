<template>
    <template v-if="loading">
        <div class="skeleton">
            <div v-for="item in new Array(8)" :key="item" v-skeleton-item></div>
        </div>
    </template>
    <div v-else class="waterfall-box" id="layout">
        <Waterfall :list="contentArr" :breakpoints="breakpoints">
            <template #item="{ item }">
                <div class="new">
                    <NewsVue :data="item" @click="newsClick(item)"></NewsVue>
                </div>
            </template>
        </Waterfall>
    </div>
    <el-button @click="addData">加载</el-button>
</template>
<script>
export default {
    name: 'testPageVue'
}
</script>
<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import ScrollReveal from 'scrollreveal'
// import ChildVue from './child.vue'
import res from './index'
import NewsVue from './news.vue'

const scrollRef = ref(null)
const loading = ref(false)
onMounted(() => {
    // setTimeout(() => {
    //     loading.value = true
    // }, 2000)
    // scrollRef.value = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '60px',
    //     duration: 1000,
    //     delay: 100,
    //     reset: true,
    //     container: '#layout',
    // })
    // view()
    getList(tableArr[0], false, true);
})
const tableArr = [
    {
        label: '全部',
        name: 'all',
    },
    {
        label: '公司新闻',
        name: 'company',
    },
    {
        label: '行业资讯',
        name: 'industry',
    },
];

const getList = (tabInfo = tableArr[0], more = false, isOne = false) => {
    isOne && (loading.value = true);

    setTimeout(() => {
    let records = res.records.slice(0, 3);
    console.log(records, 'recordsrecords');
    more ? (contentArr.value = [...contentArr.value, ...records]) : (contentArr.value = records)
        isOne && (loading.value = false);
        nextTick(() => {
            if (isOne) {
                scrollRef.value = ScrollReveal({
                    origin: 'bottom',
                    distance: '60px',
                    duration: 1000,
                    delay: 100,
                    reset: true,
                    container: '#layout',
                });
            }
            view();
        })
    }, 600)
};

const view = () => {
    scrollRef.value && scrollRef.value.reveal('.new', { duration: 1000, origin: 'bottom' });
};

onUnmounted(() => {
    scrollRef.value && scrollRef.value.destroy()
})

const contentArr = ref([
    {
        type: 1,
        className: 'box1'
    },
    {
        type: 1,
        className: 'box1'
    },
    {
        type: 2,
        className: 'box1'
    },
    {
        type: 1,
        className: 'box1'
    },
])
// const waterfallOptions = {
//     animationEffect: 'scale', // 设置动画效果
// }
const breakpoints = {
    1200: {
        // 当屏幕宽度小于等于1200
        rowPerView: 2,
    },
    800: {
        // 当屏幕宽度小于等于800
        rowPerView: 2,
    },
    500: {
        // 当屏幕宽度小于等于500
        rowPerView: 2,
    },
};

const addData = () => {
    getList([], true);
};

// const addItem = () => {
//     const time = new Date().getTime()
//     const className = `box${time}`
//     const arr = contentArr.value.map(item => ({
//         ...item,
//         className
//     }))
//     contentArr.value = [...contentArr.value, ...arr]
//     nextTick(() => {
//         view(`.${className}`)
//     });
// }
</script>
<style lang='scss' scoped>
.waterfall-box {
    width: 869px;
    transform: translate(-11px, -8px);

    .box {
        background-color: #ccc;

    }

    .one {
        width: 400px;
        height: 100px;
    }

    .two {
        width: 400px;
        height: 200px;
    }
}

.item {
    margin: 10px;
    border: 1px solid #ccc;
    padding: 10px;
}
</style>
