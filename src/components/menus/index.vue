<template>
<!-- 适配所有级别菜单 || 一级二级三级等等... -->
  <nav>
    <el-menu
      :default-active="defaultActive"
      class="sidebar-el-menu"
      @select="handleSelect"
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
import {bus,menus,echartColor} from "@/constants";
import menusItem from "./menusItem";

export default {
  name: "Menus",
  components:{
    menusItem
  },
  data() {
    return {
      defaultActive: "/firstItem",
      newMenus: [],
      bgColor: "#545c64",
      textColor: "#fff",
      activeTextColor: "#ffd04b",
    };
  },
  watch: {
    theme(newVal){
      this.bgColor = echartColor[newVal].menuBg
    }
  },
  mixins: [vuexThemeColor],
  created() {
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
    window.eventBus.$on(bus.updateRouter, (value) => {
      this.defaultActive = value;
    });
  },
  beforeDestroy() {
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