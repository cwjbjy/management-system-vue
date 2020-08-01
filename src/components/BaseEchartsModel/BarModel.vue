<template>
  <!-- 柱状图 -->
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexThemeColor } from "../../mixin";
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
    prepareDomain(model) {
      let echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var black = "#2f3542";
      var blue = "#70a1ff";
      var option = {
        color: ["#3398DB"],
        title: {
          text: "柱状图",
          left: "center",
          textStyle: {
            color: this.echartColor,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
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