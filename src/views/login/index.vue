<template>
  <div class="login" v-title="title">
    <div class="top">
      <span class="title">PC端管理系统(Vue版)</span>
    </div>
    <div class="main">
      <div class="form">
        <div class="tab">
          <div :class="{ tab_active: flag }" class="tab_title" @click="flag = !flag">
            用户登录
          </div>
          <div :class="{ tab_active: !flag }" class="tab_title" @click="flag = !flag">
            用户注册
          </div>
        </div>
        <div v-show="flag">
          <!-- 登录表单 -->
          <login-form ref="loginForm" />
          <!-- 第三方登录 -->
          <other-login />
        </div>
        <div v-show="!flag">
          <!-- 注册组件 -->
          <register @update:register="register" ref="register" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "./components/loginForm";
import otherLogin from "./components/otherLogin";
import register from "./components/register";
export default {
  name: "Login",
  components: {
    loginForm,
    otherLogin,
    register,
  },
  data() {
    return {
      title: "登陆",
      flag: true,
    };
  },
  created() {
    localStorage.removeItem("user_name");
  },
  mounted() {
    let that = this;
    document.addEventListener("keydown", that.keyDown);
  },
  beforeDestroy() {
    let that = this;
    document.removeEventListener("keydown", that.keyDown);
  },
  methods: {
    register(params) {
      let { flag, name, pass } = params;
      this.flag = flag;
      this.$refs.loginForm.onRegister(name, pass);
    },
    keyDown() {
      let key = window.event.keyCode;
      if (key === 13) {
        if (this.flag) {
          this.$refs.loginForm.login();
        } else {
          this.$refs.register.register();
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  color: $color-font;
  background-color: $login_bg;
  .top {
    width: 100%;
    height: 20vh;
    @extend %center;
    .title {
      font-size: 50px;
      letter-spacing: 5px;
    }
  }
  .main {
    width: 100%;
    min-height: 450px;
    @extend %center;
  }
  .form {
    width: 400px;
    min-height: 370px;
    padding: 30px;
    background: $form_bg;
    box-shadow: 0 0 80px $box-shadow;
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    .tab {
      width: 190px;
      height: 40px;
      margin: 0 auto;
      display: flex;
      box-sizing: border-box;
      &_title {
        display: inline-block;
        flex: 1;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 16px;
        color: $color-gray;
        cursor: $c_pointer;
        &:hover {
          color: $color-font_active;
        }
      }
      &_active {
        color: $color-font_active;
        border-bottom: 2px solid $border-active;
      }
    }
  }
}
</style>

