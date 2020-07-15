<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { route_admin, route_user } from "@/router/routes";
export default {
  name: "App",
  computed: {
    userName() {
      return this.$store.state.user_name;
    }
  },
  created() {
    if (this.userName == "" && this.$route.path !== '/login' && this.$route.path !== '/') {
      let user_name = localStorage.getItem("user_name");
      if (user_name === "cwj18351071268") {
        this.$router.addRoutes(route_admin);
      } else{
        this.$router.addRoutes(route_user);
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

a {
    text-decoration: none;
}

ul {
  margin: 0;
  padding: 0;
}
section{
  padding: 10px;
}
</style>
