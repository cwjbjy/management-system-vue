<template>
  <!-- 适配所有级别菜单 || 一级二级三级等等... -->
  <nav>
    <el-menu
      :default-active="$route.path"
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
import menusItem from './menusItem';

import { bus, menus, echartColor } from '@/constants';
import { vuexTheme } from '@/mixin';

export default {
  name: 'Menus',
  components: {
    menusItem,
  },
  data() {
    return {
      defaultActive: '/firstItem',
      newMenus: [],
      bgColor: '#545c64',
      textColor: '#fff',
      activeTextColor: '#ffd04b',
    };
  },
  watch: {
    theme(newVal) {
      this.bgColor = echartColor[newVal].menuBg;
    },
  },
  mixins: [vuexTheme],
  created() {
    const authMenus = localStorage.getItem('authMenus');
    menus.forEach((item) => {
      if (item.key && authMenus.includes(item.key)) {
        this.newMenus.push(item);
      }
    });
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
