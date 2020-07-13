<template>
  <div class="home-header">
    <div class="box1">
      <div @click="collapseChage">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <span style="margin-left:10px">PC端后台管理系统</span>
    </div>
    <div class="box2">
      <el-button @click="out">退出</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      collapse: true,
      fullscreen: false,
      username: "文杰"
    };
  },
  methods: {
    out(){
      this.$router.push('/login');
       location.reload()
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      window.eventBus.$emit('collapse',this.collapse)
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>

<style scoped lang="scss">
.home-header {
  display: flex;
  width: 100%;
  height: inherit;
  .box1 {
    width: 50%;
    height: inherit;
    line-height: 70px;
    font-size: 24px;
    letter-spacing: 2px;
    text-indent: 10px;
    display: inline-flex;
  }
  .box2{
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
<style lang="scss">
</style>
