import { uuid, sendBeacon, dealType, nextTime } from '../utils/methods';
import device from '../utils/device';
import { MAX_CACHE_LEN, MAX_WAITING_TIME } from '../utils/constant';

const pageId = uuid();

let requestUrl = ''; // 服务请求地址
let events = []; // 批次队列
let timer = null; // 定时发送定时器
// 基础数据
const base = {
  ...device,
  pageId,
};

/**
 * 初始化基础数据
 * @param {*} options 基础配置
 */
function init(options) {
  Object.assign(base, options);
  requestUrl = options.requestUrl;
}

/**
 * 记录需要发送的埋点数据
 * @param {*} e 需要发送的事件信息
 * @param {boolean} flush 是否立即发送
 */
function emit(e, flush = false) {
  events = events.concat(e); // 追加到事件队列里
  console.log('receive event, waiting to send', e);
  clearTimeout(timer);

  // 满足最大记录数,立即发送,否则定时发送(flush为true代表立即发送)
  events.length >= MAX_CACHE_LEN || flush
    ? send()
    : (timer = setTimeout(() => {
        send();
      }, MAX_WAITING_TIME));
}

/**
 * 发送埋点信息
 */
function send() {
  if (events.length) {
    console.log('send events', events);
    //事件超过最大限制则分批发送
    const sendEvents = events.slice(0, MAX_CACHE_LEN); // 需要发送的事件
    events = events.slice(MAX_CACHE_LEN); // 剩下待发的事件
    const time = Date.now();
    sendBeacon(requestUrl, {
      baseInfo: {
        ...base,
        sendTime: time,
      },
      eventInfo: dealType(sendEvents),
    });
    if (events.length) nextTime(send); // 继续传输剩余内容,在下一个时间择机传输
  }
}

export { emit, pageId, init };
