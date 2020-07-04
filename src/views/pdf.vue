<template>
  <div class="filePreview">
    <el-card shadow="hover">
        <h4>点击按钮，进行pdf预览，具有放大、缩小、下载、打印功能</h4>
      <el-button type="primary" @click="dialogFormVisible = true">点我弹框</el-button>
    </el-card>
    <el-dialog title="简历预览" :visible.sync="dialogFormVisible" width="90%" top="2vh">
      <iframe :src="src" frameborder="0" class="pdf"></iframe>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      src: "/utils/cwj.pdf",
      dialogFormVisible:false
    };
  },
  methods: {
    
  }
};
</script>
 
<style lang="scss" scoped>
.filePreview {
  
  padding: 10px;
  .pdf{
   width: 100%; 
   height:calc(100vh - 170px - 2vh)
  }
}
</style>

<style scoped lang="scss">

</style>