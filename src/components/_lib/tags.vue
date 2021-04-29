<template>
  <nav class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li pointer"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <span class="tags-li-title" @click="routerClick(item.path)">{{item.title}}</span>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import {bus} from '@/constants'
export default {
  data() {
    return {
      tagsList: [],
    };
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    },
  },
  created() {
    this.setTags(this.$route);
  },
  methods: {
    isActive(path) {
      return Object.is(path,this.$route.fullPath)
    },
    // 关闭单个标签
    closeTags(index) {
      this.tagsList.splice(index, 1);
      this.$emit("update:change", this.tagsList);
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$emit("update:change", this.tagsList);
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter((item) => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
      this.$emit("update:change", this.tagsList);
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some((item) => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name,
        });
        this.$emit("update:change", this.tagsList);
      }
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },
    routerClick(value) {
      this.$router.push(value);
      window.eventBus.$emit(bus.updateRouter, value);
    },
  },
};
</script>


<style lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  ul {
    height: 30px;
  }
  @include themify($themes) {
    background-color: themed("card-background");
  }
  &-li {
    display: inline-flex;
    margin: 3px 5px;
    border-radius: 3px;
    font-size: 12px;
    height: 23px;
    line-height: 23px;
    padding: 0 12px;
    @include themify($themes) {
      border: 1px solid themed("card-border");
      color: themed("card-font");
    }
  }
  &-li.active {
    @include themify($themes) {
      background: themed("card-background-active");
      border: 1px solid themed("card-border-active");
      color: themed("color-font");
    }
    .tags-li-title {
      @include themify($themes) {
        color: themed("color-font");
      }
    }
  }
  &-li-title {
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    @include themify($themes) {
      color: themed("card-font");
    }
  }
  &-close-box {
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 1px;
  }
}
</style>
