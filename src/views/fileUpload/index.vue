<template>
  <section>
    <el-card shadow="hover">
      <strong>上传头像功能，上传完可点击首页观看效果</strong>
      <el-upload
        name="file"
        class="avatar-uploader frontArea"
        :action="getUrl"
        :on-success="onSuccess"
        :show-file-list="false"
        :data="user"
        :headers="headers"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="加载失败" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
    </el-card>
  </section>
</template>

<script>
import { bus } from '@/constants';
import { vuexApp } from '@/mixin';
import { uploadURL, getURL } from '@/mixin/url';
export default {
  name: 'FileUp',
  data() {
    return {
      headers: {
        authorization: '',
      },
      user: {
        user_name: '',
      },
    };
  },
  mixins: [uploadURL, getURL, vuexApp],
  created() {
    this.headers.authorization = 'Bearer ' + localStorage.getItem('token');
    this.user.userName = this.user_name;
  },
  methods: {
    onSuccess(response) {
      this.$message.success(response.msg);
      //更换头部图片
      window.eventBus.$emit(bus.updateImg);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style>
.frontArea {
  margin-top: 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
