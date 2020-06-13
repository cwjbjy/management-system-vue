<template>
  <div class="fleet">
      <!-- <line-model :model="lineData"></line-model> -->
      <geo></geo>
  </div>
</template>

<script>
import lineModel from "../echarts/line";
import geo from "../echarts/geo"
export default {
  name: "fleet",
  components:{
      lineModel,
      geo
  },
  data() {
    return {
        lineData:{},
        data:[
            {
                name:'张三',
                age:10
            },{
                name:"李四",
                age:24
            }
        ]
    };
  },
  created(){
      console.log('data',this.data)
  },
  methods: {}
};
</script>



<style lang="scss" scoped>
</style>

<style lang="scss">

</style>