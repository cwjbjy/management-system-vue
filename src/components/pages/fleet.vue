<template>
  <div class="fleet">
    <!-- <div id="stars" style="position: absolute;"></div>
    <div id="stars2" style="position: absolute"></div> -->
    <fleet-model :model="geoData"></fleet-model>
    <div class="fleet-box box2">
      <el-table
        :data="tableData"
        class="special_table leavel"
        :row-style="getRowClass"
        height="250"
      >
        <el-table-column prop="airName" label="飞机"></el-table-column>
        <el-table-column prop="fromName" label="出发城市"></el-table-column>
        <el-table-column prop="toName" label="到达城市"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import fleetModel from "../echarts/fleetModel";
import localData from "../../server/localData";
export default {
  name: "fleet",
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
      console.log("res.data", res.data);
      this.geoData = res.data;
      this.tableData = res.data.apiData;
    });
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:rgba(63, 92, 109, 0)";
    }
  }
};
</script>



<style lang="scss" scoped>
.fleet {
  height: inherit;
  position: relative;
  &-box {
    width: 300px;
    height: 250px;
    border: 1px solid #02a6b5;
    z-index: 2;
    overflow: auto;
  }
  .box1 {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .box2 {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  .leavel {
    z-index: 5;
  }
}
</style>

<style lang="scss">
// @import "../../assets/css/el-table.css";
// @import "../../assets/css/scroll.css";
@import "../../assets/css/starrun.css";
.pane::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.pane::after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
</style>