import { loadModules, loadCss } from "esri-loader";
import {createLayer} from './createLayer'
import twoDimensionalOption from './twoDimensionalOption'
import config from './appConfig'

const win = window;
export const init = () => {
  return new Promise((resolve) => {
    loadCss('/library/4.18/esri/css/main.css');
    getModules(["esri/config"]).then((modules) => {
      const [config] = modules;
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
    const [BaseMap, Map, MapView] = await getModules(["esri/Basemap", "esri/Map", "esri/views/MapView"]);
    const baseLayers = await createLayers2d();
    const baseMap = new BaseMap({
      baseLayers: baseLayers
    });
    const map = new Map({
      basemap: baseMap
    });
    const option = twoDimensionalOption;
    // option.container = "map";
    if (win.config.DefaultMapType === "2d") {
      console.log(win.config)
      option.container = win.config.mapContainer;
    }
    option.map = map;
    const view2D = new MapView(option);
    view2D.ui.remove("attribution");
    view2D.ui.empty("top-left");
    view2D.ui.empty("top-right");
    map.ground.surfaceColor = '#162733';
    view2D.popup.autoOpenEnabled = true;
    config.esriInstance.view2D = view2D;
    config.esriInstance.map2D = map;
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