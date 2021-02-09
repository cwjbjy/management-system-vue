<template>
  <div class="header">
    <div class="header_left">
      <span style="margin-left:10px">PC端后台管理系统(Vue版)</span>
    </div>
    <div class="header_right">
      <!-- 切换主题色 -->
      <el-dropdown @command="switchColor"  class="themeColor">
        <span class="iconfont icon-zhuti_tiaosepan_o"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="gray" :class="[theme === 'gray'?'active':'']">简约灰</el-dropdown-item>
          <el-dropdown-item command="blue" :class="[theme === 'blue'?'active':'']">胖次蓝</el-dropdown-item>
          <el-dropdown-item command="black" :class="[theme === 'black'?'active':'']">夜间模式</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-drop" @command="handleCommand" >
        <div class="userImage">
          <img :src="imageUrl" class="user-img" alt="加载失败" />
          <span>
            {{user_name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <a href="https://github.com/cwjbjy/management-system-vue" target="_blank">
            <el-dropdown-item>项目仓库</el-dropdown-item>
          </a>
          <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import API from "@/service/axios/api";
import { getURL,vuexRoot,vuexThemeColor } from "@/mixin";
import {echartColor,bus} from '@/constants'
export default {
  name: "HomeHeader",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      imageUrl: "",
      theme: "gray",
    };
  },
  mixins: [getURL,vuexRoot,vuexThemeColor],
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
    handleCommand(command) {
      if (command == 'loginout') {
        this.$router.push('/login');
        location.reload();
      }
    },
    //切换主题色
    switchColor(command) {
      this.theme = command;
      switch (command) {
        case this.themes.theme1:
          this.set_echartColor({ data: echartColor.gray_font });
          this.set_fleetBg({data: echartColor.gray_fleetBg})
          break;
        case this.themes.theme2:
          this.set_echartColor({ data: echartColor.blue_font });
          this.set_fleetBg({data: echartColor.blue_fleetBg})
          break;
        case this.themes.theme3:
          this.set_echartColor({ data: echartColor.black_font });
          this.set_fleetBg({data: echartColor.black_fleetBg})
          break;
        default:
          break;
      }
      this.$emit('update:color-change', command);
      window.eventBus.$emit(bus.updateSiderBar, command);
      window.eventBus.$emit(bus.updateEcharts)
    },
    //获取用户头像
    getImage() {
      let params = {
        user_name: this.user_name,
      };
      API.getImage(params).then((res) => {
        let fileName = res.data.Data[0].photo;
        this.imageUrl = `${this.baseURL}${fileName}`;
        this.set_imageUrl({data:this.imageUrl})
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
.active {
  background: #ced6e0;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
  color: #66b1ff;
}
</style>
