<template>
  <section>
    <el-row>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <bar-model :model="options"></bar-model>
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <pie-model :model="options"></pie-model>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <scatter-model :model="options"></scatter-model>
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
           <pictorial-bar-model :model="options"></pictorial-bar-model>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <line-model :model="options"></line-model>
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <cylinder-model :model="options"></cylinder-model>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import lineModel from "@/components/EchartsModel/LineModel";
import cylinderModel from "@/components/EchartsModel/CylinderModel";
import pieModel from "@/components/EchartsModel/PieModel";
import scatterModel from "@/components/EchartsModel/ScatterModel";
import barModel from "@/components/EchartsModel/BarModel";
import PictorialBarModel from "@/components/EchartsModel/PictorialBarModel";
export default {
  name:'baseEcharts',
  components: {
    lineModel,
    cylinderModel,
    pieModel,
    scatterModel,
    barModel,
    PictorialBarModel
  },
  data() {
    return {
      options: {}
    };
  }
};
</script>

<style scoped>
.echarts-box {
  padding: 10px;
}
</style>