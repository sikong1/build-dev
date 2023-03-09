/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-09-24 17:58:40
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-03-09 15:45:30
 * @FilePath: \hldn-typhoon-screen\src\views\Combat\viewDiv.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getModules } from '@/utils/map/map'
import config from '@/utils/map/appConfig'

const img = require("@/assets/images/yujing.png");
const viewDiv = async (pointListArr, code) => {
  let symbol = {};
  // 点位图标样式
  symbol = {
    type: "picture-marker",
    width: "60px",
    height: "60px",
    url: img,
    outline: {
      color: [255, 255, 255],
      width: 0
    }
  };
  const [Point] = await getModules(["esri/geometry/Point"]);
  let searchData = [];
  pointListArr.forEach(async (item) => {
    const view = config.activeView;
    let geometry = null;
    // 指定点的坐标和空间参考
    geometry = new Point({
      longitude: item.longitude,
      latitude: item.latitude,
      spatialReference: view.spatialReference
    });
    const attributes = item;
    attributes.flagCode = code;
    searchData.push({
      geometry: geometry, // 坐标空间参考
      symbol: symbol, // 样式
      attributes: attributes // 属性（点击点位时需要的信息）
    });
  });
  const layer = config.layers.get(code);

  if (layer) {
    layer.graphics = [];
    const graphics = await createManyLayer(searchData, symbol, true);
    layer.graphics = graphics;
    layer.visible = true;
  } else {
    console.log(searchData, 'searchDatasearchData');
    const graphics = await createManyLayer(searchData, symbol);
    config.layers.set(code, graphics);
    config.activeView.map.add(graphics);
    console.log('graphics', graphics, config, symbol);
    graphics.id = code;
  }
};

const createManyLayer = async (data, symbol, flag = false) => {
  // Graphic：图形，用于描述地图的各种要素，比如这个要素的样子、位置信息、是点还是线条等。
  const [Graphic, GraphicsLayer] = await getModules(["esri/Graphic", "esri/layers/GraphicsLayer"]);
  const graphics = [];
  data.forEach((item) => {
    let xsimpleLineSymbol = symbol;
    const polylineGraphic = new Graphic({
      geometry: item.geometry,
      symbol: xsimpleLineSymbol,
      attributes: item.attributes
    });
    graphics.push(polylineGraphic);
  });
  const layer = new GraphicsLayer();
  layer.visible = true;
  layer.graphics.addMany(graphics);
  if (flag) {
    return graphics;
  } else {
    console.log(layer, 'layerlayerlayer');
    return layer;
  }
}

export { viewDiv, createManyLayer };
