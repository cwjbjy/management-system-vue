<template>
  <div>
    <el-form :model="form">
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.date"
          :picker-options="pickerOptions"
          placeholder
          type="date"
          @change="dateChange"
          value-format="yyy-MM-dd"
          :clearable="false"
          :editable="false"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        //使用箭头函数，否则this指向会出问题
        cellClassName: time => {
            if(this.historyMarks.includes(this.getLocalTime(time.getTime()))){
                return 'mark'
            }
        }
      },
      form: {
        date: ""
      },
      historyMarks:[]
    };
  },
  methods:{
      //处理日历中的时间戳
      getLocalTime(val){
          let date = new Date(val);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          month = month < 10 ? '0' + month : month;
          day = day < 10 ? '0' + day : day;
          date = year + '-' + month + '-' + day;
          return date
      },
      dateChange(){

      }
  },
  created(){
      //获取到后台数据
      this.historyMarks = ['2019-06-10','2019-06-21','2019-06-28' ] 
  }
};
</script>

<style scoped lang="scss">
.mark{
    background: crimson;
    border-radius: 50%;
    > div{
        > span{
            color:#fff;
        }
    }
}
</style>