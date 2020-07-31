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
/* 基础组件的自动化全局注册 */
const path = require('path')
const files = require.context('@/components/BaseEchartsModel', false, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  modules[name] = files(key).default || files(key)
})
export default {
  name:'BaseEcharts',
  components:modules,
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