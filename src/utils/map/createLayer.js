import { getModules } from './map'
import { layerEnum } from './appEnum'

// 创建图层
export async function createLayer(data) {
  try {
    data.serviceUrl = process.env.NODE_ENV == "development" || data.type === 'Scene' ? data.serviceUrl : data.formal;
    let layer = null;
    const options = {
      url: data.serviceUrl,
      outFields: ["*"],
      spatialReference: data.spatialReference || {
        wkid: 4490
      }
    };
    const Layer = await getLayerModule(data.layerType);
    switch (data.layerType) {
      case layerEnum.MapImage:
        // eslint-disable-next-line no-case-declarations
        {
          const index = data.serviceUrl.lastIndexOf("/");
          const id = data.serviceUrl.substring(index + 1, data.serviceUrl.length);
          if (!isNaN(parseInt(id))) {
            layer = new Layer({
              url: data.serviceUrl.substring(0, index),
              sublayers: [
                {
                  id: parseInt(id),
                  visible: true
                }
              ]
            });
          } else {
            layer = new Layer({
              url: data.serviceUrl
            });
          }
        }
        break;
      case layerEnum.Scene:
        layer = new Layer({ url: options.url });
        break;
      case layerEnum.Tile:
        // options.version = 10.5;
        layer = new Layer(options);
        break;
      case layerEnum.WebTile:
        // if (config.constraint) {
        // eslint-disable-next-line no-eval
       { const spatialReference = data.spatialReference;
        const tileInfo = {
          // eslint-disable-next-line no-loss-of-precision
          dpi: 90.71428571427429,
          rows: 256,
          cols: 256,
          compressionQuality: 0,
          origin: {
            x: -180,
            y: 90
          },
          spatialReference,
          lods: data.lods || []
        };
        layer = new Layer({
          urlTemplate: data.serviceUrl,
          tileInfo,
          spatialReference: tileInfo.spatialReference,
          fullExtent: {
            xmin: 117.88222075578335,
            ymin: 24.42248132435367,
            xmax: 118.4541662028081,
            ymax: 24.907266362752466,
            spatialReference
          },
          getTileUrl(level, row, col) {
            return this.urlTemplate
              .replace("{level}", level + 1)
              .replace("{row}", row)
              .replace("{col}", col);
          }
        });}
        // } else {
        //   layer = new Layer({
        //     urlTemplate: data.serviceUrl,
        //     getTileUrl(level, row, col) {
        //       return this.urlTemplate
        //         .replace("{level}", level)
        //         .replace("{row}", row)
        //         .replace("{col}", col);
        //     },
        //   });
        // }
        break;
      default:
        layer = new Layer(options);
        break;
    }
    layer.serverUrl = data.serviceUrl;
    layer.id = data.id;
    layer.effect = data.effect || "";
    layer.nodeId = data.nodeId || "";
    layer.title = data.title;
    layer.opacity = data.opacity / 100;
    layer.visible = data.visible;
    layer.labelsVisible = data.labelEnabled;
    layer.dataType = data.layerType;
    layer.parentName = data.parentName ? data.parentName : "";
    layer.categoryId = data.categoryId ? data.categoryId : "";
    return layer;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLayerModule(layerType) {
  let module = null;
  switch (layerType) {
    // MapImageLayer-0
    case layerEnum.MapImage:
      [module] = await getModules(["esri/layers/MapImageLayer"]);
      break;
    // FeatureLayer-1
    case layerEnum.Feature:
      [module] = await getModules(["esri/layers/FeatureLayer"]);
      break;
    // BuildingSceneLayer-2
    case layerEnum.BuildingScene:
      [module] = await getModules(["esri/layers/BuildingSceneLayer"]);
      break;
    // SceneLayer-3
    case layerEnum.Scene:
      [module] = await getModules(["esri/layers/SceneLayer"]);
      break;
    // ElavationLayer-4
    case layerEnum.Elevation:
      [module] = await getModules(["esri/layers/ElevationLayer"]);
      break;
    // ImageryTileLayer-5
    case layerEnum.ImageryTile:
      [module] = await getModules(["esri/layers/ImageryTileLayer"]);
      break;
    // IntegratedMeshLayer-6
    case layerEnum.IntegratedMesh:
      [module] = await getModules(["esri/layers/IntegratedMeshLayer"]);
      break;
    // TileLayer-7
    case layerEnum.Tile:
      [module] = await getModules(["esri/layers/TileLayer"]);
      break;
    // WebTileLayer-8
    case layerEnum.WebTile:
      [module] = await getModules(["esri/layers/WebTileLayer"]);
      break;
    // WMTSLayer-9
    case layerEnum.WMTS:
      [module] = await getModules(["esri/layers/WMTSLayer"]);
      break;
    // WMSLayer-10
    case layerEnum.WMS:
      [module] = await getModules(["esri/layers/WMSLayer"]);
      break;
    // ImageryLayer-11
    case layerEnum.Imagery:
      [module] = await getModules(["esri/layers/ImageryLayer"]);
      break;
    // WFSLayer-12
    case layerEnum.WFS:
      [module] = await getModules(["esri/layers/WFSLayer"]);
      break;
    default:
      [module] = "";
      break;
  }
  return module;
}