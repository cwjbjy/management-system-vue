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
  data() {
    return {
      defaultActive: "/firstItem",
      isCollapse: false,
      menus: [
        {
          name: "首页",
          path: "/firstItem",
          icon: require("@/assets/images/menus/home.png")
        },
        {
          name: "航线",
          path: "/fleet",
          icon: require("@/assets/images/menus/echarts_heatmap.png")
        },
        {
          name: "echarts图表",
          path: "/baseEcharts",
          icon: require("@/assets/images/menus/echarts.png"),
        },
        {
          name: "基础表格",
          path: "/baseTable",
          icon: require("@/assets/images/menus/echarts.png"),
        },
        {
          name: "流程图",
          icon: require("@/assets/images/menus/flowChart.png"),
          children: [
            {
              name: "一般流程图",
              path: "/commonChart"
            },
            {
              name: "定位流程图",
              path: "/positionChart"
            },
            {
              name: "折叠流程图",
              path: "/foldChart"
            }
          ]
        },
        {
          name: "放大镜",
          icon: require("@/assets/images/menus/magnifying.png"),
          path:'/magnifying'
        },
        {
          name:'文件上传',
           icon: require("@/assets/images/menus/magnifying.png"),
          path:'/fileUp'
        },
        {
          name:"文档预览",
          icon: require("@/assets/images/menus/pdf.png"),
          path:'/pdf'
        },
        {
          name:"后台管理",
          icon:require("@/assets/images/menus/manage.png"),
          path:'/manage'
        }
      ]
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