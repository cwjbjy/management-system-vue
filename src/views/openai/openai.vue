<template>
  <section>
    <el-card shadow="hover">
      <div class="chat">
        <div class="chat-content" ref="infoListContent">
          <div>
            <dl
              v-for="(item, index) in messageList"
              :key="index"
              :class="[item.name == user_name ? 'info-right' : 'info-left']"
            >
              <dt>
                <img v-if="item.image" :src="item.image" class="headPortrait" alt="图片加载失败" />
                <img v-else src="@/assets/images/chartRoom/root.png" class="headPortrait" />
              </dt>
              <dd>
                <div class="txt-name">{{ item.name }}</div>
                <div>
                  <span class="txt-content" v-html="renderMessageContent(item.text)"></span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div class="chart-button">
          <el-input v-model="msg" placeholder="请输入" center>
            <el-button v-if="!loading" slot="append" type="primary" @click="send">发送</el-button>
            <el-button v-else slot="append" type="primary" @click="cancel">取消 </el-button>
          </el-input>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import { fetchEventSource } from '@microsoft/fetch-event-source';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/vbscript-html';
import { isEmpty } from 'lodash-es';
import markdownit from 'markdown-it';
import 'highlight.js/styles/stackoverflow-light.css';

import { vuexApp } from '@/mixin';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('json', json);
hljs.registerLanguage('html', html);
hljs.registerLanguage('python', python);

export default {
  name: 'ChatRoom',
  data() {
    return {
      msg: '',
      answer: '',
      loading: false,
      ctrl: '',
      messageList: [],
      historyInfos: [],
      max: -3,
    };
  },
  computed: {
    // 使用计算属性来获取最后三个元素
    lastThreeItems() {
      return this.items.length > 3 ? this.items.slice(-3) : this.items.slice();
    }
  },
  mixins: [vuexApp],
  activated() {
    let that = this;
    document.addEventListener('keydown', that.keyDown);
  },
  deactivated() {
    let that = this;
    document.removeEventListener('keydown', that.keyDown);
  },
  methods: {
    renderMessageContent(content) {
      return markdownit({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (__) {
              /* empty */
            }
          }

          return ''; // 如果未指定语言，则返回原始代码
        },
      }).render(content);
    },

    async send() {
      this.historyInfos.push({ content: this.msg, role: 'user' });
      this.historyInfos = this.historyInfos.slice(this.max);
      this.messageList.push({ name: this.user_name, text: this.msg, image: this.imageUrl });
      this.msg = '';

      this.ctrl = new AbortController(); // 创建AbortController实例，以便中止请求
      const that = this;
      await fetchEventSource(process.env.VUE_APP_OPENAI, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_OPENAI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: that.historyInfos,
          stream: true,
          temperature: 0.7, //严谨与想象
          top_p: 1,
        }),
        openWhenHidden: true, // 取消visibilityChange事件
        signal: that.ctrl.signal, // AbortSignal
        async onmessage(ev) {
          try {
            const data = JSON.parse(ev.data);
            if (!isEmpty(data.choices) && !isEmpty(data.choices[0].delta)) {
              const content = data.choices[0].delta.content;
              that.answer += content;
              if (!that.loading) {
                that.loading = true;
                that.messageList.push({ name: '智能助手', text: that.answer });
              } else {
                that.messageList[that.messageList.length - 1].text = that.answer;
              }
              that.$nextTick(() => {
                that.$refs.infoListContent.scrollTop = 9999999;
              });
            }
          } catch {
            that.loading = false;
            that.historyInfos.push({ content: that.answer, role: 'assistant' });
            that.answer = '';
          }
        },
        onclose() {},
        onerror(err) {
          console.error(err);
          that.$message.error('对话请求发生网络错误或费用不足');
          that.ctrl?.abort();
          throw err; // 直接抛出错误，避免反复调用
        },
      });
    },

    cancel() {
      this.ctrl?.abort();
      this.loading = false;
      this.historyInfos.push({ content: this.answer, role: 'assistant' });
      this.answer = '';
    },

    keyDown(e) {
      const key = e.key;
      if (key === 'Enter') {
        this.send();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.describle {
  margin: 15px 0;
}
.chat {
  border: 1px solid #000;
  box-sizing: border-box;
  height: calc(100vh - 162px);
  position: relative;
}
.chat-content {
  height: calc(100vh - 216px);
  overflow-y: auto;
  padding: 10px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #cfcfcf;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
  }
  .txt-name {
    margin-bottom: 4px;
  }
  .txt-content {
    word-break: break-all;
    display: block;
    padding: 5px 12px;
    color: #141414;
    line-height: 20px;
    /* background-color: #a8a29e1a; */
  }
  .info-right {
    text-align: right;
    padding-right: 47px;
    margin-left: 47px;
    dt {
      right: 0;
      @extend %main_centerRight;
    }
  }
  .info-left {
    text-align: left;
    padding-left: 47px;
    margin-right: 47px;
    dt {
      left: 0;
      @extend %main_centerLeft;
    }
  }
  dl {
    position: relative;
    margin-bottom: 20px;
    dt {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
    }
  }
}
.headPortrait {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
img {
  width: 100%;
}
</style>
