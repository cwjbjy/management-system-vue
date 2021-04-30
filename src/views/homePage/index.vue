<template>
  <section class="firstItem">
    <el-row>
      <el-col :span="8" :lg="8" :xl="6">
        <userInfo />
        <language />
      </el-col>
      <el-col :span="16" :lg="16" :xl="18">
        <icon-area />
        <el-row style="padding: 0 10px; margin-bottom: 20px">
          <schedule-component />
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <bar-line-model></bar-line-model>
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <radar-model></radar-model>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import userInfo from "./components/userInfo";
import language from "./components/language";
import iconArea from "./components/iconArea";
import ScheduleComponent from "./components/ScheduleComponent";
import BarLineModel from "@/components/echartsModel/barLineModel";
import RadarModel from "@/components/echartsModel/radarModel";

export default {
  name: "HomePage",
  components: {
    userInfo,
    language,
    iconArea,
    BarLineModel,
    RadarModel,
    ScheduleComponent
  },
};
</script>

<style scoped lang="scss">
.firstItem {
  padding: 10px 0 0 10px;
  .echarts-box {
    padding: 0 10px;
  }
}
</style>