<template>
  <el-card shadow="hover" class="user">
    <el-row class="user-top">
      <el-col :span="12">
        <img :src="imageUrl" class="user-img" alt="加载失败" />
      </el-col>
      <el-col :span="12" class="user-area">
        <div class="user-name">{{ user_name }}</div>
      </el-col>
    </el-row>
    <el-row class="user-bottom">
      <div class="user-info-list">
        <span>注册时间：</span>
        <span>{{ registerTime | register }}</span>
      </div>
      <div class="user-info-list">
        <span>权限等级：</span>
        <span>{{ role }}</span>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import { vuexApp } from '@/mixin';
import { getUser } from '@/api/user';
export default {
  mixins: [vuexApp],
  data() {
    return {
      registerTime: '',
    };
  },
  computed: {
    role() {
      return this.user_name == '一叶扁舟' ? '管理员' : '普通用户';
    },
  },
  created() {
    this.getRegisterTime();
  },
  methods: {
    getRegisterTime() {
      let params = {
        user_name: this.user_name,
      };
      getUser(params).then((res) => {
        this.registerTime = res.data.Data[0].createTime;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  height: 252px;
  display: block;
  margin: 0 10px 20px 10px;
  &-top {
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    @include themify($themes) {
      border-bottom: 2px solid themed('card-border');
    }
    .user-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
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
        color: themed('card-font');
      }
      @extend %space_between;
    }
  }
}
</style>
