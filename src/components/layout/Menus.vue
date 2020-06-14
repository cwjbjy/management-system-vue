<template>
  <div class="menus">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="item in menus">
        <el-menu-item :index="item.path" :key="item.name">{{item.name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menus",
  data() {
    return {
      defaultActive: "/fleet",
      menus: [
        {
          name: "系统首页",
          key: "homePage",
          path: "/homePage",
          icon: "",
          children: []
        },
        {
          name: "航线",
          key: "fleet",
          path: "/fleet",
          icon: "",
          children: []
        },
        {
          name: "地球",
          key: "earth",
          path: "/earth",
          icon: "",
          children: []
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
  }
};
</script>

<style scoped lang="scss">
.menus {

}
</style>