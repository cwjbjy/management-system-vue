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
import API from "@/service/axios/api";
import HomeHeader from "@/components/Layout/TheHeader";
import siderBar from "@/components/Layout/TheSiderBar";
import Tags from "@/components/Layout/TheTags";
export default {
  name: "home",
  components: {
    HomeHeader,
    siderBar,
    Tags,
  },
  data() {
    return {
      title: "文杰的仓库",
      msg: "Dynamic Themes",
      theme: "gray",
      keepList: [],
      exList: ["HomePage","fleetLine","BaseEcharts"],
    };
  },
  computed: {
    themeClass() {
      return `theme-${this.theme}`;
    },
  },
  methods: {
    colorChange(val) {
      this.theme = val;
    },
    tagChange(val) {
      this.keepList = [];
      val.forEach((element) => {
        this.keepList.push(element.name);
      });
    },
  },
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
/* element-ui样式修改 */
.el-card {
  @include themify($themes) {
    background-color: themed("card-background");
    color: themed("card-font");
    border: 1px solid themed("card-border");
  }
}
.el-card__header {
  @include themify($themes) {
    border-bottom: 1px solid themed("card-border");
  }
}
.el-progress__text {
  @include themify($themes) {
    color: themed("card-font");
  }
}
.el-button--primary {
  @include themify($themes) {
    background-color: themed("primary-button");
    border: 1px solid themed("card-border");
    color: themed("font-color");
  }
}
.el-input__inner {
  @include themify($themes) {
    background-color: themed("card-background");
    border: 1px solid themed("card-border");
    color: themed("card-font");
  }
}

.el-table th,
.el-table tr {
  @include themify($themes) {
    background-color: themed("card-background");
  }
}
.el-table td,
.el-table th.is-leaf {
  @include themify($themes) {
    border-bottom: 1px solid themed("card-border");
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  @include themify($themes) {
    background-color: themed("main-background");
  }
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  @include themify($themes) {
    background-color: themed("card-border");
  }
}
.el-table thead.is-group th {
  @include themify($themes) {
    background-color: themed("table-th");
  }
}
.el-table--border,
.el-table--group {
  @include themify($themes) {
    border: 1px solid themed("card-border");
  }
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  @include themify($themes) {
    border: 1px solid themed("card-border");
  }
}
.el-table--border th,
.el-table__fixed-right-patch {
  @include themify($themes) {
    border-bottom: 1px solid themed("card-border");
  }
}
.el-table thead {
  @include themify($themes) {
    color: themed("card-font");
  }
}
.el-table {
  @include themify($themes) {
    color: themed("card-font");
  }
}
</style>