// 三角形金字塔，不需要
// const pyramidOption = {
//     tooltip: {
//         trigger: 'item',
//         formatter: "{a} <br/>{b}: {c} ({d}%)"
//     },
//     legend: {
//         orient: 'vertical',
//         x: 'left',
//         formatter: function (name) {
//             return name.toString().split("(")[0];//自定义图例
//         }
//         //data: ['展现','点击','访问','咨询','订单']
//     },
//     color: ['#25a0fd', '#2bcd23', '#fba101', '#29d9e9']
//     ,
//     series: [
//         {
//             name: '河长',
//             type: 'funnel',
//             top: 0,
//             height: '70%',
//             maxSize: '70%',
//             sort: 'ascending',
//             label: {
//                 normal: {
//                     show: true,
//                     position: 'inside'
//                 },
//                 emphasis: {
//                     textStyle: {
//                         fontSize: 20
//                     }
//                 }
//             },
//             labelLine: {
//                 normal: {
//                     lineStyle: {
//                         width: 1,
//                         type: 'solid'
//                     }
//                 }
//             },
//             itemStyle: {
//                 normal: {
//                     opacity: 0.7
//                 }
//             },
//             data: [
//                 { value: 60, name: '访问(600)' },
//                 { value: 40, name: '咨询(400)' },
//                 { value: 20, name: '订单(200)' },
//                 { value: 80, name: '点击(800)' },
//                 { value: 100, name: '展现(1000)' }
//             ]
//         }
//     ]
// };

// 柱形图的顶点
const pyramidOption2 = {
    grid: {
        borderWidth: 1
    },
    xAxis: [
        /*横坐标*/
        {
            axisTick: { show: false },
            type: 'category',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#f8f8f8',//左边线的颜色
                    width: '1.5'//坐标线的宽度
                },
            },
            axisLabel: {
                color: "#A7A7A7",
            },
            data: [1, 2, 3, 4],
            axisPointer: {
                type: 'shadow'
            }
        },
        /*隐藏一个不显示的横坐标，用作横线的位置*/
        {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisPointer: {
                type: 'none',

            },
            splitArea: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: [1, 2, 3, 4]
        }
    ],
    yAxis: [
        {
            type: 'value',
            interval: 500,
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#F8F8F8'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                color: ['#A7A7A7'],
                formatter: '{value} 度'
            }
        },
        {
            type: 'value',
            min: -100,
            max: 100,
            interval: 20,
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#F8F8F8'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                color: ['#A7A7A7'],
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name: '去年同期',/*基础数据*/
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#7ca9fc'
                }
            },
            data: [100, 120, 130, 140],
        },
        {
            /*这个bar是撑起横线的高度，并设置透明*/
            name: "盈亏平衡点",
            stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0)',/*设置bar为隐藏，撑起下面横线*/
                }
            },
            data: [100, 120, 130, 140],
        },
        {
            /*这个bar是横线的显示*/
            name: "盈亏平衡点",
            stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
            type: 'bar',
            xAxisIndex: 1,
            barGap: "0",
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,1)'
                }
            },
            data: [1, 1, 1, 1],
        },
    ]
};

// 柱形图三角形,三角
const pyramidOption3 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            symbol:
                "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            type: 'pictorialBar',
            itemStyle: {
                opacity: 1,
                color: {//设置渐变颜色,从左到右
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,

                    colorStops: [
                        {
                            offset: 0,
                            // color: "yellow", // 0% 处的颜色
                            color: "#083f85", // 0% 处的颜色
                        },
                        {
                            offset: 0.5,
                            // color: "orange", // 30% 处的颜色
                            color: "#0f72dd", // 30% 处的颜色
                        },
                        {
                            offset: 1,
                            // color: "red", // 100% 处的颜色
                            color: "#158eff", // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
                // 边框颜色
                borderColor: "#139eed",
                // 边框宽度
                borderWidth: 1,
            },
            emphasis: {
                itemStyle: {
                    opacity: 1,
                },
            }
        }
    ]
};


// 金字塔 需要图片参数
var loadingFunnel = {
    title: '',
    arrDataX: [],
    arrDataY: [],
}
//title标示文字,标示线
loadingFunnel.title = (text, top, left, color, fontStyle, fontFamily, fontSize) => {
    return {
        text: text,
        top: top,
        left: left,
        textStyle: {
            color: color,
            fontStyle: fontStyle,
            fontFamily: fontFamily,
            fontSize: fontSize,

        }
    }
};
loadingFunnel.arrDataX = ['茶叶', '青椒', '大蒜'];
loadingFunnel.arrDataY = [123, 254, 325];
const pyramidOption = {
    title: [
        loadingFunnel.title(loadingFunnel.arrDataX[0], '17%',
            '62%', '#12e7e8', 'normal', 'sans-serif', '16'),
        loadingFunnel.title(loadingFunnel.arrDataY[0], '22%', '62%', '#ffffff', 'normal', 'sans-serif',
            '16'),

        loadingFunnel.title(loadingFunnel.arrDataX[1], '38%',
            '62%', '#4dc6ff', 'normal', 'sans-serif', '16'),
        loadingFunnel.title(loadingFunnel.arrDataY[1], '43%', '62%', '#ffffff', 'normal', 'sans-serif',
            '16'),

        loadingFunnel.title(loadingFunnel.arrDataX[2], '55%',
            '62%', '#eaad38', 'normal', 'sans-serif', '16'),
        loadingFunnel.title(loadingFunnel.arrDataY[2], '61%', '62%', '#ffffff', 'normal', 'sans-serif',
            '16'),
    ],
    tooltip: {
        show: true,
        formatter: function (params) {
            console.log(params)
            return params.marker + params.name + ':' + params.data.number + '万'
        }
    },
    grid: {
        // containLabel: true,
        left: '10%',
        top: "19%",
        bottom: "0%",
    },
    xAxis: {
        show: false,
        data: [
            '',
            '',
            '',
            ''
        ],
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#5EA2ED',
            interval: 0
        },
        axisLine: {
            lineStyle: {
                color: '#1B5BBA',
            }
        }
    },
    yAxis: {
        show: false,
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#1B5BBA',
            }
        },
        axisLabel: {
            color: '#5EA2ED',
            interval: 0
        },
    },
    series: [{
        type: 'pictorialBar',
        //  labelLine:{
        // 	 show:true,
        // 	 length2:20,
        // 	  lineStyle:{
        // 		  color:'red',
        // 		  width:5
        // 	  }

        //  },
        //  label: {
        //          show: true,
        //          position: 'right',
        //          formatter: '{b}{c} 万头',
        //          fontSize: 16,
        //          color: '#e54035',
        // 		 verticalAlign:'top'
        // },
        data: [{
            name: loadingFunnel.arrDataX[0],
            // z: 100,
            value: 20,
            number: loadingFunnel.arrDataY[0],
            symbolSize: ['130%', '90%'],
            symbolPosition: 'center',
            symbolOffset: ['60%', '-250%'],
            symbol: 'image://yujing.png',
        }, {
            name: loadingFunnel.arrDataX[1],
            // z: 90,
            value: 40,
            number: loadingFunnel.arrDataY[1],
            symbolSize: ['200%', '40%'],
            symbolPosition: 'center',
            symbolOffset: ['-22%', '-130%'],
            symbol: 'image://yujing.png',
        }, {
            name: loadingFunnel.arrDataX[2],
            // z: 80,
            value: 60,
            number: loadingFunnel.arrDataY[2],
            symbolSize: ['280%', '35%'],
            symbolPosition: 'center',
            symbolOffset: ['-60%', '10%'],
            symbol: 'image://yujing.png',
        },]
    }]
};

export {
    pyramidOption,
    pyramidOption2,
    pyramidOption3
}