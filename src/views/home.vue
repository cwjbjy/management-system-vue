<template>
  <div v-title="title" class="app-root" :class="themeClass">
    <div class="app-container">
      <header class="header">
        <home-header></home-header>
      </header>
      <div class="app-main">
        <aside class="aside">
          <sider-bar />
        </aside>
        <section class="app-content">
          <tags @update:change="tagChange"></tags>
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepList" :max="8">
              <router-view />
            </keep-alive>
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
            >顶部</div>-->
          </el-backtop>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api";
import HomeHeader from "@/components/layout/HomeHeader";
import siderBar from "@/components/layout/siderBar";
import Tags from "@/components/layout/Tags"
export default {
  components: {
    HomeHeader,
    siderBar,
    Tags
  },
  computed: {
    themeClass() {
      return `theme-${this.theme}`;
    }
  },
  data() {
    return {
      title: "文杰的仓库",
      msg: "Dynamic Themes",
      theme: "blue",
      keepList: []
    };
  },
  beforeDestroy() {},
  methods: {
    tagChange(val){
      this.keepList = [];
      val.forEach(element => {
        this.keepList.push(element.name);
      });
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