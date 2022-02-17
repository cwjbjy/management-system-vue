<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexTheme } from '../../mixin';
import resize from '../../mixin/resize';
import * as base from '@/utils/echartsBase';
export default {
  name: 'BarModel',
  watch: {
    model(newData) {
      this.prepareDomain(newData);
    },
    echartColor() {
      this.prepareDomain();
    },
  },
  mixins: [vuexTheme, resize],
  mounted() {
    this.prepareDomain();
  },
  methods: {
    prepareDomain() {
      let echartsInstance = window.echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var option = {
        color: ['#3398DB'],
        title: base.title({ text: '柱状图', color: this.echartColor }),
        tooltip: base.tooltip('axis'),
        grid: base.grid(),
        xAxis: base.xAxis({
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          color: this.echartColor,
        }),
        yAxis: base.yAxis(this.echartColor),
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };
      echartsInstance.setOption(option);
      // console.log(echartsInstance.getModel().getComponent("yAxis").axis.scale._extent)
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
