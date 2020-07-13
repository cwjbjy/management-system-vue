<template>
  <div class="sideBar">
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
      unique-opened
      router
    >
      <template v-for="item in newMenus">
        <el-submenu :index="item.name" :key="item.name" v-if="item.children">
          <template slot="title">
            <img :src="item.icon" class="icon" />
            <span slot="title">{{ item.name }}</span>
          </template>
          <template v-for="item1 in item.children">
            <el-submenu v-if="item1.children" :key="item1.name" :index="item1.name">
              <template slot="title">
                <span slot="title">{{ item1.name }}</span>
              </template>
              <el-menu-item
                :index="item2.path"
                :key="item2.name"
                v-for="item2 in item1.children"
              >{{item2.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item1.path" :key="item1.path">{{item1.name}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.path" :key="item.name" v-else>
          <img :src="item.icon" class="icon" />
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menus",
  coumpted: {},
  data() {
    return {
      defaultActive: "/firstItem",
      isCollapse: false,
      menus: [
        {
          name: "首页",
          path: "/firstItem",
          key: "firstItem",
          icon: require("@/assets/images/menus/home.png")
        },
        {
          name: "航线",
          path: "/fleet",
          key: "fleet",
          icon: require("@/assets/images/menus/echarts_heatmap.png")
        },
        {
          name: "图片上传",
          path: "/fileUp",
          key: "fileUp",
          icon: require("@/assets/images/menus/upload.png")
        },
        {
          name: "文件预览",
          path: "/pdf",
          key: "pdf",
          icon: require("@/assets/images/menus/pdf.png")
        },
        {
          name: "echarts图表",
          path: "/baseEcharts",
          key: "baseEcharts",
          icon: require("@/assets/images/menus/echarts.png")
        },
        {
          name: "基础表格",
          path: "/baseTable",
          key: "baseTable",
          icon: require("@/assets/images/menus/baseTable.png")
        },
        {
          name: "流程图",
          key: "flowChart",
          icon: require("@/assets/images/menus/flowChart.png"),
          children: [
            {
              name: "一般流程图",
              path: "/commonChart",
              key: "commonChart"
            },
            {
              name: "定位流程图",
              path: "/positionChart",
              key: "positionChart"
            },
            {
              name: "折叠流程图",
              path: "/foldChart",
              key: "foldChart"
            }
          ]
        },
        {
          name: "放大镜",
          path: "/magnifying",
          key: "magnifying",
          icon: require("@/assets/images/menus/magnifying.png")
        },
        {
          name: "拖拽组件",
          key: "drag",
          icon: require("@/assets/images/menus/drag.png"),
          children: [
            {
              name: "拖拽列表",
              path: "/dragList",
              key: "dragList"
            },
            {
              name: "拖拽弹框",
              path: "/dragDialog",
              key: "dragDialog"
            }
          ]
        },
        {
          name: "国际化功能",
          icon: require("@/assets/images/menus/I18n.png"),
          path: "/I18n",
          key: "I18n"
        },
        {
          name: "后台管理",
          icon: require("@/assets/images/menus/manage.png"),
          path: "/manage",
          key: "manage"
        }
      ],
      newMenus: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(index) {
      this.defaultActive = index;
    }
  },
  created() {
    let authMenus = this.$cookies.get("authMenus").split(",");
    this.menus.forEach(item => {
      if (item.key && authMenus.includes(item.key)) {
        this.newMenus.push(item);
      }
    });
  },
  mounted() {
    window.eventBus.$on("collapse", value => {
      this.isCollapse = value;
    });
  },
  beforeDestroy() {
    window.eventBus.$off("collapse");
  }
};
</script>

<style scoped lang="scss">
.sideBar {
  height: inherit;
  overflow-y: auto;
  overflow-x: hidden;
}
.sideBar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.icon {
  margin-right: 10px;
  width: 18px;
  // text-align: center;
  height: 18px;
  // vertical-align: middle;
}
</style>