<template>
  <section>
    <el-card shadow="hover">
      <h4>上传头像功能，上传完可点击首页观看效果</h4>
      <el-upload
        class="avatar-uploader"
        :action="getUrl"
        :on-success="onSuccess"
        :show-file-list="false"
        :data="user"
        :headers="headers"
        :before-upload="beforeAvatarUpload"
        :on-change="onChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="加载失败"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
    </el-card>
  </section>
</template>

<script>
import API from "@/services/api";
import { getURL } from "@/mixin";
export default {
  name: "fileUp",
  data() {
    return {
      imageUrl: "",
      user: {
        user_name: ""
      },
      headers: {
        Authorization: ""
      }
    };
  },
  computed: {
    getUrl() {
      const env = process.env.NODE_ENV;
      let baseURL = "";
      switch (env) {
        case "development":
          baseURL = "//127.0.0.1:9000/api/uploadImage";
          break;
        case "production":
          baseURL = "https://wen.cwjbjy.online/api/uploadImage";
          break;
      }
      return baseURL;
    }
  },
  mixins: [getURL],
  created() {
    let token = Vue.$cookies.get("token");
    this.headers.Authorization = token;
    this.user.user_name = localStorage.getItem("user_name");
    this.getImage();
  },
  methods: {
    onSuccess(response, file) {
      this.$message.success(response.message);
      this.getImage();
      //更换头部图片
      window.eventBus.$emit('update:img')
    },
    getImage() {
      let params = {
        user_name: this.user.user_name
      };
      API.getImage(params).then(res => {
        let fileName = res.data.Data[0].photo;
        this.imageUrl = `${this.baseURL}${fileName}`;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>

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

