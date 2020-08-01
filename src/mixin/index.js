import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters 
} from 'vuex'
export const vuexConfig = {
    computed: {
        /*将this.userName映射为this.$store.state.userName*/
        ...mapState([
            'count',
            'userName',
            'todoList',
            'echartColor',
            'fleetBg',
            'imageUrl'
        ]),
        /* 把 `this.user_name` 映射为 `this.$store.getters.user_name`*/
        ...mapGetters([
            'user_name',
            // ...
          ])
    },
    methods: {
        /*将this.set_userName({data:value}) 映射为 
        this.$store.commit('set_userName',{data:value})*/
        ...mapMutations([
            'set_userName',
            'set_echartColor',
            'set_fleetBg',
            'set_imageUrl',
            'set_todoList'
        ]),
        /*将this.setCount(amount) 映射为
         this.$store.dispatch('setCount',amount)*/
        ...mapActions([
            'setCount',
        ])
    }
}

export const getURL = {
    computed: {
        baseURL() {
            const env = process.env.NODE_ENV;
            let url = "";
            switch (env) {
                case "development":
                    url = "//127.0.0.1:9000/images/";
                    break;
                case "production":
                    url = "https://wen.cwjbjy.online/images/";
                    break;
                default:
                    break;
            }
            return url;
        }
    }
}