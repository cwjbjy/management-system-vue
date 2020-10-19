<template>
  <div class="fleetLine">
    <fleet-model :model="geoData"></fleet-model>
  </div>
</template>

<script>
import fleetModel from "@/components/EchartsModel/FleetModel";
import localData from "@/service/axios/localData";
export default {
  name: "fleetLine",
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

  /* 在导航完成前获取数据 */
  // beforeRouteEnter(to, from, next) {
  //   localData.getAirData().then((res) => {
  //      next((vm) => {
  //        vm.$data.geoData = res.data;
  //      });
  //   });
  // },

  /* 在导航完成后获取数据 */
  created() {
    localData.getAirData().then((res) => {
      this.geoData = res.data;
      this.tableData = res.data.apiData;
    });
  },
};
</script>

<style lang="scss" scoped>
.fleetLine {
  @include themify($themes) {
    background-color: themed("fleet-bg");
  }
}
</style>