const actions = {
    setCount({commit},payload){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          commit('set_count',payload);
          resolve();
        },1000)
      })
    }
}

export default actions