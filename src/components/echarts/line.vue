<template>
  <div ref="echarts" :style="{height:echartsHeight+'px'}"></div>
</template>

<script>
// var echarts = require('../../../node_modules/echarts');
// console.log('echarts1111111111',echarts)
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
    return {
      height: "",
      echartsHeight: 300,
    };
  },
  watch: {
    model: function(model) {
      this.prepareDomain(model);
    }
  },
  methods: {
    prepareDomain: function(model) {
      console.log('cv',window)
      console.log('a',echarts)
      var echarts = this.$echarts.init(this.$refs.echarts);
      echarts.clear();
      var option = {
        title: {
          left: "center",
          text: "销售",
          textStyle: {
            color: "#66ccff"
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
              color: "#66ccff"
            }
          }
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            start: 30,
            end: 60,
            height: 20,
            filterMode: "empty",
            background: "rgba(1, 143, 252, 0.3)",
            fillerColor: "rgba(43, 187, 239, 0.2)",
            borderColor: "rgba(1, 143, 252, 0.6)",
            handleStyle: {
              color: "#66ccff",
              borderColor: "#66ccff"
            },
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "20",
            textStyle: {
              color: "#66ccff"
            },
            dataBackground: {
              areaStyle: {
                color: "rgba(1, 143, 252, 0.1)"
              }
            }
          },
          {
            type: "inside",
            xAxisIndex: 0,
            start: 30,
            end: 60,
            filterMode: "empty"
          }
        ],
        yAxis: {
          type: "value",
          name: "XX",
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#66ccff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#66ccff",
              type: "dashed",
              opacity: 0.5
            }
          }
        },
        color: ["#4472C5", "#ED7C30", "#80FF80", "#FF8096", "#800080"],
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          top: "30",
          textStyle: {
            color: "#66ccff"
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
          },
          {
            name: "搜索引擎",
            type: "line",
            symbol: "circle",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      console.log('option',option)
      //调用setOption将option输入echarts，然后echarts渲染图表
      echarts.setOption(option);
    }
  },
  mounted: function() {
    this.$nextTick(()=>{
this.prepareDomain(this.model);
    })
    
  },
  created() {
    if (window.screen.height >= 1080) {
      this.echartsHeight = 860 / 2;
    } else {
      this.echartsHeight = 600 / 2;
    }
  }
};
</script>

<style type="text/scss">
</style>
