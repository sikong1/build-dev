<template>
    <div>
        <canvas id="webgpu" style="width: 500px; height: 500px;"></canvas>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
// 在 web worker 中可以运行
async function init() {
    //...

    // 顶点着色器
    const vertex = /* wgsl */ `
        @vertex
        fn main(@location(1) pos: vec3<f32>) -> @builtin(position) vec4<f32> {
            return vec4<f32>(pos,1.0);
        }
        `
    // 片元着色器代码
    const fragment = /* wgsl */ `
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(1.0, 0.0, 0.0, 1.0);
        }
        `

    const adapter = await navigator.gpu.requestAdapter();// 浏览器请求GPU适配器
    // 获取GPU设备对象，通过GPU设备对象device的WebGPU API可以控制GPU渲染过程
    const device = await adapter.requestDevice();
    // 配置WebGPU上下文(Canvas元素作为WebGPU的画布)
    const canvas = document.getElementById('webgpu');
    const context = canvas.getContext('webgpu');
    const format = navigator.gpu.getPreferredCanvasFormat();//获取浏览器默认的颜色格式
    context.configure({
        device: device,//WebGPU渲染器使用的GPU设备对象
        format: format,//颜色格式
    });

    // 创建顶点数据的缓冲区
    const vertexArray = new Float32Array([
        // 三角形三个顶点坐标的x、y、z值
        0.0, 0.0, 0.0,//顶点1坐标
        1.0, 0.0, 0.0,//顶点2坐标
        0.0, 1.0, 0.0,//顶点3坐标
        // 0.0, 0.0, 1.0,//顶点3坐标

    ]);
    //类型化数组Float32Array一个数字元素，占用存储空间4字节，9个浮点数，数据字节长度9*4
    // console.log('类型化数组数据字节长度',vertexArray.byteLength);
    const vertexBuffer = device.createBuffer({
        size: vertexArray.byteLength,//顶点数据的字节长度
        //usage设置该缓冲区的用途
        // eslint-disable-next-line no-undef
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    //把vertexArray里面的顶点数据写入到vertexBuffer对应的GPU显存缓冲区中
    //获取顶点数据的偏移量(单位字节)，0表示从vertexArray的数据开始开头读取数据
    device.queue.writeBuffer(vertexBuffer, 0, vertexArray);


    // 创建一个WebGPU渲染管线对象pipeline
    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {//顶点相关配置
            // module:设置渲染管线要执行的顶点着色器代码
            module: device.createShaderModule({ code: vertex }),
            entryPoint: "main",//顶点着色器代码入口函数的名字
            buffers: [// 顶点所有的缓冲区模块设置
                {//其中一个顶点缓冲区设置
                    arrayStride: 3 * 4,//一个顶点数据占用的字节长度，该缓冲区一个顶点包含xyz三个分量，每个数字是4字节浮点数，3*4字节长度
                    // 顶点缓冲区属性
                    attributes: [{
                        shaderLocation: 1,//GPU显存上顶点缓冲区标记存储位置
                        format: "float32x3",//格式：loat32x3表示一个顶点数据包含3个32位浮点数
                        offset: 0//arrayStride表示每组顶点数据间隔字节数，offset表示读取改组的偏差字节数，没特殊需要一般设置0
                    }]
                }
            ]
        },
        fragment: {
            // module:设置渲染管线要执行的片元着色器代码
            module: device.createShaderModule({ code: fragment }),
            entryPoint: "main",//指定片元着色器入口函数
            targets: [{
                format: format//和WebGPU上下文配置的颜色格式保持一致
            }]
        },
        primitive: {
            topology: "triangle-list",//绘制三角形
            // topology: "line-list",//绘制线段
        }
    });

    // 创建GPU命令编码器对象
    const commandEncoder = device.createCommandEncoder();
    // 创建一个渲染通道对象
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            // 指向Canvas画布的纹理视图对象(Canvas对应的颜色缓冲区)
            // 该渲染通道renderPass输出的像素数据会存储到Canvas画布对应的颜色缓冲区(纹理视图对象)
            view: context.getCurrentTexture().createView(),
            storeOp: 'store',//像素数据写入颜色缓冲区  canvas画布能看到渲染效果
            // storeOp: 'discard',//舍弃像素数据，不写入目标缓冲区  canvas画布能看不到渲染效果
            clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 }, //背景颜色
            // loadOp: 'load',//clearValue的颜色不起作用
            loadOp: 'clear',//clearValue的颜色起作用
        }]
    });
    // 设置该渲染通道对应的渲染管线
    renderPass.setPipeline(pipeline);
    // 顶点缓冲区数据和渲染管线shaderLocation: 0表示存储位置关联起来
    renderPass.setVertexBuffer(0, vertexBuffer);
    // 绘制顶点数据
    renderPass.draw(3);
    // 结束命令.end()
    renderPass.end();
    // 命令编码器.finish()创建命令缓冲区(生成GPU指令存入缓冲区)
    const commandBuffer = commandEncoder.finish();
    // 命令编码器缓冲区中命令传入GPU设备对象的命令队列.queue
    device.queue.submit([commandBuffer]);
}
// init()

onMounted(() => {
    init();
});
</script>
<style lang='scss' scoped></style>
