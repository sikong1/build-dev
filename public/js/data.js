window.config = {
  DefaultMapType: "2d", // 默认加载图层类型
  ElectronicMap: ["HL06_XZJZ_3857_1119","HL06_XZJZ_3857_1119_3d"], // 电子地图id
  ImageMap: ["3a03edca-b831-5991-64ee-6dac265c72xx","3a03edca-b831-5991-64ee-6dac265c2116"], //影像图id
  mapContainer: "mapContainer"//
}
window.boundaryConfig = {
  zmxc: {
    url: "http://10.23.123.51:6080/arcgis/rest/services/ZFW/FCFHSJ/MapServer/0",
    title: "行政区划",
    id: "zmxc",
  },
  xzqmc: {
    url: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/1",
    formal: "http://10.23.123.51:6080/arcgis/rest/services/ZFW/FCFHSJ/MapServer/1",
    title: "行政区划",
    id: "xzqmc",
  },
  street: {
    url: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/2",
    formal: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/2",
    // formal: "http://10.23.123.51:6080/arcgis/rest/services/ZFW/FCFHSJ/MapServer/2",
    title: "街道",
    id: "street",
  },
  community: {
    url: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/3",
    formal: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/3",
    // formal: "http://10.23.123.51:6080/arcgis/rest/services/ZFW/FCFHSJ/MapServer/3",
    title: "社区",
    id: "community",
  },
  cellGrid: {
    url: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/4",
    formal: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/4",
    // formal: "http://10.23.123.51:6080/arcgis/rest/services/ZFW/FCFHSJ/MapServer/4",
    title: "单元网格",
    id: "cellGrid",
  },
};

