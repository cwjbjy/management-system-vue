<template>
  <!-- 圆柱 -->
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexThemeColor } from "../../mixin";
import {bus} from '@/constants'
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
    window.eventBus.$off(bus.updateEcharts)
  },
  methods: {
    prepareDomain(model) {
      let echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var black = "#2f3542";
      var blue = "#70a1ff";
      let option = {
        color: ["#70a1ff", "#70a1ff"],
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow",
          },
        },
        title: {
          text: "圆柱图",
          textStyle: {
            color: this.echartColor,
          },
          x: "center",
          // y: 'center',
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisLine: {
              show: true, //隐藏X轴轴线
              lineStyle: {
                color: this.echartColor,
              },
            },
            axisTick: {
              show: true, //隐藏X轴刻度
              alignWithLabel: true,
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
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: this.echartColor,
                type: "dashed",
                opacity: 0.5,
              },
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
        ],
        series: [
          {
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 12,
            label: {
              normal: {
                show: true,
                position: "top",
                // "formatter": "{c}%"
              },
            },
            data: [60, 70, 80, 90, 60, 70, 80],
          },
          {
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, 5],
            z: 12,
            data: [60, 70, 80, 90, 60, 70, 80],
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: ["#5352ed"],
                opacity: 0.7,
              },
            },
            barWidth: 20,
            data: [60, 70, 80, 90, 60, 70, 80],
            markLine: {
              silent: true,
              symbol: "none",
              label: {
                position: "middle",
              },
              data: [
                {
                  name: "目标值",
                  yAxis: 80,
                  lineStyle: {
                    color: "#ffc832",
                  },
                  label: {
                    position: "end",
                    formatter: "{b}\n {c}",
                  },
                },
              ],
            },
          },
        ],
      };
      echartsInstance.setOption(option);
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