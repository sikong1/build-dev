<template>
    <div class="websocket">
        <span>使用该功能，请拉取后端代码 本地跑起来，vercel部署的node接口线上使用不了</span>
        <!-- <textarea cols="50" rows="20" v-model="requireData"></textarea> -->
        <div class="box">
            <div class="scroll" ref="scrollRef">
                <div class="item" v-for="item in requireData" :key="item.timestamp"
                    :style="{ textAlign: item.sendType === 0 ? 'left' : 'right' }">
                    <span>{{ item.content }}</span>
                    <p>{{ item.timestamp }}</p>
                </div>
            </div>
            <div class="input">
                <el-input v-model="message" placeholder="请输入内容" @keyup.enter="send"></el-input>
                <el-button style="margin-left: 8px" type="primary" @click="send">发送</el-button>
            </div>
        </div>
        <el-button type="primary" @click="connectWebScket">连接到服务器webSocket</el-button>
        <el-button type="danger" @click="closeConnect">关闭连接</el-button>
    </div>
</template>

<script>
export default {
    name: "websocketVue",
}
</script>
   
<script setup>
import { onUnmounted, ref, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

let websock = null //用于初始化为一个webSocket实例 不能使用ref，否则监听的方法不生效
const requireData = ref([]) //用于接收服务器返回的数据
const message = ref('') //发送的消息
const scrollRef = ref(null) //滚动条

//监听数据变化，滚动条滚动到底部
watch(() => requireData.value, () => {
    nextTick(() => {
        // scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
        scrollRef.value.lastElementChild.scrollIntoView();
    })
})

onUnmounted(() => {
    //销毁组件，跳转路由时关闭webSocket连接
    websock && websock.close();
})

//连接到webSocket
const connectWebScket = () => {
    initWebSocket();
}
//关闭连接
const closeConnect = () => {
    websock && websock.close();
}
//连接建立之后执行send方法发送数据
const websocketonopen = () => {
    // websocketsend(message.value);
    // message.value = '';
}
//连接建立失败重连
const websocketonerror = () => {
    initWebSocket();
}
//接收服务端数据
const websocketonmessage = (e) => {
    const redata = JSON.parse(e.data);
    if (redata.status === 200) {
        requireData.value = redata.data;
    } else {
        ElMessage({
            message: '接收到服务端发送的数据失败',
            type: 'error'
        })
    }
}
const send = () => {
    websocketsend(message.value);
    message.value = '';
}
//客户端发送数据
const websocketsend = (message) => {
    websock.send(message);
}
//关闭webSocket连接
const websocketclose = (e) => {
    console.log("关闭webSocket连接：", e);
}
const initWebSocket = () => {
    //初始化weosocket
    // 以    ws://服务器地址/webSocket  路由的形式建立连接
    const wsuri = process.env.VUE_APP_WS_URL + '/test';
    console.log('wsuri', typeof wsuri);
    websock = new WebSocket(wsuri);
    websock.onmessage = websocketonmessage;
    websock.onopen = websocketonopen;
    websock.onerror = websocketonerror;
    websock.onclose = websocketclose;
}
</script>
   
<style lang="scss" scoped>
.box {
    position: relative;
    width: 500px;
    padding: 10px 10px 50px 20px;
    border: 1px solid #ccc;
    margin-bottom: 20px;

    .scroll {
        height: 500px;
        overflow: auto;
    }

    .item {
        p {
            margin: 0;
            padding: 0;
            font-size: 14px;
            color: #929292;
            margin-top: 8px;
        }
    }

    .input {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
    }
}
</style>