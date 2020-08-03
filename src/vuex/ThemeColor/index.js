import state from './store';
import mutations from './mutations'

export default{
    namespaced:true, //模块命名空间
    state,
    mutations
}