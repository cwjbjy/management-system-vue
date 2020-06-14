<template>
  <div class="home-header">
    <div class="box1">
      PC端后台管理系统
    </div>
    <div class="box2"></div>
  </div>
</template>
<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      username: "文杰"
    };
  },
  methods: {
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
  display: inline-block;
  width: 100%;
  height:inherit;
  .box1{
    width: 50%;
    height:inherit;
    line-height: 70px;
    font-size: 24px;
    letter-spacing: 2px;
    text-indent:14px;
  }
}
</style>
<style lang="scss">
</style>
