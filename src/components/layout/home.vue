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
          <el-backtop target=".app-content" :bottom="100">
            <!-- <div
              style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        font-size: 14px;
      }"
            >顶部</div> -->
          </el-backtop>
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
    API.getData().then((res) => {
      console.log('res',res)
    });
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
    height: inherit;
    @include themify($themes) {
      background-color: themed("menus-background");
    }
  }
  .app-content {
    height: calc(100vh - 70px);
    width: 100%;
    overflow: auto;
  }
}
</style>