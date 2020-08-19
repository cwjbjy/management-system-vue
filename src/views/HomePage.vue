<template>
  <section class="firstItem">
    <el-row>
      <el-col :span="8" :lg="8" :xl="6">
        <el-card shadow="hover" class="user">
          <el-row class="user-top">
            <el-col :span="12">
              <img :src="imageUrl" class="user-img" alt="加载失败" />
            </el-col>
            <el-col :span="12" class="user-area">
              <div class="user-name">{{user_name}}</div>
            </el-col>
          </el-row>
          <el-row class="user-bottom">
            <div class="user-info-list">
              <span>注册时间：</span>
              <span>{{ registerTime | register }}</span>
            </div>
            <div class="user-info-list">
              <span>权限等级：</span>
              <span>{{role}}</span>
            </div>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="user">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>Vue
          <el-progress :percentage="95" color="#42b983" :format="format"></el-progress>JavaScript
          <el-progress :percentage="85" color="#f1e05a" :format="format"></el-progress>CSS
          <el-progress :percentage="88" :format="format"></el-progress>HTML
          <el-progress :percentage="87" color="#f56c6c" :format="format"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16" :lg="16" :xl="18">
        <el-row class="icon-area" style="margin-bottom: 20px;">
          <el-col :span="8" class="icon-box">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="icon-content">
                <i class="el-icon-s-custom grid-con-icon grid-con-1"></i>
                <div class="icon-info">
                  <div class="grid-num number1">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" class="icon-box">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="icon-content">
                <i class="el-icon-message-solid grid-con-icon grid-con-2"></i>
                <div class="icon-info">
                  <div class="grid-num number1">234</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" class="icon-box">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="icon-content">
                <i class="el-icon-s-order grid-con-icon grid-con-3"></i>
                <div class="icon-info">
                  <div class="grid-num number3">20</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="padding:0 10px;margin-bottom: 20px;">
          <schedule-component/>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <bar-model :model="options"></bar-model>
        </el-card>
      </el-col>
      <el-col :span="12" class="echarts-box">
        <el-card shadow="hover">
          <radar-model :model="options"></radar-model>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import API from "@/service/axios/api";
// import fetchAPI from "@/service/fetch/api"
import barModel from "@/components/EchartsModel/BarLineModel";
import radarModel from "@/components/EchartsModel/RadarModel";
import ScheduleComponent from "@/components/TODO/ScheduleComponent"
import { vuexRoot } from "@/mixin";
export default {
  name: "HomePage",
  components: {
    barModel,
    radarModel,
    ScheduleComponent
  },
  data() {
    return {
      registerTime: "",
      options: {},
    };
  },
  computed: {
    role() {
      return this.user_name == "一叶扁舟" ? "管理员" : "普通用户";
    },
  },
  mixins: [vuexRoot],
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      let params = {
        user_name: this.user_name,
      };
      // fetchAPI.getUser(params).then(res=>{
      //   console.log(res)
      // })
      API.getUser(params).then((res) => {
        this.registerTime = res.data.Data[0].createTime;
      });
    },
    format(percentage) {
      if (percentage >= 90) {
        return "精通";
      } else if (percentage >= 80) {
        return "熟练";
      } else if (percentage >= 70) {
        return "一般";
      } else {
        return "了解";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.firstItem {
  padding: 10px 0 0 10px;
  .user {
    height: 252px;
    display: block;
    margin: 0 10px 20px 10px;
    &-top {
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      @include themify($themes) {
        border-bottom: 2px solid themed("card-border");
      }
      .user-img {
        width: 90%;
        height: 90%;
        max-width: 120px;
        max-width: 120px;
        border-radius: 50%;
      }
      .user-area {
        height: 120px;
        @extend %column_center;
      }
      .user-name {
        font-size: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        text-align: center;
      }
    }
    &-bottom {
      .user-info-list {
        font-size: 14px;
        line-height: 25px;
        @include themify($themes) {
          color: themed("card-font");
        }
        @extend %space_between;
      }
    }
  }
  .icon-area {
    height: 100px;
    .icon-box {
      padding-left: 10px;
      padding-right: 10px;
      .icon-content {
        display: flex;
      }
      .icon-info {
        flex: 1;
        text-align: center;
        @extend %column_center;
        .grid-num {
          font-size: 30px;
          font-weight: bold;
        }
        .number1 {
          color: rgb(45, 140, 240);
        }
        .number2 {
          color: rgb(100, 213, 114);
        }
        .number3 {
          color: rgb(242, 94, 67);
        }
      }
    }
    .grid-con-icon {
      font-size: 50px;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #fff;
    }
    .grid-con-1 {
      background: rgb(45, 140, 240);
    }
    .grid-con-2 {
      background: rgb(100, 213, 114);
    }
    .grid-con-3 {
      background: rgb(242, 94, 67);
    }
  }
  .echarts-box {
    padding: 0 10px;
  }
}
</style>

<style lang="scss">
</style>