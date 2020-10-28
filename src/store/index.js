
Vue.use(Vuex)

import state from './State.js'
import mutations from './Mutations.js'
import actions from './Actions.js'
import getters from './Getters'

import themeColor from './themeColor'

Vue.config.devtools = true
const store = new Vuex.Store(
{
    state,
    mutations,
    actions,
    getters,
    modules:{
        themeColor
    }
}
)
export default store;