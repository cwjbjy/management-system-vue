<template>
  <section class="firstItem">
     <el-row>
      <el-col :span="8">
        <el-card shadow="hover" class="user">
          <el-row class="user-top">
            <el-col :span="12">
              <img :src="imageUrl" class="user-img" alt="加载失败"/>
            </el-col>
            <el-col :span="12" class="user-area">
              <div class="user-name">{{userName}}</div>
              <div class="user-info">{{role}}</div>
            </el-col>
          </el-row>
          <el-row class="user-bottom">
            <div class="user-info-list">
              <span>上次登录时间：</span>
              <span>{{1595658500|formDate}}</span>
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
            <div slot="header">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
            <el-table :show-header="false" :data="todoList" style="width:100%;" ref="table">
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
  </section>
</template>

<script>
import API from "@/services/api";
import barModel from "@/components/echartsModel/barLineModel";
import radarModel from "@/components/echartsModel/radarModel";
import { getURL } from "@/mixin";
export default {
  name: "firstItem",
  components: {
    barModel,
    radarModel
  },
  data() {
    return {
      user_name: "",
      imageUrl: "",
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
  computed: {
    userName() {
      return this.user_name == "cwj18351071268" ? "admin" : "consumer";
    },
    role() {
      return this.userName == "admin" ? "超级管理员" : "普通用户";
    }
  },
  mixins: [getURL],
  created() {
    this.user_name = localStorage.getItem("user_name");
    this.getImage();
    //解决IE浏览器渲染过慢，表格宽度出现BUG（DOM树生成的太慢，element的js已经开始计算）
    this.$nextTick(()=>{
      this.$refs.table.doLayout()
    })
  },
  activated() {
    this.getImage();
  },
  methods: {
    getImage() {
      let params = {
        user_name: this.user_name
      };
      API.getImage(params).then(res => {
        let fileName = res.data.Data[0].photo;
        this.imageUrl = `${this.baseURL}${fileName}`;
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
    }
  }
};
</script>

<style scoped lang="scss">
.firstItem {
  padding: 10px 0 0 10px;
  .user {
    height: 252px;
    // width: 340px;
    display: block;
    margin: 0 10px 20px 10px;
    &-top {
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
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
      }
      .user-info {
        font-size: 14px;
        @include themify($themes) {
          color: themed("card-font");
        }
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
  .todo-item {
    font-size: 14px;
  }
  .todo-item-del {
    text-decoration: line-through;
    @include themify($themes) {
      color: themed("card-font");
    }
  }
  .echarts-box {
    padding: 0 10px;
  }
}
</style>

<style lang="scss">
</style>