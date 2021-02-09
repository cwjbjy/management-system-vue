<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    class="demo-ruleForm"
  >
    <el-form-item prop="name">
      <el-input
        prefix-icon="el-icon-user"
        v-model="ruleForm.name"
        placeholder="请输入用户名/手机号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="pass">
      <el-input
        prefix-icon="el-icon-lock"
        v-model="ruleForm.pass"
        placeholder="请输入密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label>
      <el-button type="primary" style="width: 100%" @click="login"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import API from "@/service/axios/api";
import { route_admin, route_user } from "@/router/routes";
export default {
  data() {
    return {
      moreClick: false, //防止重复点击
      ruleForm: {
        name: "一叶扁舟",
        pass: "123456zx",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.moreClick) return;
          this.moreClick = true;
          let fd = new FormData();
          fd.append("userName", this.ruleForm.name);
          fd.append("passWord", this.ruleForm.pass);
          API.login(fd)
            .then((res) => {
              if (this.ruleForm.name === "一叶扁舟") {
                this.$router.addRoutes(route_admin);
              } else {
                this.$router.addRoutes(route_user);
              }
              this.$cookies.set("authMenus", res.data.auth);
              this.$cookies.set("token", res.data.value);
              localStorage.setItem("user_name", this.ruleForm.name);
              this.$router.push("/firstItem");
            })
            .catch((err) => {
              this.moreClick = false;
              if (err.response.status === 400) {
                this.$message.error("密码错误");
              } else if (err.response.status === 401) {
                this.$message.error("用户名错误");
              }
            });
        } else {
          this.$message.error("请检查输入内容");
        }
      });
    },
    onRegister(name, pass) {
      this.ruleForm.name = name;
      this.ruleForm.pass = pass;
    },
  },
};
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
}
</style>