<template>
  <div v-title="title" class="app-root" :class="themeClass">
    <div class="app-container">
      <header class="header">
        <home-header></home-header>
      </header>

      <div class="app-main">
        <aside class="aside">
          <menus></menus>
        </aside>
        <section class="app-content">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </section>
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
  .app-main {
    display: flex;
    height: calc(100vh - 70px);
  }
  .el-menu {
    border: none;
  }
  .header {
    @include themify($themes) {
      background-color: themed("header-background");
    }
    height: 70px;
    width: 100%;
  }
  .aside {
    width: 250px;
    height: inherit;
    @include themify($themes) {
      background-color: themed("menus-background");
    }
  }
  .app-content {
    height: inherit;
    width: calc(100vw - 250px);
    overflow: auto;
  }
}
</style>