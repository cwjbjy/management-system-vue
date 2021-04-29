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
      let option = {
        color: [
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
        ],
        title: {
          text: "饼图",
          left: "center",
          textStyle: {
            color: this.echartColor,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: this.echartColor,
          },
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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