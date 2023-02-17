<template>
  <div>

  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default {
  data() {
    return {

    };
  },

  mounted() {
    this.init();
    this.render();
  },
  methods: {
    // 模型初始化
    init() {
      let container = document.getElementById("container");
      // 设置相机
      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        10
      );

      this.camera.position.z = 2;
      this.scene = new THREE.Scene();
      let self = this;
      // 加载模型
      var loader = new GLTFLoader().setPath("/static/dalou/");
      loader.load("lou_danti.gltf", function (gltf) {
        var mesh = gltf.scene.children[0];
        mesh.scale.set(10, 10, 10);
        self.scene.add(mesh); // 将模型引入three
        console.log(gltf, "gltf");

        // 调用动画
        self.mixer = new THREE.AnimationMixer(mesh);
        var action = self.mixer.clipAction(gltf.animations[0]);
        action
          .stop()
          .setDuration(4)
          .play();
      });
      this.scene.add(loader);

      /*
        添加光源
      */
      //点光源
      var point = new THREE.PointLight(0xffffff);
      point.position.set(400, 200, 300); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      var ambient = new THREE.AmbientLight(0x999999);
      this.scene.add(ambient);
      /**
       * 相机设置
       */
      // var width = window.innerWidth; //窗口宽度
      // var height = window.innerHeight; //窗口高度
      // var k = width / height; //窗口宽高比
      // var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    render() {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      var time = this.clock.getDelta();
      if (this.mixer) {
        this.mixer.update(time);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>