import WebsocketClass from '../js/WebSocket'
import {
    Message
  } from "element-ui";
let WSInstance = null;

export default {
    joinMeeting({params="",closeCallBack=null}={}){
        WSInstance = new WebsocketClass({closeCallBack});
        WSInstance.connect(params).then(res=>{
            console.log('connect success');
            Message.success("连接成功");
        }).catch(()=>{
            Message.error("网络错误，请稍后重试");
        })
    },
    sendMessage(params){
        WSInstance.sendMessage({msg:params})
    },
    close(params){
        WSInstance.close(params).then(()=>{
            Message.success("关闭成功");
        })
    }
}