import * as echarts from 'echarts'

export const getOptions = (name, mapData) => {
  return {
    title: {
      show: false,
      text: name,
      left: 'center',
    },
    //鼠标经过展示数据方法
    tooltip: {
      triggerOn: 'mousemove',
      textStyle: {
        color: '#fff',
        fontSize: 12,
      },
      formatter: (params) => {
        if (params.seriesName === '散点') {
          const html = '<span >' + `${params.data.name}位于${params.data.areaName}市` + '</span>';
          return html;
        }
      },
      backgroundColor: 'rgba(29, 38, 71)',
      // 额外附加的阴影
      extraCssText: 'box-shadow:0 0 4px rgba(11, 19, 43,0.8)',
    },
    // geo: {
    //     map: name,
    //     show: true,
    //     roam: false,
    //     // roam: 'scale',
    //     zoom: 1.2,
    //     scaleLimit: {
    //         min: 1.2,
    //         max: 6,
    //     },
    //     label: {
    //         normal: {
    //             show: false,
    //         },
    //         emphasis: {
    //             show: false,
    //             color: '#fff',
    //         },
    //     },
    //     itemStyle: {
    //         normal: {
    //             areaColor: '#116bda',
    //             borderColor: '#fff',
    //         },
    //         emphasis: {
    //             areaColor: '#113cda',
    //         },
    //     },
    //     selectedMode: true,
    //     select: {
    //         disabled: true,
    //         label: {
    //             show: false,
    //         },
    //         itemStyle: {
    //             areaColor: '#116bda',
    //             borderColor: '#fff',
    //         },
    //     },
    //     // 南海诸岛处理
    //     regions: [
    //         {
    //             name: '南海诸岛',
    //             itemStyle: {
    //                 normal: {
    //                     areaColor: '#116bda',
    //                     borderColor: '#fff',
    //                 },
    //                 emphasis: {
    //                     areaColor: '#113cda',
    //                 },
    //             },
    //         },
    //     ],
    // },
    geo: [
      {
        map: name,
        zlevel: -1,
        zoom: 1.2,
        silent: true,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        roam: false,
        itemStyle: {
          normal: {
            borderColor: 'rgba(192,245,249,.8)',
            borderWidth: 3,
            shadowColor: '#6FFDFF',
            shadowOffsetY: 0,
            shadowBlur: 10,
            // areaColor: 'rgba(29,85,139,.6)',
          },
        },
        label: {
          normal: {
            //静态的时候展示样式
            show: false, //是否显示地图省份得名称
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Arial',
            },
          },
          emphasis: {
            //动态展示的样式
            show: false,
            color: '#fff',
          },
        },
        tooltip: {
          show: false,
        },
      },
      {
        show: true,
        map: name,
        zoom: 1.2,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        label: {
          normal: {
            //静态的时候展示样式
            show: false, //是否显示地图省份得名称
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Arial',
            },
          },
          emphasis: {
            show: false,
            //动态展示的样式
            color: '#fff',
          },
        },

        blur: {
          label: { show: true, color: '#000' },
        },
        roam: false, // 是否开启鼠标滚轮缩放
        tooltip: {
          show: false,
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
            },
            color: '#fff',
            borderColor: '#32CBE0',
            borderWidth: 1.5,
            areaColor: {
              type: 'linear-gradient',
              x: 0,
              y: 1000,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0.5,
                  color: '#0D59C1', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#53C9C7', // 100% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
          },
          emphasis: {
            label: {
              show: false,
              color: '#fff',
            },
            borderWidth: 3,
            borderColor: 'rgba(255, 230, 175,0.8)',
            shadowColor: 'rgba(255, 230, 175,0.5)',
            shadowBlur: 30,
            textStyle: {
              color: '#fff',
              fontSize: 12,
              backgroundColor: 'transparent',
            },
            areaColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#1cfbfe',
                },
                {
                  offset: 1,
                  color: '#3348e7',
                },
              ],
              false,
            ),
          },
        },
      },
      {
        type: 'map',
        map: name,
        zlevel: -2,
        zoom: 1.2,
        layoutCenter: ['50%', '51.4%'],
        layoutSize: '100%',
        roam: false,
        silent: true,
        tooltip: {
          show: false,
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(35, 161, 184,0.5)',
            shadowColor: 'rgba(35, 161, 184,0.8)',
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: '#257AB2',
          },
        },
      },
      {
        type: 'map',
        map: name,
        zlevel: -3,
        zoom: 1.2,
        layoutCenter: ['50%', '52.4%'],
        layoutSize: '100%',
        roam: false,
        silent: true,
        tooltip: {
          show: false,
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(7, 65, 117,0.5)',
            shadowColor: 'rgba(7, 65, 117,0.8)',
            shadowOffsetY: 15,
            shadowBlur: 8,
            areaColor: '#0A2763',
          },
        },
      },
    ],
    //进行气泡标点
    series: [
      {
        type: 'map',
        map: mapData,
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff',
            },
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077',
          },
          emphasis: {
            areaColor: '#2B91B7',
          },
        },
        tooltip: {
          show: false,
        },
        animation: true,
        data: mapData,
      },
      {
        name: '散点', // 自定义名称
        type: 'effectScatter', // scatter  effectScatter
        coordinateSystem: 'geo', // 设置坐标系类型
        data: convertData(mapData), // 设置散点位置和数据
        symbolSize: () => {
          // 设置散点大小
          return 15;
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
        },
        hoverAnimation: true, // 是否显示鼠标悬浮动画
        label: {
          // 静态显示时的样式
          normal: {
            show: true, // 显示地区名称
            color: '#fff',
            fontSize: 12,
            formatter: (data) => {
              // 显示模板
              return data.name;
            },
            position: 'bottom', // 显示位置
          },
          // 鼠标悬浮上去的样式
          emphasis: {
            // show: true, // 显示地区名称
            // color: '#fff',
            // fontSize: 12,
            // // color: 'red',
            // formatter: (data: any) => {
            //     // 显示模板
            //     return data.name;
            // },
            // position: 'bottom', // 显示位置
          },
        },
        itemStyle: {
          normal: {
            // color: (res: any) => {
            //     let value = res.value[2];
            //     //根据value值对标点进行不同颜色显示
            //     if (value < 500) {
            //         return '#ff3859';
            //     } else if (value < 1000) {
            //         return '#4ed7fa';
            //     } else if (value < 1500) {
            //         return '#fac531';
            //     } else {
            //         return '#01ff5b';
            //     }
            // },
            color: '#fac531',
            borderColor: 'rgba(255, 230, 175,0.8)',
            shadowColor: 'rgba(255, 230, 175,0.5)',
            shadowBlur: 30,
          },
          // 鼠标悬浮上去的样式
          emphasis: {
            // color: '#3348e7',
            borderColor: 'rgba(255, 230, 175,0.8)',
            shadowColor: 'rgba(255, 230, 175,0.5)',
            shadowBlur: 30,
          },
        },
        zlevel: 3,
      },
    ],
  };
}

const convertData = (data) => {
  console.log(data, 'lll');
  const res = [];
  data.forEach((item) => {
    // 获取当前省份的经纬度坐标
    res.push({
      // name 表示地区名称
      name: item.companyName,
      // value数据格式为：[113.665412, 34.757975, '200']
      value: [item.lon, item.lat],
      areaName: item.areaName,
    });
  });
  return res;
};