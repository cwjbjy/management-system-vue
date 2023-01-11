<template>
  <div class="login" v-title="title">
    <header class="top">
      <span class="title">PC端管理系统(Vue版)</span>
    </header>
    <main class="main">
      <article class="form">
        <nav class="tab">
          <div :class="{ tab_active: flag }" class="tab_title" @click="flag = !flag">用户登录</div>
          <div :class="{ tab_active: !flag }" class="tab_title" @click="flag = !flag">用户注册</div>
        </nav>
        <section v-show="flag">
          <!-- 登录表单 -->
          <login-form ref="loginForm" />
          <!-- 第三方登录 -->
          <login-other />
        </section>
        <section v-show="!flag">
          <!-- 注册组件 -->
          <login-register @update:register="register" ref="register" />
        </section>
      </article>
    </main>
    <footer class="footer">
      个人小样项目，用于展示自己的技术栈
      <br />
      <span @click="handlerClick" style="cursor: pointer">苏ICP备20022574号-2</span>
    </footer>
  </div>
</template>

<script>
import LoginForm from './components/loginForm';
import LoginOther from './components/loginOther';
import LoginRegister from './components/loginRegister';
export default {
  name: 'Login',
  components: {
    LoginForm,
    LoginOther,
    LoginRegister,
  },
  data() {
    return {
      title: '登录',
      flag: true,
    };
  },
  created() {
    localStorage.removeItem('user_name');
  },
  mounted() {
    let that = this;
    document.addEventListener('keydown', that.keyDown);
  },
  beforeDestroy() {
    let that = this;
    document.removeEventListener('keydown', that.keyDown);
  },
  methods: {
    register(params) {
      let { name, pass } = params;
      this.$refs.loginForm.onRegister(name, pass);
    },
    keyDown() {
      let key = window.event.keyCode;
      if (key === 13) {
        if (this.flag) {
          this.$refs.loginForm.handleLogin();
        } else {
          this.$refs.register.register();
        }
      }
    },
    handlerClick() {
      window.open('https://beian.miit.gov.cn');
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  min-width: 600px;
  color: $color-font;
  background-color: $background-login;
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
  .footer {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .form {
    width: 400px;
    min-height: 370px;
    padding: 30px;
    background: $background-form;
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
      &_title {
        display: inline-block;
        flex: 1;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 16px;
        color: $color-gray;
        cursor: $cursor-pointer;
        &:hover {
          color: $color-font-active;
        }
      }
      &_active {
        color: $color-font-active;
        border-bottom: 2px solid $background-login;
      }
    }
  }
}
</style>
