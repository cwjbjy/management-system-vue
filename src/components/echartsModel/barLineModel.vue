<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexConfig } from "../../mixin";
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
  mixins: [vuexConfig],
  mounted() {
    this.prepareDomain(this.model);
    window.addEventListener("resize", this.autoSize, false);
    window.eventBus.$on("collapse", () => {
      setTimeout(() => {
        this.autoSize();
      }, 400);
    });
    window.eventBus.$on("update:echartColor", () => {
      this.prepareDomain(this.model);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
    window.eventBus.$off("collapse");
    window.eventBus.$off("update:echartColor")
  },
  methods: {
    keyDown() {
      let key = window.event.keyCode;
      console.log("key", key);
    },
    prepareDomain(model) {
      let echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      let option = {
        title: {
          text: "2019年销售水量和主营业务收入对比",
          left: "center",
          textStyle: {
            color: this.echartColor,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        legend: {
          data: ["销售水量", "主营业务"],
          top: "10%",
          left: "center",
          textStyle: {
            color: this.echartColor,
          },
        },
        xAxis: {
          data: [
            "当年完成水量",
            "去年同期水量",
            "滚动目标值水量",
            "全年目标值水量",
            "当年完成金额",
            "去年同期金额",
            "滚动目标金额",
            "全年目标值",
          ],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: this.echartColor,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            lineStyle: {
              color: this.echartColor,
            },
          },
          axisLabel: {
            show: true,
            color: this.echartColor,
          },
          nameTextStyle: {
            color: this.echartColor,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "亿元",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true, //隐藏X轴轴线
              lineStyle: {
                color: this.echartColor,
              },
            },
            axisTick: {
              show: true, //隐藏X轴刻度
              lineStyle: {
                color: this.echartColor,
              },
            },
            axisLabel: {
              show: true,
              color: this.echartColor,
            },
            nameTextStyle: {
              color: this.echartColor,
            },
          },
          {
            type: "value",
            name: "同比",
            position: "right",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true, //隐藏X轴轴线
              lineStyle: {
                color: this.echartColor,
              },
            },
            axisTick: {
              show: true, //隐藏X轴刻度
              lineStyle: {
                color: this.echartColor,
              },
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              color: this.echartColor,
            },
            nameTextStyle: {
              color: this.echartColor,
            },
          },
        ],
        series: [
          {
            name: "销售水量",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#058cff",
            },
            lineStyle: {
              color: "#058cff",
            },

            //折线图下方的线性渐变

            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#1e90ff",
                  },
                  {
                    offset: 1,
                    color: "#70a1ff",
                  },
                ],
              },
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
          },
          {
            name: "主营业务",
            type: "bar",
            barWidth: 15,

            //柱状图柱形的线性渐变

            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0, // 0% 处的颜色
                      color: "#5352ed",
                    },
                    {
                      offset: 1, // 100% 处的颜色
                      color: "#3742fa",
                    },
                  ],
                },
                barBorderRadius: 20,
              },
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
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