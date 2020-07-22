<template>
  <div class="fleetLine">
    <fleet-model :model="geoData"></fleet-model>
  </div>
</template>

<script>

import fleetModel from "@/components/echartsModel/fleetModel";
import localData from "@/services/localData";
export default {
  name: "fleetLine",
  components: {
    fleetModel
  },
  data() {
    return {
      lineData: {},
      tableData: [],
      geoData: {}
    };
  },
  created() {
    localData.getAirData().then(res => {
      this.geoData = res.data;
      this.tableData = res.data.apiData;
    });
  },
};
</script>

<style lang="scss" scoped>
.fleetLine{
  background-color: rgb(6,42,88);
}
</style>