import WebSocket from 'websocket';

class WebSocketClass{
    constructor(){
        this.ws = null;
        this.url = 'ws://localhost:3000'
    }
    connect(){
        this.ws = new WebSocket(this.url);
        return new Promise((resolve)=>{
            this.ws.on('open', function () {
                console.log(`[CLIENT] open()`);
                this.ws.send('Hello!');
                resolve()
            });yi
        })
    }
}

export default WebSocketClass;
// export default {
//     WebSocketFun() {
//         // 打开一个WebSocket:
//         var ws = new WebSocket.w3cwebsocket('ws://localhost:3000');
//         ws.onopen = function () {
//             console.log('连接成功');
//             // 响应onmessage事件:
//             ws.onmessage = function (msg) {
//                 console.log(msg);
//             };
//             // 给服务器发送一个字符串:
//             ws.send('Hello!');
//         }
//     }
// }