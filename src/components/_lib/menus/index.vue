<template>
<!-- 适配所有级别菜单 || 一级二级三级等等... -->
  <nav>
    <el-menu
      :default-active="defaultActive"
      class="sidebar-el-menu"
      @select="handleSelect"
      :collapse="isCollapse"
      :background-color="bgColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      unique-opened
      router
    >
      <menus-item :list="newMenus"></menus-item>
    </el-menu>
  </nav>
</template>

<script>
import { vuexThemeColor } from "@/mixin";
import {bus,menus} from "@/constants";
import menusItem from "./menusItem";
export default {
  name: "Menus",
  components:{
    menusItem
  },
  data() {
    return {
      defaultActive: "/firstItem",
      isCollapse: false,
      newMenus: [],
      themeColor: "",
      bgColor: "#545c64",
      textColor: "#fff",
      activeTextColor: "#ffd04b",
    };
  },
  watch: {
    themeColor(newValue) {
      switch (newValue) {
        case this.themes.theme1:
          this.bgColor = "#545c64";
          break;
        case this.themes.theme2:
          this.bgColor = "#336ea9";
          break;
        case this.themes.theme3:
          this.bgColor = "#303030";
          break;
        default:
          break;
      }
    },
  },
  mixins: [vuexThemeColor],
  created() {
    var ua = navigator.userAgent.toLowerCase();
    console.log("ua", ua);
    let authMenus = this.$cookies.get("authMenus").split(",");
    menus.forEach((item) => {
      if (item.key && authMenus.includes(item.key)) {
        this.newMenus.push(item);
      }
    });
    //刷新时，定位到系统首页
    let path = this.newMenus[0].path;
    this.$router.push(path);
  },
  mounted() {
    window.eventBus.$on(bus.collapse, (value) => {
      this.isCollapse = value;
    });
    window.eventBus.$on(bus.updateSiderBar, (value) => {
      this.themeColor = value;
    });
    window.eventBus.$on(bus.updateRouter, (value) => {
      this.defaultActive = value;
    });
  },
  beforeDestroy() {
    window.eventBus.$off(bus.collapse);
    window.eventBus.$off(bus.updateSiderBar);
    window.eventBus.$off(bus.updateRouter);
  },
  methods: {
    handleSelect(index) {
      this.defaultActive = index;
    },
  },
};
</script>

<style scoped lang="scss">
nav {
  height: inherit;
  overflow-y: auto;
  overflow-x: hidden;
}
nav::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>