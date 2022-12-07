<template>
  <div class="fleetLine">
    <fleet-model :model="geoData"></fleet-model>
  </div>
</template>

<script>
import fleetModel from '@/components/echartsModel/fleetModel';

import { getAirData } from '@/api/local';
export default {
  name: 'fleetLine',
  components: {
    fleetModel,
  },
  data() {
    return {
      lineData: {},
      tableData: [],
      geoData: {},
    };
  },
  created() {
    getAirData().then((res) => {
      this.geoData = res.data;
      this.tableData = res.data.apiData;
    });
  },
};
</script>

<style lang="scss" scoped>
.fleetLine {
  @include themify($themes) {
    background-color: themed('background-fleet');
  }
}
</style>
