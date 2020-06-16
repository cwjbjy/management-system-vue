<template>
  <div class="login" v-title="title">
    <div id="stars" style="position: absolute"></div>
    <div id="stars2" style="position: absolute"></div>
    <div id="stars3" style="position: absolute"></div>
    <div class="login_top">
      <span class="login_title">PC端管理系统</span>
    </div>
    <!-- <button @click="aa">点击</button> -->
    <div class="login_main">
      <div class="login_form">
        <div class="tab">
          <div :class="[flag === true?'title_active':'','tab_title']" @click="tabActive">用户登录</div>
          <div :class="[flag === false?'title_active':'','tab_title']" @click="tabActive">用户注册</div>
        </div>
        <div v-show="flag">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input prefix-icon="el-icon-user" v-model="ruleForm.name" placeholder="请输入用户名/手机号"></el-input>
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
              <el-button type="primary" style="width:100%" @click="login" :loading="status">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="forget_pass">
            <span>忘记密码</span>
          </div>
          <div class="other-acc-hd">
            <h3>第三方账号登录</h3>
          </div>
          <div class="img_list">
            <div>
              <img src="../../assets/images/login/QQ.png" />
            </div>
            <div>
              <img src="../../assets/images/login/wb.png" />
            </div>
            <div>
              <img src="../../assets/images/login/wx.png" />
            </div>
          </div>
        </div>
        <div v-show="!flag">
          <el-form :model="reg" :rules="rules_reg" ref="reg" class="demo-ruleForm">
            <el-form-item prop="reg_name">
              <el-input prefix-icon="el-icon-phone" v-model="reg.reg_name" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="rge_pass">
              <el-input
                prefix-icon="el-icon-lock"
                v-model="reg.rge_pass"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
           <Verify @success="alert('success')" @error="alert('error')" :type="1" fontSize="20px" height="40px" width="55%"></Verify>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from "vue2-verify";
export default {
  components: {
    Verify
  },
  data() {
    return {
      title: "登陆",
      flag: true,
      status: false,
      ruleForm: {
        name: "18351071268",
        pass: "18351071268"
      },
      reg: {
        reg_name: "",
        verification: "",
        rge_pass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rules_reg: {
        reg_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        rge_pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    tabActive() {
      this.flag = !this.flag;
    },
    login() {
      this.status = true;
      this.$cookies.set("username", "cwj");
      this.$cookies.set("token", "qwqwswd");
      this.$router.push("/home");
      this.status = false;
    },
    alert(text) {
      console.log(text);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "../../assets/css/starrun.css";
// @import "../../assets/scss";
.login {
  height: 100vh;
  color: $color-font;
  background: radial-gradient(
    220% 105% at top center,
    #70a1ff 10%,
    #1e90ff 40%,
    #5352ed 65%,
    #3742fa
  );
  &_top {
    width: 100%;
    height: 20vh;
    @extend %center;
  }
  &_title {
    font-size: 50px;
    letter-spacing: 5px;
  }
  &_main {
    width: 100%;
    min-height: 450px;
    @extend %center;
  }
  &_form {
    width: 400px;
    min-height: 370px;
    padding: 30px;
    background: #fff;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    .tab {
      width: 190px;
      height: 40px;
      margin: 0 auto;
      display: flex;
      box-sizing: border-box;
    }
    .tab_title {
      display: inline-block;
      flex: 1;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 16px;
      color: #999;
      &:hover {
        color: $color-font_active;
      }
    }
    .title_active {
      color: $color-font_active;
      border-bottom: 2px solid #0078dc;
    }
    .demo-ruleForm {
      margin-top: 30px;
    }
    .forget_pass {
      height: 20px;
      line-height: 20px;
      margin-top: 15px;
      font-size: 14px;
      text-align: end;
    }
    .other-acc-hd {
      width: 65%;
      height: 28px;
      margin: 0 auto 30px auto;
      border-bottom: 1px solid #e6e6e6;
      text-align: center;
      h3 {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        color: #999;
        background: #fff;
      }
    }
    .img_list {
      @extend %space_around;
    }
  }
  .verification_class {
    width: 64%;
    margin-right: 10px;
  }
}
</style>