<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { route_admin, route_user } from '@/router/routes';
import { vuexApp } from '@/mixin';
export default {
  name: 'App',
  mixins: [vuexApp],
  watch: {
    user_name: {
      handler(newVal) {
        if (newVal === '一叶扁舟') {
          this.$router.addRoutes(route_admin);
        } else {
          this.$router.addRoutes(route_user);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  min-width: 956px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
