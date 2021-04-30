<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
// const echarts = require('echarts')
import { vuexTheme } from "../../mixin";
import {bus} from '@/constants'
export default {
  name: "fleetModel",
  components: {},
  props: {
    model: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  watch: {
    model: function (newData) {
      this.prepareDomain(newData);
    },
  },
  mixins: [vuexTheme],
  mounted() {
    window.eventBus.$on(bus.updateEcharts, () => {
      this.prepareDomain(this.model);
    });
  },
  beforeDestroy() {
    //销毁实例，释放内存
    let echartsInstance = echarts.getInstanceByDom(this.$refs.echarts);
    if (echartsInstance) {
      echarts.dispose(echartsInstance);
    }
    window.eventBus.$off(bus.updateEcharts);
  },
  methods: {
    prepareDomain(model) {
      // console.log('vue',echarts)
      var echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var geoCoordMap = model.geoCoordMap;

      /*
      delay：动画推迟时间
      value：描述机场点的大小
      speed：飞机的飞行速度，动画时间
      */

      var apiData = model.apiData;

      var convertData = function (data) {
        var res = [];
        for (let i = 0, len = data.length; i < len; i++) {
          var geoCoord = geoCoordMap[data[i].fromName];
          var geoCoord2 = geoCoordMap[data[i].toName];

          if (geoCoord) {
            res.push({
              name: data[i].fromName,
              value: geoCoord.concat(data[i].value),
            });
            res.push({
              name: data[i].toName,
              value: geoCoord2.concat(data[i].value),
            });
          }
        }
        return res;
      };
      var option = {
        backgroundColor: this.fleetBg,
        title: {
          text: "模拟航线",
          subtext: "数据纯属虚构",
          left: "center",
          top: "20px",
          textStyle: {
            color: "#fff",
            fontSize: 24,
          },
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
          // layoutCenter:["39%","50%"],
          zoom: 1,
          label: {
            emphasis: {
              show: false,
              color: "#fff",
            },
          },
          roam: true, //平移缩放
          itemStyle: {
            normal: {
              areaColor: "#0045A0",
              borderColor: "#00DFFF",
              borderWidth: 2,
            },
            emphasis: {
              areaColor: "#4499d0",
            },
          },
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
                formatter: "{b}",
              },
            },
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            //coordinateSystem:"geo"只会取数组的前两位当做点坐标数据
            data: convertData(apiData),
            //其中第一个参数 value 为 data 中的数据值。第二个参数params 是其它的数据项参数
            symbolSize: function (value) {
              return value[2] / 10;
            },
          },
          {
            name: "涟漪",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: false,
                position: "left",
                formatter: "{b}",
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(102,204,255,0.9)",
                shadowBlur: 10,
                shadowColor: "#0ff7ee",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            hoverAnimation: true,
            showEffectOn: "render", //绘制完成后显示特效
            data: convertData(apiData),
            symbolSize: function (value) {
              return value[2] / 10;
            },
          },
          ...this.buildLines(apiData, geoCoordMap),
        ],
      };
      // console.log("option", option);
      //调用setOption将option输入echarts，然后echarts渲染图表
      echartsInstance.setOption(option);
      window.onresize = function () {
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
        "#3742fa",
      ]; //航线的颜色
      data.map((item, index) => {
        arr.push({
          name: item.airName,
          type: "lines",
          zlevel: index + 3,
          symbol: ["none", "arrow"],
          symbolSize: 10,
          label: {
            show: false,
          },
          effect: {
            show: true,
            period: item.speed, //动画时间
            trailLength: 0.1, //给飞机尾部加特效
            symbol: planePath,
            symbolSize: 15,
            delay: item.delay,
          },
          lineStyle: {
            normal: {
              color: color[index],
              width: 2,
              opacity: 0.5,
              curveness: 0.2, //曲度
            },
          },
          data: [
            {
              name: item.airName,
              fromName: item.fromName,
              toName: item.toName,
              coords: [geoCoordMap[item.fromName], geoCoordMap[item.toName]],
            },
          ],
        });
      });
      return arr;
    },
    // autoSize() {
    //   this.$nextTick(() => {
    //     let echartsInstance = echarts.getInstanceByDom(this.$refs.echarts);
    //     echartsInstance.resize();
    //   });
    // }
  },
};
</script>

<style type="text/scss" scoped>
.myChart {
  width: 100%;
  height: calc(100vh - 70px);

  /* opacity: 0.3; */
}
</style>
