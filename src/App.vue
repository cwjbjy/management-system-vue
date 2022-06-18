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
import { trackUser } from './api/role';
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
  data() {
    return {
      myInterval: null,
    };
  },
  methods: {
    //监听全局点击事件
    handleGlobalClick(e) {
      const data = {
        type: 'click',
        url: e.target.formAction,
        target: e.target.outerText,
      };
      this.$store.commit('batch/ADD_BATCH', { data: data });
    },
  },
  mounted() {
    this.myInterval = window.setInterval(() => {
      trackUser(this.$store.state.batch);
      //上报后清空
      this.$store.commit('batch/CLEAR_BATCH');
    }, 300000);
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
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
