<template>
    <div style="position: relative">
        <div class="verify-img-out">
            <div
                class="verify-img-panel"
                :style="{
                    width: setSize.imgWidth,
                    height: setSize.imgHeight,
                    'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
                    'margin-bottom': vSpace + 'px',
                }"
            >
                <div v-show="showRefresh" class="verify-refresh" style="z-index: 3" @click="refresh">
                    <i class="iconfont icon-refresh"></i>
                </div>
                <img
                    ref="canvas"
                    :src="pointBackImgBase"
                    alt=""
                    style="width: 100%; height: 100%; display: block"
                    @click="bindingClick ? canvasClick($event) : undefined"
                />

                <div
                    v-for="(tempPoint, index) in tempPoints"
                    :key="index"
                    class="point-area"
                    :style="{
                        'background-color': '#1abd6c',
                        color: '#fff',
                        'z-index': 9999,
                        width: '20px',
                        height: '20px',
                        'text-align': 'center',
                        'line-height': '20px',
                        'border-radius': '50%',
                        position: 'absolute',
                        top: parseInt(tempPoint.y - 10) + 'px',
                        left: parseInt(tempPoint.x - 10) + 'px',
                    }"
                >
                    {{ index + 1 }}
                </div>
            </div>
        </div>
        <!-- 'height': this.barSize.height, -->
        <div
            class="verify-bar-area"
            :style="{
                width: setSize.imgWidth,
                color: barAreaColor,
                'border-color': barAreaBorderColor,
                'line-height': barSize.height,
            }"
        >
            <span class="verify-msg">{{ text }}</span>
        </div>
    </div>
</template>
<script type="text/babel">
/**
 * VerifyPoints
 * @description 点选
 * */
import { resetSize } from '../utils/util';
import { aesEncrypt } from '../utils/ase';
import { reqGet, reqCheck } from '../api/index';
import { onMounted, reactive, ref, nextTick, toRefs, getCurrentInstance } from 'vue';
export default {
    name: 'VerifyPoints',
    props: {
        // 弹出式pop，固定fixed
        mode: {
            type: String,
            default: 'fixed',
        },
        captchaType: {
            type: String,
        },
        // 间隔
        vSpace: {
            type: Number,
            default: 5,
        },
        imgSize: {
            type: Object,
            default() {
                return {
                    width: '310px',
                    height: '155px',
                };
            },
        },
        barSize: {
            type: Object,
            default() {
                return {
                    width: '310px',
                    height: '40px',
                };
            },
        },
    },
    setup(props) {
        const { mode, captchaType } = toRefs(props);
        const { proxy } = getCurrentInstance();
        let secretKey = ref(''); // 后端返回的ase加密秘钥
        let checkNum = ref(3); // 默认需要点击的字数
        let fontPos = reactive([]); // 选中的坐标信息
        let checkPosArr = reactive([]); // 用户点击的坐标
        let num = ref(1); // 点击的记数
        let pointBackImgBase = ref(''); // 后端获取到的背景图片
        let poinTextList = reactive([]); // 后端返回的点击字体顺序
        // let backToken = ref(''); // 后端返回的token值
        let setSize = reactive({
            imgHeight: 0,
            imgWidth: 0,
            barHeight: 0,
            barWidth: 0,
        });
        let tempPoints = reactive([]);
        let text = ref('');
        let barAreaColor = ref(undefined);
        let barAreaBorderColor = ref(undefined);
        let showRefresh = ref(true);
        let bindingClick = ref(true);

        const init = () => {
            // 加载页面
            fontPos.splice(0, fontPos.length);
            checkPosArr.splice(0, checkPosArr.length);
            num.value = 1;
            getPictrue();
            nextTick(() => {
                let { imgHeight, imgWidth, barHeight, barWidth } = resetSize(proxy);
                setSize.imgHeight = imgHeight;
                setSize.imgWidth = imgWidth;
                setSize.barHeight = barHeight;
                setSize.barWidth = barWidth;
                proxy.$parent.$emit('ready', proxy);
            });
        };
        onMounted(() => {
            // 禁止拖拽
            init();
            proxy.$el.onselectstart = function () {
                return false;
            };
        });
        const canvas = ref(null);
        const canvasClick = (e) => {
            checkPosArr.push(getMousePos(canvas, e));
            if (num.value === checkNum.value) {
                num.value = createPoint(getMousePos(canvas, e));
                // 按比例转换坐标值
                let arr = pointTransfrom(checkPosArr, setSize);
                checkPosArr.length = 0;
                checkPosArr.push(...arr);
                // 等创建坐标执行完
                setTimeout(() => {
                    // var flag = this.comparePos(this.fontPos, this.checkPosArr);
                    // 发送后端请求
                    // let captchaVerification = secretKey.value
                    //     ? aesEncrypt(backToken.value + '---' + JSON.stringify(checkPosArr), secretKey.value)
                    //     : backToken.value + '---' + JSON.stringify(checkPosArr);
                    let data = {
                        captchaType: captchaType.value,
                        pointJson: secretKey.value
                            ? aesEncrypt(JSON.stringify(checkPosArr), secretKey.value)
                            : JSON.stringify(checkPosArr),
                        // token: backToken.value,
                    };
                    reqCheck(data).then((response) => {
                        let res = response.data.data;
                        if (res.repCode === '0000') {
                            barAreaColor.value = '#4cae4c';
                            barAreaBorderColor.value = '#5cb85c';
                            text.value = '验证成功';
                            bindingClick.value = false;
                            if (mode.value === 'pop') {
                                setTimeout(() => {
                                    proxy.$parent.clickShow = false;
                                    refresh();
                                }, 1500);
                            }
                            proxy.$parent.$parent.$emit('success');
                        } else {
                            proxy.$parent.$parent.$emit('error', proxy);
                            barAreaColor.value = '#d9534f';
                            barAreaBorderColor.value = '#d9534f';
                            text.value = '验证失败';
                            setTimeout(() => {
                                // refresh();
                            }, 700);
                        }
                    });
                }, 400);
            }
            if (num.value < checkNum.value) {
                num.value = createPoint(getMousePos(canvas, e));
            }
        };
        // 获取坐标
        const getMousePos = function (obj, e) {
            let x = e.offsetX;
            let y = e.offsetY;
            return { x, y };
        };
        // 创建坐标点
        const createPoint = function (pos) {
            tempPoints.push({ ...pos });
            return num.value + 1;
        };
        const refresh = function () {
            tempPoints.splice(0, tempPoints.length);
            barAreaColor.value = '#000';
            barAreaBorderColor.value = '#ddd';
            bindingClick.value = true;
            fontPos.splice(0, fontPos.length);
            checkPosArr.splice(0, checkPosArr.length);
            num.value = 1;
            getPictrue();
            text.value = '验证失败';
            showRefresh.value = true;
        };

        // 请求背景图片和验证图片
        function getPictrue() {
            let data = {
                captchaType: captchaType.value,
            };
            reqGet(data).then((response) => {
                let res = response.data.data;
                if (res.repCode === '0000') {
                    pointBackImgBase.value = res.repData.originalImageBase64;
                    // backToken.value = res.repData.token;
                    secretKey.value = res.repData.secretKey;
                    poinTextList.value = res.repData.wordList;
                    text.value = '请依次点击【' + poinTextList.value.join(',') + '】';
                    checkNum.value = poinTextList.value.length
                } else {
                    text.value = res.repMsg;
                }
            });
        }
        // 坐标转换函数
        const pointTransfrom = function (pointArr, imgSize) {
            let newPointArr = pointArr.map((p) => {
                let x = Math.round((310 * p.x) / parseInt(imgSize.imgWidth));
                let y = Math.round((155 * p.y) / parseInt(imgSize.imgHeight));
                return { x, y };
            });
            return newPointArr;
        };
        return {
            secretKey,
            checkNum,
            fontPos,
            checkPosArr,
            num,
            pointBackImgBase,
            poinTextList,
            // backToken,
            setSize,
            tempPoints,
            text,
            barAreaColor,
            barAreaBorderColor,
            showRefresh,
            bindingClick,
            init,
            canvas,
            canvasClick,
            getMousePos,
            createPoint,
            refresh,
            getPictrue,
            pointTransfrom,
        };
    },
};
</script>
