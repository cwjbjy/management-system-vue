<template>
  <div class="login" v-title="title">
    <div id="stars" style="position: absolute"></div>
    <div id="stars2" style="position: absolute"></div>
    <div id="stars3" style="position: absolute"></div>
    <div class="login_top">
      <span class="login_title">PC端管理系统</span>
    </div>
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
            <div class="icon" @click="thirdLogin">
              <img src="@/assets/images/login/QQ.png" />
            </div>
            <div class="icon" @click="thirdLogin">
              <img src="@/assets/images/login/wb.png" />
            </div>
            <div class="icon" @click="thirdLogin">
              <img src="@/assets/images/login/wx.png" />
            </div>
          </div>
        </div>
        <div v-show="!flag">
          <el-form :model="reg" :rules="rules_reg" ref="reg" class="demo-ruleForm">
            <el-form-item prop="reg_name">
              <el-input prefix-icon="el-icon-user" v-model="reg.reg_name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="rge_pass">
              <el-input
                prefix-icon="el-icon-lock"
                v-model="reg.rge_pass"
                placeholder="请输入8-16位由数字与字母组成的密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="rge_passAgain">
              <el-input
                prefix-icon="el-icon-lock"
                v-model="reg.rge_passAgain"
                placeholder="请再次输入密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="verification_class">
            <el-input v-model="authCode" placeholder="请输入验证码"></el-input>
            <div id="v_container" style="width: 200px;height: 50px;"></div>
          </div>
          <el-button type="primary" style="width:100%" @click="register">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api";
import rules from "@/js/rules";
import comfun from "@/js/comFunc";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!rules.isValidPass(value)) {
        callback(new Error("请输入8-16位由数字与字母组成的密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.reg.rge_pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      title: "登陆",
      flag: true,
      status: false,
      verifyCode: null,
      authCode: "",
      ruleForm: {
        name: "cwj18351071268",
        pass: "cwj18351071268"
      },
      reg: {
        reg_name: "",
        verification: "",
        rge_pass: "",
        rge_passAgain: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rules_reg: {
        reg_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        rge_pass: [{ validator: validatePass, trigger: "blur" }],
        rge_passAgain: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    tabActive() {
      this.flag = !this.flag;
    },
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.status = true;
          let fd = new FormData();
          fd.append("userName",this.ruleForm.name);
          fd.append("passWord",this.ruleForm.pass);
          API.login(fd)
            .then(res => {
              this.$cookies.set("token", res.data.value);
              this.$router.push("/home");
            })
            .catch(err => {
              if (err.response.status === 400) {
                this.$message.error("密码错误");
              } else if (err.response.status === 401) {
                this.$message.error("用户名错误");
              }
            });
          this.status = false;
        } else {
          this.$message.error("请检查输入内容");
        }
      });
    },
    register() {
      this.$refs.reg.validate(valid => {
        if (valid) {
          var res = this.verifyCode.validate(this.authCode);
          if (res) {
            let params = {
              userName: this.reg.reg_name,
              passWord: this.reg.rge_pass,
              authority: "2",
              createTime:comfun.getTime()
            };
            API.register(params)
              .then(res => {
                this.$message.success(res.data.message);
                this.flag = true;
                this.ruleForm.name = "";
                this.ruleForm.pass = "";
              })
              .catch(err => {
                if (err.response.status === 403) {
                  this.$message.error("用户名已存在，请重新选择用户名");
                }
              });
          } else {
            this.$message.error("验证码错误");
          }
        } else {
          this.$message.error("请检查输入内容");
        }
      });
    },
    thirdLogin() {
      this.$message.warning("功能未开发，请使用用户注册");
    },
    alert(text) {
      console.log(text);
    }
  },
  mounted() {
    this.verifyCode = new GVerify("v_container");
    //数组去重，Set数据是用来去重的，map数据是键值对
    // let a = [1,2,4,3,3,3]
    // let b = [...new Set(a)]
    // console.log(b)
  },
  created(){
   
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/starrun.css";
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
}
</style>

<style lang="scss">
.verification_class {
  // @extend %center;
  display: flex;
  .el-input__inner {
    width: 200px;
  }
}
</style>