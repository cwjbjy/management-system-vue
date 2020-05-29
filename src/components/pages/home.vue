<template>
  <div v-title="title" class="app-root" :class="themeClass">
    <div class="app-container">
      <home-header></home-header>
    </div>
  </div>
</template>

<script>
import API from "../../server/api";
import HomeHeader from "../home/HomeHeader";
export default {
  components: {
    HomeHeader
  },
  computed: {
    themeClass() {
      return `theme-${this.theme}`;
    },
    count() {
      return this.$store.state.count;
    }
  },
  data() {
    return {
      title: "文杰的仓库",
      msg: "Dynamic Themes",
      theme: "blue"
    };
  },

  created() {
    API.getData().then(res => {
      console.log(res.data);
    });
  },
  beforeDestroy(){
    
  },
  methods: {
    a() {
      this.$store.commit("set_count", {
        data: 2
      });
      console.log(this.count);
    }
  }
};
</script>

<style lang="scss">
.app-container {
  cursor: $c_pointer;
  @include themify($themes) {
    color: themed("font-color");
    background-color: themed("header-background");
  }
}

</style>