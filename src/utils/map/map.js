import { loadModules, loadCss } from "esri-loader";
import {createLayer} from './createLayer'
import twoDimensionalOption from './twoDimensionalOption'
import config from './appConfig'

const win = window;
export const init = () => {
  return new Promise((resolve) => {
    // 加载css
    loadCss('/library/4.18/esri/css/main.css');
    getModules(["esri/config"]).then((modules) => {
      // 加载配置
      const [config] = modules;
      // 加载字体
      config.fontsUrl = '/library/ArcGIS_pbf_Font';
      config.log.level = "none";
      resolve(true);
    });
    // resolve(true);
  });
};

export const getModules = (modules) => {
  return new Promise((resolve) => {
    loadModules(modules).then((modules) => {
      resolve(modules); 
    });
  });
}

// 生成二维地图
export async function create2DView() {
  try {
    // 获取模块
    const [BaseMap, Map, MapView] = await getModules(["esri/Basemap", "esri/Map", "esri/views/MapView"]);
    // 创建底图
    const baseLayers = await createLayers2d();
    const baseMap = new BaseMap({
      baseLayers: baseLayers
    });
    // 创建地图
    const map = new Map({
      basemap: baseMap
    });
    // 创建视图
    const option = twoDimensionalOption;
    // 地图切换的时候，判断是否是2d地图，如果是2d地图，就把地图容器赋值给option.container
    if (win.config.DefaultMapType === "2d") {
      console.log(win.config)
      option.container = win.config.mapContainer;
    }
    option.map = map;
    // MapView 是把 Map 渲染成 2D 地图 。而 SceneView 则是把 Map 渲染成 3D 地图。
    // 必须接受一个 Map 对象作为参数，不然绘制不出来地图。
    const view2D = new MapView(option);
    // 隐藏地图控件
    view2D.ui.remove("attribution");
    view2D.ui.empty("top-left");
    view2D.ui.empty("top-right");
    // 设置地图背景色
    map.ground.surfaceColor = '#162733';
    // 设置地图弹窗
    view2D.popup.autoOpenEnabled = true;
    // 设置地图弹窗样式
    config.esriInstance.view2D = view2D;
    // 设置地图
    config.esriInstance.map2D = map;
    // 设置地图视图
    config.mapView = view2D;
    if (win.config.DefaultMapType == "2d") {
      config.esriInstance.is3D = false;
      config.activeView = config.mapView;
      const view = config.activeView;
      config.activeView.on("click", (evnet) => {
        // view.popup.visible = false;
        config.activeView.hitTest(evnet).then(async (res) => {
          console.log("点的信息", res, res.results);
          if (res.results.length <= 3) {
            view.popup.visible = false;
          }
          if (res && res.results && res.results[0]) {
            const point = res.results[0].graphic;
            // system.setFenceId(res.results[0].graphic.attributes.fenceId)
            console.log("点的信息point", point);
            if (point && point.attributes?.flagCode) {
              if (Array.isArray(point.attributes.flagCode)) {
                if (point.attributes.flagCode.includes("device")) {
                  return false;
                }
              }
              // await addLoadingPopup({
              //   longitude: point.attributes.longitude,
              //   latitude: point.attributes.latitude
              // });
              // setTimeout(() => {
              //    addPopup({
              //     longitude: point.attributes.longitude,
              //     latitude: point.attributes.latitude,
              //     idType: point.attributes.flagCode,
              //     info: point.attributes
              //   });
              // })
            }
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  } 
}

// 创建图层组2D
export async function createLayers2d() {
  const demLayers = [];
  for (const i in win.mapConfig) {
    const data = win.mapConfig[i];
    if (data.layerStyle === "2d") {
      let layer = config.layers.get(data.id);
      if (!layer) {
        layer = await createLayer(data);
        if (layer) {
          config.layers.set(data.id, layer);
          demLayers.push(layer);
        }
      }
    }
  }

  return demLayers;
}