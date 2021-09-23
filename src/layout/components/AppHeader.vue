<template>
  <header class="header">
    <div class="header_left">
      <span style="margin-left: 10px">PC端后台管理系统(Vue版)</span>
    </div>
    <div class="header_right">
      <el-tooltip
        class="item"
        effect="dark"
        content="安装桌面快捷方式"
        placement="bottom"
        v-if="show"
      >
        <img
          src="@/assets/images/home/pc.png"
          style="margin-right: 6px;cursor: pointer;width: 30px;"
          @click="installPwa"
        />
      </el-tooltip>
      <!-- 切换主题色 -->
      <el-dropdown class="themeColor" @command="switchColor">
        <span class="iconfont icon-zhuti_tiaosepan_o"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="gray" :class="active('gray')"
            >简约灰</el-dropdown-item
          >
          <el-dropdown-item command="blue" :class="active('blue')"
            >胖次蓝</el-dropdown-item
          >
          <el-dropdown-item command="black" :class="active('black')"
            >夜间模式</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-drop" @command="handleCommand">
        <div class="userImage">
          <img :src="imageUrl" class="user-img" alt="加载失败" />
          <span>
            {{ user_name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <a
            href="https://github.com/cwjbjy/management-system-vue"
            target="_blank"
          >
            <el-dropdown-item>项目仓库</el-dropdown-item>
          </a>
          <el-dropdown-item divided command="loginout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import API from "@/service/axios/api";
import { getURL, vuexRoot, vuexTheme } from "@/mixin";
import { echartColor, bus } from "@/constants";
import pwa from "@/utils/pwa.js";
export default {
  name: "AppHeader",
  data() {
    return {
      imageUrl: "",
      theme: "gray",
    };
  },
  computed: {
    active() {
      return function(color) {
        return this.theme === color ? "dropdownActive" : "";
      };
    },
    show() {
      return process.env.NODE_ENV === "production";
    },
  },
  mixins: [getURL, vuexRoot, vuexTheme],
  created() {
    this.getImage();
  },
  mounted() {
    window.eventBus.$on(bus.updateImg, () => {
      this.getImage();
    });
  },
  beforeDestroy() {
    window.eventBus.$off(bus.updateImg);
  },
  methods: {
    installPwa() {
      pwa.event.prompt();
    },
    handleCommand(command) {
      if (command == "loginout") {
        this.$router.push("/login");
        location.reload();
      }
    },
    switchColor(command) {
      this.theme = command;
      this.$emit("theme", command);
      /* 策略模式 */
      this.SET_COLOR({ data: echartColor[command].font });
      this.SET_FLEET({ data: echartColor[command].fleetBg });
      this.SET_THEME({ data: command });
    },
    getImage() {
      let params = {
        user_name: this.user_name,
      };
      API.getImage(params).then((res) => {
        let fileName = res.data.Data[0].photo;
        this.imageUrl = `${this.baseURL}${fileName}`;
        this.SET_IMAGEURL({ data: this.imageUrl });
      });
    },
  },
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
    .user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 5px;
    }
    .user-drop {
      padding: 5px;
    }
    .userImage {
      display: inline-flex;
      > span {
        line-height: 50px;
      }
    }
  }
}
</style>
<style lang="scss">
@include dropdown;
.iconfont {
  font-size: 30px;
  @include themify($themes) {
    color: themed("icon-font");
  }
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
  color: #66b1ff;
}
.dropdownActive {
  background-color: rgba(84, 92, 100, 0.5);
}
</style>
