<template>
  <!-- 圆柱 -->
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexTheme } from "../../mixin";
import * as base from "@/config/echarts/base";
export default {
  name:'CylinderModel',
  props: {
    model: {
      type: Object,
      default: {},
    },
  },
  watch: {
    model(newData) {
      this.prepareDomain(newData);
    },
    echartColor() {
      this.prepareDomain();
    },
  },
  mixins: [vuexTheme],
  mounted() {
    this.prepareDomain(this.model);
    window.addEventListener("resize", this.autoSize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
  },
  methods: {
    prepareDomain(model) {
      let echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      let option = {
        color: ["#70a1ff", "#70a1ff"],
        title: base.title({ text: "圆柱图", color: this.echartColor }),
        grid: base.grid(),
        tooltip: base.tooltip("item"),
        xAxis: base.xAxis({
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          color: this.echartColor,
        }),
        yAxis: Object.assign(base.yAxis(this.echartColor), {
          splitLine: {
            show: true,
            lineStyle: {
              color: this.echartColor,
              type: "dashed",
              opacity: 0.5,
            },
          },
        }),
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