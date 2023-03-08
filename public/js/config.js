// 图层配置 serviceUrl测试环境 formal正式环境
window.mapConfig = {
  twoSatelliteImage: {
    id: "3a03edca-b831-5991-64ee-6dac265c72xx",
    // serviceUrl: "http://10.23.123.25:8888/arcgis/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    serviceUrl: "https://gisapp.xmghszzx.com:8030/gisProxy25/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    formal:
    "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a05bd4f-02ff-7c3b-5180-e38871bb238c/xmgis/api/data-sharing/layer-request/3a03edca-b831-5991-64ee-6dac265c72da/arcgis/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    title: "影像底图2000-2d-背景滤镜",
    type: "WebTile",
    effect:"blur(9px) grayscale(0.8)",
    layerType: 8,
    opacity: 100,
    layerStyle: "2d",
    spatialReference: {
      wkid: 4490
    },
    visible: true,
    lods: [
      {
        level: 0,
        levelValue: "1",
        resolution: 0.703125,
        scale: 295497593.05875003
      },
      {
        level: 1,
        levelValue: "2",
        resolution: 0.3515625,
        scale: 147748796.52937502
      },
      {
        level: 2,
        levelValue: "3",
        resolution: 0.17578125,
        scale: 73874398.264687508
      },
      {
        level: 3,
        levelValue: "4",
        resolution: 0.087890625,
        scale: 36937199.132343754
      },
      {
        level: 4,
        levelValue: "5",
        resolution: 0.0439453125,
        scale: 18468599.566171877
      },
      {
        level: 5,
        levelValue: "6",
        resolution: 0.02197265625,
        scale: 9234299.7830859385
      },
      {
        level: 6,
        levelValue: "7",
        resolution: 0.010986328125,
        scale: 4617149.8915429693
      },
      {
        level: 7,
        levelValue: "8",
        resolution: 0.0054931640625,
        scale: 2308574.9457714846
      },
      {
        level: 8,
        levelValue: "9",
        resolution: 0.00274658203125,
        scale: 1154287.4728857423
      },
      {
        level: 9,
        levelValue: "10",
        resolution: 0.001373291015625,
        scale: 577143.73644287116
      },
      {
        level: 10,
        levelValue: "11",
        resolution: 0.0006866455078125,
        scale: 288571.86822143558
      },
      {
        level: 11,
        levelValue: "12",
        resolution: 0.00034332275390625,
        scale: 144285.93411071779
      },
      {
        level: 12,
        levelValue: "13",
        resolution: 0.000171661376953125,
        scale: 72142.967055358895
      },
      {
        level: 13,
        levelValue: "14",
        resolution: 8.58306884765625e-5,
        scale: 36071.483527679447
      },
      {
        level: 14,
        levelValue: "15",
        resolution: 4.291534423828125e-5,
        scale: 18035.741763839724
      },
      {
        level: 15,
        levelValue: "16",
        resolution: 2.1457672119140625e-5,
        scale: 9017.8708819198619
      },
      {
        level: 16,
        levelValue: "17",
        resolution: 1.0728836059570313e-5,
        scale: 4508.9354409599309
      },
      {
        level: 17,
        levelValue: "18",
        resolution: 5.3644180297851563e-6,
        scale: 2254.4677204799655
      },
      {
        level: 18,
        levelValue: "19",
        resolution: 2.68220901489257815e-6,
        scale: 1127.23386023998275
      },
      {
        level: 19,
        levelValue: "20",
        resolution: 1.341104507446289075e-6,
        scale: 563.616930119991375
      }
    ]
  },
  twoSatelliteImageBase: {
    id: "image_layer_base",
    // serviceUrl: "http://10.23.123.25:8888/arcgis/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    serviceUrl: "https://gisapp.xmghszzx.com:8030/gisProxy25/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    formal:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a05bd4f-02ff-7c3b-5180-e38871bb238c/xmgis/api/data-sharing/layer-request/3a03edca-b831-5991-64ee-6dac265c72da/arcgis/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    title: "影像底图2000-2d-base",
    type: "WebTile",
    layerType: 8,
    opacity: 100,
    layerStyle: "2d",
    // effect:"blur(8px) grayscale(0.8)",
    spatialReference: {
      wkid: 4490
    },
    visible: true,
    lods: [
      {
        level: 0,
        levelValue: "1",
        resolution: 0.703125,
        scale: 295497593.05875003
      },
      {
        level: 1,
        levelValue: "2",
        resolution: 0.3515625,
        scale: 147748796.52937502
      },
      {
        level: 2,
        levelValue: "3",
        resolution: 0.17578125,
        scale: 73874398.264687508
      },
      {
        level: 3,
        levelValue: "4",
        resolution: 0.087890625,
        scale: 36937199.132343754
      },
      {
        level: 4,
        levelValue: "5",
        resolution: 0.0439453125,
        scale: 18468599.566171877
      },
      {
        level: 5,
        levelValue: "6",
        resolution: 0.02197265625,
        scale: 9234299.7830859385
      },
      {
        level: 6,
        levelValue: "7",
        resolution: 0.010986328125,
        scale: 4617149.8915429693
      },
      {
        level: 7,
        levelValue: "8",
        resolution: 0.0054931640625,
        scale: 2308574.9457714846
      },
      {
        level: 8,
        levelValue: "9",
        resolution: 0.00274658203125,
        scale: 1154287.4728857423
      },
      {
        level: 9,
        levelValue: "10",
        resolution: 0.001373291015625,
        scale: 577143.73644287116
      },
      {
        level: 10,
        levelValue: "11",
        resolution: 0.0006866455078125,
        scale: 288571.86822143558
      },
      {
        level: 11,
        levelValue: "12",
        resolution: 0.00034332275390625,
        scale: 144285.93411071779
      },
      {
        level: 12,
        levelValue: "13",
        resolution: 0.000171661376953125,
        scale: 72142.967055358895
      },
      {
        level: 13,
        levelValue: "14",
        resolution: 8.58306884765625e-5,
        scale: 36071.483527679447
      },
      {
        level: 14,
        levelValue: "15",
        resolution: 4.291534423828125e-5,
        scale: 18035.741763839724
      },
      {
        level: 15,
        levelValue: "16",
        resolution: 2.1457672119140625e-5,
        scale: 9017.8708819198619
      },
      {
        level: 16,
        levelValue: "17",
        resolution: 1.0728836059570313e-5,
        scale: 4508.9354409599309
      },
      {
        level: 17,
        levelValue: "18",
        resolution: 5.3644180297851563e-6,
        scale: 2254.4677204799655
      },
      {
        level: 18,
        levelValue: "19",
        resolution: 2.68220901489257815e-6,
        scale: 1127.23386023998275
      },
      {
        level: 19,
        levelValue: "20",
        resolution: 1.341104507446289075e-6,
        scale: 563.616930119991375
      }
    ]
  },

  twoElectronicMap: {
    id: "HL06_XZJZ_3857_1119",
    effect:"blur(9px) grayscale(0.6)",
    // serviceUrl: "http://10.23.123.25:8888/arcgis/rest/services/CGCS2000/XMMAP/MapServer",
    serviceUrl: "https://gisapp.xmghszzx.com:8030/gisProxy25/rest/services/CGCS2000/XMMAP/MapServer",
    formal:'http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a05bd42-241c-ee40-ba99-2d0a6763042d/xmgis/api/data-sharing/layer-request/3a03edc6-f8d6-158d-70e5-41a0f4846ed5/arcgis/rest/services/CGCS2000/XMMAP/MapServer',
    title: "电子地图-2d",
    type: "Tile",
    layerType: 7,
    opacity: 100,
    spatialReference: {
      wkid: 4490
    },
    layerStyle: "2d",
    visible: false
  },
  twoElectronicMapBase: {
    id: "HL06_XZJZ_3857_1119_base",
    // serviceUrl: "http://10.23.123.25:8888/arcgis/rest/services/CGCS2000/XMMAP/MapServer",
    serviceUrl: "https://gisapp.xmghszzx.com:8030/gisProxy25/rest/services/CGCS2000/XMMAP/MapServer",
    formal:'http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a05bd42-241c-ee40-ba99-2d0a6763042d/xmgis/api/data-sharing/layer-request/3a03edc6-f8d6-158d-70e5-41a0f4846ed5/arcgis/rest/services/CGCS2000/XMMAP/MapServer',
    title: "电子地图-2d",
    type: "Tile",
    layerType: 7,
    opacity: 100,
    spatialReference: {
      wkid: 4490
    },
    layerStyle: "2d",
    visible: false
  },
  threeElectronicMap: {
    id: "HL06_XZJZ_3857_1119_3d",
    serviceUrl:
      "http://10.23.123.25:8888/arcgis/rest/services/CGCS2000/XMMAP/MapServer/tile/{level}/{row}/{col}",
    formal:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a05bd42-241c-ee40-ba99-2d0a6763042d/xmgis/api/data-sharing/layer-request/3a03edc6-f8d6-158d-70e5-41a0f4846ed5/arcgis/rest/services/CGCS2000/XMMAP/MapServer/tile/{level}/{row}/{col}",
    title: "电子地图-3d",
    type: "WebTile",
    layerStyle: "3d",
    layerType: 8,
    opacity: 100,
    spatialReference: {
      wkid: 4490,
      latestWkid: 4490
    },
    visible: true,
    lods: [
      {
        level: 0,
        levelValue: "1",
        resolution: 0.703125,
        scale: 295497593.05875003
      },
      {
        level: 1,
        levelValue: "2",
        resolution: 0.3515625,
        scale: 147748796.52937502
      },
      {
        level: 2,
        levelValue: "3",
        resolution: 0.17578125,
        scale: 73874398.264687508
      },
      {
        level: 3,
        levelValue: "4",
        resolution: 0.087890625,
        scale: 36937199.132343754
      },
      {
        level: 4,
        levelValue: "5",
        resolution: 0.0439453125,
        scale: 18468599.566171877
      },
      {
        level: 5,
        levelValue: "6",
        resolution: 0.02197265625,
        scale: 9234299.7830859385
      },
      {
        level: 6,
        levelValue: "7",
        resolution: 0.010986328125,
        scale: 4617149.8915429693
      },
      {
        level: 7,
        levelValue: "8",
        resolution: 0.0054931640625,
        scale: 2308574.9457714846
      },
      {
        level: 8,
        levelValue: "9",
        resolution: 0.00274658203125,
        scale: 1154287.4728857423
      },
      {
        level: 9,
        levelValue: "10",
        resolution: 0.001373291015625,
        scale: 577143.73644287116
      },
      {
        level: 10,
        levelValue: "11",
        resolution: 0.0006866455078125,
        scale: 288571.86822143558
      },
      {
        level: 11,
        levelValue: "12",
        resolution: 0.00034332275390625,
        scale: 144285.93411071779
      },
      {
        level: 12,
        levelValue: "13",
        resolution: 0.000171661376953125,
        scale: 72142.967055358895
      },
      {
        level: 13,
        levelValue: "14",
        resolution: 8.58306884765625e-5,
        scale: 36071.483527679447
      },
      {
        level: 14,
        levelValue: "15",
        resolution: 4.291534423828125e-5,
        scale: 18035.741763839724
      },
      {
        level: 15,
        levelValue: "16",
        resolution: 2.1457672119140625e-5,
        scale: 9017.8708819198619
      },
      {
        level: 16,
        levelValue: "17",
        resolution: 1.0728836059570313e-5,
        scale: 4508.9354409599309
      },
      {
        level: 17,
        levelValue: "18",
        resolution: 5.3644180297851563e-6,
        scale: 2254.4677204799655
      },
      {
        level: 18,
        levelValue: "19",
        resolution: 2.68220901489257815e-6,
        scale: 1127.23386023998275
      },
      {
        level: 19,
        levelValue: "20",
        resolution: 1.341104507446289075e-6,
        scale: 563.616930119991375
      }
    ]
  },
  threeSatelliteImage: {
    id: "3a03edca-b831-5991-64ee-6dac265c2116",
    serviceUrl:
      "https://gisapp.xmghszzx.com:8030/gisProxy25/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    formal:
    "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a05bd4f-02ff-7c3b-5180-e38871bb238c/xmgis/api/data-sharing/layer-request/3a03edca-b831-5991-64ee-6dac265c72da/arcgis/rest/services/CGCS2000/DOMMAP/MapServer/tile/{level}/{row}/{col}",
    title: "影像底图2000-3d",
    type: "WebTile",
    layerType: 8,
    opacity: 100,
    spatialReference: {
      wkid: 4490
    },
    layerStyle: "3d",
    visible: true,
    lods: [
      {
        level: 0,
        levelValue: "1",
        resolution: 0.703125,
        scale: 295497593.05875003
      },
      {
        level: 1,
        levelValue: "2",
        resolution: 0.3515625,
        scale: 147748796.52937502
      },
      {
        level: 2,
        levelValue: "3",
        resolution: 0.17578125,
        scale: 73874398.264687508
      },
      {
        level: 3,
        levelValue: "4",
        resolution: 0.087890625,
        scale: 36937199.132343754
      },
      {
        level: 4,
        levelValue: "5",
        resolution: 0.0439453125,
        scale: 18468599.566171877
      },
      {
        level: 5,
        levelValue: "6",
        resolution: 0.02197265625,
        scale: 9234299.7830859385
      },
      {
        level: 6,
        levelValue: "7",
        resolution: 0.010986328125,
        scale: 4617149.8915429693
      },
      {
        level: 7,
        levelValue: "8",
        resolution: 0.0054931640625,
        scale: 2308574.9457714846
      },
      {
        level: 8,
        levelValue: "9",
        resolution: 0.00274658203125,
        scale: 1154287.4728857423
      },
      {
        level: 9,
        levelValue: "10",
        resolution: 0.001373291015625,
        scale: 577143.73644287116
      },
      {
        level: 10,
        levelValue: "11",
        resolution: 0.0006866455078125,
        scale: 288571.86822143558
      },
      {
        level: 11,
        levelValue: "12",
        resolution: 0.00034332275390625,
        scale: 144285.93411071779
      },
      {
        level: 12,
        levelValue: "13",
        resolution: 0.000171661376953125,
        scale: 72142.967055358895
      },
      {
        level: 13,
        levelValue: "14",
        resolution: 8.58306884765625e-5,
        scale: 36071.483527679447
      },
      {
        level: 14,
        levelValue: "15",
        resolution: 4.291534423828125e-5,
        scale: 18035.741763839724
      },
      {
        level: 15,
        levelValue: "16",
        resolution: 2.1457672119140625e-5,
        scale: 9017.8708819198619
      },
      {
        level: 16,
        levelValue: "17",
        resolution: 1.0728836059570313e-5,
        scale: 4508.9354409599309
      },
      {
        level: 17,
        levelValue: "18",
        resolution: 5.3644180297851563e-6,
        scale: 2254.4677204799655
      },
      {
        level: 18,
        levelValue: "19",
        resolution: 2.68220901489257815e-6,
        scale: 1127.23386023998275
      },
      {
        level: 19,
        levelValue: "20",
        resolution: 1.341104507446289075e-6,
        scale: 563.616930119991375
      }
    ]
  },
  // threeTerrainImage: {
  //   id: "dem_amoy_2015_4490_2",
  //   serviceUrl: "https://gisapp.xmghszzx.com:8030/gisProxy26/rest/services/BaseMap/dem_amoy_2015_4490_2/ImageServer",
  //   formal:'http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a06719c-618b-ef95-406c-f42b232230bc/server/rest/services/BaseMap/dem_amoy_2015_4490_2/ImageServer',
  //   title: "地形",
  //   type: "WebTile",
  //   layerType: 9,
  //   opacity: 100,
  //   spatialReference: {
  //     wkid: 4490
  //   },
  //   layerStyle: "3d",
  //   visible: true,
  // },
  SceneMode1: {
    id: "3a061f68-19b8-9279-1129-f21a9cc9b99f",
    serviceUrl: "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061f68-19b8-9279-1129-f21a9cc9b99f/server/rest/services/Hosted/Layer3D_HL06_01_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode2: {
    id: "3a061d72-6941-1929-1122-42e40289160e",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d72-6941-1929-1122-42e40289160e/server/rest/services/Hosted/Layer3D_HL06_02_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode3: {
    id: "3a061d72-d22d-534c-3c0a-b5958df89f9e",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d72-d22d-534c-3c0a-b5958df89f9e/server/rest/services/Hosted/Layer3D_HL06_03_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode4: {
    id: "3a061d74-c9ba-e003-8019-3084a2782884",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d74-c9ba-e003-8019-3084a2782884/server/rest/services/Hosted/Layer3D_HL06_04_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode5: {
    id: "3a061d76-ac22-7e94-861e-91f3e8ce37d9",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d76-ac22-7e94-861e-91f3e8ce37d9/server/rest/services/Hosted/Layer3D_HL06_05_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode6: {
    id: "3a061d77-1117-ceaf-9eeb-bf35bc6c3d0b",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d77-1117-ceaf-9eeb-bf35bc6c3d0b/server/rest/services/Hosted/Layer3D_HL06_06_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode7: {
    id: "3a061d77-6f36-9bb0-1f3c-470639b21be0",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d77-6f36-9bb0-1f3c-470639b21be0/server/rest/services/Hosted/Layer3D_HL06_07_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode8: {
    id: "3a061d77-cf9d-4e8c-c8bd-bc58f071354d",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d77-cf9d-4e8c-c8bd-bc58f071354d/server/rest/services/Hosted/Layer3D_HL06_08_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode9: {
    id: "3a061d78-b268-20ae-dccd-9c2ccaf8ad02",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d78-b268-20ae-dccd-9c2ccaf8ad02/server/rest/services/Hosted/Layer3D_HL06_09_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode10: {
    id: "3a061d79-53d9-dcee-dd1d-bb7eade0c722",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d79-53d9-dcee-dd1d-bb7eade0c722/server/rest/services/Hosted/Layer3D_HL06_10_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  SceneMode11: {
    id: "3a061d79-a32a-5481-2537-ede3918564af",
    serviceUrl:
      "http://10.192.10.45:8320/xmgis/api/platform/layer-request/3a061d79-a32a-5481-2537-ede3918564af/server/rest/services/Hosted/Layer3D_HL06_11_XZJZ3857/SceneServer",
    title: "湖里区精模",
    type: "Scene",
    layerType: 3,
    layerStyle: "3d",
    opacity: 100,
    spatialReference: {
      wkid: 4490,
    },
    visible: true,
  },
  region: {
    id: "mapMaskLayer",
    serviceUrl: "https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/1",
    formal: 'https://gisapp.xmghszzx.com:8030/gisProxy51/rest/services/Current/ZFW_GLWG/MapServer/1',
    title: "行政区划",
    layerStyle: "2d",
    layerType: 1,
  },
};

