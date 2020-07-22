<template>
  <div class="header">
    <div class="header_left">
      <div @click="collapseChage" class="pointer">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <span style="margin-left:10px">PC端后台管理系统</span>
    </div>
    <div class="header_right">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
        <img
          src="@/assets/images/home/fullScreen.png"
          class="fullScreen pointer"
          @click="handleFullScreen"
        />
      </el-tooltip>
      <!-- 切换主题色 -->
      <el-dropdown class="user-drop" @command="switchColor">
        <span>
          {{themeColor}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="gray">浅灰</el-dropdown-item>
          <el-dropdown-item  command="blue">浅蓝</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="imageUrl" class="user-img" />
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-drop" @command="handleCommand">
        <span>
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
import { getURL } from "@/js/mixin";
export default {
  name: "HomeHeader",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      imageUrl: "",
      user_name: "",
      themeColor:"浅灰"
    };
  },
  computed: {
    userName() {
      return this.user_name == "cwj18351071268" ? "admin" : "consumer";
    }
  },
  mixins: [getURL],
  created() {
    this.user_name = localStorage.getItem("user_name");
    this.getImage();
    //上传完图片后及时更新
    window.eventBus.$on('update:img',()=>{
      this.getImage();
    })
  },
  beforeDestroy() {
    window.eventBus.$off('update:img')
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        this.$router.push("/login");
        location.reload();
      }
    },
    //切换主题色
    switchColor(command){
      switch(command){
        case "gray":
          this.themeColor = "浅灰";
          break;
        case "blue":
          this.themeColor = "浅蓝";
          break;
        default:
          this.themeColor = "浅灰";
          break;
      }
      this.$emit('update:color-change',command);
      window.eventBus.$emit('colorChange',command)
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
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  height: inherit;
  &_left {
    width: 50%;
    line-height: 70px;
    font-size: 24px;
    letter-spacing: 2px;
    text-indent: 10px;
    display: inline-flex;
  }
  &_right {
    width: 50%;
    @extend %main_centerRight;
    .fullScreen {
      width: 22px;
      height: 20px;
      padding: 10px;
    }
    .user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 5px;
    }
    .user-drop {
      padding: 5px;
    }
  }
}
</style>
<style lang="scss">
@include dropdown;
</style>
