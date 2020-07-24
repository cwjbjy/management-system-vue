<template>
  <section>
    <el-card shadow="hover">
      <span class="title">聊天室功能：使用说明</span>
      <ol>
        <li>输入昵称，点击连接；</li>
        <li>等待另一用户连接；或者打开新窗口，重复步骤1；</li>
        <li>看到另一用户登录提示；</li>
        <li>输入消息，点击发送或者回车发送；</li>
      </ol>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="user" placeholder="请输入昵称" center></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="connect" :disabled="connectFlag">连接</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="close" :disabled="closeFlag">关闭</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">查看效果图</el-button>
        </el-form-item>
      </el-form>
      <div class="chat">
        <div class="chat-content">
          <div id="mess"></div>
        </div>
        <div class="chart-button">
          <el-input v-model="msg" placeholder="请输入" center></el-input>
          <el-button type="primary" @click="send">发送</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="效果图" :visible.sync="dialogVisible" width="90%" top="2vh" class="chatDialog">
      <img src="@/assets/images/home/chatShow.png" />
    </el-dialog>
  </section>
</template>

<script>
import websocketConnect from "@/js/ws";
export default {
  name: "chatRoom",
  data() {
    return {
      user: "",
      msg: "",
      connectFlag: false,
      closeFlag: true,
      mess: null,
      show: false,
      dialogVisible: false
    };
  },
  mounted() {
    this.mess = document.getElementById("mess");
    let that = this;
    document.addEventListener("keydown", that.keyDown);
    window.eventBus.$on("page1", value => {
      let time = new Date();
      this.$nextTick(() => {
        this.mess.innerHTML += `${time.toUTCString()}<br>${value.name}${
          value.text
        }<br><br>`;
      });
    });
  },
  beforeDestroy() {
    window.eventBus.$off("page1");
    let that = this;
    document.removeEventListener("keydown", that.keyDown);
  },
  methods: {
    connect() {
      var pattern = /^[\u4e00-\u9fa5]{1,10}$/;
      if (!pattern.test(this.user)) {
        alert("名称不能为空且必须为中文");
        return;
      }
      let user = {
        type: "setName",
        name: this.user
      };
      websocketConnect.websocketFun(user); //连接
      this.connectFlag = true;
      this.closeFlag = false;
    },
    close() {
      let close = {
        type: "close"
      };
      window.WsConnect.requestClose(close);
      this.connectFlag = false;
      this.closeFlag = true;
      this.$message.success("关闭成功");
    },
    send() {
      if (!this.connectFlag) {
        this.$message.error("请先连接");
      }
      if (this.msg == "") return;
      let message = {
        type: "chat",
        text: this.msg
      };
      window.WsConnect.requestMessage(message);
      this.msg = "";
    },
    keyDown() {
      let key = window.event.keyCode;
      if (key === 13) {
        this.send();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
}
.chat {
  border: 1px solid #000;
  box-sizing: border-box;
  width: 353px;
  height: 429px;
  &-content {
    height: 367px;
    overflow: auto;
    font-size: 16px;
    padding: 10px;
  }
}
img {
  width: 100%;
}
</style>

<style lang="scss">
.chart-button {
  display: inline-flex;
  width: 100%;
}
.chatDialog {
  .el-dialog__body {
    height: 76vh;
    overflow: auto;
  }
}
</style>