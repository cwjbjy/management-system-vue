<template>
  <div class="home-header">
    <div class="box1">
      <div @click="collapseChage" class="pointer">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <span style="margin-left:10px">PC端后台管理系统</span>
    </div>
    <div class="box2">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
        <img
          src="@/assets/images/home/fullScreen.png"
          class="imageBox pointer"
          @click="handleFullScreen"
        />
      </el-tooltip>
      <img :src="imageUrl" class="user-img" />
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{userName}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <a href="https://github.com/cwjStore/management-system-vue" target="_blank">
            <el-dropdown-item>项目仓库</el-dropdown-item>
          </a>
          <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import API from "@/services/api";
export default {
  // name: "HomeHeader",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      imageUrl: "",
      user_name: ""
    };
  },
  computed: {
       userName(){
      let user = localStorage.getItem('user_name');
      return user == 'cwj18351071268' ? 'admin' : 'consumer'
    },
    baseURL() {
      const env = process.env.NODE_ENV;
      let url = "";
      switch (env) {
        case "development":
          url = "//127.0.0.1:9000/images/";
          break;
        case "production":
          url = "https://wen.cwjbjy.online/images/";
          break;
      }
      return url;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        this.$router.push("/login");
        location.reload();
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      window.eventBus.$emit("collapse", this.collapse);
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
    },
    //获取用户头像
    getImage() {
      let params = {
        user_name: this.user_name
      };
      API.getImage(params).then(res => {
        let fileName = res.data.Data[0].photo;
        this.imageUrl = `${this.baseURL}${fileName}`;
      });
    }
  },
  mounted(){
    //根据屏幕大小，决定是收缩菜单栏
    // this.$nextTick(()=>{
    //   if (document.body.clientWidth < 1500) {
    //   this.collapseChage();
    // }
    // })
  },
  created() {
    this.user_name = localStorage.getItem("user_name");
    this.getImage();
  },
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
  .box2 {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .imageBox {
    width: 22px;
    height: 20px;
    padding: 10px;
  }
  .pointer {
    cursor: $c_pointer;
  }
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 5px;
  }
  .user-name{
    padding: 5px;
  }
}
</style>
<style lang="scss">
@include dropdown;
</style>
