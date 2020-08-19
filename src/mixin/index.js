import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters
} from 'vuex'
const vuexRoot = {
    computed: {
        /*将this.userName映射为this.$store.state.userName*/
        ...mapState([
            'count',
            'userName',
            'todoList',
            'imageUrl'
        ]),
        /* 把 this.user_name 映射为
         this.$store.getters.user_name*/
        ...mapGetters([
            'user_name',
            // ...
        ]),
    },
    methods: {
        /*将this.set_userName({data:value}) 映射为 
        this.$store.commit('set_userName',{data:value})*/
        ...mapMutations([
            'set_userName',
            'set_imageUrl',
            'set_todoList'
        ]),
        /*将this.setCount(amount) 映射为
         this.$store.dispatch('setCount',amount)*/
        ...mapActions([
            'setCount',
        ]),
    }
}

const vuexThemeColor = {
    computed: {
        /* 把 `this.echartFontColor` 映射为 
        `this.$store.state.themeColor.echartFontColor`*/
        ...mapState('themeColor', [
            'echartColor',
            'fleetBg',
            'themes'
        ])
    },
    methods: {
        /*将this.set_echartColor({data:value}) 映射为 
        this.$store.commit('themeColor/set_echartColor',{data:value})*/
        ...mapMutations('themeColor', [
            'set_echartColor',
            'set_fleetBg',
        ]),
    },
}

const getURL = {
    computed: {
        baseURL() {
          return process.env.VUE_APP_IMAGE;
        }
    }
}

const uploadURL = {
    computed: {
        getUrl() {
            return process.env.VUE_APP_UPLOADIMAGE;
        }
    },
}

export {
    vuexRoot,
    vuexThemeColor,
    getURL,
    uploadURL
}