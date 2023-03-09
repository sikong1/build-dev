/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-03-08 14:59:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-03-08 16:13:13
 * @FilePath: \snow-vue\src\utils\map\appConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const config = {
  mapView: null, // 地图视图
  sceneView: null, // 三维视图
  activeView: null, // 当前视图
  mapInitParam: null, // 地图初始化参数
  baseMapItems: null, // 底图列表
  basemapVue: {}, // 底图组件
  baseMapID: [], // 底图id
  mapContainer: "mapContainer", // 地图容器
  layers: new Map(), // 图层
  baseMap: [], // 二维地图切换，重新构建的
  backupLayers: [], // 切换坐标系，备份图层
  MapSecondVue: null, // 地图组件
  measurementArgument: null, // 测量工具
  highlight: null,
  evt: null,
  esriInstance: {
    is3D: false // 是否三维
  }
};

export default config;
