
import request from '@/server/index'

// 获取验证图片
export function reqGet() {
    return request({
        url: '/code',
        method: 'get',
    });
}

// 滑动或者点选验证
export function reqCheck(data) {
    return request({
        url: '/code/check',
        method: 'post',
        data,
    });
}
