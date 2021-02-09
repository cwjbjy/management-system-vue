<template>
  <section class="firstItem">
    <el-row>
      <el-col :span="8" :lg="8" :xl="6">
        <!-- 用户信息 -->
        <userInfo />
        <!-- 语言详情 -->
        <language />
      </el-col>
      <el-col :span="16" :lg="16" :xl="18">
        <!-- 消息 -->
        <icon-area />
        <el-row style="padding: 0 10px; margin-bottom: 20px">
          <!-- 待办事项 -->
          <schedule-component />
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <bar-model :model="options"></bar-model>
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <radar-model :model="options"></radar-model>
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
import barModel from "@/components/echartsModel/barLineModel";
import radarModel from "@/components/echartsModel/radarModel";

export default {
  name: "HomePage",
  components: {
    userInfo,
    language,
    iconArea,
    barModel,
    radarModel,
    ScheduleComponent,
  },
  data() {
    return {
      options: {},
    };
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