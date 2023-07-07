<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 15:33:34
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 16:58:30
 * @FilePath: \snow-vue\src\page\webgpu\newTriangleList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <canvas id="canvas" width="500" height="500"></canvas>
</template>

<script>
export default {
    name: 'NewTriangleList',
}
</script>

<script setup>
import { onMounted } from 'vue';

const init = async () => {
    // 用gpu实现旋转的三角形
    const canvas = document.getElementById('canvas');
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const context = canvas.getContext('gpupresent');

    const swapChainFormat = 'bgra8unorm';
    const swapChain = context.configureSwapChain({
        device,
        format: swapChainFormat
    });

    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: `
                    [[block]] struct Uniforms {
                        [[offset(0)]] color: vec4<f32>;
                        [[offset(16)]] rotation: f32;
                    };
                    [[group(0), binding(0)]] var<uniform> uniforms: Uniforms;

                    struct VertexOutput {
                        [[builtin(position)]] position: vec4<f32>;
                        [[location(0)]] color: vec4<f32>;
                    };

                    [[stage(vertex)]]
                    fn main([[location(0)]] position: vec2<f32>) -> VertexOutput {
                        var output: VertexOutput;
                        let pos = vec2<f32>(position.x, position.y * uniforms.rotation);
                        output.position = vec4<f32>(pos, 0.0, 1.0);
                        output.color = uniforms.color;
                        return output;
                    }
                `
            }),
            entryPoint: 'main'
        },
        fragment: {
            module: device.createShaderModule({
                code: `
                    [[stage(fragment)]]
                    fn main([[location(0)]] color: vec4<f32>) -> [[location(0)]] vec4<f32> {
                        return color;
                    }
                `
            }),
            entryPoint: 'main',
            targets: [{
                format: swapChainFormat
            }]
        },
        primitive: {
            topology: 'triangle-list'
        }
    });

    const verticesBuffer = device.createBuffer({
        size: 4 * 2 * 4,
        // eslint-disable-next-line no-undef
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true
    });
    new Float32Array(verticesBuffer.getMappedRange()).set([
        -0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5
    ]);
    verticesBuffer.unmap();
    
    const colorBuffer = device.createBuffer({
        size: 4 * 4 * 4,
        // eslint-disable-next-line no-undef
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true
    });
    new Float32Array(colorBuffer.getMappedRange()).set([
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 0, 1
    ]);
    colorBuffer.unmap();

    const uniformBuffer = device.createBuffer({
        size: 4 * 4 * 2,
        // eslint-disable-next-line no-undef
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });


    const render = () => {
        const colorAttachment = swapChain.getCurrentTexture().createView();

        const commandEncoder = device.createCommandEncoder();
        const renderPassEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [{
                view: colorAttachment,
                loadValue: [0, 0, 0, 1]
            }]
        });
        renderPassEncoder.setPipeline(pipeline);
        renderPassEncoder.setVertexBuffer(0, verticesBuffer);
        renderPassEncoder.setVertexBuffer(1, colorBuffer);
        renderPassEncoder.setBindGroup(0, device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [{
                binding: 0,
                resource: {
                    buffer: uniformBuffer
                }
            }]
        }));
        renderPassEncoder.draw(4, 1, 0, 0);
        renderPassEncoder.endPass();

        device.queue.submit([commandEncoder.finish()]);
    }

    let rotation = 0;
    const renderLoop = () => {
        rotation += 0.01;
        const uniformArray = new Float32Array(uniformBuffer.getMappedRange());
        uniformArray.set([Math.sin(rotation), Math.cos(rotation)]);
        uniformBuffer.unmap();
        render();
        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

    
}

onMounted(() => {
    init();
})
</script>
<style lang='scss' scoped></style>

