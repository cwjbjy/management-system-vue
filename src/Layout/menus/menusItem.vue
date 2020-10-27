<template function>
  <div>
    <template v-for="item in list">
      <el-submenu :index="item.name" :key="item.name" v-if="item.children">
        <template slot="title">
          <img v-if="item.icon" :src="item.icon" class="icon" alt="加载失败" />
          <span slot="title">{{ item.name }}</span>
        </template>
         <menus-item :list="item.children"></menus-item>
      </el-submenu>
      <el-menu-item :index="item.path" :key="item.name" v-else>
        <img v-if="item.icon" :src="item.icon" class="icon" alt="加载失败" />
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
    name:'menusItem',
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
}
</script>

<style scoped>
.icon {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
</style>