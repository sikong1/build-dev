export const wordcloudOption = {
  backgroundColor: '#fff', // canvas背景颜色
  // canvas标题配置项
  title: {
    text: '我是标题',
    top: '0%',
    left: '-1%',
    textStyle: {
      fontSize: 14,
      color: '#3B3E41',
      fontWeight: 'normal'
    }
  },
  // 移入tooltip配置项
  tooltip: {
    show: true,
    // formatter: function (item) {
    //   return item.data[0] + '：' + item.data[1]
    // }
  },
  series: [
    {
      type: 'wordCloud',
      left: '0%',                 // X轴偏移量
      top: '5%',                  // Y轴偏移量
      width: '100%',               // canvas宽度大小
      height: '100%',              // canvas高度大小
      sizeRange: [12, 50],         //  词典字体大小范围配置
      rotationRange: [0, 0],       // 词典字体旋转角度配置，默认不旋转
      gridSize: 25,                // 词典字体间距配置
      layoutAnimation: true,       // 为false词典过度会阻塞
      textStyle: {                 // 词典样式配置
        normal: {
          color() {
            // 颜色随机渐变
            let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
            return colors[parseInt(Math.random() * 10)]
          }
        }
      },
      // 渲染词典数据
      data: [{
        value: '50',          // 词典大小配置
        name: 'iPhone 13',    // 词典名称配置
        textStyle: {          // 单独配置某个词典样式
          shadowBlur: 4,
          shadowOffsetY: 14,
          color: '#BDBEFA',
        }
      },
      { value: '30', name: 'VIVO' },
      { value: '29', name: 'OPPO' },
      { value: '28', name: 'HONOR' },
      { value: '27', name: 'iPhone 12 pro max' },
      { value: '26', name: 'iPhone 12 pro max' },
      { value: '25', name: 'HUAWEI MATE 10' },
      { value: '24', name: 'ONEPLUS' },
      { value: '23', name: 'Lenova T470' },
      { value: '22', name: 'MacBook Air ' },
      { value: '21', name: 'SAMSUNG' },
      { value: '20', name: 'iPad mini' },
      { value: '16', name: 'BLACKBERRY' },
      { value: '14', name: 'OPPO' },
      { value: '13', name: 'SAMSUNG' },
      { value: '12', name: '361' },
      { value: '10', name: 'Lenova' }]
    }
  ]
}