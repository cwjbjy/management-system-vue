const actions = {
    setCount({commit},payload){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          commit('set_count',payload);
          resolve();
        },1000)
      })
    },
    
    /* 可在actions中调用HTTP请求，并将数据存储到状态树中 */
    async GET_STARS({ commit }) {
      const { data } = await axios.get('http://my-api/stars')
      commit('SET_STARS', data)
    }
}

export default actions