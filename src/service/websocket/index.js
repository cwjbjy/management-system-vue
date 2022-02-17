import WebsocketClass from './ws_v2';
import { Message } from 'element-ui';
let WSInstance = null;

/**
 * 聊天室服务接口
 */

export default {
  joinMeeting({ params = '', closeCallBack = null } = {}) {
    WSInstance = new WebsocketClass({ closeCallBack });
    WSInstance.connect(params)
      .then(() => {
        console.log('connect success');
        Message.success('连接成功');
      })
      .catch(() => {
        Message.error('网络错误，请稍后重试');
      });
  },
  sendMessage(params) {
    WSInstance.sendMessage({ msg: params });
  },
  close(params) {
    WSInstance.close(params).then(() => {
      Message.success('关闭成功');
    });
  },
};
