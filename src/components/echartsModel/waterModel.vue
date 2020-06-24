<template>
  <!-- 圆柱 -->
  <div ref="echarts" class="myChart"></div>
</template>

<script>
export default {
  watch: {
    model: function(newData) {
      this.prepareDomain(newData);
    }
  },
  props: {
    model: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    prepareDomain(model) {
      let echartsInstance = echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var black = "#2f3542";
      var blue = "#70a1ff";
      var option = {
        title: {
          text: "水滴图",
          left: "center"
        },
        series: [
          {
            type: "liquidFill",
            radius: "55%",
            center: ["50%", "60%"],
            data: [0.5, 0.5], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "rgb(255,0,255,0.1)"
            },
            label: {
              normal: {
                formatter: (0.5 * 100).toFixed(2) + "%",
                textStyle: {
                  fontSize: 30
                }
              }
            },
            outline: {
              show: false
            }
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
  },
  mounted() {
    this.prepareDomain(this.model);
    window.addEventListener("resize", this.autoSize, false);
    window.eventBus.$on("collapse", () => {
      setTimeout(() => {
        this.autoSize();
      }, 400);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
    window.eventBus.$off("collapse");
  }
};
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 300px;
}
</style>