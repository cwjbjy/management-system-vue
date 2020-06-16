<template>
  <div class="home">
    <el-row>
      <el-col :span="8" class="home-area1">
        <el-card shadow="hover" class="user">
          <el-row class="user-area1">
            <el-col :span="12">
              <img src="../../assets/images/home/user.jpg" class="user-img" />
            </el-col>
            <el-col :span="12" class="user-area">
              <div class="user-name">{{userName}}</div>
              <div class="user-info">{{role}}</div>
            </el-col>
          </el-row>
          <el-row class="user-area2">
            <div class="user-info-list">
              <span>上次登录时间：</span>
              <span>2020-6-16</span>
            </div>
            <div class="user-info-list">
              <span>上次登录地点：</span>
              <span>上海</span>
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
      <el-col :span="16">
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
          <el-card shadow="hover" style="height:406px;">
            <div slot="header" class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
            <el-table :show-header="false" :data="todoList" style="width:100%;">
              <el-table-column width="40">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.status"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div
                    class="todo-item"
                    :class="{'todo-item-del': scope.row.status}"
                  >{{scope.row.title}}</div>
                </template>
              </el-table-column>
              <el-table-column width="60">
                <template>
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
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
  </div>
</template>

<script>
import barModel from "../echarts/barModel";
import radarModel from "../echarts/radarModel"
// import moveDiv from "../echarts/moveDiv";
export default {
  name: "HomePage",
  components: {
    barModel,
    radarModel
    // moveDiv,
  },
  computed: {
    role() {
      return this.userName == "admin" ? "超级管理员" : "普通用户";
    }
  },
  data() {
    return {
      userName: "admin",
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ],
      options: {}
    };
  },
  methods: {
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
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: calc(100vh - 70px - 20px);
  padding: 10px 0 0 10px;
  .home-area1 {
    padding: 0 10px;
  }
  .user {
    height: 252px;
    min-width: 344px;
    display: block;
    margin-bottom: 20px;
    &-area1 {
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
      .user-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      .user-area {
        height: 120px;
        display: flex;
        @extend %column_center;
      }
      .user-name {
        font-size: 30px;
      }
      .user-info {
        font-size: 14px;
        color: #999;
      }
    }
    &-area2 {
      .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
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
        color: #999;
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
  .todo-item {
    font-size: 14px;
  }
  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
  .echarts-box {
    padding: 0 10px;
  }
}
</style>

<style lang="scss">
</style>