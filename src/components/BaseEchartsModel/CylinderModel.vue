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
  mounted() {
    this.prepareDomain(this.model);
    window.addEventListener("resize", this.autoSize, false);
    window.eventBus.$on("collapse", () => {
      setTimeout(() => {
        this.autoSize();
      }, 400);
    });
  },
  activated() {
    this.autoSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoSize, false);
    window.eventBus.$off("collapse");
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
            type: "shadow"
          }
        },
        title: {
          text: "圆柱图",
          textStyle: {
            color: black
          },
          x: "center"
          // y: 'center',
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: black
              }
            },
            axisLabel: {
              textStyle: {
                color: black
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: black
              }
              // "formatter": "{value}%"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: black,
                type: "dashed",
                opacity: 0.5
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: black
              }
            }
          }
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
                position: "top"
                // "formatter": "{c}%"
              }
            },
            data: [60, 70, 80, 90, 60, 70, 80]
          },
          {
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, 5],
            z: 12,
            data: [60, 70, 80, 90, 60, 70, 80]
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: ["#5352ed"],
                opacity: 0.7
              }
            },
            barWidth: 20,
            data: [60, 70, 80, 90, 60, 70, 80],
            markLine: {
              silent: true,
              symbol: "none",
              label: {
                position: "middle"
              },
              data: [
                {
                  name: "目标值",
                  yAxis: 80,
                  lineStyle: {
                    color: "#ffc832"
                  },
                  label: {
                    position: "end",
                    formatter: "{b}\n {c}"
                  }
                }
              ]
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
  }
};
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 300px;
}
</style>