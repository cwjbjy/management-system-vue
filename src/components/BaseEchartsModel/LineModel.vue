<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
import { vuexTheme } from '../../mixin';
import resize from '../../mixin/resize';

import * as base from '@/utils/echartsBase';
export default {
  name: 'LineModel',
  props: {
    model: {
      type: Object,
      default: function () {},
    },
  },
  watch: {
    model: function (model) {
      this.prepareDomain(model);
    },
    echartColor() {
      this.prepareDomain();
    },
  },
  mixins: [vuexTheme, resize],
  mounted() {
    this.prepareDomain(this.model);
  },
  methods: {
    prepareDomain() {
      var echartsInstance = window.echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var option = {
        color: ['#eccc68', '#ff7f50', '#7bed9f', '#70a1ff', '#5352ed', '#2ed573', '#1e90ff', '#3742fa'],
        title: base.title({ text: '折线图', color: this.echartColor }),
        grid: base.grid(),
        xAxis: base.xAxis({
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          color: this.echartColor,
        }),
        tooltip: base.tooltip('axis', 'line'),
        yAxis: base.yAxis(this.echartColor),
        legend: base.legend(this.echartColor),
        series: [
          {
            name: '邮件营销',
            type: 'line',
            symbol: 'circle',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'line',
            symbol: 'circle',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'line',
            symbol: 'circle',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '直接访问',
            type: 'line',
            symbol: 'circle',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      };
      echartsInstance.setOption(option);
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
