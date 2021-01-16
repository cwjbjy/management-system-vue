<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexThemeColor } from "../../mixin";
import {bus} from '@/constants'
export default {
  name: "LineModel",
  components: {},
  props: {
    model: {
      type: Object,
      default: function () {},
    },
  },
  data() {
    return {};
  },
  watch: {
    model: function (model) {
      this.prepareDomain(model);
    },
  },
  mixins: [vuexThemeColor],
  mounted() {
    this.prepareDomain(this.model);
    window.addEventListener("resize", this.autoSize, false);
    window.eventBus.$on(bus.collapse, () => {
      setTimeout(() => {
        this.autoSize();
      }, 400);
    });
    window.eventBus.$on(bus.updateEcharts, () => {
      this.prepareDomain(this.model);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
    window.eventBus.$off(bus.collapse);
    window.eventBus.$off(bus.updateEcharts)
  },
  methods: {
    prepareDomain(model) {
      var echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var black = "#2f3542";
      var blue = "#70a1ff";
      var option = {
        color: [
          "#eccc68",
          "#ff7f50",
          "#7bed9f",
          "#70a1ff",
          "#5352ed",
          "#2ed573",
          "#1e90ff",
          "#3742fa",
        ],
        title: {
          left: "center",
          text: "折线图",
          textStyle: {
            color: this.echartColor,
          },
          top: 0,
        },
        xAxis: {
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        yAxis: {
          type: "value",
          name: "次数",
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: this.echartColor,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.echartColor,
              type: "dashed",
              opacity: 0.5,
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
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问"],
          top: "30",
          left: "right",
          textStyle: {
            color: this.echartColor,
          },
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            symbol: "circle",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            symbol: "circle",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            symbol: "circle",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            symbol: "circle",
            data: [320, 332, 301, 334, 390, 330, 320],
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