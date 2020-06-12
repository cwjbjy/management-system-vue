<template>
  <div v-title="title" class="app-root" :class="themeClass">
    <div class="app-container">
      <home-header></home-header>
      <div class="app-main">
        <menus></menus>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../server/api";
import HomeHeader from "./HomeHeader";
import Menus from "./Menus";
export default {
  components: {
    HomeHeader,
    Menus
  },
  computed: {
    themeClass() {
      return `theme-${this.theme}`;
    },
    count() {
      return this.$store.state.count;
    }
  },
  data() {
    return {
      title: "文杰的仓库",
      msg: "Dynamic Themes",
      theme: "blue"
    };
  },

  created() {
    API.getData().then(() => {});
  },
  beforeDestroy() {},
  methods: {
    a() {
      this.$store.commit("set_count", {
        data: 2
      });
      console.log(this.count);
    }
  }
};
</script>

<style lang="scss">
.app-container {
  @include themify($themes) {
    color: themed("font-color");
    background-color: themed("main-background");
  }
  .app-main{
    display:flex;
    height: calc(100vh - 70px);
  }
  .el-menu{
    border: none;
  }
}
</style>