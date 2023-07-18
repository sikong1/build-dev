/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 16:27:53
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-14 17:31:41
 * @FilePath: /vue3.0-ts/src/directives/modules/skeleton.ts
 * @Description: 骨架屏指令
 */
import { reactive, watchEffect, h, render, ref, type Ref } from 'vue';
import { typeId } from '@/enum/skeleton';

interface loadingType {
    loading: boolean;
}
interface itemType extends loadingType {
    list: HTMLElement[];
}
interface elArrType {
    el: HTMLElement;
    type: string;
}
interface aloneType extends loadingType {
    type: string;
}

interface typeIdType {
    [key: string]: itemType;
}
const stateObj: Ref<typeIdType> = ref({
    [typeId.ALL]: {
        loading: false,
        list: [] as HTMLElement[],
    },
});
const styleFn = (el: HTMLElement) => {
    return {
        position: 'absolute',
        top: el.getBoundingClientRect().top + 'px',
        left: el.getBoundingClientRect().left + 'px',
        width: el.getBoundingClientRect().width + 'px',
        height: el.getBoundingClientRect().height + 'px',
        borderRadius: getComputedStyle(el).borderRadius,
        animation: 'mu-skeleton-loading 1.4s ease infinite',
        background: `linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)`,
        backgroundSize: `400% 100%`,
    };
};
const id = '__skeleton-id';
watchEffect(() => {
    const keys = Object.keys(stateObj.value);
    const elArr: elArrType[] = [];
    keys.forEach((item) => {
        stateObj.value[item].list.forEach((el: HTMLElement) => {
            elArr.push({
                el,
                type: item,
            });
        });
    });

    const children = elArr.map((item: elArrType) =>
        h('div', {
            style: styleFn(item.el),
            [id]: item.type,
        }),
    );

    // 创建 div 容器
    const container = h('div', children);

    // 将 div容器 渲染到 body 中
    render(container, document.body);
});

/**
 *
 * @param loading 加载状态
 * @param type 类型id
 */
const removeDom = (loading: boolean, type: string) => {
    if (!loading) {
        const elArr = document.querySelectorAll(`[${id}=${type}]`);
        // 删除dom
        elArr.forEach((item: Element) => {
            item.parentNode!.removeChild(item);
        });
    }
};

/**
 * @description: 骨架屏全局指令，全局loading
 */
const Skeleton = {
    mounted(el: HTMLElement, binding: { value: boolean }) {
        console.log('mounted---', binding.value);

        stateObj.value[typeId.ALL].loading = binding.value;
    },
    updated(el: HTMLElement, binding: { value: boolean }) {
        console.log('updated---', binding.value);
        stateObj.value[typeId.ALL].loading = binding.value;
        removeDom(binding.value, typeId.ALL);
    },
    unmounted(el: HTMLElement, binding: { value: boolean }) {
        console.log('unmounted---111', binding.value);
        stateObj.value[typeId.ALL].loading = false;
    },
};

/**
 * @description: 骨架屏全局指令，全局loading，用来增加el和控制骨架屏的显示隐藏
 */
const SkeletonItem = {
    mounted(el: HTMLElement, binding: any) {
        console.log(stateObj.value, 'stateObj.value[typeId.ALL]');
        stateObj.value[typeId.ALL].list.push(el);
    },
    unmounted(el: HTMLElement) {
        // 删除 el
        stateObj.value[typeId.ALL].list = [];
    },
};

/**
 * @description: 单独骨架屏使用，不需要使用 v-skeleton-item 指令，用于处理多个接口的骨架屏
 */
const SkeletonAlone = {
    mounted(el: HTMLElement, binding: { value: aloneType }) {
        // 保存 el
        const { loading, type } = binding.value;
        if (stateObj.value[type]) {
            stateObj.value[type].list.push(el);
        } else {
            stateObj.value = {
                ...stateObj.value,
                [type]: reactive({
                    loading: loading,
                    list: [el],
                }),
            };
        }
    },
    updated(el: HTMLElement, binding: { value: aloneType }) {
        stateObj.value[binding.value.type].loading = binding.value.loading;
        removeDom(binding.value.loading, binding.value.type);
        console.log('updated---item', binding.value);
    },
    unmounted(el: HTMLElement, binding: { value: aloneType }) {
        // 删除 el
        stateObj.value[binding.value.type] = {
            loading: false,
            list: [],
        };
    },
};

export { Skeleton, SkeletonItem, SkeletonAlone };
