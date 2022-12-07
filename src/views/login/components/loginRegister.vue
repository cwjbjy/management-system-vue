<template>
  <div>
    <el-form :model="reg" :rules="rules_reg" ref="reg" class="demo-ruleForm">
      <el-form-item prop="reg_name">
        <el-input prefix-icon="el-icon-user" v-model.trim="reg.reg_name" placeholder="请输入用户名"></el-input>
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
      <el-input v-model="authCode" placeholder="验证码区分大小写"></el-input>
      <div id="v_container" style="width: 200px; height: 50px"></div>
    </div>
    <el-button type="primary" style="width: 100%" @click="handleRegister">注册</el-button>
  </div>
</template>

<script>
import { register } from '@/api/user';
import { getTime } from '@/utils/comFunc';
import rules from '@/utils/rules';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!rules.isValidPass(value)) {
        callback(new Error('请输入8-16位由数字与字母组成的密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.reg.rge_pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      verifyCode: null,
      authCode: '',
      reg: {
        reg_name: '',
        verification: '',
        rge_pass: '',
        rge_passAgain: '',
      },
      rules_reg: {
        reg_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        rge_pass: [{ validator: validatePass, trigger: 'blur' }],
        rge_passAgain: [{ validator: validatePass2, trigger: 'blur' }],
      },
    };
  },
  mounted() {
    this.verifyCode = new window.GVerify('v_container');
  },
  methods: {
    handleRegister() {
      this.$refs.reg.validate((valid) => {
        if (valid) {
          var res = this.verifyCode.validate(this.authCode);
          if (res) {
            let params = {
              userName: this.reg.reg_name,
              passWord: this.reg.rge_pass,
              authority: 2,
              createTime: getTime(),
              photo: 'userlogo.png',
            };
            register(params)
              .then((res) => {
                this.$message.success(res.data.message);
                this.$emit('update:register', {
                  flag: true,
                  name: this.reg.reg_name,
                  pass: this.reg.rge_pass,
                });
              })
              .catch((err) => {
                if (err.response.status === 403) {
                  this.$message.error('用户名已存在，请重新选择用户名');
                }
              });
          } else {
            this.$message.error('验证码错误');
          }
        } else {
          this.$message.error('请检查输入内容');
        }
      });
    },
  },
};
</script>

<style lang="scss">
.verification_class {
  display: flex;
  .el-input__inner {
    width: 200px;
  }
}
</style>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
}
</style>
