<template>
  <div class="menus">
    <el-menu
      :default-active="defaultActive"
      class="sidebar-el-menu"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="item in menus">
        <template v-if="item.children"></template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.name">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menus",
  data() {
    return {
      defaultActive: "/homePage",
      isCollapse:false,
      menus: [
        {
          name: "系统首页",
          key: "homePage",
          path: "/homePage",
          icon: "el-icon-s-home"
        },
        {
          name: "航线",
          key: "fleet",
          path: "/fleet",
          icon: "el-icon-s-promotion"
        },
        {
          name: "地球",
          key: "earth",
          path: "/earth",
          icon: "el-icon-baseball"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      this.defaultActive = index;
    }
  },
  mounted(){
    window.eventBus.$on('collapse',(value)=>{
      this.isCollapse = value;
    })
  },
  beforeDestroy(){
    window.eventBus.$off('collapse')
  }
};
</script>

<style scoped lang="scss">
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
</style>