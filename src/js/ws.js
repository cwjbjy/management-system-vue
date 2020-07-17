export default {
    websocketFun(params) {
        const env = process.env.NODE_ENV;
        let baseUrl = "";
        switch (env) {
            case "development":
                baseUrl = "ws://127.0.0.1:3999";
                break;
            case "production":
                baseUrl = "wss://wss.cwjbjy.online";
                break;
            default:
                break;
        }
        let ws = new WebSocket(baseUrl);
        ws.onclose = function () {
            console.error("web channel closed");
        };
        ws.onerror = function (error) {
            console.error('error', error);
            heartBeat.beat();
        };
        ws.onopen = function () {
            heartCheck.start();
            console.log('connect success')
            ws.onmessage = function (event) {
                let data = JSON.parse(event.data);
                //如果是心跳，组件则不通信
                if (data.name === 'heart') {
                    console.log(data.text)
                } else {
                    window.eventBus.$emit('page1', data);
                }
                heartCheck.reSet();
            };
            //如果连接时就有参数（参数为对象），就传参
            if (JSON.stringify(params) != "{}") {
                ws.send(JSON.stringify(params))
            }
        };

        function WsConnect() {
            this.requestMessage = function (msg) {
                    if (ws.readyState === 0) {
                        // 正在连接
                    } else if (ws.readyState === 1) {
                        // 连接成功，可以进行通信
                        ws.send(JSON.stringify(msg))
                    } else if (ws.readyState === 2) {
                        // 连接正在关闭握手，即将关闭 
                    } else if (ws.readyState === 3) {
                        // 连接已关闭或者根本没有建立
                    }
                },
                this.requestClose = function (params) {
                    ws.send(JSON.stringify(params))
                    ws.close() //关闭的只是client的WebSocket，并不能关闭server
                }
        }
        window.WsConnect = new WsConnect();

        //心跳
        var heartCheck = {
            timeOutObj: null,
            reSet: function () {
                clearTimeout(this.timeOutObj);
                this.start();
            },
            start: function () {
                this.timeOutObj = setTimeout(() => {
                    ws.send(JSON.stringify({
                        type: 'heart',
                        text: 'putong'
                    }))
                }, 30000)
            }
        }

        //心跳唤醒
        let heartBeat = {
            beat: function () {
                //唤醒心跳
                ws.send('唤醒心跳')
            }
        }
    }
}