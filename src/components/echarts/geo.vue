<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
// const echarts = require('echarts')
export default {
  name: "LineModel",
  components: {},
  props: {
    model: {
      type: Object,
      default: function() {}
    }
  },
  data() {
    return {};
  },
  watch: {
    model: function(newData) {
      this.prepareDomain(newData);
    }
  },
  methods: {
    prepareDomain(model) {
      // console.log('vue',echarts)
      var echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028]
      };

      /*
      delay：动画推迟时间
      value：描述机场点的大小
      speed：飞机的飞行速度
      */

      var apiData = [
        {
          airName: "001",
          fromName: "西安",
          toName: "北京",
          delay: 0,
          value: 100,
          speed: 20
        },
        {
          airName: "002",
          fromName: "西安",
          toName: "上海",
          delay: 0,
          value: 100,
          speed: 20
        },
        {
          airName: "003",
          fromName: "西宁",
          toName: "北京",
          delay: 0,
          value: 100,
          speed: 30
        },
        {
          airName: "004",
          fromName: "银川",
          toName: "广州",
          delay: 0,
          value: 100,
          speed: 40
        },
        {
          airName: "004",
          fromName: "西宁",
          toName: "广州",
          delay: 0,
          value: 100,
          speed: 40
        }
      ];

      var convertData = function(data) {
        var res = [];
        for (let i = 0, len = data.length; i < len; i++) {
          var geoCoord = geoCoordMap[data[i].fromName];
          var geoCoord2 = geoCoordMap[data[i].toName];

          if (geoCoord) {
            res.push({
              name: data[i].fromName,
              value: geoCoord.concat(data[i].value)
            });
            res.push({
              name: data[i].toName,
              value: geoCoord2.concat(data[i].value)
            });
          }
        }
        return res;
      };
      var option = {
        backgroundColor: "rgba(16,33,62,0.1)",
        title: {
          text: "模拟航线",
          subtext: "数据纯属虚构",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        // tooltip: {
        //   trigger: "item",
        //   formatter: function(params, ticket, callback) {
        //     if (params.seriesType == "effectScatter") {
        //       return "线路：" + params.data.name + "" + params.data.value[2];
        //     } else if (params.seriesType == "lines") {
        //       return (
        //         params.data.fromName +
        //         ">" +
        //         params.data.toName +
        //         "<br />" +
        //         params.data.value
        //       );
        //     } else {
        //       return params.name;
        //     }
        //   }
        // },
        geo: {
          map: "china",
          layoutSize: "128%",
          zoom: 1.2,
          label: {
            emphasis: {
              show: false,
              color: "#fff"
            }
          },
          roam: true, //平移缩放
          itemStyle: {
            normal: {
              areaColor: "#0045A0",
              borderColor: "#00DFFF",
              borderWidth: 2
            },
            emphasis: {
              areaColor: "#4499d0"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 1,
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            //coordinateSystem:"geo"只会取数组的前两位当做点坐标数据
            data: convertData(apiData),
            //其中第一个参数 value 为 data 中的数据值。第二个参数params 是其它的数据项参数
            symbolSize: function(value) {
              return value[2] / 10;
            }
          },
          {
            name: "涟漪",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: false,
                position: "left",
                formatter: "{b}"
              }
            },
            itemStyle: {
              normal: {
                color: "#0ff7eefa",
                shadowBlur: 10,
                shadowColor: "#0ff7eefa"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            hoverAnimation: true,
            showEffectOn: "render", //绘制完成后显示特效
            data: convertData(apiData),
            symbolSize: function(value) {
              return value[2] / 10;
            }
          },
          ...this.buildLines(apiData, geoCoordMap)
        ]
      };
      console.log("option", option);
      //调用setOption将option输入echarts，然后echarts渲染图表
      echartsInstance.setOption(option);
      window.onresize = function() {
        echartsInstance.resize();
      };
    },
    buildLines(data, geoCoordMap) {
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      let arr = [];
      var color = [
        "#eccc68",
        "#ff7f50",
        "#ff6b81",
        "#ffa502",
        "#ff6348",
        "#ff4757",
        "#7bed9f",
        "#70a1ff",
        "#5352ed",
        "#2ed573",
        "#1e90ff",
        "#3742fa"
      ]; //航线的颜色
      data.map((item, index) => {
        arr.push({
          name: item.airName,
          type: "lines",
          zlevel: index + 3,
          symbol: ["none", "arrow"],
          symbolSize: 10,
          label: {
            show: false
          },
          effect: {
            show: true,
            period: item.speed, //动画时间
            trailLength: 0.1, //给飞机尾部加特效
            symbol: planePath,
            symbolSize: 15,
            delay: item.delay
          },
          lineStyle: {
            normal: {
              color: color[index],
              width: 2,
              opacity: 0.5,
              curveness: 0.2 //曲度
            }
          },
          data: [
            {
              name: item.airName,
              fromName: item.fromName,
              toName: item.toName,
              coords: [geoCoordMap[item.fromName], geoCoordMap[item.toName]]
            }
          ]
        });
      });
      return arr;
    }
  },
  mounted: function() {
    this.prepareDomain(this.model);
  },
  created() {}
};
</script>

<style type="text/scss">
.myChart {
  width: 100%;
  height: calc(100vh - 70px);
}
</style>
