/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-01-09 11:22:43
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-01-09 11:46:24
 * @FilePath: \snow-vue\src\utils\threeJs.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
/**
 * 初始化
*/
export function init() {
  // 容器
  const container = document.createElement( 'div' );
  document.body.appendChild( container );
  // 定义相机
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.z = 1000;
  camera.position.y = 0;
  // 定义场景
  const scene = new THREE.Scene();
  // 定义渲染器
  const renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  // 定义性能监控组件
  const stats = new Stats();
  container.appendChild( stats.dom );
  window.addEventListener( 'resize', onWindowResize, false );	
  // 定义光线
  const ambientLight = new THREE.AmbientLight('#fff', 1) // obj 唯一 id
  scene.add(ambientLight)
}
