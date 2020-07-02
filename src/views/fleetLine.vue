<template>
  <div class="fleet">
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

import fleetModel from "@/components/echartsModel/fleetModel";
import localData from "@/services/localData";
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
</style>