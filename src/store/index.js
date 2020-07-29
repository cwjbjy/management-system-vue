
Vue.use(Vuex)

import state from './State.js'
import mutations from './Mutation.js'
import actions from './Action.js'
import getters from './Getter'

const store = new Vuex.Store(
{
    state,
    mutations,
    actions,
    getters
}
)
export default store;