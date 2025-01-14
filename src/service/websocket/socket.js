import { io } from 'socket.io-client';

import { bus } from '@/constants';

export const TYPE = {
  MESSAGE : 'message',
  ADD : 'addUser',
  REMOVE : 'removeUser',
}

class WebSocketClient {
  //连接
  connect(data) {
    //只使用WebSocket通信，并且最大重连次数为3次
    this.socket = io(process.env.VUE_APP_WS, { transports: ['websocket'], reconnectionAttempts: 3 });

    this.sendMessage(TYPE.ADD, data);

    this.socket.on('message', (data) => {
      window.eventBus.$emit(bus.updateWs, data);
    });
  }

  //发送消息
  sendMessage(type, params) {
    if (this.socket) this.socket.emit(type, params);
  }

  //断开连接
  close() {
    if (this.socket) this.socket.disconnect();
  }

  //重新连接
  reconnect(data) {
    if (this.socket) {
      this.socket.connect(); //会产生新id

      this.sendMessage(TYPE.ADD, data);
    }
  }
}

export default new WebSocketClient();
