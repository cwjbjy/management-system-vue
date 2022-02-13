import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export const vuexApp = {
  computed: {
    /*将this.userName映射为this.$store.state.userName*/
    ...mapState('app', ['count', 'userName', 'todoList', 'imageUrl']),
    /* 把 this.user_name 映射为 this.$store.getters.user_name*/
    ...mapGetters('app', ['user_name']),
  },
  methods: {
    /*将this.SET_USERNAME({data:value}) 映射为 
        this.$store.commit('SET_USERNAME',{data:value})*/
    ...mapMutations('app', ['SET_USERNAME', 'SET_IMAGEURL', 'SET_TODO']),
    /*将this.setCount(amount) 映射为
         this.$store.dispatch('setCount',amount)*/
    ...mapActions('app', ['setCount']),
  },
};

export const vuexTheme = {
  computed: {
    ...mapState('themeColor', ['echartColor', 'fleetBg', 'theme']),
  },
  methods: {
    ...mapMutations('themeColor', ['SET_COLOR', 'SET_FLEET', 'SET_THEME']),
  },
};
