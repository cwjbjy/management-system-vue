<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexThemeColor } from "../../mixin";
import { bus } from "@/constants";
export default {
  watch: {
    model: function (newData) {
      this.prepareDomain(newData);
    },
  },
  props: {
    model: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  mixins: [vuexThemeColor],
  mounted() {
    this.prepareDomain(this.model);
    window.addEventListener("resize", this.autoSize, false);
    window.eventBus.$on(bus.updateEcharts, () => {
      this.prepareDomain(this.model);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
    window.eventBus.$off(bus.updateEcharts);
  },
  methods: {
    prepareDomain(model) {
      let echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var legendData = ["车辆数", "设计车位"]; //图例
      var indicator = [
        {
          text: "小型车",
          max: 6000,
        },
        {
          text: "中型车",
          max: 5000,
        },
        {
          text: "大型车",
          max: 5000,
        },
        {
          text: "货车",
          max: 5000,
          //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
        },
        {
          text: "特种车",
          max: 5000,
        },
        {
          text: "贵宾车",
          max: 5000,
        },
      ];
      var dataArr = [
        {
          value: [4300, 4700, 3600, 3900, 3800, 4200],
          name: legendData[0],
          //   label: {
          //     show: true,
          //     formatter: function(params) {
          //       return params.value;
          //     }
          //   },
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#4A99FF",
                // shadowColor: '#4A99FF',
                // shadowBlur: 10,
              },
              shadowColor: "#4A99FF",
              shadowBlur: 10,
            },
          },
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#4A99FF",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(0,0,0,0)",
                  },
                  {
                    offset: 1,
                    color: "#4A99FF",
                  },
                ],
                globalCoord: false,
              },
              opacity: 1, // 区域透明度
            },
          },
        },
        {
          value: [3200, 3000, 3400, 2000, 3900, 2000],
          name: legendData[1],
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#4BFFFC",
                // shadowColor: '#4BFFFC',
                // shadowBlur: 10,
              },
              shadowColor: "#4BFFFC",
              shadowBlur: 10,
            },
          },
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#4BFFFC",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(0,0,0,0)",
                  },
                  {
                    offset: 1,
                    color: "#4BFFFC",
                  },
                ],
                globalCoord: false,
              },
              opacity: 1, // 区域透明度
            },
          },
        },
      ];
      var colorArr = ["#4A99FF", "#4BFFFC"]; //颜色
      var option = {
        // backgroundColor: "#101736",
        color: colorArr,
        legend: {
          orient: "vertical",
          textStyle: {
            color: this.echartColor,
          },
          data: legendData,
          bottom: 0,
          right: 0,
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        },
        radar: {
          // shape: 'circle',
          indicator: indicator,
          splitArea: {
            show: true,
          },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: this.echartColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: "#113865", // 分隔线颜色
              width: 1, // 分隔线线宽
            },
          },
        },
        series: [
          {
            type: "radar",
            symbolSize: 8,
            // symbol: 'angle',
            data: dataArr,
          },
        ],
      };
      echartsInstance.setOption(option);
      // echartsInstance.resize();
    },
    autoSize() {
      this.$nextTick(() => {
        let echartsInstance = echarts.getInstanceByDom(this.$refs.echarts);
        echartsInstance.resize();
      });
    },
  },
};
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 300px;
}
</style>