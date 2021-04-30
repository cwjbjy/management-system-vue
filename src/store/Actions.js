const actions = {
    setCount({commit},payload){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          commit('SET_COUNT',payload);
          resolve();
        },1000)
      })
    },
}

export default actions