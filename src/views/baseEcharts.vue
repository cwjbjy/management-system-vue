<template>
  <div>
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
  </div>
</template>

<script>
import lineModel from "@/components/echartsModel/lineModel";
import cylinderModel from "@/components/echartsModel/cylinderModel";
import pieModel from "@/components/echartsModel/pieModel";
import scatterModel from "@/components/echartsModel/scatterModel";
import barModel from "@/components/echartsModel/barModel";
import PictorialBarModel from "@/components/echartsModel/PictorialBarModel";
export default {
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

<style lang="scss">
</style>