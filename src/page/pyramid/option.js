const pyramidOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        formatter: function (name) {
            return name.toString().split("(")[0];//自定义图例
        }
        //data: ['展现','点击','访问','咨询','订单']
    },
    color: ['#25a0fd', '#2bcd23', '#fba101', '#29d9e9']
    ,
    series: [
        {
            name: '河长',
            type: 'funnel',
            top: 0,
            height: '70%',
            maxSize: '70%',
            sort: 'ascending',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7
                }
            },
            data: [
                { value: 60, name: '访问(600)' },
                { value: 40, name: '咨询(400)' },
                { value: 20, name: '订单(200)' },
                { value: 80, name: '点击(800)' },
                { value: 100, name: '展现(1000)' }
            ]
        }
    ]
};


// var loadingFunnel = {
//     title: '',
//     arrDataX: [],
//     arrDataY: [],
// }
// //title标示文字,标示线
// loadingFunnel.title = (text, top, left, color, fontStyle, fontFamily, fontSize) => {
//     return {
//         text: text,
//         top: top,
//         left: left,
//         textStyle: {
//             color: color,
//             fontStyle: fontStyle,
//             fontFamily: fontFamily,
//             fontSize: fontSize,

//         }
//     }
// };
// loadingFunnel.arrDataX = ['茶叶', '青椒', '大蒜'];
// loadingFunnel.arrDataY = [123, 254, 325];



// const pyramidOption = {
//     title: [
//         loadingFunnel.title(loadingFunnel.arrDataX[0], '17%',
//             '62%', '#12e7e8', 'normal', 'sans-serif', '16'),
//         loadingFunnel.title(loadingFunnel.arrDataY[0], '22%', '62%', '#ffffff', 'normal', 'sans-serif',
//             '16'),

//         loadingFunnel.title(loadingFunnel.arrDataX[1], '38%',
//             '62%', '#4dc6ff', 'normal', 'sans-serif', '16'),
//         loadingFunnel.title(loadingFunnel.arrDataY[1], '43%', '62%', '#ffffff', 'normal', 'sans-serif',
//             '16'),

//         loadingFunnel.title(loadingFunnel.arrDataX[2], '55%',
//             '62%', '#eaad38', 'normal', 'sans-serif', '16'),
//         loadingFunnel.title(loadingFunnel.arrDataY[2], '61%', '62%', '#ffffff', 'normal', 'sans-serif',
//             '16'),
//     ],
//     tooltip: {
//         show: true,
//         formatter: function (params) {
//             console.log(params)
//             return params.marker + params.name + ':' + params.data.number + '万'
//         }
//     },
//     grid: {
//         // containLabel: true,
//         left: '10%',
//         top: "19%",
//         bottom: "0%",
//     },
//     xAxis: {
//         show: false,
//         data: [
//             '',
//             '',
//             '',
//             ''
//         ],
//         axisTick: {
//             show: false
//         },
//         axisLabel: {
//             color: '#5EA2ED',
//             interval: 0
//         },
//         axisLine: {
//             lineStyle: {
//                 color: '#1B5BBA',
//             }
//         }
//     },
//     yAxis: {
//         show: false,
//         splitLine: {
//             show: false
//         },
//         axisLine: {
//             lineStyle: {
//                 color: '#1B5BBA',
//             }
//         },
//         axisLabel: {
//             color: '#5EA2ED',
//             interval: 0
//         },
//     },
//     series: [{
//         type: 'pictorialBar',
//         //  labelLine:{
//         // 	 show:true,
//         // 	 length2:20,
//         // 	  lineStyle:{
//         // 		  color:'red',
//         // 		  width:5
//         // 	  }

//         //  },
//         //  label: {
//         //          show: true,
//         //          position: 'right',
//         //          formatter: '{b}{c} 万头',
//         //          fontSize: 16,
//         //          color: '#e54035',
//         // 		 verticalAlign:'top'
//         // },
//         data: [{
//             name: loadingFunnel.arrDataX[0],
//             // z: 100,
//             value: 20,
//             number: loadingFunnel.arrDataY[0],
//             symbolSize: ['130%', '90%'],
//             symbolPosition: 'center',
//             symbolOffset: ['60%', '-250%'],
//             symbol: 'image://yujing.png',
//         }, {
//             name: loadingFunnel.arrDataX[1],
//             // z: 90,
//             value: 40,
//             number: loadingFunnel.arrDataY[1],
//             symbolSize: ['200%', '40%'],
//             symbolPosition: 'center',
//             symbolOffset: ['-22%', '-130%'],
//             symbol: 'image://yujing.png',
//         }, {
//             name: loadingFunnel.arrDataX[2],
//             // z: 80,
//             value: 60,
//             number: loadingFunnel.arrDataY[2],
//             symbolSize: ['280%', '35%'],
//             symbolPosition: 'center',
//             symbolOffset: ['-60%', '10%'],
//             symbol: 'image://yujing.png',
//         },]
//     }]
// };

export {
    pyramidOption
}