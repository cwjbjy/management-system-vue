<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
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
    model: function(model) {
      this.prepareDomain(model);
    }
  },
  mounted() {
    this.prepareDomain();
    //监听浏览器窗口onsize事件
    window.addEventListener("resize", this.autoSize, false);
    //监听element-ui菜单栏收缩动画事件
    window.eventBus.$on("collapse", () => {
      setTimeout(() => {
        this.autoSize();
      }, 400);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
    window.eventBus.$off("collapse");
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
          "#3742fa"
        ],
        title: {
          left: "center",
          text: "折线图",
          textStyle: {
            color: black
          },
          top: 0
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: black
            }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        // dataZoom: [
        //   {
        //     type: "slider",
        //     xAxisIndex: 0,
        //     start: 0,
        //     end: 100,
        //     height: 20,
        //     filterMode: "empty",
        //     background: "rgba(1, 143, 252, 0.3)",
        //     fillerColor: "rgba(43, 187, 239, 0.2)",
        //     borderColor: "rgba(1, 143, 252, 0.6)",
        //     handleStyle: {
        //       color: blue,
        //       borderColor: blue
        //     },
        //     handleIcon:
        //       "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        //     handleSize: "20",
        //     textStyle: {
        //       color: blue
        //     },
        //     dataBackground: {
        //       areaStyle: {
        //         color: "rgba(1, 143, 252, 0.1)"
        //       }
        //     }
        //   },
        //   {
        //     type: "inside",
        //     xAxisIndex: 0,
        //     start: 30,
        //     end: 60,
        //     filterMode: "empty"
        //   }
        // ],
        yAxis: {
          type: "value",
          name: "次数",
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: black
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: black,
              type: "dashed",
              opacity: 0.5
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问"],
          top: "30",
          left: "right",
          textStyle: {
            color: black
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            symbol: "circle",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            symbol: "circle",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            symbol: "circle",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            symbol: "circle",
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      };
      echartsInstance.setOption(option);
    },
    autoSize() {
      this.$nextTick(() => {
        let echartsInstance = echarts.getInstanceByDom(this.$refs.echarts);
        echartsInstance.resize();
      });
    }
  }
};
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 300px;
}
</style>