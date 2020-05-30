import WebSocket from 'websocket';

export default {
    websocketConnectW3C() {
        const baseUrl = "ws://127.0.0.1:3000";
        let ws = new WebSocket.w3cwebsocket(baseUrl);
        ws.onclose = function () {
            console.error("web channel closed");
        };
        ws.onerror = function (error) {
            console.error(error)
        };
        ws.onopen = function () {
            ws.onmessage = function (event) {
                console.log('event', event)
                //event.data后台传来的消息，需要传功能号以便区别通信
                let data = event.data;
                // let funcId = data.funcId;
                window.eventBus.$emit('page1', data)
            }
        };

        function WsConnect() {
            this.requsetMessage = function (msg) {
                if (ws.readyState === 0) {
                    // 正在连接
                } else if (ws.readyState === 1) {
                    // 连接成功，可以进行通信
                    ws.send(msg)
                } else if (ws.readyState === 2) {
                    // 连接正在关闭握手，即将关闭 
                } else if (ws.readyState === 3) {
                    // 连接已关闭或者根本没有建立
                }
            }
        }
        window.webContent = new WsConnect();
    }
}