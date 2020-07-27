<template>
  <div v-title="title" :class="themeClass">
    <div class="app-container">
      <header>
        <home-header @update:color-change="colorChange"></home-header>
      </header>
      <main class="app-main">
        <aside>
          <sider-bar />
        </aside>
        <article class="app-content">
          <tags @update:change="tagChange"></tags>
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepList" :exclude="exList" :max="8">
              <router-view />
            </keep-alive>
          </transition>
          <el-backtop target=".app-content" :bottom="100"></el-backtop>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import API from "@/services/api";
import HomeHeader from "@/components/Layout/TheHeader";
import siderBar from "@/components/Layout/TheSiderBar";
import Tags from "@/components/Layout/TheTags";
export default {
  name: "home",
  components: {
    HomeHeader,
    siderBar,
    Tags
  },
  data() {
    return {
      title: "文杰的仓库",
      msg: "Dynamic Themes",
      theme: "gray",
      keepList: [],
      exList:["fleetLine"]
    };
  },
  computed: {
    themeClass() {
      return `theme-${this.theme}`;
    }
  },
  methods: {
    colorChange(val){
      this.theme = val;
    },
    tagChange(val) {
      this.keepList = [];
      val.forEach(element => {
        this.keepList.push(element.name);
      });
    },
  }
};
</script>

<style lang="scss">
.app-container {
  @include themify($themes) {
    color: themed("font-color");
    background-color: themed("main-background");
  }
  header {
    @include themify($themes) {
      background-color: themed("header-background");
    }
    height: 70px;
    width: 100%;
  }
  .app-main {
    display: flex;
    height: calc(100vh - 70px);
  }
  .el-menu {
    border: none;
  }
  aside {
    height: inherit;
    @include themify($themes) {
      background-color: themed("aside-background");
    }
  }
  .app-content {
    height: inherit;
    width: 100%;
    overflow: auto;
  }
  .pointer {
    cursor: $c_pointer;
  }
}
</style>