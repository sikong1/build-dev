/*
 * @Author: liul
 * @Date: 2022-08-16 10:30:31
 * @Discription:
 */
const config = {
  mapView: null,
  sceneView: null,
  activeView: null,
  mapInitParam: null,
  baseMapItems: null,
  basemapVue: {},
  baseMapID: [],
  mapContainer: "mapContainer",
  layers: new Map(),
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
